/**
 * hooks/useAuth — the session context.
 *
 * Wraps `services/auth` in React state and exposes it to the tree. Components
 * read `session` and call `signIn` / `signOut` without touching the service
 * directly. This is the gate the router checks to decide login vs dashboard.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as auth from '../services/auth'
import type { Credentials } from '../services/auth'
import type { Session } from '../types'

interface AuthValue {
  session: Session | null
  signIn: (creds: Credentials) => Promise<void>
  signOut: () => void
  toggleEnvironment: () => void
}

const Ctx = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => auth.restore())

  const signIn = useCallback(async (creds: Credentials) => {
    setSession(await auth.login(creds))
  }, [])

  const signOut = useCallback(() => {
    auth.logout()
    setSession(null)
  }, [])

  const toggleEnvironment = useCallback(() => {
    setSession((s) =>
      s ? auth.setEnvironment(s, s.environment === 'live' ? 'test' : 'live') : s,
    )
  }, [])

  const value = useMemo(
    () => ({ session, signIn, signOut, toggleEnvironment }),
    [session, signIn, signOut, toggleEnvironment],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
