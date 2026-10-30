import { useRef, useState } from 'react'
import { testimonialsIntro } from '../data/content'
import type { Photo } from '../data/images'
import { testimonials } from '../data/testimonials'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { Lightbox } from './ui/Lightbox'

const originals: Photo[] = testimonials.map((t) => t.original)
const background: Photo = { id: 61, alt: '', focus: '50% 30%' }
// Nhân đôi danh sách: chạy hết nửa đầu thì nửa sau nằm đúng chỗ cũ, vòng lặp liền mạch
const loop = [...testimonials, ...testimonials]

/**
 * Lời khách kiểu "client notes": nền ảnh tối, tiêu đề lớn bên trái, cột trích dẫn bên phải tự chạy từ dưới lên.
 * Rê chuột hoặc focus vào cột thì dừng. Khung cột có chiều cao cố định nên section không đổi chiều cao.
 * Giảm chuyển động: không chạy, cột tự cuộn được.
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
            {testimonials.length} đánh giá thật từ Facebook và Google. Rê chuột vào cột để dừng đọc.
          </p>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-label="Danh sách đánh giá, tự chạy"
          className="group relative h-[30rem] overflow-hidden focus-visible:outline-offset-4 motion-reduce:overflow-y-auto md:h-[36rem] lg:col-span-6 lg:col-start-7"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <ul className="animate-[marquee-y_60s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
            {loop.map((t, k) => {
              const copy = k >= testimonials.length
              return (
                <li key={k} aria-hidden={copy || undefined} className="border-b border-on-dark/15 py-8">
                  <blockquote className="font-display text-lg leading-relaxed text-on-dark md:text-xl">“{t.quote}”</blockquote>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <p className="caps text-on-dark-soft">
                      — {t.name} · {t.source}
                    </p>
                    <button
                      type="button"
                      tabIndex={copy ? -1 : 0}
                      onClick={() => setOpen(k % testimonials.length)}
                      className="caps cursor-pointer text-champagne underline-offset-4 transition-colors hover:text-on-dark hover:underline"
                    >
                      Xem ảnh gốc
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <Lightbox photos={originals} index={open} onChange={setOpen} label="Ảnh đánh giá gốc" />
    </section>
  )
}
