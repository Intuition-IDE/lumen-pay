/** Left navigation rail: brand, primary nav, and the signed-in user chip. */
import { useAuth } from '../hooks/useAuth'
import { Book, Card, Gear, Grid, Plug, Send, Wallet } from './Icons'

const NAV = [
  { icon: Grid, label: 'Overview', active: true },
  { icon: Card, label: 'Payments', badge: '128' },
  { icon: Send, label: 'Payouts', badge: '3' },
  { icon: Wallet, label: 'Ledger' },
  { icon: Plug, label: 'Webhooks' },
  { icon: Book, label: 'Reports' },
]

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
}

export function Sidebar() {
  const { session } = useAuth()
  const user = session?.user

  return (
    <aside className="rail">
      <div className="brand">
        <div className="brand__mark">
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
            <path d="M9 8.5V23.5H22" stroke="#57E0A0" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="22" cy="9.5" r="3.4" fill="#57E0A0" />
          </svg>
        </div>
        <div className="brand__name">
          Lumen<b>.</b>
        </div>
      </div>

      <div className="rail__label">Workspace</div>
      {NAV.map(({ icon: Icon, label, badge, active }) => (
        <a key={label} className={`nav ${active ? 'is-active' : ''}`} href="#">
          <Icon />
          {label}
          {badge && <span className="nav__badge">{badge}</span>}
        </a>
      ))}

      <div className="rail__spacer" />

      <a className="nav" href="#">
        <Gear />
        Settings
      </a>

      <div className="rail__user">
        <div className="avatar">{user ? initials(user.name) : 'LP'}</div>
        <div className="meta">
          <b>{user?.name ?? 'Lumen Pay'}</b>
          <span>{user?.email ?? 'team@lumenpay.com'}</span>
        </div>
      </div>
    </aside>
  )
}
