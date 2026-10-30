import { useEffect, useState } from 'react'
import { logo } from '../data/images'
import { navLeft, navRight, site } from '../data/site'
import { Modal } from './ui/Modal'
import { IconClose, IconMenu } from './ui/Icons'
import { LinkButton } from './ui/Button'

const nav = [...navLeft, ...navRight]

/**
 * Header dạng thanh nổi: trong suốt ở đầu trang, cuộn xuống thì thu thành capsule nền kem mờ.
 * Cuộn xuống thì ẩn, cuộn lên thì hiện lại; mục đang xem được đánh dấu màu chủ đạo.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [current, setCurrent] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Bỏ qua dao động nhỏ để thanh không giật
      if (Math.abs(y - lastY) > 8) {
        setHidden(y > lastY && y > 480)
        lastY = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Đánh dấu section đang nằm giữa màn hình
  useEffect(() => {
    const sections = nav.map((n) => document.querySelector<HTMLElement>(n.href)).filter((s): s is HTMLElement => s !== null)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 px-3 pt-3 transition-transform duration-500 ease-(--ease-soft) md:px-5 md:pt-4 ${
        hidden && !menuOpen ? '-translate-y-[130%]' : 'translate-y-0'
      }`}
    >
      <div
        className={`mx-auto flex h-14 max-w-[80rem] items-center justify-between gap-6 rounded-full border pr-2 pl-5 transition-[background-color,border-color,box-shadow] duration-500 md:h-16 md:pl-7 ${
          scrolled ? 'border-line bg-ivory/85 shadow-lg shadow-deep/5 backdrop-blur-md' : 'border-transparent'
        }`}
      >
        <a href="#top" aria-label="BACLE Photography – về đầu trang" className="shrink-0">
          <img src={logo.dark} alt={logo.alt} width={600} height={154} className="h-9 w-auto md:h-11" />
        </a>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => {
            const on = current === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={on ? 'true' : undefined}
                className={`caps relative rounded-full px-3.5 py-2.5 whitespace-nowrap transition-colors duration-300 ${
                  on ? 'bg-primary/8 text-primary' : 'text-ink/75 hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#dat-lich"
            className="caps hidden min-h-11 items-center rounded-full bg-primary px-6 whitespace-nowrap text-on-dark transition-colors duration-300 hover:bg-primary-dark sm:inline-flex"
          >
            Đặt lịch chụp
          </a>
          <button
            type="button"
            className="grid size-11 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-primary/8 hover:text-primary xl:hidden"
            aria-label="Mở menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </div>

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} label="Menu">
        <div className="flex h-full flex-col bg-cream px-6 pt-5 pb-10">
          <div className="flex items-center justify-between">
            <img src={logo.dark} alt={logo.alt} width={600} height={154} className="h-10 w-auto" />
            <button
              type="button"
              className="grid size-12 cursor-pointer place-items-center rounded-full hover:bg-primary/8"
              aria-label="Đóng menu"
              onClick={() => setMenuOpen(false)}
            >
              <IconClose />
            </button>
          </div>
          <nav aria-label="Menu di động" className="mt-10 flex flex-col">
            {[...nav, { label: 'Liên hệ', href: '#dat-lich' }].map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-5 border-b border-line py-4"
              >
                <span className="caps text-primary">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-3xl italic">{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="mt-auto grid gap-3 pt-8">
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
