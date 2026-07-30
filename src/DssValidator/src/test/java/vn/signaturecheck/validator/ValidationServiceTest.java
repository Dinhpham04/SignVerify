package vn.signaturecheck.validator;

import org.junit.jupiter.api.Test;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.interactive.digitalsignature.PDSignature;
import org.apache.pdfbox.pdmodel.interactive.digitalsignature.SignatureInterface;
import org.apache.pdfbox.pdmodel.interactive.digitalsignature.SignatureOptions;
import org.springframework.mock.web.MockMultipartFile;
import org.bouncycastle.cert.jcajce.JcaCertStore;
import org.bouncycastle.cert.jcajce.JcaX509CertificateConverter;
import org.bouncycastle.cert.jcajce.JcaX509v3CertificateBuilder;
import org.bouncycastle.cms.CMSSignedData;
import org.bouncycastle.cms.CMSSignedDataGenerator;
import org.bouncycastle.cms.CMSTypedData;
import org.bouncycastle.cms.CMSProcessableByteArray;
import org.bouncycastle.cms.jcajce.JcaSignerInfoGeneratorBuilder;
import org.bouncycastle.operator.ContentSigner;
import org.bouncycastle.operator.jcajce.JcaContentSignerBuilder;
import org.bouncycastle.operator.jcajce.JcaDigestCalculatorProviderBuilder;
import eu.europa.esig.dss.model.x509.CertificateToken;
import eu.europa.esig.dss.spi.x509.CommonTrustedCertificateSource;
import org.bouncycastle.asn1.x509.BasicConstraints;
import org.bouncycastle.asn1.x509.Extension;
import org.bouncycastle.asn1.x509.KeyUsage;
import org.junit.jupiter.api.io.TempDir;
import eu.europa.esig.dss.enumerations.DigestAlgorithm;
import eu.europa.esig.dss.enumerations.EncryptionAlgorithm;
import eu.europa.esig.dss.enumerations.SignatureAlgorithm;
import eu.europa.esig.dss.enumerations.SignatureLevel;
import eu.europa.esig.dss.enumerations.SignaturePackaging;
import eu.europa.esig.dss.model.InMemoryDocument;
import eu.europa.esig.dss.model.SignatureValue;
import eu.europa.esig.dss.spi.validation.CommonCertificateVerifier;
import eu.europa.esig.dss.xades.XAdESSignatureParameters;
import eu.europa.esig.dss.xades.signature.XAdESService;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyStore;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.Signature;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ValidationServiceTest {
    private final ValidationService service = new ValidationService(new DssValidationEngine());

    @TempDir
    private Path tempDir;

    @Test
    void reportsUnsupportedForUnknownFileType() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "sample.txt",
                "text/plain",
                "hello".getBytes(StandardCharsets.US_ASCII));

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.UNKNOWN);
        assertThat(report.overallStatus()).isEqualTo(VerificationOverallStatus.UNSUPPORTED);
        assertThat(report.signatures()).isEmpty();
        assertThat(report.errors()).contains("Dinh dang file chua duoc ho tro.");
    }

    @Test
    void reportsErrorForMalformedPdf() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "broken.pdf",
                "application/pdf",
                "%PDF-1.4 smoke test".getBytes(StandardCharsets.US_ASCII));

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.PDF);
        assertThat(report.overallStatus()).isEqualTo(VerificationOverallStatus.ERROR);
        assertThat(report.signatures()).isEmpty();
        assertThat(report.errors()).contains("File PDF khong hop le hoac khong doc duoc.");
    }

    @Test
    void reportsUnsignedForValidUnsignedPdf() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "unsigned.pdf",
                "application/pdf",
                minimalUnsignedPdf());

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.PDF);
        assertThat(report.overallStatus()).isEqualTo(VerificationOverallStatus.UNSIGNED);
        assertThat(report.signatures()).isEmpty();
        assertThat(report.errors()).isEmpty();
    }

    @Test
    void reportsErrorForMalformedXml() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "broken.xml",
                "application/xml",
                "<invoice><broken></invoice>".getBytes(StandardCharsets.UTF_8));

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.XML);
        assertThat(report.overallStatus()).isEqualTo(VerificationOverallStatus.ERROR);
        assertThat(report.signatures()).isEmpty();
        assertThat(report.errors()).contains("File XML khong hop le hoac khong doc duoc.");
    }

    @Test
    void reportsUnsignedForValidUnsignedXml() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "invoice.xml",
                "application/xml",
                minimalUnsignedXml());

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.XML);
        assertThat(report.overallStatus()).isEqualTo(VerificationOverallStatus.UNSIGNED);
        assertThat(report.signatures()).isEmpty();
        assertThat(report.errors()).isEmpty();
    }

    @Test
    void reportsSignatureDetailsForSignedXml() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "signed-invoice.xml",
                "application/xml",
                signedXml());

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.XML);
        assertThat(report.overallStatus()).isNotIn(
                VerificationOverallStatus.UNSIGNED,
                VerificationOverallStatus.ERROR);
        assertThat(report.errors()).isEmpty();
        assertThat(report.signatures()).hasSize(1);

        var signature = report.signatures().getFirst();
        assertThat(signature.signerOrganization()).contains("Signature Check Test");
        assertThat(signature.issuerName()).contains("Signature Check Test");
        assertThat(signature.serialNumber()).isNotBlank();
        assertThat(signature.signingTime()).isNotNull();
        assertThat(signature.certificateValidFrom()).isNotNull();
        assertThat(signature.certificateValidTo()).isNotNull();
        assertThat(signature.checks().documentIntegrity()).isEqualTo(CheckStatus.PASS);
        assertThat(signature.checks().cryptographicSignature()).isEqualTo(CheckStatus.PASS);
    }

    @Test
    void reportsErrorForMalformedP7m() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "broken.p7m",
                "application/pkcs7-mime",
                "not a cms document".getBytes(StandardCharsets.US_ASCII));

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.P7M);
        assertThat(report.overallStatus()).isEqualTo(VerificationOverallStatus.ERROR);
        assertThat(report.signatures()).isEmpty();
        assertThat(report.errors()).contains("File P7S/P7M khong hop le hoac khong doc duoc.");
    }

    @Test
    void reportsSignatureDetailsForAttachedP7m() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "signed-document.p7m",
                "application/pkcs7-mime",
                signedCms(true));

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.P7M);
        assertThat(report.overallStatus()).isNotIn(
                VerificationOverallStatus.UNSIGNED,
                VerificationOverallStatus.ERROR);
        assertThat(report.errors()).isEmpty();
        assertThat(report.signatures()).hasSize(1);

        var signature = report.signatures().getFirst();
        assertThat(signature.signerOrganization()).contains("Signature Check Test");
        assertThat(signature.issuerName()).contains("Signature Check Test");
        assertThat(signature.serialNumber()).isNotBlank();
        assertThat(signature.signingTime()).isNotNull();
        assertThat(signature.certificateValidFrom()).isNotNull();
        assertThat(signature.certificateValidTo()).isNotNull();
        assertThat(signature.checks().documentIntegrity()).isEqualTo(CheckStatus.PASS);
        assertThat(signature.checks().cryptographicSignature()).isEqualTo(CheckStatus.PASS);
    }

    @Test
    void reportsSignatureDetailsForAttachedP7s() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "signed-document.p7s",
                "application/pkcs7-signature",
                signedCms(true));

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.P7S);
        assertThat(report.overallStatus()).isNotIn(
                VerificationOverallStatus.UNSIGNED,
                VerificationOverallStatus.ERROR);
        assertThat(report.errors()).isEmpty();
        assertThat(report.signatures()).hasSize(1);
        assertThat(report.signatures().getFirst().checks().cryptographicSignature()).isEqualTo(CheckStatus.PASS);
    }

    @Test
    void reportsDetachedP7sNeedsOriginalDocument() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "detached-signature.p7s",
                "application/pkcs7-signature",
                signedCms(false));

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.P7S);
        assertThat(report.overallStatus()).isEqualTo(VerificationOverallStatus.INDETERMINATE);
        assertThat(report.signatures()).hasSize(1);
        assertThat(report.errors()).contains("File P7S la chu ky roi; can tai kem file goc de kiem tra noi dung duoc ky.");
        var signature = report.signatures().getFirst();
        assertThat(signature.signerOrganization()).contains("Signature Check Test");
        assertThat(signature.checks().documentIntegrity()).isEqualTo(CheckStatus.UNKNOWN);
        assertThat(signature.checks().cryptographicSignature()).isEqualTo(CheckStatus.UNKNOWN);
        assertThat(signature.explanations()).contains("File P7S la chu ky roi; can tai kem file goc de kiem tra noi dung duoc ky.");
    }

    @Test
    void reportsSignatureDetailsForSignedPdf() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "signed.pdf",
                "application/pdf",
                signedPdf());

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.PDF);
        assertThat(report.overallStatus()).isNotIn(
                VerificationOverallStatus.UNSIGNED,
                VerificationOverallStatus.ERROR);
        assertThat(report.errors()).isEmpty();
        assertThat(report.signatures()).hasSize(1);

        var signature = report.signatures().getFirst();
        assertThat(signature.signerName()).isNotBlank();
        assertThat(signature.signerOrganization()).contains("Signature Check Test");
        assertThat(signature.issuerName()).contains("Signature Check Test");
        assertThat(signature.serialNumber()).isNotBlank();
        assertThat(signature.signingTime()).isNotNull();
        assertThat(signature.certificateValidFrom()).isNotNull();
        assertThat(signature.certificateValidTo()).isNotNull();
        assertThat(signature.checks().documentIntegrity()).isEqualTo(CheckStatus.PASS);
        assertThat(signature.checks().cryptographicSignature()).isEqualTo(CheckStatus.PASS);
    }

    @Test
    void reportsInvalidForSignedPdfModifiedAfterSigning() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "tampered.pdf",
                "application/pdf",
                tamperSignedPdf());

        var report = service.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.PDF);
        assertThat(report.overallStatus()).isEqualTo(VerificationOverallStatus.INVALID);
        assertThat(report.signatures()).hasSize(1);

        var signature = report.signatures().getFirst();
        assertThat(signature.checks().documentIntegrity()).isEqualTo(CheckStatus.FAIL);
        assertThat(signature.checks().cryptographicSignature()).isEqualTo(CheckStatus.FAIL);
    }

    @Test
    void reportsTrustedCertificateChainWhenRootCaIsConfigured() throws Exception {
        var identity = SigningIdentity.issuedByTestRootCa();
        var trustedCertificates = new CommonTrustedCertificateSource();
        trustedCertificates.addCertificate(new CertificateToken(identity.trustAnchor()));
        var trustedService = new ValidationService(new DssValidationEngine(trustedCertificates));
        var file = new MockMultipartFile(
                "file",
                "trusted-chain.pdf",
                "application/pdf",
                signedPdf(identity));

        var report = trustedService.validate(file, true, true);

        assertThat(report.fileType()).isEqualTo(VerificationFileType.PDF);
        assertThat(report.errors()).isEmpty();
        assertThat(report.signatures()).hasSize(1);

        var signature = report.signatures().getFirst();
        assertThat(signature.signerOrganization()).contains("Signature Check Test");
        assertThat(signature.issuerName()).contains("Signature Check Test Root CA");
        assertThat(signature.checks().documentIntegrity()).isEqualTo(CheckStatus.PASS);
        assertThat(signature.checks().cryptographicSignature()).isEqualTo(CheckStatus.PASS);
        assertThat(signature.checks().certificateChain()).isEqualTo(CheckStatus.PASS);
    }

    @Test
    void reportsRevocationChecksAsNotCheckedWhenRequestDisablesThem() throws Exception {
        var file = new MockMultipartFile(
                "file",
                "signed.pdf",
                "application/pdf",
                signedPdf());

        var report = service.validate(file, false, false);

        assertThat(report.signatures()).hasSize(1);
        var checks = report.signatures().getFirst().checks();
        assertThat(checks.revocationOcsp()).isEqualTo(CheckStatus.NOT_CHECKED);
        assertThat(checks.revocationCrl()).isEqualTo(CheckStatus.NOT_CHECKED);
    }

    @Test
    void loadsTrustedCertificateChainFromPkcs12TrustStore() throws Exception {
        var identity = SigningIdentity.issuedByTestRootCa();
        var trustStorePath = writeTrustStore(identity.trustAnchor());
        var trustStoreProperties = new DssTrustStoreProperties();
        trustStoreProperties.setPath(trustStorePath.toString());
        trustStoreProperties.setType("PKCS12");
        trustStoreProperties.setPassword("changeit");
        var trustedService = new ValidationService(new DssValidationEngine(
                trustStoreProperties,
                new DssAdjunctStoreProperties()));
        var file = new MockMultipartFile(
                "file",
                "trusted-store.pdf",
                "application/pdf",
                signedPdf(identity));

        var report = trustedService.validate(file, true, true);

        assertThat(report.signatures()).hasSize(1);
        assertThat(report.signatures().getFirst().checks().certificateChain()).isEqualTo(CheckStatus.PASS);
    }

    private static byte[] minimalUnsignedPdf() {
        var contentStream = "BT 50 100 Td (Smoke PDF) Tj ET\n";
        var objects = List.of(
                "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
                "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
                "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Contents 4 0 R /Resources << >> >>\nendobj\n",
                "4 0 obj\n<< /Length " + byteLength(contentStream) + " >>\nstream\n" + contentStream + "endstream\nendobj\n");

        var content = new StringBuilder("%PDF-1.4\n");
        var offsets = new ArrayList<Integer>();
        offsets.add(0);

        for (var object : objects) {
            offsets.add(byteLength(content));
            content.append(object);
        }

        var xrefOffset = byteLength(content);
        content.append("xref\n");
        content.append("0 ").append(offsets.size()).append("\n");
        content.append("0000000000 65535 f \n");
        for (var index = 1; index < offsets.size(); index++) {
            content.append(String.format("%010d 00000 n \n", offsets.get(index)));
        }
        content.append("trailer\n");
        content.append("<< /Size ").append(offsets.size()).append(" /Root 1 0 R >>\n");
        content.append("startxref\n");
        content.append(xrefOffset).append("\n");
        content.append("%%EOF\n");

        return content.toString().getBytes(StandardCharsets.US_ASCII);
    }

    private static byte[] minimalUnsignedXml() {
        return """
                <?xml version="1.0" encoding="UTF-8"?>
                <Invoice>
                    <InvoiceNo>INV-001</InvoiceNo>
                    <Amount>100000</Amount>
                </Invoice>
                """.getBytes(StandardCharsets.UTF_8);
    }

    private static byte[] signedXml() throws Exception {
        return signedXml(SigningIdentity.selfSigned());
    }

    private static byte[] signedXml(SigningIdentity signingIdentity) throws Exception {
        var document = new InMemoryDocument(minimalUnsignedXml(), "invoice.xml");
        var certificateToken = new CertificateToken(signingIdentity.certificate());

        var parameters = new XAdESSignatureParameters();
        parameters.setSignatureLevel(SignatureLevel.XAdES_BASELINE_B);
        parameters.setSignaturePackaging(SignaturePackaging.ENVELOPED);
        parameters.setDigestAlgorithm(DigestAlgorithm.SHA256);
        parameters.setEncryptionAlgorithm(EncryptionAlgorithm.RSA);
        parameters.setSigningCertificate(certificateToken);
        parameters.setCertificateChain(certificateToken);

        var xadesService = new XAdESService(new CommonCertificateVerifier());
        var toBeSigned = xadesService.getDataToSign(document, parameters);

        Signature signer = Signature.getInstance(SignatureAlgorithm.RSA_SHA256.getJCEId());
        signer.initSign(signingIdentity.privateKey());
        signer.update(toBeSigned.getBytes());
        var signatureValue = new SignatureValue(SignatureAlgorithm.RSA_SHA256, signer.sign());

        return xadesService.signDocument(document, parameters, signatureValue).openStream().readAllBytes();
    }

    private static byte[] signedCms(boolean encapsulateContent) throws Exception {
        return signedCms(SigningIdentity.selfSigned(), encapsulateContent);
    }

    private static byte[] signedCms(SigningIdentity signingIdentity, boolean encapsulateContent) throws Exception {
        var generator = new CMSSignedDataGenerator();
        ContentSigner signer = new JcaContentSignerBuilder("SHA256withRSA").build(signingIdentity.privateKey());
        generator.addSignerInfoGenerator(new JcaSignerInfoGeneratorBuilder(
                new JcaDigestCalculatorProviderBuilder().build()).build(signer, signingIdentity.certificate()));
        generator.addCertificates(new JcaCertStore(Arrays.asList(signingIdentity.certificateChain())));

        CMSTypedData message = new CMSProcessableByteArray("CAdES smoke content".getBytes(StandardCharsets.UTF_8));
        return generator.generate(message, encapsulateContent).getEncoded();
    }

    private static int byteLength(StringBuilder content) {
        return content.toString().getBytes(StandardCharsets.US_ASCII).length;
    }

    private static int byteLength(String content) {
        return content.getBytes(StandardCharsets.US_ASCII).length;
    }

    private static byte[] signedPdf() throws Exception {
        return signedPdf(SigningIdentity.selfSigned());
    }

    private static byte[] signedPdf(SigningIdentity signingIdentity) throws Exception {
        try (var document = Loader.loadPDF(minimalUnsignedPdf());
             var output = new ByteArrayOutputStream()) {
            var signature = new PDSignature();
            signature.setFilter(PDSignature.FILTER_ADOBE_PPKLITE);
            signature.setSubFilter(PDSignature.SUBFILTER_ADBE_PKCS7_DETACHED);
            signature.setName("Nguyen Van A");
            signature.setLocation("Viet Nam");
            signature.setReason("Automated regression test");
            signature.setSignDate(Calendar.getInstance());

            var options = new SignatureOptions();
            options.setPreferredSignatureSize(SignatureOptions.DEFAULT_SIGNATURE_SIZE * 2);
            document.addSignature(signature, signingIdentity, options);
            document.saveIncremental(output);
            return output.toByteArray();
        }
    }

    private static byte[] tamperSignedPdf() throws Exception {
        var pdf = signedPdf();
        var target = "Smoke PDF".getBytes(StandardCharsets.US_ASCII);
        for (var index = 0; index <= pdf.length - target.length; index++) {
            var matches = true;
            for (var offset = 0; offset < target.length; offset++) {
                if (pdf[index + offset] != target[offset]) {
                    matches = false;
                    break;
                }
            }

            if (matches) {
                pdf[index] = 'T';
                return pdf;
            }
        }

        throw new IllegalStateException("Signed PDF fixture does not contain expected content marker.");
    }

    private Path writeTrustStore(X509Certificate trustAnchor) throws Exception {
        var path = tempDir.resolve("trusted-root.p12");
        var password = "changeit".toCharArray();
        var keyStore = KeyStore.getInstance("PKCS12");
        keyStore.load(null, password);
        keyStore.setCertificateEntry("signature-check-test-root", trustAnchor);

        try (OutputStream output = Files.newOutputStream(path)) {
            keyStore.store(output, password);
        }

        return path;
    }

    private record SigningIdentity(
            PrivateKey privateKey,
            X509Certificate certificate,
            X509Certificate trustAnchor,
            Certificate[] certificateChain) implements SignatureInterface {
        static SigningIdentity selfSigned() throws Exception {
            var keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            var keyPair = keyPairGenerator.generateKeyPair();
            var certificate = selfSignedCertificate(keyPair);
            return new SigningIdentity(
                    keyPair.getPrivate(),
                    certificate,
                    certificate,
                    new Certificate[]{certificate});
        }

        static SigningIdentity issuedByTestRootCa() throws Exception {
            var keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            var rootKeyPair = keyPairGenerator.generateKeyPair();
            var signingKeyPair = keyPairGenerator.generateKeyPair();
            var rootCertificate = rootCertificate(rootKeyPair);
            var signingCertificate = issuedCertificate(signingKeyPair, rootKeyPair, rootCertificate);

            return new SigningIdentity(
                    signingKeyPair.getPrivate(),
                    signingCertificate,
                    rootCertificate,
                    new Certificate[]{signingCertificate, rootCertificate});
        }

        @Override
        public byte[] sign(InputStream content) throws IOException {
            try {
                var generator = new CMSSignedDataGenerator();
                ContentSigner signer = new JcaContentSignerBuilder("SHA256withRSA").build(privateKey);
                generator.addSignerInfoGenerator(new JcaSignerInfoGeneratorBuilder(
                        new JcaDigestCalculatorProviderBuilder().build()).build(signer, certificate));
                generator.addCertificates(new JcaCertStore(Arrays.asList(certificateChain)));

                CMSTypedData message = new CMSProcessableByteArray(content.readAllBytes());
                CMSSignedData signedData = generator.generate(message, false);
                return signedData.getEncoded();
            } catch (Exception exception) {
                throw new IOException(exception);
            }
        }

        private static X509Certificate selfSignedCertificate(KeyPair keyPair) throws Exception {
            var now = Instant.now();
            var subject = new org.bouncycastle.asn1.x500.X500Name(
                    "CN=Nguyen Van A,O=Signature Check Test,C=VN");
            var builder = new JcaX509v3CertificateBuilder(
                    subject,
                    BigInteger.valueOf(now.toEpochMilli()),
                    Date.from(now.minusSeconds(60)),
                    Date.from(now.plusSeconds(86400)),
                    subject,
                    keyPair.getPublic());
            var signer = new JcaContentSignerBuilder("SHA256withRSA").build(keyPair.getPrivate());
            var certificate = new JcaX509CertificateConverter().getCertificate(builder.build(signer));
            certificate.verify(keyPair.getPublic());
            return certificate;
        }

        private static X509Certificate rootCertificate(KeyPair keyPair) throws Exception {
            var now = Instant.now();
            var subject = new org.bouncycastle.asn1.x500.X500Name(
                    "CN=Signature Check Test Root CA,O=Signature Check Test,C=VN");
            var builder = new JcaX509v3CertificateBuilder(
                    subject,
                    BigInteger.valueOf(now.toEpochMilli()),
                    Date.from(now.minusSeconds(60)),
                    Date.from(now.plusSeconds(86400)),
                    subject,
                    keyPair.getPublic());
            builder.addExtension(Extension.basicConstraints, true, new BasicConstraints(true));
            builder.addExtension(Extension.keyUsage, true, new KeyUsage(KeyUsage.keyCertSign | KeyUsage.cRLSign));

            var signer = new JcaContentSignerBuilder("SHA256withRSA").build(keyPair.getPrivate());
            var certificate = new JcaX509CertificateConverter().getCertificate(builder.build(signer));
            certificate.verify(keyPair.getPublic());
            return certificate;
        }

        private static X509Certificate issuedCertificate(
                KeyPair signingKeyPair,
                KeyPair issuerKeyPair,
                X509Certificate issuerCertificate) throws Exception {
            var now = Instant.now();
            var issuer = new org.bouncycastle.asn1.x500.X500Name(
                    issuerCertificate.getSubjectX500Principal().getName());
            var subject = new org.bouncycastle.asn1.x500.X500Name(
                    "CN=Nguyen Van A,O=Signature Check Test,C=VN");
            var builder = new JcaX509v3CertificateBuilder(
                    issuer,
                    BigInteger.valueOf(now.toEpochMilli() + 1),
                    Date.from(now.minusSeconds(60)),
                    Date.from(now.plusSeconds(86400)),
                    subject,
                    signingKeyPair.getPublic());
            builder.addExtension(Extension.basicConstraints, true, new BasicConstraints(false));
            builder.addExtension(Extension.keyUsage, true, new KeyUsage(KeyUsage.digitalSignature | KeyUsage.nonRepudiation));

            var signer = new JcaContentSignerBuilder("SHA256withRSA").build(issuerKeyPair.getPrivate());
            var certificate = new JcaX509CertificateConverter().getCertificate(builder.build(signer));
            certificate.verify(issuerKeyPair.getPublic());
            return certificate;
        }
    }
}
