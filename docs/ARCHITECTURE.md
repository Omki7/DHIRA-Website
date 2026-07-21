# ARCHITECTURE — DHIRA Website v3

Directory layout, layer boundaries, import rules, and the section maps for every
page. This is the "where does code live and what renders where" reference. For
tokens, brand, and design rules see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md); for
content/data see [STATE_AND_DATA.md](./STATE_AND_DATA.md); for build/scripts see
[DEVELOPMENT.md](./DEVELOPMENT.md).

## Stack

```
Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5.7 (strict) · Tailwind CSS 3.4 · framer-motion 12
```

Presentational marketing site. No data-fetching, API, or env layer — see
STATE_AND_DATA.md.

## Import rules & layer boundaries

- **Path alias:** `@/*` → project root (`tsconfig.json`). All cross-directory
  imports use this form (`@/components/...`, `@/lib/...`, `@/hooks/...`). Do not
  reintroduce deep relative chains (`../../../`).
- **Layers, outermost → innermost:**
  `app/` (routes, composition) → `components/sections/*` (page sections) →
  `components/demos/*` + `components/ui/*` + `components/icons/*` (building blocks) →
  `hooks/`, `lib/` (logic + content config).
- **Dependency direction:** sections may import demos/ui/icons/hooks/lib;
  demos/ui/icons must not import sections. `lib/` and `hooks/` import nothing from
  `components/`.
- **Never place files flat in `components/`.** Always use the appropriate
  subdirectory (`layout/`, `sections/`, `demos/`, `demos/mockups/`, `ui/`,
  `icons/`). Simulated product UI goes in `demos/mockups/` (see §8a).

## Directory tree

```
app/
  layout.tsx           Root layout: loads Google Sans family + Newsreader + Inter (Google Fonts, display=swap)
  page.tsx             Home: <Nav> + <main> of sections in order + <Footer> + PageMinimap
  globals.css          Tailwind directives + component classes + keyframe animations + :focus-visible ring
  {about,akashic,careers,delivery,sectors/*,solutions/*}/page.tsx   Sub-page composers

components/
  layout/
    Nav.tsx            Sticky nav, hide-on-scroll accordion, 5 dropdown menus (ARIA-wired)
    Footer.tsx         Dark footer (bg-vault) with link columns
    PageMinimap.tsx    Right-edge section minimap (aria-labelled)

  sections/            One file per page section (see Section Maps below)
    universal-context/ Parts of MeetAkashic (legacy UC* names from the Attio-replica origin)
    about/ akashic/ careers/ delivery/ eis/ life/ knowledge/ public-sector/
    manufacturing/ education/ energy/ finance/ healthcare/ retail/ sectors/
                       Per-page section families; the six industry sectors share sectors/ + sectorContent.ts

  demos/               Interactive/animated sub-components used inside sections (real or decorative)
    HeroConnections.tsx   Animated connection graph behind Hero (decorative; dynamic-imported, ssr:false)
    DivergentAnswers.tsx  One question answered three irreconcilable ways (ProblemSection)
    ProvenStories.tsx     ProvenAtScale one-at-a-time deployment carousel
    VoicesDispatches.tsx  Asymmetric editorial dispatch cards (Voices)
    AshokaChakra.tsx      Decorative 24-spoke wheel (CareersImpact, ProvenAtScale)
    LineArtBust.tsx       Line-art figure for SVG scenes (CareersHiring, AboutBeliefs)
    GlyphMorphCanvas.tsx  rAF atom-field canvas for MeetAkashic "The platform" (dynamic-imported, ssr:false)
    AkashicFlowConnectors.tsx  Blue-on-white animated connectors for /akashic (decorative)
    FieldLedger.tsx       NOT RENDERED since the 20 Jul ProvenAtScale rebuild — kept on disk pending
                          a delete-or-redeploy decision (do not silently remove)
    mockups/           SIMULATED PRODUCT UI — fake app screenshots, not real functionality (see §8a)
      HeroProductsMockup.tsx     Hero 3-card carousel (renders via dangerouslySetInnerHTML — intentional)
      ProofComparisonMockup.tsx  TheProof drag-to-compare slider (role="slider", keyboard operable)
      EisBriefMockup.tsx         /solutions/eis morning-brief hero

  icons/               Static SVG components, no logic (AkashicLogo, DhiraLogo, DynamicSketchIcon)

  ui/                  Generic utility components
    ScrollReveal.tsx      IntersectionObserver fade-in wrapper (`delay` prop in ms, keep <=400)
    ScrollRevealRail.tsx  Centred 1440px rail with animated scroll-tracking edge lines (`dark` prop)
    StatBand.tsx          Site-wide stat-tile recipe (see DESIGN_SYSTEM §4a). Currently unimported —
                          documented design-system primitive, keep unless the §4a rule is retired

hooks/
  useCountUp.ts        useCountUp (default, single-string figure), useCountUpValue (re-triggerable numeric),
                       usePrefersReducedMotion. Do not add a third count-up copy — extend one of these.
  usePageScrollSpy.ts  Scroll-spy for PageMinimap active state

lib/                   Static content config, one file per page (see STATE_AND_DATA.md)
  pageSection.ts       Shared section typing
  {home,about,akashic,careers,delivery,eis,life,knowledge,publicSector}Sections.ts
  {education,energy,finance,healthcare,manufacturing,retail}Sections.ts + sectorContent.ts
```

## Section Maps

Backgrounds, ids, and per-section intent. Eyebrow numbering `[NN]` is deliberate
(e.g. /akashic rails skip [01]→[03] by design; do not renumber).

### Home (`app/page.tsx`)

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| — | nav | `layout/Nav.tsx` | `bg-white/95 backdrop-blur-md` | Hides on scroll down (30px), shows on up (15px)/near top |
| 00 | hero | `sections/Hero.tsx` | `bg-background` / `bg-blue` sticky quote layer | Uses `HeroProductsMockup` + `HeroConnections` |
| 01 | problem | `sections/ProblemSection.tsx` | `bg-white` | Argument left (headline + demoted industry-record footnote), evidence right (`DivergentAnswers`), verdict below. Three-answers (34–42px) outrank $581B/46% figures. Stanford HAI 2026 + S&P Global data |
| 02 | platform | `sections/MeetAkashic.tsx` + `universal-context/` | `bg-uc-bg` (#0A0E24) | Dark Attio-derived platform section. **FULL BLEED — the one homepage section outside `ScrollRevealRail`.** Carries `#platform` id; CTAs link to `/akashic` anchors |
| 02 | scale | `sections/ProvenAtScale.tsx` | deep-navy gradient (#02183E → #103169) | Keboola-style "Real Customers. Real Results." carousel (`ProvenStories`). Third dark region |
| 03 | delivery | `sections/HowWeDeliver.tsx` | soft blue band | Three-engagement-model journey selector. The page's one blue band (Rule 5a) |
| 04 | sectors | `sections/EverySector.tsx` | `bg-white` | Image-strip accordion desktop / accordion mobile; six `{sector}-hq.jpg` |
| 05 | proof | `sections/TheProof.tsx` | `bg-white` / `#F1F5FE` before side | `ProofComparisonMockup` drag slider + Before/After toggle |
| 06 | voices | `sections/Voices.tsx` | `bg-background` | Editorial rail, `font-display` (Newsreader) |
| 07 | governance | `sections/EnterpriseSecurity.tsx` | `bg-white` | Stat grid + animated trust-coverage curve |
| 08 | careers | `sections/JoinTheTeam.tsx` | `bg-[#FAFAF9]` | Filterable open-roles list |
| 09 | closure | `sections/Closure.tsx` | `bg-white` | High-contrast dark closure card, mock CLI |
| — | footer | `layout/Footer.tsx` | `bg-vault` | Dark footer, link columns |

### Akashic (`app/akashic/page.tsx`)

Nav "Akashic" trigger links here; dropdown items anchor to module ids
(`#data-pipelines`, `#master-data`, `#data-warehousing`, `#machine-learning`,
`#ask-ai`, `#business-intelligence`, `#governance`).

| Order | ID | File | Background |
|---|---|---|---|
| 00 | — | `akashic/AkashicHero.tsx` | `bg-background` |
| 01 | how-it-works | `akashic/AkashicFourMoves.tsx` | `bg-white` |
| 02 | modules | `akashic/AkashicModules.tsx` | `bg-white` |
| 03 | architecture | `akashic/AkashicArchitecture.tsx` | `bg-white` |
| 04 | modular | `akashic/AkashicModular.tsx` | `bg-white` |
| 05 | trust | `akashic/AkashicTrust.tsx` | soft blue band (Rule 5a) |
| 06 | open | `akashic/AkashicOpenFoundations.tsx` | `bg-white` (tech list flagged "representative") |
| 07 | build-vs-buy | `akashic/AkashicBuildVsBuy.tsx` | `bg-white` |
| 08 | scale | `sections/ProvenAtScale.tsx` | `bg-white` (reused, id="scale") |
| 09 | stack | `akashic/AkashicStack.tsx` | `.ak-depth` (#0A0E24) |
| 10 | solutions | `akashic/AkashicPlatform.tsx` | `bg-background` |
| 11 | talk-to-our-team | `akashic/AkashicClose.tsx` | `bg-white` (dark card; `#talk-to-our-team`) |

Shared: `demos/AkashicFlowConnectors.tsx` (FlowPath/FanIn/MergeDown/SplitDown/
MobileConn), `akashic/AkashicCardChrome.tsx` (simulated-UI chrome + MiniStack).

### Delivery (`app/delivery/page.tsx`)

Dropdown anchors (all in [02]): `#ai-readiness-audit`, `#sovereign-blueprint`,
`#governance-framework`, `#platform-deployment`, `#legacy-modernization`,
`#custom-accelerators`.

| Order | ID | File | Background |
|---|---|---|---|
| 00 | — | `delivery/DeliveryHero.tsx` | `bg-background` |
| 01 | engagement-models | `delivery/DeliveryModels.tsx` | `bg-white` |
| 02 | akashic-deployment | `delivery/DeliveryAkashicDeployment.tsx` | `bg-white` |
| 03 | product-engineering | `delivery/DeliveryProductEngineering.tsx` | `bg-white` |
| 04 | advisory-co-engineering | `delivery/DeliveryAdvisory.tsx` | `bg-white` |
| 05 | methodology | `delivery/DeliveryMethodology.tsx` | `bg-white` |
| 06 | proven-at-scale | `delivery/DeliveryProven.tsx` | `bg-white` |
| 07 | partnership-fit | `delivery/DeliveryFit.tsx` | soft blue band (Rule 5a) |
| 08 | faq | `delivery/DeliveryFAQ.tsx` | `bg-white` |
| 09 | talk-to-our-team | `delivery/DeliveryClose.tsx` | `bg-white` (dark card; `#talk-to-our-team`) |

### About (`app/about/page.tsx`)

Company menu: "About Us" → `/about`, "Careers" → `/about#careers` (teaser →
`/#careers`).

| Order | ID | File | Background |
|---|---|---|---|
| 00 | — | `about/AboutHero.tsx` | `bg-background` |
| 01 | why-we-exist | `about/AboutWhy.tsx` | `bg-white` |
| 02 | who-we-are | `about/AboutWho.tsx` | `bg-white` |
| 03 | what-we-believe | `about/AboutBeliefs.tsx` | soft blue band (Rule 5a) |
| 04 | how-we-work | `about/AboutHow.tsx` | `bg-white` |
| 05 | careers | `about/AboutCareers.tsx` | `bg-white` |
| 06 | proof | `sections/ProvenAtScale.tsx` | `bg-white` (reused, id="proof") |
| 07 | talk-to-our-team | `about/AboutClose.tsx` | `bg-white` (dark card) |

### Careers (`app/careers/page.tsx`)

⚠ Apply links anchor to `#talk-to-our-team` — wire a real careers inbox/ATS
before ship.

| Order | ID | File |
|---|---|---|
| 00 | — | `careers/CareersHero.tsx` |
| 01 | the-work | `careers/CareersImpact.tsx` |
| 02 | how-we-work | `careers/CareersCulture.tsx` (soft blue band, Rule 5a) |
| 03 | open-roles | `careers/CareersRoles.tsx` (canonical roles board — keep in sync with JoinTheTeam) |
| 04 | how-we-hire | `careers/CareersHiring.tsx` (second, deeper blue band — approved) |
| 05 | talk-to-our-team | `careers/CareersClose.tsx` |

### Solution pages (`/solutions/{eis,life,knowledge}`)

Split hero + six-step chain rail + count-up proof panels, so the family reads as
siblings. ⚠ Some figures differ from home/Akashic stats — reconcile before ship.

| Page | Sections (`components/sections/…`) |
|---|---|
| `/solutions/eis` | `eis/` — EisHero, EisBrief[01], EisProvenance[02], EisSpine[03], EisAction[04], EisMoments[05], EisIntegration[06] (blue band), EisProof[07], EisClose[08] |
| `/solutions/life` | `life/` — LifeHero, LifeGap[01], LifeOffline[02], LifeStory[03] (blue band), LifeChain[04], LifeBuilt[05], LifeProof[06], LifeClose[07] |
| `/solutions/knowledge` | `knowledge/` — KnowledgeHero, KnowledgeFracture[01], KnowledgeGrid[02], KnowledgeNation[03], KnowledgeMorning[04] (blue band), KnowledgeProof[05], KnowledgeChain[06], KnowledgeClose[07] |

### Sector pages (`/sectors/*`)

Seven pages. `/sectors/public-sector` is bespoke. The six industry pages run
**six sections**: Hero → Problem[01] → **Map[02]** → Solution[03] → Outcomes[04]
→ Close[05]. Five render through the shared `sectors/` template driven by
`sectorContent.ts`; Manufacturing swaps in its own hero + problem
(`components/sections/manufacturing/`).

- **`SectorMap` [02] is every page's signature section** — a Vectr-style pinned
  scrollytelling isometric industry map over the Akashic plate, dashed blue flow
  routes + travelling packet dots across four story steps. Machinery:
  `sectors/map/SectorMapScene.tsx` (iso kit), `sectors/map/mapData.ts` (six
  scenes on one skeleton), `sectors/SectorMap.tsx` (340vh sticky scroll-driver —
  **do NOT add `overflow-hidden` to this section, it breaks the pin**).
- Every `SectorOutcomes` [04] carries the page's one soft blue band (Rule 5a);
  every close card carries `#talk-to-our-team`.
- `/sectors/public-sector` sections: PublicSectorHero, PublicSectorGap[01],
  PublicSectorProven[02], PublicSectorMoments[03] (blue band), PublicSectorWhy[04],
  PublicSectorChain[05], PublicSectorDeploy[06], PublicSectorClose[07].

## §8 — Component Notes

### §8a — `demos/mockups/`: Simulated Product UI
Everything here renders **fake Akashic app screenshots** (hardcoded numbers,
hand-placed nodes, canned transcripts), not real functionality. Distinct from the
rest of `demos/` (real/decorative). Every file is `*Mockup` and carries a
top-of-file `SIMULATED PRODUCT UI` comment. New fake-screenshot components go
here with the same suffix + comment.

### `demos/mockups/HeroProductsMockup.tsx` (large)
Three product panels rendered with `dangerouslySetInnerHTML` (complex SVG+HTML
mocks that are not React trees — intentional; do not refactor without a concrete
reason). `activeCard` (0|1|2) auto-cycles every 6000ms; `.hs-card` +
`data-pos="center|left|right"` handles the fan. Kept SSR (hero LCP visual).

### Dynamic imports (perf)
`HeroConnections` and `GlyphMorphCanvas` are decorative, absolutely-positioned
canvases loaded via `next/dynamic({ ssr: false })` so their animation JS stays
off the initial critical path. `HeroProductsMockup` stays static (LCP). Do not
`ssr:false` a content section — it would drop from SSR HTML and hurt SEO/CLS.

### `ui/ScrollRevealRail.tsx`
The rail's vertical edge lines mean a section inside it **must not** carry a
full-width horizontal rule (`w-screen` crosses them and overflows the body). If a
section needs edge-to-edge rules, take it out of the rail entirely — that is the
call `MeetAkashic` made (it is full-bleed, outside the rail).
