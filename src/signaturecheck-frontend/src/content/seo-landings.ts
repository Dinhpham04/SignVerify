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
  deepDive: {
    eyebrow: string;
    title: string;
    intro: string;
    sections: ReadonlyArray<{
      title: string;
      paragraphs: ReadonlyArray<string>;
      points?: ReadonlyArray<{
        title: string;
        text: string;
      }>;
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
    deepDive: {
      eyebrow: "Hiểu sâu hơn về PDF đã ký",
      title: "Những điểm cần đọc trước khi kết luận chữ ký PDF",
      intro:
        "PDF có thể chứa nhiều lần sửa đổi, nhiều chữ ký và cả phần hiển thị không liên quan tới dữ liệu mật mã. Vì vậy, kết quả đáng tin cậy phải được đọc theo từng chữ ký thay vì chỉ nhìn con dấu trên trang hoặc một dòng kết luận chung.",
      sections: [
        {
          title: "Chữ ký nhìn thấy và chữ ký mật mã",
          paragraphs: [
            "Khung chữ ký, hình con dấu, tên người ký hoặc ngày giờ hiển thị trên trang chỉ là phần trình bày. Chúng giúp người đọc nhận biết vị trí ký nhưng có thể được tạo như một hình ảnh thông thường. Phần có thể xác minh nằm trong cấu trúc PDF: giá trị băm của dữ liệu đã ký, giá trị chữ ký và chứng thư chứa khóa công khai của người ký.",
            "Một chữ ký cũng có thể hoàn toàn không hiển thị trên trang. Ngược lại, PDF có hình chữ ký đẹp vẫn có thể không chứa chữ ký số. Do đó, bước đầu tiên luôn là kiểm tra xem bộ xác minh có thực sự phát hiện chữ ký mật mã hay không, sau đó mới đọc người ký và trạng thái chứng thư.",
          ],
          points: [
            {
              title: "Có hình nhưng không có chữ ký số",
              text: "Coi hình ảnh là nội dung tài liệu; không dùng nó để xác nhận danh tính hoặc tính toàn vẹn.",
            },
            {
              title: "Có chữ ký nhưng không thấy con dấu",
              text: "Mở chi tiết chữ ký. Chữ ký ẩn vẫn có thể được xác minh bình thường nếu cấu trúc hợp lệ.",
            },
          ],
        },
        {
          title: "Nhiều chữ ký và các lần sửa đổi",
          paragraphs: [
            "PDF hỗ trợ cập nhật tăng dần: dữ liệu mới có thể được nối thêm mà không ghi đè toàn bộ phiên bản trước. Cơ chế này cho phép nhiều người ký lần lượt, điền biểu mẫu hoặc bổ sung chú thích theo quyền mà chữ ký chứng nhận cho phép. Vì vậy, một tài liệu có thay đổi sau chữ ký đầu tiên chưa chắc đã bị giả mạo; cần biết thay đổi đó có thuộc phạm vi được phép và chữ ký sau có bảo vệ phiên bản mới hay không.",
            "Công cụ liệt kê từng chữ ký riêng. Với quy trình nhiều bên, hãy kiểm tra đủ số người cần ký, thứ tự ký, trạng thái từng chữ ký và nội dung cuối cùng. Một chữ ký hợp lệ không làm cho các chữ ký còn lại tự động hợp lệ, cũng không chứng minh tài liệu đã hoàn tất quy trình phê duyệt của đơn vị.",
          ],
          points: [
            {
              title: "Chữ ký phê duyệt",
              text: "Thể hiện một lần ký trên phiên bản cụ thể; tài liệu vẫn có thể nhận thêm chữ ký sau đó.",
            },
            {
              title: "Chữ ký chứng nhận",
              text: "Có thể quy định loại thay đổi được phép sau khi chứng nhận, như điền biểu mẫu hoặc thêm chữ ký.",
            },
            {
              title: "Phiên bản cuối",
              text: "Đối chiếu nội dung bạn đang đọc với phiên bản được chữ ký cuối cùng bảo vệ.",
            },
            {
              title: "Chữ ký lỗi trong chuỗi",
              text: "Không bỏ qua một chữ ký thất bại chỉ vì tài liệu còn một chữ ký khác đạt.",
            },
          ],
        },
        {
          title: "Thời gian, hết hạn và lỗi xác minh",
          paragraphs: [
            "Thời gian ký do ứng dụng ký ghi lại có thể dựa trên đồng hồ của thiết bị. Dấu thời gian do một dịch vụ độc lập phát hành cung cấp bằng chứng thời gian mạnh hơn, nhưng bản thân dấu thời gian cũng cần có chữ ký, chứng thư và chuỗi tin cậy hợp lệ. Khi chứng thư người ký hiện đã hết hạn, dấu thời gian và dữ liệu thu hồi được lưu cùng tài liệu có thể rất quan trọng để đánh giá trạng thái tại lúc ký.",
            "Nếu kết quả là “chưa đủ dữ liệu”, hãy đọc bước nào chưa hoàn thành. Nguyên nhân thường gặp gồm không dựng được chuỗi CA, không truy cập được OCSP/CRL, thiếu chứng thư trung gian hoặc không xác minh được dấu thời gian. Đây là trạng thái cần bổ sung dữ liệu hoặc kiểm tra lại, không nên tự đổi thành “hợp lệ” chỉ vì nội dung PDF vẫn mở được.",
          ],
          points: [
            {
              title: "Không có chữ ký",
              text: "Yêu cầu bên gửi cung cấp đúng PDF gốc đã ký, không phải bản in, ảnh quét hoặc bản xuất lại.",
            },
            {
              title: "Không hợp lệ",
              text: "Giữ nguyên tệp, không lưu đè và đối chiếu lại nguồn nhận; nội dung được bảo vệ có thể đã thay đổi.",
            },
            {
              title: "Chưa đủ dữ liệu",
              text: "Thử lại khi mạng ổn định và kiểm tra chi tiết chuỗi chứng thư, OCSP, CRL hoặc dấu thời gian.",
            },
            {
              title: "Hợp lệ",
              text: "Tiếp tục đối chiếu danh tính, thẩm quyền ký và nội dung nghiệp vụ trước khi sử dụng tài liệu.",
            },
          ],
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
      {
        label: "Hướng dẫn xác minh chữ ký số trong Adobe Acrobat",
        href: "https://helpx.adobe.com/acrobat/desktop/e-sign-documents/manage-digital-signatures/validate-digital-sign.html",
      },
      {
        label: "Tài liệu xác minh PAdES của Digital Signature Service",
        href: "https://ec.europa.eu/digital-building-blocks/DSS/webapp-demo/doc/dss-documentation.html",
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
    deepDive: {
      eyebrow: "Hiểu sâu hơn về XML đã ký",
      title: "Vì sao file XML mở được nhưng chữ ký vẫn có thể lỗi?",
      intro:
        "XML là dữ liệu có cấu trúc, còn XML Signature bảo vệ những phần dữ liệu được tham chiếu theo quy tắc cụ thể. Việc trình duyệt hoặc phần mềm kế toán đọc được tệp chỉ chứng minh cú pháp đủ để mở, không chứng minh chữ ký và nội dung nghiệp vụ đã hợp lệ.",
      sections: [
        {
          title: "Tham chiếu, biến đổi và chuẩn hóa XML",
          paragraphs: [
            "Một chữ ký XML chứa một hoặc nhiều Reference chỉ tới dữ liệu cần bảo vệ. Trước khi tính giá trị băm, dữ liệu có thể đi qua các phép biến đổi và bước chuẩn hóa XML. Bộ xác minh phải thực hiện lại đúng chuỗi xử lý này rồi so sánh DigestValue; sau đó mới xác minh SignatureValue trên SignedInfo bằng khóa công khai trong chứng thư.",
            "Do XML có nhiều cách biểu diễn tương đương về mặt cú pháp, việc tự mở rồi lưu lại bằng trình soạn thảo có thể đổi namespace, encoding, khoảng trắng hoặc thứ tự khai báo. Một thay đổi tưởng như chỉ để “làm đẹp” vẫn có thể làm giá trị băm không còn khớp. Nên giữ nguyên file gốc nhận từ bên phát hành và thao tác trên một bản sao khi cần xem nội dung.",
          ],
          points: [
            {
              title: "Reference",
              text: "Cho biết đối tượng nào được chữ ký bảo vệ; không mặc định mọi byte trong tệp đều nằm trong cùng phạm vi ký.",
            },
            {
              title: "DigestValue",
              text: "Giá trị băm của dữ liệu sau khi áp dụng biến đổi; sai khác cho thấy dữ liệu tham chiếu không còn khớp.",
            },
            {
              title: "SignedInfo",
              text: "Tập hợp thuật toán và tham chiếu được chuẩn hóa trước khi xác minh giá trị chữ ký.",
            },
            {
              title: "KeyInfo và chứng thư",
              text: "Cung cấp khóa hoặc chứng thư hỗ trợ xác minh, nhưng vẫn cần chuỗi CA và chính sách tin cậy riêng.",
            },
          ],
        },
        {
          title: "XML hóa đơn và kết luận nghiệp vụ",
          paragraphs: [
            "Với hóa đơn điện tử, chữ ký số là một lớp xác minh trong toàn bộ hồ sơ. Sau khi chữ ký đạt, người nhận vẫn cần đối chiếu tên và mã số thuế của người bán, thông tin người mua, số hóa đơn, ngày lập, hàng hóa, thuế suất, tổng tiền và liên hệ với giao dịch thực tế. Chủ thể trên chứng thư cũng cần phù hợp với vai trò ký trong cấu trúc hóa đơn.",
            "Trạng thái chữ ký không thay thế việc tra cứu hóa đơn trên kênh của cơ quan thuế. Mã cơ quan thuế được hiển thị trong tệp hoặc bản thể hiện cũng không nên được kiểm tra bằng mắt; cần dùng cổng tra cứu phù hợp để xác nhận trạng thái hiện tại, hóa đơn điều chỉnh, thay thế hoặc bị xử lý sau khi phát hành.",
          ],
          points: [
            {
              title: "Bước 1: file gốc",
              text: "Lấy XML từ kênh chính thức của bên bán hoặc nhà cung cấp hóa đơn, không dùng XML được sao chép từ nội dung email.",
            },
            {
              title: "Bước 2: chữ ký",
              text: "Kiểm tra tính toàn vẹn, chủ thể, đơn vị cấp, chuỗi chứng thư và trạng thái thu hồi.",
            },
            {
              title: "Bước 3: tra cứu",
              text: "Đối chiếu mã và trạng thái trên cổng hóa đơn điện tử hoặc kênh chính thức được áp dụng.",
            },
            {
              title: "Bước 4: nghiệp vụ",
              text: "So khớp toàn bộ nội dung với hợp đồng, đơn hàng, biên bản, giao nhận và chứng từ thanh toán.",
            },
          ],
        },
        {
          title: "Xử lý các lỗi XML thường gặp",
          paragraphs: [
            "Nếu công cụ báo không có chữ ký, tệp có thể chỉ là XML dữ liệu, chữ ký nằm ở tệp khác hoặc cấu trúc sử dụng profile chưa được hỗ trợ. Nếu báo không hợp lệ sau khi bạn đã mở và lưu tệp, hãy lấy lại bản gốc từ nguồn phát hành để loại trừ thay đổi do phần mềm chỉnh sửa.",
            "Trường hợp chữ ký tách rời hoặc Reference trỏ tới tài nguyên ngoài tệp cần đúng dữ liệu nguồn để xác minh. Công cụ hiện nhận một tệp mỗi lần, vì vậy không thể tự suy đoán tài liệu ngoài bị thiếu. Tương tự, lỗi schema nghiệp vụ và lỗi chữ ký là hai nhóm khác nhau: XML có chữ ký hợp lệ vẫn có thể thiếu trường bắt buộc, còn XML đúng schema vẫn có thể chưa được ký.",
          ],
          points: [
            {
              title: "XML sai cú pháp",
              text: "Yêu cầu lại tệp gốc; bộ xác minh không thể phân tích ổn định một tài liệu đã hỏng cấu trúc.",
            },
            {
              title: "Sai tính toàn vẹn",
              text: "Không chỉnh sửa tiếp. Đối chiếu checksum hoặc tải lại từ kênh gửi ban đầu.",
            },
            {
              title: "Thiếu dữ liệu tham chiếu",
              text: "Xác định chữ ký có tách rời và cần thêm tài liệu gốc hay không.",
            },
            {
              title: "Chưa xác minh được CA",
              text: "Đọc chuỗi chứng thư và trạng thái OCSP/CRL; không coi đây là bằng chứng hóa đơn hợp lệ.",
            },
          ],
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
      {
        label: "Tài liệu xác minh XAdES của Digital Signature Service",
        href: "https://ec.europa.eu/digital-building-blocks/DSS/webapp-demo/doc/dss-documentation.html",
      },
      {
        label: "Cổng thông tin hóa đơn điện tử của Cục Thuế",
        href: "https://hoadondientu.gdt.gov.vn/",
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
    deepDive: {
      eyebrow: "Hiểu sâu hơn về CMS/CAdES",
      title: "P7S, P7M và mối quan hệ với tài liệu gốc",
      intro:
        "P7S và P7M là cách đặt tên tệp thường gặp cho dữ liệu dựa trên CMS/CAdES. Phần mở rộng giúp phần mềm chọn bộ đọc, nhưng cấu trúc bên trong mới quyết định nội dung có được đóng gói cùng chữ ký hay nằm ở một tệp tách rời.",
      sections: [
        {
          title: "Attached và detached khác nhau ở đâu?",
          paragraphs: [
            "Trong CMS SignedData, nội dung có thể nằm trong trường eContent hoặc được để bên ngoài. Khi nội dung được đóng gói, bộ xác minh có đủ dữ liệu để tính lại giá trị băm từ chính container. Khi chữ ký ở dạng detached, container chỉ mang thông tin người ký, thuật toán, giá trị băm, giá trị chữ ký và có thể kèm chứng thư; tài liệu gốc phải được cung cấp riêng.",
            "Tên .p7m thường được dùng cho gói có nội dung, còn .p7s thường gặp ở chữ ký tách rời, nhưng đây không phải quy tắc có thể tin tuyệt đối. Không nên đổi đuôi file để chuyển đổi giữa hai dạng. Phần mềm phải đọc ContentInfo và SignedData để biết chính xác nội dung có hiện diện hay không.",
          ],
          points: [
            {
              title: "Nội dung đóng gói",
              text: "Dữ liệu gốc và chữ ký cùng nằm trong container; vẫn cần phần mềm phù hợp để đọc và xác minh.",
            },
            {
              title: "Chữ ký tách rời",
              text: "Cần đúng tài liệu gốc theo từng byte. Một bản có cùng tên nhưng đã lưu lại không đủ để đối chiếu.",
            },
            {
              title: "Nhiều người ký",
              text: "Một SignedData có thể chứa nhiều SignerInfo; từng chữ ký cần được đánh giá riêng.",
            },
            {
              title: "Chứng thư đi kèm",
              text: "Container có thể mang chứng thư hỗ trợ dựng chuỗi, nhưng chứng thư đi kèm không mặc nhiên là neo tin cậy.",
            },
          ],
        },
        {
          title: "Cách ghép đúng P7S với file gốc",
          paragraphs: [
            "Với chữ ký detached, bộ xác minh tính giá trị băm từ tài liệu bạn cung cấp và so sánh với message-digest trong chữ ký. Chỉ một thay đổi nhỏ như đổi encoding, thêm ký tự xuống dòng, xuất lại PDF hoặc chỉnh metadata cũng có thể tạo giá trị băm khác. Vì vậy, “nội dung nhìn giống nhau” không có nghĩa hai file giống nhau về mặt mật mã.",
            "Khi nhận hồ sơ gồm nhiều file, hãy giữ nguyên tên, kích thước và cấu trúc thư mục ban đầu. Nếu có checksum do bên gửi công bố, đối chiếu trước khi xác minh. Công cụ hiện nhận một tệp mỗi lần nên có thể đọc P7S/P7M có nội dung đóng gói, nhưng không thể tự ghép một P7S detached với file gốc nằm ngoài request.",
          ],
          points: [
            {
              title: "Tìm cặp theo nguồn gửi",
              text: "Lấy P7S và tài liệu từ cùng một gói hoặc cùng lần phát hành, không ghép từ hai email khác nhau.",
            },
            {
              title: "Không mở rồi lưu đè",
              text: "Giữ một bản nguyên trạng vì phần mềm văn phòng có thể thay đổi byte dù nội dung hiển thị không đổi.",
            },
            {
              title: "Đối chiếu checksum",
              text: "Nếu có SHA-256 hoặc mã kiểm tra chính thức, dùng nó để xác nhận tệp chưa bị thay thế khi chuyển giao.",
            },
            {
              title: "Yêu cầu lại trọn bộ",
              text: "Khi thiếu tài liệu gốc, bên ký hoặc hệ thống phát hành là nguồn phù hợp để cung cấp lại đúng gói.",
            },
          ],
        },
        {
          title: "Đọc lỗi và thuộc tính CAdES",
          paragraphs: [
            "CMS có thể chứa signing-time, countersignature, chứng thư và dữ liệu thu hồi, còn CAdES bổ sung các thuộc tính phục vụ hồ sơ chữ ký nâng cao. Không phải container nào cũng có đủ dấu thời gian hoặc bằng chứng dài hạn. Thuộc tính signing-time do người ký khai báo không có mức đảm bảo giống token dấu thời gian do dịch vụ độc lập ký.",
            "Nếu file không hỗ trợ, nguyên nhân có thể là nội dung không phải CMS SignedData, tệp bị cắt hỏng, dùng encoding không được nhận diện hoặc thực tế là dữ liệu mã hóa thay vì dữ liệu đã ký. Nếu thiếu tài liệu gốc, đó không phải bằng chứng chữ ký sai; nó cho biết chưa có đủ đầu vào để tính lại giá trị băm.",
          ],
          points: [
            {
              title: "Thiếu tài liệu gốc",
              text: "Tìm đúng file đi kèm hoặc dùng phần mềm hỗ trợ nạp đồng thời chữ ký detached và tài liệu nguồn.",
            },
            {
              title: "Sai giá trị băm",
              text: "Tài liệu cung cấp không phải bản đã ký hoặc đã thay đổi sau khi chữ ký được tạo.",
            },
            {
              title: "Không dựng được chuỗi",
              text: "Kiểm tra chứng thư trung gian, neo tin cậy và trạng thái thu hồi thay vì chỉ xem tên người ký.",
            },
            {
              title: "Không có dấu thời gian",
              text: "Hiểu là chữ ký không chứa bằng chứng thời gian độc lập được phát hiện, không phải hệ thống bỏ qua kiểm tra.",
            },
          ],
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
    deepDive: {
      eyebrow: "Hiểu sâu hơn về chứng thư X.509",
      title: "Đọc chứng thư số theo đúng ngữ cảnh của chữ ký",
      intro:
        "Chứng thư liên kết một khóa công khai với thông tin chủ thể trong một khoảng thời gian và dưới sự xác nhận của đơn vị cấp. Không trường dữ liệu riêng lẻ nào đủ để kết luận toàn bộ chữ ký đáng tin cậy.",
      sections: [
        {
          title: "Chủ thể, đơn vị cấp và số serial",
          paragraphs: [
            "Subject mô tả chủ thể được cấp chứng thư; Issuer mô tả CA đã ký chứng thư đó. Các tên này thường được mã hóa dưới dạng Distinguished Name với nhiều thuộc tính như common name, organization, organizational unit và country. Giao diện rút gọn các thuộc tính quan trọng để dễ đọc, nhưng khi cần đối chiếu chính xác vẫn phải xem toàn bộ giá trị chủ thể.",
            "Số serial chỉ duy nhất trong phạm vi một đơn vị cấp, vì vậy cần đọc serial cùng Issuer. Serial hữu ích khi đối chiếu hồ sơ cấp phát, phản hồi OCSP hoặc CRL. Nó không phải mã số thuế, số định danh cá nhân hay bằng chứng rằng người đang sử dụng khóa có thẩm quyền ký giao dịch cụ thể.",
          ],
          points: [
            {
              title: "Tên chủ thể",
              text: "Đối chiếu với người hoặc tổ chức dự kiến ký; chú ý cách CA mã hóa tên và đơn vị trong chứng thư.",
            },
            {
              title: "Đơn vị cấp",
              text: "Xác định CA phát hành và kiểm tra đường dẫn từ CA đó tới neo tin cậy được cấu hình.",
            },
            {
              title: "Serial",
              text: "Dùng cùng tên đơn vị cấp để phân biệt chứng thư và tra cứu trạng thái, không dùng như danh tính độc lập.",
            },
            {
              title: "Thuộc tính mở rộng",
              text: "Mục đích sử dụng khóa, chính sách chứng thư và các extension có thể giới hạn cách chứng thư được sử dụng.",
            },
          ],
        },
        {
          title: "Thời hạn chứng thư và thời điểm ký",
          paragraphs: [
            "Hai mốc Not Before và Not After xác định khoảng hiệu lực của chứng thư, không phải khoảng tồn tại của tài liệu. Một chứng thư còn hạn hôm nay vẫn có thể đã bị thu hồi. Ngược lại, chứng thư đã hết hạn hôm nay không tự động làm mọi chữ ký được tạo trong quá khứ trở thành sai.",
            "Để đánh giá chữ ký quá khứ, bộ xác minh cần biết thời điểm đáng tin cậy mà chữ ký đã tồn tại, trạng thái thu hồi tại thời điểm phù hợp và chuỗi chứng thư khi đó. Thuộc tính thời gian do máy người ký ghi lại có thể bị điều chỉnh; dấu thời gian được một dịch vụ độc lập ký cung cấp bằng chứng mạnh hơn, nhưng cũng phải được xác minh như một token có chứng thư riêng.",
          ],
          points: [
            {
              title: "Còn hạn",
              text: "Chỉ cho biết thời điểm hiện tại nằm trong khoảng hiệu lực; vẫn cần kiểm tra thu hồi và mục đích sử dụng khóa.",
            },
            {
              title: "Đã hết hạn",
              text: "Xem thời điểm ký, dấu thời gian và bằng chứng dài hạn trước khi kết luận chữ ký lịch sử.",
            },
            {
              title: "Chưa có hiệu lực",
              text: "Nếu chữ ký được tạo trước Not Before và không có bằng chứng khác, đây là dấu hiệu cần điều tra.",
            },
            {
              title: "Không có dấu thời gian",
              text: "Hiểu là không phát hiện bằng chứng thời gian độc lập; thời gian ký hiển thị có thể chỉ là giá trị được khai báo.",
            },
          ],
        },
        {
          title: "Chuỗi tin cậy, OCSP và CRL",
          paragraphs: [
            "Chứng thư người ký thường do một CA trung gian cấp. Bộ xác minh dựng đường dẫn qua các chứng thư trung gian tới một root CA được cấu hình làm neo tin cậy, đồng thời kiểm tra chữ ký trên từng chứng thư, thời hạn, ràng buộc CA và mục đích sử dụng. Chứng thư được nhúng trong tài liệu có thể giúp hoàn thiện đường dẫn nhưng không tự biến nó thành nguồn tin cậy.",
            "OCSP hỏi trạng thái một chứng thư cụ thể; CRL là danh sách thu hồi do CA công bố. Kết quả “good” hoặc “không ghi nhận thu hồi” chỉ có ý nghĩa trong phạm vi phản hồi và thời điểm của nguồn đó. Nếu nguồn không truy cập được hoặc dữ liệu quá cũ, trạng thái đúng là chưa xác định, không phải mặc định chứng thư an toàn.",
          ],
          points: [
            {
              title: "Chuỗi đạt",
              text: "Có đường dẫn hợp lệ tới neo tin cậy theo kho và chính sách hiện tại; vẫn cần đọc trạng thái thu hồi.",
            },
            {
              title: "Thiếu chứng thư trung gian",
              text: "Tài liệu hoặc kho bổ trợ chưa có đủ mắt xích để dựng đường dẫn; không nên tự tin cậy chứng thư lạ.",
            },
            {
              title: "Bị thu hồi",
              text: "CA đã công bố trạng thái thu hồi; cần xem thời điểm và lý do, đồng thời dừng dùng kết quả như một chữ ký bình thường.",
            },
            {
              title: "Chưa kiểm tra được",
              text: "Thử lại khi nguồn trực tuyến sẵn sàng hoặc dùng hồ sơ có dữ liệu thu hồi được nhúng để đánh giá dài hạn.",
            },
          ],
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
      {
        label: "Hồ sơ chứng thư X.509 và CRL RFC 5280",
        href: "https://datatracker.ietf.org/doc/html/rfc5280",
      },
      {
        label: "Tài liệu xác minh chứng thư của Digital Signature Service",
        href: "https://ec.europa.eu/digital-building-blocks/DSS/webapp-demo/doc/dss-documentation.html",
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
