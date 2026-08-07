import { CircleAlert, Code2 } from "lucide-react";
import Link from "next/link";

import { trustPageList } from "@/content/trust-pages";
import { GITHUB_REPOSITORY_URL, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-7 text-xs leading-5 text-muted-foreground sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-medium text-foreground">{SITE_NAME}</p>
          <p className="mt-1">Kết quả là thông tin kỹ thuật tại thời điểm kiểm tra, không thay thế kết luận pháp lý.</p>

          <nav aria-label="Thông tin website" className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {trustPageList.map((page) => (
              <Link className="font-medium text-foreground hover:text-primary hover:underline" href={`/${page.slug}`} key={page.slug}>
                {page.navLabel}
              </Link>
            ))}
          </nav>
        </div>

        <nav aria-label="Liên kết dự án" className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-end">
          <a
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary"
            href={GITHUB_REPOSITORY_URL}
            rel="noreferrer"
            target="_blank"
          >
            <Code2 className="h-4 w-4" aria-hidden={true} />
            Mã nguồn GitHub
          </a>
          <a
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary"
            href={`${GITHUB_REPOSITORY_URL}/issues`}
            rel="noreferrer"
            target="_blank"
          >
            <CircleAlert className="h-4 w-4" aria-hidden={true} />
            Báo lỗi
          </a>
        </nav>
      </div>
    </footer>
  );
}
