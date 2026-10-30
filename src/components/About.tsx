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
// Kích thước khi tung ra (theo % bề rộng lưới), tỉ lệ khung giữ đúng hình của ảnh
const SCATTER_W: Record<TileShape, number> = { sq: 22, wide: 40, tall: 20 }
const SCATTER_RATIO: Record<TileShape, string> = { sq: '1', wide: '2', tall: '0.5' }

// Chuyển cảnh nối tiếp nhau, không có thời gian giữ: lưới chảy liên tục
const TRANSITION = { duration: 1.1, ease: 'sine.inOut', stagger: 0.03 }

const gridStyle = { gridTemplateColumns: `repeat(${introGrid.cols}, 1fr)`, gridTemplateRows: `repeat(${introGrid.rows}, 1fr)` }

/** Đặt một ô vào layout lưới (hoặc ẩn nếu layout không có chỗ) */
function placeInGrid(el: HTMLElement, i: number, layout: number) {
  const tile = introTiles[i]
  const at = tile.at[layout]
  const [w, h] = SPAN[tile.shape]
  el.style.position = ''
  el.style.left = ''
  el.style.top = ''
  el.style.width = ''
  el.style.aspectRatio = ''
  el.style.zIndex = ''
  el.style.display = at ? '' : 'none'
  if (at) {
    el.style.gridColumn = `${at[0]} / span ${w}`
    el.style.gridRow = `${at[1]} / span ${h}`
  }
}

function placeScattered(el: HTMLElement, i: number) {
  const shape = introTiles[i].shape
  const w = SCATTER_W[shape]
  el.style.display = ''
  // Bỏ vị trí lưới: nếu giữ, phần tử absolute lấy ô lưới làm khối chứa thay vì cả khung
  el.style.gridColumn = ''
  el.style.gridRow = ''
  el.style.position = 'absolute'
  el.style.width = `${w}%`
  el.style.aspectRatio = SCATTER_RATIO[shape]
  el.style.left = `${gsap.utils.random(0, 100 - w)}%`
  el.style.top = `${gsap.utils.random(0, shape === 'tall' ? 55 : 75)}%`
  el.style.zIndex = String(gsap.utils.random(10, 50, 1))
}

/**
 * Giới thiệu: chữ bên trái, lưới 14 ảnh bên phải chạy liên tục không dừng.
 * Layout A → tung → B → tung → C → tung → A… bằng GSAP Flip. Mỗi layout có đúng 2 ảnh dọc + 2 ảnh ngang;
 * ảnh không có chỗ thì ẩn dần và quay lại ở layout sau.
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
        const tilts = tiles.map((t) => t.firstElementChild as HTMLElement)
        const sequence: (number | 'scatter')[] = ['scatter', 1, 'scatter', 2, 'scatter', 0]
        let stepIndex = 0
        let running: gsap.core.Timeline | null = null
        let paused = true

        const run = () => {
          if (paused) return
          const next = sequence[stepIndex]
          stepIndex = (stepIndex + 1) % sequence.length
          const state = Flip.getState(tiles, { props: 'opacity' })
          if (next === 'scatter') tiles.forEach((t, i) => placeScattered(t, i))
          else tiles.forEach((t, i) => placeInGrid(t, i, next))
          running = Flip.from(state, {
            ...TRANSITION,
            absolute: true,
            onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'sine.out' }),
            onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.6, duration: 0.6, ease: 'sine.in' }),
            // Chuyển cảnh tiếp ngay khi cảnh này xong
            onComplete: run,
          })
          tilts.forEach((t, i) =>
            gsap.to(t, {
              rotation: next === 'scatter' ? gsap.utils.random(-6, 6) : 0,
              duration: TRANSITION.duration,
              ease: TRANSITION.ease,
              delay: i * TRANSITION.stagger,
            }),
          )
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
          gsap.set([...tiles, ...tilts], { clearProps: 'transform,opacity' })
        }
      })
    },
    { scope },
  )

  return (
    <section ref={scope} id="gioi-thieu" aria-labelledby="about-title" className="bg-cream px-4 pb-24 md:px-8 md:pb-36">
      <div className="mx-auto grid max-w-[80rem] items-center gap-12 lg:grid-cols-12 lg:gap-16">
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

        <div ref={grid} className="relative grid aspect-square gap-1.5 md:gap-2.5 lg:col-span-7" style={gridStyle}>
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
    </section>
  )
}
