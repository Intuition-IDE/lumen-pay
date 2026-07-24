---
id: arch:sys:src/components
title: src/components — how it fits
status: published
source: generated
linkedFiles: ["src/components/TransactionTable.tsx","src/components/BalanceCard.tsx","src/components/Icons.tsx","src/components/Sidebar.tsx","src/components/Topbar.tsx","src/components/ActivityFeed.tsx","src/components/PayoutChart.tsx","src/components/StatCards.tsx","src/components/StatusPill.tsx","src/components/Sparkline.tsx"]
---
`orchestrator · uses 4`

Structurally, this folder is an orchestrator — it pulls several other areas together to do its job.

It sits 5 layers up the dependency stack: imports only point downwards here, which is what keeps the architecture untangled — lower layers never need to know who uses them.

Its strongest dependencies: src (5 imports), src/lib (3 imports), src/hooks (2 imports) — these are the areas it cannot work without.

Leaning on it: src/routes (8 imports) — change this folder and these are the areas that feel it.

## builds on

- src
- src/lib
- src/hooks
- src/services

## leaned on by

- src/routes

## what's inside (10 files)

- `src/components/TransactionTable.tsx` — Props, avatarInitials, METHOD, TransactionTable
- `src/components/BalanceCard.tsx` — Props, BalanceCard
- `src/components/Icons.tsx` — base, P, Grid, Card, …
- `src/components/Sidebar.tsx` — NAV, initials, Sidebar
- `src/components/Topbar.tsx` — Topbar
- `src/components/ActivityFeed.tsx` — TONE, Props, ActivityFeed
- `src/components/PayoutChart.tsx` — Props, W, H, PAD, …
- `src/components/StatCards.tsx` — Tile, Props, StatCards
- `src/components/StatusPill.tsx` — MAP, StatusPill
- `src/components/Sparkline.tsx` — Props, Sparkline