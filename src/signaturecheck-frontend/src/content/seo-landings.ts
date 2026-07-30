import type { Metadata } from "next";

import type { SignatureToolFileType } from "@/components/signature-tool/signature-tool";
import { SITE_NAME } from "@/lib/site";

export type LandingIcon =
  | "calendar"
  | "certificate"
  | "chain"
  | "container"
  | "identity"
  | "integrity"
  | "original"
  | "revocation"
  | "serial"
  | "signature"
  | "timestamp"
  | "xml";

export type LandingTone = "danger" | "neutral" | "success" | "warning";

export type SeoLandingPageContent = {
  slug: string;
  navLabel: string;
  navDescription: string;
  breadcrumbLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  toolFileType: SignatureToolFileType;
  toolNote: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  };
  scope: {
    title: string;
    intro: string;
    items: ReadonlyArray<{
      icon: LandingIcon;
      title: string;
      text: string;
    }>;
  };
  howTo: {
    title: string;
    intro: string;
    steps: ReadonlyArray<{
      title: string;
      text: string;
    }>;
  };
  results: {
    title: string;
    intro: string;
    rows: ReadonlyArray<{
      label: string;
      tone: LandingTone;
      text: string;
    }>;
  };
  faq: {
    title: string;
    intro: string;
    items: ReadonlyArray<{
      question: string;
      answer: string;
    }>;
  };
  sources: ReadonlyArray<{
    label: string;
    href: string;
  }>;
};

export const landingPages = {
  pdf: {
    slug: "kiem-tra-chu-ky-so-pdf",
    navLabel: "Chữ ký PDF",
    navDescription: "Kiểm tra chữ ký PAdES trong tài liệu PDF.",
    breadcrumbLabel: "Kiểm tra chữ ký số PDF",
    title: "Kiểm tra chữ ký số PDF online",
    description:
      "Tải file PDF đã ký để kiểm tra tính toàn vẹn, người ký, chứng thư số, chuỗi CA, OCSP, CRL và dấu thời gian.",
    eyebrow: "Công cụ kiểm tra PDF đã ký",
    intro:
      "Tải lên file PDF để xem chữ ký có khớp với tài liệu, ai đã ký, chứng thư do đơn vị nào cấp và trạng thái xác minh hiện tại.",
    toolFileType: "pdf",
    toolNote: "Hỗ trợ PDF có một hoặc nhiều chữ ký số. Giới hạn dung lượng 25 MB.",
    image: {
      src: "/images/pdf-signature-verification-v2.png",
      width: 1597,
      height: 985,
      alt: "Minh họa các lớp kiểm tra chữ ký số trong một tài liệu PDF",
      caption: "Một kết luận rõ ràng được hình thành từ nhiều kiểm tra kỹ thuật độc lập.",
    },
    scope: {
      title: "Công cụ kiểm tra những gì trong PDF?",
      intro:
        "Kết quả được tách thành từng kiểm tra để bạn biết vì sao một chữ ký được kết luận hợp lệ, không hợp lệ hoặc chưa đủ dữ liệu.",
      items: [
        {
          icon: "integrity",
          title: "Tính toàn vẹn tài liệu",
          text: "Phát hiện nội dung PDF có bị thay đổi sau khi chữ ký được tạo hay không.",
        },
        {
          icon: "signature",
          title: "Chữ ký mật mã",
          text: "Xác minh chữ ký có khớp với nội dung đã được ký trong tài liệu.",
        },
        {
          icon: "identity",
          title: "Người ký và đơn vị cấp",
          text: "Đọc thông tin chủ thể trên chứng thư và tổ chức chứng thực đã phát hành.",
        },
        {
          icon: "chain",
          title: "Chuỗi chứng thư",
          text: "Kiểm tra đường dẫn chứng thư tới CA tin cậy theo dữ liệu hiện có.",
        },
        {
          icon: "revocation",
          title: "Trạng thái thu hồi",
          text: "Hiển thị kết quả OCSP và CRL khi nguồn kiểm tra có thể truy cập.",
        },
        {
          icon: "timestamp",
          title: "Thời gian ký và dấu thời gian",
          text: "Phân biệt thời gian ký được khai báo với dấu thời gian tin cậy độc lập.",
        },
      ],
    },
    howTo: {
      title: "Kiểm tra PDF trong ba bước",
      intro: "Bạn không cần cài đặt phần mềm hoặc có USB Token để kiểm tra một tài liệu đã ký.",
      steps: [
        { title: "Chọn file PDF", text: "Tải lên tài liệu PDF đã nhận hoặc vừa được ký số." },
        { title: "Chạy kiểm tra", text: "Hệ thống đọc chữ ký, chứng thư và dữ liệu xác minh." },
        { title: "Xem từng chữ ký", text: "Đọc kết luận chung, sau đó mở chi tiết khi cần." },
      ],
    },
    results: {
      title: "Hiểu đúng bốn trạng thái chính",
      intro:
        "Trạng thái chưa đủ dữ liệu không được coi là hợp lệ hoặc không hợp lệ. Bạn nên mở chi tiết để biết bước xác minh nào chưa hoàn thành.",
      rows: [
        {
          label: "Hợp lệ",
          tone: "success",
          text: "Các kiểm tra quyết định đều đạt theo dữ liệu tin cậy tại thời điểm kiểm tra.",
        },
        {
          label: "Không hợp lệ",
          tone: "danger",
          text: "Phát hiện lỗi như nội dung bị thay đổi, chữ ký mật mã sai hoặc chứng thư không hợp lệ.",
        },
        {
          label: "Chưa đủ dữ liệu",
          tone: "warning",
          text: "Không có đủ dữ liệu để kết luận chắc chắn, thường do trạng thái chứng thư chưa xác minh được.",
        },
        {
          label: "Không có chữ ký",
          tone: "neutral",
          text: "File là PDF nhưng hệ thống không tìm thấy chữ ký số có thể xác minh.",
        },
      ],
    },
    faq: {
      title: "Khi kiểm tra chữ ký PDF",
      intro: "Các câu trả lời tập trung vào dữ liệu kỹ thuật mà công cụ có thể xác minh.",
      items: [
        {
          question: "PDF có hình con dấu hoặc chữ ký viết tay có phải là chữ ký số không?",
          answer:
            "Không nhất thiết. Hình ảnh con dấu hoặc chữ ký có thể chỉ là nội dung hiển thị. Chữ ký số cần có dữ liệu mật mã và chứng thư số được nhúng trong tài liệu.",
        },
        {
          question: "Một file PDF có nhiều chữ ký thì kết quả hiển thị thế nào?",
          answer:
            "Công cụ liệt kê từng chữ ký riêng, bao gồm người ký, đơn vị cấp, thời gian ký, chứng thư và các bước xác minh tương ứng.",
        },
        {
          question: "Chứng thư đã hết hạn có đồng nghĩa chữ ký không hợp lệ không?",
          answer:
            "Không thể kết luận chỉ từ ngày hết hạn hiện tại. Việc đánh giá còn phụ thuộc thời điểm ký, dấu thời gian và dữ liệu xác minh có trong tài liệu.",
        },
        {
          question: "Kết quả hợp lệ có chứng minh tài liệu có giá trị pháp lý không?",
          answer:
            "Không. Công cụ phản ánh trạng thái kỹ thuật của chữ ký và tài liệu. Giá trị pháp lý còn phụ thuộc chủ thể, thẩm quyền, mục đích giao dịch và quy định áp dụng.",
        },
      ],
    },
    sources: [
      {
        label: "Hướng dẫn kiểm tra hiệu lực chữ ký số của NEAC",
        href: "https://neac.gov.vn/vi/tin-tuc-su-kien/detail/thong-bao/huong-dan-kiem-tra-hieu-luc-chu-ky-so-tren-van-ban-dien-tu-702.htm",
      },
    ],
  },
  xml: {
    slug: "kiem-tra-hoa-don-dien-tu-xml",
    navLabel: "XML hóa đơn điện tử",
    navDescription: "Kiểm tra chữ ký trong file XML và hóa đơn điện tử.",
    breadcrumbLabel: "Kiểm tra chữ ký XML",
    title: "Kiểm tra chữ ký số XML, hóa đơn điện tử",
    description:
      "Tải file XML để kiểm tra tính toàn vẹn, chữ ký số, người ký, chứng thư, chuỗi CA, OCSP và CRL của tài liệu điện tử.",
    eyebrow: "Công cụ kiểm tra XML đã ký",
    intro:
      "Tải lên file XML để xác minh chữ ký được nhúng trong dữ liệu, thông tin người ký và trạng thái chứng thư tại thời điểm kiểm tra.",
    toolFileType: "xml",
    toolNote:
      "Trang này kiểm tra chữ ký kỹ thuật trong XML; không thay thế việc tra cứu hóa đơn trên hệ thống của cơ quan thuế.",
    image: {
      src: "/images/xml-signature-verification.png",
      width: 1592,
      height: 988,
      alt: "Minh họa quy trình kiểm tra chữ ký số trong tài liệu XML",
      caption: "Chữ ký XML được đối chiếu với dữ liệu gốc, người ký và chuỗi chứng thư.",
    },
    scope: {
      title: "Công cụ đọc gì trong file XML?",
      intro:
        "XML có thể chứa dữ liệu nghiệp vụ và chữ ký số trong cùng một cấu trúc. Công cụ tập trung xác minh lớp chữ ký, không đánh giá nội dung kế toán hay nghiệp vụ.",
      items: [
        {
          icon: "xml",
          title: "Chữ ký trong XML",
          text: "Phát hiện chữ ký điện tử được nhúng trong cấu trúc XML của tài liệu.",
        },
        {
          icon: "integrity",
          title: "Tính toàn vẹn dữ liệu",
          text: "Kiểm tra phần dữ liệu đã ký có bị thay đổi sau thời điểm ký hay không.",
        },
        {
          icon: "signature",
          title: "Chữ ký mật mã",
          text: "Đối chiếu giá trị chữ ký với dữ liệu XML được tham chiếu.",
        },
        {
          icon: "identity",
          title: "Chủ thể chứng thư",
          text: "Hiển thị người ký, tổ chức và đơn vị đã cấp chứng thư số.",
        },
        {
          icon: "chain",
          title: "Chuỗi chứng thư",
          text: "Xem chứng thư có nối tới CA tin cậy theo dữ liệu hiện có hay không.",
        },
        {
          icon: "revocation",
          title: "OCSP, CRL và thời gian",
          text: "Hiển thị trạng thái thu hồi cùng thời gian ký và dấu thời gian nếu có.",
        },
      ],
    },
    howTo: {
      title: "Kiểm tra XML trong ba bước",
      intro: "Nên sử dụng file XML gốc nhận từ bên phát hành, không dùng bản nội dung đã chuyển sang PDF.",
      steps: [
        { title: "Chọn file XML", text: "Tải lên đúng file dữ liệu XML cần xác minh chữ ký." },
        { title: "Chạy kiểm tra", text: "Hệ thống đọc tham chiếu, chữ ký và chứng thư nhúng." },
        { title: "Đọc kết quả", text: "Xem kết luận kỹ thuật và mở chi tiết từng chữ ký." },
      ],
    },
    results: {
      title: "Phân biệt kết quả kỹ thuật và nghiệp vụ",
      intro:
        "Một chữ ký XML hợp lệ cho biết dữ liệu đã ký vượt qua các kiểm tra kỹ thuật. Kết quả này không tự xác nhận hóa đơn đã được cơ quan thuế cấp mã hoặc có đầy đủ nội dung nghiệp vụ.",
      rows: [
        {
          label: "Hợp lệ kỹ thuật",
          tone: "success",
          text: "Chữ ký khớp dữ liệu, chuỗi chứng thư và các kiểm tra quyết định đều đạt.",
        },
        {
          label: "Không hợp lệ",
          tone: "danger",
          text: "Dữ liệu tham chiếu bị thay đổi, chữ ký sai hoặc chứng thư không vượt qua xác minh.",
        },
        {
          label: "Chưa đủ dữ liệu",
          tone: "warning",
          text: "Không thể hoàn tất một số bước như truy vấn trạng thái thu hồi chứng thư.",
        },
        {
          label: "Không có chữ ký",
          tone: "neutral",
          text: "File XML được đọc nhưng không tìm thấy chữ ký số có thể xác minh.",
        },
      ],
    },
    faq: {
      title: "Khi kiểm tra XML, hóa đơn điện tử",
      intro: "Những điểm dễ nhầm giữa dữ liệu XML, bản thể hiện PDF và trạng thái hóa đơn.",
      items: [
        {
          question: "Nên kiểm tra file XML hay bản hóa đơn PDF?",
          answer:
            "Nếu hóa đơn được phát hành dưới dạng XML, file XML gốc là dữ liệu cần kiểm tra chữ ký. Bản PDF thường chỉ là bản thể hiện để đọc hoặc in.",
        },
        {
          question: "Chữ ký XML hợp lệ có nghĩa hóa đơn chắc chắn hợp pháp không?",
          answer:
            "Không. Công cụ chỉ kiểm tra lớp chữ ký và chứng thư. Trạng thái mã của cơ quan thuế, nội dung nghiệp vụ và điều kiện pháp lý cần được kiểm tra bằng nguồn phù hợp.",
        },
        {
          question: "File XML có thể có nhiều chữ ký không?",
          answer:
            "Có. Tùy cấu trúc tài liệu, XML có thể chứa nhiều chữ ký hoặc nhiều tham chiếu. Công cụ hiển thị từng chữ ký phát hiện được.",
        },
        {
          question: "Vì sao XML mở được nhưng công cụ báo không có chữ ký?",
          answer:
            "Một file XML hợp lệ về cú pháp chưa chắc đã được ký số. Cũng có trường hợp chữ ký nằm ở tài liệu khác hoặc cấu trúc không thuộc định dạng được hỗ trợ.",
        },
      ],
    },
    sources: [
      {
        label: "Hướng dẫn kiểm tra hiệu lực chữ ký số của NEAC",
        href: "https://neac.gov.vn/vi/tin-tuc-su-kien/detail/thong-bao/huong-dan-kiem-tra-hieu-luc-chu-ky-so-tren-van-ban-dien-tu-702.htm",
      },
      {
        label: "Tiêu chuẩn XML Signature của W3C",
        href: "https://www.w3.org/TR/xmldsig-core1/",
      },
    ],
  },
  cades: {
    slug: "kiem-tra-file-p7s-p7m",
    navLabel: "File P7S, P7M",
    navDescription: "Kiểm tra chữ ký CMS/CAdES và tài liệu đi kèm.",
    breadcrumbLabel: "Kiểm tra file P7S, P7M",
    title: "Kiểm tra file P7S, P7M online",
    description:
      "Tải file P7S hoặc P7M để kiểm tra chữ ký CAdES, người ký, chứng thư số, chuỗi CA, OCSP, CRL và dữ liệu đi kèm.",
    eyebrow: "Công cụ kiểm tra chữ ký CAdES",
    intro:
      "Xác minh chữ ký trong file P7S hoặc P7M, xem thông tin người ký, chứng thư và trạng thái dữ liệu được bảo vệ.",
    toolFileType: "cades",
    toolNote:
      "P7S dạng detached có thể cần tài liệu gốc tương ứng. P7M thường chứa cả dữ liệu và chữ ký trong cùng một file.",
    image: {
      src: "/images/p7s-p7m-signature-verification.png",
      width: 1586,
      height: 992,
      alt: "Minh họa sự khác nhau giữa chữ ký P7S và file P7M",
      caption: "P7S có thể tham chiếu tài liệu rời, trong khi P7M thường đóng gói nội dung đã ký.",
    },
    scope: {
      title: "Công cụ kiểm tra gì trong P7S và P7M?",
      intro:
        "Hai phần mở rộng đều thường dùng cấu trúc CMS/CAdES, nhưng cách chứa dữ liệu gốc có thể khác nhau. Kết quả sẽ nêu rõ khi thiếu tài liệu cần thiết để xác minh.",
      items: [
        {
          icon: "original",
          title: "Dữ liệu gốc",
          text: "Xác định chữ ký có chứa nội dung hay cần tài liệu gốc nằm bên ngoài.",
        },
        {
          icon: "container",
          title: "Cấu trúc CMS/CAdES",
          text: "Đọc vùng dữ liệu ký, thông tin người ký và chứng thư đi kèm.",
        },
        {
          icon: "integrity",
          title: "Tính toàn vẹn",
          text: "Đối chiếu chữ ký với nội dung được đóng gói hoặc tài liệu được tham chiếu.",
        },
        {
          icon: "identity",
          title: "Người ký",
          text: "Hiển thị chủ thể, tổ chức và đơn vị đã cấp chứng thư số.",
        },
        {
          icon: "chain",
          title: "Chuỗi chứng thư",
          text: "Kiểm tra đường dẫn chứng thư tới nguồn tin cậy được cấu hình.",
        },
        {
          icon: "revocation",
          title: "Thu hồi và dấu thời gian",
          text: "Đọc OCSP, CRL, thời gian ký và dấu thời gian có trong chữ ký.",
        },
      ],
    },
    howTo: {
      title: "Kiểm tra P7S, P7M trong ba bước",
      intro: "Giữ lại file gốc đi kèm khi nhận P7S để có đủ dữ liệu đối chiếu nếu chữ ký ở dạng detached.",
      steps: [
        { title: "Chọn P7S hoặc P7M", text: "Tải lên file chữ ký hoặc gói tài liệu cần kiểm tra." },
        { title: "Phân tích cấu trúc", text: "Hệ thống xác định dữ liệu ký và chứng thư liên quan." },
        { title: "Xem kết luận", text: "Đọc trạng thái chữ ký hoặc thông báo thiếu tài liệu gốc." },
      ],
    },
    results: {
      title: "Hiểu các trường hợp thường gặp",
      intro:
        "P7S và P7M là phần mở rộng file, không tự bảo đảm chữ ký hợp lệ. Kết luận phụ thuộc nội dung thực tế, chứng thư và dữ liệu xác minh.",
      rows: [
        {
          label: "Hợp lệ",
          tone: "success",
          text: "Nội dung cần thiết có đủ và chữ ký vượt qua các bước xác minh quyết định.",
        },
        {
          label: "Không hợp lệ",
          tone: "danger",
          text: "Chữ ký không khớp dữ liệu, nội dung bị thay đổi hoặc chứng thư không hợp lệ.",
        },
        {
          label: "Thiếu tài liệu gốc",
          tone: "warning",
          text: "Chữ ký P7S ở dạng detached nhưng file hiện tại không chứa dữ liệu gốc để đối chiếu.",
        },
        {
          label: "Không hỗ trợ",
          tone: "neutral",
          text: "File có phần mở rộng phù hợp nhưng cấu trúc bên trong không thuộc định dạng hệ thống đọc được.",
        },
      ],
    },
    faq: {
      title: "Khi làm việc với P7S và P7M",
      intro: "Giải thích ngắn gọn về dữ liệu đi kèm và phạm vi xác minh của công cụ.",
      items: [
        {
          question: "P7S khác P7M như thế nào?",
          answer:
            "P7S thường được dùng cho chữ ký CMS và có thể tách rời tài liệu gốc. P7M thường là gói chứa nội dung đã ký. Cách dùng cụ thể vẫn phụ thuộc phần mềm tạo file.",
        },
        {
          question: "Vì sao kiểm tra P7S lại cần file gốc?",
          answer:
            "Với chữ ký detached, P7S chỉ chứa chữ ký và thông tin chứng thư. Dữ liệu gốc nằm ở file khác nên cần có đúng tài liệu đó để đối chiếu.",
        },
        {
          question: "Đổi phần mở rộng file thành .p7s hoặc .p7m có được không?",
          answer:
            "Không. Phần mở rộng không tạo ra chữ ký số. Bên trong file phải có cấu trúc CMS/CAdES hợp lệ được sinh bởi phần mềm ký.",
        },
        {
          question: "Công cụ có trích xuất tài liệu bên trong P7M không?",
          answer:
            "Trang hiện tập trung vào kiểm tra chữ ký và chứng thư. Việc trích xuất hoặc tải xuống tài liệu gốc không phải chức năng được cam kết.",
        },
      ],
    },
    sources: [
      {
        label: "Đặc tả Cryptographic Message Syntax RFC 5652",
        href: "https://datatracker.ietf.org/doc/html/rfc5652",
      },
      {
        label: "Tài liệu xác minh CAdES của DSS",
        href: "https://ec.europa.eu/digital-building-blocks/DSS/webapp-demo/doc/dss-documentation.html",
      },
    ],
  },
  certificate: {
    slug: "kiem-tra-chung-thu-so",
    navLabel: "Chứng thư số",
    navDescription: "Đọc và kiểm tra chứng thư trong tài liệu đã ký.",
    breadcrumbLabel: "Kiểm tra chứng thư số",
    title: "Kiểm tra chứng thư số trong tài liệu đã ký",
    description:
      "Tải tài liệu đã ký để xem chủ thể, đơn vị cấp, serial, thời hạn, chuỗi CA và trạng thái OCSP/CRL của chứng thư số.",
    eyebrow: "Đọc chứng thư trong file đã ký",
    intro:
      "Tải lên PDF, XML, P7S hoặc P7M để xem chứng thư gắn với từng chữ ký và các kiểm tra liên quan đến hiệu lực, chuỗi tin cậy và thu hồi.",
    toolFileType: "all",
    toolNote:
      "Công cụ đọc chứng thư nằm trong tài liệu đã ký; hiện không nhận file chứng thư .cer hoặc .crt độc lập.",
    image: {
      src: "/images/certificate-verification.png",
      width: 1586,
      height: 992,
      alt: "Minh họa thông tin và trạng thái của chứng thư số trong tài liệu đã ký",
      caption: "Chủ thể, thời hạn, chuỗi CA và trạng thái thu hồi là các lớp thông tin riêng biệt.",
    },
    scope: {
      title: "Bạn sẽ thấy gì trong chứng thư số?",
      intro:
        "Chứng thư liên kết khóa công khai với một chủ thể. Công cụ trình bày thông tin định danh và trạng thái kỹ thuật theo từng chữ ký phát hiện được.",
      items: [
        {
          icon: "identity",
          title: "Chủ thể chứng thư",
          text: "Đọc tên người ký, tổ chức và các thuộc tính định danh được khai báo.",
        },
        {
          icon: "certificate",
          title: "Đơn vị cấp",
          text: "Hiển thị tổ chức chứng thực đã phát hành chứng thư cho chủ thể.",
        },
        {
          icon: "serial",
          title: "Số serial",
          text: "Cung cấp số định danh duy nhất của chứng thư do đơn vị cấp quản lý.",
        },
        {
          icon: "calendar",
          title: "Thời hạn chứng thư",
          text: "Hiển thị mốc có hiệu lực từ ngày nào và hết hiệu lực vào thời điểm nào.",
        },
        {
          icon: "chain",
          title: "Chuỗi tin cậy",
          text: "Kiểm tra các chứng thư trung gian và điểm tin cậy theo cấu hình hệ thống.",
        },
        {
          icon: "revocation",
          title: "OCSP và CRL",
          text: "Xem chứng thư có bị ghi nhận thu hồi hoặc chưa kiểm tra được hay không.",
        },
      ],
    },
    howTo: {
      title: "Xem chứng thư trong ba bước",
      intro: "Chứng thư được đọc từ chữ ký trong tài liệu, vì vậy file tải lên phải là tài liệu đã ký.",
      steps: [
        { title: "Chọn tài liệu đã ký", text: "Tải lên PDF, XML, P7S hoặc P7M có chữ ký số." },
        { title: "Chạy kiểm tra", text: "Hệ thống đọc từng chữ ký và chứng thư tương ứng." },
        { title: "Mở chi tiết", text: "Xem chủ thể, serial, thời hạn, chuỗi CA, OCSP và CRL." },
      ],
    },
    results: {
      title: "Không nên đọc riêng một trường dữ liệu",
      intro:
        "Ngày hết hạn, chuỗi CA và trạng thái thu hồi trả lời những câu hỏi khác nhau. Kết luận chữ ký cần xem toàn bộ báo cáo và dấu thời gian nếu có.",
      rows: [
        {
          label: "Chuỗi đạt",
          tone: "success",
          text: "Chứng thư nối được tới điểm tin cậy theo dữ liệu và cấu hình hiện tại.",
        },
        {
          label: "Bị thu hồi",
          tone: "danger",
          text: "Nguồn OCSP hoặc CRL ghi nhận chứng thư đã bị thu hồi.",
        },
        {
          label: "Chưa kiểm tra được",
          tone: "warning",
          text: "Nguồn trạng thái không truy cập được hoặc không có đủ dữ liệu để kết luận.",
        },
        {
          label: "Không có dấu thời gian",
          tone: "neutral",
          text: "Chữ ký không chứa dấu thời gian tin cậy độc lập; trạng thái này được hiển thị là “Không”.",
        },
      ],
    },
    faq: {
      title: "Khi đọc thông tin chứng thư số",
      intro: "Các câu hỏi về thời hạn, thu hồi và phạm vi file được hỗ trợ.",
      items: [
        {
          question: "Có thể tải trực tiếp file .cer hoặc .crt để kiểm tra không?",
          answer:
            "Chưa. Công cụ hiện đọc chứng thư được nhúng trong chữ ký của PDF, XML, P7S hoặc P7M, không xử lý chứng thư độc lập.",
        },
        {
          question: "Chứng thư còn hạn có nghĩa chữ ký chắc chắn hợp lệ không?",
          answer:
            "Không. Thời hạn chỉ là một điều kiện. Còn cần kiểm tra chữ ký mật mã, tính toàn vẹn, chuỗi tin cậy, thu hồi và dữ liệu thời gian.",
        },
        {
          question: "OCSP và CRL khác nhau ở điểm nào?",
          answer:
            "OCSP truy vấn trạng thái chứng thư qua một dịch vụ trực tuyến. CRL là danh sách các chứng thư bị thu hồi do đơn vị cấp công bố.",
        },
        {
          question: "Serial chứng thư dùng để làm gì?",
          answer:
            "Serial giúp phân biệt chứng thư do cùng một đơn vị cấp phát hành và được sử dụng khi truy vấn hoặc đối chiếu trạng thái chứng thư.",
        },
      ],
    },
    sources: [
      {
        label: "Hướng dẫn kiểm tra chứng thư số của NEAC",
        href: "https://neac.gov.vn/vi/tin-tuc-su-kien/detail/thong-bao/huong-dan-kiem-tra-hieu-luc-chu-ky-so-tren-van-ban-dien-tu-702.htm",
      },
      {
        label: "Đặc tả giao thức OCSP RFC 6960",
        href: "https://datatracker.ietf.org/doc/rfc6960/",
      },
    ],
  },
} as const satisfies Record<string, SeoLandingPageContent>;

export const landingPageList = Object.values(landingPages);

export function createLandingMetadata(page: SeoLandingPageContent): Metadata {
  const canonicalPath = `/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      locale: "vi_VN",
      url: canonicalPath,
      siteName: SITE_NAME,
      images: [
        {
          url: page.image.src,
          width: page.image.width,
          height: page.image.height,
          alt: page.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image.src],
    },
  };
}
