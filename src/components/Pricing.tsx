import { useRef } from 'react'
import { pricing } from '../data/pricing'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Img } from './ui/Img'
import { LinkButton } from './ui/Button'
import { SectionTitle } from './ui/SectionTitle'
import { IconMessenger } from './ui/Icons'

/**
 * Ngược với phần Câu chuyện: ảnh nền đứng yên phủ kín viewport (sticky),
 * khối nội dung nền kem cuộn lên trên ảnh rồi đi qua.
 */
export function Pricing() {
  const scope = useRef<HTMLElement>(null)
  useReveal(scope)

  return (
    <section id="bang-gia" ref={scope} aria-labelledby="pricing-title" className="relative isolate bg-espresso">
      {/* Ảnh sticky nằm trong lớp absolute = đúng chiều cao section, nên dừng lại ở cuối section, không đè section sau */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="sticky top-0 h-dvh overflow-hidden">
          <Img photo={pricing.background} sizes="100vw" />
          <div className="absolute inset-0 bg-espresso/20" />
        </div>
      </div>

      <div className="relative flex min-h-[180dvh] items-center justify-center px-4 py-[45dvh]">
        <div className="w-full max-w-2xl bg-cream px-6 py-16 text-center shadow-[0_30px_80px_-30px_rgb(35_26_22/0.6)] md:px-14 md:py-20">
          <SectionTitle id="pricing-title" script={pricing.script} title={pricing.title} />

          {pricing.packages.length > 0 ? (
            <ul className="mt-12 grid gap-px bg-line text-left sm:grid-cols-2">
              {pricing.packages.map((pkg) => (
                <li key={pkg.name} className="bg-cream p-8">
                  <h3 className="text-[1.75rem] font-bold md:text-[2.25rem]">{pkg.name}</h3>
                  <p className="font-display mt-2 text-[1.75rem] font-bold text-ink italic">{pkg.price}</p>
                  <ul className="mt-5 space-y-2 text-sm text-ink-soft">
                    {pkg.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p data-reveal="up" className="mx-auto mt-7 max-w-md text-base text-ink-soft">
              {pricing.emptyNote}
            </p>
          )}

          <div data-reveal="up" className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href={site.zaloHref}>Nhận báo giá qua Zalo</LinkButton>
            <LinkButton href={site.messengerHref} variant="outline">
              <IconMessenger width={18} height={18} /> Messenger
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
