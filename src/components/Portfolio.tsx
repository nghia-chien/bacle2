import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { concepts } from '../data/concepts'
import { portfolioIntro } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { Button } from './ui/Button'
import { IconArrow } from './ui/Icons'
import { SectionTitle } from './ui/SectionTitle'

interface PortfolioProps {
  onOpen: (slug: string) => void
}

const n = concepts.length
const AUTO_MS = 3200
const mod = (v: number) => ((v % n) + n) % n

/** Khoảng cách gập về vòng tròn: luôn trong (-n/2, n/2] */
function fold(offset: number) {
  let o = mod(offset)
  if (o > n / 2) o -= n
  return o
}

/**
 * Coverflow 3D vòng lặp vô hạn. Vị trí là số thực lưu trong ref, mọi biến đổi ghi thẳng vào style
 * trong requestAnimationFrame; React chỉ cập nhật khi thẻ đang giữa thay đổi.
 */
export function Portfolio({ onOpen }: PortfolioProps) {
  const scope = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const pos = useRef(0)
  const target = useRef(0)
  const raf = useRef(0)
  const metrics = useRef({ pitch: 1, depth: 1 })
  const drag = useRef({ active: false, startX: 0, startPos: 0, lastX: 0, lastT: 0, velocity: 0, moved: 0 })
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  useReveal(scope)

  const render = useCallback(() => {
    const { pitch, depth } = metrics.current
    cards.current.forEach((el, i) => {
      if (!el) return
      const off = fold(i - pos.current)
      const a = Math.abs(off)
      const s = Math.sign(off)
      // Đường cong giảm dần: càng xa tâm, góc xoay và độ lùi tăng chậm lại để thẻ không gập hẳn
      const x = s * pitch * (a <= 1 ? a : 1 + (a - 1) * 0.6)
      const rot = -s * 48 * Math.pow(Math.min(a, 1.6) / 1.6, 0.6)
      const z = -depth * Math.pow(a, 0.7)
      const opacity = a < 1 ? 1 - a * 0.22 : Math.max(0, 0.78 - (a - 1) * 0.5)
      el.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg)`
      el.style.opacity = String(opacity)
      el.style.zIndex = String(1000 - Math.round(a * 100))
      el.style.pointerEvents = opacity < 0.1 ? 'none' : ''
    })
    const idx = mod(Math.round(pos.current))
    if (idx !== activeRef.current) {
      activeRef.current = idx
      setActive(idx)
    }
  }, [])

  const settle = useCallback(() => {
    cancelAnimationFrame(raf.current)
    const tick = () => {
      const remaining = target.current - pos.current
      if (Math.abs(remaining) < 0.0005) {
        pos.current = target.current
        render()
        return
      }
      pos.current += remaining * 0.16
      render()
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [render])

  const goTo = useCallback(
    (index: number) => {
      target.current = Math.round(target.current) + fold(index - target.current)
      settle()
    },
    [settle],
  )
  const step = useCallback(
    (dir: number) => {
      target.current = Math.round(target.current) + dir
      settle()
    },
    [settle],
  )

  // Kích thước 3D suy ra từ bề rộng thẻ (biến CSS --card)
  useEffect(() => {
    const measure = () => {
      const w = cards.current[0]?.offsetWidth ?? 300
      metrics.current = { pitch: w * 0.86, depth: w * 0.9 }
      if (stage.current) stage.current.style.perspective = `${w * 4}px`
      render()
    }
    measure()
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(raf.current)
    }
  }, [render])

  // Tự quay: mỗi AUTO_MS chuyển sang thẻ kế; dừng khi rê chuột/focus/kéo, khi ra khỏi màn hình hoặc giảm chuyển động
  const hold = useRef({ hover: false, focus: false, offscreen: true })
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => (hold.current.offscreen = !e.isIntersecting), { threshold: 0.3 })
    if (stage.current) io.observe(stage.current)
    const timer = window.setInterval(() => {
      const h = hold.current
      if (h.hover || h.focus || h.offscreen || drag.current.active || document.hidden) return
      step(1)
    }, AUTO_MS)
    return () => {
      io.disconnect()
      window.clearInterval(timer)
    }
  }, [step])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    cancelAnimationFrame(raf.current)
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { active: true, startX: e.clientX, startPos: pos.current, lastX: e.clientX, lastT: e.timeStamp, velocity: 0, moved: 0 }
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    d.moved = Math.max(d.moved, Math.abs(dx))
    const dt = e.timeStamp - d.lastT
    if (dt > 0) d.velocity = d.velocity * 0.6 + ((e.clientX - d.lastX) / dt) * 0.4
    d.lastX = e.clientX
    d.lastT = e.timeStamp
    pos.current = d.startPos - dx / metrics.current.pitch
    render()
  }
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
    // Chạm/bấm (không kéo): stage đang giữ pointer nên tự tìm thẻ dưới con trỏ
    if (d.moved <= 6 && e.type === 'pointerup') {
      const card = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>('[data-index]')
      if (card) {
        onCardClick(Number(card.dataset.index))
        return
      }
    }
    // Quán tính: vận tốc (px/ms) đẩy tiếp thêm một quãng rồi bắt về thẻ gần nhất
    const fling = (-d.velocity * 150) / metrics.current.pitch
    target.current = Math.round(pos.current + Math.max(-3, Math.min(3, fling)))
    settle()
  }

  const onCardClick = (i: number) => {
    if (i === mod(Math.round(pos.current))) {
      target.current = Math.round(pos.current)
      settle()
      onOpen(concepts[i].slug)
    } else goTo(i)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    } else if (e.key === 'Enter') {
      onOpen(concepts[activeRef.current].slug)
    }
  }

  const current = concepts[active]
  const ctrl =
    'grid size-12 cursor-pointer place-items-center rounded-full border border-primary/30 text-primary transition-colors duration-300 hover:bg-primary hover:text-on-dark'

  return (
    <section ref={scope} id="portfolio" aria-labelledby="portfolio-title" className="overflow-x-clip bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[80rem] px-4 md:px-8">
        <SectionTitle id="portfolio-title" script={portfolioIntro.script} title={portfolioIntro.title} />
        <p data-reveal="up" className="mx-auto mt-5 max-w-md text-center text-base text-ink-soft">
          {portfolioIntro.body}
        </p>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Danh sách concept"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') hold.current.hover = true
        }}
        onPointerLeave={() => {
          hold.current.hover = false
        }}
        // Chỉ dừng khi focus bằng bàn phím; bấm chuột vẫn để tự quay tiếp sau khi rời chuột
        onFocus={(e) => {
          hold.current.focus = e.target.matches(':focus-visible')
        }}
        onBlur={() => {
          hold.current.focus = false
        }}
        className="mt-12 focus-visible:outline-offset-[-6px] md:mt-16"
      >
        <div
          ref={stage}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative h-[calc(var(--card)*1.5+2rem)] cursor-grab touch-pan-y select-none [--card:clamp(13rem,30vw,27rem)] [transform-style:preserve-3d] active:cursor-grabbing"
        >
          {concepts.map((c, i) => (
            <div
              key={c.slug}
              ref={(el) => {
                cards.current[i] = el
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${n}: ${c.name}`}
              data-index={i}
              className="absolute top-1/2 left-1/2 aspect-[2/3] w-(--card) cursor-pointer overflow-hidden rounded-xl bg-sand shadow-2xl shadow-deep/30 will-change-transform [backface-visibility:hidden]"
            >
              <Img photo={c.cover} sizes="(min-width: 768px) 30vw, 60vw" />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-[80rem] flex-col items-center gap-6 px-4 text-center md:px-8">
          <div aria-live="polite" className="min-h-[7.5rem]">
            <p className="caps text-ink-soft">{current.kind}</p>
            <h3 className="mt-2 text-3xl md:text-4xl">{current.name}</h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">{current.summary}</p>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className={ctrl} onClick={() => step(-1)} aria-label="Concept trước">
              <IconArrow dir="left" />
            </button>
            <Button variant="outline" onClick={() => onOpen(current.slug)}>
              Xem concept
            </Button>
            <button type="button" className={ctrl} onClick={() => step(1)} aria-label="Concept tiếp theo">
              <IconArrow />
            </button>
          </div>
          <div className="flex gap-1" role="group" aria-label="Chọn concept">
            {concepts.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={c.name}
                aria-current={i === active ? 'true' : undefined}
                className="group grid size-8 cursor-pointer place-items-center"
              >
                <span
                  className={`h-px transition-[width,background-color] duration-500 ${
                    i === active ? 'w-8 bg-primary' : 'w-3 bg-ink/25 group-hover:bg-primary/60'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
