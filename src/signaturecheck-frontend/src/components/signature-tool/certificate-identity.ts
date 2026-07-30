export type CertificateIdentity = {
  commonName?: string;
  organization?: string;
  organizationalUnit?: string;
  title?: string;
  locality?: string;
  province?: string;
  country?: string;
  identifier?: {
    label: string;
    value: string;
  };
  raw?: string;
};

export function parseCertificateIdentity(value?: string | null): CertificateIdentity {
  if (!value) return {};

  const attributes = new Map(
    splitUnescaped(value, ",").flatMap((part) => {
      const separator = findUnescaped(part, "=");
      if (separator < 0) return [];

      const key = part.slice(0, separator).trim().toLowerCase();
      const attributeValue = unescapeDistinguishedName(part.slice(separator + 1).trim());
      return attributeValue ? [[key, attributeValue] as const] : [];
    }),
  );

  return {
    commonName: attributes.get("commonname") ?? attributes.get("cn"),
    organization: attributes.get("organizationname") ?? attributes.get("o"),
    organizationalUnit: attributes.get("organizationalunitname") ?? attributes.get("ou"),
    title: attributes.get("title") ?? attributes.get("t"),
    locality: attributes.get("localityname") ?? attributes.get("l"),
    province: attributes.get("stateorprovincename") ?? attributes.get("st"),
    country: attributes.get("countryname") ?? attributes.get("c"),
    identifier: identifier(attributes.get("uid")),
    raw: value,
  };
}

function identifier(value?: string) {
  if (!value) return undefined;

  const separator = value.indexOf(":");
  if (separator < 0) {
    return { label: "Mã định danh", value };
  }

  const type = value.slice(0, separator).trim().toUpperCase();
  const identifierValue = value.slice(separator + 1).trim();
  const labels: Record<string, string> = {
    CCCD: "CCCD",
    MST: "Mã số thuế",
  };

  return {
    label: labels[type] ?? type,
    value: identifierValue || value,
  };
}

function splitUnescaped(value: string, delimiter: string) {
  const parts: string[] = [];
  let current = "";
  let escaped = false;

  for (const character of value) {
    if (escaped) {
      current += `\\${character}`;
      escaped = false;
      continue;
    }

    if (character === "\\") {
      escaped = true;
      continue;
    }

    if (character === delimiter) {
      parts.push(current);
      current = "";
      continue;
    }

    current += character;
  }

  if (escaped) current += "\\";
  parts.push(current);
  return parts;
}

function findUnescaped(value: string, delimiter: string) {
  let escaped = false;

  for (let index = 0; index < value.length; index += 1) {
    if (escaped) {
      escaped = false;
      continue;
    }

    if (value[index] === "\\") {
      escaped = true;
      continue;
    }

    if (value[index] === delimiter) return index;
  }

  return -1;
}

function unescapeDistinguishedName(value: string) {
  return value.replace(/\\([,=+<>#;"\\])/g, "$1").trim();
}
