import { useRef } from 'react'
import { concepts } from '../data/concepts'
import { Modal } from './ui/Modal'
import { Img } from './ui/Img'
import { Button } from './ui/Button'
import { IconClose } from './ui/Icons'

interface ConceptDetailProps {
  slug: string | null
  onClose: () => void
  onChoose: (slug: string) => void
}

const EXIT_MS = 600

/** Chi tiết concept: bảng trượt vào từ phải, lưới ảnh 2 cột, chọn concept để điền sẵn vào form đặt lịch. */
export function ConceptDetail({ slug, onClose, onChoose }: ConceptDetailProps) {
  const found = concepts.find((c) => c.slug === slug)
  // Giữ concept vừa đóng để bảng còn nội dung trong lúc trượt ra
  const last = useRef(found)
  if (found) last.current = found
  const concept = found ?? last.current

  return (
    <Modal open={found !== undefined} onClose={onClose} label={concept ? `Concept ${concept.name}` : 'Concept'} exitMs={EXIT_MS}>
      {concept ? (
        <div className="ml-auto flex h-full w-full max-w-3xl animate-[slide-in-right_.8s_var(--ease-soft)] flex-col bg-ivory group-data-closing:animate-[slide-out-right_.6s_var(--ease-soft)_forwards]">
          <div className="flex items-start justify-between gap-6 border-b border-line px-5 py-5 md:px-10 md:py-8">
            <div>
              <p className="caps text-ink-soft">{concept.kind}</p>
              <h3 className="mt-2 text-3xl md:text-5xl">{concept.name}</h3>
              <p className="mt-3 max-w-md text-sm text-ink-soft">{concept.summary}</p>
            </div>
            <button type="button" className="grid size-12 shrink-0 cursor-pointer place-items-center" onClick={onClose} aria-label="Đóng">
              <IconClose />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-10">
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {[concept.cover, ...concept.photos].map((p) => (
                <div key={p.id} className="aspect-[2/3] overflow-hidden bg-sand">
                  <Img photo={p} sizes="(min-width: 768px) 24rem, 50vw" />
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-line px-5 py-4 md:px-10">
            <Button className="w-full" onClick={() => onChoose(concept.slug)}>
              Chọn concept này & đặt lịch
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
