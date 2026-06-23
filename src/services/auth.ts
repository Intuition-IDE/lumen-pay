/**
 * services/auth — sessions and identity.
 *
 * Owns the login handshake, token persistence, and the current `Session`. Every
 * other service assumes auth has already primed `api/client` with a bearer
 * token, which happens here on `login()` and on `restore()` at boot.
 */
import { setAuthToken } from '../api/client'
import type { Session } from '../types'

const STORAGE_KEY = 'lumen.session'

const DEMO_USER = {
  id: 'usr_owner',
  name: 'Maya Okonkwo',
  email: 'maya@northwind.co',
  role: 'owner' as const,
}

export interface Credentials {
  email: string
  password: string
}

/** Exchange credentials for a session. Rejects on bad input. */
export async function login(creds: Credentials): Promise<Session> {
  await new Promise((r) => setTimeout(r, 650))
  if (!creds.email.includes('@') || creds.password.length < 4) {
    throw new Error('Invalid email or password')
  }
  const session: Session = {
    user: { ...DEMO_USER, email: creds.email || DEMO_USER.email },
    token: `sk_live_${Math.random().toString(36).slice(2, 14)}`,
    environment: 'live',
  }
  persist(session)
  return session
}

/** Re-hydrate a session from storage on app boot, if one exists. */
export function restore(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as Session
    setAuthToken(session.token)
    return session
  } catch {
    return null
  }
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY)
  setAuthToken(null)
}

/** Flip between live and test mode — scopes every downstream API call. */
export function setEnvironment(session: Session, env: 'live' | 'test'): Session {
  const next = { ...session, environment: env }
  persist(next)
  return next
}

function persist(session: Session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  setAuthToken(session.token)
}
