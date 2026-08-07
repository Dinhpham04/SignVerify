import {
  BadgeCheck,
  CalendarClock,
  ChevronDown,
  ExternalLink,
  FileCheck2,
  Fingerprint,
  Link2,
  Network,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { HOME_UPDATED_AT } from "@/lib/site";

const verificationItems = [
  {
    icon: FileCheck2,
    title: "Tính toàn vẹn tài liệu",
    text: "Đối chiếu dữ liệu đã ký để phát hiện nội dung bị thay đổi sau khi chữ ký được tạo.",
  },
  {
    icon: Fingerprint,
    title: "Chữ ký mật mã",
    text: "Xác minh giá trị chữ ký có khớp với phần dữ liệu được ký trong tài liệu hay không.",
  },
  {
    icon: UserRoundCheck,
    title: "Người ký và chứng thư",
    text: "Đọc chủ thể chứng thư, đơn vị phát hành, số serial và khoảng thời gian có hiệu lực.",
  },
  {
    icon: Link2,
    title: "Chuỗi chứng thư",
    text: "Kiểm tra đường dẫn chứng thư tới CA tin cậy theo kho tin cậy đang được hệ thống sử dụng.",
  },
  {
    icon: Network,
    title: "Trạng thái OCSP và CRL",
    text: "Tra cứu dữ liệu thu hồi khi điểm OCSP hoặc danh sách CRL của đơn vị phát hành có thể truy cập.",
  },
  {
    icon: CalendarClock,
    title: "Thời gian ký và dấu thời gian",
    text: "Phân biệt thời gian được khai báo trong chữ ký với dấu thời gian tin cậy do bên độc lập cấp.",
  },
] as const;

const resultStates = [
  {
    label: "Hợp lệ",
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-800",
    markerClassName: "bg-emerald-600",
    text: "Các kiểm tra quyết định đều đạt theo dữ liệu tin cậy có tại thời điểm kiểm tra.",
  },
  {
    label: "Không hợp lệ",
    badgeClassName: "border-red-200 bg-red-50 text-red-800",
    markerClassName: "bg-red-600",
    text: "Phát hiện lỗi như tài liệu bị thay đổi, chữ ký mật mã sai hoặc chứng thư không đáp ứng điều kiện xác minh.",
  },
  {
    label: "Chưa đủ dữ liệu",
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-900",
    markerClassName: "bg-amber-500",
    text: "Một hoặc nhiều bước chưa thể kết luận, thường do thiếu chuỗi tin cậy hoặc không lấy được dữ liệu thu hồi.",
  },
  {
    label: "Không có chữ ký",
    badgeClassName: "border-slate-200 bg-slate-100 text-slate-700",
    markerClassName: "bg-slate-500",
    text: "File đọc được nhưng không tìm thấy chữ ký số thuộc định dạng mà công cụ có thể xác minh.",
  },
] as const;

const faqItems: ReadonlyArray<{ question: string; answer: ReactNode }> = [
  {
    question: "Chữ ký hợp lệ có đồng nghĩa tài liệu chắc chắn có giá trị pháp lý không?",
    answer:
      "Không. Kết quả hợp lệ xác nhận các điều kiện kỹ thuật của chữ ký theo dữ liệu hiện có. Giá trị pháp lý còn phụ thuộc người ký, thẩm quyền, mục đích giao dịch và quy định áp dụng cho tài liệu.",
  },
  {
    question: "Không có dấu thời gian thì chữ ký có bị coi là không hợp lệ không?",
    answer:
      "Không thể kết luận chỉ từ việc thiếu dấu thời gian. Công cụ vẫn kiểm tra chữ ký mật mã và chứng thư, nhưng không có bằng chứng thời gian độc lập để xác nhận thời điểm chữ ký đã tồn tại.",
  },
  {
    question: "OCSP và CRL dùng để làm gì?",
    answer:
      "OCSP và CRL là hai cơ chế cung cấp thông tin chứng thư số có bị thu hồi hay không. Kết quả có thể chưa xác định nếu máy chủ của đơn vị phát hành không phản hồi hoặc dữ liệu không sẵn có.",
  },
  {
    question: "Vì sao chứng thư đã hết hạn nhưng chữ ký vẫn cần xem thêm dấu thời gian?",
    answer:
      "Ngày hết hạn hiện tại không tự mô tả trạng thái chứng thư tại thời điểm ký. Dấu thời gian tin cậy và dữ liệu xác minh được lưu cùng chữ ký có thể cung cấp thêm căn cứ để đánh giá chữ ký trong quá khứ.",
  },
  {
    question: "Công cụ có xác nhận hóa đơn điện tử đã được cơ quan thuế chấp nhận không?",
    answer: (
      <>
        Không. Công cụ kiểm tra lớp chữ ký kỹ thuật trong XML. Để kiểm tra trạng thái phát hành và thông tin nghiệp vụ,
        hãy đối chiếu thêm tại{" "}
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/cach-kiem-tra-hoa-don-dien-tu-hop-le">
          hướng dẫn kiểm tra hóa đơn điện tử
        </Link>
        .
      </>
    ),
  },
  {
    question: "File tải lên có được lưu lại không?",
    answer:
      "Hệ thống đọc nội dung file cho lần kiểm tra hiện tại và không có luồng ghi tài liệu vào kho dữ liệu của ứng dụng. Hãy tránh tải lên tài liệu ngoài phạm vi bạn được phép xử lý.",
  },
];

const sources = [
  {
    label: "Hướng dẫn của NEAC",
    href: "https://neac.gov.vn/vi/tin-tuc-su-kien/detail/thong-bao/huong-dan-kiem-tra-hieu-luc-chu-ky-so-tren-van-ban-dien-tu-702.htm",
    text: "Cách kiểm tra hiệu lực chữ ký số trên văn bản điện tử.",
  },
  {
    label: "Tài liệu EU DSS",
    href: "https://ec.europa.eu/digital-building-blocks/DSS/webapp-demo/doc/dss-documentation.html",
    text: "Khái niệm và quy trình xác minh chữ ký điện tử của thư viện DSS.",
  },
  {
    label: "RFC 6960 về OCSP",
    href: "https://datatracker.ietf.org/doc/html/rfc6960",
    text: "Đặc tả giao thức kiểm tra trạng thái chứng thư trực tuyến.",
  },
] as const;

export function HomeSeoContent() {
  return (
    <>
      <section id="kiem-tra-duoc-gi" aria-labelledby="verification-scope-heading" className="border-t bg-slate-100">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-14">
          <div className="grid items-start gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <p className="text-sm font-semibold text-primary">Phạm vi xác minh</p>
              <h2 id="verification-scope-heading" className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                Công cụ kiểm tra chữ ký số những gì?
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Một kết luận không chỉ dựa vào hình ảnh chữ ký hiển thị trên tài liệu. Hệ thống đọc dữ liệu chữ ký,
                chứng thư và các nguồn xác minh liên quan để trình bày từng bước kiểm tra riêng biệt.
              </p>

              <figure className="mt-7 overflow-hidden border bg-white">
                <Image
                  src="/images/certificate-verification.png"
                  alt="Minh họa tài liệu, chứng thư, chuỗi chứng thư, OCSP và CRL trong quá trình kiểm tra chữ ký số"
                  width={1586}
                  height={992}
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 720px, calc(100vw - 32px)"
                  className="h-auto w-full"
                />
                <figcaption className="border-t px-4 py-3 text-xs leading-5 text-muted-foreground">
                  Kết luận chung được tổng hợp từ nhiều kiểm tra kỹ thuật độc lập.
                </figcaption>
              </figure>
            </div>

            <div className="grid border-t border-slate-300 sm:grid-cols-2">
              {verificationItems.map(({ icon: Icon, title, text }) => (
                <div className="border-b border-slate-300 py-5 sm:px-5 sm:odd:border-r sm:odd:pl-0" key={title}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-primary">
                      <Icon className="h-4 w-4" aria-hidden={true} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="doc-ket-qua" aria-labelledby="result-guide-heading" className="border-t bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-14">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">Đọc đúng kết quả</p>
            <h2 id="result-guide-heading" className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
              Bốn kết luận cần phân biệt
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              “Chưa đủ dữ liệu” không đồng nghĩa với “không hợp lệ”. Hãy mở chi tiết từng chữ ký để biết bước nào
              đã đạt, thất bại hoặc chưa thể xác minh.
            </p>
          </div>

          <div className="mt-8 border-y">
            {resultStates.map((state) => (
              <div className="grid gap-3 border-b py-5 last:border-b-0 sm:grid-cols-[180px_1fr] sm:items-center" key={state.label}>
                <div>
                  <span className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-sm font-semibold ${state.badgeClassName}`}>
                    <span className={`h-2 w-2 rounded-full ${state.markerClassName}`} aria-hidden={true} />
                    {state.label}
                  </span>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{state.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Cần xem sâu hơn về chứng thư? Đọc trang{" "}
            <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/kiem-tra-chung-thu-so">
              kiểm tra chứng thư số
            </Link>{" "}
            để hiểu hiệu lực, chuỗi CA và trạng thái thu hồi.
          </p>
        </div>
      </section>

      <section id="bao-mat-va-gioi-han" aria-labelledby="privacy-heading" className="border-t bg-slate-100">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-primary">
              <ShieldCheck className="h-5 w-5" aria-hidden={true} />
            </div>
            <h2 id="privacy-heading" className="mt-4 text-2xl font-semibold text-foreground">
              File được xử lý cho lần kiểm tra hiện tại
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Hệ thống đọc nội dung file để chạy xác minh và không có luồng ghi tài liệu vào kho dữ liệu của ứng
              dụng. Mỗi file được giới hạn 25 MB. Bạn vẫn nên chỉ tải lên tài liệu mình có quyền xử lý và chủ động
              loại bỏ dữ liệu không cần thiết.
            </p>
          </div>

          <div className="border-t border-slate-300 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-primary">
              <BadgeCheck className="h-5 w-5" aria-hidden={true} />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">Kết luận kỹ thuật có phạm vi rõ ràng</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Kết quả phản ánh dữ liệu chữ ký, kho tin cậy và trạng thái OCSP/CRL có tại thời điểm kiểm tra. Công cụ
              không xác nhận thẩm quyền của người ký, nội dung nghiệp vụ, trạng thái hóa đơn trên hệ thống thuế hoặc
              đưa ra kết luận pháp lý thay cho cơ quan có thẩm quyền.
            </p>
          </div>
        </div>
      </section>

      <section id="cau-hoi-thuong-gap" aria-labelledby="faq-heading" className="border-t bg-white">
        <div className="mx-auto grid w-full max-w-5xl gap-9 px-4 py-12 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:py-14">
          <div>
            <p className="text-sm font-semibold text-primary">Câu hỏi thường gặp</p>
            <h2 id="faq-heading" className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
              Những điểm dễ hiểu nhầm khi kiểm tra
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Các câu trả lời tập trung vào phạm vi kỹ thuật của công cụ. Với hồ sơ quan trọng, hãy đối chiếu thêm
              quy định chuyên ngành và nguồn phát hành tài liệu.
            </p>
          </div>

          <div className="border-t">
            {faqItems.map((item) => (
              <details className="group border-b" key={item.question}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <ChevronDown
                    className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden={true}
                  />
                </summary>
                <div className="max-w-2xl pb-5 pr-9 text-sm leading-7 text-muted-foreground">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>

        <div className="border-t bg-slate-50">
          <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Nguồn tham khảo kỹ thuật</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Nội dung được tổng hợp và diễn giải lại để phù hợp với kết quả mà công cụ hiển thị.
                </p>
              </div>
              <time className="text-xs text-muted-foreground" dateTime={HOME_UPDATED_AT}>
                Cập nhật: 06/08/2026
              </time>
            </div>

            <div className="mt-6 grid border-t sm:grid-cols-3">
              {sources.map((source) => (
                <a
                  className="group border-b py-5 sm:px-5 sm:not-last:border-r sm:first:pl-0 sm:last:pr-0"
                  href={source.href}
                  key={source.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="flex items-center gap-2 font-semibold text-foreground group-hover:text-primary">
                    {source.label}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden={true} />
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">{source.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
