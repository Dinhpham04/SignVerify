export type VerificationOverallStatus =
  | "VALID"
  | "INVALID"
  | "INDETERMINATE"
  | "UNSIGNED"
  | "UNSUPPORTED"
  | "ERROR";

export type CheckStatus = "PASS" | "FAIL" | "WARNING" | "UNKNOWN" | "NOT_CHECKED";

export type VerificationFileType = "PDF" | "XML" | "P7S" | "P7M" | "UNKNOWN";

export type SignatureChecks = {
  documentIntegrity: CheckStatus;
  cryptographicSignature: CheckStatus;
  certificateChain: CheckStatus;
  revocationOcsp: CheckStatus;
  revocationCrl: CheckStatus;
  timestamp: CheckStatus;
};

export type SignatureReport = {
  status: VerificationOverallStatus;
  signerName?: string | null;
  signerOrganization?: string | null;
  issuerName?: string | null;
  serialNumber?: string | null;
  signingTime?: string | null;
  certificateValidFrom?: string | null;
  certificateValidTo?: string | null;
  checks: SignatureChecks;
  explanations: string[];
};

export type VerificationReport = {
  fileType: VerificationFileType;
  overallStatus: VerificationOverallStatus;
  checkedAt: string;
  signatures: SignatureReport[];
  errors: string[];
};

type ApiError = {
  error?: {
    code?: string;
    message?: string;
  };
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");

export async function verifySignature(file: File): Promise<VerificationReport> {
  const body = new FormData();
  body.append("file", file);

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}/api/verification-jobs`, {
      method: "POST",
      body,
    });
  } catch {
    throw new Error("Không thể kết nối dịch vụ kiểm tra. Vui lòng thử lại sau.");
  }

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as ApiError | null;
    throw new Error(payload?.error?.message ?? "Không thể kiểm tra file lúc này.");
  }

  return (await response.json()) as VerificationReport;
}
