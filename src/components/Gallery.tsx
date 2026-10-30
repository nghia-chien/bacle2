import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { galleryIntro } from '../data/content'
import { gallery, galleryRows } from '../data/gallery'
import { MOTION_OK, useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { Lightbox } from './ui/Lightbox'
import { SectionTitle } from './ui/SectionTitle'

/**
 * Dải lụa đỏ: đuôi giữ ở mép trái, đầu dải đưa tới đưa lui như vải bay trong gió.
 * `d` / `flutter`: hai dáng cong cùng cấu trúc lệnh, nội suy qua lại để thân vải gợn sóng.
 * `reach`: khoảng đầu dải dao động (tỉ lệ chiều dài đường); `pace`: khoảng thời gian mỗi lần đưa (giây).
 */
// Một dải duy nhất, cong chéo qua cả hai hàng ảnh để đan qua toàn khung
const RIBBONS = [
  {
    d: 'M-60 300 C 200 100, 420 780, 660 560 S 1000 200, 1260 480',
    flutter: 'M-60 300 C 220 160, 440 720, 680 600 S 980 260, 1220 400',
    width: 28,
    reach: [0.5, 1],
    pace: [1.4, 2.6],
    wave: 2.6,
  },
]

// Ánh lụa: dải màu tối → đỏ → sáng lặp theo chiều ngang, mô phỏng nếp lụa bắt sáng
const SHEEN = ['ribbon-dark', 'ribbon', 'ribbon-light', 'ribbon', 'ribbon-dark', 'ribbon', 'ribbon-light', 'ribbon', 'ribbon-dark']

// Hàng 1 và 2 chạy với tốc độ hơi khác nhau cho tự nhiên
const ROW_SECONDS = [34, 42]

/**
 * Moments: 2 hàng × 3 ảnh bo góc chạy ngang liên tục (nhân đôi ảnh để lặp liền mạch),
 * lớp SVG dải lụa đỏ z-10 nằm giữa: ảnh z-5 nằm dưới dải lụa, ảnh z-15 nằm trên, tạo cảm giác đan qua.
 */
export function Gallery() {
  const scope = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  useReveal(scope)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const swings: gsap.core.Tween[] = []
        gsap.utils.toArray<SVGGElement>('[data-ribbon]').forEach((group, i) => {
          const r = RIBBONS[i]
          // Bóng, thân lụa và vệt sáng chuyển động cùng nhau
          const strokes = group.querySelectorAll('path')

          // Đầu dải: mỗi lần đưa tới một điểm ngẫu nhiên rồi đưa tiếp, không lặp lại y hệt
          // (dasharray "1 1" + offset = 1 - vị trí đầu dải). Tween thuộc tính SVG, không dùng CSS
          // strokeDashoffset vì GSAP làm tròn giá trị px về số nguyên, đầu dải sẽ nhảy cóc.
          const swing = () => {
            swings[i] = gsap.to(strokes, {
              attr: { 'stroke-dashoffset': 1 - gsap.utils.random(r.reach[0], r.reach[1]) },
              duration: gsap.utils.random(r.pace[0], r.pace[1]),
              ease: 'sine.inOut',
              onComplete: swing,
            })
          }
          gsap.set(strokes, { attr: { 'stroke-dashoffset': 1 - r.reach[0] } })
          gsap.delayedCall(i * 0.5, swing)

          // Thân vải gợn: uốn qua lại giữa hai dáng cong
          gsap.to(strokes, { attr: { d: r.flutter }, duration: r.wave, ease: 'sine.inOut', repeat: -1, yoyo: true })
        })
        return () => swings.forEach((t) => t.kill())
      })
    },
    { scope },
  )

  return (
    <section ref={scope} id="bo-suu-tap" aria-labelledby="gallery-title" className="relative isolate bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[80rem] px-4 md:px-8">
        <SectionTitle id="gallery-title" script={galleryIntro.script} title={galleryIntro.title} />
        <p data-reveal="up" className="mx-auto mt-5 max-w-md text-center text-base text-ink-soft">
          {galleryIntro.body}
        </p>
      </div>

      {/* Không đặt z-index/transform ở lớp bọc để ảnh và SVG cùng một ngữ cảnh xếp chồng */}
      <div className="relative mt-12 md:mt-16">
        {galleryRows.map((row, r) => (
          <div key={r} className="flex overflow-hidden py-2 md:py-3.5">
            {[...row, ...row].map((photoIndex, k) => {
              const photo = gallery[photoIndex]
              // 1/3 số ảnh nằm trên dải lụa, còn lại nằm dưới: dải vẫn lộ rõ mà vẫn thấy đan qua ảnh
              const over = (k + r) % 3 === 0
              return (
                <button
                  key={k}
                  type="button"
                  tabIndex={k < row.length ? 0 : -1}
                  aria-hidden={k >= row.length}
                  aria-label={`Xem lớn: ${photo.alt}`}
                  onClick={() => setOpen(photoIndex)}
                  className={`relative w-1/3 shrink-0 cursor-zoom-in px-2 animate-[marquee-x_linear_infinite] motion-reduce:animate-none md:px-3.5 ${
                    over ? 'z-15' : 'z-5'
                  }`}
                  style={{ animationDuration: `${ROW_SECONDS[r]}s` }}
                >
                  <span className="block aspect-[4/5] overflow-hidden rounded-xl bg-sand md:aspect-square md:rounded-3xl">
                    <Img photo={photo} sizes="34vw" />
                  </span>
                </button>
              )
            })}
          </div>
        ))}

        <svg
          aria-hidden
          viewBox="0 0 1200 1000"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 z-10 size-full"
        >
          <defs>
            <linearGradient id="silk" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="240">
              {SHEEN.map((c, k) => (
                <stop key={k} offset={k / (SHEEN.length - 1)} style={{ stopColor: `var(--color-${c})` }} />
              ))}
            </linearGradient>
          </defs>
          {RIBBONS.map((r) => (
            <g key={r.d} data-ribbon className="fill-none" strokeLinecap="round">
              {/* bóng đổ mềm phía dưới */}
              <path d={r.d} pathLength={1} strokeDasharray="1 1" strokeWidth={r.width} transform="translate(0 6)" className="stroke-deep/20" />
              {/* thân lụa */}
              <path d={r.d} pathLength={1} strokeDasharray="1 1" strokeWidth={r.width} stroke="url(#silk)" />
              {/* vệt sáng dọc mép trên */}
              <path
                d={r.d}
                pathLength={1}
                strokeDasharray="1 1"
                strokeWidth={Math.max(2, r.width * 0.16)}
                transform={`translate(0 ${-r.width * 0.22})`}
                className="stroke-ribbon-light/70"
              />
            </g>
          ))}
        </svg>
      </div>

      <Lightbox photos={gallery} index={open} onChange={setOpen} label="Bộ sưu tập ảnh" />
    </section>
  )
}
