# AGENTS.md — DHIRA Website v3

**This is the authoritative source for design intent on this project.**
It supersedes any prior auto-generated version. Every future session — Claude, GLM, or any other agent — must read this file before editing anything. The technical facts below come from the actual codebase, not from the original brief's placeholder examples.

---

## Stack & Commands

```
Next.js 16 (App Router) · React 19 · TypeScript 5.7 · Tailwind CSS 3.4
```

```bash
npm run dev      # local dev server (does not exit — start detached, don't wait)
npm run build    # production build + typecheck (the canonical verify step)
npm run lint     # ESLint via Next defaults
```

No tests exist. Use `npm run build` to verify correctness. TypeScript is `strict: true`; `next build` IS the typecheck.

---

## Architecture

```
app/layout.tsx              Root layout — loads Google Fonts (Newsreader + Inter), sets body classes
app/page.tsx                Single composed page: AnnouncementBar → Nav → Hero → [01] PowerfulPlatform → [02] AdaptiveModel → [03] DataEnrichment → [04] ProvenAtScale → Voices → CTA → Footer
app/globals.css             Tailwind layers + component classes + reveal utilities + reduced-motion rule
components/AnnouncementBar.tsx  Gradient-pill launch banner
components/Nav.tsx           Sticky translucent header with dropdown product/resources menus
components/Footer.tsx        Dark footer (bg-vault); hrefs derived from labels (see Gotchas)
components/Reveal.tsx        Client scroll-reveal wrapper (IntersectionObserver, reduced-motion aware)
components/DashboardMockup.tsx  CSS-built product dashboard centerpiece
components/PowerfulDemo.tsx     Client tabbed demo: Ask Akashic / Data model / Workflows / Reporting
components/AdaptiveDemo.tsx     Client tabbed sector data-model explorer
components/EnrichmentDemo.tsx   Client data-source toggles + profile/activity UI
components/sections/*          Server-component sections (new Attio-style narrative arc)
components/HeroResolve.tsx     Legacy client hero animation (currently unused)
```

Section order in `app/page.tsx` is fixed and intentional:
Hero → [01] PowerfulPlatform → [02] AdaptiveModel → [03] DataEnrichment → [04] ProvenAtScale → Voices → CTA

> Visual direction now fully mirrors the Attio.com homepage: a clean white field, bold Inter sans-serif headlines, the same tabbed product-demo centerpiece, interactive data-model and enrichment exhibits, customer quotes, a stats band, and one restrained action-blue accent. The old “gazette / registry / low-alpha-border” look is retired.

---

## Conceptual Thesis — Read This Before Any Visual Decision

**"Dhira"** means steady, composed, unshaken.
**"Akashic"** refers to a total, permanent record — nothing missing, nothing contradictory.
The homepage now leads with an Attio-style product-demo narrative: a central dashboard, interactive platform tabs, adaptive sector models, live enrichment, and proof of scale.

The visual world is **Attio-grade product precision**: a clean white field, **Inter** sans-serif headlines carrying directness and scale, **Inter** UI/data for clinical accuracy, and a single restrained **action-blue** accent (`#266df2`) reserved for verified / active / governed signal. **Newsreader** is now reserved for occasional editorial pull-quotes, not headline duty. Depth comes from **subtle multi-layer card shadows** on hairline white surfaces — never from heavy boxes or glow. Motion is smooth and outbound (`cubic-bezier(0.2,0.8,0.2,1)`); sections reveal as they scroll via the `<Reveal>` client child. It is a high-end instrument, NOT a SaaS dashboard, NOT a “knowledge-graph nodes” illustration, NOT a futuristic AI aesthetic. Motion should feel like something settling into place with weight and certainty — never bouncy or floaty.

---

## Actual Design Tokens (from the codebase)

### Colors (`tailwind.config.ts`)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#ffffff` | Base/page surface |
| `surface` | `#f7f7f8` | Stripe / elevated sections (subtle) |
| `ash` | `#f3f4f6` | Panels, hover washes |
| `ink` | `#1c1d1f` | Primary text, buttons, dark inversion |
| `inkSoft` | `#6f7988` | Secondary text, metadata |
| `overcast` | `#8f99a8` | Captions, tertiary copy |
| `lineSoft` | `#e4e7ec` | Hairline border lines |
| `line` | `#d3d8df` | Default borders, inactive chrome |
| `action` | `#266df2` | The accent — links, active, verified |
| `focus` | `#94b9ff` | Focus rings / glow |
| `abyss` | `#000000` | Primary-button hover |
| `vault` | `#0a0a0c` | Footer dark surface |
| `aura1` / `aura2` | `#dca3a5` / `#70a1f0` | The “magic aura” gradient endpoints |

**Magic aura gradient:** `linear-gradient(131.88deg, #dca3a5 7.36%, #70a1f0 81.74%)` — use sparingly as a blurred ambient backdrop or a gradient-text accent (`.aura-text`).

### Fonts

| Token | Stack | Role |
|---|---|---|
| `font-display` | Newsreader → Georgia → serif | Headlines, hero statement, section heads, serif quote voice |
| `font-sans` | Inter → system-ui → sans-serif | Body, data, UI labels, numbers, nav, buttons |

> The old Source Serif 4 / Public Sans pairing was retired when the site moved to the Attio look (see `app/layout.tsx` Google Fonts link). Do not reintroduce it.

### Spacing / Radius / Motion

| Token | Value | Use |
|---|---|---|
| `tracking-tighter` | `-0.02em` | Large display headlines |
| `tracking-tightest` | `-0.035em` | Hero-scaled display |
| `tracking-eyebrow` | `0.14em` | Metadata / eyebrow label tracking |
| `rounded-btn` | `10px` | Buttons (mandatory) |
| `rounded-card` | `8px` | Cards / panels / contained surfaces |
| `rounded-frame` | `14px` | Large UI frame / exhibit / table shell |
| `rounded-tag` | `4px` | Small inline tags |
| `duration-settle` | `250ms` | Hover / color transitions |
| `ease-settle` | `cubic-bezier(0.2,0.8,0.2,1)` | All transitions (smooth outbound) |
| `shadow-card` | subtle 2-layer | Default card depth (see config) |
| `shadow-cardHover` | lift 2-layer | Card hover state |
| `shadow-frame` | exhibit depth | Large UI frame centerpiece |
| `animate-stamp-in` | scale 0.92→1 | Registry seal appearance |
| `animate-resolve-float` | translateY 10px→0, 1.6s | Hero resolved answer |
| `.reveal` / `.reveal-in` | fade+lift 16px, 650ms | Scroll reveal (via `<Reveal>` client child) |

### CSS Component Classes (`app/globals.css`)

| Class | Use |
|---|---|
| `.btn-filled` | Primary CTA — ink fill, 10px radius, no shadow |
| `.btn-bordered` | Secondary CTA — white, hairline border, 10px radius |
| `.card-attio` | Standard card surface — hairline border + subtle shadow + hover lift |
| `.aura-text` | “Magic aura” gradient-clipped text accent |
| `.meta-label` | Uppercase tracked eyebrow — reserved for genuine metadata only |
| `.registry-mark` | `color: #266df2` — accent for verified / active items |
| `.rule-line` | Hairline border (`#e4e7ec`) |
| `.grid-dots` | Subtle dotted grid backdrop (hero) |

---

## Permanent Design Rules

These rules are the residue of specific identified defects, updated for the Attio-modeled look. They exist because someone violated each one. Do not repeat the violation.

### Rule 1 — Each section keeps its own visual shape

Even with the clean white card language, content types must not all collapse into identical boxes:

- **Hero conflict cards** (`HeroResolve.tsx`): each mimics its source artifact — spreadsheet (formula bar, mono, `#F4F5F1` chrome), PDF (centered serif, warm `#FAF8F2`), dashboard (live dot, mono, cool `#EDF1F6`). They look like competing panels, not uniform cards. They are framed as an **Attio app-frame centerpiece** (`rounded-frame`, `shadow-frame`, traffic-light toolbar).
- **Hub-and-spoke capability nodes** (`MeetAkashic.tsx`): spoke nodes carry NO card box — the SVG connector lines and absolute positioning do the structural work. The hub (Knowledge Graph) is the one element that earns distinct treatment (action-blue border + shadow).
- **The stat row in ProvenAtScale**: uses the gap-as-divider approach (grid with `gap-px` and a `bg-white/10` gap on the dark field), NOT individually boxed cards.
- **The How We Deliver sequence**: 01/02/03 numbered `.card-attio` cells in a 3-col grid — correct because it is a genuine sequence.
- **The Proof table**: a `<table>` inside a `rounded-frame` shell, left-aligned ledger rows — never cards.
- **Voices citations**: serif-quote `.card-attio` citation cards with hairline-attribution rule — no star ratings, no quote-bubble icons.

If you are about to reach for a generic card pattern for a new section, stop. Design that section’s actual shape first.

### Rule 2 — The verified check (&#10003;) appears ONLY on genuinely certified claims

The seal device is now a check glyph (```&#10003;```) in the **action-blue** accent, not the old ◆. Its sanctioned locations are:

1. **Trust-strip credentials** (`TrustStrip.tsx`) — each credential badge
2. **"Verified" toolbar badge** in the hero exhibit (`HeroResolve.tsx`)
3. **"Grounded Answer · Akashic Record" label** in the hero exhibit (`HeroResolve.tsx`)
4. **"Verified Record" label** in the proof section (`TheProof.tsx`)
5. **Footer "Verified Record" tagline** (`Footer.tsx`)

It must NOT appear on: section eyebrow labels, pain-point diagnoses, capability names, delivery methodology labels, sector taglines, testimonial section headers, or any descriptor that is not a verified external fact. When in doubt — omit. The color alone (`.registry-mark` = action blue) is a weaker accent signal and may be used more broadly for emphasis (e.g., the Knowledge Graph hub name, the Magic-Aura gradient).

### Rule 3 — Exactly one light-section inversion to dark. Plus the dark footer.

`ProvenAtScale` is the singular dark-content inversion. It uses `bg-ink` (`#1c1d1f`) on the **narrative** body; the `Footer` uses `bg-vault` (`#0a0a0c`). These are the only two dark surfaces — do not add a third dark narrative section. Within `ProvenAtScale`: override eyebrow color with `text-white/45`, use `border-white/10` for borders and `bg-white/10` for gap dividers. Keep the one auroral glow behind the dark field subtle (`opacity-25`, blurred).

### Rule 4 — The hero leads with the product as proof

The hero now follows the Attio layout: a customer quote at the top, a bold centered Inter headline, sub, a cluster of CTAs, and a full-width CSS-built **product-dashboard mockup** (`DashboardMockup`) as the central exhibit. Customer logos sit below the demo. The old conflict-card animation (`HeroResolve.tsx`) is currently unused; do not reintroduce it unless the design intent shifts back to a tension/resolution story.

---

## Technical Bans

The motion ban list was relaxed to allow the Attio feel, but these stay:

- **No `ease-in-out` default** transitions — use the `ease-settle` token (`cubic-bezier(0.2,0.8,0.2,1)`).
- **No heavy/branded box-shadows** — depth tokens are `shadow-card`, `shadow-cardHover`, `shadow-frame`, `shadow-chip` only. No `shadow-2xl` glow on interactive cards.
- **No `hover:scale-105`** bouncy lifts — `.card-attio` delivers depth via shadow + border-color change only.
- **No saturated tech-blue or purple/blue SaaS gradients** as primary colorwash. The ONLY sanctioned blue-involving gradient is the magic-aura `aura1→aura2` and the dark-field auroral glow, used subtly and blurred. Action blue (`#266df2`) is the accent, not a surface.
- **No auto-scrolling logo marquee** in the hero logo bar — keep it static.
- **No decorative 01/02/03 numbering** outside the numbered `[01]`?`[04]` section eyebrows.
- **No star ratings or quote-bubble SVGs** in Voices — keep testimonials as clean cards with name, org, and role.
- **No flat 6-item bento grid** for capabilities — express capabilities through distinct product-demo shapes per tab, not uniform cards.
- **No shadcn/Radix default visual skin** — use their accessible behavior only, restyle everything.
- **No reintroducing the old Source Serif 4 / Public Sans pairing or the old `paper #F6F4EC` / `registry #7A2E35` tokens** — they are deliberately retired.

---

## Motion Wiring

Scroll reveals use the `components/Reveal.tsx` client wrapper: wrap any block whose entrance you want to fade+lift in `<Reveal delay={n}>…</Reveal>`. It is reduced-motion aware (renders visible immediately). Do **not** add `"use client"` to section files — push all interactivity into dedicated client child components (`PowerfulDemo`, `AdaptiveDemo`, `EnrichmentDemo`, `Nav`). Per-section staggered `delay` values (e.g., 90/110/120ms) compose the cascade.

---

## Structural Conventions

- **Section files open with a JSDoc comment** describing design intent. Preserve and extend these.
- **Anchor IDs are a contract**: `Nav.tsx` links to `#platform`, `#model`, `#delivery`, `#proof`, `#company`. Renaming a section ID requires updating the Nav routes.
- **Footer hrefs are derived from labels** via `` `#${item.toLowerCase().replace(/[^a-z]/g, "")}` ``. Do not "fix" these to real section IDs — they are intentional placeholders.
- **No `"use client"` on section files** — push any interactivity into a dedicated client child, following the `HeroResolve` pattern.
- **`@/*` path alias** for all imports (configured in `tsconfig.json`).
- **Tailwind v3 syntax** (`@tailwind base/components/utilities`) — do not migrate to v4 `@import "tailwindcss"`.
- **Tabular numerals** (`tabular-nums`) on all numeric displays.
- **HTML entities** for typography: `&ldquo;` `&rdquo;` `&mdash;` `&rsquo;` `&middot;` `&#9670;`. Match the file convention.
- **No image asset pipeline** — no `public/` directory; use typographic/Unicode marks over image assets.

---

## Self-Check Before Marking a Section Done

1. **Shape uniqueness**: does this section's content type have its own shape, or did I reach for the default card pattern?
2. **&#10003; discipline**: every check glyph sits on a genuinely certified claim, and accent blue is used as the accent not a colorwash.
3. **Dark-inversion discipline**: did I add a third dark narrative section (besides `ProvenAtScale`)? If so, revert.
4. **Motion discipline**: no `ease-in-out`, no `hover:scale-105`, no over-saturated glow; reveal entrances go through `<Reveal>`.
5. **Semantic HTML**: section has a landmark, heading has an `id`, table has `<th scope>`, lists are `<ol>`/`<ul>` not `<div>`.
6. **Reduced motion**: any new animation respects `prefers-reduced-motion` (global CSS handles the baseline; client animations must additionally check via `window.matchMedia`).
7. **Build passes**: `npm run build` exits clean with no TypeScript errors.

---

## Gotchas

- `next.config.mjs` is minimal — no `images.domains`, no experimental flags. Adding remote images requires extending it.
- `.next/` build artifacts are checked in alongside source. Ignore them; regenerate via `npm run build`.
- Section entrance animations fire once per page load via `<Reveal>` (IntersectionObserver disconnects after first trigger). Tab demos are interactive and can be re-triggered by the user.
- `bg-ink/N` and `bg-white/N` opacity modifiers work on custom colors in Tailwind v3 when the color is defined as a simple hex string.
- `.meta-label` is in `@layer components`; Tailwind utilities in `@layer utilities` override its `color` property. On dark sections use `text-white/45` etc. to override.
- The Google Fonts link in `app/layout.tsx` loads Inter + Newsreader only; do not add `Source Serif 4` / `Public Sans` back without reason.
- `Reveal` wraps children in a plain `<div>` — when you need a revealed item to be a direct grid/flex child, put the wrapping `Reveal` *inside* the grid cell (the sections already follow this pattern).
