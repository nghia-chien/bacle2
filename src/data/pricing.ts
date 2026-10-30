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
  /** Thông số nhanh (thời lượng, số ảnh, trang phục...), hiện trong bảng thông tin khi rê chuột */
  specs?: { label: string; value: string }[]
  /** Quà tặng / ưu đãi kèm gói */
  bonus?: string
  photo: Photo
}

// BACLE chưa cung cấp giá. `specs` / `includes` / `bonus` dưới đây là nội dung MẪU theo gói chụp cưới
// phổ biến, cần studio xác nhận hoặc sửa lại; khi có giá, điền `price`, giao diện tự hiển thị.
export const packages: Package[] = [
  {
    slug: 'goi-studio',
    name: 'Studio',
    kind: 'Studio',
    summary: 'Chụp trong studio, phông tối giản hoặc hoa pastel.',
    specs: [
      { label: 'Thời lượng', value: '1 buổi (~4 giờ)' },
      { label: 'Trang phục', value: '2 váy cưới + 2 vest' },
      { label: 'Concept', value: '2 phông studio' },
      { label: 'Ảnh chỉnh sửa', value: '30 ảnh' },
    ],
    includes: [
      'Trang điểm & làm tóc cô dâu',
      'Toàn bộ file gốc qua Google Drive',
      'Album 25×25 cm (20 trang)',
      '1 ảnh phóng lớn 60×90 cm',
    ],
    bonus: 'Tặng 1 video hậu trường ngắn',
    photo: { id: 47, alt: 'Cô dâu cười ôm bó hoa trong studio hoa pastel' },
  },
  {
    slug: 'goi-ngoai-canh',
    name: 'Ngoại cảnh',
    kind: 'Ngoại cảnh',
    summary: 'Chụp ngoài trời giữa thiên nhiên và kiến trúc.',
    specs: [
      { label: 'Thời lượng', value: '1 ngày' },
      { label: 'Trang phục', value: '3 váy cưới + 2 vest' },
      { label: 'Địa điểm', value: '2 – 3 điểm tại TP.HCM' },
      { label: 'Ảnh chỉnh sửa', value: '50 ảnh' },
    ],
    includes: [
      'Trang điểm & làm tóc cô dâu, hỗ trợ trang phục tại chỗ',
      'Xe đưa đón ekip trong nội thành',
      'Toàn bộ file gốc qua Google Drive',
      'Album 30×30 cm (30 trang)',
      '1 ảnh phóng lớn 60×90 cm',
    ],
    bonus: 'Tặng video highlight 1 phút',
    photo: { id: 59, alt: 'Cặp đôi giơ tay ăn mừng trước phông vải trắng giữa vườn' },
  },
  {
    slug: 'goi-ngay-cuoi',
    name: 'Phóng sự ngày cưới',
    kind: 'Ngày cưới',
    summary: 'Ghi lại lễ gia tiên, vu quy, nhà thờ và tiệc cưới.',
    specs: [
      { label: 'Thời lượng', value: 'Lễ + tiệc (tối đa 10 giờ)' },
      { label: 'Ekip', value: '2 nhiếp ảnh gia' },
      { label: 'Ảnh chỉnh sửa', value: '150 ảnh' },
      { label: 'Trả ảnh', value: 'Sau 14 ngày' },
    ],
    includes: [
      'Chụp lễ gia tiên, vu quy / rước dâu, nhà thờ',
      'Chụp tiệc cưới và khách mời',
      'Toàn bộ file gốc qua Google Drive',
      'Album phóng sự 30×30 cm',
    ],
    bonus: 'Tặng 20 ảnh xem nhanh trong 48 giờ',
    photo: { id: 26, alt: 'Cô dâu chú rể áo dài đỏ trong lễ gia tiên' },
  },
]

export const pricing = {
  script: 'bảng gói',
  title: 'Chọn gói chụp',
  priceFallback: 'Liên hệ báo giá',
  note: 'Giá chi tiết được báo theo concept hai bạn chọn. Nhắn BACLE qua Zalo hoặc Messenger để nhận báo giá.',
}
