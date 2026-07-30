# 03 — Triển khai Chữ ký số Automation

Ứng dụng chạy bằng Docker Compose sau Nginx:

```text
Internet
  -> Nginx :80/:443
     -> /api/*  -> 127.0.0.1:5000 -> ASP.NET -> Java DSS
     -> /*      -> 127.0.0.1:3000 -> Next.js
```

Frontend và API chỉ bind vào loopback của VPS. Java DSS chỉ xuất hiện trong
Docker network và vẫn được phép truy cập Internet để kiểm tra OCSP/CRL.

## A. Điều kiện ban đầu

- SSH alias `vps-automation` hoạt động.
- VPS có Docker Engine và Docker Compose plugin.
- Hai trust store trong `trust/` tồn tại.
- DNS `chukyso.automation.info.vn` trỏ về VPS trước khi xin TLS.

Kiểm tra:

```bash
bash automation/scripts/ssh-test.sh
bash automation/scripts/cf-zone-check.sh
```

## B. Tạo môi trường production trên VPS

Tạo thư mục và file môi trường dùng chung:

```bash
ssh vps-automation "mkdir -p /opt/chukyso/shared"
scp .env.production.example vps-automation:/opt/chukyso/shared/.env.production
```

Đăng nhập VPS và kiểm tra lại giá trị trong:

```text
/opt/chukyso/shared/.env.production
```

Không đặt token Cloudflare, mật khẩu VPS hoặc private key SSH trong file này.

## C. Trỏ DNS

```bash
bash automation/scripts/cf-upsert-a-record.sh chukyso.automation.info.vn
```

Giữ `proxied=false` trong lần cấp chứng thư Let's Encrypt đầu tiên.

## D. Deploy ứng dụng

Từ thư mục gốc repository:

```bash
bash automation/scripts/deploy-chukyso.sh
```

Script tạo release mới trong `/opt/chukyso/releases`, build ba image, chờ health
probe của cả ba service, sau đó cập nhật symlink `/opt/chukyso/current`. Nếu
healthcheck thất bại, script tự khởi động lại release `current` trước đó.

Kiểm tra trên VPS:

```bash
ssh vps-automation \
  "cd /opt/chukyso/current && docker compose --env-file /opt/chukyso/shared/.env.production ps"
```

## E. Cài Nginx và TLS

Trong `automation/.env`:

```dotenv
CHUKYSO_DOMAIN=chukyso.automation.info.vn
FRONTEND_HTTP_PORT=3000
API_HTTP_PORT=5000
ISSUE_TLS=true
LETSENCRYPT_EMAIL=admin@example.com
```

Sau khi DNS đã trả về IP VPS:

```bash
bash automation/scripts/install-chukyso-nginx.sh
```

Kiểm tra:

```bash
curl -fsS https://chukyso.automation.info.vn/healthz
curl -I https://chukyso.automation.info.vn/robots.txt
curl -I https://chukyso.automation.info.vn/sitemap.xml
```

## F. Cập nhật phiên bản

Mỗi lần cập nhật source:

```bash
bash automation/scripts/deploy-chukyso.sh
```

Không chạy `docker compose down -v`; volume cache thu hồi chứng thư phải được giữ
qua các lần cập nhật.
