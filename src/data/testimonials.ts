import type { Photo } from './images'

export interface Testimonial {
  /** Tên hiển thị đúng như trên bài đánh giá */
  name: string
  source: 'Facebook' | 'Google'
  /**
   * Chép nguyên văn từ ảnh chụp đánh giá. Bài dài được rút gọn bằng "…" (không sửa chữ),
   * bản đầy đủ đọc ở ảnh gốc.
   */
  quote: string
  /** Ảnh chụp đánh giá gốc do BACLE cung cấp, mở trong lightbox */
  original: Photo
}

export const testimonials: Testimonial[] = [
  {
    name: 'Du Du',
    source: 'Google',
    quote:
      'Vừa trải nghiệm xong dịch vụ chụp pre-wedding và cả ảnh ngày cưới bên này… Ý là tui chụp ảnh hay bị đơ, vậy mà chụp cùng anh Bắc mà miệng không khép lại được luôn, cười từ đầu tới cuối!…',
    original: { id: 89, alt: 'Ảnh chụp đánh giá của Du Du trên Google' },
  },
  {
    name: 'Xuân An Lê',
    source: 'Facebook',
    quote:
      '…Phải nói là team thật sự chuyên nghiệp và nhiệt tình từ khâu tư vấn đến nhận hình luôn í. Anh Bắc chụp góc đẹp và còn hay ghẹo cười vợ chồng em nữa chứ, cứ sợ là bị gượng (ai ngờ là bị ghẹo, cười điên)…',
    original: { id: 6, alt: 'Ảnh chụp đánh giá của Xuân An Lê trên Facebook' },
  },
  {
    name: 'Trần Thu Thảo',
    source: 'Facebook',
    quote:
      'Mình vừa chụp gói Studio cực kỳ hài lòng. Team rất nhiệt tình, dễ thương, hỗ trợ tạo dáng tận tình. Nước ảnh trong, tự nhiên, không bị lỗi thời. Thành phẩm đẹp hơn mong đợi, rất xứng đáng. 100/100 điểm',
    original: { id: 5, alt: 'Ảnh chụp đánh giá của Trần Thu Thảo trên Facebook' },
  },
  {
    name: 'Duyên Nguyễn',
    source: 'Google',
    quote: 'Cảm ơn anh chị đã tạo cho e 1 buổi lễ đẹp như này ❤️❤️❤️',
    original: { id: 3, alt: 'Ảnh chụp đánh giá của Duyên Nguyễn trên Google' },
  },
  {
    name: 'Bengi',
    source: 'Google',
    quote:
      'My wife and I used the services from this studio for our wedding ceremony and we were extremely satisfied with the final results. … 10 out of 10 for the wonderful experience and highly recommend using their services ❤',
    original: { id: 93, alt: 'Ảnh chụp đánh giá của Bengi trên Google' },
  },
  {
    name: 'Huỳnh Như',
    source: 'Facebook',
    quote:
      'Mình rất hài lòng với buổi chụp ở studio 🥰 Từ khâu tư vấn, chọn váy đến makeup và chụp hình đều rất nhiệt tình, dễ thương. Ekip hỗ trợ cô dâu chú rể rất kỹ, tạo dáng cũng được hướng dẫn tận tình nên mình không bị ngại hay đơ…',
    original: { id: 11, alt: 'Ảnh chụp đánh giá của Huỳnh Như trên Facebook' },
  },
  {
    name: 'Lê Lợi',
    source: 'Facebook',
    quote:
      'Mình rất hài lòng với buổi chụp. Makeup rất kỹ và đẹp, lên hình tự nhiên. Bạn Bắc chụp hình chuyên nghiệp, nhiệt tình, vui vẻ, hài hước và tạo cảm giác rất thoải mái trong suốt buổi chụp…',
    original: { id: 88, alt: 'Ảnh chụp đánh giá của Lê Lợi trên Facebook' },
  },
  {
    name: 'Dương Trương',
    source: 'Google',
    quote:
      'Dịch vụ chụp ảnh ở Bắc Lê đẹp lắm. Anh Bắc canh góc rất đẹp cũng như focus mình rất nhiều. Rất hài lòng với mọi người ở đây, bạn Trúc makeup đẹp lắm nè. Nhìn nét rất Tây luôn',
    original: { id: 22, alt: 'Ảnh chụp đánh giá của Dương Trương trên Google' },
  },
]
