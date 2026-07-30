import { Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GuideBlockView, QuickAnswer, ToolCallout } from "@/components/guide-content-blocks";
import {
  FaqSection,
  RelatedGuides,
  ResourcesSection,
  SourcesSection,
} from "@/components/guide-supporting-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  createGuideStructuredData,
  guideList,
  type GuidePageContent,
} from "@/content/guides";

export function GuideLandingPage({ page }: { page: GuidePageContent }) {
  const relatedGuides = guideList.filter((guide) => guide.slug !== page.slug).slice(0, 3);
  const structuredData = createGuideStructuredData(page);

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <GuideHero page={page} />
      <TakeawayBand items={page.takeaways} />

      <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:py-16">
        <TableOfContents page={page} />
        <article className="min-w-0">
          <QuickAnswer answer={page.answer} />
          {page.blocks.map((block, index) => (
            <div key={block.id}>
              <GuideBlockView block={block} />
              {index === 1 ? <ToolCallout tool={page.tool} compact /> : null}
            </div>
          ))}
          <ToolCallout tool={page.tool} />
        </article>
      </div>

      <FaqSection items={page.faq} />
      <ResourcesSection resources={page.resources} />
      <RelatedGuides pages={relatedGuides} />
      <SourcesSection page={page} />
      <SiteFooter />
    </main>
  );
}

function GuideHero({ page }: { page: GuidePageContent }) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-7 sm:px-6 sm:pb-12 sm:pt-9">
        <nav aria-label="Đường dẫn trang" className="text-sm text-muted-foreground">
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

        <div className="mt-9 max-w-3xl">
          <p className="text-sm font-semibold text-primary">{page.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{page.intro}</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" aria-hidden={true} />
              {page.readingTime}
            </span>
            <span>Cập nhật {page.updatedAt}</span>
          </div>
        </div>

        <figure className="mt-9">
          <div className="aspect-[16/8.8] overflow-hidden rounded-md border bg-slate-100">
            <Image
              alt={page.image.alt}
              className="h-full w-full object-cover"
              fetchPriority="high"
              height={page.image.height}
              loading="eager"
              sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 1024px"
              src={page.image.src}
              width={page.image.width}
            />
          </div>
          <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">{page.image.caption}</figcaption>
        </figure>
      </div>
    </header>
  );
}

function TakeawayBand({ items }: { items: GuidePageContent["takeaways"] }) {
  return (
    <section className="border-b bg-slate-100" aria-label="Điểm cần nhớ">
      <div className="mx-auto grid w-full max-w-5xl divide-y px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <div className="py-5 md:px-6 md:first:pl-0 md:last:pr-0" key={item.title}>
            <p className="font-semibold text-foreground">{item.title}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TableOfContents({ page }: { page: GuidePageContent }) {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-6" aria-label="Mục lục bài viết">
        <p className="text-xs font-semibold uppercase text-muted-foreground">Trong bài viết</p>
        <ol className="mt-4 space-y-3 border-l pl-4 text-sm leading-5">
          <li>
            <a className="text-muted-foreground hover:text-primary" href="#tra-loi-ngan">
              Trả lời ngắn
            </a>
          </li>
          {page.blocks.map((block) => (
            <li key={block.id}>
              <a className="text-muted-foreground hover:text-primary" href={`#${block.id}`}>
                {block.title}
              </a>
            </li>
          ))}
          <li>
            <a className="text-muted-foreground hover:text-primary" href="#cau-hoi-thuong-gap">
              Câu hỏi thường gặp
            </a>
          </li>
        </ol>
      </nav>
    </aside>
  );
}
