package vn.signaturecheck.validator;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "signature-check.adjunct-store")
public class DssAdjunctStoreProperties {
    private String path = "";
    private String type = "PKCS12";
    private String password = "";

    public boolean enabled() {
        return path != null && !path.isBlank();
    }

    public String path() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String type() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String password() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
