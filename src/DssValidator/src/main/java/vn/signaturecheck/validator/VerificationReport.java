package vn.signaturecheck.validator;

import java.time.OffsetDateTime;
import java.util.List;

public record VerificationReport(
        VerificationFileType fileType,
        VerificationOverallStatus overallStatus,
        OffsetDateTime checkedAt,
        List<SignatureReport> signatures,
        List<String> errors) {
}
