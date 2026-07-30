package vn.signaturecheck.validator;

import eu.europa.esig.dss.diagnostic.CertificateWrapper;
import eu.europa.esig.dss.diagnostic.DiagnosticData;
import eu.europa.esig.dss.enumerations.CertificateStatus;
import eu.europa.esig.dss.enumerations.Indication;
import eu.europa.esig.dss.enumerations.RevocationType;
import eu.europa.esig.dss.jaxb.object.Message;
import eu.europa.esig.dss.model.InMemoryDocument;
import eu.europa.esig.dss.model.signature.SignatureCryptographicVerification;
import eu.europa.esig.dss.model.x509.CertificateToken;
import eu.europa.esig.dss.service.crl.FileCacheCRLSource;
import eu.europa.esig.dss.service.crl.OnlineCRLSource;
import eu.europa.esig.dss.service.http.commons.CommonsDataLoader;
import eu.europa.esig.dss.service.http.commons.OCSPDataLoader;
import eu.europa.esig.dss.service.ocsp.FileCacheOCSPSource;
import eu.europa.esig.dss.service.ocsp.OnlineOCSPSource;
import eu.europa.esig.dss.simplereport.SimpleReport;
import eu.europa.esig.dss.simplereport.jaxb.XmlCertificateChain;
import eu.europa.esig.dss.spi.signature.AdvancedSignature;
import eu.europa.esig.dss.spi.validation.CRLFirstRevocationDataLoadingStrategyFactory;
import eu.europa.esig.dss.spi.validation.CommonCertificateVerifier;
import eu.europa.esig.dss.spi.validation.OCSPFirstRevocationDataLoadingStrategyFactory;
import eu.europa.esig.dss.spi.x509.CertificateSource;
import eu.europa.esig.dss.spi.x509.CommonTrustedCertificateSource;
import eu.europa.esig.dss.spi.x509.KeyStoreCertificateSource;
import eu.europa.esig.dss.spi.x509.revocation.crl.CRLSource;
import eu.europa.esig.dss.spi.x509.revocation.ocsp.OCSPSource;
import eu.europa.esig.dss.validation.SignedDocumentValidator;
import eu.europa.esig.dss.validation.reports.Reports;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class DssValidationEngine {
    private static final String DETACHED_P7S_NEEDS_ORIGINAL_DOCUMENT =
            "File P7S la chu ky roi; can tai kem file goc de kiem tra noi dung duoc ky.";

    private final CertificateSource[] trustedCertificateSources;
    private final CertificateSource[] adjunctCertificateSources;
    private final DssRevocationProperties revocationProperties;

    DssValidationEngine() {
        this(new CertificateSource[0], new CertificateSource[0], new DssRevocationProperties());
    }

    @Autowired
    public DssValidationEngine(
            DssTrustStoreProperties trustStoreProperties,
            DssAdjunctStoreProperties adjunctStoreProperties,
            DssRevocationProperties revocationProperties) {
        this(
                loadTrustedCertificateSources(trustStoreProperties),
                loadCertificateSources(adjunctStoreProperties),
                revocationProperties);
    }

    DssValidationEngine(
            DssTrustStoreProperties trustStoreProperties,
            DssAdjunctStoreProperties adjunctStoreProperties) {
        this(trustStoreProperties, adjunctStoreProperties, new DssRevocationProperties());
    }

    DssValidationEngine(CertificateSource... trustedCertificateSources) {
        this(trustedCertificateSources, new CertificateSource[0], new DssRevocationProperties());
    }

    DssValidationEngine(CertificateSource[] trustedCertificateSources, CertificateSource[] adjunctCertificateSources) {
        this(trustedCertificateSources, adjunctCertificateSources, new DssRevocationProperties());
    }

    DssValidationEngine(
            CertificateSource[] trustedCertificateSources,
            CertificateSource[] adjunctCertificateSources,
            DssRevocationProperties revocationProperties) {
        this.trustedCertificateSources = trustedCertificateSources;
        this.adjunctCertificateSources = adjunctCertificateSources;
        this.revocationProperties = revocationProperties;
    }

    public VerificationReport validatePdf(byte[] content, String fileName, boolean checkOcsp, boolean checkCrl) {
        return validateSignedDocument(VerificationFileType.PDF, content, fileName, checkOcsp, checkCrl);
    }

    public VerificationReport validateXml(byte[] content, String fileName, boolean checkOcsp, boolean checkCrl) {
        return validateSignedDocument(VerificationFileType.XML, content, fileName, checkOcsp, checkCrl);
    }

    public VerificationReport validateCades(
            VerificationFileType fileType,
            byte[] content,
            String fileName,
            boolean checkOcsp,
            boolean checkCrl) {
        return validateSignedDocument(fileType, content, fileName, checkOcsp, checkCrl);
    }

    private VerificationReport validateSignedDocument(
            VerificationFileType fileType,
            byte[] content,
            String fileName,
            boolean checkOcsp,
            boolean checkCrl) {
        var document = new InMemoryDocument(content, fileName);
        var validator = SignedDocumentValidator.fromDocument(document);
        validator.setCertificateVerifier(certificateVerifier(checkOcsp, checkCrl));

        var signatures = validator.getSignatures();
        if (signatures.isEmpty()) {
            return new VerificationReport(
                    fileType,
                    VerificationOverallStatus.UNSIGNED,
                    OffsetDateTime.now(),
                    List.of(),
                    List.of());
        }

        Reports reports = validator.validateDocument();
        SimpleReport simpleReport = reports.getSimpleReport();
        DiagnosticData diagnosticData = reports.getDiagnosticData();
        Map<String, AdvancedSignature> signaturesById = signatures.stream()
                .collect(Collectors.toMap(AdvancedSignature::getId, Function.identity(), (left, right) -> left));

        List<SignatureReport> signatureReports = new ArrayList<>();
        for (String signatureId : simpleReport.getSignatureIdList()) {
            AdvancedSignature signature = signaturesById.get(signatureId);
            var signatureReport = toSignatureReport(
                    simpleReport,
                    diagnosticData,
                    signatureId,
                    signature,
                    checkOcsp,
                    checkCrl);
            signatureReports.add(adjustDetachedP7sReport(fileType, signatureReport));
        }
        var errors = signatureReports.stream().anyMatch(this::needsDetachedOriginalDocument)
                ? List.of(DETACHED_P7S_NEEDS_ORIGINAL_DOCUMENT)
                : List.<String>of();

        return new VerificationReport(
                fileType,
                overallStatus(signatureReports),
                OffsetDateTime.now(),
                signatureReports,
                errors);
    }

    private SignatureReport toSignatureReport(
            SimpleReport simpleReport,
            DiagnosticData diagnosticData,
            String signatureId,
            AdvancedSignature signature,
            boolean checkOcsp,
            boolean checkCrl) {
        CertificateToken signingCertificate = signature != null ? signature.getSigningCertificateToken() : null;
        SignatureCryptographicVerification crypto = null;
        if (signature != null) {
            signature.checkSignatureIntegrity();
            crypto = signature.getSignatureCryptographicVerification();
        }

        var explanations = new ArrayList<String>();
        explanations.addAll(messages(simpleReport.getAdESValidationErrors(signatureId)));
        explanations.addAll(messages(simpleReport.getAdESValidationWarnings(signatureId)));

        return new SignatureReport(
                statusFromIndication(simpleReport.getIndication(signatureId)),
                simpleReport.getSignedBy(signatureId),
                subjectName(signingCertificate),
                issuerName(signingCertificate),
                signingCertificate != null ? signingCertificate.getSerialNumber().toString(16).toUpperCase() : null,
                toOffset(simpleReport.getSigningTime(signatureId)),
                signingCertificate != null ? toOffset(signingCertificate.getNotBefore()) : null,
                signingCertificate != null ? toOffset(signingCertificate.getNotAfter()) : null,
                new SignatureChecks(
                        checkFromBoolean(crypto != null ? crypto.isReferenceDataIntact() : null),
                        checkFromBoolean(crypto != null ? crypto.isSignatureIntact() : null),
                        chainStatus(simpleReport.getCertificateChain(signatureId)),
                        revocationStatus(diagnosticData, signatureId, RevocationType.OCSP, checkOcsp),
                        revocationStatus(diagnosticData, signatureId, RevocationType.CRL, checkCrl),
                        simpleReport.getSignatureTimestamps(signatureId).isEmpty() ? CheckStatus.NOT_CHECKED : CheckStatus.UNKNOWN),
                explanations);
    }

    private CommonCertificateVerifier certificateVerifier(boolean checkOcsp, boolean checkCrl) {
        var verifier = new CommonCertificateVerifier();
        if (trustedCertificateSources.length > 0) {
            verifier.setTrustedCertSources(trustedCertificateSources);
        }
        if (adjunctCertificateSources.length > 0) {
            verifier.setAdjunctCertSources(adjunctCertificateSources);
        }

        boolean ocspEnabled = checkOcsp && revocationProperties.isOcspEnabled();
        boolean crlEnabled = checkCrl && revocationProperties.isCrlEnabled();
        if (ocspEnabled) {
            verifier.setOcspSource(ocspSource());
        }
        if (crlEnabled) {
            verifier.setCrlSource(crlSource());
        }
        if (ocspEnabled && crlEnabled) {
            verifier.setRevocationDataLoadingStrategyFactory(new OCSPFirstRevocationDataLoadingStrategyFactory());
        } else if (crlEnabled) {
            verifier.setRevocationDataLoadingStrategyFactory(new CRLFirstRevocationDataLoadingStrategyFactory());
        }
        verifier.setRevocationFallback(revocationProperties.isFallbackEnabled());
        verifier.setCheckRevocationForUntrustedChains(
                revocationProperties.isCheckRevocationForUntrustedChains());

        return verifier;
    }

    private OCSPSource ocspSource() {
        var onlineSource = new OnlineOCSPSource(configureDataLoader(new OCSPDataLoader()));
        if (!revocationProperties.isCacheEnabled()) {
            return onlineSource;
        }

        var cacheSource = new FileCacheOCSPSource(onlineSource);
        cacheSource.setFileCacheDirectory(cacheDirectory("ocsp"));
        return cacheSource;
    }

    private CRLSource crlSource() {
        var onlineSource = new OnlineCRLSource(configureDataLoader(new CommonsDataLoader()));
        if (!revocationProperties.isCacheEnabled()) {
            return onlineSource;
        }

        var cacheSource = new FileCacheCRLSource(onlineSource);
        cacheSource.setFileCacheDirectory(cacheDirectory("crl"));
        return cacheSource;
    }

    private CommonsDataLoader configureDataLoader(CommonsDataLoader dataLoader) {
        dataLoader.setTimeoutConnection(revocationProperties.getTimeoutConnectionMillis());
        dataLoader.setTimeoutConnectionRequest(revocationProperties.getTimeoutConnectionRequestMillis());
        dataLoader.setTimeoutResponse(revocationProperties.getTimeoutResponseMillis());
        dataLoader.setTimeoutSocket(revocationProperties.getTimeoutSocketMillis());
        return dataLoader;
    }

    private File cacheDirectory(String childDirectory) {
        var directory = new File(revocationProperties.getCacheDirectory(), childDirectory);
        if (!directory.exists() && !directory.mkdirs()) {
            throw new IllegalStateException("Cannot create DSS revocation cache directory " + directory);
        }

        return directory;
    }

    private static CertificateSource[] loadTrustedCertificateSources(DssTrustStoreProperties properties) {
        if (!properties.enabled()) {
            return new CertificateSource[0];
        }

        try {
            var keyStore = new KeyStoreCertificateSource(
                    new File(properties.path()),
                    properties.type(),
                    properties.password().toCharArray());
            var trustedCertificateSource = new CommonTrustedCertificateSource();
            trustedCertificateSource.importAsTrusted(keyStore);
            return new CertificateSource[]{trustedCertificateSource};
        } catch (IOException exception) {
            throw new IllegalStateException("Cannot load DSS trust store from " + properties.path(), exception);
        }
    }

    private static CertificateSource[] loadCertificateSources(DssAdjunctStoreProperties properties) {
        if (!properties.enabled()) {
            return new CertificateSource[0];
        }

        try {
            return new CertificateSource[]{
                    new KeyStoreCertificateSource(
                            new File(properties.path()),
                            properties.type(),
                            properties.password().toCharArray())
            };
        } catch (IOException exception) {
            throw new IllegalStateException("Cannot load DSS adjunct store from " + properties.path(), exception);
        }
    }

    private VerificationOverallStatus overallStatus(List<SignatureReport> signatures) {
        if (signatures.isEmpty()) {
            return VerificationOverallStatus.UNSIGNED;
        }

        if (signatures.stream().allMatch(signature -> signature.status() == VerificationOverallStatus.VALID)) {
            return VerificationOverallStatus.VALID;
        }

        if (signatures.stream().anyMatch(signature -> signature.status() == VerificationOverallStatus.INVALID)) {
            return VerificationOverallStatus.INVALID;
        }

        return VerificationOverallStatus.INDETERMINATE;
    }

    private VerificationOverallStatus statusFromIndication(Indication indication) {
        if (indication == Indication.TOTAL_PASSED || indication == Indication.PASSED) {
            return VerificationOverallStatus.VALID;
        }

        if (indication == Indication.TOTAL_FAILED || indication == Indication.FAILED) {
            return VerificationOverallStatus.INVALID;
        }

        if (indication == Indication.NO_SIGNATURE_FOUND) {
            return VerificationOverallStatus.UNSIGNED;
        }

        return VerificationOverallStatus.INDETERMINATE;
    }

    private CheckStatus chainStatus(XmlCertificateChain certificateChain) {
        if (certificateChain == null || certificateChain.getCertificate().isEmpty()) {
            return CheckStatus.UNKNOWN;
        }

        if (certificateChain.getCertificate().stream().anyMatch(certificate -> certificate.isTrusted())) {
            return CheckStatus.PASS;
        }

        return CheckStatus.UNKNOWN;
    }

    private SignatureReport adjustDetachedP7sReport(VerificationFileType fileType, SignatureReport signatureReport) {
        if (fileType != VerificationFileType.P7S || !needsDetachedOriginalDocument(signatureReport)) {
            return signatureReport;
        }

        var explanations = new ArrayList<>(signatureReport.explanations());
        if (!explanations.contains(DETACHED_P7S_NEEDS_ORIGINAL_DOCUMENT)) {
            explanations.add(DETACHED_P7S_NEEDS_ORIGINAL_DOCUMENT);
        }

        var checks = signatureReport.checks();
        return new SignatureReport(
                VerificationOverallStatus.INDETERMINATE,
                signatureReport.signerName(),
                signatureReport.signerOrganization(),
                signatureReport.issuerName(),
                signatureReport.serialNumber(),
                signatureReport.signingTime(),
                signatureReport.certificateValidFrom(),
                signatureReport.certificateValidTo(),
                new SignatureChecks(
                        CheckStatus.UNKNOWN,
                        CheckStatus.UNKNOWN,
                        checks.certificateChain(),
                        checks.revocationOcsp(),
                        checks.revocationCrl(),
                        checks.timestamp()),
                explanations);
    }

    private boolean needsDetachedOriginalDocument(SignatureReport signatureReport) {
        return signatureReport.explanations().stream()
                .anyMatch(explanation -> explanation.contains("reference data object has not been found")
                        || explanation.contains("original document is not found")
                        || explanation.contains("Detached content is not provided")
                        || explanation.equals(DETACHED_P7S_NEEDS_ORIGINAL_DOCUMENT));
    }

    private CheckStatus revocationStatus(
            DiagnosticData diagnosticData,
            String signatureId,
            RevocationType type,
            boolean requested) {
        if (!requested) {
            return CheckStatus.NOT_CHECKED;
        }

        List<CertificateWrapper> certificates = diagnosticData.getSignatureCertificateChain(signatureId).stream()
                .filter(certificate -> !certificate.isTrusted())
                .toList();
        if (certificates.isEmpty()) {
            return CheckStatus.NOT_CHECKED;
        }

        boolean hasGoodRevocationData = false;
        for (CertificateWrapper certificate : certificates) {
            var typedRevocations = certificate.getCertificateRevocationData().stream()
                    .filter(revocation -> revocation.getRevocationType() == type)
                    .toList();

            if (typedRevocations.stream().anyMatch(revocation -> revocation.getStatus() == CertificateStatus.REVOKED)) {
                return CheckStatus.FAIL;
            }

            if (typedRevocations.stream().anyMatch(revocation -> revocation.getStatus() == CertificateStatus.GOOD)) {
                hasGoodRevocationData = true;
            }
        }

        if (hasGoodRevocationData) {
            return CheckStatus.PASS;
        }

        return CheckStatus.UNKNOWN;
    }

    private CheckStatus checkFromBoolean(Boolean value) {
        if (value == null) {
            return CheckStatus.UNKNOWN;
        }

        return value ? CheckStatus.PASS : CheckStatus.FAIL;
    }

    private String subjectName(CertificateToken certificate) {
        return certificate != null ? certificate.getSubject().getPrettyPrintRFC2253() : null;
    }

    private String issuerName(CertificateToken certificate) {
        return certificate != null ? certificate.getIssuer().getPrettyPrintRFC2253() : null;
    }

    private OffsetDateTime toOffset(Date date) {
        return date != null ? date.toInstant().atOffset(ZoneOffset.UTC) : null;
    }

    private List<String> messages(List<Message> messages) {
        return messages.stream()
                .map(Message::getValue)
                .filter(value -> value != null && !value.isBlank())
                .toList();
    }
}
