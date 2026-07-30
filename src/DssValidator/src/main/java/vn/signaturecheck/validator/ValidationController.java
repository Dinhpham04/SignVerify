package vn.signaturecheck.validator;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
public class ValidationController {
    private final ValidationService validationService;

    public ValidationController(ValidationService validationService) {
        this.validationService = validationService;
    }

    @GetMapping("/internal/health")
    public Map<String, String> health() {
        return Map.of("status", "healthy");
    }

    @PostMapping(value = "/internal/validate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public VerificationReport validate(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "true") boolean checkOcsp,
            @RequestParam(defaultValue = "true") boolean checkCrl) throws IOException {
        return validationService.validate(file, checkOcsp, checkCrl);
    }
}
