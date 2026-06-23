# Lumen Pay

Payments, payouts, and ledger infrastructure for modern businesses. This is the
web dashboard — the surface merchants use to watch money move, reconcile
payouts, and wire up webhooks.

```bash
npm install
npm run dev      # http://localhost:5180
```

Sign in with any email + a password of 4+ characters (the auth service runs
against fixtures in this build).

## Architecture

The app is layered so each concern lives in exactly one place:

```
src/
  api/         transport — the only code that knows about the network
    client.ts      request() primitive + auth token
    webhooks.ts    signed outbound event delivery
  services/    domain logic — money movement, never UI
    auth.ts        sessions, login, token persistence
    ledger.ts      balances + transactions, the source of truth for money
    billing.ts     payouts + the volume series, notifies via webhooks
  hooks/       React seams over the services
    useAuth.tsx    session context + the login/logout gate
    useAsync.ts    the loading-state primitive every data hook builds on
    useDashboard.ts  the data spine for the Overview page
  lib/         pure helpers (money, time) imported almost everywhere
  components/  presentational UI — reads props, renders pixels
  routes/      Login + Dashboard, composed from components
  types.ts     the domain nouns the whole app speaks in
```

### Data flow

A value travels in one direction:

```
api/client ─→ services (ledger/billing/auth) ─→ hooks (useDashboard) ─→ routes ─→ components
```

Components never fetch or sum money themselves — they ask a hook, which asks a
service, which asks the API. Money is stored in **minor units (cents)** end to
end and only formatted at the edge in `lib/money`.

## Conventions

- **Money is integers.** Never use floats for amounts; `lib/money` owns formatting.
- **One transport seam.** All network access goes through `api/client.request`.
- **Services are pure-ish.** They orchestrate and derive; they hold no React.

## Status

`v1.5.0` — Overview dashboard, auth, ledger reads, payouts, webhooks, and
**real-time fraud scoring** (`services/risk`) wired onto the ledger read path:
every transaction is assessed on read, flagged rows are held for review, and the
dashboard surfaces the live risk count.
