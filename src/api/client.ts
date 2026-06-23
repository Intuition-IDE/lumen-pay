/**
 * api/client — the single transport seam between the app and the backend.
 *
 * Every service goes through `request()`. In this build it resolves from local
 * fixtures with simulated network latency, but the call sites are written as if
 * they hit `https://api.lumenpay.com/v1` — swap `USE_FIXTURES` to false and
 * point `BASE_URL` at the real gateway and nothing else changes.
 */
import {
  activityFixture,
  balanceFixture,
  payoutsFixture,
  seriesFixture,
  transactionsFixture,
} from '../data/fixtures'

export const BASE_URL = 'https://api.lumenpay.com/v1'
const USE_FIXTURES = true

type Path =
  | '/balance'
  | '/metrics/series'
  | '/transactions'
  | '/payouts'
  | '/activity'

const FIXTURES: Record<Path, unknown> = {
  '/balance': balanceFixture,
  '/metrics/series': seriesFixture,
  '/transactions': transactionsFixture,
  '/payouts': payoutsFixture,
  '/activity': activityFixture,
}

let authToken: string | null = null

/** Attach the bearer token used for every subsequent request. */
export function setAuthToken(token: string | null) {
  authToken = token
}

function latency() {
  // jitter so the loading states actually breathe in a demo
  return 280 + Math.floor(Math.random() * 360)
}

/** Core request primitive. Mirrors `fetch`, returns parsed JSON of type T. */
export async function request<T>(path: Path, init?: RequestInit): Promise<T> {
  if (USE_FIXTURES) {
    await new Promise((r) => setTimeout(r, latency()))
    return structuredClone(FIXTURES[path]) as T
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...init?.headers,
    },
  })
  if (!res.ok) throw new ApiError(res.status, await res.text())
  return (await res.json()) as T
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}
