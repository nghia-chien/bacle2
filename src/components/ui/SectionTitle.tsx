interface SectionTitleProps {
  id: string
  /** Nhãn tiếng Anh ngắn phía trên (vd: "moments"), in hoa nhỏ bằng Be Vietnam Pro */
  script: string
  title: string
  tone?: 'dark' | 'light'
  align?: 'center' | 'left'
}

/**
 * Tiêu đề mục (H2) theo font-chu.md: Playfair Display Italic 400, 48px desktop -> 32px mobile.
 * Chữ ký Mrs Saint Delafield chỉ dùng 1 lần ở hero, nên nhãn phía trên là chữ in hoa nhỏ.
 */
export function SectionTitle({ id, script, title, tone = 'dark', align = 'center' }: SectionTitleProps) {
  const color = tone === 'dark' ? 'text-ink' : 'text-on-dark'
  const soft = tone === 'dark' ? 'text-primary' : 'text-champagne'

  return (
    <h2 id={id} className={`relative ${color} ${align === 'center' ? 'text-center' : 'text-left'}`} data-lines>
      <span className="block overflow-hidden">
        <span data-line className={`caps block ${soft}`}>
          {script}
        </span>
      </span>
      <span className="mt-3 block overflow-hidden pb-[0.12em]">
        <span data-line className="block text-[2rem] leading-[1.1] md:text-[2.5rem] lg:text-[3rem]">
          {title}
        </span>
      </span>
    </h2>
  )
}
