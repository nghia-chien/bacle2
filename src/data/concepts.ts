import type { Photo } from './images'

export interface Concept {
  slug: string
  name: string
  kind: 'Studio' | 'Ngoại cảnh' | 'Ngày cưới'
  summary: string
  cover: Photo
  photos: Photo[]
}

// Tên concept được đặt theo nhóm ảnh thực tế của BACLE (giả định thiết kế, cần studio xác nhận).
export const concepts: Concept[] = [
  {
    slug: 'studio-toi-gian',
    name: 'Studio tối giản',
    kind: 'Studio',
    summary: 'Phông trắng sạch, ánh sáng mềm, cảm xúc của hai bạn là trung tâm.',
    cover: { id: 10, alt: 'Cặp đôi tựa vào nhau trong studio phông trắng' },
    photos: [
      { id: 12, alt: 'Cặp đôi ôm nhau trong studio phông trắng' },
      { id: 33, alt: 'Cô dâu chú rể đứng cạnh nhau trên nền xám nhạt' },
      { id: 13, alt: 'Cặp đôi bước về phía nhau trong studio' },
      { id: 37, alt: 'Chú rể nắm tay cô dâu trên nền xám' },
      { id: 98, alt: 'Chú rể ngồi trên ghế đen, cô dâu đứng phía sau' },
      { id: 20, alt: 'Cô dâu chú rể đứng tạo dáng trong studio trắng' },
      { id: 39, alt: 'Cặp đôi ôm nhau, cô dâu nhắm mắt cười' },
      { id: 100, alt: 'Cặp đôi ngồi cạnh nhau trên nền trắng' },
    ],
  },
  {
    slug: 'studio-hoa',
    name: 'Studio hoa pastel',
    kind: 'Studio',
    summary: 'Hoa tươi trên nền xanh mint dịu, không khí trong trẻo, tươi tắn.',
    cover: { id: 47, alt: 'Cô dâu cười ôm bó hoa, chú rể ôm từ phía sau' },
    photos: [
      { id: 43, alt: 'Cặp đôi nhìn nhau cười trong studio hoa' },
      { id: 50, alt: 'Cô dâu ngồi giữa hoa đồng nội' },
      { id: 41, alt: 'Cô dâu ngồi ghế trắng, chú rể đứng sau, xung quanh là hoa' },
      { id: 45, alt: 'Chú rể bế chú chó nhỏ giữa hoa' },
      { id: 48, alt: 'Cô dâu vén khăn voan bên chú rể' },
      { id: 51, alt: 'Cặp đôi cùng chú chó nhỏ trong studio' },
      { id: 54, alt: 'Cặp đôi giơ tay vui vẻ giữa hoa' },
    ],
  },
  {
    slug: 'rung-xanh',
    name: 'Rừng xanh',
    kind: 'Ngoại cảnh',
    summary: 'Ngoại cảnh giữa tán cây, tự nhiên và nhiều tiếng cười.',
    cover: { id: 16, alt: 'Cặp đôi nhỏ bé giữa khu rừng xanh rộng lớn' },
    photos: [
      { id: 17, alt: 'Cặp đôi đưa tay tạo dáng vui nhộn trong rừng' },
      { id: 14, alt: 'Cô dâu và chú rể tạo hình trái tim bằng tay' },
      { id: 18, alt: 'Chú rể cười, cô dâu tạo dáng phía sau giữa cây xanh' },
    ],
  },
  {
    slug: 'san-vuon',
    name: 'Sân vườn nắng',
    kind: 'Ngoại cảnh',
    summary: 'Nắng, cỏ và phông vải trắng ngoài trời, nhẹ nhàng và lãng mạn.',
    cover: { id: 52, alt: 'Cô dâu chú rể đứng trước phông vải trắng giữa vườn' },
    photos: [
      { id: 57, alt: 'Cô dâu chú rể cười rạng rỡ dưới nắng' },
      { id: 59, alt: 'Cặp đôi giơ tay ăn mừng trước phông vải trắng' },
      { id: 44, alt: 'Cô dâu ngồi bên bàn trắng, chú rể đứng cạnh giữa hoa lá' },
      { id: 58, alt: 'Cặp đôi đứng tựa tường, bóng nắng in trên tường' },
    ],
  },
  {
    slug: 'co-dien',
    name: 'Kiến trúc cổ điển',
    kind: 'Ngoại cảnh',
    summary: 'Cầu thang, khung cửa và ánh sáng mang dáng dấp châu Âu cổ điển.',
    cover: { id: 31, alt: 'Cặp đôi trên cầu thang cổ điển dưới đèn chùm' },
    photos: [
      { id: 30, alt: 'Cô dâu chú rể bên cầu thang cổ điển' },
      { id: 28, alt: 'Cặp đôi trước dãy cửa sổ vòm' },
      { id: 32, alt: 'Cặp đôi ôm nhau nhìn qua hàng lan can' },
    ],
  },
  {
    slug: 'ngay-cuoi',
    name: 'Phóng sự ngày cưới',
    kind: 'Ngày cưới',
    summary: 'Lễ gia tiên, vu quy, nhà thờ và tiệc cưới, ghi lại trọn ngày chung đôi.',
    cover: { id: 87, alt: 'Chú rể đeo nhẫn cho cô dâu trước vòm hoa' },
    photos: [
      { id: 26, alt: 'Cô dâu chú rể áo dài đỏ trong lễ gia tiên' },
      { id: 8, alt: 'Cô dâu ôm người thân trong lễ gia tiên' },
      { id: 103, alt: 'Cô dâu áo dài trắng cầm quạt cười' },
      { id: 66, alt: 'Cô dâu cúi đầu trong thánh lễ' },
      { id: 74, alt: 'Cô dâu chú rể bước vào lễ đường nhà thờ' },
      { id: 92, alt: 'Chú rể cầm hoa giữa tiệc cưới' },
      { id: 60, alt: 'Cô dâu áo dài đỏ ôm chú chó nhỏ' },
      { id: 86, alt: 'Cặp đôi cầm phong bì đỏ trong lễ vu quy' },
      { id: 84, alt: 'Cô dâu chú rể nắm tay trong nhà thờ' },
      { id: 104, alt: 'Đội bưng quả cười trên phố' },
      { id: 90, alt: 'Cô dâu áo dài đỏ thổi cánh hoa' },
      { id: 40, alt: 'Cặp đôi áo dài đỏ trước cổng hoa' },
    ],
  },
]
