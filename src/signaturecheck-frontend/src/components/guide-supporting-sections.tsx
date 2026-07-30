import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

import type { GuidePageContent } from "@/content/guides";

export function FaqSection({ items }: { items: GuidePageContent["faq"] }) {
  return (
    <section id="cau-hoi-thuong-gap" className="scroll-mt-6 border-y bg-white">
      <div className="mx-auto grid w-full max-w-5xl gap-9 px-4 py-12 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:py-14">
        <div>
          <p className="text-sm font-semibold text-primary">Câu hỏi thường gặp</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">Giải đáp nhanh</h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
            Các câu trả lời tập trung vào điểm người dùng phổ thông thường nhầm khi ký và kiểm tra tài liệu.
          </p>
        </div>
        <div className="divide-y border-y">
          {items.map((item, index) => (
            <details className="group py-1" key={item.question} open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-foreground">
                <span>{item.question}</span>
                <span className="text-xl font-normal text-muted-foreground group-open:hidden" aria-hidden={true}>
                  +
                </span>
                <span className="hidden text-xl font-normal text-muted-foreground group-open:inline" aria-hidden={true}>
                  −
                </span>
              </summary>
              <p className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResourcesSection({ resources }: { resources: GuidePageContent["resources"] }) {
  return (
    <section className="border-b bg-slate-100">
      <div className="mx-auto w-full max-w-5xl px-4 py-11 sm:px-6">
        <p className="text-sm font-semibold text-primary">Liên kết hữu ích</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">Tài nguyên chính thức</h2>
        <div className="mt-6 grid border-t sm:grid-cols-2">
          {resources.map((resource) => (
            <a
              className="group flex min-h-36 flex-col justify-between gap-5 border-b py-5 sm:px-5 sm:odd:border-r sm:odd:pl-0"
              href={resource.href}
              key={resource.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>
                <span className="text-xs font-semibold uppercase text-muted-foreground">{resource.publisher}</span>
                <span className="mt-2 block font-semibold text-foreground group-hover:text-primary">{resource.title}</span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">{resource.description}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Mở trang chính thức
                <ExternalLink className="h-4 w-4" aria-hidden={true} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RelatedGuides({ pages }: { pages: ReadonlyArray<GuidePageContent> }) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-11 sm:px-6">
        <h2 className="text-xl font-semibold text-foreground">Nội dung liên quan</h2>
        <div className="mt-5 grid border-t sm:grid-cols-3">
          {pages.map((page) => (
            <Link
              className="group border-b py-5 sm:px-5 sm:not-last:border-r sm:first:pl-0 sm:last:pr-0"
              href={`/${page.slug}`}
              key={page.slug}
            >
              <span className="font-semibold text-foreground group-hover:text-primary">{page.navLabel}</span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">{page.navDescription}</span>
              <ArrowRight className="mt-4 h-4 w-4 text-primary" aria-hidden={true} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SourcesSection({ page }: { page: GuidePageContent }) {
  return (
    <aside className="border-t bg-white" aria-label="Nguồn tham khảo">
      <div className="mx-auto w-full max-w-5xl px-4 py-7 text-xs leading-6 text-muted-foreground sm:px-6">
        <p className="font-semibold text-foreground">Nguồn được đối chiếu</p>
        <p className="mt-1">Nội dung được viết lại và đối chiếu lần cuối ngày {page.updatedAt}.</p>
        <ul className="mt-3 space-y-1">
          {page.sources.map((source) => (
            <li key={source.href}>
              <a
                className="text-primary hover:underline"
                href={source.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {source.publisher}: {source.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
