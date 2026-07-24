---
id: arch:sys:src/lib
title: src/lib — how it fits
status: published
source: generated
linkedFiles: ["src/lib/money.ts","src/lib/time.ts"]
---
`shared · 2 lean on it`

Structurally, this folder is a shared, load-bearing area — more of the codebase leans on it than it leans on.

It sits 1 layer up the dependency stack: imports only point downwards here, which is what keeps the architecture untangled — lower layers never need to know who uses them.

Its strongest dependencies: src (1 import) — these are the areas it cannot work without.

Leaning on it: src/components (3 imports), src/services (1 import) — change this folder and these are the areas that feel it.

## builds on

- src

## leaned on by

- src/components
- src/services

## what's inside (2 files)

- `src/lib/money.ts` — SYMBOL, format, splitCents, signed, …
- `src/lib/time.ts` — MS, clock, ago, shortDate