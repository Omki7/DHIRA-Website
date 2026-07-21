# DEVELOPMENT — DHIRA Website v3

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Next dev server (Turbopack) at `localhost:3000` |
| `npm run build` | Production build — the real gate for "does it ship" |
| `npm run start` | Serve the production build |
| `npm run lint` | `next lint` |
| `npx tsc --noEmit` | Full strict typecheck (fast; run this after edits) |

## Verification before calling work done

There is **no unit/integration test suite** in this repo. Verification is:

1. **`npx tsc --noEmit`** — must be clean (exit 0). `strict` is on.
2. **`npm run build`** — must succeed; it also validates Tailwind class usage and
   Server/Client component boundaries that typecheck alone misses.
3. **Visual check** — for any design/layout change, screenshot the reference and
   your own dev-server output before calling it done (Playwright is available via
   the npx cache). Don't assert a visual change works from code alone.

## Type safety

- **No `any`** (implicit or explicit) and no unsafe casts. Type everything;
  define interfaces/generics. `tsconfig` is `strict`.
- Content config in `lib/` is typed against `pageSection.ts` — extend the types
  when you add a field, don't loosen them.

## Environment

No environment variables, secrets, or `.env` file are used or needed (static
presentational site — see STATE_AND_DATA.md). Do not add env scaffolding for
variables that don't exist.

## Git workflow

- The repo works on `main`. **Before a large structural refactor, snapshot
  in-progress work first** (commit on `main` or a WIP branch), then do the
  refactor on a dedicated branch so it stays reviewable and revertible.
- Commit/push only when asked. If starting new work on `main`, branch first.

## §9 — What not to do

- Do not add `console.log` to production components.
- Do not install new npm packages without checking React/Tailwind already cover it.
- Do not use `any` casts. Type everything.
- Do not write multi-line comment blocks explaining *what* code does (short *why*
  comments are fine and used throughout).
- Do not change section order without updating the page composer (`app/**/page.tsx`)
  **and** the Section Maps in [ARCHITECTURE.md](./ARCHITECTURE.md).
- Do not add new top-level files to `components/` — use a subdirectory.
- Do not add a component-local `<style dangerouslySetInnerHTML>` keyframe block —
  put keyframes in `globals.css` (see DESIGN_SYSTEM §5).
- Do not point images at paths absent from `public/` (Rule 7).
- Do not reference the retired `design.md`.
