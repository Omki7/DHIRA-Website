# AGENTS.md — DHIRA Website v3 Design Constitution

This file is the authoritative source of truth for any AI agent or developer working in this repository. Read it fully before touching any file.

---

## 1. Stack & Project Structure

```
Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5.7 · Tailwind CSS 3.4
```

**Path alias:** `@/*` → project root (configured in `tsconfig.json`). All imports use this form.

```
app/
  layout.tsx           Root layout: loads the Google Sans family + Newsreader from Google Fonts
  page.tsx             Single page, composes all sections in order
  globals.css          Tailwind directives + component classes + keyframe animations

components/
  layout/
    Nav.tsx            Sticky nav with accordion hide-on-scroll and 5 dropdown menus
    Footer.tsx         Dark footer (bg-vault) with link columns

  sections/            One file per page section, rendered in this order:
    Hero.tsx             [00] Hero — scroll word-reveal, rotating phrase, sticky backdrop
    ProblemSection.tsx   [01] The Problem — scrolling proof blocks with count-up watermarks
    PowerfulPlatform.tsx [02] Meet Akashic — 4-row platform flow diagram (bg-blue)
    ProvenAtScale.tsx    [03] Proven At Scale — stats band + FieldLedger (bg-white)
    HowWeDeliver.tsx     [04] How We Deliver — interactive timeline + DeliveryCanvasMockup
    EverySector.tsx      [05] Every Sector — desktop image-strip accordion / mobile accordion
    TheProof.tsx          [06] The Proof — ProofComparisonMockup drag slider
    Voices.tsx            [07] Voices — editorial pull-quote rail (Newsreader display font)
    EnterpriseSecurity.tsx [08] Governance — stat grid + animated trust-coverage curve
    JoinTheTeam.tsx       [09] Careers — filterable open-roles list
    Closure.tsx           [10] Get Started — high-contrast dark card closure, mock CLI

  demos/               Interactive/animated sub-components used inside sections
    HeroConnections.tsx      Animated connection graph shown behind Hero (decorative, real component)
    ProblemBlock.tsx         Single scroll-revealed proof block with count-up watermark (ProblemSection)
    FieldLedger.tsx          Live deployment panels with count-up metrics (ProvenAtScale)
    VoicesDispatches.tsx     Asymmetric editorial dispatch cards (Voices)
    AshokaChakra.tsx         Decorative 24-spoke wheel in brand blues, slow rotation (CareersImpact)

    mockups/             SIMULATED PRODUCT UI — fake app screenshots for visual storytelling,
                          not real Akashic functionality. See §8a before touching any file here.
      HeroProductsMockup.tsx     3-card rotating product showcase (Hero). Large file: renders its
                                 three panel mockups via `dangerouslySetInnerHTML` — intentional,
                                 see §8a.
      PlatformBIChartMockup.tsx  Fake BI module card (filter chips + rose chart + stats)
                                 used inside PowerfulPlatform's Explore & Ask row
      PlatformConnectors.tsx     Shared connector SVGs (HConn/VConn/DropConn/DagConn) and the
                                 `ModIcon` badge, used to link the fake module cards in
                                 PowerfulPlatform's flow diagram and PlatformBIChartMockup
      DeliveryCanvasMockup.tsx   Animated phase mockup (audit / deploy / operate) for HowWeDeliver
      ProofComparisonMockup.tsx  Drag-to-compare before/after slider mockup (TheProof)
      EisBriefMockup.tsx         Fake EIS morning brief (AI-written CEO pulse, Business
                                 Pulse tiles, grounded footer) for the /solutions/eis hero;
                                 demo data mirrors the EIS product prototype

  icons/               Static SVG components, no logic
    AkashicLogo.tsx
    DhiraLogo.tsx
    DynamicSketchIcon.tsx    Text-keyed icon lookup; falls back to a default glyph for unknown keys
    CloudProviderLogos.tsx   Real AWS / Azure / Google marks (brand colours) for /akashic [03]

  ui/                  Generic utility components
    ScrollReveal.tsx     Intersection Observer fade-in wrapper (accepts a `delay` prop in ms)
    ScrollRevealRail.tsx Centred 1440px rail with animated scroll-tracking edge lines
                         (`dark` prop for use on dark sections)

hooks/
  useCountUp.ts        Count-up animation primitives:
                         - `useCountUp(figure, opts)` (default export) — parses a single string
                           figure (e.g. "$581B"), animates once when its own ref scrolls into view
                         - `useCountUpValue(target, kick, reduced, duration)` — re-triggerable
                           numeric count-up for content already visible in a parent ScrollReveal
                         - `usePrefersReducedMotion()`
```

**Never** place files flat in `components/`. Always use the appropriate subdirectory.

---

## 2. Brand Identity

- **DHIRA** = the company. **Akashic** = the platform. Keep distinct. Never write "DHIRA's Akashic."
- Akashic unifies structured, unstructured, and streaming data into one governed foundation, links it via a knowledge graph, and runs BI, conversational AI, ML, and agentic orchestration on top.
- Positioning: one accountable partner (platform + delivery), not a stack of vendors. Not pure SaaS, not pure consultancy.
- Proof points: national-scale DPI delivery in India; Maha Hackathon 2025 winner; Telangana AI Rising 2025 winner; Startup India recognised; offices in New York, Hyderabad, Bangalore.
- Sectors: Government, Smart Cities, Healthcare, Banking and Finance, Retail and Manufacturing, Education, Energy and Utility.

---

## 3. Brand Voice

- **Direct, declarative, short.** Headlines are complete thoughts.
- **No em dashes** in marketing copy. Use colons or periods instead.
- **No vaporware.** Never market a roadmap feature as live.
- **Precise over vague.** No "powerful," "seamless," "next-generation" as filler.
- **British/Indian English** spelling throughout: "organisation," "recognised," "colour," "optimise."
- **Claims must be verifiable.** No invented SLA numbers, certifications, or client names.
- Two-tier motif: "trust / trace / act on" is the emotional promise; "grounded" is the technical mechanism (knowledge graph). Keep distinct.

---

## 4. Design Tokens

### Colors

| Token | Value | Use |
|---|---|---|
| `background` | `#FFFFFF` | Page background |
| `primary-bg` | `#FAFAFB` | Card surfaces, inset panels (e.g. `EverySector` text panel) |
| `secondary-bg` | `#FFFFFF` | Nav menu-row icon tiles |
| `tertiary-bg` | `#F3F3F4` | Subtle inset areas, hover fills |
| `ink` | `#1A1C1D` | Primary headings, dominant text |
| `primary-text` | `#1A1C1D` | Nav / menu body text |
| `secondary-text` | `#5C5E63` | Nav secondary copy |
| `tertiary-text` | `#8E8F91` | Nav labels, deemphasised UI text |
| `inkSoft` | `#6f7988` | Section body copy |
| `overcast` | `#8f99a8` | Tertiary labels, watermarks |
| `action` | `#1A1C1D` | Primary button fill |
| `action-hover` | `#2F3132` | Button hover |
| `blue` | `#3E63DD` | Accent links, highlighted data, focus rings |
| `blue-hover` | `#3351B8` | Blue accent hover state |
| `blue-subtle` | `#EEF1FC` | Accent background tint |
| `blue-border` | `#C8D2F5` | Accent border |
| `red` | `#E5484D` | Problem-section indicator bar/watermark only — not a general error colour |
| `vault` | `#0a0a0c` | Footer background only |
| `lineSoft` | `#e4e7ec` | Section borders, dividers |
| `line` | `#d3d8df` | Stronger dividers |
| `subtle-stroke` | `#EEEFF1` | Card borders |
| `default-stroke` | `#D9DADB` | Nav divider stroke |

Keep this table in sync with `tailwind.config.ts` — if you add a token, add a row; if you remove usage of a token, remove it from the config in the same change.

### Typography

- **`font-sans`** (Google Sans Text): body text, most UI copy.
- **`font-heading`** (Google Sans): headings that opt in explicitly via `font-heading` (most headings otherwise inherit `font-sans` via the `h1`–`h6` rule in `globals.css`).
- **`font-mono`** (Google Sans Mono): eyebrow labels, monospace figures, dossier-style UI chrome.
- **`font-display`** (Newsreader): **Editorial pull-quotes only.** Currently only Voices section (and `FieldLedger`'s pull-quote line). Do not introduce it elsewhere.
- **No handwriting fonts.** `font-hand` (Caveat) was removed in July 2026: hand-written annotations hurt readability in the `/akashic` [02] walkthrough. Do not reintroduce cursive/hand-drawn typefaces anywhere; annotations use `font-mono`.

| Scale | Size | Weight | Tracking | Usage |
|---|---|---|---|---|
| Hero headline | 56–64px | 600 | `tracking-tighter` (`-0.04em`) | Hero H1 |
| Section headline | 48–64px | 600 | `tracking-tighter` | Section H2 |
| Subsection | 28–32px | 600 | tight | Feature headings |
| Body | 16–18px | 400 | default | Prose paragraphs |
| Small body | 14px | 400–500 | default | Card copy |
| Eyebrow | 11–13px | 500 | `tracking-eyebrow` (0.14em) | Section labels, always UPPERCASE font-mono |

**Eyebrow pattern:** `[NN] / SECTION NAME` in `font-mono text-[11px] uppercase tracking-eyebrow`. Numbers in `text-overcast`, rest in `text-inkSoft`.

### Spacing & Shape

- **8px grid.** Section vertical padding: `py-12 lg:py-16` for most sections' top or `pt-12 pb-24 lg:pt-16 lg:pb-32` as the common section wrapper pattern.
- `rounded-btn` = 6px (buttons), `rounded-card` = 8px (cards), `rounded-frame` = 10px (large panels).
- `shadow-frame`: large panel elevation. `shadow-card`: subtle card lift.

### Timing

- `duration-settle` + `ease-settle` (`cubic-bezier(0.2,0.8,0.2,1)`): all interactive transitions.
- `duration-smooth` + `ease-smooth` (`cubic-bezier(0.4,0,0.2,1)`): continuous motion (animations).
- Typical range: 200–400ms for UI, 600–800ms for layout morphing.

---

## 5. CSS Component Classes (from globals.css)

| Class | Description |
|---|---|
| `.btn-primary` | Dark fill (ink) button, 36px height, 10px radius |
| `.btn-secondary` | White bordered button, 36px height, 10px radius |
| `.btn-ghost` | Transparent button, tints to `tertiary-bg` on hover |
| `.dot-grid` | 1px dot radial-gradient background at 10px pitch |
| `.rail-container` | Centred 1440px max-width wrapper, `border-x border-lineSoft`, standard horizontal padding |
| `.comparison-before-bg` | Before image container clipping style (TheProof) |
| `.comparison-slider-line` | Split-slider line positioning (TheProof) |
| `.hs-card` | Absolute-positioned 840x592px card for the HeroProducts / AkashicModuleScreens carousels. Use `data-pos="center\|left\|right"` (plus `"far"` for off-stage cards when there are more than three) |
| `.ps-mc` / `.ps-mc-hd` / `.ps-mc-dark` | Platform module card shell / header strip / dark variant, used by `PowerfulPlatform` and `PlatformBIChart` |

### Keyframe animation classes (apply via className)

| Class | Animation | Origin |
|---|---|---|
| `.fl-sparkline` | SVG sparkline draw-in (fl-spark) | FieldLedger |
| `.fl-row-enter` | Row fade-up on enter (fl-row) | FieldLedger |
| `.fl-sheen` | Shimmer sweep via ::after (fl-sweep) | FieldLedger |
| `.mc-stage-in` | Panel fade-up (mc-stage) | ProofComparison |
| `.sector-text-in` | Right-panel text entrance (sectorTextIn) | EverySector |

**Inline @keyframes used directly** (not class-based, applied via inline `animation` style): `softpulse`, `dashmove`, `progressFill`, `ps-*` (PowerfulPlatform's caret + the other mockups' legacy set — `ps-pulse`, `ps-crawl`, `ps-zip`, `ps-ring`, `ps-dash`, `ps-flow`, `ps-float`, `ps-breathe`, `ps-grow`, `ps-draw`, `ps-linep`, `ps-bar`, `ps-sheen`, `ps-fillA`, `ps-fillO`, `ps-rise`, `ps-risec`, `ps-caret-blink`), `akx-*` (AkashicFourMoves answer card — `akx-pop`, `akx-rise`, `akx-fillx`, `akx-mark`), `proofCorePulse`, `proofKnobGlow`, `proofHint`.

All keyframes live in `globals.css`. Do not add a component-local `<style dangerouslySetInnerHTML>` block for animations — it risks silently redefining a keyframe that already exists globally (this happened once with `ps-pulse`/`ps-rise` in `PowerfulPlatform.tsx` and has since been consolidated).

---

## 6. Section Map

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| — | nav | `layout/Nav.tsx` | `bg-white/95 backdrop-blur-md` | Hides on scroll down (30px accumulated delta), shows on up (15px) or near top |
| 00 | hero | `sections/Hero.tsx` | `bg-background` / `bg-blue` (sticky quote layer) | Uses `demos/mockups/HeroProductsMockup` + `demos/HeroConnections` |
| 01 | problem | `sections/ProblemSection.tsx` | `bg-white` | Scrolling proof blocks, Stanford HAI 2026 data |
| 02 | platform | `sections/PowerfulPlatform.tsx` | `bg-[#3E63DD]` (blue) | 4-row flow diagram; uses `demos/mockups/PlatformBIChartMockup` + `demos/mockups/PlatformConnectors` |
| 03 | scale | `sections/ProvenAtScale.tsx` | `bg-white` | Stats band + `demos/FieldLedger`. Deliberately overrides the old "one dark section" rule — see §7, Rule 5 |
| 04 | delivery | `sections/HowWeDeliver.tsx` | `bg-white` | Interactive timeline + `demos/mockups/DeliveryCanvasMockup`; service chips link to `/delivery` anchors |
| 05 | sectors | `sections/EverySector.tsx` | `bg-white` | Image-strip accordion desktop / accordion mobile |
| 06 | proof | `sections/TheProof.tsx` | `bg-white` | `demos/mockups/ProofComparisonMockup` drag slider |
| 07 | voices | `sections/Voices.tsx` | `bg-background` | Editorial rail with `font-display` (Newsreader) |
| 08 | governance | `sections/EnterpriseSecurity.tsx` | `bg-white` | Stat grid + animated trust-coverage curve, compliance strip |
| 09 | careers | `sections/JoinTheTeam.tsx` | `bg-[#FAFAF9]` | Filterable open-roles list |
| 10 | closure | `sections/Closure.tsx` | `bg-white` | High-contrast dark closure card, mock CLI |
| — | footer | `layout/Footer.tsx` | `bg-vault` | Dark footer, link columns |

### Akashic product page (`/akashic`)

Composed in `app/akashic/page.tsx` (Nav + sections + Footer). The nav's "Akashic" trigger links here; its dropdown items anchor to module ids on this page (`#data-pipelines`, `#master-data`, `#data-warehousing`, `#machine-learning`, `#ask-ai`, `#business-intelligence`, `#governance`).

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| 00 | — | `sections/akashic/AkashicHero.tsx` | `bg-background` | Centred hero, dot-grid backdrop, scroll cue into [01] |
| — | platform-screens | `sections/akashic/AkashicShowcase.tsx` | `bg-white` | Unnumbered hero extension (mirrors the home Hero's live wireframes): 7-module screen carousel via `demos/mockups/AkashicModuleScreensMockup` (§8a applies) — reuses the three home hero screens from `HeroProductScreensMockup`, plus Master Data / ML / Governance screens built in the same idiom and demo-data world, and the BI tab rendered as the interactive `AkashicHeroBIWireframe` component (dashboard + Ask Akashic chat whose suggested queries answer from the demo world and add an Attainment-by-region tile live) |
| 01 | akashic-in-action | `sections/akashic/AkashicFourMoves.tsx` | `bg-[#3E63DD]` | "Akashic in action" — the product page's first fold, rebuilt again (Jul 2026) as a question-first run: narrative + manual two-world toggle (Enterprise / Public programmes) left, live ask simulation right (§8a applies: canned copy + demo data). A rAF pull-to-pop glide lands the visitor flush on the section as soon as its edge peeks in from the platform-screens wireframes above (light downward scroll triggers it; upward wheel/touch aborts; skipped under reduced motion). The question types itself first (the input card wears a white focus ring while running); the four moves (Connected → Understood → Reasoned → Answered, plain-language lines, no jargon) stay hidden until it finishes, then cascade in one by one — their space and the answer card's are always reserved (`invisible`/`opacity-0`) so the fold never jumps. The answer card pops in (`akx-pop`) as a two-panel evidence dossier that makes the structured + unstructured pull explicit in plain words: "From your systems" (percent-of-target bullet bars via `akx-fillx`, dashed 100% target line, red shortfall row + delta chip, gap-reconciling footnote) beside "From your documents" (an email / field-report excerpt whose key phrase gets an amber highlighter sweep, `akx-mark`, plus a second record row with an Unsigned/Rescheduled status chip); Akashic-wordmark chrome strip on top, plain-language evidence chips below (systems+documents count / traceability / speed). Demo numbers reconcile across panels (Enterprise: −8% = $80,500 = the two stalled renewals; Public: −9% = 550 enrolments = the two rescheduled camps). The run plays once and persists (never resets on scroll-out); switching worlds replays it. Blue background is a deliberate product-page echo of the home page's PowerfulPlatform blue (Rule 5 exception). Hero's "See how it works" CTA links here (`#akashic-in-action`); `#modules` transition link reveals with the answer (left column on desktop, foot on mobile) |
| 02 | how-it-works | `sections/akashic/AkashicModular.tsx` | `bg-primary-bg` | "Introducing Akashic" immersive teardown: a 970vh track pins a full-viewport 3D scene (`demos/mockups/AkashicTeardownMockup`, §8a applies) — a machined product unit (faceplate wordmark + AkashicLogo, edge status LEDs, idle bob) opens into six plates (pipelines → BI), one module per scroll segment, then governance rails/audit sweep reveal as the always-on frame. The unit reseals for the "start anywhere" close chapter (text above, unit below): individual plates pull out like drawers in combos (pipelines alone / master data + ask / whole platform) under the "Every module works on its own" headline + `#talk-to-our-team` CTA. Hero + platform-screens + four-moves ride on top as a `curtainContent` overlay; a snap assist (240px zone) pulls the stage to full screen once the curtain is nearly scrolled past. The scene renders imperatively (rAF + data-ak refs, no per-frame React renders); scroll position is the single source of truth — HUD ticks navigate by scrolling the page. Demo data stays in the canned world (customer 9042 / demand-forecast v3, AkashicModules source-dot colours). Replaced the record-journey walkthrough (July 2026); the retired `StartAnywhereWalkthroughMockup` + `StartAnywherePanelsMockup` files remain on disk but are no longer imported |
| 03 | architecture | `sections/akashic/AkashicArchitecture.tsx` | `bg-white` | Deploy-it-your-way, moved directly after the [02] teardown (July 2026) and compacted to fit one desktop viewport (stacked page-standard header, slim close bar, tightened padding): three environment plates — sky-gradient cloud plate with real AWS / Azure / Google marks (`icons/CloudProviderLogos`), light-metal server-cabinet plate for on-prem with a blue-lit Akashic shelf (recoloured from dark ink, July 2026, per Rule 5), split rack/cloud estate for hybrid — all holding the same AkashicMark, converging into the consistency close bar. Cloud region names are real provider regions |
| 04 | modules | `sections/akashic/AkashicModules.tsx` | `bg-white` | "How it composes" ("Seven modules. Three layers. One circuit.") — a complete circuit filling one desktop fold. **Its job is composition, not identity:** [02] already introduced each module at length, so this section must never re-describe what a module *is* (content pass, Jul 2026 — the page explained the same seven modules three times). Module `sub` lines state position in the circuit ("Everything arrives here", "Duplicates collapse here", "Metrics are defined here"…), never capability. The Knowledge Layer tagline names **Master Data** as the graph's producer — the seven-module count and the knowledge graph reconcile only if this stays; the graph is not itself a module (`rail-container` is `lg:min-h-screen` flex-centred, the flow grid `lg:min-h-[480px]` with `flex-1` module rows). Rebuilt again (Jul 2026, user direction) to deliberately decouple from [01]'s South-region story: this section is a spec sheet of CAPABILITIES, not a worked example — no named entities, no example match-key fields, no story-specific figures or timestamps anywhere. Sources rail now four categories (Business systems, Databases, Files, Streaming & IoT — two badges each, covering structured/unstructured/streaming, mono footer kept). Module rows: plain-language sub + mono `meta` technical caption + a `CapChips` pair (two stacked mono capability chips) or a purpose-built viz — Data Pipelines "Structured/Unstructured" chips + "streaming · batch · CDC" caption, Master Data "Deduplication/Hierarchy" chips + "match + merge · survivorship", Warehouse "Query-ready/Sub-second" chips + "dimensional models · fast joins", ML sparkline labelled "trend + forecast", Ask Akashic single GROUNDED chip, BI bar chart labelled "auto-refresh" (last bar blue, not red — no story-specific dip). The knowledge graph shows generic relationship TYPES, not a named entity: centre "Any record" linked by labelled edges (linked to / classified as / traced through / governed by) to Related records / Its category / Its history / A policy. The closing "Your decision" card is a generic capability statement ("Ask anything about your data." → "One grounded answer, every time.", GROUNDED chip, "Backed by: every connected system / every linked document") with no quote, figure, or timestamp tied to [01]. Governance floor tiles are generic capability lines (enforced on every request / every step recorded / every action logged), not a specific persona or time. Module rows keep the nav anchor ids (`#modules-data-pipelines` … `#modules-governance`); mobile stacks columns with MobileConn joints |
| 05 | trust | `sections/akashic/AkashicTrust.tsx` | `bg-white` | "One answer, four checks" — the payoff of [01], rebuilt again (Jul 2026, user direction: live screens, not HTML boxes): the same South-region answer sits at top as an artifact card (green pulse chrome strip, 09:41), a stem + "Four checks, built in" mono bridge drops into a 2×2 where each check is a full app window from `demos/mockups/AkashicTrustScreensMockup.ts` (§8a) in the hero screens' exact chrome (window bar + `app.akashic.dhira.io` pill, compact breadcrumb top bar, 46px module rail, #E9EAEE borders, flat shadows; layouts reference OpenMetadata's governance UX re-skinned to Akashic). Each check leads with a plain-language question + mono term eyebrow above its screen: Access control "Who can see it?" (Roles/Policies/Users tabs, roles table with permission chips incl. rose "Export denied", "Enforced at query time" footer), Lineage "Where did each number come from?" (lineage canvas on the `revenue_vs_target` asset page, rail active on Warehouse: SAP/Salesforce/email upstream nodes fan into the model card, blue-highlighted path from the cited email, −8% answer node, zoom pill), Audit trail "Who has touched it?" (filter chips, avatar activity feed with a rose "Denied · policy" export row, Live chip, append-only footer), Data residency "Where did the data stay?" (dashed YOUR JURISDICTION perimeter with Stored→Processed→Answered, red-dashed "0 bytes" egress to a greyed Other-regions card). Screens are `h-[340px] min-w-[460px]` in an `overflow-x-auto` wrapper (mobile pans horizontally). Closes with the defensible-not-delivered statement + CTA |
| 06 | open | `sections/akashic/AkashicOpenFoundations.tsx` | `bg-white` | "Open architecture" — the no-lock-in chapter (rebuilt Jul 2026, user direction: dropped the technology list). Page-standard left-narrative + right-simulated-card layout: four commitments (modular / open, not a black box / extensible / portable) left — the "open, not a black box" commitment points at **[08] by index, not "the next section"** (that pointer broke when [07] Build vs. buy was inserted between them; do not reintroduce a relative reference) — an `akashic.export` **portability manifest** right (§8a) listing what you carry out when you leave (data, models, pipelines, dashboards, knowledge graph) in plain-language open formats with an outbound-arrow tag, blue "take it to any platform, no exit fee" footer. Deliberately no vendor / technology names (that was the removed "guts"); distinct from [03] deploy and [05] trust |
| 07 | build-vs-buy | `sections/akashic/AkashicBuildVsBuy.tsx` | `bg-white` | "Build vs. buy" — the opportunity-cost argument, added Jul 2026. Three grouped comparison rows (Speed and complexity / Who carries it / Cost and governance) between a "Custom build" plate and a Recommended-badged Akashic plate. **Every cell is a string, deliberately:** the middle group was booleans rendered as tick/cross badges, which violated Rule 2 *and* contradicted the H2 — a cross claims the team cannot build what "Your team could build this" concedes they could, and what [08] then names the open-source projects for. Rows state who *carries* the work, not who is *capable* of it. Do not reintroduce booleans or checkmarks. ⚠ build-side estimates ("Quarters", "A standing team") are UNSOURCED per Rule 4 — confirm or cut before ship; the "6 weeks" cell must move together with [11]'s six-week commitment |
| 08 | stack | `sections/akashic/AkashicStack.tsx` | `bg-white` | "The stack" — a tabbed drawer (client) in the "Modular by design" idiom, added Jul 2026 (user direction): a vertical module selector (horizontal scroll on mobile) drives a `ps-rise`-animated detail panel showing each module's connectors + capabilities. Connector marks use the house monogram-tile style (coloured mono badge + name, like the Pipelines mockup source list — illustrative integration categories, not a live registry). Per module: Pipelines (source-connector tiles + unstructured ingestion + how-it-runs, runs-on Airflow/Kafka/CDC), Master Data (MDM: entities / match / golden record / stewardship), Warehouse (warehouse-connector tiles + modelling / serving, Iceberg/Delta/dbt), ML (notebooks / MLOps / feature store / compute, MLflow/JupyterHub), Ask Akashic (BYOK highlight callout + models supported / grounding / security), BI (surfaces / interaction / governed, Superset), Governance (access / lineage / audit / residency+keys / compliance — DPDP/ISO/SOC2/GDPR/CERT-In). **Deliberately names open technologies and model providers** — this is the stack tour [06] intentionally omits, per explicit user request; compliance / key-custody / residency lines match the home + [05] copy. `id="stack"` (own selector state, no per-module anchor ids). The panel footer is the **"Runs on" strip only**, and renders only when the module has `tech` — it used to carry "Works standalone · snaps into the platform" plus a WORKS STANDALONE chip on all seven panels, i.e. 14 restatements of an idea [02]'s close chapter owns and earns. Do not put the standalone claim back here |
| 09 | solutions | `sections/akashic/AkashicSolutions.tsx` | `bg-white` | EIS / Life / Knowledge cards (anchor ids match the nav's Solutions links) on a shared "same governed model" base bar. ⚠ **`Nav.tsx` describes Akashic Life and Akashic Knowledge as entirely different products** from this section (nav: edge AI diagnostics / adaptive learning infrastructure; here: life-sciences data unification / document intelligence). Unresolved — one surface is wrong and it is live site-wide |
| 10 | scale | `sections/akashic/AkashicScale.tsx` | `bg-white` | Two live-deployment stat panels (figures per Rule 4 + content script; script marks section status OPEN). ⚠ "Akashic runs national infrastructure today" asserts the deployments are the *product*; if they predate Akashic-as-product or were bespoke engagements, this is the page's highest-risk claim — confirm before ship |
| 11 | talk-to-our-team | `sections/akashic/AkashicClose.tsx` | `bg-white` | Dark closure card (Rule 5's Closure precedent). ⚠ six-week commitment flagged "confirm" in the content script (and mirrored in [07]'s table — move both together). Carries the `#talk-to-our-team` id the nav CTA targets |

Shared pieces for this page: the blue-on-white animated connectors (`FlowPath`/`FanIn`/`MergeDown`/`SplitDown`/`MobileConn`) live in `demos/AkashicFlowConnectors.tsx` (decorative, no data), and the simulated-UI card chrome + MiniStack motif live in `sections/akashic/AkashicCardChrome.tsx`.

#### Repetition budget (content pass, Jul 2026)

This page's recurring failure mode is not bad writing, it is the same idea delivered in four places by four different rebuilds. Each idea below has **one** owner; every other section assumes the reader has it. Before adding a sentence, check whether you are restating one of these:

| Idea | Owner | Everywhere else |
|---|---|---|
| Numbers in systems, reasons in documents | [01] | Hero states the *promise*, not the mechanism |
| What each module *is* | [02] | [04] composes them; [08] says what they run on |
| Start anywhere / works standalone | [02]'s close chapter (it demonstrates it) | Assume it. Do not restate in [06], [08], or [11] |
| Deploy where data must live | [03] | [05] *proves* residency; [03] only claims it |
| Governance exists / is always on | [02] module 07 | [04] states scope structurally; [05] proves it with screens |
| No lock-in / portability | [06] | [08] names the standards [06] points at |
| Opportunity cost of building | [07] | — |
| What it runs on | [08] | Only place technology is named |

**Terms that must stay defined at first use.** Both were load-bearing and floating until Jul 2026:
- **governed metric layer** — defined in [02] Warehouse ("defined once here and stored once"). It is not a module. Three later sections lean on it; do not use it before [02] defines it.
- **knowledge graph** — produced by [02]/[04] Master Data, exportable in [06], queried by Ask Akashic. Also not a module. If you write copy implying it is the eighth module, the "seven modules" count breaks.

**Canonical module names** (match `Nav.tsx`): Akashic Pipelines · Akashic Master Data · Akashic Warehouse · Akashic ML · Ask Akashic · Akashic BI · Akashic Governance. The longer strings (`Akashic Data Pipelines`, `Akashic Insights`, …) are `DynamicSketchIcon` lookup keys only — never render them as display copy. `Akashic Insights` is a stale alias for Ask Akashic (`AkashicModules.tsx`).

**Layer vocabulary:** Data Layer / Knowledge Layer / Intelligence Layer, with Governance as the floor. Introduced in [04] and currently used only there. Either commit to it page-wide or cut it; do not add a fourth layer name.

#### Callback policy — sections stand alone (Jul 2026)

`Nav.tsx` deep-links **into the middle of this page** (`/akashic#modules-data-pipelines`, `#modules-ask-ai`, `#solutions`, `#stack`, and five more), and search traffic lands the same way. **Every numbered section must be fully understandable cold**, by a visitor who has read nothing above it.

A callback to an earlier section is allowed only when it is *enrichment* — flavour for the sequential reader that carries no load-bearing meaning — and only inside a section you cannot land in mid-scroll. In practice that means **[02] only**, whose 970vh pinned teardown has no addressable interior. Its internal callbacks ("You've just seen everything underneath it. That's why it works.", "underneath everything you just watched") are deliberate and stay.

Everywhere else, do not write "You've seen…", "This is the answer from…", "As shown above", or an index reference that the reader needs in order to parse the sentence. These were added in a Jul 2026 cohesion pass and removed in the pass immediately after, once the nav deep-links were accounted for — do not re-add them. Forward pointers used for wayfinding ([06] → "named in full in [08]") are fine: they aid navigation rather than gate comprehension.

The two goals are not in tension. Sections stand alone; the *sequence* supplies the narrative, not the sentences.

#### Microcopy conventions (checked Jul 2026)

- **Transition CTAs are imperative.** "See what's underneath" ([01]), "Deploy it where your data lives" ([02]), "See what you'd take with you" ([05]), "See what each module runs on" ([07]). Do not write a declarative fragment as a button label.
- **Conversion CTAs follow the site pattern, not a page-local one.** Every page's hero links "Talk to our team" → its own `#talk-to-our-team` close section; every close section's button → `/#get-started` (home `Closure.tsx`). Two same-labelled buttons with different destinations looks wrong in isolation and is correct across the site. Do not "fix" it on `/akashic` alone. ⚠ Separately: `Closure.tsx` carries `id="talk-to-our-team"` *inside itself*, so its own "Schedule a briefing" button is a no-op on the home page. Real bug, not an `/akashic` one.
- **Typography: curly apostrophes and quotes everywhere copy is rendered.** JSX prose uses `&rsquo;` / `&ldquo;`; **data strings and simulated-UI strings must use the literal `’` `“` `”` characters**, not `'` or `\"`. The page mixed both until Jul 2026 (teardown module bodies and the [02] Ask query rendered straight quotes while [01]'s demo question rendered curly ones). Grep before shipping: `"[^"]*[a-z]'[a-z][^"]*"` over `sections/akashic` and the Akashic mockups should return nothing.
- **Badges** are ALL-CAPS via the `uppercase` CSS class, so source strings are written in sentence case ("Recommended", "In-house") and *render* uppercase. Don't "correct" the source string casing; check the rendered output before reporting a case inconsistency.

### Delivery page (`/delivery`)

Composed in `app/delivery/page.tsx` (Nav + sections + Footer). The nav's "Delivery" trigger links here; its dropdown items anchor to service ids on this page (`#ai-readiness-audit`, `#sovereign-blueprint`, `#governance-framework`, `#platform-deployment`, `#legacy-modernization`, `#custom-accelerators` — all inside section [02]). The home page's `HowWeDeliver` service chips link to the same anchors.

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| 00 | — | `sections/delivery/DeliveryHero.tsx` | `bg-background` | Centred hero, dot-grid backdrop, pill + eyebrow + H1 + copy + CTAs |
| 01 | engagement-models | `sections/delivery/DeliveryModels.tsx` | `bg-white` | Triage rail: three reality quotes route via animated connectors into their engagement model; CSS-only hover dimming (server component) |
| 02 | akashic-deployment | `sections/delivery/DeliveryAkashicDeployment.tsx` | `bg-white` | Model 1: six-week rollout as a Gantt strip (deliberately not the home page's vertical timeline), three phase dossiers carrying the nav anchor ids, modular-start panel reusing `MiniStack` |
| 03 | product-engineering | `sections/delivery/DeliveryProductEngineering.tsx` | `bg-white` | Model 2: two build paths as one editorial decision split (no card chrome, no track jargon): each side reads "If this is you → We build it (On Akashic / On your stack) → week figure → advantage", dashed axis with floating OR node |
| 04 | advisory-co-engineering | `sections/delivery/DeliveryAdvisory.tsx` | `bg-white` | Model 3: two engagement forms as stacked editorial ledger rows (no card chrome): Strategic Advisory (2–4 figure + D-01…03 deliverables ledger) and Co-Engineering Squad (1 + 4 figure + five readable role rows) |
| 05 | methodology | `sections/delivery/DeliveryMethodology.tsx` | `bg-white` | Discover/Design/Deliver/Transfer on one unbroken dot rail (horizontal desktop, vertical mobile) — the "no hand-offs" visual |
| 06 | proven-at-scale | `sections/delivery/DeliveryProven.tsx` | `bg-white` | Live engagement ledger (client): count-up figures, sparklines, LIVE/COMPLETE chips; figures per Rule 4 (match AkashicScale / home stats) |
| 07 | partnership-fit | `sections/delivery/DeliveryFit.tsx` | `bg-white` | Editorial verdict split: two indexed statement ledgers on one dashed axis, each closing on its verdict line; directional arrows only (no checkmarks, Rule 2) |
| 08 | faq | `sections/delivery/DeliveryFAQ.tsx` | `bg-white` | Master-detail Q&A on desktop (question ledger left, active answer staged at 22px right under ghost "?" watermark), dossier accordion below lg; shared open state, discovery-call close line |
| 09 | talk-to-our-team | `sections/delivery/DeliveryClose.tsx` | `bg-white` | Dark closure card (Rule 5's Closure precedent). Carries the `#talk-to-our-team` id the nav CTA targets |

### About page (`/about`)

Composed in `app/about/page.tsx` (Nav + sections + Footer). The nav's Company menu links here: "About Us" → `/about`, "Careers" → `/about#careers`. The careers section is a teaser for the home page's full JoinTheTeam board (same four roles) and links back to `/#careers` rather than duplicating the filterable list.

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| 00 | — | `sections/about/AboutHero.tsx` | `bg-background` | Centred hero, dot-grid backdrop, "outlast the budget cycle" bars motif, offices mono strip |
| 01 | why-we-exist | `sections/about/AboutWhy.tsx` | `bg-white` | Narrative + micro-mockup panel (§8a applies: three conflicting spreadsheets, untraceable AI answer), trust-problem pivot line |
| 02 | who-we-are | `sections/about/AboutWho.tsx` | `bg-white` | Contexts ledger (ministries / regulated enterprises / startups) + advise-and-leave vs build-and-stay contrast strip |
| 03 | what-we-believe | `sections/about/AboutBeliefs.tsx` | `bg-white` | Constitution ledger: sticky left header, five indexed principles (B-01…B-05) with ghost numerals, CSS hover dimming |
| 04 | how-we-work | `sections/about/AboutHow.tsx` | `bg-white` | Four field-manual commitment cards in a 2×2, corner indices, growing tick rule on hover |
| 05 | careers | `sections/about/AboutCareers.tsx` | `bg-white` | Careers teaser: NOW HIRING pulse signature, four compact role rows (match JoinTheTeam's ROLES), links to `/#careers` |
| 06 | proof | `sections/about/AboutProof.tsx` | `bg-white` | Three deployment panels (client, AkashicScale idiom): count-up figures per Rule 4, sparklines, LIVE/COMPLETE chips |
| 07 | talk-to-our-team | `sections/about/AboutClose.tsx` | `bg-white` | Dark closure card (Rule 5's Closure precedent). Carries the `#talk-to-our-team` id the nav CTA targets |

### Careers page (`/careers`)

Composed in `app/careers/page.tsx`. The nav's Company → Careers, the home JoinTheTeam board's Apply/"Explore all open roles" links, and the About page's careers teaser all point here. Copy is assembled from approved brand material only (home JoinTheTeam headline + sub, the four ROLES, About beliefs, public-record mission figures); Apply links anchor to `#talk-to-our-team` — ⚠ wire a real careers inbox/ATS before ship.

| Order | ID | File | Notes |
|---|---|---|---|
| 00 | — | `sections/careers/CareersHero.tsx` | Centred hero, NOW HIRING pill, locations strip |
| 01 | the-work | `sections/careers/CareersImpact.tsx` | "Production is a country": narrative beside `demos/AshokaChakra` (slow-turning 24-spoke wheel), then the four-mission impact band (count-ups per Rule 4) |
| 02 | how-we-work | `sections/careers/CareersCulture.tsx` | Candidate-lens culture ledger (W-01…W-06: principles translated to the employee experience), honest compensation note pointing at the intro call, links to `/about#what-we-believe` |
| 03 | open-roles | `sections/careers/CareersRoles.tsx` | Canonical filterable roles board (client) — same ROLES + blue-bar hover signature as JoinTheTeam; keep the two lists in sync |
| 04 | how-we-hire | `sections/careers/CareersHiring.tsx` | Four-step hiring rail (intro call / deep-dive / working session / decision) |
| 05 | talk-to-our-team | `sections/careers/CareersClose.tsx` | Dark closure card; Apply anchor target |

### Solution pages (`/solutions/eis`, `/solutions/life`, `/solutions/knowledge`)

Composed in `app/solutions/{eis,life,knowledge}/page.tsx` (Nav + sections + Footer). The nav's Solutions → Akashic Plugin items link here, as do the "Learn more" links on `/akashic`'s AkashicSolutions cards. Copy comes from user-supplied content scripts (July 2026); figures on these pages (564 crore sessions, 18.25 crore enrolments, 1.89 crore learners, 2B vaccinations, 3.87 lakh emigrations, 10 crore+ Poshan, 12,402/month, ₹2 Cr+ estimate) are per those scripts — ⚠ some differ from the home/Akashic stats (5.75B+/187M+); reconcile before ship. All three share the split hero (pitch left, telemetry/mockup card right), the flowing six-step chain rail, and count-up proof panels, so the family reads as siblings.

| Page | Sections (`components/sections/…`) | Signature pieces |
|---|---|---|
| `/solutions/eis` | `eis/` — EisHero, EisBrief [01], EisProvenance [02], EisSpine [03], EisAction [04], EisMoments [05], EisIntegration [06], EisProof [07], EisClose [08] | Rebuilt (Jul 2026) around the EIS product prototype (user's Downloads/Akashic EIS): `demos/mockups/EisBriefMockup` morning-brief hero (§8a, Nexora/Arjun/Meridian demo data from the prototype); brief-anatomy fan (one sentence, three systems); recreated Data Provenance popover (source/query/refresh/confidence/records); Enterprise Spine entity graph + convergence card; question-to-action single console (three numbered ask/simulate/approve zones mirroring a plain step rail, Jul 2026 simplification) |
| `/solutions/life` | `life/` — LifeHero, LifeGap [01], LifeOffline [02], LifeStory [03], LifeChain [04], LifeBuilt [05], LifeProof [06], LifeClose [07] | Live counter card (Indian-locale count-up); 4-days-vs-2-min pathway panels; signal-bar offline states; stopwatch timeline (00:00→01:50); village→district→ministry fan SVG |
| `/solutions/knowledge` | `knowledge/` — KnowledgeHero, KnowledgeFracture [01], KnowledgeGrid [02], KnowledgeNation [03], KnowledgeMorning [04], KnowledgeProof [05], KnowledgeChain [06], KnowledgeClose [07] | Learner-grid card with adaptive path rows (§8a); fracture watermark figures; per-learner pace bars; teacher's-morning clock timeline; DIKSHA count-up panels |

### Sector pages (`/sectors/public-sector`)

Composed in `app/sectors/public-sector/page.tsx`; the nav's Solutions → Sectors "Public Sector" item links here (Healthcare/Education/Enterprise still hash placeholders). Copy from the user's content script (July 2026); all platform figures presented as public record per that script. Shares the solution-page family DNA (split hero + telemetry board, watermark gap figures, moment dossiers, six-step chain).

| Page | Sections (`components/sections/public-sector/`) | Signature pieces |
|---|---|---|
| `/sectors/public-sector` | PublicSectorHero, PublicSectorGap [01], PublicSectorProven [02], PublicSectorMoments [03], PublicSectorWhy [04], PublicSectorChain [05], PublicSectorDeploy [06], PublicSectorClose [07] | Public-record missions board hero card; two-tier proof (4 flagship count-up panels + "also in production" registry ledger); **tender-schedule ledger** (REQ-01…REQ-06 compliance rows with status chips); environment tiles with SOVEREIGN DEFAULT marker |

---

## 7. Design Rules

### Rule 1 — Shape Discipline
Every section must have its own organic shape. If you are about to reach for a generic `.card-attio` or 3-up card grid for a new section, **stop**. Cards are a last resort, not a default. Look at what the section data actually is — ledger rows, ratio counters, pull-quotes, step cards — and design the container to match the content.

### Rule 2 — The Checkmark Is Sacred
The checkmark character appears **only** in the FieldLedger telemetry badge. No other section or component emits checkmarks. Use other forms of affirmation (stat numbers, section labels, proof statements).

### Rule 3 — Newsreader Is Rare
`font-display` (Newsreader) is reserved for editorial pull-quotes only: the Voices section and FieldLedger's pull-quote line. Do not introduce it for headings, callouts, or marketing copy.

### Rule 4 — No Invented Data
All numbers in the UI (stats, chart values, percentages) must be real. The AI investment chart uses Stanford HAI AI Index Report 2026 figures. The scale stats (5.75B+ learning interactions, 4M+ workforce clearances, 99.999% uptime) are real deployment figures. Do not invent new numbers.

### Rule 5 — Dark Sections Are Deliberate, Not Default
The Footer (`bg-vault`) is the only permanently dark region. `ProvenAtScale` was originally the page's one dark section but has since moved to `bg-white` by deliberate design direction (see the comment at the top of `ProvenAtScale.tsx`). New sections default to `bg-white` or `bg-background`; `PowerfulPlatform`'s blue (`bg-[#3E63DD]`) is the one other non-neutral section background and should stay unique to that section.

### Rule 6 — Reduced Motion
All animations must respect `prefers-reduced-motion`. The global CSS handles this for `*` via `animation-duration: 0.01ms`. Component-specific overrides exist for `.fl-sparkline`, `.fl-row-enter`, `.fl-sheen`. Any new animation you add must degrade safely.

### Rule 7 — Images Require Real Files
`EverySector` references `/sectors/smart-cities-real.png` etc. via `next/image`. These must exist in `public/sectors/`. Never add `<Image>` or `<img>` tags pointing to paths that do not exist in `public/`.

### Rule 8 — Tailwind Over Inline Styles
Every section uses Tailwind utility classes as the styling method. `PowerfulPlatform.tsx` and its `demos/mockups/Platform*` children are a deliberate, contained exception: they render pixel-precise UI mockups (chart geometry, module-card diagrams) where inline `style={{}}` objects are clearer than long utility strings. Do not let this exception spread — new sections and components use Tailwind classes, not inline style objects, for anything that isn't computed geometry.

---

## 8. Component Notes

### §8a — `demos/mockups/`: Simulated Product UI
Everything in `components/demos/mockups/` renders **fake Akashic app screenshots**, not real product functionality: hardcoded numbers, hand-placed nodes, canned chat transcripts. They exist purely so the homepage can show "the product" without a real backend. This is a distinct category from the rest of `demos/` (`FieldLedger`, `VoicesDispatches`, `ProblemBlock`, `HeroConnections`), which render real, data-driven or purely decorative content.

Every file in this subfolder is named with a `Mockup` suffix and carries a top-of-file comment starting with `SIMULATED PRODUCT UI`. If you add a new fake-screenshot component, put it here, suffix it `Mockup`, and add the same comment — don't let simulated UI drift back into the flat `demos/` folder where it looks indistinguishable from real components.

Contents: `HeroProductsMockup.tsx` (Hero's 3-card carousel), `HeroProductScreensMockup.ts` (the three screen HTML strings, extracted so `/akashic` can reuse them), `AkashicModuleScreensMockup.tsx` (the `/akashic` 7-module screen carousel), `AkashicTeardownMockup.tsx` (the `/akashic` [02] 3D exploded-stack teardown scene), `AkashicTrustScreensMockup.ts` (the `/akashic` [05] four governance screens — roles, lineage, audit, residency — built on the hero screens' shared chrome), `StartAnywhereWalkthroughMockup.tsx` + `StartAnywherePanelsMockup.ts` (retired [02] record-journey walkthrough — no longer imported, kept for reference), `DeliveryCanvasMockup.tsx` (HowWeDeliver's phase console), `ProofComparisonMockup.tsx` (TheProof's drag slider), `EisBriefMockup.tsx` (the /solutions/eis hero's morning brief).

### `demos/mockups/HeroProductsMockup.tsx` (large file)
Three product card panels (Data Pipelines / Conversational AI / Data Models) rendered with `dangerouslySetInnerHTML` for the internal UI mocks. This is intentional — the card UIs are complex SVG+HTML mockups that are not React trees. State: `activeCard` (0|1|2), auto-cycles every 6000ms. `.hs-card` CSS class with `data-pos="center|left|right"` handles the fan layout. Tab progress bar uses `progressFill 6s linear` animation.

Do not refactor the `dangerouslySetInnerHTML` without a concrete reason. The tradeoff (bundle size vs. simplicity of static HTML mocks) is deliberate.

### `sections/PowerfulPlatform.tsx` (large file)
Renders the 4-row "Meet Akashic" flow diagram directly with inline styles (see Rule 8). Its interactive/stateful pieces are split out: `demos/mockups/PlatformBIChartMockup.tsx` owns the Business Intelligence card's own filter state, and `demos/mockups/PlatformConnectors.tsx` holds the shared connector SVGs (`HConn`, `VConn`, `DropConn`, `DagConn`) and the `ModIcon` badge so they aren't redefined on every render. The remaining module-card markup (Data Pipelines, Master Data, Data Warehouse, Machine Learning, Ask AI, Governance Foundation) stays inline in the section file — it is static, prop-free, and extracting it further would add files without reducing complexity. The whole diagram is simulated UI (see §8a), even though it lives outside `demos/mockups/` for the structural reasons above.

### `ui/ScrollReveal.tsx`
Wraps children in an `IntersectionObserver` that adds a fade-up class when the element enters the viewport. Accepts a `delay` prop in milliseconds. Use it for every non-interactive content block. Keep delay values at or below 400ms — staggered reveals should feel snappy, not theatrical.

### `ui/ScrollRevealRail.tsx`
Centred 1440px rail wrapper with animated left/right edge lines that fill as the section scrolls through the viewport. Takes a `dark` prop for use on dark backgrounds (currently only the Footer).

### `hooks/useCountUp.ts`
Three related exports (see §1) covering the two distinct count-up needs in the codebase: a scroll-triggered single-string-figure animation (`useCountUp`, used by `ProblemBlock`) and a re-triggerable numeric animation for content already inside a parent `ScrollReveal` (`useCountUpValue`, used by `FieldLedger`). Do not reintroduce a third local copy of this logic — extend one of these two.

---

## 9. What Not to Do

- Do not add `console.log` to production components.
- Do not install new npm packages without checking if the functionality exists in React or Tailwind already.
- Do not use `any` TypeScript casts. Type everything.
- Do not write multi-line comment blocks explaining what code does.
- Do not change section order without updating `app/page.tsx` and this file.
- Do not add new top-level files to `components/`. Use subdirectories.
- Do not add a component-local `<style dangerouslySetInnerHTML>` block for keyframes — put them in `globals.css` (see §5).
- Do not reference `design.md` — it has been retired. This file supersedes it.
