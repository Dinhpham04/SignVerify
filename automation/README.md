# Automation VPS — Hướng dẫn kết nối

Folder này giúp bạn kết nối tới **VPS Automation** (VPS mới, tách biệt với VPS
Automatify `87.106.81.94`) theo đúng cách team đang làm: SSH key riêng + host alias,
không đăng nhập bằng mật khẩu sau lần cài key đầu tiên.

## Thông tin VPS

| Thông số | Giá trị |
|---|---|
| IP | `221.132.21.204` |
| User | `root` |
| Port SSH | `22` |
| SSH alias (sau khi setup) | `vps-automation` |

> 🔐 **Mật khẩu root KHÔNG được ghi trong folder này.** Nó chỉ được dùng **một lần
> duy nhất** để cài SSH key (bước B trong hướng dẫn). Lưu nó ở `.env` (đã gitignore)
> hoặc trình quản lý mật khẩu — không bao giờ commit.

## Cách dùng

**Mở folder này bằng Claude Code và nói "giúp tôi kết nối VPS automation"** — Claude sẽ
chạy lần lượt các bước. Hoặc tự đọc theo thứ tự:

1. **[01-ket-noi-vps.md](./01-ket-noi-vps.md)** — tạo SSH key, cài key lên VPS,
   thêm alias, kiểm tra kết nối.
2. **[02-ket-noi-cloudflare.md](./02-ket-noi-cloudflare.md)** — tạo API token,
   kiểm tra zone, trỏ tên miền về VPS bằng script.
3. **[03-trien-khai-chukyso.md](./03-trien-khai-chukyso.md)** — build và chạy
   Chữ ký số Automation bằng Docker Compose, sau đó cài Nginx và TLS.

## Sơ đồ

```
 Laptop của bạn ── ssh vps-automation ──▶ VPS 221.132.21.204 (root, port 22)
      │                                        │
 ~/.ssh/automation_vps (private key,      authorized_keys chứa public key
 KHÔNG BAO GIỜ rời khỏi máy)              của bạn
```

## Hoàn thành khi

- `./scripts/ssh-test.sh` → `SSH OK` (đăng nhập bằng key, không hỏi mật khẩu)
- `./scripts/cf-zone-check.sh` → `OK: <zone> ZONE_ID=...`
