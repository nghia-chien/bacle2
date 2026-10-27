import { useEffect, useState } from 'react'
import { logo } from '../data/images'
import { navLeft, navRight, site } from '../data/site'
import { Modal } from './ui/Modal'
import { IconClose, IconMenu } from './ui/Icons'
import { LinkButton } from './ui/Button'

const link =
  'caps relative py-2 text-ink/80 transition-colors hover:text-ink after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100'

// Lower edge of the logo tab (viewBox 400×150): notched corners, then ogee curves meeting at a centre point
const tabEdge =
  'M400 0V38A14 14 0 0 0 386 52V62C386 84 340 80 300 96C250 116 214 116 200 142C186 116 150 116 100 96C60 80 14 84 14 62V52A14 14 0 0 0 0 38V0'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Background lives on its own layer so the hanging logo tab can blur the page behind it too */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 border-b transition-[background-color,border-color] duration-500 ${
          scrolled ? 'border-line/70 bg-cream/95 backdrop-blur-sm' : 'border-transparent'
        }`}
      />
      <div className="mx-auto grid h-16 max-w-[90rem] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[4.5rem] md:px-8">
        <nav aria-label="Điều hướng chính" className="hidden items-center gap-8 lg:flex">
          {navLeft.map((item) => (
            <a key={item.href} href={item.href} className={link}>
              {item.label}
            </a>
          ))}
        </nav>
        <span className="lg:hidden" />

        <a
          href="#top"
          aria-label="BACLE Photography – về đầu trang"
          className={`relative block h-full w-[14.75rem] transition-opacity duration-500 lg:w-[22rem] xl:w-[27.5rem] ${
            scrolled ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          tabIndex={scrolled ? 0 : -1}
        >
          {/* Swash lines sit on the header's bottom edge; an invitation-card tab backs the half hanging below */}
          <span aria-hidden className="absolute top-full left-1/2 -mt-px aspect-[8/3] w-[60%] -translate-x-1/2">
            {/* Inner line of the bar's double border, running out from the tab's inner line on both sides */}
            <span className="absolute right-[97%] -top-[5px] h-px w-screen bg-line/70" />
            <span className="absolute left-[97%] -top-[5px] h-px w-screen bg-line/70" />
            <span className="absolute left-[3%] -top-[5px] h-[5px] w-px bg-line/70" />
            <span className="absolute left-[97%] -top-[5px] h-[5px] w-px bg-line/70" />
            <span
              className="absolute inset-0 bg-cream/95 backdrop-blur-sm"
              style={{ clipPath: 'url(#header-tab-clip)' }}
            />
            <svg viewBox="0 0 400 150" className="absolute inset-0 size-full overflow-visible">
              <clipPath id="header-tab-clip" clipPathUnits="objectBoundingBox">
                <path d={`${tabEdge}Z`} transform="scale(0.0025 0.00667)" />
              </clipPath>
              <g className="fill-none stroke-line/70" strokeWidth={1}>
                <path d={tabEdge} vectorEffect="non-scaling-stroke" />
                <path d={tabEdge} vectorEffect="non-scaling-stroke" transform="translate(12 0) scale(0.94 0.92)" />
              </g>
            </svg>
          </span>
          <img
            src={logo.mark}
            alt={logo.alt}
            width={1084}
            height={295}
            className="absolute top-full left-1/2 h-16 w-auto max-w-none -translate-x-1/2 -translate-y-[55%] lg:h-24 xl:h-30"
          />
        </a>

        <div className="flex items-center justify-end gap-8">
          <nav aria-label="Điều hướng phụ" className="hidden items-center gap-8 lg:flex">
            {navRight.map((item) => (
              <a key={item.href} href={item.href} className={link}>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#dat-lich"
            className="caps hidden min-h-11 items-center border border-ink/70 px-5 text-ink transition-colors duration-300 hover:bg-ink hover:text-cream lg:inline-flex"
          >
            Đặt lịch chụp
          </a>
          <button
            type="button"
            className="grid size-12 cursor-pointer place-items-center text-ink lg:hidden"
            aria-label="Mở menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </div>

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} label="Menu">
        <div className="flex h-full flex-col bg-cream px-6 pt-4 pb-10">
          <div className="flex items-center justify-between">
            <img src={logo.dark} alt={logo.alt} width={600} height={150} className="h-9 w-auto" />
            <button
              type="button"
              className="grid size-12 cursor-pointer place-items-center"
              aria-label="Đóng menu"
              onClick={() => setMenuOpen(false)}
            >
              <IconClose />
            </button>
          </div>
          <nav aria-label="Menu di động" className="mt-12 flex flex-col">
            {[...navLeft, ...navRight, { label: 'Liên hệ', href: '#dat-lich' }].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line py-5 text-base tracking-[0.12em] uppercase"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto grid gap-3">
            <LinkButton href="#dat-lich" onClick={() => setMenuOpen(false)}>
              Đặt lịch chụp
            </LinkButton>
            <a href={site.phoneHref} className="caps py-3 text-center text-ink-soft">
              Gọi {site.phoneDisplay}
            </a>
          </div>
        </div>
      </Modal>
    </header>
  )
}
