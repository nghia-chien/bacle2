import { useRef } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { about } from '../data/content'
import { introGrid, introTiles, type TileShape } from '../data/gallery'
import { site } from '../data/site'
import { MOTION_OK, useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { LinkButton } from './ui/Button'
import { SectionTitle } from './ui/SectionTitle'

gsap.registerPlugin(Flip, ScrollTrigger)

const SPAN: Record<TileShape, [number, number]> = { sq: [1, 1], wide: [2, 1], tall: [1, 2] }

// Mỗi lượt đi thẳng từ vị trí cũ tới vị trí mới trong 1.5s, lượt sau nối tiếp ngay
const TRANSITION = { duration: 1.5, ease: 'power2.inOut' }
const SEQUENCE = [1, 2, 0]

const gridStyle = { gridTemplateColumns: `repeat(${introGrid.cols}, 1fr)`, gridTemplateRows: `repeat(${introGrid.rows}, 1fr)` }

/** Đặt một ô vào layout lưới (hoặc ẩn nếu layout không có chỗ) */
function placeInGrid(el: HTMLElement, i: number, layout: number) {
  const tile = introTiles[i]
  const at = tile.at[layout]
  const [w, h] = SPAN[tile.shape]
  el.style.display = at ? '' : 'none'
  if (at) {
    el.style.gridColumn = `${at[0]} / span ${w}`
    el.style.gridRow = `${at[1]} / span ${h}`
  }
}

/**
 * Giới thiệu: chữ bên trái, lưới 14 ảnh bên phải (mobile: lưới xuống dưới chữ).
 * Layout A → B → C → A… bằng GSAP Flip: mỗi ảnh đi thẳng tới vị trí mới, 1.5s một lượt, không dừng.
 * Mỗi layout có đúng 2 ảnh dọc + 2 ảnh ngang; ảnh không có chỗ thì mờ dần và quay lại ở layout sau.
 * Desktop: section cao vừa một màn hình, lưới co theo chiều cao màn hình để luôn nằm trọn trong khung.
 */
export function About() {
  const scope = useRef<HTMLElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  useReveal(scope)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const box = grid.current
        if (!box) return
        const tiles = gsap.utils.toArray<HTMLElement>('[data-tile]', box)
        let stepIndex = 0
        let running: gsap.core.Timeline | null = null
        let paused = true

        // Flip (absolute: true) để lại position/top/left/width/height/transform inline trên các ô,
        // nhất là ô vừa rời lưới. Không dọn thì lượt sau tính từ vị trí lệch → ảnh trôi dần ra ngoài.
        const resetTiles = () =>
          gsap.set(tiles, { clearProps: 'position,top,left,right,bottom,width,height,margin,transform,zIndex' })

        const run = () => {
          if (paused) return
          const next = SEQUENCE[stepIndex]
          stepIndex = (stepIndex + 1) % SEQUENCE.length
          resetTiles()
          const state = Flip.getState(tiles, { props: 'opacity' })
          tiles.forEach((t, i) => placeInGrid(t, i, next))
          running = Flip.from(state, {
            ...TRANSITION,
            absolute: true,
            onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: TRANSITION.duration, ease: TRANSITION.ease }),
            onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: TRANSITION.duration, ease: TRANSITION.ease }),
            onComplete: () => {
              running = null
              resetTiles()
              run()
            },
          })
        }

        // Chỉ chạy khi lưới trong tầm nhìn
        const st = ScrollTrigger.create({
          trigger: box,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            if (self.isActive) {
              paused = false
              if (running?.isActive()) running.resume()
              else run()
            } else {
              paused = true
              running?.pause()
            }
          },
        })

        return () => {
          paused = true
          st.kill()
          running?.kill()
          tiles.forEach((el, i) => placeInGrid(el, i, 0))
          resetTiles()
          gsap.set(tiles, { clearProps: 'opacity' })
        }
      })
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      id="gioi-thieu"
      aria-labelledby="about-title"
      className="bg-cream px-4 pb-20 md:px-8 lg:flex lg:h-dvh lg:min-h-[34rem] lg:items-center lg:pt-24 lg:pb-8"
    >
      <div className="mx-auto grid w-full max-w-[80rem] items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionTitle id="about-title" script={about.script} title={about.title} align="left" />
          <p data-reveal="up" className="mt-6 max-w-md text-base text-ink-soft">
            {about.body}
          </p>
          <div data-reveal="up" className="mt-8">
            <LinkButton href={site.zaloHref} variant="outline">
              {about.cta.label}
            </LinkButton>
          </div>
        </div>

        <div className="lg:col-span-7 lg:flex lg:justify-end">
          {/* Cạnh lưới = min(bề rộng cột, chiều cao màn hình trừ header và lề) để không tràn khung */}
          <div
            ref={grid}
            className="relative grid aspect-square w-full gap-1.5 md:mx-auto md:w-[min(100%,calc(100dvh-8rem))] md:gap-2.5 lg:mx-0 lg:w-[min(100%,calc(100dvh-9rem))]"
            style={gridStyle}
          >
            {introTiles.map((tile) => {
              const at = tile.at[0]
              const [w, h] = SPAN[tile.shape]
              return (
                <div
                  key={tile.photo.id}
                  data-tile
                  className="min-h-0 min-w-0 will-change-[transform,opacity]"
                  style={
                    at
                      ? { gridColumn: `${at[0]} / span ${w}`, gridRow: `${at[1]} / span ${h}` }
                      : { display: 'none' }
                  }
                >
                  <div className="size-full overflow-hidden rounded-md bg-sand shadow-lg shadow-deep/15">
                    <Img photo={tile.photo} sizes="(min-width: 1024px) 30vw, 50vw" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
