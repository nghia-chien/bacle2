import type { Photo } from './images'

export const hero = {
  /** Tiêu đề tách đôi: phần trái trên + phần phải dưới, tách ra và mờ dần khi cuộn */
  splitTop: 'BACLE',
  splitBottom: 'Photography',
  kicker: 'Chụp ảnh cưới · TP. Hồ Chí Minh',
  tagline: 'all you need is love',
  media: {
    id: 28,
    alt: 'Cô dâu chú rể nắm tay trong sảnh cửa sổ vòm ngập nắng',
    focus: '44% 62%',
  } satisfies Photo,
  /** Nhãn khung ngắm hiện khi ảnh gần phủ kín màn hình */
  frame: { left: 'BACLE Photography', right: 'TP. Hồ Chí Minh' },
  primaryCta: { label: 'Đặt lịch chụp', href: '#dat-lich' },
  secondaryCta: { label: 'Xem concept', href: '#portfolio' },
}

/** Đoạn văn hiện dần từng chữ ngay sau hero */
export const manifesto =
  'BACLE Photography là studio chụp ảnh cưới tại TP. Hồ Chí Minh, dành cho những cặp đôi đang chuẩn bị về chung một nhà. Tông ảnh tươi sáng, nhẹ nhàng, giữ lại cảm xúc thật nhất của hai bạn.'

export const about = {
  script: 'về BACLE',
  title: 'Xin chào, chúng mình là BACLE',
  body: 'Concept đa dạng: studio tối giản, studio hoa, ngoại cảnh và phóng sự ngày cưới. Ekip đồng hành từ khâu tư vấn, chọn váy, makeup đến buổi chụp.',
  cta: { label: 'Nhắn tư vấn qua Zalo' },
}

export const portfolioIntro = {
  script: 'portfolio',
  title: 'Concept của BACLE',
  body: 'Kéo, vuốt hoặc dùng phím mũi tên để xem. Bấm vào ảnh ở giữa để xem chi tiết concept.',
}

export interface ProcessStep {
  no: string
  title: string
  body: string
  photo: Photo
}

export const processIntro = {
  script: 'quy trình',
  title: 'Từ lời tư vấn đến bộ ảnh cưới',
  /** Ảnh mặc định khi chưa chọn bước nào */
  cover: { id: 31, alt: 'Cặp đôi trên cầu thang cổ điển dưới đèn chùm' } satisfies Photo,
}

// Các bước lấy từ những gì khách đã kể lại trong đánh giá (tư vấn, chọn váy, makeup, chụp, nhận hình).
export const processSteps: ProcessStep[] = [
  {
    no: '01',
    title: 'Tư vấn',
    body: 'Trao đổi ngày chụp, phong cách và chọn concept hợp với hai bạn.',
    photo: { id: 43, alt: 'Cặp đôi nhìn nhau cười trong studio hoa' },
  },
  {
    no: '02',
    title: 'Váy & makeup',
    body: 'Ekip hỗ trợ chọn trang phục và trang điểm kỹ trước giờ chụp.',
    photo: { id: 64, alt: 'Cô dâu đội voan ren nhìn xuống', focus: '70% 40%' },
  },
  {
    no: '03',
    title: 'Ngày chụp',
    body: 'Được hướng dẫn tạo dáng tận tình để hai bạn thoải mái, tự nhiên.',
    photo: { id: 13, alt: 'Cặp đôi bước về phía nhau trong studio' },
  },
  {
    no: '04',
    title: 'Nhận ảnh',
    body: 'BACLE gửi lại bộ ảnh hoàn thiện để hai bạn lưu giữ.',
    photo: { id: 1, alt: 'Ảnh đen trắng cặp đôi hôn nhau', focus: '50% 30%' },
  },
]

export const galleryIntro = {
  script: 'moments',
  title: 'Bộ sưu tập',
  body: 'Một vài khoảnh khắc BACLE đã lưu giữ. Bấm vào ảnh để xem lớn.',
}

export const testimonialsIntro = {
  script: 'chia sẻ thật từ khách',
  title: 'Lời khách',
}

export const bookingIntro = {
  script: "let's begin",
  title: 'Đặt lịch chụp',
  body: 'Điền thông tin bên dưới, nội dung sẽ được soạn sẵn để bạn gửi cho BACLE qua Zalo hoặc Messenger.',
}

export const footer = {
  note: 'Studio chụp ảnh cưới tại TP. Hồ Chí Minh.',
}
