/**
 * services/ledger — the source of truth for money movement.
 *
 * Reads balances and transactions through the API, and is the one place that
 * knows how to roll a list of transactions up into a balance. The dashboard
 * never sums money itself — it asks the ledger.
 */
import { request } from '../api/client'
import { add } from '../lib/money'
import { assess } from './risk'
import type { BalanceSummary, Money, Transaction } from '../types'

export async function getBalance(): Promise<BalanceSummary> {
  return request<BalanceSummary>('/balance')
}

export async function listTransactions(): Promise<Transaction[]> {
  const txns = await request<Transaction[]>('/transactions')
  // Risk scoring is part of the read path — every transaction is assessed
  // before it reaches the dashboard.
  return txns.map(assess)
}

/** Net settled position from a set of transactions (succeeded only). */
export function settledTotal(txns: Transaction[]): Money {
  return txns
    .filter((t) => t.status === 'succeeded')
    .reduce<Money>(
      (acc, t) => {
        const delta = t.direction === 'inbound' ? t.amount.cents : -t.amount.cents
        return add(acc, { cents: delta, currency: t.amount.currency })
      },
      { cents: 0, currency: 'USD' },
    )
}

/** Share of transactions that cleared — the headline reliability metric. */
export function successRate(txns: Transaction[]): number {
  if (txns.length === 0) return 0
  const ok = txns.filter((t) => t.status === 'succeeded').length
  return Math.round((ok / txns.length) * 1000) / 10
}

export function countByStatus(txns: Transaction[]) {
  return txns.reduce<Record<string, number>>((acc, t) => {
    acc[t.status] = (acc[t.status] ?? 0) + 1
    return acc
  }, {})
}
