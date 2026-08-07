export type TrustPageKind = "about" | "privacy" | "terms";

export type TrustPageSource = {
  href: string;
  label: string;
  organization: string;
};

export type TrustPageSection = {
  id: string;
  title: string;
  paragraphs?: ReadonlyArray<string>;
  items?: ReadonlyArray<{
    title: string;
    text: string;
  }>;
  ordered?: boolean;
  note?: {
    title: string;
    text: string;
  };
};

export type TrustPageContent = {
  kind: TrustPageKind;
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  updatedAtIso: string;
  updatedAtLabel: string;
  highlights: ReadonlyArray<{
    title: string;
    text: string;
  }>;
  sections: ReadonlyArray<TrustPageSection>;
  sources: ReadonlyArray<TrustPageSource>;
};

const privacyPage: TrustPageContent = {
  kind: "privacy",
  slug: "chinh-sach-bao-mat",
  navLabel: "Chính sách bảo mật",
  eyebrow: "Quyền riêng tư và dữ liệu",
  title: "Chính sách bảo mật",
  description:
    "Chính sách bảo mật của công cụ Kiểm Tra Chữ Ký Số: dữ liệu được xử lý, cách tệp được kiểm tra, thời gian lưu giữ và quyền của người dùng.",
  intro:
    "Trang này giải thích một cách cụ thể dữ liệu nào được xử lý khi bạn truy cập website hoặc tải tài liệu lên kiểm tra, dữ liệu đi qua những thành phần nào và những giới hạn bảo mật bạn cần biết trước khi sử dụng.",
  updatedAtIso: "2026-08-07",
  updatedAtLabel: "07/08/2026",
  highlights: [
    {
      title: "Không tạo tài khoản",
      text: "Công cụ không yêu cầu tên, email, số điện thoại hoặc hồ sơ người dùng để kiểm tra tệp.",
    },
    {
      title: "Không xây kho lưu tệp",
      text: "Tài liệu được truyền tới bộ kiểm tra trong phiên xử lý và không được ghi vào cơ sở dữ liệu hoặc kho tài liệu của ứng dụng.",
    },
    {
      title: "Không theo dõi quảng cáo",
      text: "Website hiện không cài công cụ phân tích hành vi, mạng quảng cáo hoặc cookie tiếp thị của ứng dụng.",
    },
  ],
  sections: [
    {
      id: "pham-vi",
      title: "1. Phạm vi áp dụng",
      paragraphs: [
        "Chính sách này áp dụng cho website chukyso.automation.info.vn, API kiểm tra chữ ký được website gọi trực tiếp và các thành phần máy chủ do dự án cấu hình để tạo kết quả kiểm tra. Chính sách không thay thế chính sách riêng của đơn vị cấp chứng thư số, máy chủ OCSP/CRL, nhà cung cấp hạ tầng hoặc website bên ngoài mà bạn chủ động truy cập qua liên kết.",
        "Công cụ được thiết kế để kiểm tra tài liệu điện tử do người dùng chủ động chọn. Việc tải tệp lên đồng nghĩa bạn yêu cầu hệ thống xử lý tệp trong phạm vi cần thiết để trả về báo cáo kỹ thuật.",
      ],
    },
    {
      id: "du-lieu-xu-ly",
      title: "2. Những dữ liệu được xử lý",
      paragraphs: [
        "Mức dữ liệu thực tế phụ thuộc vào tệp và cách bạn sử dụng website. Một tài liệu có chữ ký số thường chứa thông tin trong nội dung tài liệu và thông tin công khai trong chứng thư số của người ký.",
      ],
      items: [
        {
          title: "Tệp bạn tải lên",
          text: "Nội dung PDF, XML, P7S hoặc P7M; tên tệp, kích thước và loại nội dung do trình duyệt gửi kèm. Giới hạn hiện tại là 25 MB mỗi lần kiểm tra.",
        },
        {
          title: "Dữ liệu chữ ký và chứng thư",
          text: "Tên chủ thể, tổ chức, đơn vị cấp, số sê-ri, thời hạn chứng thư, thời gian ký, dấu thời gian và dữ liệu kỹ thuật cần thiết để xác minh chữ ký. Một số chứng thư có thể chứa mã định danh hoặc thông tin cá nhân do đơn vị cấp chứng thư ghi vào.",
        },
        {
          title: "Dữ liệu kết nối",
          text: "Địa chỉ IP, thời điểm truy cập, đường dẫn, phương thức HTTP, mã phản hồi, thời gian xử lý, user-agent, referrer và mã request có thể xuất hiện trong log mạng, log máy chủ hoặc lớp bảo vệ hạ tầng.",
        },
        {
          title: "Dữ liệu phản hồi tự nguyện",
          text: "Nội dung bạn tự đăng khi báo lỗi qua GitHub Issues. Đây là kênh công khai; không đăng tệp cần kiểm tra, khóa bí mật, ảnh giấy tờ hoặc dữ liệu cá nhân tại đó.",
        },
      ],
    },
    {
      id: "luong-xu-ly",
      title: "3. Tệp được xử lý như thế nào",
      ordered: true,
      items: [
        {
          title: "Trình duyệt gửi tệp qua HTTPS",
          text: "Tệp chỉ được gửi sau khi bạn chọn và bắt đầu kiểm tra. Giao diện không tự quét các tệp khác trên thiết bị.",
        },
        {
          title: "API kiểm tra định dạng và giới hạn",
          text: "Lớp API kiểm tra kích thước, định dạng hỗ trợ và giới hạn tần suất theo địa chỉ kết nối trước khi chuyển luồng dữ liệu sang bộ xác minh.",
        },
        {
          title: "Bộ xác minh đọc dữ liệu chữ ký",
          text: "Tệp được đọc để phát hiện chữ ký, kiểm tra tính toàn vẹn, chữ ký mật mã, chứng thư, chuỗi tin cậy, OCSP/CRL và dấu thời gian nếu có.",
        },
        {
          title: "Báo cáo được trả về",
          text: "API trả dữ liệu kết quả cho trình duyệt. Ứng dụng không cung cấp chức năng mở lại tệp hoặc lịch sử kiểm tra sau khi phiên xử lý kết thúc.",
        },
      ],
      note: {
        title: "Lưu ý về bộ nhớ tạm",
        text: "Để xử lý một yêu cầu, framework và hệ điều hành có thể giữ dữ liệu trong bộ nhớ hoặc vùng tạm trong thời gian ngắn. Reverse proxy được cấu hình truyền luồng upload trực tiếp thay vì chủ động lưu toàn bộ request body xuống đĩa, nhưng không nên hiểu đây là cam kết rằng mọi bản sao tạm biến mất tức thì ở mọi lớp hạ tầng.",
      },
    },
    {
      id: "muc-dich",
      title: "4. Mục đích sử dụng dữ liệu",
      items: [
        {
          title: "Cung cấp kết quả kiểm tra",
          text: "Đọc và phân tích đúng tệp bạn gửi, sau đó hiển thị trạng thái chữ ký và các chi tiết chứng thư liên quan.",
        },
        {
          title: "Bảo vệ dịch vụ",
          text: "Giới hạn tần suất, phát hiện yêu cầu lỗi, ngăn lạm dụng, điều tra sự cố và duy trì tính sẵn sàng của hệ thống.",
        },
        {
          title: "Cải thiện độ ổn định",
          text: "Dùng số liệu vận hành tổng quát như mã lỗi, đường dẫn và thời gian phản hồi để chẩn đoán sự cố. Nội dung tài liệu không được chủ động ghi vào log ứng dụng cho mục đích này.",
        },
        {
          title: "Tuân thủ nghĩa vụ áp dụng",
          text: "Bảo toàn hoặc cung cấp thông tin khi có yêu cầu hợp lệ từ cơ quan có thẩm quyền và trong phạm vi pháp luật yêu cầu.",
        },
      ],
    },
    {
      id: "luu-giu",
      title: "5. Lưu giữ và xóa dữ liệu",
      paragraphs: [
        "Ứng dụng không có cơ sở dữ liệu, bucket hoặc thư mục nghiệp vụ dùng để lưu tài liệu người dùng tải lên. Tệp chỉ tồn tại trong luồng xử lý và các vùng tạm kỹ thuật cần thiết cho request; dự án không xây chức năng tìm kiếm, tải lại hoặc khai thác nội dung tệp sau đó.",
        "Thông tin phản hồi OCSP và CRL có thể được lưu trong bộ nhớ đệm để giảm số lần truy vấn tới đơn vị cấp chứng thư. Bộ nhớ đệm này chứa dữ liệu trạng thái chứng thư do CA công bố, không phải bản sao tài liệu bạn tải lên.",
        "Log vận hành và bảo mật được giữ theo cấu hình thực tế của máy chủ và nhà cung cấp hạ tầng. Mã nguồn hiện không ấn định một thời hạn lưu cố định cho log cấp host, vì vậy chính sách không đưa ra một con số giữ liệu có thể gây hiểu nhầm. Dữ liệu log chỉ nên được giữ trong thời gian cần thiết cho vận hành, an toàn hệ thống và nghĩa vụ pháp lý áp dụng.",
      ],
    },
    {
      id: "chia-se",
      title: "6. Bên xử lý và truyền dữ liệu",
      items: [
        {
          title: "Cloudflare",
          text: "Tên miền sử dụng Cloudflare cho DNS, proxy và bảo vệ lưu lượng. Cloudflare có thể xử lý IP, dữ liệu định tuyến, cấu hình hệ thống và metadata lưu lượng theo chính sách của họ.",
        },
        {
          title: "Hạ tầng lưu trữ",
          text: "Máy chủ chạy giao diện, API và bộ xác minh xử lý request để cung cấp dịch vụ. Dữ liệu mạng có thể đi qua trung tâm dữ liệu ngoài Việt Nam tùy tuyến kết nối và cấu hình nhà cung cấp.",
        },
        {
          title: "Đơn vị cấp chứng thư",
          text: "Khi kiểm tra thu hồi trực tuyến, hệ thống có thể gửi truy vấn OCSP hoặc tải CRL từ địa chỉ ghi trong chứng thư. Truy vấn phục vụ trạng thái của chứng thư; toàn bộ tài liệu không được gửi cho máy chủ OCSP/CRL như một phần của bước này.",
        },
        {
          title: "Liên kết ngoài",
          text: "GitHub và các nguồn tham khảo chỉ nhận request khi bạn chủ động mở liên kết. Việc xử lý sau đó tuân theo chính sách của website đích.",
        },
      ],
      note: {
        title: "Không bán dữ liệu",
        text: "Dự án không bán, cho thuê hoặc dùng nội dung tài liệu để lập hồ sơ quảng cáo. Nếu sau này bổ sung phân tích truy cập, cookie hoặc một nhà xử lý mới, chính sách này cần được cập nhật trước hoặc cùng thời điểm triển khai.",
      },
    },
    {
      id: "cookie",
      title: "7. Cookie và phân tích truy cập",
      paragraphs: [
        "Phiên bản hiện tại không cài Google Analytics, nền tảng quảng cáo, pixel tiếp thị hoặc công cụ ghi lại phiên người dùng. Ứng dụng cũng không cần cookie đăng nhập vì không có tài khoản.",
        "Nhà cung cấp bảo vệ mạng có thể sử dụng cookie hoặc token kỹ thuật khi cần chống bot, chống tấn công hoặc duy trì an toàn kết nối. Các cơ chế đó thuộc lớp hạ tầng, không được dự án dùng để xây hồ sơ tiếp thị về người dùng.",
      ],
    },
    {
      id: "bao-mat",
      title: "8. Biện pháp bảo vệ",
      items: [
        {
          title: "Mã hóa khi truyền",
          text: "Website production sử dụng HTTPS để giảm nguy cơ nội dung bị đọc hoặc sửa trên đường truyền.",
        },
        {
          title: "Tối thiểu hóa dữ liệu",
          text: "Không yêu cầu tài khoản, không xây lịch sử tệp và không chủ động log nội dung request body.",
        },
        {
          title: "Giới hạn bề mặt xử lý",
          text: "Chỉ chấp nhận các định dạng và kích thước đã công bố; áp dụng giới hạn tần suất và timeout cho các kết nối kiểm tra trạng thái chứng thư.",
        },
        {
          title: "Minh bạch mã nguồn",
          text: "Mã nguồn dự án được công khai để cộng đồng có thể xem xét luồng xử lý và báo lỗi bảo mật hoặc sai lệch kỹ thuật.",
        },
      ],
      note: {
        title: "Không có hệ thống nào an toàn tuyệt đối",
        text: "Bạn nên loại bỏ dữ liệu không cần thiết, dùng bản sao phù hợp để kiểm tra và không tải lên tài liệu tuyệt mật hoặc tài liệu mà bạn không có quyền xử lý.",
      },
    },
    {
      id: "quyen-nguoi-dung",
      title: "9. Quyền và lựa chọn của bạn",
      paragraphs: [
        "Bạn có thể không tải tệp lên, đóng trang hoặc dùng một công cụ kiểm tra cục bộ. Vì ứng dụng không tạo tài khoản hay lịch sử tài liệu, dự án thường không có mã hồ sơ để tìm lại nội dung của một lần kiểm tra đã kết thúc.",
        "Nếu cần hỏi về dữ liệu kết nối, yêu cầu chỉnh sửa thông tin công khai hoặc báo sự cố, bạn có thể mở GitHub Issue và chỉ cung cấp thời điểm, đường dẫn, mã request hoặc mô tả đã ẩn dữ liệu. GitHub Issues là công khai và không phải kênh tiếp nhận tài liệu nhạy cảm. Yêu cầu hợp lệ sẽ được xem xét theo khả năng xác định dữ liệu và pháp luật áp dụng.",
      ],
    },
    {
      id: "thay-doi",
      title: "10. Thay đổi chính sách",
      paragraphs: [
        "Chính sách có thể được cập nhật khi luồng xử lý, nhà cung cấp hạ tầng, tính năng phân tích hoặc yêu cầu pháp lý thay đổi. Ngày cập nhật ở đầu trang cho biết phiên bản nội dung hiện hành. Thay đổi quan trọng liên quan đến cách dùng tài liệu sẽ được thể hiện rõ trên website hoặc trong lịch sử mã nguồn.",
      ],
    },
  ],
  sources: [
    {
      label: "Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15",
      organization: "Cổng Thông tin điện tử Chính phủ",
      href: "https://vanban.chinhphu.vn/?classid=1&docid=214590&pageid=27160",
    },
    {
      label: "Chính sách quyền riêng tư của Cloudflare",
      organization: "Cloudflare",
      href: "https://www.cloudflare.com/privacypolicy/",
    },
    {
      label: "Mã nguồn SignVerify",
      organization: "GitHub",
      href: "https://github.com/Dinhpham04/SignVerify",
    },
  ],
};

const aboutPage: TrustPageContent = {
  kind: "about",
  slug: "gioi-thieu",
  navLabel: "Giới thiệu và phương pháp",
  eyebrow: "Minh bạch về công cụ",
  title: "Giới thiệu và phương pháp kiểm tra",
  description:
    "Tìm hiểu cách công cụ Kiểm Tra Chữ Ký Số phân tích PDF, XML, P7S, P7M; kiểm tra tính toàn vẹn, chứng thư, chuỗi CA, OCSP/CRL và dấu thời gian.",
  intro:
    "Kiểm Tra Chữ Ký Số là công cụ web miễn phí, ưu tiên việc trình bày kết quả kỹ thuật bằng tiếng Việt rõ ràng. Trang này mô tả công cụ làm gì, kiểm tra theo quy trình nào và vì sao một kết quả hợp lệ vẫn cần được hiểu trong đúng bối cảnh.",
  updatedAtIso: "2026-08-07",
  updatedAtLabel: "07/08/2026",
  highlights: [
    {
      title: "Kiểm tra nhiều lớp",
      text: "Không chỉ tìm tên người ký; hệ thống đối chiếu dữ liệu tài liệu, chữ ký mật mã, chứng thư, chuỗi tin cậy và trạng thái thu hồi.",
    },
    {
      title: "Kết quả tại thời điểm kiểm tra",
      text: "OCSP, CRL, kho tin cậy và khả năng kết nối có thể thay đổi; báo cáo luôn gắn với thời điểm hệ thống thực hiện xác minh.",
    },
    {
      title: "Mã nguồn công khai",
      text: "Luồng kiểm tra được xây trên thư viện DSS của Ủy ban châu Âu và có thể được xem xét trong kho mã nguồn dự án.",
    },
  ],
  sections: [
    {
      id: "muc-tieu",
      title: "1. Công cụ này được xây để làm gì",
      paragraphs: [
        "Mục tiêu của dự án là giúp người dùng phổ thông trả lời những câu hỏi đầu tiên khi nhận một tài liệu đã ký: tài liệu có chữ ký hay không, nội dung có còn nguyên vẹn, ai đứng tên chứng thư, chứng thư do đơn vị nào cấp, còn hiệu lực hay đã bị thu hồi và chữ ký có dấu thời gian tin cậy hay không.",
        "Công cụ không phát hành chứng thư, không tạo chữ ký, không thay mặt đơn vị chứng thực và không quyết định giá trị pháp lý của hợp đồng hoặc giao dịch. Nó cung cấp một báo cáo kỹ thuật để người dùng có thêm căn cứ trước khi đối chiếu với quy trình nghiệp vụ, thỏa thuận giữa các bên và quy định pháp luật áp dụng.",
      ],
    },
    {
      id: "dinh-dang",
      title: "2. Định dạng và phạm vi hỗ trợ",
      items: [
        {
          title: "PDF có chữ ký PAdES",
          text: "Phát hiện chữ ký nhúng trong PDF, kiểm tra vùng dữ liệu đã ký, giá trị mật mã, chứng thư và các thành phần xác minh liên quan.",
        },
        {
          title: "XML có chữ ký XAdES/XMLDSig",
          text: "Đọc chữ ký XML được đóng gói trong tệp và kiểm tra tham chiếu tới nội dung. Kết quả còn phụ thuộc cách tài liệu và chữ ký được đóng gói.",
        },
        {
          title: "P7S và P7M dựa trên CMS/CAdES",
          text: "Phân tích container chữ ký, chứng thư và dữ liệu được đóng gói. Với chữ ký tách rời, có thể cần tài liệu gốc tương ứng; nếu thiếu dữ liệu gốc, hệ thống không thể chứng minh toàn vẹn nội dung.",
        },
        {
          title: "Giới hạn tệp",
          text: "Mỗi tệp tối đa 25 MB. Tệp mã hóa, hỏng cấu trúc, định dạng không được hỗ trợ hoặc dùng biến thể đặc thù có thể không phân tích được đầy đủ.",
        },
      ],
    },
    {
      id: "quy-trinh",
      title: "3. Quy trình kiểm tra từng bước",
      ordered: true,
      items: [
        {
          title: "Nhận diện loại tài liệu",
          text: "Hệ thống kiểm tra phần mở rộng, kiểu nội dung và khả năng đọc cấu trúc để chọn bộ xác minh phù hợp cho PDF, XML hoặc CMS.",
        },
        {
          title: "Phát hiện các chữ ký",
          text: "Bộ xác minh liệt kê từng chữ ký tìm thấy. Một tài liệu có thể có nhiều người ký, nhiều lần ký hoặc cả chữ ký tài liệu và dấu thời gian.",
        },
        {
          title: "Kiểm tra tính toàn vẹn dữ liệu",
          text: "Giá trị băm của phần dữ liệu đã ký được tính lại và so với tham chiếu trong chữ ký. Bước này cho biết phần đã ký có bị thay đổi kể từ lúc tạo chữ ký hay không.",
        },
        {
          title: "Xác minh chữ ký mật mã",
          text: "Hệ thống dùng khóa công khai trong chứng thư để xác minh giá trị chữ ký. Một chứng thư có tên đúng nhưng giá trị mật mã sai vẫn là chữ ký không hợp lệ.",
        },
        {
          title: "Đọc danh tính trên chứng thư",
          text: "Tên chủ thể, tổ chức, đơn vị cấp, số sê-ri và thời hạn được lấy từ chứng thư X.509. Đây là dữ liệu do CA phát hành, không phải thông tin do website tự suy đoán.",
        },
        {
          title: "Dựng và kiểm tra chuỗi chứng thư",
          text: "Chứng thư người ký được nối qua các CA trung gian tới một neo tin cậy đã cấu hình. Chứng thư bổ trợ chỉ giúp dựng chuỗi; nó không tự động trở thành neo tin cậy.",
        },
        {
          title: "Kiểm tra thu hồi bằng OCSP và CRL",
          text: "Nếu chứng thư và kết nối cho phép, hệ thống truy vấn OCSP trước và dùng CRL theo chiến lược dự phòng. Không lấy được dữ liệu thu hồi không đồng nghĩa chứng thư chắc chắn còn hiệu lực.",
        },
        {
          title: "Đánh giá dấu thời gian",
          text: "Nếu chữ ký chứa dấu thời gian, hệ thống phát hiện và phân tích token liên quan. Thời gian hiển thị từ thuộc tính ký thông thường không tự động có mức tin cậy tương đương dấu thời gian do dịch vụ tin cậy cấp.",
        },
        {
          title: "Tổng hợp kết quả",
          text: "Mỗi chữ ký có trạng thái riêng; kết luận tài liệu được tổng hợp từ các chữ ký tìm thấy. Giao diện giữ lại các trạng thái không xác định thay vì biến chúng thành hợp lệ hoặc không hợp lệ một cách máy móc.",
        },
      ],
    },
    {
      id: "trang-thai",
      title: "4. Cách hiểu các trạng thái",
      items: [
        {
          title: "Hợp lệ",
          text: "Các kiểm tra bắt buộc trong chính sách xác minh hiện tại đã đạt với dữ liệu tin cậy có sẵn tại thời điểm kiểm tra. Trạng thái này không tự động chứng minh người dùng khóa ký đã được ủy quyền cho giao dịch cụ thể.",
        },
        {
          title: "Không hợp lệ",
          text: "Có bằng chứng kỹ thuật cho thấy ít nhất một kiểm tra quan trọng thất bại, ví dụ nội dung đã ký bị thay đổi, giá trị chữ ký sai hoặc chứng thư bị đánh giá không hợp lệ.",
        },
        {
          title: "Không xác định",
          text: "Chưa đủ dữ liệu để kết luận chắc chắn, chẳng hạn không dựng được chuỗi tin cậy, máy chủ thu hồi không phản hồi hoặc thiếu dữ liệu gốc của chữ ký tách rời.",
        },
        {
          title: "Không có chữ ký",
          text: "Không tìm thấy chữ ký số trong cấu trúc mà bộ xác minh hỗ trợ. Tài liệu có hình ảnh con dấu hoặc chữ ký viết tay vẫn có thể thuộc trạng thái này.",
        },
        {
          title: "Không",
          text: "Được dùng cho thuộc tính không tồn tại, ví dụ không phát hiện dấu thời gian độc lập trong chữ ký; đây không phải lỗi và cũng không có nghĩa bước kiểm tra bị bỏ qua.",
        },
      ],
    },
    {
      id: "mo-hinh-tin-cay",
      title: "5. Mô hình tin cậy và chứng thư",
      paragraphs: [
        "Một chữ ký mật mã đúng chỉ chứng minh dữ liệu khớp với khóa công khai tương ứng. Để liên hệ khóa đó với một cá nhân hoặc tổ chức, bộ xác minh cần chứng thư và chuỗi CA. Để đánh giá chuỗi, hệ thống cần một tập neo tin cậy được quản trị tại thời điểm triển khai.",
        "Kho neo tin cậy và kho chứng thư bổ trợ là hai vai trò khác nhau. Neo tin cậy là điểm cuối mà hệ thống chấp nhận để đánh giá chuỗi. Chứng thư bổ trợ chỉ cung cấp mắt xích trung gian còn thiếu. Vì vậy, việc tìm được đường dẫn chứng thư không tự nó làm cho một CA trở thành đáng tin cậy.",
        "Danh sách CA, chứng thư gốc, chính sách xác minh và thuật toán an toàn có thể thay đổi. Một báo cáo cũ không nên được dùng thay cho việc kiểm tra lại khi giao dịch cần quyết định tại thời điểm hiện tại.",
      ],
    },
    {
      id: "ocsp-crl",
      title: "6. OCSP, CRL và thời điểm kiểm tra",
      paragraphs: [
        "Chứng thư có thời hạn nhưng có thể bị thu hồi trước ngày hết hạn, ví dụ khi khóa bí mật bị lộ hoặc thông tin chủ thể thay đổi. OCSP cho phép hỏi trạng thái của một chứng thư cụ thể; CRL là danh sách chứng thư bị thu hồi do CA công bố.",
        "Kết quả thu hồi phụ thuộc dữ liệu nhúng trong chữ ký, địa chỉ do chứng thư công bố, khả năng truy cập máy chủ CA, độ mới của phản hồi và chính sách cache. Nếu nguồn thu hồi không sẵn sàng, kết luận đúng là chưa đủ dữ liệu, không phải mặc định “chưa bị thu hồi”.",
        "Đối với chữ ký dài hạn, bằng chứng thu hồi và dấu thời gian được nhúng có thể giúp đánh giá tại một thời điểm trong quá khứ. Công cụ vẫn hiển thị kết quả dựa trên khả năng và chính sách xác minh hiện tại, không cam kết bao phủ mọi hồ sơ lưu trữ dài hạn.",
      ],
    },
    {
      id: "gioi-han",
      title: "7. Những điều kết quả không chứng minh",
      items: [
        {
          title: "Không chứng minh thẩm quyền ký",
          text: "Tên trên chứng thư không cho biết người đó có được doanh nghiệp ủy quyền ký đúng loại hợp đồng hoặc đúng hạn mức hay không.",
        },
        {
          title: "Không xác nhận nội dung giao dịch",
          text: "Tài liệu còn nguyên vẹn không có nghĩa điều khoản bên trong là đúng, hợp pháp, không có gian lận hoặc phù hợp nhu cầu của bạn.",
        },
        {
          title: "Không thay thế đối chiếu danh tính",
          text: "Khi rủi ro cao, cần đối chiếu thêm mã số thuế, giấy ủy quyền, thông tin đối tác và kênh liên lạc độc lập.",
        },
        {
          title: "Không phải chứng thư pháp lý",
          text: "Ảnh chụp màn hình hoặc báo cáo từ website không phải văn bản chứng nhận của CA, cơ quan nhà nước, giám định viên hay tổ chức hành nghề pháp lý.",
        },
      ],
    },
    {
      id: "kien-truc",
      title: "8. Kiến trúc và tính minh bạch",
      paragraphs: [
        "Giao diện Next.js gửi tệp tới API ASP.NET. API áp dụng kiểm tra đầu vào và chuyển luồng dữ liệu tới dịch vụ Java sử dụng Digital Signature Services (DSS). Dịch vụ DSS thực hiện xác minh, kết nối nguồn OCSP/CRL khi cần và trả báo cáo có cấu trúc về cho giao diện.",
        "Mã nguồn công khai cho phép kiểm tra cách trạng thái được ánh xạ, cách trust store và adjunct store được dùng, cũng như cách API giới hạn request. Việc công khai mã nguồn hỗ trợ minh bạch kỹ thuật nhưng không đồng nghĩa mọi bản triển khai bên ngoài đều sử dụng cùng cấu hình production của website này.",
      ],
      note: {
        title: "Cách báo một sai lệch",
        text: "Khi báo lỗi, hãy nêu định dạng tệp, trạng thái mong đợi, trạng thái thực tế, thời điểm và phiên bản trình duyệt. Không đính kèm tài liệu thật hoặc dữ liệu cá nhân trên GitHub Issues; hãy tạo một tệp mẫu đã loại bỏ thông tin nhạy cảm nếu cần tái hiện lỗi.",
      },
    },
    {
      id: "co-so-tham-khao",
      title: "9. Cơ sở kỹ thuật và pháp lý tham khảo",
      paragraphs: [
        "Phương pháp kỹ thuật dựa trên mô hình chứng thư X.509, chữ ký số theo các định dạng PAdES/XAdES/CAdES và quy trình xác minh của thư viện DSS. Việc diễn giải giá trị của chữ ký điện tử tại Việt Nam cần được đặt trong Luật Giao dịch điện tử 20/2023/QH15, Nghị định 23/2025/NĐ-CP và các quy định chuyên ngành liên quan.",
        "Các nguồn ở cuối trang được cung cấp để người dùng có thể tự đọc văn bản gốc. Nội dung trên website là phần giải thích kỹ thuật, không trích dẫn thay thế văn bản pháp luật và không phải tư vấn cho một vụ việc cụ thể.",
      ],
    },
  ],
  sources: [
    {
      label: "Tài liệu Digital Signature Service (DSS)",
      organization: "Ủy ban châu Âu",
      href: "https://ec.europa.eu/digital-building-blocks/DSS/webapp-demo/doc/dss-documentation.html",
    },
    {
      label: "Luật Giao dịch điện tử số 20/2023/QH15",
      organization: "Cổng Thông tin điện tử Chính phủ",
      href: "https://vanban.chinhphu.vn/?classid=1&docid=208421&pageid=27160&typegroupid=3",
    },
    {
      label: "Nghị định 23/2025/NĐ-CP về chữ ký điện tử và dịch vụ tin cậy",
      organization: "Cổng Thông tin điện tử Chính phủ",
      href: "https://vanban.chinhphu.vn/?classid=1&docid=212829&pageid=27160",
    },
    {
      label: "Dịch vụ và thông tin CA công cộng",
      organization: "Trung tâm Chứng thực điện tử quốc gia (NEAC)",
      href: "https://neac.gov.vn/vi/ca-cong-cong",
    },
    {
      label: "Mã nguồn SignVerify",
      organization: "GitHub",
      href: "https://github.com/Dinhpham04/SignVerify",
    },
  ],
};

const termsPage: TrustPageContent = {
  kind: "terms",
  slug: "dieu-khoan-su-dung",
  navLabel: "Điều khoản sử dụng",
  eyebrow: "Điều kiện sử dụng dịch vụ",
  title: "Điều khoản sử dụng",
  description:
    "Điều khoản sử dụng công cụ Kiểm Tra Chữ Ký Số, gồm phạm vi dịch vụ, trách nhiệm khi tải tệp, giới hạn kết quả và quy tắc sử dụng hợp lý.",
  intro:
    "Các điều khoản dưới đây xác định phạm vi của công cụ, trách nhiệm của người sử dụng và những giới hạn cần hiểu khi dùng kết quả kiểm tra cho công việc hoặc giao dịch.",
  updatedAtIso: "2026-08-07",
  updatedAtLabel: "07/08/2026",
  highlights: [
    {
      title: "Dịch vụ kỹ thuật miễn phí",
      text: "Công cụ cung cấp kết quả xác minh tự động và có thể thay đổi để cải thiện an toàn, độ chính xác hoặc khả năng vận hành.",
    },
    {
      title: "Bạn phải có quyền với tệp",
      text: "Chỉ tải lên tài liệu bạn sở hữu, được phép xử lý hoặc có căn cứ hợp pháp để kiểm tra.",
    },
    {
      title: "Không thay thế đánh giá pháp lý",
      text: "Kết quả kỹ thuật không xác nhận thẩm quyền ký, hiệu lực giao dịch hoặc tính hợp pháp của nội dung tài liệu.",
    },
  ],
  sections: [
    {
      id: "chap-nhan",
      title: "1. Chấp nhận điều khoản",
      paragraphs: [
        "Khi truy cập website hoặc gửi tệp để kiểm tra, bạn xác nhận đã đọc và đồng ý tuân thủ Điều khoản sử dụng cùng Chính sách bảo mật đang có hiệu lực. Nếu không đồng ý, bạn không nên gửi tệp và có thể ngừng sử dụng dịch vụ.",
        "Nếu bạn sử dụng công cụ thay mặt một tổ chức, bạn xác nhận mình có thẩm quyền chấp nhận các điều khoản này trong phạm vi công việc được giao. Việc website cho phép truy cập không tạo ra quan hệ đại diện, tư vấn, chứng thực hoặc hợp đồng dịch vụ có trả phí giữa dự án và người dùng.",
      ],
    },
    {
      id: "dich-vu",
      title: "2. Phạm vi dịch vụ",
      paragraphs: [
        "Công cụ nhận PDF, XML, P7S và P7M trong giới hạn được công bố, sau đó cố gắng phát hiện chữ ký và trả thông tin về tính toàn vẹn, chữ ký mật mã, chứng thư, chuỗi CA, trạng thái OCSP/CRL và dấu thời gian. Tính năng cụ thể có thể khác nhau theo định dạng, cấu trúc chữ ký và dữ liệu có sẵn.",
        "Dịch vụ được cung cấp miễn phí và không kèm cam kết mức dịch vụ. Dự án có thể sửa lỗi, thay đổi giới hạn, cập nhật kho tin cậy, thay thư viện, tạm dừng một chức năng hoặc ngừng cung cấp toàn bộ dịch vụ khi cần cho bảo mật, bảo trì, pháp lý hoặc vận hành.",
      ],
    },
    {
      id: "quyen-tai-tep",
      title: "3. Quyền và trách nhiệm đối với tệp tải lên",
      items: [
        {
          title: "Có quyền xử lý",
          text: "Bạn phải là chủ sở hữu, người được ủy quyền hoặc có căn cứ hợp pháp khác để gửi tài liệu tới hệ thống kiểm tra.",
        },
        {
          title: "Tự đánh giá độ nhạy cảm",
          text: "Bạn chịu trách nhiệm xem tài liệu có bí mật kinh doanh, dữ liệu cá nhân, thông tin tài chính, hồ sơ sức khỏe hoặc nghĩa vụ bảo mật đặc biệt hay không trước khi tải lên.",
        },
        {
          title: "Không gửi khóa bí mật",
          text: "Công cụ chỉ cần tài liệu đã ký. Không tải khóa bí mật, mật khẩu token, mã PIN, seed phrase, tệp cấu hình chứa bí mật hoặc thông tin xác thực.",
        },
        {
          title: "Tuân thủ nghĩa vụ với bên thứ ba",
          text: "Việc kiểm tra không miễn trừ nghĩa vụ theo hợp đồng, thỏa thuận bảo mật, quy chế nội bộ hoặc pháp luật bảo vệ dữ liệu áp dụng cho bạn.",
        },
      ],
    },
    {
      id: "su-dung-chap-nhan-duoc",
      title: "4. Sử dụng chấp nhận được",
      paragraphs: [
        "Bạn được dùng công cụ cho nhu cầu cá nhân, học tập, kiểm tra nghiệp vụ hoặc tích hợp hợp lý trong phạm vi giao diện và giới hạn công khai. Mọi cách sử dụng phải tôn trọng quyền của người khác và không làm suy giảm dịch vụ.",
      ],
      items: [
        {
          title: "Không tấn công hoặc né kiểm soát",
          text: "Không khai thác lỗ hổng, vượt giới hạn tần suất, né giới hạn kích thước, dò quét trái phép hoặc làm gián đoạn hạ tầng.",
        },
        {
          title: "Không gửi mã độc",
          text: "Không cố ý tải payload độc hại, tệp được chế tạo để khai thác thư viện hoặc nội dung nhằm xâm nhập hệ thống.",
        },
        {
          title: "Không xử lý dữ liệu trái phép",
          text: "Không tải lên tài liệu lấy được bằng hành vi trái pháp luật, xâm phạm quyền riêng tư, bản quyền, bí mật kinh doanh hoặc nghĩa vụ bảo mật.",
        },
        {
          title: "Không giả mạo kết quả",
          text: "Không sửa, cắt ghép hoặc trình bày kết quả theo cách khiến người khác hiểu đây là xác nhận chính thức của CA, cơ quan nhà nước hoặc dự án.",
        },
        {
          title: "Không tự động hóa gây quá tải",
          text: "Không dùng bot hoặc script gửi khối lượng lớn nếu chưa có thỏa thuận riêng. API công khai cho giao diện không mặc nhiên là API thương mại có cam kết ổn định.",
        },
      ],
    },
    {
      id: "hieu-ket-qua",
      title: "5. Cách sử dụng kết quả kiểm tra",
      paragraphs: [
        "Kết quả phản ánh dữ liệu kỹ thuật, kho tin cậy, nguồn OCSP/CRL, chính sách xác minh và thời gian tại lúc kiểm tra. Trạng thái có thể thay đổi khi chứng thư bị thu hồi, nguồn tin cậy được cập nhật, lỗi triển khai được sửa hoặc có thêm bằng chứng dài hạn.",
        "“Hợp lệ” không đồng nghĩa hợp đồng chắc chắn có hiệu lực, người ký có đủ thẩm quyền, nội dung không gian lận hoặc giao dịch đã đáp ứng mọi điều kiện của pháp luật chuyên ngành. “Không xác định” không nên được đổi thành “hợp lệ” chỉ vì chưa phát hiện lỗi; nó cho biết hệ thống chưa đủ căn cứ để kết luận.",
      ],
      note: {
        title: "Giao dịch có rủi ro cao",
        text: "Đối với hồ sơ tài chính, đấu thầu, tố tụng, chuyển nhượng, ủy quyền hoặc giao dịch có giá trị lớn, hãy đối chiếu với đơn vị cấp chứng thư, quy trình nghiệp vụ, tài liệu gốc và chuyên gia phù hợp trước khi quyết định.",
      },
    },
    {
      id: "khong-tu-van",
      title: "6. Không phải tư vấn hoặc chứng nhận",
      paragraphs: [
        "Nội dung website mang tính thông tin và giải thích kỹ thuật chung. Dự án không cung cấp tư vấn pháp lý, kiểm toán, giám định chữ ký, dịch vụ chứng thực, dịch vụ cấp dấu thời gian hoặc ý kiến chuyên môn cho một vụ việc cụ thể.",
        "Bạn tự chịu trách nhiệm xác định quy định áp dụng, yêu cầu lưu trữ chứng cứ và mức thẩm tra phù hợp. Việc dẫn liên kết tới văn bản pháp luật hoặc cơ quan chính thức chỉ nhằm giúp tra cứu, không phải cam kết rằng danh sách nguồn đã đầy đủ cho mọi ngành nghề.",
      ],
    },
    {
      id: "san-sang",
      title: "7. Tính sẵn sàng và sai số kỹ thuật",
      items: [
        {
          title: "Phụ thuộc hệ thống bên ngoài",
          text: "OCSP, CRL, DNS, mạng phân phối nội dung và máy chủ lưu trữ có thể chậm, lỗi hoặc không phản hồi.",
        },
        {
          title: "Khác biệt định dạng",
          text: "Tệp hỏng, mã hóa, chữ ký tách rời, profile đặc thù hoặc thuật toán cũ có thể làm giảm khả năng phân tích.",
        },
        {
          title: "Cấu hình có thể cập nhật",
          text: "Kho tin cậy, chứng thư trung gian, chính sách thuật toán và phiên bản thư viện cần thay đổi theo thực tế an toàn.",
        },
        {
          title: "Không bảo đảm không gián đoạn",
          text: "Dịch vụ có thể tạm ngừng mà không báo trước trong sự cố, bảo trì khẩn cấp, bị tấn công hoặc theo yêu cầu hợp lệ của cơ quan có thẩm quyền.",
        },
      ],
    },
    {
      id: "mien-tru",
      title: "8. Tuyên bố giới hạn bảo đảm",
      paragraphs: [
        "Trong phạm vi pháp luật cho phép, dịch vụ được cung cấp theo hiện trạng và khả năng sẵn có. Dự án không đưa ra bảo đảm tuyệt đối rằng mọi tệp đều được phân tích, mọi kết quả đều không có sai sót, mọi nguồn thu hồi luôn mới hoặc dịch vụ phù hợp với một mục đích pháp lý, thương mại cụ thể.",
        "Không nội dung nào trong điều khoản này loại trừ trách nhiệm mà pháp luật không cho phép loại trừ. Nếu bạn cần một mức bảo đảm, hỗ trợ, lưu vết hoặc cam kết dịch vụ cụ thể, công cụ miễn phí này không nên là cơ sở duy nhất cho quyết định.",
      ],
    },
    {
      id: "trach-nhiem",
      title: "9. Giới hạn trách nhiệm",
      paragraphs: [
        "Trong phạm vi pháp luật cho phép, dự án và người đóng góp không chịu trách nhiệm cho quyết định được đưa ra chỉ dựa trên kết quả tự động; thiệt hại do tài liệu sai, thiếu thẩm quyền, gián đoạn nguồn OCSP/CRL, mất cơ hội kinh doanh, mất dữ liệu hoặc việc sử dụng dịch vụ trái với điều khoản.",
        "Bạn có trách nhiệm giữ bản gốc, bằng chứng liên quan và quy trình dự phòng. Website không phải kho lưu trữ tài liệu, không cung cấp lịch sử kiểm tra và không nên được dùng làm nơi duy nhất lưu chứng cứ giao dịch.",
      ],
    },
    {
      id: "so-huu-tri-tue",
      title: "10. Mã nguồn, nhãn hiệu và nội dung",
      paragraphs: [
        "Mã nguồn dự án được công bố tại GitHub theo tệp giấy phép đi kèm kho mã. Quyền sử dụng, sao chép hoặc phân phối mã nguồn tuân theo giấy phép đó; điều khoản trên website không mở rộng quyền ngoài giấy phép.",
        "Tên, logo, nội dung biên soạn và giao diện có thể chịu quyền sở hữu tương ứng. Tên sản phẩm, tiêu chuẩn và tổ chức được nhắc tới thuộc chủ sở hữu của chúng. Việc dẫn nguồn không hàm ý các tổ chức đó tài trợ, chứng nhận hoặc chịu trách nhiệm cho website.",
      ],
    },
    {
      id: "bao-mat-va-ben-thu-ba",
      title: "11. Quyền riêng tư và dịch vụ bên thứ ba",
      paragraphs: [
        "Cách tệp, log và dữ liệu kết nối được xử lý được mô tả tại Chính sách bảo mật. Bạn nên đọc chính sách đó trước khi tải tài liệu có dữ liệu cá nhân.",
        "Website có thể liên kết tới văn bản pháp luật, cơ quan chứng thực, tài liệu DSS và GitHub. Dự án không kiểm soát nội dung, khả năng sẵn sàng hoặc chính sách của các website đó. Bạn tự quyết định việc rời website và sử dụng dịch vụ bên thứ ba.",
      ],
    },
    {
      id: "tam-ngung",
      title: "12. Hạn chế hoặc chấm dứt truy cập",
      paragraphs: [
        "Dự án có thể chặn, giới hạn hoặc từ chối request khi phát hiện lạm dụng, rủi ro bảo mật, vi phạm điều khoản, lưu lượng bất thường hoặc yêu cầu pháp lý hợp lệ. Biện pháp có thể áp dụng theo IP, mẫu lưu lượng hoặc cơ chế bảo vệ hạ tầng mà không cần tạo tài khoản người dùng.",
      ],
    },
    {
      id: "thay-doi",
      title: "13. Thay đổi điều khoản",
      paragraphs: [
        "Điều khoản có thể được cập nhật khi dịch vụ, rủi ro kỹ thuật hoặc quy định áp dụng thay đổi. Phiên bản hiện hành được xác định bằng ngày cập nhật ở đầu trang. Việc tiếp tục sử dụng sau khi điều khoản mới được công bố được hiểu là bạn chấp nhận phiên bản mới trong phạm vi pháp luật cho phép.",
      ],
    },
    {
      id: "phap-luat-va-lien-he",
      title: "14. Pháp luật áp dụng và liên hệ",
      paragraphs: [
        "Các điều khoản được diễn giải phù hợp với pháp luật Việt Nam trong phạm vi áp dụng, bao gồm nguyên tắc về giao dịch điện tử, chữ ký điện tử, dữ liệu cá nhân và các quy định chuyên ngành có liên quan. Nếu một phần điều khoản không thể thi hành, các phần còn lại vẫn được áp dụng trong phạm vi có thể.",
        "Kênh phản hồi hiện tại là GitHub Issues của dự án. Đây là diễn đàn công khai: chỉ gửi mô tả kỹ thuật đã loại bỏ dữ liệu nhạy cảm. Không đăng tài liệu, thông tin chứng thư cá nhân đầy đủ, khóa bí mật hoặc nội dung tranh chấp tại đó.",
      ],
    },
  ],
  sources: [
    {
      label: "Luật Giao dịch điện tử số 20/2023/QH15",
      organization: "Cổng Thông tin điện tử Chính phủ",
      href: "https://vanban.chinhphu.vn/?classid=1&docid=208421&pageid=27160&typegroupid=3",
    },
    {
      label: "Nghị định 23/2025/NĐ-CP về chữ ký điện tử và dịch vụ tin cậy",
      organization: "Cổng Thông tin điện tử Chính phủ",
      href: "https://vanban.chinhphu.vn/?classid=1&docid=212829&pageid=27160",
    },
    {
      label: "Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15",
      organization: "Cổng Thông tin điện tử Chính phủ",
      href: "https://vanban.chinhphu.vn/?classid=1&docid=214590&pageid=27160",
    },
    {
      label: "Kho mã và giấy phép SignVerify",
      organization: "GitHub",
      href: "https://github.com/Dinhpham04/SignVerify",
    },
  ],
};

export const trustPageList = [aboutPage, privacyPage, termsPage] as const;

export function getTrustPage(slug: string): TrustPageContent {
  const page = trustPageList.find((item) => item.slug === slug);

  if (!page) {
    throw new Error(`Unknown trust page: ${slug}`);
  }

  return page;
}
