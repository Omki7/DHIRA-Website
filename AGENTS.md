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
      DeliveryDiscoveryMockup.tsx Fake 30-min discovery console (problem → triage fan →
                                 matched model) for the Delivery page hero
      EisBoardMockup.tsx         Fake executive command centre (KPI tiles, traced alert,
                                 Ask-Akashic line) for the /solutions/eis hero

  icons/               Static SVG components, no logic
    AkashicLogo.tsx
    DhiraLogo.tsx
    DynamicSketchIcon.tsx    Text-keyed icon lookup; falls back to a default glyph for unknown keys

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
| `.hs-card` | Absolute-positioned 840x592px card for HeroProducts carousel. Use `data-pos="center\|left\|right"` |
| `.ps-mc` / `.ps-mc-hd` / `.ps-mc-dark` | Platform module card shell / header strip / dark variant, used by `PowerfulPlatform` and `PlatformBIChart` |

### Keyframe animation classes (apply via className)

| Class | Animation | Origin |
|---|---|---|
| `.fl-sparkline` | SVG sparkline draw-in (fl-spark) | FieldLedger |
| `.fl-row-enter` | Row fade-up on enter (fl-row) | FieldLedger |
| `.fl-sheen` | Shimmer sweep via ::after (fl-sweep) | FieldLedger |
| `.mc-stage-in` | Panel fade-up (mc-stage) | ProofComparison |
| `.sector-text-in` | Right-panel text entrance (sectorTextIn) | EverySector |

**Inline @keyframes used directly** (not class-based, applied via inline `animation` style): `softpulse`, `dashmove`, `progressFill`, `ps-*` (PowerfulPlatform / PlatformConnectors — `ps-pulse`, `ps-crawl`, `ps-zip`, `ps-ring`, `ps-dash`, `ps-flow`, `ps-float`, `ps-breathe`, `ps-grow`, `ps-draw`, `ps-linep`, `ps-bar`, `ps-sheen`, `ps-fillA`, `ps-fillO`, `ps-rise`, `ps-risec`, `ps-caret-blink`), `vconn-flow`, `dropconn-flow` (PlatformConnectors), `proofCorePulse`, `proofKnobGlow`, `proofHint`.

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
| 01 | how-it-works | `sections/akashic/AkashicFourMoves.tsx` | `bg-white` | Two-world question toggle (auto-cycles, pauses on click) + four-move rail with simulated-UI micro-visuals per move (§8a applies) |
| 02 | modules | `sections/akashic/AkashicModules.tsx` | `bg-white` | Living stack diagram: source chips fan into three layer frames via animated blue flow connectors; module cards carry simulated-UI micro-mockups (§8a applies, figures consistent with PowerfulPlatform's); governance is a left rail + dark base card (deliberate dark card, per Rule 5's Closure precedent). Styled with Tailwind classes per Rule 8, reusing global `ps-*`/`fl-*` keyframes |
| 03 | architecture | `sections/akashic/AkashicArchitecture.tsx` | `bg-white` | Deploy-it-your-way: three environment plates deliberately distinct from [02]'s module-card chrome — sky-gradient cloud plate with branded provider tiles, dark server-cabinet plate for on-prem, split rack/cloud estate for hybrid — all holding the same MiniStack, converging into the consistency close panel. Cloud region names are real provider regions |
| 04 | modular | `sections/akashic/AkashicModular.tsx` | `bg-white` | Start-anywhere tabs: 7-module explorer whose detail panel highlights the module's layer on the MiniStack |
| 05 | trust | `sections/akashic/AkashicTrust.tsx` | `bg-white` | Built-to-be-audited 2×2: access roles, lineage trace, audit log, residency perimeter micro-mockups |
| 06 | open | `sections/akashic/AkashicOpenFoundations.tsx` | `bg-white` | `akashic.stack` manifest card listing open technologies. ⚠ tech list flagged "representative" in the content script — confirm with engineering |
| 07 | solutions | `sections/akashic/AkashicSolutions.tsx` | `bg-white` | EIS / Life / Knowledge cards (anchor ids match the nav's Solutions links) on a shared "same governed model" base bar |
| 08 | scale | `sections/akashic/AkashicScale.tsx` | `bg-white` | Two live-deployment stat panels (figures per Rule 4 + content script; script marks section status OPEN) |
| 09 | talk-to-our-team | `sections/akashic/AkashicClose.tsx` | `bg-white` | Dark closure card (Rule 5's Closure precedent). ⚠ six-week commitment flagged "confirm" in the content script. Carries the `#talk-to-our-team` id the nav CTA targets |

Shared pieces for this page: the blue-on-white animated connectors (`FlowPath`/`FanIn`/`MergeDown`/`SplitDown`/`MobileConn`) live in `demos/AkashicFlowConnectors.tsx` (decorative, no data — the white-background cousin of `demos/mockups/PlatformConnectors.tsx`), and the simulated-UI card chrome + MiniStack motif live in `sections/akashic/AkashicCardChrome.tsx`.

### Delivery page (`/delivery`)

Composed in `app/delivery/page.tsx` (Nav + sections + Footer). The nav's "Delivery" trigger links here; its dropdown items anchor to service ids on this page (`#ai-readiness-audit`, `#sovereign-blueprint`, `#governance-framework`, `#platform-deployment`, `#legacy-modernization`, `#custom-accelerators` — all inside section [02]). The home page's `HowWeDeliver` service chips link to the same anchors.

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| 00 | — | `sections/delivery/DeliveryHero.tsx` | `bg-background` | Centred hero, dot-grid backdrop, closed by `demos/mockups/DeliveryDiscoveryMockup` (§8a applies) |
| 01 | engagement-models | `sections/delivery/DeliveryModels.tsx` | `bg-white` | Triage rail: three reality quotes route via animated connectors into their engagement model; CSS-only hover dimming (server component) |
| 02 | akashic-deployment | `sections/delivery/DeliveryAkashicDeployment.tsx` | `bg-white` | Model 1: six-week rollout as a Gantt strip (deliberately not the home page's vertical timeline), three phase dossiers carrying the nav anchor ids, modular-start panel reusing `MiniStack` |
| 03 | product-engineering | `sections/delivery/DeliveryProductEngineering.tsx` | `bg-white` | Model 2: two build-track spec sheets on a shared 0–20-week MVP gauge (Akashic-native 12–20 wks / standalone 10–16 wks); gauge geometry is computed inline style (Rule 8 exception) |
| 04 | advisory-co-engineering | `sections/delivery/DeliveryAdvisory.tsx` | `bg-white` | Model 3: advisory dossier with deliverables ledger + squad org-diagram (1 principal architect fans into 4 engineers via animated SVG) |
| 05 | methodology | `sections/delivery/DeliveryMethodology.tsx` | `bg-white` | Discover/Design/Deliver/Transfer on one unbroken dot rail (horizontal desktop, vertical mobile) — the "no hand-offs" visual |
| 06 | proven-at-scale | `sections/delivery/DeliveryProven.tsx` | `bg-white` | Live engagement ledger (client): count-up figures, sparklines, LIVE/COMPLETE chips; figures per Rule 4 (match AkashicScale / home stats) |
| 07 | partnership-fit | `sections/delivery/DeliveryFit.tsx` | `bg-white` | Right-fit / wrong-fit split panel; filled vs hollow square markers (no checkmarks, Rule 2) |
| 08 | faq | `sections/delivery/DeliveryFAQ.tsx` | `bg-white` | Client accordion, mono Q indices, grid-rows collapse animation |
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
| 01 | the-work | `sections/careers/CareersImpact.tsx` | "Production is a country": four-mission impact band, count-ups per Rule 4 |
| 02 | how-we-work | `sections/careers/CareersPrinciples.tsx` | Sticky-left digest of the About beliefs (B-01…B-05), links to `/about#what-we-believe` |
| 03 | open-roles | `sections/careers/CareersRoles.tsx` | Canonical filterable roles board (client) — same ROLES + blue-bar hover signature as JoinTheTeam; keep the two lists in sync |
| 04 | how-we-hire | `sections/careers/CareersHiring.tsx` | Four-step hiring rail (intro call / deep-dive / working session / decision) |
| 05 | talk-to-our-team | `sections/careers/CareersClose.tsx` | Dark closure card; Apply anchor target |

### Solution pages (`/solutions/eis`, `/solutions/life`, `/solutions/knowledge`)

Composed in `app/solutions/{eis,life,knowledge}/page.tsx` (Nav + sections + Footer). The nav's Solutions → Akashic Plugin items link here, as do the "Learn more" links on `/akashic`'s AkashicSolutions cards. Copy comes from user-supplied content scripts (July 2026); figures on these pages (564 crore sessions, 18.25 crore enrolments, 1.89 crore learners, 2B vaccinations, 3.87 lakh emigrations, 10 crore+ Poshan, 12,402/month, ₹2 Cr+ estimate) are per those scripts — ⚠ some differ from the home/Akashic stats (5.75B+/187M+); reconcile before ship. All three share the split hero (pitch left, telemetry/mockup card right), the flowing six-step chain rail, and count-up proof panels, so the family reads as siblings.

| Page | Sections (`components/sections/…`) | Signature pieces |
|---|---|---|
| `/solutions/eis` | `eis/` — EisHero, EisCost [01], EisMoments [02], EisChain [03], EisCapabilities [04], EisIntegration [05], EisProof [06], EisClose [07] | `demos/mockups/EisBoardMockup` command centre (§8a); cost-of-delay watermark figures; three peer-moment dossiers with "WHAT AKASHIC DID" strips; connect→ask chain; connector rack |
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

Every file in this subfolder is named with a `Mockup` suffix (except `PlatformConnectors.tsx`, a shared SVG helper consumed only by other mockups) and carries a top-of-file comment starting with `SIMULATED PRODUCT UI`. If you add a new fake-screenshot component, put it here, suffix it `Mockup`, and add the same comment — don't let simulated UI drift back into the flat `demos/` folder where it looks indistinguishable from real components.

Contents: `HeroProductsMockup.tsx` (Hero's 3-card carousel), `PlatformBIChartMockup.tsx` (BI module card in PowerfulPlatform), `PlatformConnectors.tsx` (shared connector SVGs + `ModIcon` badge), `DeliveryCanvasMockup.tsx` (HowWeDeliver's phase console), `ProofComparisonMockup.tsx` (TheProof's drag slider), `DeliveryDiscoveryMockup.tsx` (the Delivery hero's discovery console).

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
