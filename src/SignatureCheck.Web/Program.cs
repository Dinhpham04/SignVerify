using System.Diagnostics;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

var rateLimitPermitLimit = builder.Configuration.GetValue<int?>("RateLimit:PermitLimit") ?? 30;
var rateLimitWindowSeconds = builder.Configuration.GetValue<int?>("RateLimit:WindowSeconds") ?? 60;
var trustForwardedHeaders = builder.Configuration.GetValue<bool>("ReverseProxy:TrustForwardedHeaders");

builder.Services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = SignatureCheck.Web.Services.UploadPolicy.MaxRequestSizeBytes;
});
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(
        new System.Text.Json.Serialization.JsonStringEnumConverter(System.Text.Json.JsonNamingPolicy.SnakeCaseUpper));
});
builder.Services.AddRazorPages();
builder.Services.AddHealthChecks();
if (trustForwardedHeaders)
{
    builder.Services.Configure<ForwardedHeadersOptions>(options =>
    {
        options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
        options.ForwardLimit = 1;

        // The production compose file only publishes the API on host loopback.
        // Nginx is therefore the sole external request source for this endpoint.
        options.KnownIPNetworks.Clear();
        options.KnownProxies.Clear();
    });
}
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins(
                builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                ?? ["http://localhost:3000"])
            .AllowAnyHeader()
            .AllowAnyMethod());
});
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
    {
        var clientKey = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        return RateLimitPartition.GetFixedWindowLimiter(clientKey, _ => new FixedWindowRateLimiterOptions
        {
            AutoReplenishment = true,
            PermitLimit = rateLimitPermitLimit,
            QueueLimit = 0,
            Window = TimeSpan.FromSeconds(rateLimitWindowSeconds)
        });
    });
    options.OnRejected = async (context, cancellationToken) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        await context.HttpContext.Response.WriteAsJsonAsync(
            new
            {
                error = new
                {
                    code = "RATE_LIMITED",
                    message = "Qua nhieu yeu cau. Vui long thu lai sau."
                }
            },
            cancellationToken);
    };
});
builder.Services.AddHttpClient<SignatureCheck.Web.Services.DssValidationClient>(client =>
{
    var validatorUrl = Environment.GetEnvironmentVariable("DSS_VALIDATOR_URL")
        ?? builder.Configuration["DssValidator:BaseUrl"]
        ?? "http://localhost:8080";

    client.BaseAddress = new Uri(validatorUrl);
    client.Timeout = TimeSpan.FromSeconds(70);
});

var app = builder.Build();

if (trustForwardedHeaders)
{
    app.UseForwardedHeaders();
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseRouting();

app.UseCors("Frontend");
app.UseRequestTracking();
app.UseRateLimiter();
app.UseAuthorization();

app.MapHealthChecks("/healthz")
   .DisableRateLimiting();

app.MapPost("/api/verification-jobs", async (
    IFormFile? file,
    SignatureCheck.Web.Services.DssValidationClient validationClient,
    ILogger<Program> logger,
    CancellationToken cancellationToken) =>
{
    var validationError = SignatureCheck.Web.Services.UploadPolicy.Validate(file);
    if (validationError is not null)
    {
        return Results.BadRequest(new { error = new { code = "INVALID_UPLOAD", message = validationError } });
    }

    SignatureCheck.Web.Models.VerificationReport report;
    try
    {
        report = await validationClient.ValidateAsync(file!, cancellationToken);
    }
    catch (Exception exception) when (exception is not OperationCanceledException)
    {
        logger.LogError(exception, "DSS validator request failed");
        report = SignatureCheck.Web.Services.DssValidationClient.ErrorReport(
            "Khong the ket noi dich vu kiem tra chu ky so.");
    }

    return Results.Ok(report);
})
.DisableAntiforgery();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();

internal static partial class RequestTrackingApplicationBuilderExtensions
{
    public static IApplicationBuilder UseRequestTracking(this IApplicationBuilder app)
    {
        return app.Use(async (context, next) =>
        {
            if (context.Request.Path == "/healthz")
            {
                await next(context);
                return;
            }

            var requestId = ResolveRequestId(context);
            context.TraceIdentifier = requestId;
            context.Response.Headers["X-Request-ID"] = requestId;

            var logger = context.RequestServices
                .GetRequiredService<ILoggerFactory>()
                .CreateLogger("SignatureCheck.Web.Request");
            var stopwatch = Stopwatch.StartNew();

            using (logger.BeginScope(new Dictionary<string, object?> { ["RequestId"] = requestId }))
            {
                try
                {
                    await next(context);
                }
                finally
                {
                    stopwatch.Stop();
                    logger.LogInformation(
                        "HTTP {Method} {Path} responded {StatusCode} in {ElapsedMilliseconds} ms",
                        context.Request.Method,
                        context.Request.Path.Value,
                        context.Response.StatusCode,
                        stopwatch.ElapsedMilliseconds);
                }
            }
        });
    }

    private static string ResolveRequestId(HttpContext context)
    {
        var incomingRequestId = context.Request.Headers["X-Request-ID"].ToString();

        if (IsSafeRequestId(incomingRequestId))
        {
            return incomingRequestId;
        }

        return context.TraceIdentifier;
    }

    private static bool IsSafeRequestId(string value)
    {
        return value.Length is > 0 and <= 100 && !value.Any(char.IsControl);
    }
}
