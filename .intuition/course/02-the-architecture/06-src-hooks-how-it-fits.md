---
id: arch:sys:src/hooks
title: src/hooks — how it fits
status: published
source: generated
linkedFiles: ["src/hooks/useDashboard.ts","src/hooks/useAuth.tsx","src/hooks/useAsync.ts"]
---
`orchestrator · uses 3`

Structurally, this folder is an orchestrator — it pulls several other areas together to do its job.

It sits 4 layers up the dependency stack: imports only point downwards here, which is what keeps the architecture untangled — lower layers never need to know who uses them.

Its strongest dependencies: src/services (4 imports), src (2 imports), src/api (1 import) — these are the areas it cannot work without.

Leaning on it: src (2 imports), src/components (2 imports), src/routes (2 imports) — change this folder and these are the areas that feel it.

## builds on

- src/services
- src
- src/api

## leaned on by

- src
- src/components
- src/routes

## what's inside (3 files)

- `src/hooks/useDashboard.ts` — useDashboard
- `src/hooks/useAuth.tsx` — AuthValue, Ctx, AuthProvider, useAuth
- `src/hooks/useAsync.ts` — AsyncState, useAsync