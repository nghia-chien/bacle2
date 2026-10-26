interface SectionTitleProps {
  id: string
  script: string
  title: string
  tone?: 'dark' | 'light'
  align?: 'center' | 'left'
  /** in hoa tiêu đề serif (kiểu "Our SERVICES") */
  caps?: boolean
  /** inline: script đứng trước tiêu đề; stack: script nằm trên, đè nhẹ xuống tiêu đề (cho tiêu đề dài) */
  layout?: 'inline' | 'stack'
}

/** Cặp chữ script + serif theo reference: script nghiêng đi kèm tiêu đề serif lớn. */
export function SectionTitle({
  id,
  script,
  title,
  tone = 'dark',
  align = 'center',
  caps = true,
  layout = 'inline',
}: SectionTitleProps) {
  const color = tone === 'dark' ? 'text-ink' : 'text-on-dark'
  const scriptCls = `script inline-block normal-case ${tone === 'dark' ? 'text-ink-soft' : 'text-on-dark-soft'}`
  const titleCls = `leading-none ${caps ? 'uppercase tracking-[0.02em]' : ''}`

  return (
    <h2
      id={id}
      className={`relative text-[clamp(2.75rem,7vw,6rem)] ${color} ${align === 'center' ? 'text-center' : 'text-left'}`}
      data-lines
    >
      {layout === 'stack' ? (
        <>
          <span className="block overflow-hidden pt-[0.1em]">
            <span data-line className={`${scriptCls} relative z-10 -mb-[0.32em] block text-[0.6em] ${align === 'center' ? '-translate-x-[18%]' : 'pl-[0.1em]'}`}>
              {script}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <span data-line className={`${titleCls} block`}>
              {title}
            </span>
          </span>
        </>
      ) : (
        <span className="block overflow-hidden pt-[0.15em] pb-[0.12em]">
          <span data-line className="block">
            <span className={`${scriptCls} mr-[0.18em] translate-y-[0.12em] text-[0.7em]`}>{script}</span>
            <span className={titleCls}>{title}</span>
          </span>
        </span>
      )}
    </h2>
  )
}
