import { useEffect, useRef, useState } from 'react'
import { concepts, type Concept } from '../data/concepts'
import { conceptsIntro } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { photoSrc, type Photo } from '../data/images'
import { Img } from './ui/Img'
import { SectionTitle } from './ui/SectionTitle'
import { IconArrow, IconClose } from './ui/Icons'
import { Modal } from './ui/Modal'
import { Button } from './ui/Button'

/** Thời gian bảng chi tiết trượt vào / ra (khớp keyframes slide-in-right / slide-out-right) */
const EXIT_MS = 800

interface ConceptsProps {
  onChoose: (slug: string) => void
}

export function Concepts({ onChoose }: ConceptsProps) {
  const scope = useRef<HTMLElement>(null)
  const [active, setActive] = useState<Concept | null>(null)
  // Giữ concept vừa đóng để bảng chi tiết còn nội dung trong lúc trượt ra
  const [shown, setShown] = useState<Concept | null>(null)
  if (active && active !== shown) setShown(active)
  useReveal(scope)

  const chooseAndGo = (slug: string) => {
    onChoose(slug)
    setActive(null)
    requestAnimationFrame(() => document.getElementById('dat-lich')?.scrollIntoView())
  }

  return (
    <section id="concept" ref={scope} aria-labelledby="concept-title" className="bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[80rem] px-4 md:px-8">
        <SectionTitle id="concept-title" script={conceptsIntro.script} title={conceptsIntro.title} />
        <p data-reveal="up" className="mx-auto mt-5 max-w-md text-center text-base text-ink-soft">
          {conceptsIntro.body}
        </p>
      </div>

      <ConceptsScrolly onOpen={setActive} onChoose={(slug) => chooseAndGo(slug)} />

      <ul
        className="no-scrollbar mt-14 flex lg:hidden snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-auto md:mt-20 md:grid md:max-w-[80rem] md:grid-cols-2 md:gap-x-8 md:gap-y-16 md:overflow-visible md:px-8 lg:grid-cols-3"
        aria-label="Danh sách concept"
      >
        {concepts.map((c, i) => (
          <li
            key={c.slug}
            data-reveal="up"
            className={`w-[76vw] shrink-0 snap-center sm:w-[46vw] md:w-auto ${i % 3 === 1 ? 'lg:mt-20' : ''}`}
          >
            <button
              type="button"
              onClick={() => setActive(c)}
              className="group block w-full cursor-pointer text-left"
              aria-haspopup="dialog"
            >
              <div className="frame aspect-[3/4] overflow-hidden">
                <Img
                  photo={c.cover}
                  sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 76vw"
                  className="transition-transform duration-[1.2s] ease-(--ease-soft) group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="caps text-ink-soft">{c.kind}</span>
                <span className="caps flex items-center gap-2 text-ink transition-[gap] duration-300 group-hover:gap-3">
                  Xem chi tiết <IconArrow width={16} height={16} />
                </span>
              </div>
              <h3 className="mt-2 text-xl md:text-[1.375rem]">{c.name}</h3>
              <p className="mt-2 max-w-[34ch] text-sm text-ink-soft">{c.summary}</p>
            </button>
          </li>
        ))}
      </ul>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        label={shown ? `Concept ${shown.name}` : 'Concept'}
        exitMs={EXIT_MS}
      >
        {shown ? (
          <ConceptDetail
            key={shown.slug}
            concept={shown}
            onClose={() => setActive(null)}
            onChoose={() => chooseAndGo(shown.slug)}
          />
        ) : null}
      </Modal>
    </section>
  )
}

interface DetailProps {
  concept: Concept
  onClose: () => void
  onChoose: () => void
}

function ConceptDetail({ concept, onClose, onChoose }: DetailProps) {
  const photos = [concept.cover, ...concept.photos]
  return (
    <div className="ml-auto flex h-full w-full max-w-[72rem] animate-[slide-in-right_1.1s_cubic-bezier(0.45,0,0.15,1)] flex-col overflow-y-auto bg-cream shadow-[-30px_0_80px_-30px_rgb(35_26_22/0.5)] group-data-closing:animate-[slide-out-right_.8s_cubic-bezier(0.55,0,0.2,1)_forwards] md:flex-row md:overflow-hidden">
      <div className="flex shrink-0 flex-col px-6 pt-4 pb-8 md:w-[38%] md:px-10 md:pt-8 md:pb-10">
        <button
          type="button"
          onClick={onClose}
          className="-ml-3 grid size-12 cursor-pointer place-items-center self-start"
          aria-label="Đóng"
        >
          <IconClose />
        </button>
        <p className="caps mt-6 text-ink-soft md:mt-auto">{concept.kind}</p>
        <h3 className="mt-3 text-[2rem] md:text-[2.5rem] lg:text-[3rem]">{concept.name}</h3>
        <p className="mt-4 max-w-sm text-base text-ink-soft">{concept.summary}</p>
        <p className="caps mt-6 text-ink-soft">{photos.length} ảnh mẫu</p>
        <div className="mt-8 grid gap-3 sm:flex md:grid">
          <Button onClick={onChoose}>Chọn concept này</Button>
          <Button variant="outline" onClick={onClose}>
            Xem concept khác
          </Button>
        </div>
      </div>

      <div className="px-3 pb-6 md:flex-1 md:overflow-y-auto md:px-4 md:py-4">
        <div className="columns-2 gap-3">
          {photos.map((p) => (
            <div key={p.id} className="mb-3 break-inside-avoid">
              <img src={photoSrc(p.id)} alt={p.alt} loading="lazy" decoding="async" className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ScrollyProps {
  onOpen: (concept: Concept) => void
  onChoose: (slug: string) => void
}

/**
 * Desktop: ảnh đứng yên (sticky) bên trái, nội dung từng concept cuộn bên phải.
 * Khi một concept chạm giữa màn hình, ảnh của nó trồi lên che ảnh trước (mask wipe);
 * cuộn ngược thì ảnh rút xuống. Bấm ảnh phụ: ảnh đó trượt từ phải vào khung, đổi chỗ với ảnh chính.
 * Dưới lg dùng danh sách vuốt ngang.
 */
function ConceptsScrolly({ onOpen, onChoose }: ScrollyProps) {
  const [current, setCurrent] = useState(0)
  const items = useRef<(HTMLLIElement | null)[]>([])
  // Mỗi concept: [ảnh chính, 3 ảnh phụ]. Bấm ảnh phụ -> đổi chỗ với ảnh chính, ảnh mới trượt từ phải vào khung.
  const [views, setViews] = useState<Record<string, Photo[]>>(() =>
    Object.fromEntries(concepts.map((c) => [c.slug, [c.cover, ...c.photos.slice(0, 3)]])),
  )
  const [previous, setPrevious] = useState<Record<string, Photo | undefined>>({})

  const swap = (slug: string, k: number) => {
    const list = views[slug]
    setPrevious((prev) => ({ ...prev, [slug]: list[0] }))
    setViews((all) => {
      const next = [...all[slug]]
      ;[next[0], next[k]] = [next[k], next[0]]
      return { ...all, [slug]: next }
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(Number((entry.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: '-48% 0px -48% 0px' },
    )
    items.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const now = concepts[current]

  return (
    <div className="mx-auto mt-16 hidden max-w-[80rem] grid-cols-12 gap-10 px-8 lg:grid">
      <div className="col-span-6">
        <div className="sticky top-[4.5rem] flex h-[calc(100dvh-4.5rem)] flex-col justify-center py-6">
          <div className="frame relative aspect-[3/4] h-[calc(100dvh-4.5rem-5.5rem)] max-w-full self-end overflow-hidden bg-sand">
            {concepts.map((c, j) => (
              <div
                key={c.slug}
                aria-hidden={j !== current}
                style={{
                  zIndex: j + 1,
                  clipPath: j <= current ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                }}
                className="absolute inset-0 transition-[clip-path] duration-1000 ease-(--ease-soft)"
              >
                <div className={`absolute inset-0 transition-transform duration-[1.6s] ease-(--ease-soft) ${j === current ? 'scale-100' : 'scale-110'}`}>
                  {previous[c.slug] ? (
                    <div className="absolute inset-0">
                      <Img photo={{ ...previous[c.slug]!, alt: '' }} sizes="40vw" />
                    </div>
                  ) : null}
                  <div
                    key={views[c.slug][0].id}
                    className={`absolute inset-0 ${previous[c.slug] ? 'animate-[slide-in-right_.9s_var(--ease-soft)]' : ''}`}
                  >
                    <Img photo={views[c.slug][0]} sizes="40vw" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 ml-auto flex w-[calc((100dvh-10rem)*0.75)] max-w-full items-center justify-between">
            <p className="caps text-ink-soft" aria-live="polite">
              {now?.kind} · {now?.name}
            </p>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {concepts.map((c, j) => (
                <span
                  key={c.slug}
                  className={`h-px transition-all duration-500 ${j === current ? 'w-10 bg-ink' : 'w-4 bg-ink/25'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ol className="col-span-5 col-start-8" aria-label="Danh sách concept">
        {concepts.map((c, j) => (
          <li
            key={c.slug}
            ref={(el) => {
              items.current[j] = el
            }}
            data-index={j}
            className={`flex min-h-[80dvh] flex-col justify-center transition-opacity duration-700 ${
              j === current ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <p className="caps text-ink-soft">{c.kind}</p>
            <h3 className="mt-3 text-[2.5rem] xl:text-[3rem]">{c.name}</h3>
            <p className="mt-4 max-w-sm text-base text-ink-soft">{c.summary}</p>
            <div className="mt-7 flex gap-2">
              {views[c.slug].slice(1).map((p, k) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    if (j !== current) items.current[j]?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                    swap(c.slug, k + 1)
                  }}
                  className="group/thumb aspect-[3/4] w-20 cursor-pointer overflow-hidden bg-sand"
                  aria-label={`Đưa lên ảnh chính: ${p.alt}`}
                >
                  <Img photo={{ ...p, alt: '' }} sizes="5rem" className="transition-transform duration-500 group-hover/thumb:scale-105" />
                </button>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => onOpen(c)} aria-haspopup="dialog">
                Xem chi tiết
              </Button>
              <Button onClick={() => onChoose(c.slug)}>Chọn concept này</Button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
