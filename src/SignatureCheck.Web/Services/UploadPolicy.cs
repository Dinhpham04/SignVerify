namespace SignatureCheck.Web.Services;

public static class UploadPolicy
{
    public const long MaxFileSizeBytes = 25 * 1024 * 1024;
    public const long MaxRequestSizeBytes = 26 * 1024 * 1024;

    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".pdf",
        ".xml",
        ".p7s",
        ".p7m"
    };

    public static string? Validate(IFormFile? file)
    {
        if (file is null || file.Length == 0)
        {
            return "Vui long chon file can kiem tra.";
        }

        if (file.Length > MaxFileSizeBytes)
        {
            return "File vuot qua gioi han 25 MB.";
        }

        var extension = Path.GetExtension(file.FileName);
        if (!AllowedExtensions.Contains(extension))
        {
            return "Dinh dang chua ho tro. Vui long tai len PDF, XML, P7S hoac P7M.";
        }

        return null;
    }
}
