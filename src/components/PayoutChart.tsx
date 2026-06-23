/**
 * Volume vs payouts over the week — a two-series area chart drawn by hand in
 * SVG (no chart lib). Hovering a column surfaces a tooltip with the exact values.
 */
import { useState } from 'react'
import type { MetricPoint } from '../types'

interface Props {
  series: MetricPoint[]
  loading: boolean
}

const W = 720
const H = 240
const PAD = { t: 16, r: 8, b: 28, l: 8 }

function buildPath(values: number[], max: number, close: boolean) {
  const innerW = W - PAD.l - PAD.r
  const innerH = H - PAD.t - PAD.b
  const pts = values.map((v, i) => {
    const x = PAD.l + (i / (values.length - 1)) * innerW
    const y = PAD.t + innerH - (v / max) * innerH
    return [x, y] as const
  })
  // smooth with a simple monotone-ish curve
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const cx = (x0 + x1) / 2
    d += ` C${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`
  }
  if (close) d += ` L${PAD.l + innerW} ${PAD.t + innerH} L${PAD.l} ${PAD.t + innerH} Z`
  return { d, pts }
}

export function PayoutChart({ series, loading }: Props) {
  const [hover, setHover] = useState<number | null>(null)
  const data = series
  const ready = data.length >= 2
  const max = Math.max(1, ...data.map((d) => Math.max(d.volume, d.payouts))) * 1.15

  // Only trace paths once we have a real series — buildPath needs ≥2 points.
  const vol = ready ? buildPath(data.map((d) => d.volume), max, false) : null
  const volFill = ready ? buildPath(data.map((d) => d.payouts), max, true) : null
  const pay = ready ? buildPath(data.map((d) => d.payouts), max, false) : null
  const innerW = W - PAD.l - PAD.r

  return (
    <section className="card chart rise" style={{ animationDelay: '120ms' }}>
      <div className="card__head">
        <div>
          <h3>Processing volume</h3>
          <div className="sub">Volume vs. payouts · this week</div>
        </div>
        <div className="chart__legend">
          <span><i style={{ background: 'var(--iris)' }} /> Volume</span>
          <span><i style={{ background: 'var(--jade)' }} /> Payouts</span>
        </div>
      </div>

      <div className="card__body" style={{ position: 'relative' }}>
        {!loading && ready && vol && volFill && pay && (
          <svg className="chart__svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="vfill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--jade)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--jade)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0.25, 0.5, 0.75].map((g) => (
              <line key={g} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + g * (H - PAD.t - PAD.b)} y2={PAD.t + g * (H - PAD.t - PAD.b)} stroke="var(--line)" strokeWidth="1" />
            ))}

            <path d={volFill.d} fill="url(#vfill)" />
            <path d={vol.d} fill="none" stroke="var(--iris)" strokeWidth="2.2" strokeLinecap="round" />
            <path d={pay.d} fill="none" stroke="var(--jade)" strokeWidth="2.4" strokeLinecap="round" />

            {hover !== null && (
              <g>
                <line x1={pay.pts[hover][0]} x2={pay.pts[hover][0]} y1={PAD.t} y2={H - PAD.b} stroke="var(--line-strong)" strokeWidth="1" />
                <circle cx={vol.pts[hover][0]} cy={vol.pts[hover][1]} r="4" fill="var(--iris)" stroke="var(--ink)" strokeWidth="2" />
                <circle cx={pay.pts[hover][0]} cy={pay.pts[hover][1]} r="4" fill="var(--jade)" stroke="var(--ink)" strokeWidth="2" />
              </g>
            )}

            {data.map((_, i) => (
              <rect
                key={i}
                x={PAD.l + (i / (data.length - 1)) * innerW - innerW / data.length / 2}
                y={0}
                width={innerW / data.length}
                height={H}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </svg>
        )}

        {hover !== null && pay && data[hover] && (
          <div
            className="chart__tip show"
            style={{
              left: `${(pay.pts[hover][0] / W) * 100}%`,
              top: `${(pay.pts[hover][1] / H) * 100}%`,
            }}
          >
            <div className="d">{data[hover].label}</div>
            <div className="a" style={{ color: 'var(--iris)' }}>${data[hover].volume.toLocaleString()}</div>
            <div className="a" style={{ color: 'var(--jade)' }}>${data[hover].payouts.toLocaleString()}</div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, color: 'var(--text-faint)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
          {data.map((d) => (
            <span key={d.label}>{d.label}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
