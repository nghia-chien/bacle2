import { useRef } from 'react'
import { concepts } from '../data/concepts'
import { packages, pricing } from '../data/pricing'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { Button, LinkButton } from './ui/Button'
import { SectionTitle } from './ui/SectionTitle'

interface PricingProps {
  onChoose: (slug: string) => void
}

/** Bảng gói: mỗi gói một hàng biên tập (ảnh, tên, concept trong gói, giá, nút chọn). */
export function Pricing({ onChoose }: PricingProps) {
  const scope = useRef<HTMLElement>(null)
  useReveal(scope)

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
    </section>
  )
}
