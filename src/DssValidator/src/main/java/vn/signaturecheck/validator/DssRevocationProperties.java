package vn.signaturecheck.validator;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "signature-check.revocation")
public class DssRevocationProperties {
    private boolean ocspEnabled = true;
    private boolean crlEnabled = true;
    private boolean fallbackEnabled = true;
    private boolean cacheEnabled = true;
    private boolean checkRevocationForUntrustedChains = false;
    private String cacheDirectory = "/tmp/dss-revocation-cache";
    private int timeoutConnectionMillis = 3000;
    private int timeoutConnectionRequestMillis = 3000;
    private int timeoutResponseMillis = 5000;
    private int timeoutSocketMillis = 5000;

    public boolean isOcspEnabled() {
        return ocspEnabled;
    }

    public void setOcspEnabled(boolean ocspEnabled) {
        this.ocspEnabled = ocspEnabled;
    }

    public boolean isCrlEnabled() {
        return crlEnabled;
    }

    public void setCrlEnabled(boolean crlEnabled) {
        this.crlEnabled = crlEnabled;
    }

    public boolean isFallbackEnabled() {
        return fallbackEnabled;
    }

    public void setFallbackEnabled(boolean fallbackEnabled) {
        this.fallbackEnabled = fallbackEnabled;
    }

    public boolean isCacheEnabled() {
        return cacheEnabled;
    }

    public void setCacheEnabled(boolean cacheEnabled) {
        this.cacheEnabled = cacheEnabled;
    }

    public boolean isCheckRevocationForUntrustedChains() {
        return checkRevocationForUntrustedChains;
    }

    public void setCheckRevocationForUntrustedChains(boolean checkRevocationForUntrustedChains) {
        this.checkRevocationForUntrustedChains = checkRevocationForUntrustedChains;
    }

    public String getCacheDirectory() {
        return cacheDirectory;
    }

    public void setCacheDirectory(String cacheDirectory) {
        this.cacheDirectory = cacheDirectory;
    }

    public int getTimeoutConnectionMillis() {
        return timeoutConnectionMillis;
    }

    public void setTimeoutConnectionMillis(int timeoutConnectionMillis) {
        this.timeoutConnectionMillis = timeoutConnectionMillis;
    }

    public int getTimeoutConnectionRequestMillis() {
        return timeoutConnectionRequestMillis;
    }

    public void setTimeoutConnectionRequestMillis(int timeoutConnectionRequestMillis) {
        this.timeoutConnectionRequestMillis = timeoutConnectionRequestMillis;
    }

    public int getTimeoutResponseMillis() {
        return timeoutResponseMillis;
    }

    public void setTimeoutResponseMillis(int timeoutResponseMillis) {
        this.timeoutResponseMillis = timeoutResponseMillis;
    }

    public int getTimeoutSocketMillis() {
        return timeoutSocketMillis;
    }

    public void setTimeoutSocketMillis(int timeoutSocketMillis) {
        this.timeoutSocketMillis = timeoutSocketMillis;
    }
}
