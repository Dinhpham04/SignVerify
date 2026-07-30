# 02 — Kết nối Cloudflare (DNS cho VPS Automation)

Sau khi SSH đã OK ([01-ket-noi-vps.md](./01-ket-noi-vps.md)), bước này giúp bạn trỏ
tên miền về VPS `221.132.21.204` tự động bằng script, giống bộ Automatify cũ.

Tên miền dùng cho VPS này: **`automation.info.vn`** (đã được quản lý trên Cloudflare).

> ℹ️ `.info.vn` là đuôi tên miền 2 cấp, nên zone trên Cloudflare là cả chuỗi
> `automation.info.vn` (không phải `info.vn`). Scripts đọc zone từ `CF_ZONE`
> trong `.env` — đừng bỏ trống biến này.

## A. Cần chuẩn bị

**Cloudflare API token** có quyền đúng phạm vi: **Zone:Read + DNS:Edit** cho zone
`automation.info.vn`.

## B. Tự tạo API token (nếu bạn là chủ tài khoản Cloudflare)

1. Vào <https://dash.cloudflare.com/profile/api-tokens> → **Create Token**.
2. Chọn template **Edit zone DNS**.
3. Ở **Zone Resources**: chọn *Include → Specific zone → `automation.info.vn`*
   (đừng chọn All zones — token càng hẹp càng an toàn).
4. **Continue to summary → Create Token**, copy chuỗi token (chỉ hiện một lần).

> Nếu tên miền nằm trong tài khoản của người khác (vd. Tuấn), gửi yêu cầu:
> *"Cho mình một Cloudflare API token scoped Zone:Read + DNS:Edit cho zone `<tên miền>`"*.

## C. Lưu token vào .env

```bash
cp .env.example .env    # nếu chưa có
# mở .env và điền:
#   CF_API_TOKEN=token-vừa-tạo
#   CF_ZONE=automation.info.vn
```

`.env` đã được gitignore — tuyệt đối không commit, không dán token vào chat/file khác.

## D. Kiểm tra token

```bash
./scripts/cf-zone-check.sh
# kỳ vọng: OK: automation.info.vn  ZONE_ID=...
```

## E. Trỏ tên miền về VPS

```bash
./scripts/cf-upsert-a-record.sh n8n.automation.info.vn
# mặc định trỏ về 221.132.21.204, DNS-only (grey cloud, proxied=false)
```

- `proxied=false` (grey cloud) để dùng Let's Encrypt trực tiếp trên VPS như bộ cũ.
- Script tự tạo record mới hoặc cập nhật record cũ (upsert).
- ⚠️ Với domain **đang chạy live**, hỏi/xác nhận trước khi đổi DNS.

## ✅ Hoàn thành khi

- `./scripts/cf-zone-check.sh` → `OK: automation.info.vn ZONE_ID=...`
- `./scripts/cf-upsert-a-record.sh <sub>.automation.info.vn` → `OK: đã tạo/cập nhật A record ...`
- `nslookup <sub>.automation.info.vn` trả về `221.132.21.204` (có thể chờ vài phút DNS lan truyền)
