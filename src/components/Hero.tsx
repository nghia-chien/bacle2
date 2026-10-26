import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { hero } from '../data/content'
import { site } from '../data/site'
import type { Photo } from '../data/images'
import { MOTION_OK } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { LinkButton } from './ui/Button'

/**
 * Hero: hàng ảnh bằng nhau, cách nhau một khe nhỏ, chạy liên tục từ phải sang trái.
 * Chữ BACLE một màu (màu kem, bóng đổ nâu mềm để nổi trên ảnh sáng) "đan" qua hàng ảnh: ảnh vị trí chẵn nằm TRÊN chữ, ảnh vị trí lẻ nằm DƯỚI chữ.
 * Dòng giới thiệu và nút nằm phía TRƯỚC toàn bộ slide.
 * Vì transform tạo stacking context riêng, hàng ảnh được vẽ thành 2 lớp trùng khít
 * (lớp dưới chữ / lớp trên chữ) và cả hai cùng chạy một tween.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null)
  const reel = [...hero.reel, ...hero.reel] // nhân đôi để lặp liền mạch; số ảnh chẵn giữ đúng nhịp trên/dưới

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.to('[data-hero-track]', { xPercent: -50, duration: 70, ease: 'none', repeat: -1 })

        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('[data-hero-card]', { xPercent: 40, autoAlpha: 0, duration: 1.4, stagger: 0.06 })
          .from('[data-hero-letter]', { yPercent: 105, duration: 1.3, stagger: 0.07 }, 0.3)
          .from('[data-hero-sub]', { autoAlpha: 0, y: 12, duration: 1 }, 0.8)
          .from('[data-hero-front]', { autoAlpha: 0, y: 16, duration: 1, stagger: 0.1 }, 0.9)
      })
    },
    { scope },
  )

  return (
    <section
      id="top"
      ref={scope}
      aria-labelledby="hero-title"
      className="relative isolate flex items-center overflow-hidden bg-cream pt-24 pb-10 md:min-h-dvh md:pt-[4.5rem] md:pb-6"
    >
      <div className="relative mx-auto w-full max-w-[84rem] px-4 md:px-8">
        <Track photos={reel} layer="below" />
        <Track photos={reel} layer="above" className="absolute inset-y-0 left-4 z-20 md:left-8" />

        <h1
          id="hero-title"
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-cream [text-shadow:0_4px_44px_rgb(35_26_22/0.7),0_2px_10px_rgb(35_26_22/0.4)]"
        >
          <span className="sr-only">
            {site.name} – {site.category} tại {site.city}
          </span>
          <span aria-hidden="true" className="-mx-16 -my-12 block overflow-hidden px-16 py-12 leading-[0.82]">
            <span className="inline-block text-[clamp(5rem,26vw,22rem)] tracking-(--tracking-wordmark) md:text-[17vw] xl:text-[15rem]">
              {hero.wordmark.split('').map((ch, i) => (
                <span key={i} data-hero-letter className="inline-block">
                  {ch}
                </span>
              ))}
            </span>
          </span>
          <span
            aria-hidden="true"
            data-hero-sub
            className="script -mt-[0.15em] block pl-[30vw] text-[clamp(2rem,6.5vw,4.5rem)] md:pl-[24vw] xl:pl-[20rem]"
          >
            {hero.sub}
          </span>
        </h1>
        <div data-hero-front className="absolute inset-x-4 bottom-[7%] z-30 flex justify-center gap-2 md:bottom-[8%] md:gap-3">
          <LinkButton href={hero.primaryCta.href} className="px-4! md:px-7!">
            {hero.primaryCta.label}
          </LinkButton>
          <LinkButton href={hero.secondaryCta.href} variant="solid-light" className="border-ink/15! px-4! text-ink! hover:bg-ink! hover:text-cream! md:px-7!">
            {hero.secondaryCta.label}
          </LinkButton>
        </div>
      </div>
    </section>
  )
}

interface TrackProps {
  photos: Photo[]
  layer: 'above' | 'below'
  className?: string
}

/** Một lớp của hàng ảnh. Ô thuộc lớp kia được giữ chỗ (invisible) để hai lớp luôn trùng khít. */
function Track({ photos, layer, className = '' }: TrackProps) {
  const half = photos.length / 2
  return (
    <ul data-hero-track aria-hidden={layer === 'above' || undefined} className={`flex w-max ${className}`}>
      {photos.map((photo, i) => {
        const mine = (i % 2 === 0) === (layer === 'above')
        const clone = i >= half
        return (
          <li
            key={`${photo.id}-${i}`}
            aria-hidden={!mine || clone || undefined}
            className={`mr-3 aspect-[9/16] w-[72vw] shrink-0 md:mr-4 md:aspect-[3/4] md:w-[calc((min(100vw,84rem)-6rem)/3)] ${
              mine ? '' : 'invisible'
            }`}
          >
            {mine ? (
              <div data-hero-card className="h-full w-full overflow-hidden bg-sand">
                <Img
                  photo={clone ? { ...photo, alt: '' } : photo}
                  sizes="(min-width: 768px) 30vw, 72vw"
                  priority={i < 4}
                />
              </div>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
