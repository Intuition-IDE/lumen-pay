/** Hero card: available balance, trend, and the pending/reserved breakdown. */
import { format, splitCents } from '../lib/money'
import type { BalanceSummary, Money } from '../types'
import { ArrowDown, ArrowUp, Wallet } from './Icons'
import { Sparkline } from './Sparkline'

interface Props {
  balance: BalanceSummary | null
  loading: boolean
  payoutTotal: Money | null
  spark: number[]
}

export function BalanceCard({ balance, loading, payoutTotal, spark }: Props) {
  const up = (balance?.trend ?? 0) >= 0
  const [whole, cents] = balance
    ? splitCents(balance.available)
    : ['$0', '00']

  return (
    <section className="card balance rise" style={{ animationDelay: '40ms' }}>
      <div className="balance__label">
        <Wallet style={{ width: 16, height: 16, color: 'var(--jade)' }} />
        Available balance · USD
      </div>

      <div className="balance__amount">
        {loading ? '—' : whole}
        <span className="cents">{loading ? '' : `.${cents}`}</span>
      </div>

      <div className="balance__row">
        <span className={`delta ${up ? 'up' : 'down'}`}>
          {up ? <ArrowUp style={{ width: 12, height: 12 }} /> : <ArrowDown style={{ width: 12, height: 12 }} />}
          {Math.abs(balance?.trend ?? 0)}%
        </span>
        <span style={{ color: 'var(--text-faint)', fontSize: 12.5 }}>vs. last 7 days</span>
        <div style={{ marginLeft: 'auto', width: 140, height: 36 }}>
          <Sparkline points={spark} />
        </div>
      </div>

      <div className="balance__foot">
        <div>
          <div className="k">Pending</div>
          <div className="v num">{balance ? format(balance.pending) : '—'}</div>
        </div>
        <div>
          <div className="k">Reserved</div>
          <div className="v num">{balance ? format(balance.reserved) : '—'}</div>
        </div>
        <div>
          <div className="k">Paid out · 7d</div>
          <div className="v num">{payoutTotal ? format(payoutTotal, { cents: false }) : '—'}</div>
        </div>
      </div>
    </section>
  )
}
