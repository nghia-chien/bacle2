import { footer } from '../data/content'
import { logo } from '../data/images'
import { navLeft, navRight, site } from '../data/site'

export function Footer() {
  const year = new Date().getFullYear()
  const link = 'text-on-dark-soft transition-colors hover:text-on-dark'
  return (
    <footer className="bg-espresso px-4 pt-20 pb-28 text-on-dark md:px-8 md:pb-12">
      <div className="mx-auto grid max-w-[80rem] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={logo.light} alt={logo.alt} width={600} height={150} loading="lazy" className="h-14 w-auto md:h-16" />
          <p className="script mt-6 text-3xl text-on-dark-soft">{site.tagline}</p>
          <p className="mt-4 max-w-xs text-sm text-on-dark-soft">{footer.note}</p>
        </div>
        <nav aria-label="Liên kết cuối trang" className="md:col-span-3">
          <p className="caps text-on-dark/60">Khám phá</p>
          <ul className="mt-5 space-y-3 text-sm">
            {[...navLeft, ...navRight].map((item) => (
              <li key={item.href}>
                <a href={item.href} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="caps text-on-dark/60">Liên hệ</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className={link}>
                Điện thoại / Zalo: {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.facebookHref} target="_blank" rel="noopener noreferrer" className={link}>
                Facebook: BACLE Photography
              </a>
            </li>
            <li>
              <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className={link}>
                Google Maps: {site.city}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-[80rem] border-t border-on-dark/15 pt-6">
        <p className="caps text-on-dark/50">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  )
}
