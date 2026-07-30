# SEO landing pages

## Objective

Tao mot cum landing page server-rendered cho cac nhu cau tim kiem cu the,
nhung van dat cong cu kiem tra chu ky so o vi tri uu tien. Moi trang phai co
noi dung rieng, metadata rieng va lien ket noi bo ro rang.

## Routes

- `/kiem-tra-chu-ky-so-pdf`: kiem tra chu ky so trong PDF/PAdES.
- `/kiem-tra-hoa-don-dien-tu-xml`: kiem tra chu ky trong XML, bao gom hoa don
  dien tu.
- `/kiem-tra-file-p7s-p7m`: kiem tra chu ky CMS/CAdES trong P7S va P7M.
- `/kiem-tra-chung-thu-so`: doc thong tin chung thu nam trong tai lieu da ky.

## Page structure

1. Header gon, quay lai cong cu chinh de dang.
2. Breadcrumb va H1 dung voi nhu cau tim kiem.
3. Cong cu upload hien thi ngay trong phan dau.
4. Noi dung rieng ve pham vi kiem tra, cach doc ket qua va cau hoi thuong gap.
5. Lien ket den cac dinh dang lien quan.
6. Footer neu ro ket qua la thong tin ky thuat, khong thay the ket luan phap ly.

## SEO requirements

- Moi route duoc render tinh khi build.
- Title, description, canonical va Open Graph rieng cho tung trang.
- Trang chu va tat ca landing page co trong `sitemap.xml`.
- `robots.txt` cho phep crawl va tro den sitemap.
- Trang chu co lien ket HTML den toan bo landing page.
- Khong dung meta keywords va khong tao FAQ schema.

## Content boundaries

- Khong tuyen bo cong cu xac nhan tinh hop phap cua hoa don hay tai lieu.
- Trang chung thu so chi mo ta chung thu nam trong file da ky, khong ham y ho
  tro upload file `.cer` rieng le.
- P7S detached co the can tai lieu goc; giao dien khong duoc hua ket qua khi
  thieu tai lieu do.
- Chi mo ta cac ket qua backend hien co: tinh toan ven, chu ky mat ma, chuoi
  chung thu, OCSP, CRL, dau thoi gian va thong tin nguoi ky.

## Acceptance criteria

- Bon route tra ve HTTP 200 va co HTML noi dung day du khi khong chay JavaScript.
- Moi route co dung mot H1 va canonical tu tro.
- Layout khong tran ngang o 360 px va de doc tren desktop.
- `npm run lint`, production build va kiem tra browser deu thanh cong.

## Out of scope

- Landing page huong dan doc ket qua chuyen sau.
- Open Graph image, Search Console, backlinks va cau hinh DNS.
- Thay doi API hoac logic xac minh chu ky.
