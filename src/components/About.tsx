import { useRef } from 'react'
import { about } from '../data/content'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { LinkButton } from './ui/Button'

export function About() {
  const scope = useRef<HTMLElement>(null)
  useReveal(scope)

  return (
    <section id="gioi-thieu" ref={scope} aria-labelledby="about-title" className="bg-cream px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[80rem] items-center gap-14 md:grid-cols-12 md:gap-8">
        <div data-reveal="clip" className="frame aspect-[4/5] overflow-hidden md:col-span-5 md:aspect-[3/4]">
          <Img photo={about.main} sizes="(min-width: 768px) 40vw, 92vw" />
        </div>

        <div className="relative md:col-span-6 md:col-start-7">
          <div
            className="frame absolute -top-6 right-0 hidden aspect-[4/5] w-36 overflow-hidden md:block lg:-top-20 lg:w-44"
            data-parallax="30"
          >
            <Img photo={about.inset} sizes="11rem" />
          </div>

          <h2 id="about-title" data-lines className="max-w-[16ch] text-[2rem] md:pt-24 md:text-[2.5rem] lg:pt-16 lg:text-[3rem]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-line className="block">
                {about.title}
              </span>
            </span>
          </h2>
          <p data-reveal="up" className="font-display mt-5 text-[1.375rem] text-ink-soft italic md:text-2xl">
            {about.script}
          </p>

          <div className="mt-8 grid gap-5 text-base text-ink-soft sm:grid-cols-2 sm:gap-8">
            {about.paragraphs.map((p) => (
              <p key={p} data-reveal="up">
                {p}
              </p>
            ))}
          </div>

          <div data-reveal="up" className="mt-10">
            <LinkButton href={site.zaloHref} variant="outline">
              {about.cta.label}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
