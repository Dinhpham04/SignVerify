# Website kiem tra chu ky so

## Objective

Xay dung website tieng Viet mien phi cho phep nguoi dung tai file len de kiem tra chu ky so va nhan ket qua de hieu. Frontend dung Next.js, Tailwind CSS, shadcn/ui va TanStack Query. Backend chinh dung ASP.NET Core API; Java DSS service la engine xac minh noi bo. Ban dau uu tien cac dinh dang pho bien voi nguoi dung pho thong tai Viet Nam:

- PDF co chu ky so: PAdES/PDF signature.
- XML hoa don dien tu hoac van ban dien tu: XMLDSig/XAdES.
- Tep chu ky roi `.p7s` va `.p7m`: CMS/CAdES.

Website phai co noi dung server-rendered de SEO tot cho cac truy van nhu "kiem tra chu ky so online", "kiem tra chu ky so PDF", "kiem tra hoa don dien tu XML".

## Architecture

```text
Browser
  -> Next.js App Router + Tailwind CSS + shadcn/ui + TanStack Query
  -> ASP.NET Core Web API
  -> Java DSS validation service noi bo
  -> OCSP / CRL / CA trust store / validation report
```

Next.js la frontend chinh:

- render trang SEO;
- quan ly upload/result UI bang shadcn/ui;
- goi ASP.NET Core API bang TanStack Query mutation;
- khong goi truc tiep Java DSS service.

ASP.NET Core la API/backend chinh:

- nhan upload;
- gioi han file size va loai file;
- goi Java DSS service qua REST noi bo;
- chuan hoa ket qua ky thuat thanh tieng Viet;
- xoa file tam sau khi xu ly.

Java DSS service la engine xac minh chu ky:

- phat hien va xac minh PAdES, XAdES, CAdES;
- kiem tra tinh toan ven file;
- dung chuoi CA;
- kiem tra OCSP/CRL thoi gian thuc khi endpoint kha dung;
- tra ve JSON theo contract noi bo.

## Source Decisions

- DSS la thu vien open-source cho tao va xac minh chu ky dien tu, ho tro cac dinh dang PAdES, XAdES, CAdES va xu ly OCSP/CRL. Source: https://ec.europa.eu/digital-building-blocks/DSS/webapp-demo/doc/dss-documentation.html
- DSS duoc phat hanh tren Maven Central va project GitHub ghi license LGPL-2.1. Source: https://github.com/esig/dss
- Next.js App Router co Metadata API de cau hinh title, description, Open Graph va cac metadata SEO. Source: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Tailwind CSS co huong dan cai dat chinh thuc voi Next.js, dung `create-next-app` va Tailwind plugin. Source: https://tailwindcss.com/docs/guides/nextjs
- shadcn/ui co huong dan cai dat cho Next.js va yeu cau Tailwind/import alias. Source: https://ui.shadcn.com/docs/installation/next
- TanStack Query dung `useMutation` cho thao tac tao/cap nhat/xoa hoac server side-effects nhu upload file. Source: https://tanstack.com/query/v5/docs/framework/react/guides/mutations
- OCSP la giao thuc xac dinh trang thai hien tai cua chung thu so ma khong can tai CRL day du. Source: https://datatracker.ietf.org/doc/html/rfc6960
- XML Signature co the la enveloped, enveloping hoac detached signature. Source: https://www.w3.org/TR/xmldsig-core1/
- NEAC huong dan nguoi dung kiem tra thong tin chu ky so tren PDF/XML, gom don vi cap, nguoi ky, tinh trang tai lieu, thoi gian ky, OCSP va CRL. Source: https://neac.gov.vn/vi/tin-tuc-su-kien/detail/huong-dan-kiem-tra-hieu-luc-chu-ky-so-tren-van-ban-dien-tu-702.htm

## Internal API Contract

ASP.NET Core calls Java DSS:

```http
POST /internal/validate
Content-Type: multipart/form-data
```

Fields:

- `file`: required uploaded file.
- `checkOcsp`: optional boolean, default `true`.
- `checkCrl`: optional boolean, default `true`.

Response:

```json
{
  "fileType": "PDF",
  "overallStatus": "VALID",
  "checkedAt": "2026-07-29T08:20:00Z",
  "signatures": [
    {
      "status": "VALID",
      "signerName": "NGUYEN VAN A",
      "signerOrganization": "CONG TY TNHH ABC",
      "issuerName": "VNPT-CA",
      "serialNumber": "01AF...",
      "signingTime": "2026-07-29T08:10:00Z",
      "certificateValidFrom": "2025-01-01T00:00:00Z",
      "certificateValidTo": "2027-01-01T00:00:00Z",
      "checks": {
        "documentIntegrity": "PASS",
        "cryptographicSignature": "PASS",
        "certificateChain": "PASS",
        "revocationOcsp": "PASS",
        "revocationCrl": "NOT_CHECKED",
        "timestamp": "PASS"
      },
      "explanations": []
    }
  ],
  "errors": []
}
```

Enums:

- Overall status: `VALID`, `INVALID`, `INDETERMINATE`, `UNSIGNED`, `UNSUPPORTED`, `ERROR`.
- Check status: `PASS`, `FAIL`, `WARNING`, `UNKNOWN`, `NOT_CHECKED`.
- File type: `PDF`, `XML`, `P7S`, `P7M`, `UNKNOWN`.

## User-Facing Result Rules

- `VALID`: chu ky hop le theo trust store va thoi diem kiem tra.
- `INVALID`: file bi sua, chu ky mat ma sai, chung thu het han/bi thu hoi, hoac chuoi CA khong hop le.
- `INDETERMINATE`: khong du du lieu de ket luan, vi du khong truy van duoc OCSP/CRL.
- `UNSIGNED`: khong tim thay chu ky so.
- `UNSUPPORTED`: file nam ngoai dinh dang ho tro.

UI khong duoc bien `UNKNOWN` hoac `INDETERMINATE` thanh hop le/khong hop le tuyet doi.

## Security And Privacy

- Khong luu file nguoi dung lau dai.
- Gioi han upload mac dinh 25 MB.
- Luu file tam trong thu muc rieng va xoa sau khi job ket thuc hoac het TTL.
- Khong log noi dung file.
- Goi Java DSS qua mang noi bo, khong public service validator.
- Them antivirus scan va object storage TTL khi len production.

## SEO Pages

- `/`: cong cu upload Next.js va noi dung "kiem tra chu ky so online mien phi".
- `/kiem-tra-chu-ky-so-pdf`: landing page cho PDF/PAdES.
- `/kiem-tra-hoa-don-dien-tu-xml`: landing page cho XML hoa don dien tu.
- `/kiem-tra-file-p7s-p7m`: landing page cho chu ky roi.
- `/huong-dan-doc-ket-qua`: giai thich ket qua kiem tra.

## MVP Acceptance Criteria

- Trang chu Next.js server-rendered bang tieng Viet, co upload form va metadata SEO.
- Next.js upload bang TanStack Query mutation toi ASP.NET Core API.
- ASP.NET Core API nhan file va goi Java validator qua REST noi bo.
- Java validator co endpoint `/internal/validate` tra ket qua theo contract.
- Bieu dien duoc cac trang thai `VALID`, `INVALID`, `INDETERMINATE`, `UNSIGNED`, `UNSUPPORTED`, `ERROR`.
- Docker Compose chay duoc web va validator.
- Build ASP.NET Core thanh cong.
