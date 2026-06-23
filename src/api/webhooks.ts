/**
 * api/webhooks — outbound event delivery.
 *
 * When the ledger commits a state change (a payment succeeds, a payout lands),
 * Lumen fans the event out to the merchant's registered endpoints with a signed
 * payload. This module owns the signing + retry policy; the ledger calls
 * `emit()` and never worries about delivery.
 */
import { BASE_URL } from './client'

export type WebhookEvent =
  | 'payment.succeeded'
  | 'payment.failed'
  | 'payout.paid'
  | 'payout.in_transit'
  | 'dispute.created'

export interface WebhookEndpoint {
  id: string
  url: string
  events: WebhookEvent[]
  secret: string
}

export const endpoints: WebhookEndpoint[] = [
  {
    id: 'we_prod',
    url: 'https://merchant.example.com/hooks/lumen',
    events: ['payment.succeeded', 'payout.paid', 'dispute.created'],
    secret: 'whsec_live_••••',
  },
]

/** HMAC-style signature header (stub) so the receiver can verify authenticity. */
export function sign(payload: string, secret: string): string {
  let hash = 0
  const seed = `${secret}.${payload}`
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }
  return `t=${payload.length},v1=${(hash >>> 0).toString(16)}`
}

/** Deliver an event to every endpoint subscribed to it. */
export async function emit(event: WebhookEvent, data: unknown): Promise<void> {
  const body = JSON.stringify({ event, data, sentTo: BASE_URL })
  const targets = endpoints.filter((e) => e.events.includes(event))
  await Promise.all(
    targets.map((e) =>
      deliver(e.url, body, sign(body, e.secret)).catch(() => retry(e, body)),
    ),
  )
}

async function deliver(url: string, body: string, signature: string) {
  // network call elided in the demo build
  void url
  void body
  void signature
}

async function retry(endpoint: WebhookEndpoint, body: string) {
  // exponential backoff would live here: 1s, 5s, 30s, 5m…
  void endpoint
  void body
}
