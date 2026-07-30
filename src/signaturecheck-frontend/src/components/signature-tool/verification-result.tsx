import {
  BadgeCheck,
  CalendarClock,
  ChevronDown,
  Clock3,
  ContactRound,
  FileKey2,
  Info,
  Shield,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { SignatureReport, VerificationReport } from "@/lib/verification-api";

import {
  type CertificateIdentity,
  parseCertificateIdentity,
} from "./certificate-identity";
import {
  certificateTimingSummary,
  formatDate,
  overallStatusViews,
  resultSummary,
} from "./status-view";
import { VerificationCheckList } from "./verification-check-list";

export function VerificationResult({ report }: { report: VerificationReport }) {
  const status = overallStatusViews[report.overallStatus];
  const StatusIcon = status.icon;

  return (
    <div className="space-y-5">
      <div className={`overflow-hidden rounded-md border ${status.panelClass}`}>
        <div className="flex items-start gap-3 px-4 py-4 sm:px-5">
          <span className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-md sm:flex ${status.iconClass}`}>
            <StatusIcon className="h-5 w-5" aria-hidden={true} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-medium uppercase text-muted-foreground">Kết quả kiểm tra</p>
              <Badge variant={status.badgeVariant}>{report.fileType}</Badge>
            </div>
            <h2 id="verification-result-heading" className="mt-1 text-xl font-semibold text-foreground">
              {status.title}
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
              {resultSummary(report)}
            </p>
          </div>
        </div>

        <dl className="grid divide-y border-t border-current/10 bg-white/45 text-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <ResultFact label="Kiểm tra lúc" value={formatDate(report.checkedAt)} />
          <ResultFact label="Chữ ký phát hiện" value={`${report.signatures.length}`} />
          <ResultFact label="Trạng thái tổng thể" value={status.shortLabel} />
        </dl>
      </div>

      {report.errors.length > 0 && (
        <div role="alert" className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-950">
          <p className="font-semibold">Cần xem lại</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
            {report.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {report.signatures.length > 0 && (
        <section aria-labelledby="signatures-heading">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 id="signatures-heading" className="text-base font-semibold text-foreground">
              Chữ ký phát hiện
            </h3>
            <span className="text-sm text-muted-foreground">{report.signatures.length} chữ ký</span>
          </div>
          <div className="space-y-3">
            {report.signatures.map((signature, index) => (
              <SignatureDetails
                key={`${signature.serialNumber ?? "signature"}-${index}`}
                signature={signature}
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      <div className="flex items-start gap-3 border-t pt-4 text-sm leading-6 text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden={true} />
        <p>
          Kết quả phản ánh dữ liệu kỹ thuật tại thời điểm kiểm tra và không thay thế kết luận pháp lý.
        </p>
      </div>
    </div>
  );
}

function SignatureDetails({ signature, index }: { signature: SignatureReport; index: number }) {
  const status = overallStatusViews[signature.status];
  const signer = parseCertificateIdentity(signature.signerOrganization);
  const issuer = parseCertificateIdentity(signature.issuerName);
  const timing = certificateTimingSummary(signature);

  return (
    <article className="overflow-hidden rounded-md border bg-white">
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground">Chữ ký {index + 1}</p>
          <h4 className="mt-1 font-semibold text-foreground">
            {signature.signerName || "Người ký không xác định"}
          </h4>
          {signer.organization && (
            <p className="mt-1 text-sm text-muted-foreground">
              {signer.organization}
            </p>
          )}
        </div>
        <Badge className="w-fit" variant={status.badgeVariant}>
          {status.shortLabel}
        </Badge>
      </div>

      <dl className="grid gap-x-6 gap-y-4 border-t bg-secondary/25 px-4 py-4 sm:grid-cols-2 lg:grid-cols-3">
        <SignatureFact icon={UserRound} label="Người ký" value={signature.signerName} />
        <SignatureFact
          icon={BadgeCheck}
          label="Đơn vị cấp"
          value={issuer.commonName ?? issuer.organization}
        />
        <SignatureFact icon={CalendarClock} label="Thời gian ký" value={formatDate(signature.signingTime)} />
      </dl>

      <details className="group border-t" open={index === 0}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
          Thông tin đầy đủ
          <ChevronDown
            className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
            aria-hidden={true}
          />
        </summary>
        <div className="space-y-6 border-t bg-secondary/10 px-4 py-5">
          <div className="grid border-y bg-white md:grid-cols-2 md:divide-x">
            <IdentitySection
              title="Người ký"
              icon={ContactRound}
              identity={signer}
              fallbackName={signature.signerName}
              commonNameLabel="Họ tên/Tên chủ thể"
            />
            <IdentitySection
              title="Đơn vị cấp chứng thư"
              icon={Shield}
              identity={issuer}
              commonNameLabel="Đơn vị cấp"
            />
          </div>

          <section aria-labelledby={`certificate-heading-${index}`}>
            <div className="flex items-center gap-2">
              <FileKey2 className="h-4 w-4 text-primary" aria-hidden={true} />
              <h5 id={`certificate-heading-${index}`} className="text-sm font-semibold text-foreground">
                Chữ ký và chứng thư số
              </h5>
            </div>
            <dl className="mt-3 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <TextFact label="Thời gian ký" value={formatDate(signature.signingTime)} />
              <TextFact label="Hiệu lực từ" value={formatDate(signature.certificateValidFrom)} />
              <TextFact label="Hiệu lực đến" value={formatDate(signature.certificateValidTo)} />
              <TextFact label="Serial chứng thư" value={signature.serialNumber} mono />
            </dl>
            <div className="mt-4 flex items-start gap-3 border-l-2 border-primary/30 pl-3">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden={true} />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Badge className="w-fit" variant={timing.variant}>
                  {timing.label}
                </Badge>
                <p className="text-sm leading-6 text-muted-foreground">{timing.description}</p>
              </div>
            </div>
          </section>

          <section aria-labelledby={`checks-heading-${index}`}>
            <div className="mb-3 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" aria-hidden={true} />
              <h5 id={`checks-heading-${index}`} className="text-sm font-semibold text-foreground">
                Kết quả từng phép kiểm tra
              </h5>
            </div>
            <VerificationCheckList checks={signature.checks} />
          </section>

        </div>
      </details>
    </article>
  );
}

function ResultFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 sm:px-5">
      <dt className="text-xs font-medium uppercase text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function SignatureFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" aria-hidden={true} />
        {label}
      </dt>
      <dd className="mt-1.5 break-words text-sm font-medium text-foreground">
        {value || "Không có thông tin"}
      </dd>
    </div>
  );
}

function IdentitySection({
  title,
  icon: Icon,
  identity,
  fallbackName,
  commonNameLabel,
}: {
  title: string;
  icon: typeof ShieldCheck;
  identity: CertificateIdentity;
  fallbackName?: string | null;
  commonNameLabel: string;
}) {
  const facts = [
    { label: commonNameLabel, value: identity.commonName ?? fallbackName },
    { label: "Tổ chức", value: identity.organization },
    { label: "Đơn vị trực thuộc", value: identity.organizationalUnit },
    { label: "Chức vụ", value: identity.title },
    { label: "Địa phương", value: identity.locality },
    { label: "Tỉnh/Thành phố", value: identity.province },
    { label: "Quốc gia", value: identity.country },
    identity.identifier,
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact?.value));

  return (
    <section className="px-0 py-4 first:pt-4 md:px-4 md:first:pl-0 md:last:pr-0">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" aria-hidden={true} />
        <h5 className="text-sm font-semibold text-foreground">{title}</h5>
      </div>
      {facts.length > 0 ? (
        <dl className="mt-3 space-y-2.5 text-sm">
          {facts.map((fact) => (
            <div key={`${fact.label}-${fact.value}`} className="grid gap-0.5 sm:grid-cols-[130px_1fr] sm:gap-3">
              <dt className="text-muted-foreground">{fact.label}</dt>
              <dd className="break-words font-medium text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Không có thông tin.</p>
      )}
      {identity.raw && (
        <details className="group/raw mt-3">
          <summary className="cursor-pointer list-none text-xs font-medium text-primary hover:underline">
            Xem chuỗi DN đầy đủ
          </summary>
          <p className="mt-2 break-all font-mono text-xs leading-5 text-muted-foreground">{identity.raw}</p>
        </details>
      )}
    </section>
  );
}

function TextFact({
  label,
  value,
  mono = false,
}: {
  label: string;
  value?: string | null;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase text-muted-foreground">{label}</dt>
      <dd className={`mt-1 break-words text-foreground ${mono ? "font-mono text-xs leading-5" : ""}`}>
        {value || "Không có thông tin"}
      </dd>
    </div>
  );
}
