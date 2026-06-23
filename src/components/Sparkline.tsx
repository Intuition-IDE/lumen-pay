/** Minimal inline sparkline — a smoothed area line, no chart dependency. */
interface Props {
  points: number[]
  stroke?: string
}

export function Sparkline({ points, stroke = 'var(--jade)' }: Props) {
  if (points.length < 2) return null
  const w = 140
  const h = 36
  const min = Math.min(...points)
  const max = Math.max(...points)
  const span = max - min || 1

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((p - min) / span) * (h - 6) - 3
    return [x, y] as const
  })

  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${w} ${h} L0 ${h} Z`
  const [lx, ly] = coords[coords.length - 1]

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark)" />
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="2.4" fill={stroke} />
    </svg>
  )
}
