import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { hero, manifesto } from '../data/content'
import { MOTION_OK } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { LinkButton } from './ui/Button'

// Khung ảnh lúc đầu (inset trên/phải/dưới/trái) theo kích thước màn hình; cuối cùng mở bung về 0.
const START_DESKTOP = 'inset(24% 31% 20% 31% round 1.25rem)'
const START_MOBILE = 'inset(26% 8% 24% 8% round 1rem)'
const END = 'inset(0% 0% 0% 0% round 0rem)'

/** Góc khung ngắm */
function Corner({ className }: { className: string }) {
  return <span aria-hidden className={`absolute size-8 border-on-dark md:size-12 ${className}`} />
}

/**
 * Hero cuộn: section cao nhiều màn hình, lớp trong sticky. Khung ảnh mở bung bằng clip-path,
 * ảnh thu nhẹ, chữ tách hai phía rồi mờ đi, khung ngắm hiện khi ảnh gần phủ kín.
 * Giảm chuyển động: section chỉ cao 1 màn hình, ảnh mở sẵn, chữ và khung ngắm hiện đủ.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { motion: MOTION_OK, desktop: '(min-width: 1024px)' },
        (ctx) => {
          if (!ctx.conditions?.motion) return
          const start = ctx.conditions.desktop ? START_DESKTOP : START_MOBILE
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            // Chỉ phần track cao 280vh, không tính đoạn văn phía dưới
            scrollTrigger: { trigger: '[data-hero-track]', start: 'top top', end: 'bottom bottom', scrub: 0.8 },
          })
          tl.fromTo('[data-hero-panel]', { clipPath: start }, { clipPath: END, duration: 0.8, ease: 'power1.inOut' }, 0)
            .fromTo('[data-hero-media]', { scale: 1.22 }, { scale: 1, duration: 0.8 }, 0)
            .fromTo('[data-hero-scrim]', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.55)
            .to('[data-hero-left]', { xPercent: -45, filter: 'blur(14px)', opacity: 0, duration: 0.55, ease: 'power2.in' }, 0.05)
            .to('[data-hero-right]', { xPercent: 45, filter: 'blur(14px)', opacity: 0, duration: 0.55, ease: 'power2.in' }, 0.05)
            .to('[data-hero-meta]', { opacity: 0, y: 16, duration: 0.2, ease: 'power1.in' }, 0)
            .fromTo('[data-hero-frame]', { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' }, 0.72)
            .to({}, { duration: 0.1 })
        },
      )

      // Đoạn văn sáng dần từng chữ, khớp tiến độ cuộn
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '[data-word]',
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: '[data-manifesto]', start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        )
      })
    },
    { scope },
  )

  const words = manifesto.split(' ')

  return (
    <section ref={scope} id="top" aria-labelledby="hero-title" className="relative bg-cream">
      <div data-hero-track className="relative h-[280vh] motion-reduce:h-dvh">
        <div className="sticky top-0 h-dvh overflow-hidden">
          <div
            data-hero-panel
            className="absolute inset-0 overflow-hidden bg-sand [clip-path:inset(26%_8%_24%_8%_round_1rem)] will-change-[clip-path] motion-reduce:[clip-path:none] lg:[clip-path:inset(24%_31%_20%_31%_round_1.25rem)] lg:motion-reduce:[clip-path:none]"
          >
            <div data-hero-media className="size-full scale-[1.22] will-change-transform motion-reduce:scale-100">
              <Img photo={hero.media} sizes="100vw" priority />
            </div>
            <div
              data-hero-scrim
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-deep/35 via-transparent to-deep/45 opacity-0 motion-reduce:opacity-100"
            />
            {/* Khung ngắm: góc + nhãn + CTA, chỉ hiện khi ảnh gần phủ kín */}
            <div
              data-hero-frame
              className="absolute inset-4 top-20 text-on-dark opacity-0 motion-reduce:opacity-100 md:inset-10 md:top-28"
            >
              <Corner className="top-0 left-0 border-t border-l" />
              <Corner className="top-0 right-0 border-t border-r" />
              <Corner className="bottom-0 left-0 border-b border-l" />
              <Corner className="right-0 bottom-0 border-r border-b" />
              <p className="caps absolute top-5 left-6 motion-reduce:hidden md:top-7 md:left-8">{hero.frame.left}</p>
              <p className="caps absolute top-5 right-6 motion-reduce:hidden md:top-7 md:right-8">{hero.frame.right}</p>
              <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-6 px-6 text-center md:bottom-12 motion-reduce:bottom-[24%] md:motion-reduce:bottom-[24%]">
                <p className="script text-5xl text-champagne md:text-7xl">{hero.tagline}</p>
                <LinkButton href={hero.primaryCta.href} variant="solid-light">
                  {hero.primaryCta.label}
                </LinkButton>
              </div>
            </div>
          </div>

          <h1 id="hero-title" className="pointer-events-none absolute inset-0 not-italic text-ink motion-reduce:text-on-dark">
            <span
              data-hero-left
              className="absolute top-[13%] left-4 block font-black tracking-[0.04em] text-[clamp(3.5rem,13vw,11.5rem)] leading-none will-change-[transform,filter] lg:top-[9%] lg:left-[5vw]"
            >
              {hero.splitTop}
            </span>
            <span
              data-hero-right
              className="absolute right-4 bottom-[19%] block text-right italic text-primary motion-reduce:text-on-dark text-[clamp(2.6rem,9.5vw,8.5rem)] leading-none will-change-[transform,filter] lg:right-[5vw] lg:bottom-[7%]"
            >
              {hero.splitBottom}
            </span>
            <span className="sr-only">{` – ${hero.kicker}`}</span>
          </h1>

          <div
            data-hero-meta
            className="absolute bottom-[4%] left-4 flex flex-col items-start gap-4 motion-reduce:hidden lg:bottom-[9%] lg:left-[5vw]"
          >
            <p className="caps text-ink-soft">{hero.kicker}</p>
            <div className="hidden gap-3 lg:flex">
              <LinkButton href={hero.primaryCta.href}>{hero.primaryCta.label}</LinkButton>
              <LinkButton href={hero.secondaryCta.href} variant="outline">
                {hero.secondaryCta.label}
              </LinkButton>
            </div>
          </div>
        </div>
      </div>

      <div data-manifesto className="mx-auto max-w-[68rem] px-4 py-28 md:px-8 md:py-44">
        <p className="font-display text-[1.75rem] leading-[1.3] text-ink md:text-[2.75rem] lg:text-[3.25rem]">
          {words.map((w, i) => (
            <span key={i} data-word>
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
