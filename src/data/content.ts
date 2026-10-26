import type { Photo } from './images'

export const hero = {
  wordmark: 'BACLE',
  sub: 'Photography',
  meta: '',
  headline: [''],
  primaryCta: { label: 'Đặt lịch chụp', href: '#dat-lich' },
  secondaryCta: { label: 'Xem concept', href: '#concept' },
  /** Dải ảnh chạy từ phải sang trái, ảnh sau đè ảnh trước, so le trên/dưới */
  reel: [
    { id: 57, alt: 'Cô dâu chú rể cười rạng rỡ dưới nắng', focus: '50% 30%' },
    { id: 91, alt: 'Cô dâu nghiêng đầu với bó hoa trắng trong studio' },
    { id: 1, alt: 'Ảnh đen trắng cặp đôi hôn nhau', focus: '50% 30%' },
    { id: 47, alt: 'Cô dâu cười ôm bó hoa, chú rể ôm từ phía sau' },
    { id: 31, alt: 'Cặp đôi trên cầu thang cổ điển dưới đèn chùm' },
    { id: 50, alt: 'Cô dâu ngồi giữa hoa đồng nội' },
    { id: 61, alt: 'Ảnh đen trắng cô dâu cười bên chú rể' },
    { id: 87, alt: 'Chú rể đeo nhẫn cho cô dâu trước vòm hoa' },
  ] satisfies Photo[],
}

export const story = {
  script: 'our story',
  title: 'Mỗi cặp đôi, một câu chuyện riêng',
  body: 'Từ buổi chụp trong studio, ngoài thiên nhiên đến trọn vẹn ngày cưới, BACLE đồng hành để giữ lại cảm xúc thật nhất của hai bạn.',
  cta: { label: 'Xem bộ sưu tập', href: '#bo-suu-tap' },
  /** Ảnh dọc lớn làm nền cả section, cuộn theo trang; chữ đứng yên giữa viewport */
  background: { id: 31, alt: 'Cặp đôi trên cầu thang cổ điển dưới đèn chùm', focus: '50% 40%' } satisfies Photo,
}

export const about = {
  title: 'Xin chào, chúng mình là BACLE',
  script: 'all you need is love',
  paragraphs: [
    'BACLE Photography là studio chụp ảnh cưới tại TP. Hồ Chí Minh, dành cho những cặp đôi đang chuẩn bị về chung một nhà.',
    'Tông ảnh tươi sáng, nhẹ nhàng. Concept đa dạng: studio tối giản, studio hoa, ngoại cảnh và phóng sự ngày cưới.',
  ],
  cta: { label: 'Nhắn tư vấn qua Zalo' },
  main: { id: 72, alt: 'Chân dung đen trắng cô dâu nhìn nghiêng' } satisfies Photo,
  inset: { id: 80, alt: 'Cận cảnh bàn tay cô dâu đeo nhẫn cưới' } satisfies Photo,
}

export const conceptsIntro = {
  script: 'the',
  title: 'Concept',
  body: 'Bấm vào từng concept để xem thêm ảnh và chọn phong cách hợp với hai bạn.',
}

export const galleryIntro = {
  script: 'moments',
  title: 'Bộ sưu tập',
  body: 'Một vài khoảnh khắc BACLE đã lưu giữ.',
}

export const testimonialsIntro = {
  script: 'kind words',
  title: 'Lời khách',
  body: 'Những chia sẻ thật từ các cặp đôi đã chụp cùng BACLE.',
}

export const bookingIntro = {
  script: "let's begin",
  title: 'Đặt lịch chụp',
  body: 'Điền thông tin bên dưới, nội dung sẽ được soạn sẵn để bạn gửi cho BACLE qua Zalo hoặc Messenger.',
}

export const footer = {
  note: 'Studio chụp ảnh cưới tại TP. Hồ Chí Minh.',
}
