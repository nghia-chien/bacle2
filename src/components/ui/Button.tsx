import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'outline' | 'light' | 'solid-light'

const base =
  'caps inline-flex min-h-12 items-center justify-center gap-3 px-7 py-3 text-center transition-[background-color,color,border-color] duration-300 ease-(--ease-soft) cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  solid: 'bg-primary text-on-dark border border-primary hover:bg-primary-dark hover:border-primary-dark',
  outline: 'border border-primary/60 text-primary hover:bg-primary hover:text-on-dark',
  light: 'border border-on-dark/70 text-on-dark hover:bg-on-dark hover:text-ink',
  'solid-light': 'bg-on-dark text-primary border border-on-dark hover:bg-transparent hover:text-on-dark',
}

interface Common {
  variant?: Variant
  children: ReactNode
  className?: string
}

export function LinkButton({
  variant = 'solid',
  className = '',
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = rest.href?.startsWith('http')
  return (
    <a
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}

export function Button({
  variant = 'solid',
  className = '',
  children,
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
