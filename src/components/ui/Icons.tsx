import type { SVGProps } from 'react'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

type P = SVGProps<SVGSVGElement>

export const IconClose = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...stroke} {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
)

export const IconArrow = ({ dir = 'right', ...p }: P & { dir?: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...stroke} {...p}>
    {dir === 'right' ? <path d="M4 12h16M14 6l6 6-6 6" /> : <path d="M20 12H4M10 6l-6 6 6 6" />}
  </svg>
)

export const IconMenu = (p: P) => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" {...stroke} {...p}>
    <path d="M3 8h18M3 16h18" />
  </svg>
)

export const IconMessenger = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor" {...p}>
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.43 3.15 7.17.16.15.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.98-.88a.8.8 0 0 1 .53-.04c.91.25 1.88.39 2.9.39 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z" />
  </svg>
)

export const IconPhone = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...stroke} {...p}>
    <path d="M5 4h3.5l1.5 4-2 1.2a10 10 0 0 0 6.8 6.8L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </svg>
)
