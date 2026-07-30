package vn.signaturecheck.validator;

public record SignatureChecks(
        CheckStatus documentIntegrity,
        CheckStatus cryptographicSignature,
        CheckStatus certificateChain,
        CheckStatus revocationOcsp,
        CheckStatus revocationCrl,
        CheckStatus timestamp) {
}
