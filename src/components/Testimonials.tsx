import { useRef, useState, type FocusEvent, type PointerEvent } from 'react'
import { testimonials } from '../data/testimonials'
import { testimonialsIntro } from '../data/content'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { photoSrc, photoSrcSet } from '../data/images'
import { Lightbox } from './ui/Lightbox'
import { SectionTitle } from './ui/SectionTitle'

const originals = testimonials.map((t) => t.original)

/**
 * Section cao đúng một màn hình. Lưới 8 ô trong suốt sát nhau (4×2, mobile 2×4), kẻ đường mảnh,
 * nền tối có chữ TESTIMONIALS; tiêu đề lớn đè lên hàng dưới như ảnh mẫu.
 * Rê chuột / focus vào ô: ô lật sang ảnh đánh giá gốc; nền đổi thành chính ảnh đánh giá đó, căn và phóng to
 * vào khung chữ (focus trong data); chữ TESTIMONIALS, tên ở các ô và tiêu đề ẩn đi để chữ trên nền dễ đọc.
 * Bấm vào ô đã lật mở ảnh gốc cỡ lớn để đọc đầy đủ. Trên màn cảm ứng: chạm lần 1 lật, chạm lần 2 mở.
 */
export function Testimonials() {
  const scope = useRef<HTMLElement>(null)
  const [flipped, setFlipped] = useState<number | null>(null)
  const [backdrop, setBackdrop] = useState<number | null>(null)
  const [viewing, setViewing] = useState<number | null>(null)
  useReveal(scope)

  const show = (i: number) => {
    setFlipped(i)
    setBackdrop(i)
  }
  const reset = () => {
    setFlipped(null)
    setBackdrop(null)
  }
  const isMouse = (e: PointerEvent) => e.pointerType === 'mouse'
  const onListBlur = (e: FocusEvent<HTMLUListElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) reset()
  }

  return (
    <section
      id="danh-gia"
      ref={scope}
      aria-labelledby="reviews-title"
      className="relative isolate flex h-dvh min-h-[36rem] flex-col overflow-clip bg-espresso pt-16 text-on-dark md:pt-[4.5rem]"
    >
      {/* Nền: chính ảnh đánh giá, căn vào khung chữ, chỉ hiện khi ô tương ứng được lật */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {testimonials.map((t, i) => {
          const on = backdrop === i
          const placed = t.fit === 'contain' || t.shiftY !== undefined
          return (
            <div
              key={t.name}
              className={`absolute inset-0 transition-[opacity,scale] duration-1000 ease-(--ease-soft) ${on ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
            >
              {/* Ảnh không phủ kín khung (thu nhỏ / đẩy lên) thì lấp phần trống bằng bản mờ của chính ảnh đó */}
              {placed ? (
                <img src={photoSrc(t.original.id)} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl" />
              ) : null}
              <img
                src={photoSrc(t.original.id, 1600)}
                srcSet={photoSrcSet(t.original.id)}
                sizes="100vw"
                alt=""
                loading="lazy"
                decoding="async"
                style={{ objectPosition: t.focus, translate: t.shiftY ? `0 -${t.shiftY}%` : undefined }}
                className={`absolute h-full w-full ${t.fit === 'contain' ? 'inset-[3%] h-[94%]! w-[94%]! object-contain' : 'inset-0 object-cover'}`}
              />
            </div>
          )
        })}
        <div
          className={`absolute inset-0 bg-espresso transition-opacity duration-700 ${backdrop === null ? 'opacity-100' : 'opacity-15'}`}
        />
        <p
          className={`absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[12.5vw] leading-none tracking-[-0.01em] text-on-dark/[0.11] uppercase transition-opacity duration-500 select-none ${
            backdrop === null ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Testimonials
        </p>
      </div>

      <div className="relative mx-auto flex min-h-0 w-full max-w-[90rem] flex-1 flex-col px-4 pt-3 pb-4 md:px-8 md:pt-6 md:pb-8">
        {/* Mobile: tiêu đề nằm trên lưới. Từ lg: tiêu đề lớn đè lên hàng dưới của lưới (như ảnh mẫu) */}
        <div className={`mb-3 flex items-end justify-between gap-4 transition-opacity duration-500 ${backdrop === null ? '' : 'opacity-0'} lg:pointer-events-none lg:absolute lg:inset-x-8 lg:bottom-8 lg:z-20 lg:mb-0 lg:pr-24 lg:pb-5 lg:pl-6`}>
          <div>
            <SectionTitle id="reviews-title" script={testimonialsIntro.script} title={testimonialsIntro.title} tone="light" align="left" />
          </div>
          <div data-reveal="up" className="max-w-[16rem] pb-2 text-right">
            <p className="hidden text-[0.9rem] text-on-dark/85 lg:block">{testimonialsIntro.body}</p>
            <a
              href={site.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="caps pointer-events-auto mt-4 inline-block border-b border-on-dark/50 pb-1 transition-colors hover:border-on-dark"
            >
              Fanpage BACLE
            </a>
          </div>
        </div>

        <ul
          className="grid min-h-0 flex-1 grid-cols-2 grid-rows-4 border-t border-l border-on-dark/25 lg:grid-cols-4 lg:grid-rows-2"
          aria-label="Đánh giá của khách hàng"
          onPointerLeave={(e) => isMouse(e) && reset()}
          onBlur={onListBlur}
        >
          {testimonials.map((t, i) => {
            const isFlipped = flipped === i
            return (
              <li
                key={t.name}
                className={`relative min-h-0 border-r border-b border-on-dark/25 perspective-[1600px] ${isFlipped ? 'z-30' : ''}`}
                onPointerEnter={(e) => isMouse(e) && show(i)}
                onPointerLeave={(e) => isMouse(e) && setFlipped(null)}
              >
                <button
                  type="button"
                  onFocus={(e) => e.currentTarget.matches(':focus-visible') && show(i)}
                  onClick={() => (isFlipped ? setViewing(i) : show(i))}
                  aria-label={`Đánh giá của ${t.name} trên ${t.source}. Mở ảnh đánh giá gốc`}
                  className={`absolute inset-0 block h-full w-full text-left transition-transform duration-[900ms] ease-(--ease-soft) transform-3d ${
                    isFlipped ? 'rotate-y-180 cursor-zoom-in' : 'cursor-pointer'
                  }`}
                >
                  {/* Mặt trước: ô trong suốt */}
                  <span
                    className={`absolute inset-0 flex flex-col p-3 transition-opacity duration-500 backface-hidden md:p-5 ${
                      backdrop === null ? '' : 'opacity-0'
                    }`}
                  >
                    <span className="caps text-on-dark/70">{t.source}</span>
                    <span className="mt-2 block font-display text-xl leading-tight text-on-dark italic md:mt-3 md:text-2xl">
                      {t.name}
                    </span>
                  </span>

                  {/* Mặt sau: ảnh đánh giá gốc, bấm để xem cỡ lớn */}
                  <span className="absolute inset-0 rotate-y-180 bg-cream backface-hidden">
                    <Img photo={{ ...t.original, alt: '' }} sizes="(min-width: 768px) 25vw, 50vw" className="object-contain!" />
                    <span className="caps absolute right-0 bottom-0 bg-espresso px-3 py-2 text-on-dark">Xem đầy đủ</span>
                  </span>
                </button>
                <blockquote className="sr-only">{t.quote}</blockquote>
              </li>
            )
          })}
        </ul>
      </div>

      <Lightbox photos={originals} index={viewing} onChange={setViewing} label="Ảnh chụp đánh giá gốc của khách hàng" />
    </section>
  )
}
