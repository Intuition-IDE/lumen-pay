/**
 * App — the auth gate.
 *
 * One decision: if there's a session, show the dashboard; otherwise the login
 * screen. `useAuth` is the single source of truth, so signing in or out swaps
 * the whole view with no router juggling.
 */
import { Dashboard } from './routes/Dashboard'
import { Login } from './routes/Login'
import { useAuth } from './hooks/useAuth'

export function App() {
  const { session } = useAuth()
  return session ? <Dashboard /> : <Login />
}
