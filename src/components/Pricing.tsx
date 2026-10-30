import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { concepts } from '../data/concepts'
import { packages, pricing, type Package } from '../data/pricing'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { Button, LinkButton } from './ui/Button'
import { SectionTitle } from './ui/SectionTitle'

interface PricingProps {
  onChoose: (slug: string) => void
}

const HOVER_OK = '(hover: hover) and (pointer: fine)'
const OFFSET = 24
const EDGE = 12

/**
 * Bảng thông tin gói bám theo con trỏ (chỉ thiết bị có chuột).
 * Vị trí ghi thẳng vào style trong requestAnimationFrame, đuổi theo con trỏ bằng nội suy;
 * tự lật sang trái khi chạm mép phải và không tràn mép dưới.
 */
function useCursorCard() {
  const card = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const cur = useRef({ x: 0, y: 0 })
  const raf = useRef(0)
  const [pkg, setPkg] = useState<Package | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(HOVER_OK)
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const target = () => {
    const w = card.current?.offsetWidth ?? 320
    const h = card.current?.offsetHeight ?? 240
    const { x, y } = mouse.current
    return {
      x: x + OFFSET + w > window.innerWidth - EDGE ? x - OFFSET - w : x + OFFSET,
      y: Math.max(EDGE, Math.min(y + OFFSET, window.innerHeight - h - EDGE)),
    }
  }

  const tick = () => {
    const el = card.current
    if (!el) return
    const t = target()
    const ease = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.2
    cur.current.x += (t.x - cur.current.x) * ease
    cur.current.y += (t.y - cur.current.y) * ease
    el.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y}px, 0)`
    if (Math.abs(t.x - cur.current.x) > 0.3 || Math.abs(t.y - cur.current.y) > 0.3) raf.current = requestAnimationFrame(tick)
  }

  const follow = (e: PointerEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY }
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(tick)
  }

  const bind = (p: Package) =>
    enabled
      ? {
          onPointerEnter: (e: PointerEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY }
            // Đang ẩn: đặt ngay tại con trỏ, không trượt từ vị trí cũ
            if (!pkg) cur.current = target()
            setPkg(p)
            follow(e)
          },
          onPointerMove: follow,
          onPointerLeave: () => setPkg(null),
        }
      : {}

  return { card, pkg, enabled, bind }
}

/** Bảng gói: mỗi gói một hàng biên tập (ảnh, tên, concept trong gói, giá, nút chọn). */
export function Pricing({ onChoose }: PricingProps) {
  const scope = useRef<HTMLElement>(null)
  useReveal(scope)
  const hover = useCursorCard()
  // Giữ nội dung gói cuối cùng khi bảng đang mờ đi, tránh bảng trống lúc fade-out
  const [shown, setShown] = useState<Package | null>(null)
  useEffect(() => {
    if (hover.pkg) setShown(hover.pkg)
  }, [hover.pkg])
  const shownConcepts = shown ? concepts.filter((c) => c.kind === shown.kind).map((c) => c.name) : []
  const shownItems = shown?.includes?.length ? shown.includes : shownConcepts.map((name) => `Concept ${name}`)

  return (
    <section ref={scope} id="bang-gia" aria-labelledby="pricing-title" className="bg-cream px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[80rem]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <SectionTitle id="pricing-title" script={pricing.script} title={pricing.title} align="left" />
          </div>
          <p data-reveal="up" className="max-w-md text-base text-ink-soft md:col-span-5 md:col-start-8">
            {pricing.note}
          </p>
        </div>

        <ul className="mt-14 border-t border-line md:mt-20">
          {packages.map((pkg, i) => {
            const list = concepts.filter((c) => c.kind === pkg.kind)
            return (
              <li
                key={pkg.slug}
                data-reveal="up"
                {...hover.bind(pkg)}
                className="grid grid-cols-[5.5rem_1fr] gap-x-5 gap-y-5 border-b border-line py-8 md:grid-cols-[3rem_9rem_1fr_auto] md:items-center md:gap-x-10 md:py-10"
              >
                <span className="caps hidden text-ink-soft md:block">{String(i + 1).padStart(2, '0')}</span>
                <div className="aspect-[4/5] overflow-hidden bg-sand">
                  <Img photo={pkg.photo} sizes="(min-width: 768px) 9rem, 5.5rem" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold md:text-[2.75rem]">{pkg.name}</h3>
                  <p className="mt-2 max-w-md text-sm text-ink-soft">{pkg.summary}</p>
                  {pkg.includes?.length ? (
                    <ul className="mt-3 space-y-1 text-sm text-ink">
                      {pkg.includes.map((item) => (
                        <li key={item}>— {item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {list.length ? (
                    <p className="caps mt-4 leading-relaxed text-ink-soft">{list.map((c) => c.name).join(' · ')}</p>
                  ) : null}
                </div>
                <div className="col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:col-span-1 md:flex-col md:items-end">
                  <p className="font-display text-2xl italic md:text-right">{pkg.price ?? pricing.priceFallback}</p>
                  <Button variant="outline" onClick={() => onChoose(pkg.slug)}>
                    Chọn gói này
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>

        <div data-reveal="up" className="mt-10 flex justify-center">
          <LinkButton href={site.zaloHref}>Nhận báo giá qua Zalo</LinkButton>
        </div>
      </div>

      {/* Bảng thông tin bám con trỏ: chỉ trang trí, nội dung đã có sẵn trong từng hàng nên ẩn với trình đọc màn hình */}
      {hover.enabled && (
        <div ref={hover.card} aria-hidden className="pointer-events-none fixed top-0 left-0 z-50 w-[22rem]">
          <div
            className={`origin-top-left rounded-lg bg-deep p-6 text-on-dark shadow-2xl shadow-deep/30 transition-[opacity,scale] duration-300 ${
              hover.pkg ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {shown && (
              <>
                <p className="caps text-on-dark-soft">Gói {shown.name}</p>
                <p className="mt-2 font-display text-3xl italic text-champagne">{shown.price ?? pricing.priceFallback}</p>
                <p className="mt-3 text-sm text-on-dark-soft">{shown.summary}</p>
                {shown.specs?.length ? (
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-on-dark/15 pt-4">
                    {shown.specs.map((s) => (
                      <div key={s.label}>
                        <dt className="caps text-on-dark-soft">{s.label}</dt>
                        <dd className="mt-0.5 text-sm font-semibold">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <div className="mt-4 border-t border-on-dark/15 pt-4">
                  <p className="caps text-on-dark-soft">Bao gồm</p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {shownItems.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-champagne">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {shown.includes?.length && shownConcepts.length ? (
                  <p className="mt-4 text-xs text-on-dark-soft">
                    <span className="caps">Concept: </span>
                    {shownConcepts.join(' · ')}
                  </p>
                ) : null}
                {shown.bonus && (
                  <p className="mt-4 rounded-md bg-on-dark/10 px-3 py-2 text-sm">
                    <span className="text-champagne">★ </span>
                    {shown.bonus}
                  </p>
                )}
                <p className="mt-4 text-xs text-on-dark-soft">Bấm “Chọn gói này” để đặt lịch tư vấn</p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
