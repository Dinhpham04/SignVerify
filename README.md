# Chu ky so Automation

Website tieng Viet de kiem tra chu ky so online mien phi. Kien truc hien tai gom Next.js frontend, ASP.NET Core API chinh va Java validator service noi bo lam boundary cho Java DSS.

## Chay local bang Docker

```bash
docker compose up --build
```

Mo frontend:

```text
http://localhost:3000
```

## Trien khai production

Quy trinh deploy len VPS Automation, cau hinh DNS, Nginx va TLS duoc mo ta tai:

```text
automation/03-trien-khai-chukyso.md
```

API ASP.NET:

```text
http://localhost:5000
```

### Cau hinh trust store cho DSS

Du an co script tao trust material tu `https://rootca.gov.vn`:

```powershell
.\scripts\update-vietnam-ca.ps1
```

Script tao:

- `trust/vietnam-root.p12`: Root CA quoc gia dung lam trust anchor.
- `trust/vietnam-public-adjunct.p12`: cac CA cong cong dang co hieu luc dung de dung chuoi, khong phai trust anchor.

`docker-compose.yml` da mount hai file nay vao `dss-validator` voi mat khau mac dinh `changeit`. Co the override bang cac bien:

```bash
SIGNATURE_CHECK_TRUST_STORE_PATH
SIGNATURE_CHECK_TRUST_STORE_PASSWORD
SIGNATURE_CHECK_ADJUNCT_STORE_PATH
SIGNATURE_CHECK_ADJUNCT_STORE_PASSWORD
```

## Chay rieng frontend va API

Terminal 1:

```bash
set DSS_VALIDATOR_URL=http://localhost:8080
dotnet run --project src/SignatureCheck.Web/SignatureCheck.Web.csproj --urls http://localhost:5000
```

Terminal 2:

```bash
cd src/signaturecheck-frontend
set NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
npm run dev
```

## Trang thai hien tai

- Next.js da co upload form, UI hien thi report, Tailwind, shadcn/ui primitives va TanStack Query mutation.
- ASP.NET Core da co API `/api/verification-jobs`, validation file size/extension va client goi validator.
- Java validator da co REST endpoint `/internal/validate` va response dung contract.
- Java validator da co logic DSS that cho PDF/PAdES, gom unsigned PDF, PDF da ky, PDF bi sua sau khi ky, NEAC Root CA trust store va public CA adjunct store.
- Logic DSS that cho XAdES/CAdES se duoc gan vao `src/DssValidator` trong phase tiep theo.

Xem them:

- `docs/technical-spec.md`
- `docs/implementation-plan.md`
