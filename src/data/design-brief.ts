/**
 * DESIGN BRIEF — BACLE Photography v2.1 (nguồn sự thật về hình ảnh của dự án, không render ra trang)
 * Mood: tươi sáng, lãng mạn, hiện đại, ấm áp. Nền trắng kem theo sale.md; màu chủ đạo đỏ rượu vang (primary),
 *   section tối dùng đỏ rượu vang thẫm (deep). Token trong src/styles/index.css (@theme static).
 * Reference mode: Adaptation — cơ chế từng section theo public/layout/*.md; header/lời khách/bảng gói/booking/footer theo ảnh mẫu.
 * Header: thanh nổi dạng capsule (logo trái, menu giữa, nút "Đặt lịch" phải), cuộn xuống ẩn, cuộn lên hiện, đánh dấu mục đang xem.
 * Type: Playfair Display + Be Vietnam Pro; Montserrat (font-grotesk) riêng cho section Quy trình;
 *   chữ ký Mrs Saint Delafield chỉ dùng 1 lần trong khung ngắm hero.
 * Media: ảnh bo góc nhẹ ở Giới thiệu/Portfolio, bo nhiều ở Moments; giữ tiêu điểm bằng object-position.
 * Motion: hero cuộn mở bung ảnh + chữ tách đôi; giới thiệu (chữ trái, ảnh phải) Flip chảy liên tục không dừng,
 *   mỗi layout 2 ảnh dọc + 2 ảnh ngang; coverflow rộng, tự quay 3.2s (dừng khi rê chuột/kéo/focus bàn phím);
 *   quy trình vừa 1 khung hình, mặt nạ clip-path theo hover/focus; Moments 2×3 chạy ngang + 3 dải lụa đỏ tự vẽ đan qua ảnh;
 *   lời khách chạy từ dưới lên, rê chuột thì dừng, khung cao cố định.
 * Reduced motion: hero mở sẵn; lưới đứng ở layout A; không tự quay; marquee dừng (cột lời khách tự cuộn được).
 * Icons: chỉ icon chức năng. Avoid: giá tự đặt, review tự viết, số liệu thống kê, thẻ icon giống nhau.
 */
export {}
