/** Sticky header: page title, command search, live/test toggle, alerts, new-payment CTA. */
import { useAuth } from '../hooks/useAuth'
import { Bell, Plus, Search } from './Icons'

export function Topbar() {
  const { session, toggleEnvironment } = useAuth()
  const env = session?.environment ?? 'live'

  return (
    <header className="topbar">
      <div>
        <div className="topbar__title">Overview</div>
      </div>
      <span className="topbar__crumb">Northwind Co · Acct #ac_9f21</span>

      <div className="search">
        <Search />
        <input placeholder="Search payments, customers, payouts…" />
        <kbd>⌘K</kbd>
      </div>

      <div className="segmented" role="tablist" aria-label="Environment">
        <button className={env === 'live' ? 'is-on' : ''} onClick={() => env !== 'live' && toggleEnvironment()}>
          <span className="dot" /> Live
        </button>
        <button className={env === 'test' ? 'is-on' : ''} onClick={() => env !== 'test' && toggleEnvironment()}>
          <span className="dot" /> Test
        </button>
      </div>

      <button className="icon-btn" aria-label="Notifications">
        <Bell />
        <span className="ping" />
      </button>

      <button className="btn btn--primary">
        <Plus /> New payment
      </button>
    </header>
  )
}
