import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileKey2,
  FileText,
  Network,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SignatureTool } from "@/components/signature-tool/signature-tool";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { guideList } from "@/content/guides";
import {
  landingPageList,
  type LandingIcon,
  type LandingTone,
  type SeoLandingPageContent,
} from "@/content/seo-landings";
import { SITE_URL } from "@/lib/site";

const iconMap: Record<LandingIcon, typeof ShieldCheck> = {
  calendar: Clock3,
  certificate: BadgeCheck,
  chain: Network,
  container: FileKey2,
  identity: BadgeCheck,
  integrity: FileCheck2,
  original: FileText,
  revocation: CheckCircle2,
  serial: FileKey2,
  signature: ShieldCheck,
  timestamp: Clock3,
  xml: FileText,
};

const toneClasses: Record<LandingTone, string> = {
  danger: "border-red-200 bg-red-50 text-red-800",
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
};

export function SeoLandingPage({ page }: { page: SeoLandingPageContent }) {
  const relatedPages = landingPageList.filter((item) => item.slug !== page.slug);
  const structuredData = createStructuredData(page);

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <LandingHero page={page} />
      <ScopeSection page={page} />
      <HowToSection page={page} />
      <ResultsSection page={page} />
      <DeepDiveSection page={page} />
      <FaqSection page={page} />
      <RelatedSection pages={relatedPages} />
      <RelatedGuidesSection />
      <SourcesSection sources={page.sources} />
      <SiteFooter />
    </main>
  );
}

function LandingHero({ page }: { page: SeoLandingPageContent }) {
  return (
    <section id="cong-cu" className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label="Đường dẫn trang" className="mx-auto max-w-3xl text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link className="hover:text-foreground hover:underline" href="/">
              Trang chủ
            </Link>
          </li>
          <li aria-hidden={true}>/</li>
          <li aria-current="page" className="text-foreground">
            {page.breadcrumbLabel}
          </li>
        </ol>
      </nav>

      <div className="mx-auto mt-7 max-w-3xl text-center">
        <p className="text-sm font-semibold text-primary">{page.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">{page.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{page.intro}</p>
      </div>

      <div className="mx-auto mt-7 max-w-3xl">
        <SignatureTool fileType={page.toolFileType} />
      </div>

      <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-muted-foreground">{page.toolNote}</p>
    </section>
  );
}

function ScopeSection({ page }: { page: SeoLandingPageContent }) {
  return (
    <section className="border-y bg-white">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-9 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
        <div>
          <p className="text-sm font-semibold text-primary">Phạm vi xác minh</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">{page.scope.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">{page.scope.intro}</p>

          <div className="mt-7 grid gap-x-7 gap-y-6 sm:grid-cols-2">
            {page.scope.items.map((item) => {
              const Icon = iconMap[item.icon];

              return (
                <div className="flex gap-3" key={item.title}>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
                    <Icon className="h-4 w-4" aria-hidden={true} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <figure>
          <div className="overflow-hidden rounded-md border bg-slate-50">
            <Image
              alt={page.image.alt}
              className="h-auto w-full"
              height={page.image.height}
              sizes="(max-width: 1023px) 100vw, 440px"
              src={page.image.src}
              width={page.image.width}
            />
          </div>
          <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">{page.image.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

function HowToSection({ page }: { page: SeoLandingPageContent }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-semibold text-primary">Cách sử dụng</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{page.howTo.title}</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">{page.howTo.intro}</p>
        </div>
        <ol className="grid gap-6 sm:grid-cols-3">
          {page.howTo.steps.map((step, index) => (
            <Step key={step.title} number={String(index + 1)} title={step.title} text={step.text} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ResultsSection({ page }: { page: SeoLandingPageContent }) {
  return (
    <section className="border-y bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">Đọc kết quả</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">{page.results.title}</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{page.results.intro}</p>
        </div>

        <div className="mt-8 divide-y rounded-md border">
          {page.results.rows.map((status) => (
            <div
              className="grid gap-3 px-4 py-4 sm:grid-cols-[11rem_1fr] sm:items-center sm:px-5"
              key={status.label}
            >
              <span className={`w-fit rounded-md border px-2.5 py-1 text-xs font-semibold ${toneClasses[status.tone]}`}>
                {status.label}
              </span>
              <p className="text-sm leading-6 text-muted-foreground">{status.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeepDiveSection({ page }: { page: SeoLandingPageContent }) {
  return (
    <section className="border-b bg-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-primary">{page.deepDive.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">{page.deepDive.title}</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{page.deepDive.intro}</p>
        </div>

        <div className="mt-9 divide-y border-y">
          {page.deepDive.sections.map((section) => (
            <article className="grid gap-5 py-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10" key={section.title}>
              <h3 className="text-lg font-semibold leading-7 text-foreground">{section.title}</h3>
              <div>
                <div className="space-y-4 text-[15px] leading-7 text-muted-foreground sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.points && (
                  <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                    {section.points.map((point) => (
                      <div className="border-l-2 border-primary pl-4" key={point.title}>
                        <dt className="font-semibold text-foreground">{point.title}</dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground">{point.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ page }: { page: SeoLandingPageContent }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold text-primary">Câu hỏi thường gặp</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{page.faq.title}</h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">{page.faq.intro}</p>
        </div>
        <div className="divide-y border-y">
          {page.faq.items.map((item, index) => (
            <details className="group py-1" key={item.question} open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-foreground">
                <span>{item.question}</span>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary text-lg font-normal text-muted-foreground group-open:hidden"
                  aria-hidden={true}
                >
                  +
                </span>
                <span
                  className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary text-lg font-normal text-muted-foreground group-open:flex"
                  aria-hidden={true}
                >
                  −
                </span>
              </summary>
              <p className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedSection({ pages }: { pages: ReadonlyArray<SeoLandingPageContent> }) {
  return (
    <section className="border-t bg-slate-100">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Công cụ kiểm tra liên quan</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Chọn đúng định dạng hoặc nhu cầu để xem hướng dẫn và phạm vi kết quả tương ứng.
          </p>
        </div>
        <div className="mt-6 divide-y border-y sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {pages.map((item) => (
            <Link
              className="group block py-5 first:pt-4 last:pb-4 sm:px-5 sm:first:py-5 sm:first:pl-0 sm:last:py-5 sm:last:pr-0"
              href={`/${item.slug}`}
              key={item.slug}
            >
              <span className="flex items-center gap-2 font-semibold text-foreground group-hover:text-primary">
                {item.navLabel}
                <ArrowRight className="h-4 w-4" aria-hidden={true} />
              </span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">{item.navDescription}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedGuidesSection() {
  return (
    <section className="border-t bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Hướng dẫn và kiến thức liên quan</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
            Tìm hiểu cách ký, cách đọc kết quả và các khái niệm cần biết trước khi sử dụng chữ ký số.
          </p>
        </div>
        <div className="mt-6 grid border-t sm:grid-cols-2">
          {guideList.map((guide) => (
            <Link
              className="group flex items-start justify-between gap-4 border-b py-5 sm:px-5 sm:odd:border-r sm:odd:pl-0 sm:even:pr-0"
              href={`/${guide.slug}`}
              key={guide.slug}
            >
              <span>
                <span className="font-semibold text-foreground group-hover:text-primary">{guide.navLabel}</span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">{guide.navDescription}</span>
              </span>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden={true} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SourcesSection({ sources }: { sources: SeoLandingPageContent["sources"] }) {
  return (
    <aside className="border-t bg-white" aria-label="Nguồn tham khảo">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 text-xs leading-6 text-muted-foreground sm:px-6">
        <p className="font-medium text-foreground">Nguồn kỹ thuật</p>
        <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
          {sources.map((source) => (
            <li key={source.href}>
              <a className="text-primary hover:underline" href={source.href} rel="noreferrer" target="_blank">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <li>
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-semibold text-primary">
        {number}
      </span>
      <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
    </li>
  );
}

function createStructuredData(page: SeoLandingPageContent) {
  const pageUrl = `${SITE_URL}/${page.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: page.title,
        url: pageUrl,
        applicationCategory: "SecurityApplication",
        operatingSystem: "Web",
        description: page.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "VND",
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
            name: page.breadcrumbLabel,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
