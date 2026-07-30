FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY SignatureCheck.Web.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

ENV ASPNETCORE_URLS=http://+:8080
COPY --from=build /app/publish ./

USER $APP_UID
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl --fail --silent --show-error http://127.0.0.1:8080/healthz > /dev/null || exit 1
ENTRYPOINT ["dotnet", "SignatureCheck.Web.dll"]
