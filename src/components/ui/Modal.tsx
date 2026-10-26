import { useEffect, useRef, useState, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  label: string
  className?: string
  /**
   * Thời gian (ms) chạy hiệu ứng thoát trước khi đóng hẳn. Trong lúc thoát, <dialog> có data-closing
   * để nội dung tự tạo hiệu ứng (vd: group-data-closing:...). Bỏ trống = đóng ngay.
   */
  exitMs?: number
  children: ReactNode
}

/** Hộp thoại dựa trên <dialog> gốc: tự bẫy focus, Esc để đóng, khoá cuộn trang. */
export function Modal({ open, onClose, label, className = '', exitMs = 0, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    let timer: number | undefined
    if (open) {
      delete dialog.dataset.closing
      setMounted(true)
      if (!dialog.open) dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    } else if (dialog.open) {
      const finish = () => {
        dialog.close()
        delete dialog.dataset.closing
        setMounted(false)
        document.documentElement.style.overflow = ''
      }
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (exitMs > 0 && !reduce) {
        dialog.dataset.closing = ''
        timer = window.setTimeout(finish, exitMs)
      } else {
        finish()
      }
    }
    return () => window.clearTimeout(timer)
  }, [open, exitMs])

  useEffect(() => () => void (document.documentElement.style.overflow = ''), [])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className={`group m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-espresso/80 backdrop:transition-opacity backdrop:duration-700 open:animate-[modal-in_.35s_var(--ease-soft)] data-closing:backdrop:opacity-0 ${className}`}
    >
      {open || mounted ? children : null}
    </dialog>
  )
}
