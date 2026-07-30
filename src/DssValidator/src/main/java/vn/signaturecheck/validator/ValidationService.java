package vn.signaturecheck.validator;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Locale;

@Service
public class ValidationService {
    private static final long MAX_FILE_SIZE_BYTES = 25L * 1024L * 1024L;

    private final DssValidationEngine dssValidationEngine;

    public ValidationService(DssValidationEngine dssValidationEngine) {
        this.dssValidationEngine = dssValidationEngine;
    }

    public VerificationReport validate(MultipartFile file, boolean checkOcsp, boolean checkCrl) throws IOException {
        if (file.isEmpty()) {
            return error("File tai len bi rong.");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            return error("File vuot qua gioi han 25 MB.");
        }

        var fileType = detectFileType(file);
        if (fileType == VerificationFileType.UNKNOWN) {
            return new VerificationReport(
                    VerificationFileType.UNKNOWN,
                    VerificationOverallStatus.UNSUPPORTED,
                    OffsetDateTime.now(),
                    List.of(),
                    List.of("Dinh dang file chua duoc ho tro."));
        }

        if (fileType == VerificationFileType.PDF) {
            try {
                return dssValidationEngine.validatePdf(file.getBytes(), file.getOriginalFilename(), checkOcsp, checkCrl);
            } catch (Exception exception) {
                return new VerificationReport(
                        VerificationFileType.PDF,
                        VerificationOverallStatus.ERROR,
                        OffsetDateTime.now(),
                        List.of(),
                        List.of("File PDF khong hop le hoac khong doc duoc."));
            }
        }

        if (fileType == VerificationFileType.XML) {
            try {
                return dssValidationEngine.validateXml(file.getBytes(), file.getOriginalFilename(), checkOcsp, checkCrl);
            } catch (Exception exception) {
                return new VerificationReport(
                        VerificationFileType.XML,
                        VerificationOverallStatus.ERROR,
                        OffsetDateTime.now(),
                        List.of(),
                        List.of("File XML khong hop le hoac khong doc duoc."));
            }
        }

        if (fileType == VerificationFileType.P7S || fileType == VerificationFileType.P7M) {
            try {
                return dssValidationEngine.validateCades(
                        fileType,
                        file.getBytes(),
                        file.getOriginalFilename(),
                        checkOcsp,
                        checkCrl);
            } catch (Exception exception) {
                return new VerificationReport(
                        fileType,
                        VerificationOverallStatus.ERROR,
                        OffsetDateTime.now(),
                        List.of(),
                        List.of("File P7S/P7M khong hop le hoac khong doc duoc."));
            }
        }

        var checks = new SignatureChecks(
                CheckStatus.UNKNOWN,
                CheckStatus.UNKNOWN,
                CheckStatus.UNKNOWN,
                checkOcsp ? CheckStatus.UNKNOWN : CheckStatus.NOT_CHECKED,
                checkCrl ? CheckStatus.UNKNOWN : CheckStatus.NOT_CHECKED,
                CheckStatus.UNKNOWN);

        var signature = new SignatureReport(
                VerificationOverallStatus.INDETERMINATE,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                checks,
                List.of("Java DSS adapter da san sang nhan file. Logic xac minh DSS thuc se duoc gan o phase tiep theo."));

        return new VerificationReport(
                fileType,
                VerificationOverallStatus.INDETERMINATE,
                OffsetDateTime.now(),
                List.of(signature),
                List.of());
    }

    private VerificationReport error(String message) {
        return new VerificationReport(
                VerificationFileType.UNKNOWN,
                VerificationOverallStatus.ERROR,
                OffsetDateTime.now(),
                List.of(),
                List.of(message));
    }

    private VerificationFileType detectFileType(MultipartFile file) throws IOException {
        var fileName = file.getOriginalFilename();
        var extension = extensionOf(fileName);
        if (extension.equals(".pdf")) {
            return VerificationFileType.PDF;
        }

        if (extension.equals(".xml")) {
            return VerificationFileType.XML;
        }

        if (extension.equals(".p7s")) {
            return VerificationFileType.P7S;
        }

        if (extension.equals(".p7m")) {
            return VerificationFileType.P7M;
        }

        var header = file.getBytes();
        if (header.length >= 5 && header[0] == '%' && header[1] == 'P' && header[2] == 'D' && header[3] == 'F') {
            return VerificationFileType.PDF;
        }

        return VerificationFileType.UNKNOWN;
    }

    private String extensionOf(String fileName) {
        if (fileName == null) {
            return "";
        }

        var dotIndex = fileName.lastIndexOf('.');
        if (dotIndex < 0) {
            return "";
        }

        return fileName.substring(dotIndex).toLowerCase(Locale.ROOT);
    }
}
