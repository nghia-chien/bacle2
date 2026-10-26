/**
 * DESIGN BRIEF — BACLE Photography (nguồn sự thật về hình ảnh của dự án, không render ra trang)
 * Mood: tươi sáng, lãng mạn, tinh tế, biên tập (editorial), ấm áp.
 * Reference mode: Adaptation — giữ 4 dấu ấn từ public/layout: wordmark serif cực lớn + ảnh xếp lệch quanh ảnh trung tâm,
 *   cặp chữ script + serif in hoa cho tiêu đề, dải ảnh full-bleed tối có khung kem, khối "client notes" nền tối.
 * Layout: Editorial / asymmetric + image-first. Ảnh dẫn dắt, chữ ngắn, CTA đặt lịch luôn trong tầm tay.
 * Palette: nền kem/ngà, chữ nâu espresso, đường kẻ cát; dùng token trong src/styles/index.css, không hard-code màu.
 * Type: Cormorant Garamond (display, Light 300), Great Vibes (script, cụm ngắn), Be Vietnam Pro (body).
 * Media: ảnh thật của khách, không bo góc; không dùng ảnh đã dàn trang sẵn làm ảnh đơn.
 * Density: thoáng, mỗi section một ý; khoảng trắng rộng ở desktop, gọn ở mobile.
 * Motion: signature là hero — hàng 3 ảnh bằng nhau (mobile ~1.5), khe nhỏ, chạy phải→trái;
 *   chữ BACLE một màu kem (bóng đổ nâu mềm) đan qua hàng ảnh (ảnh chẵn trên chữ, ảnh lẻ dưới chữ), chạy liên tục;
 *   nhãn giới thiệu nền kem + nút nằm phía trước slide.
 *   Câu chuyện: 1 ảnh lớn làm nền section cuộn theo trang, chữ sticky giữa viewport.
 *   Bảng giá (ngược lại): ảnh nền sticky phủ viewport, khối nội dung cuộn lên trên.
 *   Concept (desktop): ảnh sticky, chữ cuộn, ảnh mới trồi lên che ảnh cũ. Chỉ dùng CSS sticky, không ghim bằng JS.
 *   Đánh giá: section cao đúng 1 màn hình, lưới 8 ô trong suốt sát nhau (4×2, dưới lg 2×4) kẻ đường mảnh trên nền chữ TESTIMONIALS;
 *   tiêu đề lớn đè hàng dưới (theo ảnh mẫu). Rê chuột -> ô lật sang ảnh đánh giá gốc, nền đổi thành chính ảnh đánh giá đó căn vào khung chữ,
 *   chữ TESTIMONIALS + tên các ô + tiêu đề ẩn đi;
 *   bấm ô đã lật mở ảnh gốc cỡ lớn. Cảm ứng: chạm 1 lật, chạm 2 mở. Bài dài thu nhỏ hiện trọn; hàng 2 đẩy chữ lên nửa trên.
 *   Bộ sưu tập: 4 cột ảnh (mobile 2) chạy dọc liên tục, cột xen kẽ lên/xuống, rê chuột vào cột nào thì cột đó dừng, bấm xem lớn.
 *   Concept chi tiết: bảng trượt vào từ phải (1.1s) và trượt ra khi đóng; bên trong là lưới ảnh 2 cột.
 *   Concept (desktop): bấm 3 ảnh phụ dưới mô tả -> ảnh đó trượt từ phải vào khung sticky, đổi chỗ với ảnh chính.
 *   Phụ trợ: tiêu đề hiện theo dòng, ảnh hiện theo clip. Tắt chuyển động khi prefers-reduced-motion.
 * Icons: chỉ icon chức năng (đóng, mũi tên, điện thoại, Zalo/Messenger). Không sao, không badge trang trí.
 * Conversion: Đặt lịch chụp (form soạn sẵn tin nhắn -> Zalo/Messenger) + nút Zalo/Messenger nổi.
 * Avoid: thẻ icon giống nhau, gradient, glassmorphism, đếm số liệu, review tự viết, giá tự đặt.
 */
export {}
