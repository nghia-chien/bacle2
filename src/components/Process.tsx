import { useRef, useState, type PointerEvent } from 'react'
import { processIntro, processSteps } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'

/** Hình chữ nhật [x1, y1, x2, y2] theo % khung ảnh */
type Rect = [number, number, number, number]

/**
 * Mỗi mặt nạ gồm đúng 4 hình chữ nhật để clip-path nội suy mượt giữa các trạng thái.
 * Các hình nối về điểm neo (0 0) bằng đường đi-về trùng nhau nên không sinh diện tích thừa.
 */
const toPolygon = (rects: Rect[]) =>
  `polygon(${rects
    .map(([x1, y1, x2, y2]) => `0% 0%, ${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%, ${x1}% ${y1}%, 0% 0%`)
    .join(', ')})`

const MASKS = {
  // Mặc định: 4 dải ngang
  default: toPolygon([
    [0, 0, 100, 23.5],
    [0, 25.5, 100, 49],
    [0, 51, 100, 74.5],
    [0, 76.5, 100, 100],
  ]),
  steps: [
    toPolygon([
      [0, 0, 58, 48],
      [60, 0, 100, 48],
      [0, 50, 38, 100],
      [40, 50, 100, 100],
    ]),
    toPolygon([
      [0, 0, 100, 30],
      [0, 32, 48, 100],
      [50, 32, 100, 65],
      [50, 67, 100, 100],
    ]),
    toPolygon([
      [0, 0, 34, 100],
      [36, 0, 100, 56],
      [36, 58, 67, 100],
      [69, 58, 100, 100],
    ]),
    toPolygon([
      [0, 0, 48, 62],
      [50, 0, 100, 38],
      [50, 40, 100, 100],
      [0, 64, 48, 100],
    ]),
  ],
}

// Độ phóng + lia ảnh bên trong theo từng bước (giữ scale 1–1.1)
const PANS = ['scale(1.06) translate(1.5%, 1%)', 'scale(1.08) translate(-1.5%, 1.5%)', 'scale(1.06) translate(1%, -1.5%)', 'scale(1.08) translate(-1%, -1%)']

/** Quy trình: rê chuột / focus vào từng bước để đổi mặt nạ ảnh. Không dùng click. */
export function Process() {
  const scope = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  useReveal(scope)

  const enter = (i: number) => setActiveStep(i)
  const leave = (e?: PointerEvent) => {
    // Cảm ứng: giữ bước vừa chạm, chỉ chuột mới trả về trạng thái đầu
    if (e && e.pointerType !== 'mouse') return
    setActiveStep(null)
  }

  const photos = [processIntro.cover, ...processSteps.map((s) => s.photo)]
  const shown = activeStep === null ? 0 : activeStep + 1

  return (
    <section
      ref={scope}
      id="quy-trinh"
      aria-labelledby="process-title"
      className="flex min-h-dvh items-center bg-deep px-4 pt-24 pb-10 text-on-dark md:px-8 lg:h-dvh lg:min-h-[42rem] lg:pt-28 lg:pb-12"
    >
      <div className="mx-auto grid w-full max-w-[80rem] items-center gap-8 lg:h-full lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h2 id="process-title" className="font-grotesk not-italic" data-lines>
            <span className="block overflow-hidden">
              <span data-line className="caps block text-champagne">
                {processIntro.script}
              </span>
            </span>
            <span className="mt-3 block overflow-hidden">
              <span data-line className="block text-2xl leading-tight font-medium tracking-tight md:text-4xl">
                {processIntro.title}
              </span>
            </span>
          </h2>
          <ol className="mt-6 border-t border-on-dark/15 md:mt-10" onPointerLeave={leave}>
            {processSteps.map((s, i) => {
              const on = activeStep === i
              return (
                <li
                  key={s.no}
                  tabIndex={0}
                  data-active={on}
                  onPointerEnter={() => enter(i)}
                  onFocus={() => enter(i)}
                  onBlur={() => leave()}
                  className="group grid cursor-default grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-b border-on-dark/15 py-3 focus-visible:outline-offset-[-2px] md:grid-cols-[3.5rem_1fr] md:py-[clamp(0.75rem,2.2dvh,1.5rem)]"
                >
                  <span className="font-grotesk text-sm font-medium text-on-dark-soft tabular-nums transition-colors duration-500 group-data-[active=true]:text-champagne">
                    {s.no}
                  </span>
                  <div>
                    <h3 className="font-grotesk text-[1.75rem] leading-none font-extrabold tracking-tight text-transparent not-italic uppercase transition-[color,-webkit-text-stroke-color] duration-500 [-webkit-text-stroke:1.25px_var(--color-on-dark-soft)] group-data-[active=true]:text-on-dark group-data-[active=true]:[-webkit-text-stroke-color:transparent] md:text-[clamp(2rem,5.2dvh,3.25rem)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 hidden max-w-sm text-sm text-on-dark-soft md:block">{s.body}</p>
                  </div>
                </li>
              )
            })}
          </ol>
          {/* Mobile: chỉ hiện mô tả của bước đang chọn để section vừa một màn hình */}
          <p aria-live="polite" className="mt-4 min-h-[2.5rem] text-sm text-on-dark-soft md:hidden">
            {activeStep === null ? 'Chạm vào từng bước để xem chi tiết.' : processSteps[activeStep].body}
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:flex lg:h-full lg:items-center lg:justify-end">
          <div
            className="process-mask relative aspect-[16/10] w-full overflow-hidden transition-[clip-path] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[clip-path] lg:aspect-[4/5] lg:h-full lg:max-h-[46rem] lg:w-auto"
            style={{ clipPath: activeStep === null ? MASKS.default : MASKS.steps[activeStep] }}
          >
            {photos.map((p, i) => (
              <div
                key={p.id}
                aria-hidden={i !== shown}
                className={`absolute inset-0 transition-opacity duration-600 ${i === shown ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
              >
                {/* Ảnh bên trong phóng + lia nhẹ theo bước */}
                <div
                  className="size-full transition-transform duration-600 ease-out will-change-transform"
                  style={{ transform: activeStep === null ? 'none' : PANS[activeStep] }}
                >
                  <Img photo={p} sizes="(min-width: 1024px) 40vw, 90vw" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
