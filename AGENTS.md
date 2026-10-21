# AGENTS.md — DHIRA Website v3 (Orchestration Index)

Lean context router. Read the ONE doc that matches your task — the detail lives in
`docs/`, not here. **DHIRA** = the company, **Akashic** = the platform (keep
distinct; never "DHIRA's Akashic").

Stack: Next.js 16 App Router · React 19 · TypeScript 5.7 (strict) · Tailwind 3.4 ·
framer-motion. Content-driven, statically rendered, no data layer. All copy is
typed data in `content/`. Alias `@/*` → repo root.

## Which doc to read

| Your task | Read |
|---|---|
| Add/move a file, wire a route, find what renders where, section order/ids | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Section grammar, voice, tokens, type, buttons, mockups, the 8 design rules, a11y | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) |
| Edit copy or figures, the content model, the CMS migration | [docs/CONTENT.md](docs/CONTENT.md) |
| Runtime state, forms, environment | [docs/STATE_AND_DATA.md](docs/STATE_AND_DATA.md) |
| Images and their provenance | [docs/ASSETS.md](docs/ASSETS.md) |
| Build, typecheck, verify, git workflow, "what not to do" | [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) |

## Never-break kernel (applies to every task)

- **Section grammar (DESIGN_SYSTEM §3).** One eyebrow (`ui/FigureEyebrow`:
  dashed rail, `[NN]  LABEL`, left, never centred or coloured). One header
  (`ui/SectionHeader`: eyebrow, two-tone headline, lede UNDER it, left).
  No next-section buttons and no button at a section's foot; a section's one
  onward link is a `ui/SectionLink` under its lede. Buttons only in the hero
  and the closing card.
- **Headers state the reader's gain; the lede says how.** Never the obvious.
- **Voice:** direct, declarative, short. **No em dashes** in copy.
  British/Indian English ("organisation", "colour"). No "powerful/seamless".
- **No invented data.** Every UI figure is real (Rule 4).
- **No vaporware.** Never present a roadmap feature as live; agents carry
  `PreviewTag`.
- **Tokens over hex:** use Tailwind tokens; values live in `app/theme.css`
  (both appearances). Raw `[#hex]` only for per-section semantic colours with
  no token; inline `style`/SVG hex is the Rule 8 exception.
- **Logo full form:** initials bold, never coloured.
- **No checkmark characters** in the shipped UI (Rule 2).
- **`font-display` (Newsreader) = pull-quotes only** (Voices; Rule 3).
- **Any dark value is blue-black**, never neutral black. One soft blue band per
  page (Rule 5).
- **Flat colour only.** No cast shadows, glows, decorative gradients or tinted
  overlays. Use opaque theme surfaces and precise borders. Preserve section
  concepts when polishing colour, shape and spacing.
- **Respect `prefers-reduced-motion`**; loops stop off screen (Rule 6a).
- **Product UI teases, never reveals** (DESIGN_SYSTEM §8).
- **Structure:** never put files flat in `components/` — use a subdirectory.
  Simulated product UI lives in `demos/mockups/` (`*Mockup` + banner comment).
- **Type everything**, no `any`. Run `npx tsc --noEmit` after edits; `npm run
  build` is the ship gate.
- Change section order → update the page composer, the page's `sections` list
  **and** ARCHITECTURE.md's maps.
- **Other sessions may be editing this tree.** Read a file before you write it,
  never revert changes you did not make, and never kill the dev server.
