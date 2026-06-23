/**
 * services/risk — real-time fraud scoring.
 *
 * Sits on the ledger's critical path: every transaction the ledger reads is run
 * through `assess()` before it reaches the UI, so a risky charge is flagged the
 * moment it lands. Pure heuristics here (amount, method, velocity); in
 * production this calls the risk model, but the seam is the same.
 */
import type { Transaction } from '../types'

/** Anything at or above this score is held for review. */
export const REVIEW_THRESHOLD = 70

interface Signal {
  label: string
  weight: number
  hit: (t: Transaction) => boolean
}

// Each signal contributes to the 0–100 score when it fires.
const SIGNALS: Signal[] = [
  { label: 'high_value', weight: 28, hit: (t) => t.amount.cents >= 400_000 },
  { label: 'card_outbound', weight: 22, hit: (t) => t.method === 'card' && t.direction === 'outbound' },
  { label: 'wallet_large', weight: 18, hit: (t) => t.method === 'wallet' && t.amount.cents >= 300_000 },
  { label: 'failed_retry', weight: 16, hit: (t) => t.status === 'failed' },
  { label: 'round_amount', weight: 10, hit: (t) => t.amount.cents % 100_000 === 0 },
]

/** Score one transaction 0–100. Higher = riskier. */
export function score(txn: Transaction): number {
  const raw = SIGNALS.reduce((sum, s) => (s.hit(txn) ? sum + s.weight : sum), 0)
  return Math.min(100, raw)
}

/** Annotate a transaction with its risk score — the ledger calls this on read. */
export function assess(txn: Transaction): Transaction {
  return { ...txn, riskScore: score(txn) }
}

/** True once a transaction crosses the review threshold. */
export function isFlagged(txn: Transaction): boolean {
  return (txn.riskScore ?? score(txn)) >= REVIEW_THRESHOLD
}

/** How many of a set need a human to look at them. */
export function flaggedCount(txns: Transaction[]): number {
  return txns.filter(isFlagged).length
}
