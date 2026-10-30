import type { Concept } from './concepts'
import type { Photo } from './images'

export interface Package {
  slug: string
  name: string
  /** Gom các concept cùng loại vào gói */
  kind: Concept['kind']
  summary: string
  /** Giá do BACLE cung cấp, ví dụ "8.500.000đ". Bỏ trống = hiển thị "Liên hệ báo giá". */
  price?: string
  /** Hạng mục trong gói do BACLE cung cấp. Bỏ trống = chỉ liệt kê concept. */
  includes?: string[]
  photo: Photo
}

// BACLE chưa cung cấp giá và hạng mục từng gói. Nhóm gói theo loại dịch vụ đã có ảnh thật;
// khi có số liệu, điền `price` / `includes`, giao diện tự hiển thị.
export const packages: Package[] = [
  {
    slug: 'goi-studio',
    name: 'Studio',
    kind: 'Studio',
    summary: 'Chụp trong studio, phông tối giản hoặc hoa pastel.',
    photo: { id: 47, alt: 'Cô dâu cười ôm bó hoa trong studio hoa pastel' },
  },
  {
    slug: 'goi-ngoai-canh',
    name: 'Ngoại cảnh',
    kind: 'Ngoại cảnh',
    summary: 'Chụp ngoài trời giữa thiên nhiên và kiến trúc.',
    photo: { id: 59, alt: 'Cặp đôi giơ tay ăn mừng trước phông vải trắng giữa vườn' },
  },
  {
    slug: 'goi-ngay-cuoi',
    name: 'Phóng sự ngày cưới',
    kind: 'Ngày cưới',
    summary: 'Ghi lại lễ gia tiên, vu quy, nhà thờ và tiệc cưới.',
    photo: { id: 26, alt: 'Cô dâu chú rể áo dài đỏ trong lễ gia tiên' },
  },
]

export const pricing = {
  script: 'bảng gói',
  title: 'Chọn gói chụp',
  priceFallback: 'Liên hệ báo giá',
  note: 'Giá chi tiết được báo theo concept hai bạn chọn. Nhắn BACLE qua Zalo hoặc Messenger để nhận báo giá.',
}
