# DESIGN SYSTEM — DHIRA Website v3

Brand, voice, design tokens, component recipes, the eight design rules, and
accessibility standards. Tokens are the single source of truth in
`tailwind.config.ts` — this doc mirrors them, and the two must be kept in sync.

## Brand identity

- **DHIRA** = the company. **Akashic** = the platform. Keep distinct. Never write
  "DHIRA's Akashic."
- Akashic unifies structured, unstructured, and streaming data into one governed
  foundation, links it via a knowledge graph, and runs BI, conversational AI, ML,
  and agentic orchestration on top.
- Positioning: one accountable partner (platform + delivery), not a stack of
  vendors. Not pure SaaS, not pure consultancy.
- Proof points: national-scale DPI delivery in India; Maha Hackathon 2025 winner;
  Telangana AI Rising 2025 winner; Startup India recognised; offices in New York,
  Hyderabad, Bangalore.
- Sectors: Government, Smart Cities, Healthcare, Banking and Finance, Retail and
  Manufacturing, Education, Energy and Utility.

## Brand voice

- **Direct, declarative, short.** Headlines are complete thoughts.
- **No em dashes** in marketing copy. Use colons or periods.
- **No vaporware.** Never market a roadmap feature as live.
- **Precise over vague.** No "powerful," "seamless," "next-generation" filler.
- **British/Indian English** throughout: "organisation," "recognised," "colour,"
  "optimise."
- **Claims must be verifiable.** No invented SLA numbers, certifications, or
  client names.
- Two-tier motif: "trust / trace / act on" is the emotional promise; "grounded"
  is the technical mechanism (knowledge graph). Keep distinct.

## Design tokens

### Colours

**The ground is white and stays white.** A warm off-white ground (`#FAF9F6`) was
built and reverted (Jul 2026): white carries more contrast and air, and is the
only neutral the cool blue family reads cleanly against. Sections carry
`bg-background`, never a hardcoded `bg-white`, so the ground stays a
single-token change. Use Tailwind arbitrary hex (`bg-[#...]`) only for
per-section semantic colours with no token; everything with a token uses the
token (see Rule 8 and the tokenisation note below).

| Token | Value | Use |
|---|---|---|
| `background` | `#FFFFFF` | Page/section background |
| `primary-bg` | `#FAFAFB` | Card surfaces, inset panels |
| `secondary-bg` | `#FFFFFF` | Nav menu-row icon tiles |
| `tertiary-bg` | `#F3F3F4` | Subtle inset areas, hover fills |
| `ink` / `primary-text` / `action` | `#1A1C1D` | Headings, body, primary button fill |
| `secondary-text` | `#5C5E63` | Nav secondary copy |
| `tertiary-text` | `#8E8F91` | Nav labels, deemphasised UI text |
| `inkSoft` | `#6f7988` | Section body copy |
| `action-hover` | `#2F3132` | Button hover |
| `blue` | `#3E63DD` | Accent links, highlighted data, focus rings |
| `blue-hover` | `#3351B8` | Blue accent hover |
| `blue-subtle` | `#EEF1FC` | Accent background tint |
| `blue-border` | `#C8D2F5` | Accent border |
| `red` | `#E5484D` | Problem section only, means **cost** not error |
| `positive` | `#30A46C` | Positive/"live" family — accent |
| `positive-text` | `#1B7A47` | Positive text |
| `positive-subtle` | `#EDF7F1` | Positive background tint |
| `positive-border` | `#CBE8D7` | Positive border |
| `overcast` | `#64748B` | Tertiary labels, watermarks |
| `subtle-stroke` | `#EEEFF1` | Card borders |
| `default-stroke` | `#D9DADB` | Nav divider stroke |
| `lineSoft` | `#e4e7ec` | Section borders, dividers |
| `line` | `#d3d8df` | Stronger dividers |
| `card-line` | `#E4E8F0` | Simulated-UI card edge |
| `card-divide` | `#EBEEF4` | Simulated-UI card divider |
| `panel` | `#F7F8FB` | Simulated-UI header tint |
| `depth` | `#0A0E24` | Deep "anchor" ground (`.ak-depth` slabs) |
| `depth-raised` | `#141A38` | Raised surface on depth |
| `vault` | `#0a0a0c` | Footer background only |
| `uc-bg` | `#0A0E24` | MeetAkashic section ground (= `depth`) |
| `uc-surface` | `#141A38` | UC tile/card surfaces |
| `uc-stroke` | `#1E2547` | UC hairlines, dividers |
| `uc-line` | `#2A3157` | UC stronger borders, progress track |
| `uc-vertex` | `#545E82` | UC drafting-grid vertices |
| `uc-dim` | `#6f7988` | UC secondary body text (= `inkSoft`) |
| `uc-mute` | `#8f99a8` | UC muted text, progress fill |
| `uc-text` | `#fafafb` | UC primary text on dark |
| `uc-pill` | `#1B2550` | UC eyebrow pill background |
| `uc-pilltext` | `#c8dcff` | UC eyebrow pill text |

**Keep this table in sync with `tailwind.config.ts`** — add a token, add a row;
remove usage, remove the config row in the same change.

**Tokenisation note:** arbitrary `[#hex]` classes whose value equals a token are
tokenised (`bg-[#3E63DD]` → `bg-blue`). Values shared across families (`#FFFFFF`,
`#FAFAFB`, `#0A0E24`, `#141A38`, `#6f7988`) are left as-is where the semantic
target is ambiguous, and hex inside `style={}`/SVG attrs is a Rule 8 exception.
Near-miss greys not equal to any token (e.g. `#E9EAEE`) should be consolidated to
`card-line`/`subtle-stroke` only with design sign-off (it changes the colour).

### Typography

- **`font-sans`** (Google Sans Text): body, most UI copy.
- **`font-heading`** (Google Sans): headings that opt in via `font-heading`.
- **`font-mono`** (Google Sans Mono): eyebrow labels, mono figures, dossier chrome.
- **`font-display`** (Newsreader): **editorial pull-quotes only** (Voices). Rare — Rule 3.
- **`font-inter`** (Inter, opsz 14–32): **MeetAkashic section only.**

| Scale | Size | Weight | Tracking |
|---|---|---|---|
| Hero headline | 56–64px | 600 | `tracking-tighter` |
| Section headline | 48–64px | 600 | `tracking-tighter` |
| Subsection | 28–32px | 600 | tight |
| Body | 16–18px | 400 | default |
| Small body | 14px | 400–500 | default |
| Eyebrow | 11–13px | 500 | `tracking-eyebrow` (0.14em), UPPERCASE font-mono |

**Eyebrow pattern:** `[NN]  SECTION NAME` — numbers in `text-overcast`, rest in
`text-inkSoft`. Homepage eyebrow rails are **left-only** (`flex items-center`);
the right-hand `/ DESCRIPTOR` was removed from every homepage section (exception:
`JoinTheTeam` right slot holds the live "NOW HIRING" pulse). Sub-page sections
still carry the right descriptor in the borderless variant.

### Spacing, shape, timing

- **8px grid.** Common wrapper: `pt-12 pb-24 lg:pt-16 lg:pb-32`.
- Radius scale: `chip` 6 / `micro` 4 / `tile` 8 / `card` 8 / `inner` 10 /
  `frame` 10 / `btn` 10 / `outer` 14. Every radius lands on a step.
- Shadow ladder (one indigo light source, `rgba(11,20,64)`): `card` (resting),
  `frame` (floating/hover), `deep` (modal), `float-dark` (white cards on the
  dark slab — true-black so the lift is visible).
- Timing: `ease-settle` `cubic-bezier(0.2,0.8,0.2,1)` (UI transitions),
  `ease-smooth` `cubic-bezier(0.4,0,0.2,1)` (continuous motion). Durations are
  numeric tokens (`duration-250`, `duration-400`, `duration-650`) — `settle`/
  `smooth` are timing functions, not durations.

## §4a — Stat Bands (site-wide consistency)

Any "band of figures" uses ONE recipe — `components/ui/StatBand.tsx` standalone,
or match its chrome by hand inside a card that owns its outer frame:

- Outer: `overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg`
- Top accent: `h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent`
- Cell dividers: **dashed** (`border-dashed border-lineSoft`), never solid/gap
- Eyebrow: pulsing blue dot (`h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]`) + mono uppercase label
- Figure: `font-semibold leading-none tracking-tighter text-ink`, count-up via `useCountUp`
- Footer caption: `border-t border-dashed border-lineSoft` mono uppercase

**Deliberate exceptions:** `EnterpriseSecurity`'s 2×2 governance grid (gap-as-
divider beside an SVG chart); `PublicSectorProven`'s dark row-based record board.

## §5 — CSS component classes (globals.css)

| Class | Description |
|---|---|
| `.btn-primary` | Dark (ink) fill, 36px, 10px radius |
| `.btn-secondary` | White bordered, 36px, 10px radius |
| `.btn-ghost` | Transparent, tints to `tertiary-bg` on hover |
| `.dot-grid` | 1px dot radial-gradient at 10px pitch |
| `.rail-container` | Centred 1440px wrapper, `border-x border-lineSoft` |
| `.comparison-before-bg` / `.comparison-slider-line` | TheProof slider |
| `.hs-card` | Absolute 840×592 card for HeroProducts carousel (`data-pos`) |

All `@keyframes` live in `globals.css` (`ps-*` family, `fl-*`, `softpulse`,
`dashmove`, `progressFill`, `vconn-flow`, `proof*`). **Do not add a
component-local `<style dangerouslySetInnerHTML>` keyframe block** — it risks
silently redefining a global keyframe.

## §7 — Design rules

1. **Shape discipline.** Every section gets its own organic shape. Cards are a
   last resort, not a default. Design the container to match the content.
2. **The checkmark is sacred.** The checkmark character appears only in
   FieldLedger's telemetry badge; since FieldLedger stopped rendering, the shipped
   site emits **no checkmarks**. Affirm with numbers/labels/statements instead.
3. **Newsreader is rare.** `font-display` = editorial pull-quotes only (Voices).
4. **No invented data.** All UI numbers are real (Stanford HAI 2026 for the AI
   chart; real deployment figures for scale stats). Do not invent numbers.
5. **Dark sections are deliberate, not default.** Three permanent dark regions:
   Footer (`vault`), `MeetAkashic` (`uc-bg`), `ProvenAtScale` (deep navy). **Every
   dark ground is blue-black, never neutral black** — match the indigo family
   (`#0A0E24` / `#0a0a0c`), do not lighten toward `blue`. New sections default to
   `bg-white`/`bg-background`.
   - **5a — One soft blue band per page.**
     `bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)]`
     (fade endpoints must equal `background`). Pick the page's narrative/trust
     "breather" section. Do not add a second without user direction.
6. **Reduced motion.** Global CSS zeroes `*` animation-duration under
   `prefers-reduced-motion`. Any new animation must degrade safely.
7. **Images require real files.** Never point `<Image>`/`<img>` at a path not in
   `public/`. Photography is stock under free commercial licence (Unsplash); keep
   proof filenames non-identifying. A proof photo must also carry the *right*
   subject: `public/proof/` shots are illustrative of the deployment's sector and
   its **scale**, never a screenshot of the system. Replaced 22 Jul 2026 on that
   test — `vaccination.jpg` showed an infant being immunised, which reads as
   routine childhood vaccination rather than a national adult drive, and
   `mobility.jpg` was a moody duty-free concourse that read as leisure travel.
   Both now show people being processed at scale (a mass vaccination hall with
   registration desks; a queue at airport check-in). Avoid frames dominated by
   commercial branding or a single identifiable country's flags and signage.
8. **Tailwind over inline styles.** Utility classes are the styling method. The
   only sanctioned inline-style exceptions are computed geometry and multi-stop
   conic/radial gradient/mask layers (MeetAkashic orb/pinstripes, edge masks, the
   iso map scene). Do not let the exception spread.

## Accessibility standards (WCAG 2.1 AA)

- **Landmarks:** every page composes `<Nav>` + `<main>` + `<Footer>`. Keep the
  section list inside `<main>`.
- **Focus visible:** `globals.css` defines a global `:focus-visible` ring (2px
  `blue`, 2px offset; white on `.ak-depth`/`#akashic-in-action`). Do **not** use
  `outline-none` on a focusable element without pairing a `focus-visible:` ring —
  `outline-none` (0,2,0) beats the global rule (0,1,0) and removes the indicator
  (this bit the ProofComparison slider handle; now fixed with a
  `focus-visible:ring`).
- **ARIA:** interactive nav dropdowns carry `aria-expanded`/`aria-label`; the
  drag-compare handle is `role="slider"` with `aria-valuemin/max/now`. Dynamic
  regions need `aria-live` where state changes silently.
- **Contrast:** body text meets ≥4.5:1 on both light and the dark UC/depth
  grounds (the 21 Jul UC re-tint moved hue, not luminance, so ratios held).
