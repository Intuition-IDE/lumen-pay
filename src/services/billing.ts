/**
 * services/billing — payouts and the volume series that drives the chart.
 *
 * Wraps the payout endpoints and, on settlement, notifies the merchant through
 * the webhook layer. This is the only service that talks to `api/webhooks`.
 */
import { request } from '../api/client'
import { emit } from '../api/webhooks'
import type { MetricPoint, Money, Payout } from '../types'

export async function listPayouts(): Promise<Payout[]> {
  return request<Payout[]>('/payouts')
}

export async function getSeries(): Promise<MetricPoint[]> {
  return request<MetricPoint[]>('/metrics/series')
}

/** Total moved out over the series window. Feeds the balance card footer. */
export function totalPayouts(series: MetricPoint[]): Money {
  const cents = series.reduce((sum, p) => sum + p.payouts, 0) * 100
  return { cents, currency: 'USD' }
}

/** Total processing volume over the window. */
export function totalVolume(series: MetricPoint[]): Money {
  const cents = series.reduce((sum, p) => sum + p.volume, 0) * 100
  return { cents, currency: 'USD' }
}

/** Mark a payout as paid and fan the event out to subscribed endpoints. */
export async function settlePayout(payout: Payout): Promise<Payout> {
  const settled: Payout = { ...payout, status: 'paid' }
  await emit('payout.paid', settled)
  return settled
}
