/**
 * Seed fixtures. In production these rows come from the Postgres ledger via the
 * API; here they stand in so the dashboard renders without a backend. The
 * shapes are identical to what `api/client.ts` returns over the wire.
 */
import type {
  ActivityEvent,
  BalanceSummary,
  MetricPoint,
  Payout,
  Transaction,
} from '../types'

export const balanceFixture: BalanceSummary = {
  available: { cents: 4_821_055, currency: 'USD' },
  pending: { cents: 318_400, currency: 'USD' },
  reserved: { cents: 92_500, currency: 'USD' },
  trend: 12.4,
}

export const seriesFixture: MetricPoint[] = [
  { label: 'Mon', payouts: 18200, volume: 41200 },
  { label: 'Tue', payouts: 23400, volume: 39800 },
  { label: 'Wed', payouts: 21100, volume: 52600 },
  { label: 'Thu', payouts: 29800, volume: 47300 },
  { label: 'Fri', payouts: 34900, volume: 61200 },
  { label: 'Sat', payouts: 27600, volume: 44800 },
  { label: 'Sun', payouts: 31200, volume: 58100 },
]

const cust = (id: string, name: string, email: string) => ({ id, name, email })

export const transactionsFixture: Transaction[] = [
  {
    id: 'txn_f8a2c1',
    customer: cust('cus_01', 'Acme Corp', 'ap@acme.co'),
    amount: { cents: 124_000, currency: 'USD' },
    direction: 'inbound',
    status: 'succeeded',
    method: 'card',
    createdAt: '2026-06-23T09:41:00Z',
  },
  {
    id: 'txn_c41b07',
    customer: cust('cus_02', 'Globex', 'billing@globex.io'),
    amount: { cents: 32_000, currency: 'USD' },
    direction: 'outbound',
    status: 'pending',
    method: 'bank_transfer',
    createdAt: '2026-06-23T09:12:00Z',
  },
  {
    id: 'txn_9d7e44',
    customer: cust('cus_03', 'Initech', 'finance@initech.com'),
    amount: { cents: 500_000, currency: 'USD' },
    direction: 'inbound',
    status: 'succeeded',
    method: 'wallet',
    createdAt: '2026-06-23T08:55:00Z',
  },
  {
    id: 'txn_2a91fe',
    customer: cust('cus_04', 'Soylent', 'pay@soylent.com'),
    amount: { cents: 7_800, currency: 'USD' },
    direction: 'inbound',
    status: 'failed',
    method: 'card',
    createdAt: '2026-06-23T08:30:00Z',
  },
  {
    id: 'txn_55c3b0',
    customer: cust('cus_05', 'Hooli', 'ops@hooli.xyz'),
    amount: { cents: 210_500, currency: 'USD' },
    direction: 'inbound',
    status: 'succeeded',
    method: 'card',
    createdAt: '2026-06-23T08:02:00Z',
  },
  {
    id: 'txn_71b9aa',
    customer: cust('cus_06', 'Stark Industries', 'ar@stark.com'),
    amount: { cents: 89_900, currency: 'USD' },
    direction: 'inbound',
    status: 'refunded',
    method: 'card',
    createdAt: '2026-06-23T07:40:00Z',
  },
  {
    id: 'txn_3e6d18',
    customer: cust('cus_07', 'Wonka Co', 'invoices@wonka.co'),
    amount: { cents: 46_250, currency: 'USD' },
    direction: 'inbound',
    status: 'succeeded',
    method: 'wallet',
    createdAt: '2026-06-23T07:11:00Z',
  },
]

export const payoutsFixture: Payout[] = [
  { id: 'po_8821', amount: { cents: 312_000, currency: 'USD' }, status: 'in_transit', arrivalDate: '2026-06-24' },
  { id: 'po_8820', amount: { cents: 280_400, currency: 'USD' }, status: 'paid', arrivalDate: '2026-06-22' },
  { id: 'po_8819', amount: { cents: 198_700, currency: 'USD' }, status: 'scheduled', arrivalDate: '2026-06-25' },
]

export const activityFixture: ActivityEvent[] = [
  { id: 'ev_1', kind: 'payout', title: 'Payout in transit', detail: '$3,120.00 to •••• 4821', at: '6m' },
  { id: 'ev_2', kind: 'dispute', title: 'Dispute opened', detail: 'Stark Industries · $899.00', at: '41m' },
  { id: 'ev_3', kind: 'payment', title: 'Large payment', detail: 'Initech · $5,000.00', at: '1h' },
  { id: 'ev_4', kind: 'webhook', title: 'Webhook delivered', detail: 'payment.succeeded → prod', at: '1h' },
  { id: 'ev_5', kind: 'system', title: 'Reserve released', detail: '$925.00 returned to balance', at: '3h' },
]
