/** Inline stroke icons (24×24, currentColor). Keeps the bundle free of an icon dep. */
import type { SVGProps } from 'react'

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

type P = SVGProps<SVGSVGElement>

export const Grid = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
)
export const Card = (p: P) => (
  <svg {...base} {...p}><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19"/></svg>
)
export const Send = (p: P) => (
  <svg {...base} {...p}><path d="M21 3 10.5 13.5"/><path d="M21 3l-6.5 18-4-8-8-4Z"/></svg>
)
export const Book = (p: P) => (
  <svg {...base} {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"/></svg>
)
export const Plug = (p: P) => (
  <svg {...base} {...p}><path d="M9 3v6M15 3v6"/><path d="M6 9h12v3a6 6 0 0 1-12 0Z"/><path d="M12 18v3"/></svg>
)
export const Gear = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
)
export const Search = (p: P) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
)
export const Bell = (p: P) => (
  <svg {...base} {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
)
export const Plus = (p: P) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14"/></svg>
)
export const ArrowUp = (p: P) => (
  <svg {...base} {...p}><path d="M12 19V5M5 12l7-7 7 7"/></svg>
)
export const ArrowDown = (p: P) => (
  <svg {...base} {...p}><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
)
export const ArrowRight = (p: P) => (
  <svg {...base} {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
)
export const Wallet = (p: P) => (
  <svg {...base} {...p}><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5Z"/><path d="M16 12h2"/></svg>
)
export const Pulse = (p: P) => (
  <svg {...base} {...p}><path d="M3 12h4l2 6 4-14 2 8h6"/></svg>
)
export const Clock = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
)
export const Shield = (p: P) => (
  <svg {...base} {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6Z"/><path d="m9 12 2 2 4-4"/></svg>
)
export const Spark = (p: P) => (
  <svg {...base} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z"/></svg>
)
