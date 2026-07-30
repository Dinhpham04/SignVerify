import type { Metadata } from "next";

import { SITE_NAME, SITE_URL } from "@/lib/site";

export type GuideTone = "info" | "warning";

export type GuideBlock =
  | {
      kind: "steps";
      id: string;
      title: string;
      lead?: string;
      steps: ReadonlyArray<{
        title: string;
        text: string;
      }>;
    }
  | {
      kind: "definitions";
      id: string;
      title: string;
      lead?: string;
      items: ReadonlyArray<{
        title: string;
        text: string;
      }>;
    }
  | {
      kind: "comparison";
      id: string;
      title: string;
      lead?: string;
      leftLabel: string;
      rightLabel: string;
      rows: ReadonlyArray<{
        criterion: string;
        left: string;
        right: string;
      }>;
    }
  | {
      kind: "checklist";
      id: string;
      title: string;
      lead?: string;
      items: ReadonlyArray<{
        title: string;
        text: string;
      }>;
    }
  | {
      kind: "callout";
      id: string;
      title: string;
      text: string;
      tone: GuideTone;
    };

export type GuidePageContent = {
  slug: string;
  navLabel: string;
  navDescription: string;
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  updatedAt: string;
  updatedAtIso: string;
  readingTime: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  };
  answer: {
    title: string;
    text: string;
  };
  takeaways: ReadonlyArray<{
    title: string;
    text: string;
  }>;
  blocks: ReadonlyArray<GuideBlock>;
  tool: {
    href: string;
    label: string;
    title: string;
    text: string;
  };
  faq: ReadonlyArray<{
    question: string;
    answer: string;
  }>;
  resources: ReadonlyArray<{
    publisher: string;
    title: string;
    description: string;
    href: string;
  }>;
  sources: ReadonlyArray<{
    publisher: string;
    title: string;
    href: string;
  }>;
};

export const guides = {
  signPdf: {
    slug: "cach-ky-chu-ky-so-vao-file-pdf",
    navLabel: "Cách ký chữ ký số vào PDF",
    navDescription: "Chuẩn bị chứng thư và ký PDF theo từng bước.",
    breadcrumbLabel: "Cách ký chữ ký số vào PDF",
    eyebrow: "Hướng dẫn thực hành",
    title: "Cách ký chữ ký số vào file PDF",
    description:
      "Hướng dẫn ký chữ ký số vào file PDF bằng chứng thư số: chuẩn bị, thao tác trong Adobe Acrobat, kiểm tra chữ ký và xử lý lỗi thường gặp.",
    intro:
      "Quy trình dưới đây giúp bạn phân biệt ký số bằng chứng thư với chèn ảnh chữ ký, chuẩn bị đúng công cụ và tự kiểm tra lại file sau khi ký.",
    updatedAt: "30/07/2026",
    updatedAtIso: "2026-07-30",
    readingTime: "7 phút đọc",
    image: {
      src: "/images/guide-sign-pdf.jpg",
      width: 1691,
      height: 930,
      alt: "Máy tính đang mở tài liệu PDF cùng thiết bị ký số trên bàn làm việc",
      caption:
        "Ảnh minh họa được tạo riêng cho bài viết. Giao diện thực tế có thể khác theo phần mềm.",
    },
    answer: {
      title: "Cách làm ngắn gọn",
      text: "Mở PDF trong phần mềm hỗ trợ ký bằng chứng thư, chọn chức năng ký số, xác định vị trí hiển thị, chọn Digital ID hoặc chứng thư trên USB Token, xác nhận ký và lưu thành file mới. Sau đó cần mở lại file để kiểm tra tính toàn vẹn, người ký và trạng thái chứng thư.",
    },
    takeaways: [
      {
        title: "Không phải ảnh chữ ký",
        text: "Chèn ảnh chữ ký hoặc hình con dấu không tạo ra chữ ký số có thể xác minh.",
      },
      {
        title: "Cần chứng thư và khóa bí mật",
        text: "Khóa có thể nằm trong USB Token, thiết bị chuyên dụng hoặc dịch vụ ký số từ xa.",
      },
      {
        title: "Luôn kiểm tra lại",
        text: "File lưu thành công chưa đồng nghĩa mọi lớp xác minh đều đạt.",
      },
    ],
    blocks: [
      {
        kind: "checklist",
        id: "chuan-bi",
        title: "Chuẩn bị trước khi ký PDF",
        lead: "Hoàn thành bốn việc này trước khi mở chức năng ký để tránh lỗi giữa chừng.",
        items: [
          {
            title: "File PDF cuối cùng",
            text: "Rà soát nội dung, số trang và phụ lục. Chỉnh sửa sau khi ký có thể làm chữ ký mất hiệu lực.",
          },
          {
            title: "Chứng thư số còn sử dụng được",
            text: "Xác nhận đúng chủ thể, thời hạn chứng thư và quyền sử dụng thiết bị hoặc tài khoản ký.",
          },
          {
            title: "Phần mềm và trình điều khiển",
            text: "Cài phần mềm ký, middleware hoặc driver do nhà cung cấp dịch vụ chữ ký số hướng dẫn.",
          },
          {
            title: "Mã PIN và kết nối",
            text: "Chuẩn bị mã PIN, cắm USB Token hoặc bảo đảm phương thức xác thực ký số từ xa hoạt động.",
          },
        ],
      },
      {
        kind: "steps",
        id: "ky-bang-adobe-acrobat",
        title: "Ký số PDF bằng Adobe Acrobat",
        lead:
          "Tên nút có thể thay đổi theo ngôn ngữ và phiên bản. Trình tự dưới đây bám theo hướng dẫn Acrobat hiện hành.",
        steps: [
          {
            title: "Mở công cụ chứng thư",
            text: "Mở PDF, chọn All tools (Tất cả công cụ), sau đó chọn Use a certificate (Sử dụng chứng thư).",
          },
          {
            title: "Chọn ký số",
            text: "Chọn Digitally sign (Ký số) và xác nhận hướng dẫn trên màn hình.",
          },
          {
            title: "Đặt vùng hiển thị",
            text: "Kéo một vùng trên trang nếu muốn chữ ký hiển thị tại một vị trí cụ thể.",
          },
          {
            title: "Chọn Digital ID",
            text: "Chọn đúng chứng thư của người hoặc tổ chức cần ký, sau đó kiểm tra lại thông tin chủ thể.",
          },
          {
            title: "Xác thực thao tác ký",
            text: "Nhập mã PIN, mật khẩu hoặc hoàn thành bước xác thực của dịch vụ ký số từ xa.",
          },
          {
            title: "Lưu thành file mới",
            text: "Chọn Sign và lưu bản đã ký với tên dễ phân biệt. Không ghi đè bản gốc khi chưa kiểm tra.",
          },
        ],
      },
      {
        kind: "callout",
        id: "luu-y-khoa-tai-lieu",
        title: "Có nên chọn “Lock document after signing”?",
        text:
          "Chỉ khóa tài liệu khi đây là chữ ký cuối cùng và quy trình không cần người khác điền biểu mẫu, nhận xét hoặc ký tiếp. Nếu còn nhiều bên ký, hãy thống nhất luồng ký trước khi khóa.",
        tone: "info",
      },
      {
        kind: "checklist",
        id: "kiem-tra-sau-khi-ky",
        title: "Kiểm tra file ngay sau khi ký",
        lead: "Đây là bước thường bị bỏ qua nhưng quyết định file có thể được người nhận xác minh hay không.",
        items: [
          {
            title: "Tài liệu không bị thay đổi",
            text: "Phần mềm phải xác nhận nội dung được bảo vệ bởi chữ ký chưa bị sửa sau thời điểm ký.",
          },
          {
            title: "Đúng người hoặc tổ chức ký",
            text: "Đối chiếu tên chủ thể, tổ chức, mã định danh và đơn vị cấp trên chứng thư.",
          },
          {
            title: "Chuỗi chứng thư và thu hồi",
            text: "Xem chứng thư có nối tới nguồn tin cậy, còn hiệu lực và không bị ghi nhận thu hồi.",
          },
          {
            title: "Thời gian ký và dấu thời gian",
            text: "Phân biệt thời gian do máy người ký khai báo với dấu thời gian từ một đơn vị cung cấp dịch vụ tin cậy.",
          },
        ],
      },
      {
        kind: "definitions",
        id: "loi-thuong-gap",
        title: "Lỗi thường gặp và hướng xử lý",
        items: [
          {
            title: "Không thấy chứng thư để chọn",
            text: "Kiểm tra USB Token, driver, middleware và khởi động lại phần mềm sau khi kết nối thiết bị.",
          },
          {
            title: "Sai mã PIN hoặc thiết bị bị khóa",
            text: "Không thử liên tục. Dừng lại và làm theo quy trình mở khóa của nhà cung cấp chứng thư.",
          },
          {
            title: "Chữ ký hiển thị nhưng bị báo không tin cậy",
            text: "Kiểm tra chuỗi CA, danh sách tin cậy và trạng thái chứng thư thay vì chỉ nhìn hình chữ ký.",
          },
          {
            title: "Chữ ký mất hiệu lực sau khi lưu",
            text: "Dùng bản PDF trước khi ký, ký lại và tránh tối ưu, ghép trang hoặc chỉnh sửa tài liệu sau đó.",
          },
        ],
      },
    ],
    tool: {
      href: "/kiem-tra-chu-ky-so-pdf#cong-cu",
      label: "Kiểm tra file PDF đã ký",
      title: "Bạn vừa ký xong?",
      text: "Tải bản PDF đã ký lên công cụ để xem tính toàn vẹn, người ký, chứng thư, OCSP/CRL và dấu thời gian.",
    },
    faq: [
      {
        question: "Adobe Acrobat Reader miễn phí có ký số PDF được không?",
        answer:
          "Acrobat Reader có thể làm việc với chữ ký dựa trên chứng thư trong nhiều trường hợp. Khả năng thực tế còn phụ thuộc phiên bản, chính sách tài liệu và cách chứng thư được cung cấp trên thiết bị.",
      },
      {
        question: "Có thể ký PDF mà không cần USB Token không?",
        answer:
          "Có. Dịch vụ ký số từ xa có thể lưu khóa trong hạ tầng bảo mật và yêu cầu bạn xác thực thao tác ký. Bạn vẫn cần một chứng thư số và dịch vụ phù hợp.",
      },
      {
        question: "Một file PDF có thể có nhiều chữ ký số không?",
        answer:
          "Có. PDF có thể chứa nhiều chữ ký. Tuy nhiên, người ký trước không nên khóa toàn bộ tài liệu nếu quy trình còn yêu cầu chữ ký tiếp theo.",
      },
      {
        question: "Chèn ảnh con dấu vào PDF có thay thế ký số không?",
        answer:
          "Không. Ảnh con dấu chỉ là nội dung hiển thị, không cung cấp phép kiểm tra mật mã, chứng thư và tính toàn vẹn như chữ ký số.",
      },
    ],
    resources: [
      {
        publisher: "Adobe",
        title: "Hướng dẫn thêm chữ ký số vào PDF",
        description: "Các bước thao tác chính thức trong giao diện Acrobat hiện hành.",
        href: "https://helpx.adobe.com/acrobat/desktop/e-sign-documents/fill-sign-documents/add-digital-sign.html",
      },
      {
        publisher: "NEAC",
        title: "Hướng dẫn kiểm tra hiệu lực chữ ký số",
        description: "Cách đọc người ký, chứng thư, thời gian, OCSP và CRL trên văn bản điện tử.",
        href: "https://neac.gov.vn/vi/tin-tuc-su-kien/detail/thong-bao/huong-dan-kiem-tra-hieu-luc-chu-ky-so-tren-van-ban-dien-tu-702.htm",
      },
    ],
    sources: [
      {
        publisher: "Adobe",
        title: "Add digital signatures to PDFs in Acrobat",
        href: "https://helpx.adobe.com/acrobat/desktop/e-sign-documents/fill-sign-documents/add-digital-sign.html",
      },
      {
        publisher: "Adobe",
        title: "About certificate signatures in Adobe Acrobat",
        href: "https://helpx.adobe.com/acrobat/kb/certificate-signatures.html",
      },
      {
        publisher: "Trung tâm Chứng thực điện tử quốc gia",
        title: "Hướng dẫn kiểm tra hiệu lực chữ ký số trên văn bản điện tử",
        href: "https://neac.gov.vn/vi/tin-tuc-su-kien/detail/thong-bao/huong-dan-kiem-tra-hieu-luc-chu-ky-so-tren-van-ban-dien-tu-702.htm",
      },
    ],
  },
  digitalSignature: {
    slug: "chu-ky-so-la-gi",
    navLabel: "Chữ ký số là gì?",
    navDescription: "Hiểu thành phần, cách hoạt động và phạm vi xác minh.",
    breadcrumbLabel: "Chữ ký số là gì",
    eyebrow: "Kiến thức nền tảng",
    title: "Chữ ký số là gì? Cách hoạt động và giá trị sử dụng",
    description:
      "Giải thích chữ ký số là gì, gồm những thành phần nào, hoạt động ra sao, khác ảnh chữ ký thế nào và cần kiểm tra gì trước khi tin cậy.",
    intro:
      "Chữ ký số không phải hình chữ ký đặt lên tài liệu. Đó là một cơ chế mật mã gắn người ký với dữ liệu và giúp phát hiện nội dung bị thay đổi.",
    updatedAt: "30/07/2026",
    updatedAtIso: "2026-07-30",
    readingTime: "8 phút đọc",
    image: {
      src: "/images/guide-digital-signature.jpg",
      width: 1660,
      height: 947,
      alt: "Tài liệu điện tử, chứng thư và thiết bị ký số trên bàn làm việc",
      caption:
        "Ảnh minh họa được tạo riêng: chữ ký số kết hợp dữ liệu tài liệu, khóa ký và chứng thư gắn với chủ thể.",
    },
    answer: {
      title: "Định nghĩa dễ hiểu",
      text: "Chữ ký số là một dạng chữ ký điện tử sử dụng mật mã khóa công khai. Người ký dùng khóa bí mật để tạo chữ ký trên dữ liệu; người nhận dùng khóa công khai trong chứng thư số để kiểm tra chữ ký, tính toàn vẹn của tài liệu và thông tin chủ thể được cấp chứng thư.",
    },
    takeaways: [
      {
        title: "Gắn với dữ liệu",
        text: "Chữ ký được tính từ nội dung cụ thể, nên thay đổi tài liệu có thể làm kiểm tra thất bại.",
      },
      {
        title: "Gắn với chứng thư",
        text: "Chứng thư liên kết khóa công khai với thông tin của cá nhân hoặc tổ chức.",
      },
      {
        title: "Cần nhiều lớp kiểm tra",
        text: "Không thể kết luận chỉ dựa vào ảnh hiển thị hoặc ngày hết hạn chứng thư.",
      },
    ],
    blocks: [
      {
        kind: "definitions",
        id: "thanh-phan",
        title: "Bốn thành phần chính",
        lead: "Hiểu đúng các thành phần giúp bạn đọc kết quả kiểm tra mà không nhầm lẫn.",
        items: [
          {
            title: "Dữ liệu được ký",
            text: "Có thể là PDF, XML, thông điệp dữ liệu hoặc một phần dữ liệu được chỉ định trong tài liệu.",
          },
          {
            title: "Khóa bí mật",
            text: "Được người ký kiểm soát và dùng để tạo chữ ký. Khóa này không được công khai cho người nhận.",
          },
          {
            title: "Khóa công khai",
            text: "Được dùng để kiểm tra chữ ký và thường nằm trong chứng thư số của người ký.",
          },
          {
            title: "Chứng thư số",
            text: "Gắn khóa công khai với thông tin chủ thể và do tổ chức cung cấp dịch vụ chứng thực phát hành.",
          },
        ],
      },
      {
        kind: "steps",
        id: "cach-hoat-dong",
        title: "Chữ ký số hoạt động như thế nào?",
        steps: [
          {
            title: "Chuẩn bị dữ liệu",
            text: "Phần mềm xác định chính xác nội dung hoặc phần tài liệu cần được bảo vệ bằng chữ ký.",
          },
          {
            title: "Tạo giá trị đại diện",
            text: "Một hàm băm tạo ra giá trị đại diện ngắn cho dữ liệu tại thời điểm ký.",
          },
          {
            title: "Tạo chữ ký",
            text: "Khóa bí mật của người ký được dùng để tạo giá trị chữ ký mật mã.",
          },
          {
            title: "Đính kèm thông tin",
            text: "Chữ ký, chứng thư và dữ liệu xác minh liên quan được nhúng hoặc liên kết với tài liệu.",
          },
          {
            title: "Người nhận kiểm tra",
            text: "Phần mềm dùng khóa công khai và dữ liệu hiện tại để kiểm tra chữ ký có còn khớp hay không.",
          },
        ],
      },
      {
        kind: "comparison",
        id: "khac-anh-chu-ky",
        title: "Chữ ký số khác ảnh chữ ký như thế nào?",
        leftLabel: "Ảnh chữ ký hoặc con dấu",
        rightLabel: "Chữ ký số",
        rows: [
          {
            criterion: "Bản chất",
            left: "Một hình ảnh được đặt vào tài liệu.",
            right: "Dữ liệu mật mã gắn với nội dung được ký.",
          },
          {
            criterion: "Phát hiện sửa đổi",
            left: "Không tự phát hiện tài liệu đã thay đổi.",
            right: "Có thể làm lộ việc dữ liệu không còn khớp với chữ ký.",
          },
          {
            criterion: "Thông tin chủ thể",
            left: "Không có chứng thư để xác minh.",
            right: "Đọc được chủ thể, đơn vị cấp và thời hạn từ chứng thư.",
          },
          {
            criterion: "Khả năng kiểm tra",
            left: "Chủ yếu dựa vào quan sát bằng mắt.",
            right: "Được phần mềm kiểm tra bằng khóa công khai và dữ liệu tin cậy.",
          },
        ],
      },
      {
        kind: "checklist",
        id: "kiem-tra",
        title: "Một chữ ký số cần được kiểm tra những gì?",
        items: [
          {
            title: "Tính toàn vẹn",
            text: "Nội dung hiện tại có đúng với nội dung đã được ký hay không.",
          },
          {
            title: "Chữ ký mật mã",
            text: "Giá trị chữ ký có xác minh được bằng khóa công khai trong chứng thư hay không.",
          },
          {
            title: "Chuỗi tin cậy",
            text: "Chứng thư có nối tới một điểm tin cậy phù hợp theo chính sách kiểm tra hay không.",
          },
          {
            title: "Hiệu lực và thu hồi",
            text: "Xem thời hạn, OCSP, CRL và thời điểm áp dụng kết quả kiểm tra.",
          },
          {
            title: "Dấu thời gian",
            text: "Xác định có bằng chứng thời gian độc lập hay chỉ có thời gian do thiết bị người ký khai báo.",
          },
        ],
      },
      {
        kind: "callout",
        id: "gioi-han",
        title: "Kết quả kỹ thuật không tự thay thế kết luận pháp lý",
        text:
          "Một chữ ký vượt qua kiểm tra kỹ thuật vẫn cần được đặt trong đúng giao dịch, đúng thẩm quyền ký và đúng quy trình nghiệp vụ. Công cụ kiểm tra không xác nhận thẩm quyền đại diện hoặc nội dung hợp đồng.",
        tone: "warning",
      },
    ],
    tool: {
      href: "/#cong-cu",
      label: "Kiểm tra một tài liệu đã ký",
      title: "Muốn xem chữ ký số thực tế gồm những gì?",
      text: "Tải lên PDF, XML, P7S hoặc P7M để xem từng chữ ký, chứng thư, chuỗi CA, OCSP/CRL và dấu thời gian.",
    },
    faq: [
      {
        question: "Chữ ký số có phải chữ ký điện tử không?",
        answer:
          "Có. Chữ ký số là một dạng chữ ký điện tử, sử dụng mật mã khóa công khai và chứng thư số để tạo cơ chế kiểm tra mạnh hơn cho danh tính và tính toàn vẹn dữ liệu.",
      },
      {
        question: "USB Token có phải là chữ ký số không?",
        answer:
          "Không. USB Token là một thiết bị có thể lưu và bảo vệ khóa bí mật. Chữ ký số là dữ liệu được tạo ra trong quá trình ký.",
      },
      {
        question: "Chứng thư hết hạn thì mọi chữ ký cũ đều không hợp lệ?",
        answer:
          "Không thể kết luận chỉ từ ngày hiện tại. Cần xem thời điểm ký, dấu thời gian, dữ liệu xác minh dài hạn, trạng thái thu hồi và chính sách áp dụng.",
      },
      {
        question: "Có nhìn thấy chữ ký số trên mọi tài liệu không?",
        answer:
          "Không. Chữ ký có thể có phần hiển thị trên trang hoặc tồn tại dưới dạng dữ liệu không nhìn thấy trực tiếp. Phần mềm kiểm tra mới là nơi đọc được trạng thái.",
      },
    ],
    resources: [
      {
        publisher: "Cổng Thông tin điện tử Chính phủ",
        title: "Luật Giao dịch điện tử số 20/2023/QH15",
        description: "Văn bản pháp lý nền tảng về giao dịch điện tử, chữ ký điện tử và dịch vụ tin cậy.",
        href: "https://vanban.chinhphu.vn/?classid=1&docid=208421&pageid=27160&typegroupid=3",
      },
      {
        publisher: "Adobe",
        title: "Tổng quan về Digital ID",
        description: "Giải thích khóa bí mật, khóa công khai và Digital ID do CA phát hành.",
        href: "https://helpx.adobe.com/acrobat/desktop/protect-documents/manage-digital-ids/digital-ids.html",
      },
    ],
    sources: [
      {
        publisher: "Quốc hội",
        title: "Luật Giao dịch điện tử số 20/2023/QH15",
        href: "https://vanban.chinhphu.vn/?classid=1&docid=208421&pageid=27160&typegroupid=3",
      },
      {
        publisher: "Adobe",
        title: "Digital ID overview in Adobe Acrobat",
        href: "https://helpx.adobe.com/acrobat/desktop/protect-documents/manage-digital-ids/digital-ids.html",
      },
      {
        publisher: "W3C",
        title: "XML Signature Syntax and Processing Version 1.1",
        href: "https://www.w3.org/TR/xmldsig-core1/",
      },
    ],
  },
  signatureComparison: {
    slug: "chu-ky-dien-tu-va-chu-ky-so",
    navLabel: "Chữ ký điện tử và chữ ký số",
    navDescription: "So sánh khái niệm, mức bảo đảm và trường hợp sử dụng.",
    breadcrumbLabel: "Chữ ký điện tử và chữ ký số",
    eyebrow: "So sánh dễ hiểu",
    title: "Chữ ký điện tử và chữ ký số khác nhau thế nào?",
    description:
      "So sánh chữ ký điện tử và chữ ký số theo bản chất, công nghệ, khả năng xác minh, ví dụ sử dụng và cách lựa chọn phù hợp.",
    intro:
      "Hai khái niệm có quan hệ bao hàm, không phải hai cách ký hoàn toàn tách biệt. Chữ ký số là một dạng chữ ký điện tử có cơ chế mật mã và chứng thư số.",
    updatedAt: "30/07/2026",
    updatedAtIso: "2026-07-30",
    readingTime: "7 phút đọc",
    image: {
      src: "/images/guide-signature-comparison.jpg",
      width: 1536,
      height: 1024,
      alt: "So sánh ký điện tử trên máy tính bảng với ký số bằng chứng thư trên máy tính",
      caption:
        "Ảnh minh họa được tạo riêng. Việc lựa chọn cách ký cần dựa vào mức bảo đảm và yêu cầu của giao dịch.",
    },
    answer: {
      title: "Khác biệt cốt lõi",
      text: "Chữ ký điện tử là khái niệm rộng cho dữ liệu điện tử được gắn hoặc kết hợp logic với thông điệp dữ liệu để xác nhận chủ thể ký và sự chấp thuận. Chữ ký số là một dạng chữ ký điện tử sử dụng mật mã khóa công khai, khóa bí mật và chứng thư số để hỗ trợ xác minh người ký và phát hiện dữ liệu bị thay đổi.",
    },
    takeaways: [
      {
        title: "Quan hệ bao hàm",
        text: "Chữ ký số thuộc nhóm chữ ký điện tử, nhưng không phải mọi chữ ký điện tử đều là chữ ký số.",
      },
      {
        title: "Mức bảo đảm khác nhau",
        text: "Cách xác thực, bằng chứng và khả năng phát hiện sửa đổi quyết định mức tin cậy.",
      },
      {
        title: "Chọn theo giao dịch",
        text: "Không có một hình thức phù hợp cho mọi quy trình và mọi yêu cầu pháp lý.",
      },
    ],
    blocks: [
      {
        kind: "definitions",
        id: "dinh-nghia",
        title: "Hiểu đúng từng khái niệm",
        items: [
          {
            title: "Chữ ký điện tử",
            text: "Khái niệm rộng, có thể được thể hiện bằng nhiều phương thức điện tử nhằm xác nhận chủ thể và sự chấp thuận đối với thông điệp dữ liệu.",
          },
          {
            title: "Chữ ký số",
            text: "Một dạng chữ ký điện tử dựa trên mật mã khóa công khai, trong đó khóa bí mật tạo chữ ký và khóa công khai hỗ trợ kiểm tra.",
          },
          {
            title: "Chứng thư số",
            text: "Dữ liệu gắn khóa công khai với thông tin của chủ thể. Chứng thư không phải chính chữ ký.",
          },
          {
            title: "Ảnh chữ ký",
            text: "Có thể là một biểu hiện điện tử trong quy trình nhất định, nhưng tự nó không cung cấp kiểm tra mật mã và chứng thư.",
          },
        ],
      },
      {
        kind: "comparison",
        id: "bang-so-sanh",
        title: "Bảng so sánh chữ ký điện tử và chữ ký số",
        leftLabel: "Chữ ký điện tử",
        rightLabel: "Chữ ký số",
        rows: [
          {
            criterion: "Phạm vi",
            left: "Khái niệm bao quát nhiều phương thức ký điện tử.",
            right: "Một phương thức cụ thể thuộc chữ ký điện tử.",
          },
          {
            criterion: "Công nghệ",
            left: "Tùy giải pháp: thao tác chấp thuận, mã xác thực, sinh trắc học hoặc phương thức khác.",
            right: "Mật mã khóa công khai, khóa bí mật, khóa công khai và chứng thư số.",
          },
          {
            criterion: "Phát hiện sửa đổi",
            left: "Phụ thuộc thiết kế và bằng chứng của hệ thống.",
            right: "Chữ ký được gắn với dữ liệu nên có thể kiểm tra tính toàn vẹn bằng mật mã.",
          },
          {
            criterion: "Xác minh chủ thể",
            left: "Phụ thuộc quy trình xác thực và nhật ký giao dịch.",
            right: "Kết hợp chứng thư số, chuỗi tin cậy và cơ chế kiểm soát khóa.",
          },
          {
            criterion: "Bằng chứng thời gian",
            left: "Có thể dựa vào nhật ký của nền tảng.",
            right: "Có thể kèm dấu thời gian từ dịch vụ tin cậy độc lập.",
          },
          {
            criterion: "Ví dụ",
            left: "Xác nhận trên nền tảng, ký bằng bút cảm ứng, nhập mã xác thực.",
            right: "Ký PDF, XML hoặc CAdES bằng USB Token hay ký số từ xa.",
          },
        ],
      },
      {
        kind: "checklist",
        id: "cach-chon",
        title: "Nên chọn hình thức nào?",
        lead: "Hãy đánh giá giao dịch theo rủi ro và bằng chứng cần lưu, thay vì chỉ so sánh sự tiện lợi.",
        items: [
          {
            title: "Yêu cầu pháp luật hoặc đối tác",
            text: "Kiểm tra loại chữ ký, chứng thư và dịch vụ tin cậy được yêu cầu cho nghiệp vụ cụ thể.",
          },
          {
            title: "Mức độ cần xác minh danh tính",
            text: "Giao dịch giá trị cao hoặc có tranh chấp tiềm ẩn thường cần quy trình định danh và bằng chứng mạnh hơn.",
          },
          {
            title: "Khả năng phát hiện sửa đổi",
            text: "Xác định tài liệu có cần được bảo vệ và kiểm tra độc lập sau khi rời khỏi nền tảng hay không.",
          },
          {
            title: "Lưu trữ dài hạn",
            text: "Cân nhắc dấu thời gian, dữ liệu thu hồi và khả năng xác minh nhiều năm sau.",
          },
          {
            title: "Trải nghiệm người dùng",
            text: "Cân bằng mức bảo đảm với thiết bị, bước xác thực và khả năng hỗ trợ người ký.",
          },
        ],
      },
      {
        kind: "definitions",
        id: "nham-lan",
        title: "Ba nhầm lẫn phổ biến",
        items: [
          {
            title: "“Có hình chữ ký là đã ký số”",
            text: "Sai. Hình hiển thị không chứng minh bên trong tài liệu có chữ ký mật mã.",
          },
          {
            title: "“Có USB Token là mọi tài liệu đều đã ký”",
            text: "Sai. Thiết bị chỉ hỗ trợ kiểm soát khóa; chữ ký chỉ xuất hiện sau một thao tác ký thành công.",
          },
          {
            title: "“Phần mềm báo hợp lệ là đủ cho mọi mục đích”",
            text: "Sai. Còn phải xem đúng chủ thể, thẩm quyền, nội dung giao dịch và yêu cầu nghiệp vụ.",
          },
        ],
      },
    ],
    tool: {
      href: "/#cong-cu",
      label: "Xem một chữ ký số thực tế",
      title: "Bạn có tài liệu cần phân biệt?",
      text: "Công cụ sẽ cho biết file có chữ ký số có thể xác minh hay chỉ chứa nội dung hiển thị giống chữ ký.",
    },
    faq: [
      {
        question: "Ký bằng OTP có phải chữ ký số không?",
        answer:
          "Không nhất thiết. OTP có thể là một bước xác thực trong quy trình chữ ký điện tử hoặc ký số từ xa. Cần xem chữ ký cuối cùng có được tạo bằng khóa bí mật và gắn với chứng thư số hay không.",
      },
      {
        question: "Chữ ký scan có giá trị giống chữ ký số không?",
        answer:
          "Không thể mặc định giống nhau. Ảnh scan không cung cấp cơ chế xác minh mật mã, chứng thư và tính toàn vẹn. Giá trị sử dụng còn phụ thuộc loại giao dịch và bằng chứng đi kèm.",
      },
      {
        question: "Chữ ký số từ xa có khác USB Token về kết quả không?",
        answer:
          "Cách bảo vệ và sử dụng khóa khác nhau. Cả hai đều có thể tạo chữ ký số; cần đánh giá dịch vụ, chứng thư, phương thức xác thực và kết quả kiểm tra cụ thể.",
      },
      {
        question: "Tài liệu ký số có cần nhìn thấy con dấu không?",
        answer:
          "Không nhất thiết. Phần hiển thị có thể hữu ích cho người đọc, nhưng dữ liệu chữ ký và chứng thư mới là phần được phần mềm xác minh.",
      },
    ],
    resources: [
      {
        publisher: "Cổng Thông tin điện tử Chính phủ",
        title: "Luật Giao dịch điện tử số 20/2023/QH15",
        description: "Nguồn pháp lý chính thức để tra cứu khái niệm và điều kiện liên quan.",
        href: "https://vanban.chinhphu.vn/?classid=1&docid=208421&pageid=27160&typegroupid=3",
      },
      {
        publisher: "NEAC",
        title: "Kiểm tra hiệu lực chữ ký số",
        description: "Ví dụ thực tế về các dữ liệu cần đọc trên PDF và XML đã ký.",
        href: "https://neac.gov.vn/vi/tin-tuc-su-kien/detail/thong-bao/huong-dan-kiem-tra-hieu-luc-chu-ky-so-tren-van-ban-dien-tu-702.htm",
      },
    ],
    sources: [
      {
        publisher: "Quốc hội",
        title: "Luật Giao dịch điện tử số 20/2023/QH15",
        href: "https://vanban.chinhphu.vn/?classid=1&docid=208421&pageid=27160&typegroupid=3",
      },
      {
        publisher: "Adobe",
        title: "About certificate signatures in Adobe Acrobat",
        href: "https://helpx.adobe.com/acrobat/kb/certificate-signatures.html",
      },
      {
        publisher: "Trung tâm Chứng thực điện tử quốc gia",
        title: "Hướng dẫn kiểm tra hiệu lực chữ ký số trên văn bản điện tử",
        href: "https://neac.gov.vn/vi/tin-tuc-su-kien/detail/thong-bao/huong-dan-kiem-tra-hieu-luc-chu-ky-so-tren-van-ban-dien-tu-702.htm",
      },
    ],
  },
  validInvoice: {
    slug: "cach-kiem-tra-hoa-don-dien-tu-hop-le",
    navLabel: "Kiểm tra hóa đơn điện tử hợp lệ",
    navDescription: "Checklist file XML, dữ liệu, trạng thái và chữ ký số.",
    breadcrumbLabel: "Kiểm tra hóa đơn điện tử hợp lệ",
    eyebrow: "Checklist cho người nhận hóa đơn",
    title: "Cách kiểm tra hóa đơn điện tử hợp lệ",
    description:
      "Hướng dẫn kiểm tra hóa đơn điện tử theo từng lớp: nguồn file XML, thông tin người bán, nội dung hóa đơn, trạng thái cơ quan thuế và chữ ký số.",
    intro:
      "Không nên kết luận hóa đơn hợp lệ chỉ vì nhìn đúng mẫu hoặc có hình con dấu. Cần đối chiếu dữ liệu gốc, trạng thái tra cứu và chữ ký số.",
    updatedAt: "30/07/2026",
    updatedAtIso: "2026-07-30",
    readingTime: "9 phút đọc",
    image: {
      src: "/images/guide-electronic-invoice.jpg",
      width: 1536,
      height: 1024,
      alt: "Nhân viên kế toán đang kiểm tra dữ liệu và chữ ký trên hóa đơn điện tử",
      caption:
        "Ảnh minh họa được tạo riêng cho bài viết, không phải giao diện của cơ quan thuế.",
    },
    answer: {
      title: "Cần kiểm tra ít nhất bốn lớp",
      text: "Lấy đúng file XML gốc; đối chiếu người bán, người mua, hàng hóa, tiền và thuế; tra cứu trạng thái hóa đơn trên hệ thống phù hợp; sau đó kiểm tra chữ ký số, chứng thư và tính toàn vẹn. Một lớp đạt không tự chứng minh toàn bộ hóa đơn đáp ứng mọi điều kiện nghiệp vụ và pháp lý.",
    },
    takeaways: [
      {
        title: "Ưu tiên file XML gốc",
        text: "PDF thường là bản thể hiện để đọc, còn XML mới chứa dữ liệu có cấu trúc và chữ ký cần kiểm tra.",
      },
      {
        title: "Tra cứu trạng thái riêng",
        text: "Kết quả chữ ký số không thay thế việc tra cứu mã và trạng thái hóa đơn với cơ quan thuế.",
      },
      {
        title: "Đối chiếu nghiệp vụ",
        text: "Tên hàng, số lượng, đơn giá, thuế và bên giao dịch phải khớp với hồ sơ thực tế.",
      },
    ],
    blocks: [
      {
        kind: "steps",
        id: "quy-trinh",
        title: "Quy trình kiểm tra hóa đơn điện tử",
        steps: [
          {
            title: "Nhận file gốc",
            text: "Lưu file XML từ kênh chính thức của bên bán hoặc nhà cung cấp hóa đơn, không chỉ lưu ảnh hoặc PDF.",
          },
          {
            title: "Đọc thông tin nhận diện",
            text: "Kiểm tra ký hiệu mẫu, ký hiệu hóa đơn, số hóa đơn, ngày lập và mã của cơ quan thuế nếu có.",
          },
          {
            title: "Đối chiếu giao dịch",
            text: "So khớp người bán, người mua, hàng hóa, số lượng, đơn giá, thuế suất và tổng thanh toán.",
          },
          {
            title: "Tra cứu trạng thái",
            text: "Dùng cổng hóa đơn điện tử hoặc kênh tra cứu chính thức để kiểm tra thông tin và trạng thái hiện tại.",
          },
          {
            title: "Kiểm tra chữ ký số",
            text: "Xác minh file XML không bị thay đổi, chủ thể ký, chứng thư, chuỗi CA và trạng thái thu hồi.",
          },
          {
            title: "Lưu bằng chứng",
            text: "Lưu XML, bản thể hiện và kết quả tra cứu theo quy trình kế toán, thuế và lưu trữ của đơn vị.",
          },
        ],
      },
      {
        kind: "checklist",
        id: "checklist",
        title: "Checklist thông tin cần đối chiếu",
        lead: "Danh sách này giúp phát hiện sai lệch phổ biến trước khi đưa hóa đơn vào quy trình hạch toán.",
        items: [
          {
            title: "Người bán",
            text: "Tên, mã số thuế và địa chỉ phải phù hợp với đối tác và thông tin đăng ký có thể tra cứu.",
          },
          {
            title: "Người mua",
            text: "Tên đơn vị, mã số thuế, địa chỉ và thông tin bắt buộc phải đúng với hồ sơ của bên nhận.",
          },
          {
            title: "Thông tin hóa đơn",
            text: "Đối chiếu mẫu, ký hiệu, số, ngày lập, loại hóa đơn và mã cơ quan thuế khi thuộc trường hợp có mã.",
          },
          {
            title: "Hàng hóa, dịch vụ",
            text: "So khớp tên hàng, đơn vị tính, số lượng, đơn giá và thành tiền với hợp đồng, đơn hàng hoặc biên bản.",
          },
          {
            title: "Thuế và thanh toán",
            text: "Kiểm tra thuế suất, tiền thuế, chiết khấu, phí và tổng tiền bằng số liệu nghiệp vụ.",
          },
          {
            title: "Điều chỉnh hoặc thay thế",
            text: "Xác định hóa đơn có liên quan tới hóa đơn bị điều chỉnh, thay thế hoặc trạng thái xử lý khác hay không.",
          },
        ],
      },
      {
        kind: "definitions",
        id: "file-xml-va-pdf",
        title: "XML và PDF có vai trò khác nhau",
        items: [
          {
            title: "File XML",
            text: "Chứa dữ liệu có cấu trúc để hệ thống đọc, đối chiếu và thường là nơi chứa chữ ký số của hóa đơn.",
          },
          {
            title: "Bản thể hiện PDF",
            text: "Giúp con người đọc và in thuận tiện nhưng có thể không phải dữ liệu gốc dùng để kiểm tra chữ ký.",
          },
          {
            title: "Email hoặc đường dẫn tải",
            text: "Là kênh chuyển giao. Cần xác nhận tên miền, người gửi và tránh tải file từ liên kết đáng ngờ.",
          },
          {
            title: "Kết quả tra cứu",
            text: "Cho biết thông tin và trạng thái trên hệ thống tra cứu tại thời điểm thực hiện, nên được lưu cùng hồ sơ khi cần.",
          },
        ],
      },
      {
        kind: "checklist",
        id: "chu-ky-so",
        title: "Đọc kết quả chữ ký số trên hóa đơn XML",
        items: [
          {
            title: "Tính toàn vẹn đạt",
            text: "Dữ liệu được chữ ký bảo vệ không bị thay đổi so với thời điểm ký.",
          },
          {
            title: "Đúng chủ thể ký",
            text: "Thông tin trên chứng thư cần phù hợp với bên có trách nhiệm ký theo cấu trúc hóa đơn.",
          },
          {
            title: "Chứng thư và chuỗi CA",
            text: "Xem thời hạn, đơn vị cấp, chuỗi tin cậy và chính sách áp dụng tại thời điểm kiểm tra.",
          },
          {
            title: "OCSP và CRL",
            text: "Kiểm tra chứng thư có bị ghi nhận thu hồi hoặc chưa lấy được dữ liệu trạng thái.",
          },
          {
            title: "Dấu thời gian",
            text: "Nếu không có, kết quả nên hiển thị “Không”; cần phân biệt với trường hợp dữ liệu xác minh bị lỗi.",
          },
        ],
      },
      {
        kind: "callout",
        id: "gioi-han-ket-luan",
        title: "Chữ ký số hợp lệ chưa đủ để kết luận toàn bộ hóa đơn hợp lệ",
        text:
          "Kiểm tra chữ ký chỉ xác minh lớp kỹ thuật của dữ liệu đã ký. Điều kiện lập hóa đơn, thời điểm, nội dung nghiệp vụ, trạng thái điều chỉnh/thay thế và điều kiện thuế phải được đánh giá theo quy định hiện hành và hồ sơ thực tế.",
        tone: "warning",
      },
    ],
    tool: {
      href: "/kiem-tra-hoa-don-dien-tu-xml#cong-cu",
      label: "Kiểm tra chữ ký trong XML",
      title: "Đã có file XML gốc?",
      text: "Tải file lên để xem chữ ký, chủ thể, chứng thư, tính toàn vẹn, OCSP/CRL và dấu thời gian.",
    },
    faq: [
      {
        question: "Chỉ có bản PDF thì kiểm tra hóa đơn được không?",
        answer:
          "Bạn có thể đối chiếu thông tin hiển thị, nhưng nên yêu cầu file XML gốc để kiểm tra dữ liệu có cấu trúc và chữ ký số. PDF thường chỉ là bản thể hiện.",
      },
      {
        question: "Hóa đơn có mã cơ quan thuế thì chắc chắn hợp lệ không?",
        answer:
          "Không nên kết luận chỉ từ việc nhìn thấy một chuỗi mã trên bản thể hiện. Cần tra cứu bằng kênh chính thức, đối chiếu nội dung và kiểm tra trạng thái hiện tại.",
      },
      {
        question: "Chữ ký số hợp lệ có nghĩa được khấu trừ thuế không?",
        answer:
          "Không. Chữ ký hợp lệ là một yếu tố kỹ thuật. Điều kiện khấu trừ còn phụ thuộc quy định thuế, nội dung giao dịch, chứng từ thanh toán và hồ sơ liên quan.",
      },
      {
        question: "Có nên mở file XML bằng trình soạn thảo để tự xem không?",
        answer:
          "Có thể xem dữ liệu, nhưng không nên chỉnh sửa rồi lưu lại vì điều đó có thể làm chữ ký không còn khớp. Dùng công cụ chỉ đọc hoặc giữ nguyên một bản gốc.",
      },
    ],
    resources: [
      {
        publisher: "Cục Thuế",
        title: "Cổng thông tin hóa đơn điện tử",
        description: "Kênh chính thức để đăng nhập và tra cứu thông tin hóa đơn điện tử.",
        href: "https://hoadondientu.gdt.gov.vn/",
      },
      {
        publisher: "Cục Thuế",
        title: "Tra cứu thông tin người nộp thuế",
        description: "Đối chiếu mã số thuế và thông tin đăng ký của tổ chức, cá nhân.",
        href: "https://tracuunnt.gdt.gov.vn/tcnnt/mstdn.jsp",
      },
      {
        publisher: "Cổng Thông tin điện tử Chính phủ",
        title: "Nghị định 70/2025/NĐ-CP",
        description: "Văn bản sửa đổi quy định về hóa đơn, chứng từ, có hiệu lực từ 01/06/2025.",
        href: "https://vanban.chinhphu.vn/?docid=213179&pageid=27160",
      },
    ],
    sources: [
      {
        publisher: "Chính phủ",
        title: "Nghị định 123/2020/NĐ-CP quy định về hóa đơn, chứng từ",
        href: "https://vanban.chinhphu.vn/?docid=201365&lang=vi&pageid=27160",
      },
      {
        publisher: "Chính phủ",
        title: "Nghị định 70/2025/NĐ-CP sửa đổi Nghị định 123/2020/NĐ-CP",
        href: "https://vanban.chinhphu.vn/?docid=213179&pageid=27160",
      },
      {
        publisher: "Bộ Tài chính",
        title: "Thông tư 32/2025/TT-BTC hướng dẫn về hóa đơn, chứng từ",
        href: "https://vanban.chinhphu.vn/?classid=0&docid=213855&pageid=27160",
      },
      {
        publisher: "Trung tâm Chứng thực điện tử quốc gia",
        title: "Hướng dẫn kiểm tra hiệu lực chữ ký số trên văn bản điện tử",
        href: "https://neac.gov.vn/vi/tin-tuc-su-kien/detail/thong-bao/huong-dan-kiem-tra-hieu-luc-chu-ky-so-tren-van-ban-dien-tu-702.htm",
      },
    ],
  },
} as const satisfies Record<string, GuidePageContent>;

export const guideList = Object.values(guides);

export function createGuideMetadata(page: GuidePageContent): Metadata {
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
      type: "article",
      locale: "vi_VN",
      url: canonicalPath,
      siteName: SITE_NAME,
      publishedTime: page.updatedAtIso,
      modifiedTime: page.updatedAtIso,
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

export function createGuideStructuredData(page: GuidePageContent) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      description: page.description,
      image: `${SITE_URL}${page.image.src}`,
      datePublished: page.updatedAtIso,
      dateModified: page.updatedAtIso,
      inLanguage: "vi-VN",
      mainEntityOfPage: `${SITE_URL}/${page.slug}`,
      author: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.breadcrumbLabel,
          item: `${SITE_URL}/${page.slug}`,
        },
      ],
    },
  ];
}
