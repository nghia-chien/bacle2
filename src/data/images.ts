export interface Photo {
  id: number
  alt: string
  /** CSS object-position khi cần giữ tiêu điểm */
  focus?: string
  /** Tỉ lệ khung ảnh gốc, mặc định 2/3 */
  ratio?: '2/3' | '4/5' | '3/2' | '1/1'
}

const pad = (id: number) => String(id).padStart(3, '0')

export const photoSrc = (id: number, width: 800 | 1600 = 800) => `/images/bacle-${pad(id)}-${width}.webp`

export const photoSrcSet = (id: number) => `${photoSrc(id, 800)} 800w, ${photoSrc(id, 1600)} 1600w`

export const logo = {
  dark: '/images/logo-dark.png',
  light: '/images/logo-light.png',
  // Cropped transparent mark; the side swashes sit at 57% of its height
  mark: '/images/logo-mark.png',
  alt: 'BACLE Photography',
}
