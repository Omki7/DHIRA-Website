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
    MeetAkashic.tsx       [—] Meet Akashic — the platform section in the dark Attio-derived
                            aesthetic (bg-uc-bg, font-inter; user direction 18–19 Jul).
                            Composer only; parts keep legacy UC* names in
                            sections/universal-context/. Carries no [NN] eyebrow by design
                            (later sections number [02]–[09]) and carries the #platform id
                            that the Hero / TheProof / Closure CTAs target
    ProvenAtScale.tsx    [02] Proven At Scale — one-deployment-at-a-time proof carousel
                            on white, headline paired with the AshokaChakra ornament
                            (user direction 20 Jul; the deep-navy band it briefly
                            carried was dropped so the page keeps one ground)
    HowWeDeliver.tsx     [03] How We Deliver — three-engagement-model journey selector
    EverySector.tsx      [04] Every Sector — desktop image-strip accordion / mobile accordion.
                            Six sectors: Manufacturing / Healthcare / Finance / Retail /
                            Education / Energy. "Smart Cities" was removed 20 Jul and
                            Manufacturing took slot 01; the old #public-sector and
                            #smart-cities hash targets went with it (the /sectors/public-sector
                            page is unaffected). Auto-advances every 6s like [02], pausing on
                            hover/focus and resting under reduced motion
    TheProof.tsx          [05] The Proof — ProofComparisonMockup drag slider
    Voices.tsx            [06] Voices — editorial pull-quote rail (Newsreader display font)
    EnterpriseSecurity.tsx [07] Governance — stat grid + animated trust-coverage curve
    JoinTheTeam.tsx       [08] Careers — filterable open-roles list
    Closure.tsx           [09] Get Started — high-contrast dark card closure, mock CLI

    universal-context/   Parts of the Meet Akashic section (rendered by MeetAkashic.tsx;
                         legacy UC* names from the section's Attio-replica origin):
      UCHero.tsx             client — scroll-scrub headline entrance ("Meet Akashic") + orb
                             stack (planet body, 2247px halo ring, conic chromatic aura)
                             over pinstripe texture
      UCFeatureGrid.tsx      server — five-cell platform-capability ledger, ScrollReveal stagger
      ucIcons.ts             the five feature-grid icon path data (from Attio's markup)
      UCSignals.tsx          client — "The platform" split: auto-rotating flow tabs (Ingest &
                             unify / Store & predict / Explore & ask; 8s per tab: ~3s dwell +
                             5s progress fill) left, GlyphMorphCanvas right; mobile stacked
                             variant with segmented progress bars
      UCConnectivity.tsx     server — "Connectivity" centred block + 11 source-system logo
                             tiles (Salesforce/SAP/NetSuite/Oracle/Postgres/…, files in
                             public/universal-context/; `invert` flag renders dark wordmarks
                             white), edge-masked row
      UCSdk.tsx              client — "BI. AI. ML. Agents." block: 24×8 dashed drafting grid,
                             text plate, blueprint trace of the Akashic mark (hatched bars +
                             node circles + ghost accent dots) with draw-in
      UCButton.tsx           shared dark outline button (Explore Akashic / See the pipelines /
                             Explore the modules)

  demos/               Interactive/animated sub-components used inside sections
    HeroConnections.tsx      Animated connection graph shown behind Hero (decorative, real component)
    DivergentAnswers.tsx     One question answered three irreconcilable ways (ProblemSection).
                             The question types itself in on scroll with a blinking caret
                             (ps-caret-blink; full text immediately under reduced motion).
                             Each answer carries a lineage rail in the /akashic governance
                             idiom (source chips joined by a hairline arrow) showing which
                             ground it was traced from; colour encodes the source world
                             (blue warehouse / rose documents / green stream), not decoration.
                             UNIT-NEUTRAL BY DIRECTION (20 Jul): the scenario counts people
                             served, never money — a ₹/crore revenue question read as
                             India-only to a global audience and collided with the $ figures
                             in the industry-record block below. Do not reintroduce a currency
    FieldLedger.tsx          Live deployment panels with count-up metrics. NOT RENDERED
                             anywhere since the 20 Jul ProvenAtScale rebuild; kept on disk
                             pending a decision to delete or redeploy it
    ProvenStories.tsx        ProvenAtScale's one-at-a-time deployment carousel: cross-fading
                             split cards (story left, photography right), desktop edge arrows,
                             progress-dot rail, 7s autoplay pausing on hover/focus. Real
                             deployment figures per Rule 4; photos in public/proof/ are
                             illustrative of the sector, not screenshots of the systems.
                             CLIENT NAMING: these are government systems DHIRA cannot
                             claim publicly by name — neither the platform nor the
                             commissioning ministry is identified, each story carried by
                             its sector plus public-record figures. Do not reintroduce
                             names here (user direction 20 Jul)
    VoicesDispatches.tsx     Asymmetric editorial dispatch cards (Voices)
    AshokaChakra.tsx         Decorative 24-spoke wheel in brand blues, slow rotation (CareersImpact, ProvenAtScale)
    LineArtBust.tsx          Friendly line-art head+shoulders figure for SVG scenes (CareersHiring, AboutBeliefs)
    GlyphMorphCanvas.tsx     rAF dot-particle canvas for the Meet Akashic "The platform"
                             block: ~320–780 soft white dots (area-scaled) that scatter into
                             an ambient field and re-form into one glyph per flow tab —
                             confluence streams→ring (Ingest & unify), forecast sparkline +
                             dotted future + spark (Store & predict), speech bubble +
                             sparkle (Explore & ask). Antigravity-style: cubic-bezier
                             ease-settle tweens with per-dot stagger, breathing drift,
                             gentle cursor repulsion. SYNCED to the UCSignals tab rotation
                             via the `active` prop (user direction 20 Jul 2026 — supersedes
                             the old unsynced wireframe SignalsCanvas). Decorative, no data

    mockups/             SIMULATED PRODUCT UI — fake app screenshots for visual storytelling,
                          not real Akashic functionality. See §8a before touching any file here.
      HeroProductsMockup.tsx     3-card rotating product showcase (Hero). Large file: renders its
                                 three panel mockups via `dangerouslySetInnerHTML` — intentional,
                                 see §8a.
      ProofComparisonMockup.tsx  Drag-to-compare before/after slider mockup (TheProof)
      EisBriefMockup.tsx         Fake EIS morning brief (AI-written CEO pulse, Business
                                 Pulse tiles, grounded footer) for the /solutions/eis hero;
                                 demo data mirrors the EIS product prototype

  icons/               Static SVG components, no logic
    AkashicLogo.tsx
    DhiraLogo.tsx
    DynamicSketchIcon.tsx    Text-keyed icon lookup; falls back to a default glyph for unknown keys

  ui/                  Generic utility components
    ScrollReveal.tsx     Intersection Observer fade-in wrapper (accepts a `delay` prop in ms)
    ScrollRevealRail.tsx Centred 1440px rail with animated scroll-tracking edge lines
                         (`dark` prop for use on dark sections)
    StatBand.tsx         Site-wide stat-tile recipe (see §5a): bordered light frame, blue
                         gradient top bar, dashed dividers, pulsing-dot eyebrow, count-up
                         figure, dashed footer caption. `frame={false}` for nesting inside a
                         card that already owns its own outer chrome.

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
| `red` | `#E5484D` | Problem section only: indicator bar/watermark, and the two AI industry figures ($581B / 46%) that carry the section's alarm. Not a general error colour |
| `vault` | `#0a0a0c` | Footer background only |
| `lineSoft` | `#e4e7ec` | Section borders, dividers |
| `line` | `#d3d8df` | Stronger dividers |
| `subtle-stroke` | `#EEEFF1` | Card borders |
| `default-stroke` | `#D9DADB` | Nav divider stroke |
| `uc-bg` | `#0A0E24` | MeetAkashic section background (dark Attio-derived palette — scoped to that section only, never on brand light surfaces). Same value as `depth`: **re-tinted from neutral `#101010` on 21 Jul (user direction)** — near-black was the one dark region outside the brand's indigo family. Hue moved, luminance did not (both ≈0.0052 relative luminance), so no text contrast ratio in the section changed |
| `uc-surface` | `#141A38` | UC tile/card surfaces (= `depth-raised`; was `#1c1d1f`) |
| `uc-stroke` | `#1E2547` | UC hairlines, dividers (was `#232529`) |
| `uc-line` | `#2A3157` | UC stronger borders, progress-bar track (was `#2e3238`) |
| `uc-vertex` | `#545E82` | UC drafting-grid vertices (SDK artwork; was `#505967`) |
| `uc-dim` | `#6f7988` | UC secondary body text (unchanged — already a cool gray, reads correctly on the navy ground) |
| `uc-mute` | `#8f99a8` | UC muted text, progress-bar fill (unchanged, as above) |
| `uc-text` | `#fafafb` | UC primary text on dark |
| `uc-pill` | `#1B2550` | UC eyebrow pill background (was `#1a2233`) |
| `uc-pilltext` | `#c8dcff` | UC eyebrow pill text |

Keep this table in sync with `tailwind.config.ts` — if you add a token, add a row; if you remove usage of a token, remove it from the config in the same change.

### Typography

- **`font-sans`** (Google Sans Text): body text, most UI copy.
- **`font-heading`** (Google Sans): headings that opt in explicitly via `font-heading` (most headings otherwise inherit `font-sans` via the `h1`–`h6` rule in `globals.css`).
- **`font-mono`** (Google Sans Mono): eyebrow labels, monospace figures, dossier-style UI chrome.
- **`font-display`** (Newsreader): **Editorial pull-quotes only.** Currently the Voices section only (`FieldLedger` also carries a pull-quote line but is no longer rendered). Do not introduce it elsewhere.
- **`font-inter`** (Inter, optical-size axis 14–32 via Google Fonts): **MeetAkashic section only** — it is the typeface of that section's Attio-derived aesthetic, loaded in `app/layout.tsx` solely so the section reads true to the original design. Do not use it anywhere else on the site.

| Scale | Size | Weight | Tracking | Usage |
|---|---|---|---|---|
| Hero headline | 56–64px | 600 | `tracking-tighter` (`-0.04em`) | Hero H1 |
| Section headline | 48–64px | 600 | `tracking-tighter` | Section H2 |
| Subsection | 28–32px | 600 | tight | Feature headings |
| Body | 16–18px | 400 | default | Prose paragraphs |
| Small body | 14px | 400–500 | default | Card copy |
| Eyebrow | 11–13px | 500 | `tracking-eyebrow` (0.14em) | Section labels, always UPPERCASE font-mono |

**Eyebrow pattern:** `[NN]  SECTION NAME` in `font-mono text-[11px] uppercase tracking-eyebrow`. Numbers in `text-overcast`, rest in `text-inkSoft`.

**Homepage eyebrow rails are left-only.** The right-hand `/ DESCRIPTOR` span (`/ SIX SECTORS`, `/ BEFORE & AFTER`, …) was removed from every homepage section in Jul 2026 — do not reintroduce it there, and use `flex items-center` rather than `flex items-center justify-between` since the rail now has a single child. The one intentional exception is `JoinTheTeam.tsx`, whose right slot holds the live "NOW HIRING" pulse indicator rather than a text descriptor.

Sub-page sections (`about/`, `akashic/`, `careers/`, `delivery/`, `eis/`, `knowledge/`, `life/`, `public-sector/`) still carry the right-hand descriptor in the borderless variant (`flex items-baseline justify-between`, label `hidden … sm:inline`). Those have **not** been migrated yet.

### Spacing & Shape

- **8px grid.** Section vertical padding: `py-12 lg:py-16` for most sections' top or `pt-12 pb-24 lg:pt-16 lg:pb-32` as the common section wrapper pattern.
- `rounded-btn` = 6px (buttons), `rounded-card` = 8px (cards), `rounded-frame` = 10px (large panels).
- `shadow-frame`: large panel elevation. `shadow-card`: subtle card lift.

### Timing

- `duration-settle` + `ease-settle` (`cubic-bezier(0.2,0.8,0.2,1)`): all interactive transitions.
- `duration-smooth` + `ease-smooth` (`cubic-bezier(0.4,0,0.2,1)`): continuous motion (animations).
- Typical range: 200–400ms for UI, 600–800ms for layout morphing.

---

## 4a. Stat Bands — Site-Wide Consistency Rule

Any "band of figures" (platform/deployment stats, count-ups) uses ONE recipe, site-wide, per user direction (17 Jul): use `components/ui/StatBand.tsx` for a standalone band, or match its chrome by hand when the stats live inside a card that owns its own outer frame:

- Outer: `overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg`
- Top accent: `h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent`
- Cell dividers: **dashed**, never solid or a gap-as-divider (`border-dashed border-lineSoft`)
- Eyebrow: small pulsing blue dot (`h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]`) + mono uppercase label, above the figure
- Figure: `font-semibold leading-none tracking-tighter text-ink`, count-up via `useCountUp`
- Footer caption (if any): `border-t border-dashed border-lineSoft` mono uppercase

Applied to: `FieldLedger` (metrics bar dividers switched solid→dashed), `DeliveryProven` / `EisProof` / `LifeProof` / `KnowledgeProof` (dot-eyebrow + dashed footer divider added to each "3 deployment cards" section — their sparklines, LIVE/COMPLETE chips, and ghost watermarks are deliberately kept; only the chrome was unified).

**Deliberate exceptions (do not force into this recipe):** `EnterpriseSecurity`'s 2×2 governance stat grid is a "no card boxes, gap-as-divider" layout embedded beside an SVG chart, by original design intent. `PublicSectorProven`'s dark record board is a row-based ledger (mission/ministry/figure/sparkline per row), not a tile grid — a Rule 5 dark-card precedent, structurally different from a stat band by content shape (Rule 1).

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

### Keyframe animation classes (apply via className)

| Class | Animation | Origin |
|---|---|---|
| `.fl-sparkline` | SVG sparkline draw-in (fl-spark) | FieldLedger |
| `.fl-row-enter` | Row fade-up on enter (fl-row) | FieldLedger |
| `.fl-sheen` | Shimmer sweep via ::after (fl-sweep) | FieldLedger |
| `.mc-stage-in` | Panel fade-up (mc-stage) | ProofComparison |
| `.sector-text-in` | Right-panel text entrance (sectorTextIn) | EverySector |

**Inline @keyframes used directly** (not class-based, applied via inline `animation` style): `softpulse`, `dashmove`, `progressFill`, `ps-*` (shared keyframe family from the retired PowerfulPlatform section, now used by the /akashic sections, solution pages, and mockups — `ps-pulse`, `ps-crawl`, `ps-zip`, `ps-ring`, `ps-dash`, `ps-flow`, `ps-float`, `ps-breathe`, `ps-grow`, `ps-draw`, `ps-linep`, `ps-bar`, `ps-sheen`, `ps-fillA`, `ps-fillO`, `ps-rise`, `ps-risec`, `ps-caret-blink`), `vconn-flow` (FieldLedger), `proofCorePulse`, `proofKnobGlow`, `proofHint`.

All keyframes live in `globals.css`. Do not add a component-local `<style dangerouslySetInnerHTML>` block for animations — it risks silently redefining a keyframe that already exists globally (this happened once with `ps-pulse`/`ps-rise` in the since-retired `PowerfulPlatform.tsx` and was consolidated).

---

## 6. Section Map

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| — | nav | `layout/Nav.tsx` | `bg-white/95 backdrop-blur-md` | Hides on scroll down (30px accumulated delta), shows on up (15px) or near top |
| 00 | hero | `sections/Hero.tsx` | `bg-background` / `bg-blue` (sticky quote layer) | Uses `demos/mockups/HeroProductsMockup` + `demos/HeroConnections` |
| 01 | problem | `sections/ProblemSection.tsx` | `bg-white` | Two-line headline (one sentence per `block` span), typed question + three lineage-traced answers via `demos/DivergentAnswers`, then "It isn't just you" — the industry record. Those two figures are deliberately the largest type in the section (58–80px, outranking the three answers at 30–36px): the answers are the anecdote, the figures are the verdict. Closes on the real gap — infrastructure got funded, the data underneath was never made AI-ready — which sets up Meet Akashic. Stanford HAI 2026 + S&P Global data |
| — | platform | `sections/MeetAkashic.tsx` + `sections/universal-context/` | `bg-uc-bg` (#0A0E24, deep indigo — same ground as the Akashic page's `.ak-depth` slabs; was neutral #101010 until 21 Jul) | Meet Akashic — the platform section in the dark Attio-derived aesthetic (user direction 18–19 Jul): pinstripe + orb hero ("Stop guessing. Get grounded." / "Meet Akashic"), five-cell capability grid, "The platform" flow tabs + GlyphMorphCanvas dot glyphs (synced to the tabs, 20 Jul), Connectivity source-system logo tiles, "BI. AI. ML. Agents." blueprint panel tracing the Akashic mark. Carries the `#platform` id targeted by Hero/TheProof/Closure CTAs; its own CTAs link to `/akashic` anchors. No [NN] eyebrow by design. Second dark region per Rule 5 |
| 02 | scale | `sections/ProvenAtScale.tsx` | deep-navy gradient (`#02183E` → `#103169`) | Rebuilt 20 Jul (user direction) as a replica of Keboola's "Real Customers. Real Results." stage: centred dot-flanked eyebrow + white headline over `demos/ProvenStories`, a one-deployment-at-a-time cross-fade carousel (white `rounded-2xl` split card, story left, photography right). Masked 36px drafting grid + two corner glows. Third deliberate dark region — see §7, Rule 5 |
| 03 | delivery | `sections/HowWeDeliver.tsx` | soft blue band | Three-engagement-model journey selector (Deployment / Product Engineering / Advisory): left situation rows route to a From→To journey per model, tied by a solid `AkashicFlowConnectors` line; detail panel tracks the selected row's level. Links to `/delivery` model anchors. No console mockup. The page's one blue band (Rule 5a, user direction 18 Jul) |
| 04 | sectors | `sections/EverySector.tsx` | `bg-white` | Image-strip accordion desktop / accordion mobile |
| 05 | proof | `sections/TheProof.tsx` | `bg-white` (after side) / `#F1F5FE` (before side) | `demos/mockups/ProofComparisonMockup` drag slider. **Reworked 21 Jul (user direction):** the "before" half is now the Rule 5a soft blue `#F1F5FE` (was the stock slate `#f1f5f9`, which was in no palette); the seam is brand blue with a white halo (it was a *white* line — invisible against the white "after" ground); and a **Before Akashic / After Akashic toggle** sits under the subhead, because the drag gesture is learned and reads as decoration to anyone who does not know the pattern. Toggle and drag share one `pos` (96 = all before, 4 = all after); `glide` swaps the wipe between a 1:1 pointer follow and the 650ms `ease-settle` step. The knob's "See the change" pill is onboarding — it fades once either control is used, and must, since at the travel ends the container clips it. This section does **not** consume the page's Rule 5a blue slot (`HowWeDeliver` [03] still holds it) — the tint is one half of a comparison, not a full band |
| 06 | voices | `sections/Voices.tsx` | `bg-background` | Editorial rail with `font-display` (Newsreader) |
| 07 | governance | `sections/EnterpriseSecurity.tsx` | `bg-white` | Stat grid + animated trust-coverage curve, compliance strip |
| 08 | careers | `sections/JoinTheTeam.tsx` | `bg-[#FAFAF9]` | Filterable open-roles list |
| 09 | closure | `sections/Closure.tsx` | `bg-white` | High-contrast dark closure card, mock CLI |
| — | footer | `layout/Footer.tsx` | `bg-vault` | Dark footer, link columns |

### Akashic product page (`/akashic`)

Composed in `app/akashic/page.tsx` (Nav + sections + Footer). The nav's "Akashic" trigger links here; its dropdown items anchor to module ids on this page (`#data-pipelines`, `#master-data`, `#data-warehousing`, `#machine-learning`, `#ask-ai`, `#business-intelligence`, `#governance`).

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| 00 | — | `sections/akashic/AkashicHero.tsx` | `bg-background` | Centred hero, dot-grid backdrop, scroll cue into [01] |
| 01 | how-it-works | `sections/akashic/AkashicFourMoves.tsx` | `bg-white` | Two-world question toggle (auto-cycles, pauses on click) + four-move rail with simulated-UI micro-visuals per move (§8a applies) |
| 02 | modules | `sections/akashic/AkashicModules.tsx` | `bg-white` | Living stack diagram: source chips fan into three layer frames via animated blue flow connectors; module cards carry simulated-UI micro-mockups (§8a applies); governance is a left rail + dark base card (deliberate dark card, per Rule 5's Closure precedent). Styled with Tailwind classes per Rule 8, reusing global `ps-*`/`fl-*` keyframes |
| 03 | architecture | `sections/akashic/AkashicArchitecture.tsx` | `bg-white` | Deploy-it-your-way: three environment plates deliberately distinct from [02]'s module-card chrome — sky-gradient cloud plate with branded provider tiles, dark server-cabinet plate for on-prem, split rack/cloud estate for hybrid — all holding the same MiniStack, converging into the consistency close panel. Cloud region names are real provider regions |
| 04 | modular | `sections/akashic/AkashicModular.tsx` | `bg-white` | Start-anywhere tabs: 7-module explorer whose detail panel highlights the module's layer on the MiniStack |
| 05 | trust | `sections/akashic/AkashicTrust.tsx` | soft blue band | Built-to-be-audited 2×2: access roles, lineage trace, audit log, residency perimeter micro-mockups. The page's one blue band (Rule 5a) |
| 06 | open | `sections/akashic/AkashicOpenFoundations.tsx` | `bg-white` | `akashic.stack` manifest card listing open technologies. ⚠ tech list flagged "representative" in the content script — confirm with engineering |
| 07 | build-vs-buy | `sections/akashic/AkashicBuildVsBuy.tsx` | `bg-white` | The opportunity-cost argument, not a capability fight. |
| 08 | scale | `sections/ProvenAtScale.tsx` | `bg-white` | Reuses homepage carousel design parameterized with id="scale", sectionNumber="08", eyebrowText="Proven at scale" |
| 09 | stack | `sections/akashic/AkashicStack.tsx` | `bg-primary-bg` | Capabilities & connectors: pick a module to see its source/system connectors and capabilities database. |
| 10 | solutions | `sections/akashic/AkashicPlatform.tsx` | `bg-uc-bg` (#0A0E24) | Reuses the dark Attio-replica vertical-tabs mockup solutions explorer. |
| 11 | talk-to-our-team | `sections/akashic/AkashicClose.tsx` | `bg-white` | Dark closure card (Rule 5's Closure precedent). ⚠ six-week commitment flagged "confirm" in the content script. Carries the `#talk-to-our-team` id the nav CTA targets |

Shared pieces for this page: the blue-on-white animated connectors (`FlowPath`/`FanIn`/`MergeDown`/`SplitDown`/`MobileConn`) live in `demos/AkashicFlowConnectors.tsx` (decorative, no data), and the simulated-UI card chrome + MiniStack motif live in `sections/akashic/AkashicCardChrome.tsx`.

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
| 07 | partnership-fit | `sections/delivery/DeliveryFit.tsx` | soft blue band | Editorial verdict split: two indexed statement ledgers on one dashed axis, each closing on its verdict line; directional arrows only (no checkmarks, Rule 2). The page's one blue band (Rule 5a) |
| 08 | faq | `sections/delivery/DeliveryFAQ.tsx` | `bg-white` | Master-detail Q&A on desktop (question ledger left, active answer staged at 22px right under ghost "?" watermark), dossier accordion below lg; shared open state, discovery-call close line |
| 09 | talk-to-our-team | `sections/delivery/DeliveryClose.tsx` | `bg-white` | Dark closure card (Rule 5's Closure precedent). Carries the `#talk-to-our-team` id the nav CTA targets |

### About page (`/about`)

Composed in `app/about/page.tsx` (Nav + sections + Footer). The nav's Company menu links here: "About Us" → `/about`, "Careers" → `/about#careers`. The careers section is a teaser for the home page's full JoinTheTeam board (same four roles) and links back to `/#careers` rather than duplicating the filterable list.

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| 00 | — | `sections/about/AboutHero.tsx` | `bg-background` | Centred hero, dot-grid backdrop, "outlast the budget cycle" bars motif, offices mono strip |
| 01 | why-we-exist | `sections/about/AboutWhy.tsx` | `bg-white` | Narrative + micro-mockup panel (§8a applies: three conflicting spreadsheets, untraceable AI answer), trust-problem pivot line. Restored to this boxed version by user preference (17 Jul) after a line-art variant read as unclear |
| 02 | who-we-are | `sections/about/AboutWho.tsx` | `bg-white` | Contexts ledger (ministries / regulated enterprises / startups): sticky narrative left, three proof rows with giant scale watermarks + sketch-icon tiles, advise-and-leave vs build-and-stay contrast strip. Restored to this enterprise version by user direction (17 Jul) |
| 03 | what-we-believe | `sections/about/AboutBeliefs.tsx` | soft blue band | Principles as architecture (line-art idiom, the page's one creative centrepiece by user direction): a skyline of everything shipped (dome / tower / growth curve / `LineArtBust` crew) stands on an ink beam held up by five carved pillars, one per principle (B-01…B-05, titles+bodies beneath); hovering a pillar column turns its pillar blue and dims the rest (CSS only, server component). Mobile stacks pillar-beside-text rows under the same skyline |
| 04 | how-we-work | `sections/about/AboutHow.tsx` | `bg-white` | Four commitments on one engagement rail (methodology idiom): dashed line from day one to the last day, four numbered nodes (last one ringed), day-tags + statements + bodies per column, CSS hover dimming; vertical rail on mobile. No illustration by design |
| 05 | careers | `sections/about/AboutCareers.tsx` | `bg-white` | Careers teaser: NOW HIRING pulse signature, four compact role rows (match JoinTheTeam's ROLES), links to `/#careers` |
| 06 | proof | `sections/ProvenAtScale.tsx` | `bg-white` | Reuses homepage carousel design parameterized with id="proof", sectionNumber="06", eyebrowText="Proof" |
| 07 | talk-to-our-team | `sections/about/AboutClose.tsx` | `bg-white` | Dark closure card (Rule 5's Closure precedent). Carries the `#talk-to-our-team` id the nav CTA targets |

### Careers page (`/careers`)

Composed in `app/careers/page.tsx`. The nav's Company → Careers, the home JoinTheTeam board's Apply/"Explore all open roles" links, and the About page's careers teaser all point here. Copy is assembled from approved brand material only (home JoinTheTeam headline + sub, the four ROLES, About beliefs, public-record mission figures); Apply links anchor to `#talk-to-our-team` — ⚠ wire a real careers inbox/ATS before ship.

| Order | ID | File | Notes |
|---|---|---|---|
| 00 | — | `sections/careers/CareersHero.tsx` | Centred hero, NOW HIRING pill, locations strip |
| 01 | the-work | `sections/careers/CareersImpact.tsx` | "Production is a country": narrative beside `demos/AshokaChakra` (slow-turning 24-spoke wheel), then the four-mission impact band (count-ups per Rule 4) |
| 02 | how-we-work | `sections/careers/CareersCulture.tsx` | Candidate-lens culture ledger (W-01…W-06: principles translated to the employee experience), honest compensation note pointing at the intro call, links to `/about#what-we-believe` |
| 03 | open-roles | `sections/careers/CareersRoles.tsx` | Canonical filterable roles board (client) — same ROLES + blue-bar hover signature as JoinTheTeam; keep the two lists in sync |
| 04 | how-we-hire | `sections/careers/CareersHiring.tsx` | Interactive hiring loop (client): deliberately un-boxed (no console frame — that idiom is [02]'s). Clickable four-station rail advances an open hand-drawn line-art human scene per step (both-ways call / shipped-system deep-dive / shared-editor session / letter handed over) with tilted pinned notes; auto-advances, locks on click. The shared `demos/LineArtBust` figure powers the scenes. Sits on the page's second (deeper) blue band with soft radial glows |
| 05 | talk-to-our-team | `sections/careers/CareersClose.tsx` | Dark closure card; Apply anchor target |

### Solution pages (`/solutions/eis`, `/solutions/life`, `/solutions/knowledge`)

Composed in `app/solutions/{eis,life,knowledge}/page.tsx` (Nav + sections + Footer). The nav's Solutions → Akashic Plugin items link here, as do the "Learn more" links on `/akashic`'s AkashicSolutions cards. Copy comes from user-supplied content scripts (July 2026); figures on these pages (564 crore sessions, 18.25 crore enrolments, 1.89 crore learners, 2B vaccinations, 3.87 lakh emigrations, 10 crore+ Poshan, 12,402/month, ₹2 Cr+ estimate) are per those scripts — ⚠ some differ from the home/Akashic stats (5.75B+/187M+); reconcile before ship. All three share the split hero (pitch left, telemetry/mockup card right), the flowing six-step chain rail, and count-up proof panels, so the family reads as siblings. Each also carries its own one soft blue band (Rule 5a): `EisIntegration` [06], `LifeStory` [03], `KnowledgeMorning` [04] — all narrative/trust "breather" sections, not data-dense ones.

| Page | Sections (`components/sections/…`) | Signature pieces |
|---|---|---|
| `/solutions/eis` | `eis/` — EisHero, EisBrief [01], EisProvenance [02], EisSpine [03], EisAction [04], EisMoments [05], EisIntegration [06], EisProof [07], EisClose [08] | Rebuilt (Jul 2026) around the EIS product prototype (user's Downloads/Akashic EIS): `demos/mockups/EisBriefMockup` morning-brief hero (§8a, Nexora/Arjun/Meridian demo data from the prototype); brief-anatomy fan (one sentence, three systems); recreated Data Provenance popover (source/query/refresh/confidence/records); Enterprise Spine entity graph + convergence card; question-to-action single console (three numbered ask/simulate/approve zones mirroring a plain step rail, Jul 2026 simplification) |
| `/solutions/life` | `life/` — LifeHero, LifeGap [01], LifeOffline [02], LifeStory [03], LifeChain [04], LifeBuilt [05], LifeProof [06], LifeClose [07] | Live counter card (Indian-locale count-up); 4-days-vs-2-min pathway panels; signal-bar offline states; stopwatch timeline (00:00→01:50); village→district→ministry fan SVG |
| `/solutions/knowledge` | `knowledge/` — KnowledgeHero, KnowledgeFracture [01], KnowledgeGrid [02], KnowledgeNation [03], KnowledgeMorning [04], KnowledgeProof [05], KnowledgeChain [06], KnowledgeClose [07] | Learner-grid card with adaptive path rows (§8a); fracture watermark figures; per-learner pace bars; teacher's-morning clock timeline; DIKSHA count-up panels |

### Sector pages (`/sectors/public-sector`)

Composed in `app/sectors/public-sector/page.tsx`; the nav's Solutions → Sectors "Public Sector" item links here (Healthcare/Education/Enterprise still hash placeholders). Copy from the user's content script (July 2026); all platform figures presented as public record per that script. Shares the solution-page family DNA (split hero + telemetry board, watermark gap figures, moment dossiers, six-step chain).

| Page | Sections (`components/sections/public-sector/`) | Signature pieces |
|---|---|---|
| `/sectors/public-sector` | PublicSectorHero, PublicSectorGap [01], PublicSectorProven [02], PublicSectorMoments [03], PublicSectorWhy [04], PublicSectorChain [05], PublicSectorDeploy [06], PublicSectorClose [07] | Public-record missions board hero card; two-tier proof (4 flagship count-up panels + "also in production" registry ledger); **tender-schedule ledger** (REQ-01…REQ-06 compliance rows with status chips); environment tiles with SOVEREIGN DEFAULT marker. `PublicSectorMoments` [03] carries the page's one soft blue band (Rule 5a) |

---

## 7. Design Rules

### Rule 1 — Shape Discipline
Every section must have its own organic shape. If you are about to reach for a generic `.card-attio` or 3-up card grid for a new section, **stop**. Cards are a last resort, not a default. Look at what the section data actually is — ledger rows, ratio counters, pull-quotes, step cards — and design the container to match the content.

### Rule 2 — The Checkmark Is Sacred
The checkmark character appears **only** in the FieldLedger telemetry badge — and since FieldLedger stopped being rendered (20 Jul, see §1), the shipped site emits **no checkmarks at all**. Keep it that way. Use other forms of affirmation (stat numbers, section labels, proof statements).

### Rule 3 — Newsreader Is Rare
`font-display` (Newsreader) is reserved for editorial pull-quotes only: the Voices section (and FieldLedger's pull-quote line, which no longer renders). Do not introduce it for headings, callouts, or marketing copy.

### Rule 4 — No Invented Data
All numbers in the UI (stats, chart values, percentages) must be real. The AI investment chart uses Stanford HAI AI Index Report 2026 figures. The scale stats (5.75B+ learning interactions, 4M+ workforce clearances, 99.999% uptime) are real deployment figures. Do not invent new numbers.

### Rule 5 — Dark Sections Are Deliberate, Not Default
Three regions are permanently dark, each by explicit user direction: the Footer (`bg-vault`), the home page's `MeetAkashic` section (`bg-uc-bg`, dark Attio-derived aesthetic, 18–19 Jul), and the home page's `ProvenAtScale` section (deep-navy gradient, 20 Jul — it went white in an earlier pass, then back to dark with the Keboola-derived rebuild). Note that `MeetAkashic` and `ProvenAtScale` are **adjacent**, so the page now runs dark across [—] and [02]; if that reads too heavy, `ProvenAtScale` is the one to revisit. New sections still default to `bg-white` or `bg-background`. (The old blue `PowerfulPlatform` section that once carried `bg-[#3E63DD]` was retired 19 Jul when `MeetAkashic` took over the platform slot — do not reintroduce a full-blue section background.)

**Every dark ground is blue-black, never neutral black.** `depth` / `uc-bg` `#0A0E24` (the Akashic page's `.ak-depth` slabs and, since 21 Jul, `MeetAkashic`), `vault` `#0a0a0c`, and the whole shadow ladder cast in `rgba(11,20,64)` are one indigo family. `MeetAkashic` was neutral `#101010` until 21 Jul, when it was re-tinted on user direction — near-black was the only dark region outside that family and read as a different site's section dropped into ours. This is a **hue** rule, not a lightness one: match the family, do not lighten toward `blue` `#3E63DD` (see the retired `PowerfulPlatform` above).

### Rule 5a — One Soft Blue Band Per Page
Per user direction (17 Jul), every page gets exactly ONE section styled with the soft blue gradient band — `bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)]` — to break up an otherwise all-`bg-white` run. Pick the page's own narrative/trust/culture "breather" section (not a dense data or product section) as the candidate. Current assignments: Home → `HowWeDeliver` [03] soft blue band (user direction 18 Jul; `ProvenAtScale` [02] is a dark band, not a blue one, so it does not consume the page's blue slot); About → `AboutBeliefs` [03]; Careers → `CareersCulture` [02] and `CareersHiring` [04] (two, both approved); Akashic → `AkashicTrust` [05]; Delivery → `DeliveryFit` [07]; EIS → `EisIntegration` [05]; Life → `LifeStory` [03]; Knowledge → `KnowledgeMorning` [04]; Public Sector → `PublicSectorMoments` [03]. Do not add a second blue band to a page without user direction — the point is one clean break, not another pattern to overuse.

### Rule 6 — Reduced Motion
All animations must respect `prefers-reduced-motion`. The global CSS handles this for `*` via `animation-duration: 0.01ms`. Component-specific overrides exist for `.fl-sparkline`, `.fl-row-enter`, `.fl-sheen`. Any new animation you add must degrade safely.

### Rule 7 — Images Require Real Files
`EverySector` references `/sectors/healthcare-real.png` etc. via `next/image`. These must exist in `public/sectors/`. Never add `<Image>` or `<img>` tags pointing to paths that do not exist in `public/`.

Photography provenance: every photo on the site is Pexels stock under the Pexels licence (free commercial use, no attribution required).

- `public/proof/` (ProvenAtScale) — `learning.jpg` 18012464, `mobility.jpg` 28927716, `immunisation.jpg` 7179255. **Renamed 20 Jul**: the files were `diksha/emigrate/cowin.jpg`, and `next/image` puts the filename into the page source, which leaked the client names the copy had just removed (see ProvenStories' CLIENT NAMING note). Keep these names non-identifying. This directory is **untracked by git** — deletions here are not recoverable (`poshan.jpg` 36739080 was removed with the Poshan story and is gone).
- `public/sectors/` (EverySector) — the `*-real.png` set plus `manufacturing-pexels.png`. A swap to documentary photography was tried and reverted on 20 Jul; the originals stand. Note `smart-cities-real.png` is retained but unused since Smart Cities was dropped.

Photos are **illustrative of the sector, never screenshots of the named system**; keep alt text describing the scene, not the platform. `public/sectors/` files are JPEGs carrying a `.png` extension (pre-existing) — harmless, but do not copy the pattern for new assets.

### Rule 8 — Tailwind Over Inline Styles
Every section uses Tailwind utility classes as the styling method. The gradient/mask layers of the Meet Akashic section (`sections/universal-context/UCHero.tsx`'s orb stack and pinstripes, `UCConnectivity.tsx`'s edge mask) are a deliberate, contained exception — multi-stop conic/radial gradients, not layout. Do not let this exception spread — new sections and components use Tailwind classes, not inline style objects, for anything that isn't computed geometry.

---

## 8. Component Notes

### §8a — `demos/mockups/`: Simulated Product UI
Everything in `components/demos/mockups/` renders **fake Akashic app screenshots**, not real product functionality: hardcoded numbers, hand-placed nodes, canned chat transcripts. They exist purely so the homepage can show "the product" without a real backend. This is a distinct category from the rest of `demos/` (`FieldLedger`, `VoicesDispatches`, `DivergentAnswers`, `HeroConnections`), which render real, data-driven or purely decorative content.

Every file in this subfolder is named with a `Mockup` suffix and carries a top-of-file comment starting with `SIMULATED PRODUCT UI`. If you add a new fake-screenshot component, put it here, suffix it `Mockup`, and add the same comment — don't let simulated UI drift back into the flat `demos/` folder where it looks indistinguishable from real components.

Contents: `HeroProductsMockup.tsx` (Hero's 3-card carousel), `ProofComparisonMockup.tsx` (TheProof's drag slider), `EisBriefMockup.tsx` (the /solutions/eis hero's morning brief).

### `demos/mockups/HeroProductsMockup.tsx` (large file)
Three product card panels (Data Pipelines / Conversational AI / Data Models) rendered with `dangerouslySetInnerHTML` for the internal UI mocks. This is intentional — the card UIs are complex SVG+HTML mockups that are not React trees. State: `activeCard` (0|1|2), auto-cycles every 6000ms. `.hs-card` CSS class with `data-pos="center|left|right"` handles the fan layout. Tab progress bar uses `progressFill 6s linear` animation.

Do not refactor the `dangerouslySetInnerHTML` without a concrete reason. The tradeoff (bundle size vs. simplicity of static HTML mocks) is deliberate.

### `ui/ScrollReveal.tsx`
Wraps children in an `IntersectionObserver` that adds a fade-up class when the element enters the viewport. Accepts a `delay` prop in milliseconds. Use it for every non-interactive content block. Keep delay values at or below 400ms — staggered reveals should feel snappy, not theatrical.

### `ui/ScrollRevealRail.tsx`
Centred 1440px rail wrapper with animated left/right edge lines that fill as the section scrolls through the viewport. Takes a `dark` prop for use on dark backgrounds (currently only the Footer).

### `hooks/useCountUp.ts`
Three related exports (see §1) covering the two distinct count-up needs in the codebase: a scroll-triggered single-string-figure animation (`useCountUp`, used by `DivergentAnswers`) and a re-triggerable numeric animation for content already inside a parent `ScrollReveal` (`useCountUpValue`, used by `FieldLedger`). Do not reintroduce a third local copy of this logic — extend one of these two.

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
