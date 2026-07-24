---
id: arch:sys:src/data
title: src/data — how it fits
status: published
source: generated
linkedFiles: ["src/data/fixtures.ts"]
---
`orchestrator · uses 1`

Structurally, this folder is an orchestrator — it pulls several other areas together to do its job.

It sits 1 layer up the dependency stack: imports only point downwards here, which is what keeps the architecture untangled — lower layers never need to know who uses them.

Its strongest dependencies: src (1 import) — these are the areas it cannot work without.

Leaning on it: src/api (1 import) — change this folder and these are the areas that feel it.

## builds on

- src

## leaned on by

- src/api

## what's inside (1 files)

- `src/data/fixtures.ts` — balanceFixture, seriesFixture, cust, transactionsFixture, …