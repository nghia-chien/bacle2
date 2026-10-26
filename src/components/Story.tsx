import { useRef } from 'react'
import { story } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { LinkButton } from './ui/Button'

/**
 * Một ảnh dọc lớn phủ kín section và cuộn theo trang (từ trần đèn chùm xuống chân cầu thang),
 * trong khi khối chữ đứng yên giữa viewport (CSS sticky, không chặn cuộn).
 * Chiều cao section bám theo tỉ lệ ảnh 2:3 trên desktop để ảnh hiện trọn khi cuộn qua.
 */
export function Story() {
  const scope = useRef<HTMLElement>(null)
  useReveal(scope)

  return (
    <section
      id="cau-chuyen"
      ref={scope}
      aria-labelledby="story-title"
      className="relative h-[210dvh] bg-espresso lg:h-[min(150vw,260dvh)]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Img photo={story.background} sizes="100vw" />
        <div className="absolute inset-0 bg-espresso/45" />
      </div>

      <div className="sticky top-0 flex h-dvh items-center justify-center px-6">
        <div className="max-w-lg text-center text-on-dark">
          <h2 id="story-title" data-lines className="text-[clamp(2.5rem,5vw,4rem)]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-line className="block">
                {story.title}
              </span>
            </span>
          </h2>
          <p data-reveal="up" className="script mt-4 text-[clamp(1.9rem,3.4vw,2.6rem)] text-on-dark-soft">
            {story.script}
          </p>
          <p data-reveal="up" className="mx-auto mt-6 max-w-md text-[0.95rem] leading-relaxed text-on-dark/90">
            {story.body}
          </p>
          <div data-reveal="up" className="mt-9">
            <LinkButton href={story.cta.href} variant="light">
              {story.cta.label}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
