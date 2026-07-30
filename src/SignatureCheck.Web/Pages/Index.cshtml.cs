using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SignatureCheck.Web.Models;
using SignatureCheck.Web.Services;

namespace SignatureCheck.Web.Pages;

public class IndexModel(DssValidationClient validationClient, ILogger<IndexModel> logger) : PageModel
{
    [BindProperty]
    public IFormFile? Upload { get; set; }

    public VerificationReport? Report { get; private set; }

    public string? FormError { get; private set; }

    public void OnGet()
    {
    }

    public async Task<IActionResult> OnPostAsync(CancellationToken cancellationToken)
    {
        FormError = UploadPolicy.Validate(Upload);
        if (FormError is not null)
        {
            return Page();
        }

        try
        {
            Report = await validationClient.ValidateAsync(Upload!, cancellationToken);
        }
        catch (OperationCanceledException)
        {
            FormError = "Qua trinh kiem tra da bi huy hoac het thoi gian cho.";
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Signature validation request failed");
            Report = DssValidationClient.ErrorReport("Khong the ket noi dich vu kiem tra chu ky so.");
        }

        return Page();
    }

    public static string OverallLabel(VerificationOverallStatus status) => status switch
    {
        VerificationOverallStatus.Valid => "Hop le",
        VerificationOverallStatus.Invalid => "Khong hop le",
        VerificationOverallStatus.Indeterminate => "Chua du du lieu ket luan",
        VerificationOverallStatus.Unsigned => "Khong tim thay chu ky so",
        VerificationOverallStatus.Unsupported => "Chua ho tro dinh dang nay",
        _ => "Co loi khi kiem tra"
    };

    public static string CheckLabel(CheckStatus status) => status switch
    {
        CheckStatus.Pass => "Dat",
        CheckStatus.Fail => "Khong dat",
        CheckStatus.Warning => "Can luu y",
        CheckStatus.Unknown => "Khong xac dinh",
        _ => "Chua kiem tra"
    };

    public static string CheckClass(CheckStatus status) => status switch
    {
        CheckStatus.Pass => "status-pass",
        CheckStatus.Fail => "status-fail",
        CheckStatus.Warning => "status-warning",
        CheckStatus.Unknown => "status-unknown",
        _ => "status-muted"
    };

    public static string OverallClass(VerificationOverallStatus status) => status switch
    {
        VerificationOverallStatus.Valid => "result-valid",
        VerificationOverallStatus.Invalid => "result-invalid",
        VerificationOverallStatus.Indeterminate => "result-warning",
        VerificationOverallStatus.Unsigned => "result-muted",
        VerificationOverallStatus.Unsupported => "result-muted",
        _ => "result-error"
    };

    public static string FileTypeLabel(VerificationFileType fileType) => fileType switch
    {
        VerificationFileType.Pdf => "PDF",
        VerificationFileType.Xml => "XML",
        VerificationFileType.P7S => "P7S",
        VerificationFileType.P7M => "P7M",
        _ => "Khong xac dinh"
    };

    public static string FormatDate(DateTimeOffset? value) =>
        value?.ToLocalTime().ToString("dd/MM/yyyy HH:mm:ss") ?? "Khong co thong tin";

    public static IReadOnlyList<(string Label, CheckStatus Status)> Checks(SignatureChecks checks) =>
        new List<(string Label, CheckStatus Status)>
        {
            ("Tinh toan ven tai lieu", checks.DocumentIntegrity),
            ("Chu ky mat ma", checks.CryptographicSignature),
            ("Chuoi CA tin cay", checks.CertificateChain),
            ("Trang thai OCSP", checks.RevocationOcsp),
            ("Trang thai CRL", checks.RevocationCrl),
            ("Dau thoi gian", checks.Timestamp)
        };
}
