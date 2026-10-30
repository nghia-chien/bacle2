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
 * Dải lụa sao băng: đầu sáng lướt dọc đường cong uốn lượn, đuôi thuôn nhỏ và nhạt dần phía sau.
 * `d` / `flutter`: hai dáng cong cùng cấu trúc lệnh, nội suy qua lại để đường bay đổi dáng mỗi lượt.
 * `scale`: hệ số bề rộng; `lag`: độ trễ so với sợi chính (tỉ lệ chiều dài đường).
 * Hai đầu đường nằm ngoài khung nên sao băng bay vào rồi bay ra khỏi màn hình.
 */
const STRANDS = [
  {
    d: 'M-240 640 C 60 380, 260 240, 430 420 S 560 840, 780 650 S 980 150, 1110 300 S 1280 560, 1460 360',
    flutter: 'M-240 600 C 80 420, 300 200, 460 380 S 540 800, 760 690 S 1000 200, 1130 260 S 1300 600, 1460 420',
    scale: 1,
    lag: 0,
  },
  // Sợi lụa mảnh xoắn quanh sợi chính, bay trễ một nhịp
  {
    d: 'M-240 600 C 40 440, 300 200, 470 470 S 520 780, 760 600 S 1020 200, 1120 360 S 1260 500, 1460 300',
    flutter: 'M-240 660 C 100 360, 260 260, 420 360 S 600 860, 800 700 S 960 140, 1100 240 S 1320 620, 1460 460',
    scale: 0.4,
    lag: 0.035,
  },
]

/**
 * Các lớp nét chồng nhau tạo đuôi thuôn: dài + mảnh + nhạt ở dưới, ngắn + dày + sáng ở trên.
 * `len` tính theo tỉ lệ chiều dài đường (pathLength = 1). Không đổ bóng, không vệt sáng giả khối.
 */
const TRAIL = [
  { len: 0.5, width: 2, color: 'ribbon-dark', opacity: 0.3 },
  { len: 0.38, width: 4, color: 'ribbon-dark', opacity: 0.55 },
  { len: 0.27, width: 7, color: 'ribbon', opacity: 0.8 },
  { len: 0.17, width: 11, color: 'ribbon', opacity: 1 },
  { len: 0.09, width: 15, color: 'ribbon-light', opacity: 1 },
  { len: 0.025, width: 9, color: 'on-dark', opacity: 1 },
]
const TAIL = TRAIL[0].len
// Vị trí đầu sao băng khi tắt chuyển động: dừng giữa khung
const STILL_HEAD = 0.75
// Dash dài `len`, khoảng trống 2 (> cả đường) để chỉ một đoạn hiện; đầu đoạn nằm tại `head`
// Dùng thuộc tính SVG (không dùng style) để lúc chạy setAttribute ghi đè được
const dash = (len: number, head: number) => ({
  strokeDasharray: `${len} 2`,
  strokeDashoffset: len - head,
})

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
        const paths = gsap.utils.toArray<SVGPathElement>('[data-trail]')
        // Đầu sao băng đi từ đầu đường tới quá cuối đường một khoảng bằng đuôi để đuôi cũng bay khỏi khung.
        // Ghi thẳng thuộc tính SVG: GSAP làm tròn strokeDashoffset kiểu CSS về số nguyên, nét sẽ nhảy cóc.
        const head = { t: 0 }
        const apply = () =>
          paths.forEach((p) => {
            const len = Number(p.dataset.len)
            p.setAttribute('stroke-dashoffset', String(len - (head.t - Number(p.dataset.lag))))
          })
        apply()
        gsap.to(head, {
          t: 1 + TAIL + 0.05,
          duration: 4.2,
          ease: 'power1.inOut',
          repeat: -1,
          repeatDelay: 1.2,
          onUpdate: apply,
        })

        // Đường bay uốn qua lại giữa hai dáng, lệch nhịp với vòng bay để mỗi lượt một dáng khác
        gsap.utils.toArray<SVGGElement>('[data-strand]').forEach((group) => {
          const i = Number(group.dataset.strand)
          gsap.to(group.querySelectorAll('path'), {
            attr: { d: STRANDS[i].flutter },
            duration: 3.1 + i * 0.7,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
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
          {/* Sợi mảnh vẽ trước để sợi chính nằm trên */}
          {STRANDS.map((s, i) => ({ s, i }))
            .reverse()
            .map(({ s, i }) => (
              <g key={s.d} data-strand={i} className="fill-none" strokeLinecap="round" strokeLinejoin="round">
                {TRAIL.map((t) => (
                  <path
                    key={t.len}
                    d={s.d}
                    data-trail
                    data-len={t.len}
                    data-lag={s.lag}
                    pathLength={1}
                    strokeWidth={Math.max(1, t.width * s.scale)}
                    {...dash(t.len, STILL_HEAD - s.lag)}
                    style={{
                      stroke: `var(--color-${t.color})`,
                      strokeOpacity: t.opacity,
                    }}
                  />
                ))}
              </g>
            ))}
        </svg>
      </div>

      <Lightbox photos={gallery} index={open} onChange={setOpen} label="Bộ sưu tập ảnh" />
    </section>
  )
}
