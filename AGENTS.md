# AGENTS.md — DHIRA Website v3 (Orchestration Index)

Lean context router. Read the ONE doc that matches your task — the detail lives in
`docs/`, not here. **DHIRA** = the company, **Akashic** = the platform (keep
distinct; never "DHIRA's Akashic").

Stack: Next.js 16 App Router · React 19 · TypeScript 5.7 (strict) · Tailwind 3.4 ·
framer-motion. Presentational site, no data layer. Alias `@/*` → repo root.

## Which doc to read

| Your task | Read |
|---|---|
| Add/move a file, wire a route, find what renders where, section order/ids | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Colours, type, spacing, tokens, buttons, keyframes, the 8 design rules, a11y | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) |
| Edit copy/figures, state, "add data fetching", validation, env | [docs/STATE_AND_DATA.md](docs/STATE_AND_DATA.md) |
| Build, typecheck, verify, git workflow, "what not to do" | [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) |

## Never-break kernel (applies to every task)

- **Voice:** direct, declarative, short. **No em dashes** in copy.
  British/Indian English ("organisation", "colour"). No "powerful/seamless".
- **No invented data.** Every UI figure is real (Design Rule 4).
- **No vaporware.** Never present a roadmap feature as live.
- **Tokens over hex:** use Tailwind tokens; raw `[#hex]` only for per-section
  semantic colours with no token. Inline `style`/SVG hex is the Rule 8 exception.
  Keep the token table and `tailwind.config.ts` in sync.
- **No checkmark characters** in the shipped UI (Rule 2).
- **`font-display` (Newsreader) = pull-quotes only** (Voices; Rule 3).
- **Dark grounds are deliberate and blue-black**, never neutral black (Rule 5).
  One soft blue band per page (Rule 5a).
- **Respect `prefers-reduced-motion`** for every animation (Rule 6).
- **Structure:** never put files flat in `components/` — use a subdirectory.
  Simulated product UI lives in `demos/mockups/` (`*Mockup` + banner comment).
- **Type everything**, no `any`. Run `npx tsc --noEmit` after edits; `npm run
  build` is the ship gate.
- Change section order → update the page composer **and** ARCHITECTURE.md's maps.

Retired `design.md` is superseded by `docs/`.
