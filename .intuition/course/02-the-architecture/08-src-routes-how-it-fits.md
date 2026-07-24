---
id: arch:sys:src/routes
title: src/routes — how it fits
status: published
source: generated
linkedFiles: ["src/routes/Dashboard.tsx","src/routes/Login.tsx"]
---
`orchestrator · uses 3`

Structurally, this folder is an orchestrator — it pulls several other areas together to do its job.

It sits 6 layers up the dependency stack: imports only point downwards here, which is what keeps the architecture untangled — lower layers never need to know who uses them.

Its strongest dependencies: src/components (8 imports), src/hooks (2 imports), src/services (1 import) — these are the areas it cannot work without.

Leaning on it: src (2 imports) — change this folder and these are the areas that feel it.

## builds on

- src/components
- src/hooks
- src/services

## leaned on by

- src

## what's inside (2 files)

- `src/routes/Dashboard.tsx` — Dashboard
- `src/routes/Login.tsx` — Login, Login.onSubmit