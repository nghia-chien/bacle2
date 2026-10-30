import { site } from '../data/site'
import { IconMessenger } from './ui/Icons'

/** Nút Zalo / Messenger nổi, luôn trong tầm tay ở mọi kích thước màn hình. */
export function FloatingContact() {
  const btn =
    'grid size-12 place-items-center md:size-13 rounded-full border border-primary/15 bg-ivory text-primary shadow-lg shadow-deep/25 transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-on-dark'
  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col gap-3 md:right-6 md:bottom-6">
      <a href={site.messengerHref} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Nhắn tin qua Messenger">
        <IconMessenger />
      </a>
      <a href={site.zaloHref} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Nhắn tin qua Zalo">
        <span className="text-[0.8rem] font-medium tracking-wide">Zalo</span>
      </a>
    </div>
  )
}
