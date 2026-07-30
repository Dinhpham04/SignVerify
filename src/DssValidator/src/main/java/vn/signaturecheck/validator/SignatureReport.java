package vn.signaturecheck.validator;

import java.time.OffsetDateTime;
import java.util.List;

public record SignatureReport(
        VerificationOverallStatus status,
        String signerName,
        String signerOrganization,
        String issuerName,
        String serialNumber,
        OffsetDateTime signingTime,
        OffsetDateTime certificateValidFrom,
        OffsetDateTime certificateValidTo,
        SignatureChecks checks,
        List<String> explanations) {
}
