import { ArrowRight, FileCheck2, FileKey2, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { HomeSeoContent } from "@/components/home-seo-content";
import { SignatureTool } from "@/components/signature-tool/signature-tool";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { guideList } from "@/content/guides";
import { landingPageList } from "@/content/seo-landings";
import { HOME_UPDATED_AT, SITE_NAME, SITE_URL } from "@/lib/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        alternateName: ["Kiểm Tra Chữ Ký Số", "chukyso.automation.info.vn"],
        url: SITE_URL,
        inLanguage: "vi-VN",
      },
      {
        "@type": "WebApplication",
        name: "Kiểm tra chữ ký số online",
        url: SITE_URL,
        applicationCategory: "SecurityApplication",
        operatingSystem: "Web",
        inLanguage: "vi-VN",
        isAccessibleForFree: true,
        dateModified: HOME_UPDATED_AT,
        featureList: [
          "Kiểm tra tính toàn vẹn của tài liệu đã ký",
          "Xác minh chữ ký mật mã và thông tin người ký",
          "Kiểm tra chứng thư số và chuỗi CA tin cậy",
          "Kiểm tra trạng thái thu hồi qua OCSP và CRL",
          "Hiển thị thời gian ký và dấu thời gian",
        ],
        description:
          "Công cụ kiểm tra chữ ký số, chứng thư số, chuỗi CA và trạng thái OCSP/CRL trên PDF, XML, P7S và P7M.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "VND",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      <section id="cong-cu" className="mx-auto w-full max-w-5xl px-4 py-9 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Kiểm tra chữ ký số online
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Tải lên PDF, XML, P7S hoặc P7M để kiểm tra chữ ký, chứng thư số và trạng thái tài liệu.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-3xl">
          <SignatureTool />
        </div>

        <div className="mx-auto mt-5 grid max-w-3xl gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <TrustItem icon={LockKeyhole} text="Không lưu file" />
          <TrustItem icon={FileKey2} text="Hỗ trợ 4 định dạng" />
          <TrustItem icon={FileCheck2} text="Kết quả nhanh" />
        </div>
      </section>

      <section id="cach-su-dung" className="border-t bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Kiểm tra trong ba bước</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                Kết quả ưu tiên kết luận dễ hiểu. Thông tin CA, OCSP, CRL và dấu thời gian vẫn có trong phần chi tiết.
              </p>
            </div>
            <ol className="grid gap-6 sm:grid-cols-3">
              <Step number="1" title="Chọn file" text="Tải lên một file PDF, XML, P7S hoặc P7M." />
              <Step number="2" title="Chờ kiểm tra" text="Hệ thống đọc chữ ký và kiểm tra chứng thư số." />
              <Step number="3" title="Đọc kết quả" text="Xem kết luận trước, mở chi tiết kỹ thuật khi cần." />
            </ol>
          </div>

          <div id="dinh-dang" className="mt-10 border-t pt-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Kiểm tra theo định dạng và nhu cầu</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Mỗi trang sử dụng cùng công cụ nhưng giải thích rõ phạm vi kiểm tra và cách đọc kết quả phù hợp.
              </p>
            </div>

            <div className="mt-6 grid border-t sm:grid-cols-2">
              {landingPageList.map((page) => (
                <Link
                  className="group flex items-start justify-between gap-4 border-b py-5 sm:px-5 sm:odd:border-r sm:odd:pl-0"
                  href={`/${page.slug}`}
                  key={page.slug}
                >
                  <span>
                    <span className="font-semibold text-foreground group-hover:text-primary">{page.navLabel}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">{page.navDescription}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden={true} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeSeoContent />

      <section id="kien-thuc" className="border-t bg-slate-100">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">Kiến thức thực hành</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Hiểu trước khi ký và kiểm tra</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Hướng dẫn từ khái niệm cơ bản đến thao tác ký PDF và kiểm tra hóa đơn điện tử, có liên kết tới
              nguồn chính thức để đối chiếu.
            </p>
          </div>

          <div className="mt-7 grid border-t sm:grid-cols-2">
            {guideList.map((guide) => (
              <Link
                className="group flex min-h-36 items-start justify-between gap-5 border-b py-5 sm:px-5 sm:odd:border-r sm:odd:pl-0 sm:even:pr-0"
                href={`/${guide.slug}`}
                key={guide.slug}
              >
                <span>
                  <span className="font-semibold text-foreground group-hover:text-primary">{guide.navLabel}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">{guide.navDescription}</span>
                  <span className="mt-3 block text-xs text-muted-foreground">{guide.readingTime}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden={true} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function TrustItem({
  icon: Icon,
  text,
}: {
  icon: typeof ShieldCheck;
  text: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Icon className="h-4 w-4 text-primary" aria-hidden={true} />
      <span>{text}</span>
    </div>
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
