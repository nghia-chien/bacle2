import { useRef, useState } from 'react'
import { testimonialsIntro } from '../data/content'
import type { Photo } from '../data/images'
import { testimonials } from '../data/testimonials'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { Lightbox } from './ui/Lightbox'

const originals: Photo[] = testimonials.map((t) => t.original)
const background: Photo = { id: 61, alt: '', focus: '50% 30%' }
// Chia ảnh đánh giá thành 2 cột xen kẽ; mỗi cột nhân đôi để chạy hết nửa đầu thì nửa sau nằm đúng chỗ cũ
const columns = [0, 1].map((c) => testimonials.map((_, i) => i).filter((i) => i % 2 === c))
const COLUMN_SECONDS = [46, 54]

/**
 * Lời khách bằng ảnh: nền ảnh tối, tiêu đề lớn bên trái, bên phải 2 cột ảnh chụp đánh giá gốc
 * chạy ngược chiều nhau. Bấm ảnh để xem lớn. Rê chuột hoặc focus vào khung thì dừng.
 * Khung có chiều cao cố định nên section không đổi chiều cao. Giảm chuyển động: không chạy, khung tự cuộn được.
 */
export function Testimonials() {
  const scope = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  useReveal(scope)

  return (
    <section
      ref={scope}
      id="danh-gia"
      aria-labelledby="testimonials-title"
      className="relative isolate overflow-hidden bg-deep px-4 py-24 text-on-dark md:px-8 md:py-32"
    >
      <div aria-hidden className="absolute inset-0 -z-10 opacity-25 grayscale">
        <Img photo={background} sizes="100vw" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-deep via-deep/85 to-deep/50" />

      <div className="mx-auto grid max-w-[80rem] items-center gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="testimonials-title" data-lines className="not-italic">
            <span className="block overflow-hidden">
              <span data-line className="caps block text-champagne">
                {testimonialsIntro.script}
              </span>
            </span>
            <span className="mt-4 block overflow-hidden pb-[0.1em]">
              <span data-line className="block text-[3.5rem] leading-[0.95] uppercase md:text-[6rem]">
                {testimonialsIntro.title}
              </span>
            </span>
          </h2>
          <p data-reveal="up" className="mt-6 max-w-sm text-sm text-on-dark-soft">
            {testimonials.length} đánh giá thật từ Facebook và Google. Bấm vào ảnh để xem lớn.
          </p>
        </div>

        <div
          role="region"
          aria-label="Ảnh đánh giá của khách, tự chạy"
          className="group relative grid h-[30rem] grid-cols-2 gap-3 overflow-hidden motion-reduce:overflow-y-auto md:h-[38rem] md:gap-5 lg:col-span-7 lg:col-start-6"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          }}
        >
          {columns.map((col, c) => (
            <ul
              key={c}
              className={`animate-[marquee-y_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none ${
                c === 1 ? '[animation-direction:reverse]' : ''
              }`}
              style={{ animationDuration: `${COLUMN_SECONDS[c]}s` }}
            >
              {[...col, ...col].map((i, k) => {
                const t = testimonials[i]
                const copy = k >= col.length
                return (
                  <li key={k} aria-hidden={copy || undefined} className="pb-3 md:pb-5">
                    <button
                      type="button"
                      tabIndex={copy ? -1 : 0}
                      onClick={() => setOpen(i)}
                      aria-label={`Xem lớn đánh giá của ${t.name} trên ${t.source}`}
                      className="block aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl bg-deep-soft shadow-xl shadow-black/30 transition-transform duration-500 hover:scale-[1.02] md:rounded-2xl"
                    >
                      <Img photo={t.original} sizes="(min-width: 1024px) 28vw, 50vw" />
                    </button>
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
      </div>

      <Lightbox photos={originals} index={open} onChange={setOpen} label="Ảnh đánh giá gốc" />
    </section>
  )
}
