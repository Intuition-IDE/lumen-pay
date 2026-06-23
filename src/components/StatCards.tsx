/** The 2×2 metric tiles beside the balance hero. */
import type { ReactNode } from 'react'
import { Pulse, Clock, Card, Shield } from './Icons'

interface Tile {
  tone: 'jade' | 'amber' | 'iris'
  icon: ReactNode
  label: string
  value: string
  foot: string
}

interface Props {
  successRate: number
  txCount: number
  pending: number
  delay?: number
}

export function StatCards({ successRate, txCount, pending, delay = 0 }: Props) {
  const tiles: Tile[] = [
    {
      tone: 'jade',
      icon: <Pulse />,
      label: 'Success rate',
      value: `${successRate}%`,
      foot: 'authorisation · 24h',
    },
    {
      tone: 'iris',
      icon: <Card />,
      label: 'Transactions',
      value: String(txCount),
      foot: 'settled today',
    },
    {
      tone: 'amber',
      icon: <Clock />,
      label: 'Pending',
      value: String(pending),
      foot: 'awaiting capture',
    },
    {
      tone: 'jade',
      icon: <Shield />,
      label: 'Risk flags',
      value: '0',
      foot: 'all clear',
    },
  ]

  return (
    <div className="stat">
      {tiles.map((t, i) => (
        <div
          key={t.label}
          className="card stat-card rise"
          style={{ animationDelay: `${delay + i * 60}ms` }}
        >
          <div className="top">
            <span className={`ic ${t.tone}`}>{t.icon}</span>
            {t.label}
          </div>
          <div className="big num">{t.value}</div>
          <div className="foot">{t.foot}</div>
        </div>
      ))}
    </div>
  )
}
