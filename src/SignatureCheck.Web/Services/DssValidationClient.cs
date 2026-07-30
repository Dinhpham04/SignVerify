using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using SignatureCheck.Web.Models;

namespace SignatureCheck.Web.Services;

public sealed class DssValidationClient(HttpClient httpClient, ILogger<DssValidationClient> logger)
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        Converters = { new JsonStringEnumConverter(JsonNamingPolicy.SnakeCaseUpper) }
    };

    public async Task<VerificationReport> ValidateAsync(IFormFile file, CancellationToken cancellationToken)
    {
        await using var fileStream = file.OpenReadStream();
        using var content = new MultipartFormDataContent();
        using var fileContent = new StreamContent(fileStream);

        if (!string.IsNullOrWhiteSpace(file.ContentType))
        {
            fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
        }

        content.Add(fileContent, "file", file.FileName);
        content.Add(new StringContent("true"), "checkOcsp");
        content.Add(new StringContent("true"), "checkCrl");

        using var response = await httpClient.PostAsync("/internal/validate", content, cancellationToken);
        var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogWarning("DSS validator returned {StatusCode}: {Body}", response.StatusCode, responseBody);
            return ErrorReport("Dich vu kiem tra chu ky so dang khong phan hoi dung cach.");
        }

        var report = JsonSerializer.Deserialize<VerificationReport>(responseBody, JsonOptions);
        return report ?? ErrorReport("Khong doc duoc ket qua tu dich vu kiem tra chu ky so.");
    }

    public static VerificationReport ErrorReport(string message) =>
        new(
            VerificationFileType.Unknown,
            VerificationOverallStatus.Error,
            DateTimeOffset.UtcNow,
            Array.Empty<SignatureReport>(),
            new[] { message });
}
