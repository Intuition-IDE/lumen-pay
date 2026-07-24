---
id: arch:sys:src/api
title: src/api — how it fits
status: published
source: generated
linkedFiles: ["src/api/client.ts","src/api/webhooks.ts"]
---
`shared · 2 lean on it`

Structurally, this folder is a shared, load-bearing area — more of the codebase leans on it than it leans on.

It sits 2 layers up the dependency stack: imports only point downwards here, which is what keeps the architecture untangled — lower layers never need to know who uses them.

Its strongest dependencies: src/data (1 import) — these are the areas it cannot work without.

Leaning on it: src/services (4 imports), src/hooks (1 import) — change this folder and these are the areas that feel it.

## builds on

- src/data

## leaned on by

- src/hooks
- src/services

## what's inside (2 files)

- `src/api/client.ts` — BASE_URL, USE_FIXTURES, Path, FIXTURES, …
- `src/api/webhooks.ts` — WebhookEvent, WebhookEndpoint, endpoints, RETRY_SCHEDULE_MS, …