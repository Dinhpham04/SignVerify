import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-6 text-xs leading-5 text-muted-foreground sm:px-6">
        <p className="font-medium text-foreground">{SITE_NAME}</p>
        <p>Kết quả là thông tin kỹ thuật tại thời điểm kiểm tra, không thay thế kết luận pháp lý.</p>
      </div>
    </footer>
  );
}
