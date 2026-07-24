---
id: arch:sys:src/services
title: src/services — how it fits
status: published
source: generated
linkedFiles: ["src/services/ledger.ts","src/services/risk.ts","src/services/billing.ts","src/services/auth.ts","src/services/limits.ts"]
---
`orchestrator · uses 3`

Structurally, this folder is an orchestrator — it pulls several other areas together to do its job.

It sits 3 layers up the dependency stack: imports only point downwards here, which is what keeps the architecture untangled — lower layers never need to know who uses them.

Its strongest dependencies: src (5 imports), src/api (4 imports), src/lib (1 import) — these are the areas it cannot work without.

Leaning on it: src/hooks (4 imports), src/components (1 import), src/routes (1 import) — change this folder and these are the areas that feel it.

## builds on

- src/api
- src
- src/lib

## leaned on by

- src/components
- src/hooks
- src/routes

## what's inside (5 files)

- `src/services/ledger.ts` — getBalance, listTransactions, settledTotal, heldTotal, …
- `src/services/risk.ts` — REVIEW_THRESHOLD, METHOD_THRESHOLDS, thresholdFor, Signal, …
- `src/services/billing.ts` — listPayouts, getSeries, totalPayouts, totalVolume, …
- `src/services/auth.ts` — STORAGE_KEY, DEMO_USER, Credentials, login, …
- `src/services/limits.ts` — DAILY_CAPS_CENTS, outboundByMethod, overDailyCap