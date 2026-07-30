import { ShieldCheck } from "lucide-react";
import Link from "next/link";

import { SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex min-h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link className="flex items-center gap-2 font-semibold text-foreground" href="/">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="h-4 w-4" aria-hidden={true} />
          </span>
          <span>{SITE_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex" aria-label="Điều hướng chính">
          <Link className="rounded-md px-3 py-2 hover:bg-secondary hover:text-foreground" href="/#cong-cu">
            Công cụ
          </Link>
          <Link className="rounded-md px-3 py-2 hover:bg-secondary hover:text-foreground" href="/#cach-su-dung">
            Cách sử dụng
          </Link>
          <Link
            className="rounded-md px-3 py-2 hover:bg-secondary hover:text-foreground"
            href="/#dinh-dang"
          >
            Định dạng
          </Link>
          <Link className="rounded-md px-3 py-2 hover:bg-secondary hover:text-foreground" href="/#kien-thuc">
            Kiến thức
          </Link>
        </nav>
      </div>
    </header>
  );
}
