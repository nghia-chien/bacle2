import { useRef, useState } from 'react'
import { moments } from '../data/gallery'
import { galleryIntro } from '../data/content'
import { site } from '../data/site'
import type { Photo } from '../data/images'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { Lightbox } from './ui/Lightbox'
import { SectionTitle } from './ui/SectionTitle'
import { IconArrow } from './ui/Icons'

const COLUMNS = 4
/** Giây cho mỗi ảnh đi qua: cột càng nhiều ảnh thì chạy càng lâu, tốc độ các cột gần như nhau */
const SECONDS_PER_PHOTO = 7

/** Chia ảnh vào các cột theo vòng (ảnh 0 -> cột 0, ảnh 1 -> cột 1, ...) và nhớ vị trí gốc để mở lightbox */
const columns: { photo: Photo; index: number }[][] = Array.from({ length: COLUMNS }, (_, c) =>
  moments.map((photo, index) => ({ photo, index })).filter((_, i) => i % COLUMNS === c),
)

/**
 * Bộ sưu tập: các cột ảnh chạy dọc liên tục, cột chẵn đi lên, cột lẻ đi xuống, nên trong một khung
 * cao gần bằng màn hình khách lướt qua được toàn bộ ảnh mà không phải cuộn trang dài.
 * Rê chuột vào cột nào thì riêng cột đó dừng lại để xem kỹ, bấm ảnh để xem lớn.
 * Mobile hiện 2 cột. Khi tắt chuyển động: không chạy, khung cho cuộn tay.
 */
export function Gallery() {
  const scope = useRef<HTMLElement>(null)
  const [index, setIndex] = useState<number | null>(null)
  useReveal(scope)

  return (
    <section id="bo-suu-tap" ref={scope} aria-labelledby="gallery-title" className="bg-cream px-3 py-24 md:px-5 md:py-32">
      <div className="mx-auto flex max-w-[80rem] flex-col gap-6 px-1 md:flex-row md:items-end md:justify-between md:px-3">
        <SectionTitle id="gallery-title" script={galleryIntro.script} title={galleryIntro.title} align="left" />
        <div data-reveal="up" className="max-w-xs md:pb-4 md:text-right">
          <p className="text-base text-ink-soft">{galleryIntro.body}</p>
          <p className="caps mt-3 text-ink-soft">{moments.length} khoảnh khắc<span className="hidden md:inline"> · rê chuột để dừng</span></p>
          <a
            href={site.facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="caps mt-4 inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-ink transition-colors hover:border-ink"
          >
            Xem thêm trên Facebook <IconArrow width={16} height={16} />
          </a>
        </div>
      </div>

      <div
        className="mx-auto mt-12 grid h-[110dvh] max-w-[90rem] grid-cols-2 gap-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] md:mt-16 md:h-[130dvh] md:grid-cols-3 md:gap-4 lg:grid-cols-4 motion-reduce:overflow-y-auto"
        aria-label="Ảnh trong bộ sưu tập"
        role="region"
      >
        {columns.map((col, c) => (
          <div key={c} className={`min-w-0 ${c === 2 ? 'hidden md:block' : ''} ${c === 3 ? 'hidden lg:block' : ''}`}>
            <ul
              style={{ animationDuration: `${col.length * SECONDS_PER_PHOTO}s` }}
              className={`flex flex-col motion-safe:animate-[reel-up_linear_infinite] hover:[animation-play-state:paused] ${
                c % 2 === 1 ? 'motion-safe:[animation-direction:reverse]' : ''
              }`}
            >
              {/* Nhân đôi danh sách để vòng lặp liền mạch; bản sao ẩn với trình đọc màn hình */}
              {[...col, ...col].map(({ photo, index: i }, k) => {
                const clone = k >= col.length
                return (
                  <li key={`${photo.id}-${k}`} aria-hidden={clone || undefined} className={`pb-3 md:pb-4 ${clone ? 'motion-reduce:hidden' : ''}`}>
                    <button
                      type="button"
                      tabIndex={clone ? -1 : undefined}
                      onClick={() => setIndex(i)}
                      className="group relative block aspect-[2/3] w-full cursor-zoom-in overflow-hidden bg-sand"
                      aria-label={`Xem lớn: ${photo.alt}`}
                    >
                      <Img
                        photo={clone ? { ...photo, alt: '' } : photo}
                        sizes="(min-width: 1024px) 22vw, (min-width: 768px) 31vw, 48vw"
                        className="transition-transform duration-[1.2s] ease-(--ease-soft) group-hover:scale-[1.04]"
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <Lightbox photos={moments} index={index} onChange={setIndex} label="Xem ảnh bộ sưu tập" />
    </section>
  )
}
