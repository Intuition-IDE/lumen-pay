/**
 * The sign-in route. A split layout: an editorial brand panel on the left, the
 * credential form on the right. On success the auth context flips and the
 * router (in App) swaps this out for the dashboard.
 */
import { useState, type FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Spark } from '../components/Icons'

export function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('maya@northwind.co')
  const [password, setPassword] = useState('lumen-demo')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await signIn({ email, password })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setBusy(false)
    }
  }

  return (
    <div className="auth">
      <aside className="auth__aside">
        <div className="brand">
          <div className="brand__mark">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M9 8.5V23.5H22" stroke="#57E0A0" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="22" cy="9.5" r="3.4" fill="#57E0A0" />
            </svg>
          </div>
          <div className="brand__name">Lumen<b>.</b></div>
        </div>

        <blockquote className="auth__quote">
          We moved <em>$2.4 billion</em> through Lumen last year without thinking about
          payments once. It just clears.
          <div className="auth__cite">
            <div className="avatar" style={{ width: 30, height: 30 }}>DR</div>
            Dara Reyes · CFO, Northwind
          </div>
        </blockquote>

        <div className="auth__metrics">
          <div>
            <div className="k num">99.99%</div>
            <div className="l">uptime · 12 mo</div>
          </div>
          <div>
            <div className="k num">38ms</div>
            <div className="l">median auth</div>
          </div>
          <div>
            <div className="k num">190+</div>
            <div className="l">countries</div>
          </div>
        </div>
      </aside>

      <div className="auth__main">
        <form className="auth__form" onSubmit={onSubmit}>
          <h1>Welcome back</h1>
          <p className="lede">Sign in to your Lumen Pay workspace.</p>

          <div className="field">
            <label htmlFor="email">Work email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          <div className="auth__row">
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-dim)' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--jade)' }} /> Keep me signed in
            </label>
            <a className="link" href="#">Forgot password?</a>
          </div>

          {error && (
            <div style={{ color: 'var(--coral)', fontSize: 12.5, marginBottom: 14 }}>{error}</div>
          )}

          <button className="btn btn--primary btn--block" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="auth__divider">or continue with</div>
          <div className="auth__sso">
            <button type="button" className="btn btn--ghost"><Spark style={{ width: 15, height: 15 }} /> SSO</button>
            <button type="button" className="btn btn--ghost">Passkey</button>
          </div>

          <p className="auth__foot">
            New to Lumen? <a className="link" href="#">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  )
}
