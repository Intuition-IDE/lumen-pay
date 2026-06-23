/**
 * Shared domain types for Lumen Pay.
 *
 * These are the nouns the whole product is built around — every service, hook
 * and component speaks in terms of these shapes.
 */

export type Currency = 'USD' | 'EUR' | 'SGD' | 'GBP'

export type TransactionStatus = 'succeeded' | 'pending' | 'failed' | 'refunded'

export interface Money {
  /** amount in minor units (cents) to avoid floating-point drift */
  cents: number
  currency: Currency
}

export interface Customer {
  id: string
  name: string
  email: string
}

export interface Transaction {
  id: string
  customer: Customer
  amount: Money
  /** direction from the merchant's perspective */
  direction: 'inbound' | 'outbound'
  status: TransactionStatus
  method: 'card' | 'bank_transfer' | 'wallet'
  createdAt: string
  /** populated by the risk layer; 0–100, higher = riskier */
  riskScore?: number
}

export interface Payout {
  id: string
  amount: Money
  status: 'paid' | 'in_transit' | 'scheduled'
  arrivalDate: string
}

export interface BalanceSummary {
  available: Money
  pending: Money
  reserved: Money
  /** percent change vs the previous period */
  trend: number
}

export interface MetricPoint {
  label: string
  payouts: number
  volume: number
}

export interface Session {
  user: {
    id: string
    name: string
    email: string
    role: 'owner' | 'admin' | 'analyst'
  }
  token: string
  environment: 'live' | 'test'
}

export interface ActivityEvent {
  id: string
  kind: 'payout' | 'dispute' | 'payment' | 'webhook' | 'system'
  title: string
  detail: string
  at: string
}
