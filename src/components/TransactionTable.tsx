/** Full-width recent-transactions table. */
import { signed } from '../lib/money'
import { clock } from '../lib/time'
import type { Transaction } from '../types'
import { ArrowRight } from './Icons'
import { StatusPill } from './StatusPill'

interface Props {
  transactions: Transaction[]
  loading: boolean
}

function avatarInitials(name: string) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('')
}

const METHOD: Record<Transaction['method'], string> = {
  card: 'Card',
  bank_transfer: 'Bank transfer',
  wallet: 'Wallet',
}

export function TransactionTable({ transactions, loading }: Props) {
  return (
    <section className="card tbl-card rise" style={{ animationDelay: '240ms' }}>
      <div className="card__head">
        <div>
          <h3>Recent transactions</h3>
          <div className="sub">Live · auto-refreshing</div>
        </div>
        <a className="link right" href="#">
          All payments <ArrowRight style={{ width: 13, height: 13 }} />
        </a>
      </div>

      <table className="tbl">
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Customer</th>
            <th>Method</th>
            <th>Status</th>
            <th>Time</th>
            <th className="r">Amount</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6} style={{ color: 'var(--text-faint)' }}>Loading transactions…</td>
            </tr>
          )}
          {transactions.map((t) => (
            <tr key={t.id}>
              <td><span className="id">{t.id}</span></td>
              <td>
                <div className="cust">
                  <span className="ava">{avatarInitials(t.customer.name)}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{t.customer.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>{t.customer.email}</div>
                  </div>
                </div>
              </td>
              <td style={{ color: 'var(--text-dim)' }}>{METHOD[t.method]}</td>
              <td><StatusPill status={t.status} /></td>
              <td className="num" style={{ color: 'var(--text-dim)', fontSize: 12 }}>{clock(t.createdAt)}</td>
              <td className="r">
                <span className={`amt ${t.direction === 'inbound' ? 'pos' : 'neg'}`}>
                  {signed(t.amount, t.direction)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
