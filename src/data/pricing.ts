import type { Photo } from './images'

export interface Package {
  name: string
  price: string
  includes: string[]
}

// BACLE chưa cung cấp bảng giá. Khi có, thêm gói vào `packages`; component sẽ tự hiển thị bảng.
const packages: Package[] = []

export const pricing = {
  script: 'packages',
  title: 'Bảng giá theo gói',
  packages,
  emptyNote:
    'Bảng giá chi tiết từng gói đang được cập nhật. Nhắn BACLE qua Zalo hoặc Messenger để nhận báo giá theo concept bạn chọn.',
  /** Ảnh nền đứng yên phủ viewport, khối nội dung cuộn lên trên */
  background: { id: 28, alt: 'Cặp đôi trước dãy cửa sổ vòm cổ điển' } satisfies Photo,
}
