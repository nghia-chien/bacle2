import type { Photo } from './images'

/** Toàn bộ ảnh xem được trong lightbox của Bộ sưu tập */
export const gallery: Photo[] = [
  { id: 91, alt: 'Cô dâu nghiêng đầu với bó hoa trắng trong studio' },
  { id: 17, alt: 'Cặp đôi đưa tay tạo dáng vui nhộn trong rừng' },
  { id: 71, alt: 'Cô dâu áo dài trắng cầm hoa rum' },
  { id: 98, alt: 'Chú rể ngồi trên ghế đen, cô dâu đứng phía sau' },
  { id: 61, alt: 'Ảnh đen trắng cô dâu cười bên chú rể' },
  { id: 99, alt: 'Cặp đôi bên bàn tiệc ngập hoa' },
  { id: 16, alt: 'Cặp đôi giữa khu rừng xanh' },
  { id: 87, alt: 'Chú rể đeo nhẫn cho cô dâu trước vòm hoa' },
  { id: 50, alt: 'Cô dâu ngồi giữa hoa đồng nội' },
  { id: 35, alt: 'Cặp đôi áo dài đỏ cầm quạt' },
  { id: 62, alt: 'Cô dâu và phù dâu trước cổng hoa' },
  { id: 57, alt: 'Cô dâu chú rể cười rạng rỡ dưới nắng' },
]

/** Lưới 2 hàng × 3 ảnh chạy ngang (chỉ số trong `gallery`) */
export const galleryRows: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
]

/**
 * Lưới ảnh giới thiệu 4×4: mỗi layout luôn có 2 ảnh dọc (1×2) + 2 ảnh ngang (2×1) + 8 ảnh vuông.
 * Có 3 ảnh dọc và 3 ảnh ngang luân phiên: ảnh không có chỗ ở layout nào thì ẩn, quay lại ở layout sau.
 * `at` = vị trí [cột, hàng] bắt đầu trong từng layout A/B/C; null = ẩn ở layout đó.
 */
export type TileShape = 'sq' | 'wide' | 'tall'

export interface IntroTile {
  photo: Photo
  shape: TileShape
  at: [[number, number] | null, [number, number] | null, [number, number] | null]
}

export const introGrid = { cols: 4, rows: 4 }

export const introTiles: IntroTile[] = [
  { shape: 'tall', photo: { id: 31, alt: 'Cặp đôi trên cầu thang cổ điển dưới đèn chùm' }, at: [[1, 1], null, [3, 1]] },
  { shape: 'tall', photo: { id: 87, alt: 'Chú rể đeo nhẫn cho cô dâu trước vòm hoa' }, at: [[4, 2], [1, 2], null] },
  { shape: 'tall', photo: { id: 91, alt: 'Cô dâu nghiêng đầu với bó hoa trắng' }, at: [null, [4, 3], [1, 3]] },
  { shape: 'wide', photo: { id: 30, alt: 'Cô dâu chú rể bên cầu thang xoắn cổ điển' }, at: [[2, 1], null, [3, 3]] },
  { shape: 'wide', photo: { id: 62, alt: 'Cô dâu và phù dâu trước cổng hoa' }, at: [[1, 3], [3, 1], null] },
  { shape: 'wide', photo: { id: 59, alt: 'Cặp đôi giơ tay ăn mừng trước phông vải trắng' }, at: [null, [2, 2], [1, 1]] },
  { shape: 'sq', photo: { id: 57, alt: 'Cô dâu chú rể cười rạng rỡ dưới nắng', focus: '50% 30%' }, at: [[4, 1], [1, 1], [4, 1]] },
  { shape: 'sq', photo: { id: 1, alt: 'Ảnh đen trắng cặp đôi hôn nhau', focus: '50% 30%' }, at: [[2, 2], [2, 1], [1, 2]] },
  { shape: 'sq', photo: { id: 50, alt: 'Cô dâu ngồi giữa hoa đồng nội' }, at: [[3, 2], [4, 2], [2, 2]] },
  { shape: 'sq', photo: { id: 16, alt: 'Cặp đôi giữa khu rừng xanh' }, at: [[3, 3], [2, 3], [4, 2]] },
  { shape: 'sq', photo: { id: 61, alt: 'Ảnh đen trắng cô dâu cười bên chú rể' }, at: [[1, 4], [3, 3], [2, 3]] },
  { shape: 'sq', photo: { id: 17, alt: 'Cặp đôi đưa tay tạo dáng trong rừng' }, at: [[2, 4], [1, 4], [2, 4]] },
  { shape: 'sq', photo: { id: 71, alt: 'Cô dâu áo dài trắng cầm hoa rum' }, at: [[3, 4], [2, 4], [3, 4]] },
  { shape: 'sq', photo: { id: 98, alt: 'Chú rể ngồi trên ghế đen, cô dâu đứng phía sau' }, at: [[4, 4], [3, 4], [4, 4]] },
]
