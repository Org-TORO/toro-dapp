# TORO Dapp — Agent Orientation

**TORO (Trustless Oceanic Record of Origin)** is a seafood supply-chain
traceability platform. Every tuna can is traced "from ocean to shelf" with
immutable records on **Solana devnet**. Live demo:
https://toro-dapp.vercel.app

This repo is the **dapp only**. The Anchor program lives in the separate
`toro-contracts` repo; this app consumes its published IDL artifact.

## Repo layout

```
app/               Next.js 15 App Router: / (landing), /explorer, /explorer/[id],
                   /trustgraph, /contact + /api/contact (Resend partner form)
components/        Can3D (react-three-fiber), TrustGraphSimulator, TraceTreeAnimation, etc.
src/lib/trace.ts   Types + fetchProductLot() over the static JSON index
src/lib/toro.ts    PROGRAM_ID + Solscan URL helpers — single source of truth
src/idl/toro.json  COPIES the program IDL. Do not hand-edit; run `npm run idl:sync`
src/data/traceIndex.json  GENERATED FILE — do not hand-edit (see indexer)
scripts/indexer-solana.ts Crawls devnet events → regenerates traceIndex.json
docs/              Project memory: PROJECT-STATE.md, DECISIONS.md, PROGRESS.md
```

## Key commands

```bash
npm run dev        # dev server
npm run build      # production build (hybrid SSG + dynamic)
npm run index      # rebuild src/data/traceIndex.json from devnet
npm run idl:sync   # copy ../toro-contracts/idl/toro.json → src/idl/toro.json
```

`index` and `idl:sync` expect the `toro-contracts` repo checked out as a
**sibling directory**; otherwise sync the IDL file manually.

## Non-negotiable conventions

- **Data source:** `src/data/traceIndex.json` is generated. After re-seeding
  devnet, re-run the indexer.
- **IDL is a pinned artifact.** If the program's instructions/events/accounts
  change, bump `src/idl/toro.json` from the contracts release in the same
  commit as any decoding change. Never read the IDL from a `target/` directory.
- **Program ID:** only in `src/lib/toro.ts`. Never hardcode it in components.
- **Styling:** Tailwind 4, theme colors in `app/globals.css` (`@theme`:
  ocean #3e96cc, deep #0a1628, gold #ffc354). Dark navy "deep ocean" identity.
- **Minimal changes:** follow existing code style; don't refactor unrelated code.

## Before doing anything

1. Read `docs/PROJECT-STATE.md` (current state + known gaps)
2. Read `docs/PROGRESS.md` (what was done, what's next — dated log)
3. Read `docs/DECISIONS.md` if you might contradict an earlier decision
4. For on-chain semantics, read the contracts repo's `docs/toro-program.md`

Update PROGRESS.md (and this file, if structure/commands change) as you work.
