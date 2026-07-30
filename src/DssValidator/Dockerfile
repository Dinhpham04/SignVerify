FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /src

COPY pom.xml ./
RUN mvn -q -DskipTests dependency:go-offline

COPY src ./src
RUN mvn -q package

FROM eclipse-temurin:21-jre AS runtime
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --system app \
    && useradd --system --gid app --home-dir /app app \
    && mkdir -p /tmp/dss-revocation-cache \
    && chown -R app:app /app /tmp/dss-revocation-cache

COPY --from=build --chown=app:app /src/target/dss-validator-0.1.0.jar /app/dss-validator.jar
EXPOSE 8080

USER app
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl --fail --silent --show-error http://127.0.0.1:8080/internal/health > /dev/null || exit 1
ENTRYPOINT ["java", "-jar", "/app/dss-validator.jar"]
