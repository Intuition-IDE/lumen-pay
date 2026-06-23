/**
 * The Overview route — the product's home screen.
 *
 * Composition only: it reads everything from `useDashboard` and lays the panels
 * out on a 12-column grid. All money/derivation logic lives in the services.
 */
import { ActivityFeed } from '../components/ActivityFeed'
import { BalanceCard } from '../components/BalanceCard'
import { PayoutChart } from '../components/PayoutChart'
import { Sidebar } from '../components/Sidebar'
import { StatCards } from '../components/StatCards'
import { Topbar } from '../components/Topbar'
import { TransactionTable } from '../components/TransactionTable'
import { useDashboard } from '../hooks/useDashboard'
import { countByStatus } from '../services/ledger'

export function Dashboard() {
  const { balance, transactions, payouts, series, activity, derived } = useDashboard()

  const txns = transactions.data ?? []
  const pending = countByStatus(txns).pending ?? 0
  const spark = (series.data ?? []).map((d) => d.payouts)

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar />
        <main className="content">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
            <BalanceCard
              balance={balance.data}
              loading={balance.loading}
              payoutTotal={derived.payoutTotal}
              spark={spark}
            />
            <StatCards
              successRate={derived.successRate}
              txCount={derived.txCount}
              pending={pending}
              riskFlags={derived.riskFlags}
              delay={80}
            />
            <PayoutChart series={series.data ?? []} loading={series.loading} />
            <ActivityFeed events={activity.data ?? []} loading={activity.loading} />
            <TransactionTable transactions={txns} loading={transactions.loading} />
          </div>

          <p style={{ marginTop: 28, color: 'var(--text-faint)', fontSize: 12, textAlign: 'center' }}>
            {payouts.data?.length ?? 0} payouts scheduled · ledger synced just now · Lumen Pay v1.4.0
          </p>
        </main>
      </div>
    </div>
  )
}
