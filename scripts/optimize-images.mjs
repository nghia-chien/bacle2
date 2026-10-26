// Tạo bản WebP tối ưu từ ảnh gốc trong public/ (ảnh gốc giữ nguyên).
// Chạy: npm run images
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'public'
const OUT = 'public/images'
const WIDTHS = [800, 1600]

// Chỉ số theo thứ tự tên file (sort) trong public/, khớp với src/data/images.ts
const USED = [
  1, 3, 5, 6, 8, 10, 11, 12, 13, 14, 16, 17, 18, 20, 22, 26, 28, 30, 31, 32, 33, 35, 37, 39, 40, 41, 43,
  44, 45, 47, 48, 50, 51, 52, 54, 57, 58, 59, 60, 61, 62, 64, 66, 71, 72, 74, 76, 77, 80, 84, 86, 87,
  88, 89, 90, 91, 92, 93, 98, 99, 100, 103, 104,
]

const files = (await readdir(SRC)).filter((f) => f.toLowerCase().endsWith('.jpg')).sort()
await mkdir(OUT, { recursive: true })

for (const i of USED) {
  const file = files[i]
  if (!file) throw new Error(`Không tìm thấy ảnh #${i}`)
  for (const w of WIDTHS) {
    const name = `bacle-${String(i).padStart(3, '0')}-${w}.webp`
    await sharp(path.join(SRC, file)).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT, name))
  }
}

// Logo: nền trắng -> trong suốt, xuất bản tối và bản trắng
const logoSrc = path.join(SRC, files[0])
const { data, info } = await sharp(logoSrc).greyscale().raw().toBuffer({ resolveWithObject: true })
const alpha = Buffer.alloc(info.width * info.height)
for (let p = 0; p < alpha.length; p++) alpha[p] = Math.max(0, Math.min(255, Math.round((235 - data[p * info.channels]) * 1.35)))
for (const [name, rgb] of [['logo-dark', [43, 33, 28]], ['logo-light', [251, 248, 242]]]) {
  const px = Buffer.alloc(info.width * info.height * 4)
  for (let p = 0; p < alpha.length; p++) { px[p * 4] = rgb[0]; px[p * 4 + 1] = rgb[1]; px[p * 4 + 2] = rgb[2]; px[p * 4 + 3] = alpha[p] }
  await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } }).trim().resize({ width: 600 }).png().toFile(path.join(OUT, `${name}.png`))
}
console.log(`Đã tạo ${USED.length * WIDTHS.length} ảnh WebP + 2 logo trong ${OUT}`)
