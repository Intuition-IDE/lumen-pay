---
id: arch:sys:src
title: src — how it fits
status: published
source: generated
linkedFiles: ["src/types.ts","src/App.tsx","src/main.tsx"]
---
`shared · 5 lean on it`

Structurally, this folder is a shared, load-bearing area — more of the codebase leans on it than it leans on.

It sits at the top of the dependency stack: imports only point downwards here, which is what keeps the architecture untangled — lower layers never need to know who uses them.

Its strongest dependencies: src/hooks (2 imports), src/routes (2 imports) — these are the areas it cannot work without.

Leaning on it: src/components (5 imports), src/services (5 imports), src/hooks (2 imports) — change this folder and these are the areas that feel it.

## builds on

- src/hooks
- src/routes

## leaned on by

- src/components
- src/data
- src/hooks
- src/lib
- src/services

## what's inside (3 files)

- `src/types.ts` — Currency, TransactionStatus, Money, Customer, …
- `src/App.tsx` — App
- `src/main.tsx`