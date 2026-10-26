import type { Photo } from './images'
import { hero } from './content'
import { concepts } from './concepts'

export const gallery: Photo[] = [
  { id: 91, ratio: '4/5', alt: 'Cô dâu nghiêng đầu với bó hoa trắng trong studio' },
  { id: 61, alt: 'Ảnh đen trắng cô dâu cười bên chú rể' },
  { id: 16, alt: 'Cặp đôi giữa khu rừng xanh' },
  { id: 64, ratio: '3/2', alt: 'Cô dâu đội voan ren nhìn xuống' },
  { id: 87, alt: 'Chú rể đeo nhẫn cho cô dâu trước vòm hoa' },
  { id: 31, alt: 'Cặp đôi trên cầu thang cổ điển dưới đèn chùm' },
  { id: 50, ratio: '4/5', alt: 'Cô dâu ngồi giữa hoa đồng nội' },
  { id: 1, alt: 'Ảnh đen trắng cặp đôi hôn nhau' },
  { id: 17, alt: 'Cặp đôi đưa tay tạo dáng vui nhộn trong rừng' },
  { id: 71, alt: 'Cô dâu áo dài trắng cầm hoa rum' },
  { id: 62, ratio: '3/2', alt: 'Cô dâu và phù dâu trước cổng hoa' },
  { id: 98, ratio: '4/5', alt: 'Chú rể ngồi trên ghế đen, cô dâu đứng phía sau' },
  { id: 35, alt: 'Cặp đôi áo dài đỏ cầm quạt' },
  { id: 99, alt: 'Cặp đôi bên bàn tiệc ngập hoa' },
]

/**
 * Toàn bộ ảnh cưới đơn đã duyệt trên trang (bộ sưu tập + hero + các concept), bỏ trùng.
 * Dùng cho các cột ảnh chạy liên tục ở mục Bộ sưu tập để khách xem được nhiều ảnh hơn.
 */
export const moments: Photo[] = (() => {
  const seen = new Set<number>()
  return [...gallery, ...hero.reel, ...concepts.flatMap((c) => [c.cover, ...c.photos])].filter((p) => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  })
})()
