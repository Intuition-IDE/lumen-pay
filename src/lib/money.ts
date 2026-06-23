/**
 * Money helpers. The whole app stores amounts in minor units (cents) and only
 * ever formats at the edge — this module is that edge. Imported almost
 * everywhere, so keep it pure and dependency-free.
 */
import type { Currency, Money } from '../types'

const SYMBOL: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  SGD: 'S$',
  GBP: '£',
}

/** "$48,210.55" */
export function format(money: Money, opts?: { cents?: boolean }): string {
  const showCents = opts?.cents ?? true
  const value = money.cents / 100
  const body = value.toLocaleString('en-US', {
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  })
  return `${SYMBOL[money.currency]}${body}`
}

/** Split a formatted amount so the cents can be styled down. → ["$48,210", "55"] */
export function splitCents(money: Money): [string, string] {
  const [whole, cents = '00'] = format(money).split('.')
  return [whole, cents]
}

/** "+$1,240.00" / "−$320.00" with the right sign for the direction. */
export function signed(money: Money, direction: 'inbound' | 'outbound'): string {
  const sign = direction === 'inbound' ? '+' : '−'
  return `${sign}${format(money)}`
}

export function add(a: Money, b: Money): Money {
  if (a.currency !== b.currency) throw new Error('currency mismatch')
  return { cents: a.cents + b.cents, currency: a.currency }
}
