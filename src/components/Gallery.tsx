import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { galleryIntro } from '../data/content'
import { gallery, galleryRows } from '../data/gallery'
import { MOTION_OK, useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { Lightbox } from './ui/Lightbox'
import { SectionTitle } from './ui/SectionTitle'

// Dải lụa đỏ: đường cong hữu cơ, mỗi dải một bề rộng và nhịp vẽ/thu khác nhau
const RIBBONS = [
  { d: 'M-60 260 C 180 80, 380 520, 620 360 S 1000 60, 1260 300', width: 26, draw: 3.2, undraw: 2.4, ease: 'sine.inOut', delay: 0 },
  { d: 'M-60 760 C 240 600, 300 300, 600 520 S 980 900, 1260 620', width: 18, draw: 4.4, undraw: 3, ease: 'power2.inOut', delay: 2.2 },
  { d: 'M-60 520 C 160 420, 420 760, 700 600 S 1060 220, 1260 420', width: 11, draw: 2.6, undraw: 3.4, ease: 'power3.inOut', delay: 4.1 },
]

// Ánh lụa: dải màu tối → đỏ → sáng lặp theo chiều ngang, mô phỏng nếp lụa bắt sáng
const SHEEN = ['ribbon-dark', 'ribbon', 'ribbon-light', 'ribbon', 'ribbon-dark', 'ribbon', 'ribbon-light', 'ribbon', 'ribbon-dark']

// Hàng 1 và 2 chạy với tốc độ hơi khác nhau cho tự nhiên
const ROW_SECONDS = [34, 42]

/**
 * Moments: 2 hàng × 3 ảnh bo góc chạy ngang liên tục (nhân đôi ảnh để lặp liền mạch),
 * lớp SVG dải lụa đỏ z-10 nằm giữa: ảnh z-5 nằm dưới ruy băng, ảnh z-15 nằm trên, tạo cảm giác đan qua.
 */
export function Gallery() {
  const scope = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  useReveal(scope)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<SVGGElement>('[data-ribbon]').forEach((group, i) => {
          const r = RIBBONS[i]
          // Bóng, thân lụa và vệt sáng vẽ/thu cùng nhau
          const strokes = group.querySelectorAll('path')
          gsap
            .timeline({ repeat: -1, delay: r.delay, repeatDelay: 0.3 })
            .fromTo(strokes, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: r.draw, ease: r.ease })
            .to(strokes, { strokeDashoffset: -1, duration: r.undraw, ease: r.ease }, `+=${0.6 + i * 0.3}`)
        })
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
              const over = (k + r) % 2 === 0
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
