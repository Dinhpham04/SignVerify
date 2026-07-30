using System.Text.Json.Serialization;

namespace SignatureCheck.Web.Models;

public enum VerificationOverallStatus
{
    Valid,
    Invalid,
    Indeterminate,
    Unsigned,
    Unsupported,
    Error
}

public enum CheckStatus
{
    Pass,
    Fail,
    Warning,
    Unknown,
    NotChecked
}

public enum VerificationFileType
{
    [JsonStringEnumMemberName("PDF")]
    Pdf,
    [JsonStringEnumMemberName("XML")]
    Xml,
    [JsonStringEnumMemberName("P7S")]
    P7S,
    [JsonStringEnumMemberName("P7M")]
    P7M,
    [JsonStringEnumMemberName("UNKNOWN")]
    Unknown
}

public sealed record VerificationReport(
    VerificationFileType FileType,
    VerificationOverallStatus OverallStatus,
    DateTimeOffset CheckedAt,
    IReadOnlyList<SignatureReport> Signatures,
    IReadOnlyList<string> Errors);

public sealed record SignatureReport(
    VerificationOverallStatus Status,
    string? SignerName,
    string? SignerOrganization,
    string? IssuerName,
    string? SerialNumber,
    DateTimeOffset? SigningTime,
    DateTimeOffset? CertificateValidFrom,
    DateTimeOffset? CertificateValidTo,
    SignatureChecks Checks,
    IReadOnlyList<string> Explanations);

public sealed record SignatureChecks(
    CheckStatus DocumentIntegrity,
    CheckStatus CryptographicSignature,
    CheckStatus CertificateChain,
    CheckStatus RevocationOcsp,
    CheckStatus RevocationCrl,
    CheckStatus Timestamp);
