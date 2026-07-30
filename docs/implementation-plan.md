# Ke hoach trien khai

## Phase 1: Baseline chay duoc

1. Scaffold Next.js frontend voi Tailwind, shadcn/ui va TanStack Query.
   - Acceptance: trang chu tieng Viet render server-side, co upload form, co metadata SEO co ban.
   - Verification: `npm run lint` va `npm run build` trong `src/signaturecheck-frontend`.

2. Tao typed contract cho validation report trong Next.js va ASP.NET.
   - Acceptance: model enum va DTO khop `docs/technical-spec.md`.
   - Verification: `npm run build` va `dotnet build`.

3. Tao ASP.NET Core API cho upload.
   - Acceptance: endpoint `/api/verification-jobs` nhan multipart upload, validate file va goi validator.
   - Verification: `dotnet build`.

4. Tao Java DSS validator service baseline.
   - Acceptance: endpoint `/internal/validate` nhan multipart upload va tra JSON theo contract.
   - Verification: Docker build Java service.

5. Ket noi Next.js voi ASP.NET, ASP.NET voi Java validator.
   - Acceptance: upload tu UI Next goi API ASP.NET, API goi validator va hien thi ket qua.
   - Verification: local browser flow.

## Phase 2: DSS thuc

1. Them DSS dependencies cho PAdES, XAdES, CAdES.
2. Cau hinh trust store CA Viet Nam.
3. Bat OCSP/CRL voi timeout va cache.
4. Map DSS simple/detailed report sang JSON noi bo.
5. Them test fixture cho PDF/XML/P7S hop le, khong hop le va khong co chu ky.

## Phase 3: SEO va production hardening

1. Them landing pages theo intent SEO.
2. Them structured data FAQ.
3. Them rate limit, antivirus scan, storage TTL.
4. Them observability: request id, duration, OCSP/CRL diagnostics.
5. Them deployment docs.

## Current Constraints

- Workspace hien khong phai git repository nen chua tao commit/save point duoc.
- Maven chua cai local; Java service duoc build qua Docker/Maven image.
