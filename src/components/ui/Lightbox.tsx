import { useEffect } from 'react'
import type { Photo } from '../../data/images'
import { photoSrc } from '../../data/images'
import { Modal } from './Modal'
import { IconArrow, IconClose } from './Icons'

interface LightboxProps {
  photos: Photo[]
  index: number | null
  onChange: (index: number | null) => void
  label: string
}

export function Lightbox({ photos, index, onChange, label }: LightboxProps) {
  const open = index !== null
  const photo = index !== null ? photos[index] : undefined
  const go = (step: number) => {
    if (index === null) return
    onChange((index + step + photos.length) % photos.length)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const ctrl =
    'grid size-12 place-items-center text-on-dark/80 transition-colors hover:text-on-dark cursor-pointer'

  return (
    <Modal open={open} onClose={() => onChange(null)} label={label}>
      {photo && index !== null ? (
        <div className="flex h-full flex-col text-on-dark" onClick={(e) => e.target === e.currentTarget && onChange(null)}>
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <p className="caps text-on-dark-soft" aria-live="polite">
              {index + 1} / {photos.length}
            </p>
            <button type="button" className={ctrl} onClick={() => onChange(null)} aria-label="Đóng">
              <IconClose />
            </button>
          </div>
          <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-4 pb-6 md:px-24">
            <img
              key={photo.id}
              src={photoSrc(photo.id, 1600)}
              alt={photo.alt}
              className="min-h-0 max-w-full flex-1 object-contain animate-[fade-in_.4s_ease-out]"
            />
            <figcaption className="max-w-xl text-center text-sm text-on-dark-soft">{photo.alt}</figcaption>
          </figure>
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-1 md:px-6">
            <button type="button" className={`${ctrl} pointer-events-auto`} onClick={() => go(-1)} aria-label="Ảnh trước">
              <IconArrow dir="left" />
            </button>
            <button type="button" className={`${ctrl} pointer-events-auto`} onClick={() => go(1)} aria-label="Ảnh tiếp theo">
              <IconArrow />
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
