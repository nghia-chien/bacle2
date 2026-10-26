import { useEffect, useState } from 'react'
import { logo } from '../data/images'
import { navLeft, navRight, site } from '../data/site'
import { Modal } from './ui/Modal'
import { IconClose, IconMenu } from './ui/Icons'
import { LinkButton } from './ui/Button'

const link =
  'caps relative py-2 text-ink/80 transition-colors hover:text-ink after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100'

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
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-500 ${
        scrolled ? 'border-b border-line/70 bg-cream/95 backdrop-blur-sm' : 'border-b border-transparent'
      }`}
    >
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
          className={`transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          tabIndex={scrolled ? 0 : -1}
        >
          <img src={logo.dark} alt={logo.alt} width={600} height={150} className="h-9 w-auto md:h-11" />
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
                className="font-display border-b border-line py-4 text-4xl font-light"
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
