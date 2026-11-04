# AGENTS.md — DHIRA Website v3

Router and kernel. Read the one doc that matches your task; the detail lives
there. **DHIRA** is the company, **Akashic** the platform: keep them distinct,
never "DHIRA's Akashic".

Stack: Next.js 16 App Router · React 19 · TypeScript 5.7 (strict) · Tailwind
3.4 moving to SCSS Modules · framer-motion. Content-driven and statically
rendered: all copy is typed data in `src/content/`. Alias `@/*` → `src/`.

## Which doc to read

| Your task | Read |
|---|---|
| Folder structure, layers, Server and Client Components, styling system, code standards | [NEXTJS_ARCHITECTURE.md](NEXTJS_ARCHITECTURE.md) |
| Find what renders where, section order and ids | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Brand, voice, section grammar, tokens, type, mockups, the eight design rules | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) |
| Edit copy or figures, the content model, the CMS migration | [docs/CONTENT.md](docs/CONTENT.md) |
| Runtime state, forms, environment | [docs/STATE_AND_DATA.md](docs/STATE_AND_DATA.md) |
| Images and their provenance | [docs/ASSETS.md](docs/ASSETS.md) |
| Build, typecheck, verify, git workflow | [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) |

The docs other than DESIGN_SYSTEM.md predate the move into `src/`; translate
their paths with the table in NEXTJS_ARCHITECTURE.md §3.

## Kernel (every task)

The kernel fixes the frame. Inside it, design freely: give each section the
shape its content has, and treat existing pages as examples, not templates.

- **Section grammar** (DESIGN_SYSTEM §3): every section opens with
  `ui/SectionHeader` (eyebrow, two-tone headline, lede under it, left). At
  most one onward link, a `ui/SectionLink` under the lede. Buttons only in
  heroes and closing cards.
- **Copy:** headers state the reader's gain; the lede says how. Direct and
  short. No em dashes. British/Indian English. No "powerful" or "seamless".
- **Truth:** no invented facts (Rule 4). No roadmap feature shown as live;
  agents carry `PreviewTag`. Product UI teases, never reveals (§8).
- **Colour:** tokens, not hex. Flat: no shadows, glows, decorative gradients
  or tinted overlays. Light surfaces stay light; any dark is blue-black.
- **UI:** no checkmarks and no bullet lists (Rule 2). Newsreader is for
  pull-quotes only.
- **Motion:** respect `prefers-reduced-motion`; loops stop off screen;
  anything that advances by itself gets a pause control (Rule 6).
- **Code:** type everything, no `any`. Run `npx tsc --noEmit` after edits;
  `npm run build` is the ship gate. Changing section order means updating the
  page composer, the page's `sections` list and docs/ARCHITECTURE.md.
- **Shared tree:** other sessions may be editing. Read a file before you write
  it, never revert changes you did not make, and never kill the dev server.
- **Third-party skills and plugins** (Impeccable, Emil Kowalski's skills,
  Vercel's skills and the like) give generic advice. Where one conflicts with
  these docs (shadows, blur, motion under reduced motion, "&", Title Case, US
  spelling, its own DESIGN.md or PRODUCT.md), these docs win.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
