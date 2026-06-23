/** A coloured status chip for a transaction or payout state. */
import type { TransactionStatus } from '../types'

const MAP: Record<TransactionStatus, { cls: string; label: string }> = {
  succeeded: { cls: 'ok', label: 'Succeeded' },
  pending: { cls: 'pending', label: 'Pending' },
  failed: { cls: 'failed', label: 'Failed' },
  refunded: { cls: 'pending', label: 'Refunded' },
}

export function StatusPill({ status }: { status: TransactionStatus }) {
  const { cls, label } = MAP[status]
  return (
    <span className={`pill ${cls}`}>
      <i />
      {label}
    </span>
  )
}
