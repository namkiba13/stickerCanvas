export default {
  label: "Tiếng Việt", htmlLang: "vi", ogLocale: "vi_VN",
  site: { title: "94 Tools — Công cụ online miễn phí, dùng ngay", description: "Đổi số thành chữ tiếng Việt, đếm từ và ký tự, tạo sticker từ ảnh. Công cụ miễn phí, không cần tài khoản, xử lý ngay trong trình duyệt.", tagline: "Tiện ích mỗi ngày, miễn phí." },
  ui: {
    skip: "Đến nội dung chính", menu: "Menu chính", language: "Ngôn ngữ", home: "Trang chủ", allTools: "Tất cả công cụ", tools: "Công cụ", blog: "Blog", about: "Giới thiệu", aboutFooter: "Giới thiệu · Quyền riêng tư · Mã nguồn",
    heroTitle: (b) => `Xong việc nhanh chóng với ${b}`, heroDesc: "Tăng tốc công việc với 94 Tools – bộ công cụ online miễn phí giúp bạn xong việc thật nhanh! Đổi số thành chữ, đếm từ, tạo sticker từ ảnh và nhiều tiện ích khác, xử lý ngay trên trình duyệt.",
    search: "Tìm công cụ", searchPlaceholder: "Tìm tất cả công cụ", noResults: "Không có kết quả", categories: "Danh mục công cụ",
    seeAll: (c) => `Xem tất cả ${c.toLowerCase()}`, tryTool: (t) => `Thử ${t}`, allOf: (c) => `Tất cả ${c.toLowerCase()}`, searchIn: (c) => `Tìm trong ${c.toLowerCase()}`, back: "Về trang chủ", categoryTitle: (c) => `${c} online miễn phí`,
    seeExamples: "Xem ví dụ", options: "Tùy chọn công cụ", whatIs: (t) => `${t} là gì?`, examples: (t) => `Ví dụ ${t.toLowerCase()}`, clickToTry: "Bấm để thử!", tryExample: "Thử ví dụ", moreTools: "Thêm công cụ cho bạn",
    import: "Nhập từ tệp", clear: "Xóa", download: "Tải xuống", copy: "Sao chép",
  },
  quick: ["Đọc số tiền bằng chữ", "Đếm số từ", "Tạo sticker từ ảnh", "Đổi cột số từ Excel", "Đếm ký tự", "Xóa nền ảnh"],
  categories: [
    { name: "Công cụ số", description: "Công cụ làm việc với con số – đổi số tiền thành chữ tiếng Việt, đọc cả cột số từ Excel cho hóa đơn, phiếu chi, hợp đồng và nhiều hơn nữa." },
    { name: "Công cụ văn bản", description: "Công cụ làm việc với văn bản – đếm số từ, ký tự có và không có khoảng trắng, số dòng cho bài viết, bài tập, mô tả sản phẩm và nhiều hơn nữa." },
    { name: "Công cụ hình ảnh", description: "Công cụ làm việc với hình ảnh – xóa nền ảnh, thêm viền, chèn chữ và tạo sticker PNG ngay trên trình duyệt, không cần cài đặt." },
  ],
  tools: [
    {
      name: "Đổi số thành chữ", short: "Đọc số tiền bằng chữ tiếng Việt", keywords: "đọc số tiền bằng chữ hóa đơn phiếu chi excel",
      description: "Đọc số tiền bằng tiếng Việt. Dán cả cột từ Excel và sao chép kết quả trong một lần.",
      title: "Đổi số tiền thành chữ tiếng Việt — Dán nhiều dòng từ Excel", meta: "Chuyển số thành chữ tiếng Việt miễn phí. Hỗ trợ số tiền, số âm, số thập phân và nhiều dòng từ Excel; giữ chính xác số lớn.",
      info: "Đổi số thành chữ là công cụ online giúp chuyển một con số – như số tiền trên hóa đơn, phiếu chi hay hợp đồng – thành cách đọc bằng chữ tiếng Việt. Bạn có thể nhập một số hoặc dán cả cột số từ Excel, chọn định dạng dấu phân cách và đơn vị, rồi sao chép hoặc tải kết quả về máy.",
      prose: `<h2>Cách đổi số thành chữ</h2><ol><li>Chọn định dạng Việt Nam hoặc quốc tế đúng với dữ liệu của bạn.</li><li>Nhập số, hoặc sao chép một cột số từ Excel vào ô bên trái.</li><li>Kiểm tra kết quả, bấm <strong>Sao chép</strong> dưới ô kết quả rồi dán vào bảng tính hoặc tài liệu.</li></ol><p>Ví dụ <code>1.250.000</code> ở định dạng Việt Nam được đọc là <strong>một triệu hai trăm năm mươi nghìn đồng</strong>. Nếu chỉ cần đọc số, chọn “Không thêm đơn vị”.</p><h2>Dấu chấm và dấu phẩy được hiểu thế nào?</h2><p>Ở định dạng Việt Nam, dấu chấm phân tách hàng nghìn và dấu phẩy phân tách phần thập phân: <code>1.234,5</code>. Định dạng quốc tế đảo ngược hai dấu này: <code>1,234.5</code>. Công cụ yêu cầu nhóm hàng nghìn đủ ba chữ số; không tự đoán một chuỗi nhập sai.</p><h2>Câu hỏi thường gặp</h2><details><summary>Có hỗ trợ số lớn và số âm không?</summary><p>Có. Số đầu vào được giữ dưới dạng chuỗi, tránh mất chữ số ở giới hạn số nguyên của JavaScript. Số âm được đọc với tiền tố “âm”.</p></details><details><summary>Phần thập phân được đọc như thế nào?</summary><p>Phần thập phân được đọc sau từ “phẩy”, rồi thêm đơn vị đã chọn. Công cụ không đổi phần lẻ sang xu hoặc tự làm tròn số tiền.</p></details><details><summary>Có thể dùng để viết hóa đơn không?</summary><p>Bạn có thể sao chép kết quả vào tài liệu. Hãy đối chiếu số tiền, dấu phân cách và cách ghi đơn vị theo yêu cầu của chứng từ trước khi sử dụng.</p></details>`,
    },
    {
      name: "Đếm từ & ký tự", short: "Đếm số từ, ký tự và dòng của văn bản", keywords: "đếm số từ đếm ký tự word count văn bản",
      description: "Kiểm tra số từ, ký tự và dòng ngay khi nhập. Hỗ trợ tiếng Việt và emoji.",
      title: "Đếm từ, đếm ký tự tiếng Việt online miễn phí", meta: "Đếm số từ, ký tự có và không có khoảng trắng, số dòng ngay khi nhập. Bộ đếm hỗ trợ dấu tiếng Việt và emoji, không gửi văn bản lên máy chủ.",
      info: "Đếm từ & ký tự là công cụ online giúp bạn biết ngay văn bản có bao nhiêu từ, bao nhiêu ký tự có và không có khoảng trắng, bao nhiêu dòng. Công cụ hữu ích khi viết bài theo giới hạn số từ, soạn mô tả sản phẩm, tiêu đề SEO hay nội dung mạng xã hội.",
      prose: `<h2>Công cụ đếm từ tiếng Việt hoạt động thế nào?</h2><p>Dán văn bản vào ô <strong>Văn bản</strong>. Bộ đếm cập nhật trực tiếp, giúp bạn kiểm tra độ dài bài viết, bài tập, mô tả sản phẩm hoặc nội dung mạng xã hội.</p><h2>Quy tắc đếm rõ ràng</h2><ul><li><strong>Từ theo khoảng trắng:</strong> mỗi nhóm tách bằng dấu cách, tab hoặc xuống dòng, có ít nhất một chữ cái hoặc chữ số, được tính là một đơn vị. “Xin chào Việt Nam” được tính là 4.</li><li><strong>Ký tự:</strong> đếm cụm ký tự hiển thị (Unicode grapheme), có tính khoảng trắng và ngắt dòng. Một emoji gia đình ghép thành một hình được tính là 1.</li><li><strong>Ký tự không khoảng trắng:</strong> loại khoảng trắng, tab và ngắt dòng.</li><li><strong>Dòng:</strong> tách theo ngắt dòng bạn nhập; dòng tự xuống do chiều rộng màn hình không tạo dòng mới trong thống kê. Ô rỗng có 0 dòng.</li></ul><p>Đây là cách đếm đơn vị theo khoảng trắng, không phải phân tích từ ghép tiếng Việt theo ngôn ngữ học. Dấu câu hoặc emoji đứng riêng không được tính là từ.</p><h2>Câu hỏi thường gặp</h2><details><summary>Tại sao số đếm khác Word hoặc một mạng xã hội?</summary><p>Các nền tảng có thể dùng cách tách từ và tính emoji khác nhau. Hãy dùng quy tắc hoặc bộ đếm của nền tảng đích nếu cần tuân thủ một giới hạn cụ thể.</p></details><details><summary>Văn bản của tôi có được lưu trên máy chủ không?</summary><p>Không có chức năng gửi văn bản lên máy chủ. Việc đếm diễn ra trong trình duyệt. Nội dung ô đếm không được công cụ lưu lại sau khi tải lại trang.</p></details>`,
    },
    {
      name: "Tạo sticker từ ảnh", short: "Xóa nền ảnh, thêm viền và xuất PNG", keywords: "xóa nền ảnh png sticker zalo viền",
      description: "Xóa nền, thêm viền, chữ và xuất PNG. Biến ảnh của bạn thành sticker ngay trên trình duyệt.",
      title: "Tạo sticker từ ảnh online — Xóa nền, thêm viền, xuất PNG", meta: "Tạo sticker từ ảnh miễn phí ngay trên trình duyệt. Xóa nền ảnh, thêm viền, chữ và tải PNG với trình chỉnh sửa Sticker Canvas.",
      info: "Tạo sticker từ ảnh là công cụ online giúp bạn biến một bức ảnh thành sticker: xóa nền ngay trên thiết bị, thêm viền trắng, chèn chữ và tải về file PNG. Không cần cài ứng dụng hay tạo tài khoản, ảnh không bị gửi lên máy chủ để xóa nền.",
      prose: `<h2>Cách tạo sticker từ ảnh</h2><ol><li>Bấm <strong>Mở trình tạo sticker</strong>, chọn nút tải ảnh hoặc kéo ảnh vào canvas.</li><li>Chọn ảnh trên canvas, rồi chọn <strong>Remove background</strong> trong bảng chỉnh sửa để xóa nền.</li><li>Điều chỉnh viền (Outline), kích thước hoặc thêm chữ với công cụ văn bản.</li><li>Dùng nút lưu PNG của ảnh đang chọn để tải riêng sticker; nút tải trong menu canvas xuất toàn bố cục.</li></ol><h2>Xóa nền ngay trên thiết bị</h2><p>Model xử lý ảnh chạy trong trình duyệt. Ảnh không được tải lên API xóa nền. Lần sử dụng đầu cần tải các tệp xử lý; trình duyệt có thể lưu bộ nhớ đệm để dùng lại.</p><p>Ảnh rõ nét, chủ thể tách biệt với nền thường dễ xử lý hơn. Tóc, vật trong suốt và nền phức tạp có thể còn viền hoặc bị mất chi tiết. Hãy kiểm tra kết quả trước khi tải xuống.</p><h2>Câu hỏi thường gặp</h2><details><summary>Ảnh PNG tải xuống có nền trong suốt không?</summary><p>Sau khi xóa nền, chức năng lưu riêng ảnh được chọn tạo PNG sticker. Xuất toàn canvas bao gồm nền giấy và các thành phần của bố cục; hai cách xuất cho kết quả khác nhau.</p></details><details><summary>Có dùng trên điện thoại được không?</summary><p>Có giao diện thích ứng với màn hình nhỏ. Xóa nền cần bộ nhớ và thời gian xử lý; máy tính hoặc điện thoại mới thường có trải nghiệm tốt hơn.</p></details><details><summary>Công cụ có tự tạo gói sticker WhatsApp hoặc Zalo không?</summary><p>Hiện công cụ tạo và tải ảnh PNG. Việc nhập ảnh thành gói sticker phụ thuộc chức năng và yêu cầu của ứng dụng nhắn tin bạn sử dụng.</p></details>`,
    },
  ],
  number: {
    label: "Chuyển số thành chữ", input: "Số cần đổi", result: "Kết quả bằng chữ", placeholder: "Nhập mỗi dòng một số, ví dụ: 1250000", resultPlaceholder: "Kết quả sẽ xuất hiện ở đây…",
    help: "Tối đa 30.000 ký tự, 300 ký tự mỗi số. Dòng trống được giữ nguyên để dễ dán lại vào Excel.", noscript: "Bật JavaScript để chuyển số thành chữ trên thiết bị của bạn.",
    groups: [
      { title: "Định dạng số", choices: [["Việt Nam: 1.234.567,89", "Dấu chấm ngăn hàng nghìn, dấu phẩy trước phần thập phân."], ["Quốc tế: 1,234,567.89", "Dấu phẩy ngăn hàng nghìn, dấu chấm trước phần thập phân."]] },
      { title: "Đơn vị ở cuối", choices: [["Đồng", "Thêm chữ “đồng” sau kết quả, dùng cho số tiền."], ["Không thêm đơn vị", "Chỉ đọc con số."]] },
    ],
    examples: [
      ["Số tiền trên hóa đơn", "Số tiền định dạng Việt Nam, dấu chấm ngăn hàng nghìn, thêm đơn vị đồng ở cuối."],
      ["Dán cột số từ Excel", "Mỗi dòng một số. Dòng trống được giữ nguyên để kết quả khớp từng ô khi dán lại vào bảng tính."],
      ["Số thập phân kiểu quốc tế", "Dấu phẩy ngăn hàng nghìn, dấu chấm trước phần thập phân. Chỉ đọc số, không thêm đơn vị."],
    ],
  },
  counter: {
    label: "Bộ đếm văn bản", input: "Văn bản", stats: "Thống kê", placeholder: "Nhập hoặc dán nội dung vào đây…", help: "Tối đa 100.000 ký tự. Quy tắc đếm được giải thích bên dưới.", noscript: "Bật JavaScript để xem số từ và ký tự.",
    labels: { words: "Từ theo khoảng trắng", characters: "Ký tự", withoutSpaces: "Ký tự không khoảng trắng", lines: "Dòng" },
    examples: [
      ["Lời chào có emoji", "Emoji được tính là một ký tự nhưng không được tính là một từ.", "Xin chào Việt Nam! 👋\nCông cụ nhỏ, giúp việc mỗi ngày nhẹ hơn."],
      ["Mô tả sản phẩm", "Kiểm tra độ dài mô tả trước khi đăng lên sàn thương mại điện tử.", "Áo thun cotton 100%, form rộng, thoáng mát. Giao hàng toàn quốc trong 2–3 ngày."],
      ["Tiêu đề bài viết", "Tiêu đề SEO nên ngắn gọn; đếm ký tự để không bị cắt trên trang kết quả tìm kiếm.", "Cách viết số tiền bằng chữ đúng chuẩn trên hóa đơn"],
    ],
  },
  sticker: {
    label: "Tạo sticker", input: "Ảnh đầu vào", result: "Kết quả", open: "Mở trình tạo sticker", editor: "Mở trình chỉnh sửa",
    drop: "Bấm vào đây để mở trình tạo sticker, rồi chọn ảnh từ thiết bị hoặc kéo thả ảnh vào canvas.",
    note: "Lần đầu xóa nền cần tải model khoảng 46 MB. Thời gian xử lý tùy thiết bị; trình chỉnh sửa hiện dùng giao diện tiếng Anh.",
  },
  about: {
    title: "Giới thiệu, quyền riêng tư & mã nguồn", description: "Thông tin về 94 Tools, cách xử lý dữ liệu trong trình duyệt và các dự án mã nguồn mở được sử dụng.",
    h1: "Công cụ nhỏ. Mã nguồn mở.", lead: "94 Tools tập hợp những tiện ích đơn giản để bạn xử lý công việc thường ngày ngay trong trình duyệt.",
    html: `<h2>Miễn phí và không cần tài khoản</h2><p>Ba công cụ hiện tại được dùng miễn phí. Website được xây dựng từ các dự án mã nguồn mở và các tính năng sẵn có của trình duyệt.</p><h2>Dữ liệu của bạn</h2><p>Văn bản, số và ảnh được xử lý trên thiết bị, không được công cụ gửi lên máy chủ để chuyển đổi. Trình chỉnh sửa sticker lưu công việc trong bộ nhớ trình duyệt để bạn có thể mở lại. Khi dùng máy chung, hãy xóa dữ liệu trang web trong cài đặt trình duyệt sau khi hoàn tất.</p><p>Máy chủ vẫn nhận các yêu cầu tải trang, mã JavaScript và model, bao gồm thông tin kỹ thuật như địa chỉ IP. Phiên bản hiện tại không tích hợp quảng cáo hay công cụ phân tích bên thứ ba.</p><h2>Nguồn mở và giấy phép</h2>`,
    feedback: `<h2>Góp ý hoặc báo lỗi</h2><p>Bạn có thể gửi vấn đề kỹ thuật qua <a href="https://github.com/namkiba13/stickerCanvas/issues">GitHub Issues</a>. Khi báo lỗi, vui lòng dùng nội dung mẫu thay cho số tiền hoặc ảnh riêng tư.</p>`,
  },
  credits: { source: "Mã nguồn website và Sticker Canvas", fork: "fork từ", license: "Giấy phép", counter: "Bản mẫu tham khảo; bộ đếm trên website dùng quy tắc khoảng trắng và Unicode được mô tả trên trang công cụ.", ui: "Giao diện mô phỏng", cards: "Viết lại bằng HTML và CSS tĩnh; ảnh nền trang chủ lấy từ OmniTools. Thẻ bài viết tham khảo", font: "Phông chữ", icons: "Biểu tượng qua", model: "Model xóa nền IS-Net dùng giấy phép Apache-2.0. Bộ giải mã HEIC có thành phần ISC/LGPLv3.", notices: "Thông báo thành phần", modelLicense: "Giấy phép model" },
  js: { line: "Dòng", format: "Số hoặc dấu phân cách chưa đúng định dạng đã chọn.", length: "Mỗi số tối đa 300 ký tự.", errors: "{n} dòng cần sửa. Kiểm tra định dạng số trong phần Tùy chọn công cụ.", copied: "Đã sao chép.", selected: "Đã chọn nội dung. Nhấn Ctrl+C hoặc chọn Sao chép trên điện thoại.", segmenter: "Vui lòng cập nhật trình duyệt để đếm ký tự Unicode và emoji chính xác.", file: "so-thanh-chu.txt" },
};
