import {
  AlertCircle,
  CheckCircle2,
  FileQuestion,
  ShieldAlert,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import type {
  CheckStatus,
  SignatureChecks,
  VerificationOverallStatus,
  VerificationReport,
} from "@/lib/verification-api";

export type BadgeVariant = "secondary" | "success" | "warning" | "destructive";

type OverallStatusView = {
  title: string;
  shortLabel: string;
  icon: LucideIcon;
  panelClass: string;
  iconClass: string;
  badgeVariant: BadgeVariant;
};

export const overallStatusViews: Record<VerificationOverallStatus, OverallStatusView> = {
  VALID: {
    title: "Chữ ký hợp lệ",
    shortLabel: "Hợp lệ",
    icon: CheckCircle2,
    panelClass: "border-emerald-200 bg-emerald-50/70",
    iconClass: "bg-emerald-100 text-emerald-800",
    badgeVariant: "success",
  },
  INVALID: {
    title: "Chữ ký không hợp lệ",
    shortLabel: "Không hợp lệ",
    icon: XCircle,
    panelClass: "border-red-200 bg-red-50/70",
    iconClass: "bg-red-100 text-red-800",
    badgeVariant: "destructive",
  },
  INDETERMINATE: {
    title: "Chưa đủ dữ liệu kết luận",
    shortLabel: "Chưa đủ dữ liệu",
    icon: ShieldAlert,
    panelClass: "border-amber-200 bg-amber-50/70",
    iconClass: "bg-amber-100 text-amber-800",
    badgeVariant: "warning",
  },
  UNSIGNED: {
    title: "Không tìm thấy chữ ký số",
    shortLabel: "Không có chữ ký",
    icon: FileQuestion,
    panelClass: "border-sky-200 bg-sky-50/70",
    iconClass: "bg-sky-100 text-sky-800",
    badgeVariant: "secondary",
  },
  UNSUPPORTED: {
    title: "Định dạng chưa được hỗ trợ",
    shortLabel: "Chưa hỗ trợ",
    icon: FileQuestion,
    panelClass: "border-slate-200 bg-slate-50",
    iconClass: "bg-slate-200 text-slate-700",
    badgeVariant: "secondary",
  },
  ERROR: {
    title: "Không thể kiểm tra file",
    shortLabel: "Có lỗi",
    icon: AlertCircle,
    panelClass: "border-red-200 bg-red-50/70",
    iconClass: "bg-red-100 text-red-800",
    badgeVariant: "destructive",
  },
};

export const checkDefinitions: Array<{
  key: keyof SignatureChecks;
  label: string;
  passText: string;
  failText: string;
  warningText: string;
  unknownText: string;
  notCheckedText: string;
  notCheckedLabel?: string;
}> = [
  {
    key: "documentIntegrity",
    label: "Tài liệu sau khi ký",
    passText: "Nội dung không bị thay đổi sau khi ký.",
    failText: "Nội dung có thể đã bị thay đổi sau khi ký.",
    warningText: "Có dấu hiệu cần xem lại về tính toàn vẹn của tài liệu.",
    unknownText: "Chưa đủ dữ liệu để kết luận về nội dung tài liệu.",
    notCheckedText: "Tính toàn vẹn của tài liệu chưa được kiểm tra.",
  },
  {
    key: "cryptographicSignature",
    label: "Tính hợp lệ của chữ ký",
    passText: "Chữ ký mật mã khớp với nội dung.",
    failText: "Chữ ký mật mã không hợp lệ hoặc không khớp nội dung.",
    warningText: "Chữ ký mật mã có thông tin cần xem lại.",
    unknownText: "Chưa đủ dữ liệu để xác minh chữ ký mật mã.",
    notCheckedText: "Chữ ký mật mã chưa được kiểm tra.",
  },
  {
    key: "certificateChain",
    label: "Tin cậy chứng thư",
    passText: "Chứng thư nối được tới CA tin cậy.",
    failText: "Không xây dựng được chuỗi chứng thư tin cậy.",
    warningText: "Chuỗi chứng thư có thông tin cần xem lại.",
    unknownText: "Chưa xác định được chuỗi CA tin cậy.",
    notCheckedText: "Chuỗi chứng thư chưa được kiểm tra.",
  },
  {
    key: "revocationOcsp",
    label: "Thu hồi qua OCSP",
    passText: "Không ghi nhận chứng thư bị thu hồi qua OCSP.",
    failText: "OCSP ghi nhận chứng thư có vấn đề hoặc đã bị thu hồi.",
    warningText: "Phản hồi OCSP có thông tin cần xem lại.",
    unknownText: "Không có phản hồi OCSP đủ để kết luận.",
    notCheckedText: "Kiểm tra trạng thái thu hồi qua OCSP không được thực hiện.",
  },
  {
    key: "revocationCrl",
    label: "Thu hồi qua CRL",
    passText: "Không ghi nhận chứng thư bị thu hồi trong CRL.",
    failText: "CRL ghi nhận chứng thư có vấn đề hoặc đã bị thu hồi.",
    warningText: "Dữ liệu CRL có thông tin cần xem lại.",
    unknownText: "Không có dữ liệu CRL đủ để kết luận.",
    notCheckedText: "Kiểm tra trạng thái thu hồi qua CRL không được thực hiện.",
  },
  {
    key: "timestamp",
    label: "Dấu thời gian",
    passText: "Chữ ký có dấu thời gian đã được xác minh.",
    failText: "Dấu thời gian không hợp lệ.",
    warningText: "Dấu thời gian có thông tin cần xem lại.",
    unknownText: "Có dấu thời gian nhưng chưa đủ dữ liệu để kết luận.",
    notCheckedText: "Không phát hiện dấu thời gian độc lập trong chữ ký.",
    notCheckedLabel: "Không",
  },
];

export function resultSummary(report: VerificationReport) {
  if (report.errors.length > 0) {
    return report.errors[0];
  }

  switch (report.overallStatus) {
    case "VALID":
      return `Đã xác minh ${report.signatures.length} chữ ký theo dữ liệu tin cậy hiện tại.`;
    case "INVALID":
      return "Có ít nhất một kiểm tra quan trọng không đạt. Hãy xem chi tiết bên dưới.";
    case "INDETERMINATE":
      return "Hệ thống đọc được chữ ký nhưng chưa có đủ dữ liệu để kết luận chắc chắn.";
    case "UNSIGNED":
      return "File hợp lệ nhưng không chứa chữ ký số mà hệ thống nhận diện được.";
    case "UNSUPPORTED":
      return "Hãy chọn file PDF, XML, P7S hoặc P7M.";
    case "ERROR":
      return "Đã xảy ra lỗi khi đọc hoặc xác minh file. Hãy thử lại với file khác.";
  }
}

export function checkStatusLabel(status: CheckStatus) {
  const labels: Record<CheckStatus, string> = {
    PASS: "Đạt",
    FAIL: "Không đạt",
    WARNING: "Cần lưu ý",
    UNKNOWN: "Không xác định",
    NOT_CHECKED: "Chưa kiểm tra",
  };

  return labels[status];
}

export function checkBadgeVariant(status: CheckStatus): BadgeVariant {
  if (status === "PASS") return "success";
  if (status === "FAIL") return "destructive";
  if (status === "WARNING") return "warning";
  return "secondary";
}

export function checkExplanation(
  status: CheckStatus,
  definition: (typeof checkDefinitions)[number],
) {
  if (status === "PASS") return definition.passText;
  if (status === "FAIL") return definition.failText;
  if (status === "WARNING") return definition.warningText;
  if (status === "NOT_CHECKED") return definition.notCheckedText;
  return definition.unknownText;
}

export function formatDate(value?: string | null) {
  if (!value) return "Không có thông tin";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Không có thông tin";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export function certificateTimingSummary({
  signingTime,
  certificateValidFrom,
  certificateValidTo,
}: {
  signingTime?: string | null;
  certificateValidFrom?: string | null;
  certificateValidTo?: string | null;
}) {
  const signedAt = parseDate(signingTime);
  const validFrom = parseDate(certificateValidFrom);
  const validTo = parseDate(certificateValidTo);

  if (!signedAt || !validFrom || !validTo) {
    return {
      label: "Chưa đủ dữ liệu",
      variant: "secondary" as const,
      description: "Chưa đủ mốc thời gian để đối chiếu thời gian ký với thời hạn chứng thư.",
    };
  }

  const isWithinValidity = signedAt >= validFrom && signedAt <= validTo;
  return isWithinValidity
    ? {
        label: "Trong thời hạn",
        variant: "success" as const,
        description: "Thời gian ký do tài liệu cung cấp nằm trong thời hạn hiệu lực của chứng thư.",
      }
    : {
        label: "Ngoài thời hạn",
        variant: "warning" as const,
        description: "Thời gian ký do tài liệu cung cấp nằm ngoài thời hạn hiệu lực của chứng thư.",
      };
}

function parseDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
