/**
 * hooks/useDashboard — the data spine of the Overview page.
 *
 * Pulls balance, transactions, payouts, series and activity in parallel and
 * derives the headline metrics (success rate, totals) via the ledger/billing
 * services so the view stays declarative. The Dashboard route reads only this.
 */
import { getSeries, listPayouts, totalPayouts } from '../services/billing'
import { getBalance, listTransactions, successRate } from '../services/ledger'
import { request } from '../api/client'
import type { ActivityEvent } from '../types'
import { useAsync } from './useAsync'

export function useDashboard() {
  const balance = useAsync(getBalance)
  const transactions = useAsync(listTransactions)
  const payouts = useAsync(listPayouts)
  const series = useAsync(getSeries)
  const activity = useAsync(() => request<ActivityEvent[]>('/activity'))

  const txns = transactions.data ?? []

  return {
    balance,
    transactions,
    payouts,
    series,
    activity,
    derived: {
      successRate: successRate(txns),
      txCount: txns.length,
      payoutTotal: series.data ? totalPayouts(series.data) : null,
    },
  }
}
