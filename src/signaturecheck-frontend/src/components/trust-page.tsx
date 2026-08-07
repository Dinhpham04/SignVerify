import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileSearch2,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { trustPageList, type TrustPageContent, type TrustPageKind } from "@/content/trust-pages";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageIconMap: Record<TrustPageKind, typeof ShieldCheck> = {
  about: FileSearch2,
  privacy: ShieldCheck,
  terms: Scale,
};

export function createTrustPageMetadata(page: TrustPageContent): Metadata {
  const pageUrl = `${SITE_URL}/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      locale: "vi_VN",
      url: pageUrl,
      siteName: SITE_NAME,
      modifiedTime: page.updatedAtIso,
      images: [
        {
          url: "/images/guide-digital-signature.jpg",
          width: 1660,
          height: 947,
          alt: "Tài liệu điện tử, chứng thư và thiết bị ký số",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/images/guide-digital-signature.jpg"],
    },
  };
}

export function TrustPage({ page }: { page: TrustPageContent }) {
  const Icon = pageIconMap[page.kind];
  const relatedPages = trustPageList.filter((item) => item.slug !== page.slug);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createStructuredData(page)).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      <main>
        <section className="border-b bg-white">
          <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-7 sm:px-6 sm:pb-12 sm:pt-9">
            <Breadcrumb currentPage={page.navLabel} />

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold text-primary">{page.eyebrow}</p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">{page.title}</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {page.intro}
                </p>
                <p className="mt-5 text-sm text-muted-foreground">
                  Cập nhật lần cuối: <time dateTime={page.updatedAtIso}>{page.updatedAtLabel}</time>
                </p>
              </div>

              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-accent text-primary lg:h-16 lg:w-16">
                <Icon className="h-7 w-7 lg:h-8 lg:w-8" strokeWidth={1.8} aria-hidden={true} />
              </span>
            </div>
          </div>
        </section>

        <section className="border-b bg-slate-50" aria-label="Tóm tắt chính">
          <div className="mx-auto grid w-full max-w-5xl divide-y px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
            {page.highlights.map((item) => (
              <div className="py-6 first:pt-6 md:px-6 md:first:pl-0 md:last:pr-0" key={item.title}>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12 lg:py-14">
          <MobileTableOfContents page={page} />
          <DesktopTableOfContents page={page} />

          <article className="min-w-0 divide-y border-t" aria-label={page.title}>
            {page.sections.map((section) => (
              <section className="scroll-mt-24 py-9 first:pt-0 lg:py-11" id={section.id} key={section.id}>
                <h2 className="text-xl font-semibold leading-8 text-foreground sm:text-2xl">{section.title}</h2>

                {section.paragraphs && (
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {section.items && (
                  <ol className="mt-6 space-y-5">
                    {section.items.map((item, index) => (
                      <li className="flex gap-4" key={item.title}>
                        {section.ordered ? (
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-xs font-semibold text-primary">
                            {index + 1}
                          </span>
                        ) : (
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.8} aria-hidden={true} />
                        )}
                        <div>
                          <h3 className="font-semibold leading-7 text-foreground">{item.title}</h3>
                          <p className="mt-1 text-[15px] leading-7 text-muted-foreground sm:text-base">{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                {section.note && (
                  <aside className="mt-7 border-l-2 border-primary bg-sky-50 px-5 py-4" aria-label={section.note.title}>
                    <p className="font-semibold text-foreground">{section.note.title}</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">{section.note.text}</p>
                  </aside>
                )}
              </section>
            ))}
          </article>
        </div>

        <SourcesSection page={page} />

        <section className="border-t bg-slate-50">
          <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
            <h2 className="text-lg font-semibold text-foreground">Thông tin liên quan</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Xem thêm cách dự án vận hành, xử lý dữ liệu và xác định trách nhiệm của người sử dụng.
            </p>
            <div className="mt-6 grid border-t sm:grid-cols-2">
              {relatedPages.map((relatedPage) => (
                <Link
                  className="group flex items-start justify-between gap-4 border-b py-5 sm:px-5 sm:first:border-r sm:first:pl-0 sm:last:pr-0"
                  href={`/${relatedPage.slug}`}
                  key={relatedPage.slug}
                >
                  <span>
                    <span className="font-semibold text-foreground group-hover:text-primary">{relatedPage.navLabel}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">{relatedPage.description}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden={true} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Breadcrumb({ currentPage }: { currentPage: string }) {
  return (
    <nav aria-label="Đường dẫn trang" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link className="hover:text-foreground hover:underline" href="/">
            Trang chủ
          </Link>
        </li>
        <li aria-hidden={true}>/</li>
        <li aria-current="page" className="text-foreground">
          {currentPage}
        </li>
      </ol>
    </nav>
  );
}

function MobileTableOfContents({ page }: { page: TrustPageContent }) {
  return (
    <details className="mb-10 rounded-md border bg-white lg:hidden">
      <summary className="cursor-pointer px-4 py-3.5 font-semibold text-foreground">Nội dung trang</summary>
      <nav className="border-t px-4 py-3" aria-label="Mục lục trên thiết bị di động">
        <ol className="space-y-2">
          {page.sections.map((section) => (
            <li key={section.id}>
              <a className="block py-1 text-sm leading-6 text-muted-foreground hover:text-primary" href={`#${section.id}`}>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}

function DesktopTableOfContents({ page }: { page: TrustPageContent }) {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-24" aria-label="Mục lục">
        <p className="text-sm font-semibold text-foreground">Nội dung trang</p>
        <ol className="mt-3 space-y-1 border-l">
          {page.sections.map((section) => (
            <li key={section.id}>
              <a
                className="block border-l border-transparent py-1.5 pl-4 text-sm leading-5 text-muted-foreground hover:border-primary hover:text-primary"
                href={`#${section.id}`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}

function SourcesSection({ page }: { page: TrustPageContent }) {
  return (
    <aside className="border-t bg-white" aria-label="Nguồn tham khảo">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <p className="text-sm font-semibold text-primary">Tài liệu gốc</p>
        <h2 className="mt-2 text-xl font-semibold text-foreground">Nguồn tham khảo chính thức và kỹ thuật</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Các liên kết dưới đây dẫn tới văn bản hoặc tài liệu của đơn vị phát hành. Website diễn giải để hỗ trợ người dùng,
          không thay thế nội dung của nguồn gốc.
        </p>
        <ul className="mt-6 divide-y border-y">
          {page.sources.map((source) => (
            <li key={source.href}>
              <a
                className="group flex items-start justify-between gap-4 py-4"
                href={source.href}
                rel="noreferrer"
                target="_blank"
              >
                <span>
                  <span className="font-medium text-foreground group-hover:text-primary">{source.label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{source.organization}</span>
                </span>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden={true} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function createStructuredData(page: TrustPageContent) {
  const pageUrl = `${SITE_URL}/${page.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": page.kind === "about" ? "AboutPage" : "WebPage",
        name: page.title,
        description: page.description,
        url: pageUrl,
        inLanguage: "vi-VN",
        dateModified: page.updatedAtIso,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Kiểm tra chữ ký số",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.navLabel,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
