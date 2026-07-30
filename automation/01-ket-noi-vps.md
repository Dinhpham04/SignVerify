# 01 — Kết nối VPS Automation

Làm theo thứ tự. Khác với VPS Automatify (phải gửi public key cho Tuấn), VPS này bạn
**đã có sẵn mật khẩu root** — nên bạn tự cài key cho chính mình, mật khẩu chỉ dùng
đúng **một lần** ở bước B.

Thông tin VPS: IP `221.132.21.204`, user `root`, port `22`.

## A. Tạo SSH key riêng cho VPS này (KHÔNG dùng lại key cũ)

```bash
./scripts/generate-vps-key.sh
```

Lệnh này tạo `~/.ssh/automation_vps` (private) + `~/.ssh/automation_vps.pub` (public).

> ⛔ Private key không bao giờ rời khỏi laptop của bạn. Không paste nó đi đâu cả.

## B. Cài public key lên VPS (dùng mật khẩu root — lần duy nhất)

Chuẩn bị sẵn mật khẩu root (từ email/panel của nhà cung cấp VPS, hoặc file `.env`
của bạn). Chạy:

```bash
./scripts/install-key.sh
```

Script sẽ hỏi mật khẩu root **một lần** để chép public key vào
`/root/.ssh/authorized_keys` trên VPS. Sau bước này mọi kết nối đều bằng key.

(Nếu muốn lưu lại thông tin VPS cho scripts, copy `.env.example` → `.env` và điền —
`.env` đã được gitignore, tuyệt đối không commit.)

## C. Thêm SSH host alias

Thêm vào `~/.ssh/config` (tạo file nếu chưa có):

```
Host vps-automation
    HostName 221.132.21.204
    User root
    Port 22
    IdentityFile ~/.ssh/automation_vps
```

## D. Kiểm tra kết nối

```bash
./scripts/ssh-test.sh
```

Kỳ vọng thấy `SSH OK` và **không bị hỏi mật khẩu**. Nếu vẫn bị hỏi mật khẩu, key chưa
được cài đúng — chạy lại bước B.

## E. (Khuyến nghị) Khoá đăng nhập bằng mật khẩu

Khi key đã chạy ổn, nên tắt đăng nhập root bằng mật khẩu để an toàn hơn:

```bash
ssh vps-automation "sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config && systemctl reload sshd"
```

> ⚠️ Chỉ chạy sau khi `ssh-test.sh` đã OK bằng key — nếu không bạn sẽ tự khoá mình
> ngoài VPS. Hỏi lại trước khi làm nếu chưa chắc.

## ✅ Hoàn thành khi

- `./scripts/ssh-test.sh` → `SSH OK`, đăng nhập bằng key, không hỏi mật khẩu
- Bạn có thể chạy lệnh trên VPS, ví dụ: `ssh vps-automation "uname -a"`
