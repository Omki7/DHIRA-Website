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
    about/ akashic/ careers/ delivery/ eis/ life/ public-sector/
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
      Eis*Mockup.tsx             /solutions/eis. Every one of these is the EVIDENCE for the caption
                                 printed beside it, not decoration — if you change a section's claim,
                                 change its wireframe too. They render frameless (no radius/border of
                                 their own) because the section supplies the frame.
        EisBrowserChromeMockup     macOS window chrome (`light` | `dark`), wraps the app screens
        eis/EisAppChrome           shared light chrome for the app screens: top bar, module rail,
                                   live chip, CARD/CANVAS tokens
        eis/EisBriefScreenMockup   hero — the morning brief. Taxonomy line, convergence diagram,
                                   decision runway, and the loop closing live on Approve
        eis/EisEstateScreenMockup  [one-picture] — the estate, ranked, columns built per industry
        eis/EisSchemaMatrixMockup  [one-picture] — all four industries' schemas at once. The two
                                   right columns repeat verbatim; that repetition IS the argument
        eis/EisGapTimelineMockup   [the-gap] — one incident, three routes, on an axis of days
        eis/EisCapabilityEvidence  [capabilities] — the six evidence panels
        eis/EisLoopCircuitMockup   [the-loop] — five stations plus the drawn return leg
        eis/EisLensCompareMockup   [your-lens] — the same morning from three seats, side by side

        Rebuilt Jul 2026. Four patterns were removed on purpose and should not come back:
        horizontal carousels and tab strips (they leave most of a section unpublished),
        panels clipped by their frame (unreadable), 4:5 atmosphere tiles that are ~55% empty
        gradient, and white cards floating on a grey canvas (the 2010 dashboard shape).

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
  {home,about,akashic,careers,delivery,eis,life,publicSector}Sections.ts
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

### Solution pages (`/solutions/{eis,life}`)

⚠ **Neither solution page follows the old family pattern any more.** Both were
rebuilt to their own visual systems on user direction (EIS Jul 2026, Life
23 Jul 2026). The split hero + six-step chain rail + count-up proof panels
recipe now survives only on `/solutions/knowledge`. Do not "restore
consistency" across the three without checking first.

| Page | Status |
|---|---|
| `/solutions/eis` | own system, `eis-*` tokens — see below |
| `/solutions/life` | own system, `life-*` tokens — see below |

#### `/solutions/life` — the ocean system (rebuilt 23 Jul 2026)

Rebuilt against a healthcare reference the user supplied (vitaspan.ai) on the
instruction to take its flow and skin and carry DHIRA's content. Runs the
page-scoped `life-*` navy→cyan ramp, headings at **weight 500 on near-normal
tracking** rather than the site's `font-semibold tracking-tighter`, and a
`+ LABEL` eyebrow instead of the `[NN]` rail. Shared marks live in
`components/ui/life/LifeChrome.tsx` (eyebrow, square glyph, capsule CTA,
corner arc).

**The hero photograph.** `public/proof/point-of-care.jpg`, stock under a
free commercial licence (Pexels, equivalent footing to the Unsplash shots
already in that folder). Three drawn subjects were tried and rejected first —
a contour profile ("disturbing"), the handset mockup ("generic"), two
silhouettes (a pictogram). A page about people needs a photograph of people.
The treatment in `demos/life/LifeVisitPhoto.tsx` is a **weak** duotone plus an
edge mask; the first pass screened cyan at 70% and the photograph disappeared.

**Family ties, added 23 Jul 2026** after the page was compared side by side
with home and `/akashic`, which it had drifted away from. Four small anchors,
none of which touch the reference's structure: the hero opens with the Akashic
badge every other DHIRA hero opens with; `life-abyss` is now the same value as
`depth`, so the five dark sections are the site's black and not a second,
bluer one; the eyebrow and both capsules set in `font-mono` like every other
section label on the site; and the hero and the closing card each carry a CTA
**pair**, since a lone button appears nowhere else. Deliberately left alone:
the weight-500 headings, the cyan accent, the `+` cross, the circles and the
dark-forward ground rhythm. Those are the commissioned skin.

**Claims rules specific to this page.** Akashic Life is not sold, so it
carries **no figures of its own** anywhere: no parameter count, no risk score,
no case volume, no elapsed-time claim. Its evidence is what it is built on.
Figures for the traditional referral pathway ([02]'s 4 days / 0 bars / 7
steps) are fine — those describe the problem, not the product. And the
national programmes are **never named**: home and `/akashic` call them
"National Immunisation Registry", "National Learning Platform" and carry the
figures underneath. Only `/sectors/public-sector` names them. Match home.

Ground rhythm is deliberate and alternates in pairs — dark, light, dark, dark,
light, light, dark, dark, light, light, dark — so no two adjacent movements
share a register.

| # | `id` | Component | Ground |
|---|---|---|---|
| 1 | hero | `life/LifeHero.tsx` + `demos/life/LifeVisitPhoto.tsx` | `life-abyss` |
| 2 | the-gap | `life/LifeGap.tsx` (pinned headline, ghost figures) | white |
| 3 | the-solution | `life/LifeSolution.tsx` (pinned 3-circle track) | navy ramp |
| 4 | what-changes | `life/LifeBenefits.tsx` (zig-zag) | navy ramp |
| 5 | the-record | `life/LifeRecord.tsx` + `demos/mockups/life/LifeRecordAnatomyMockup.tsx` | `life-ice`→`life-cream` |
| 6 | altitude | `life/LifeAltitude.tsx` (two-tone statement) | `life-cream` |
| 7 | record-of-work | `life/LifeRecordOfWork.tsx` (vertical circle chain) | navy ramp |
| 8 | how-its-built | `life/LifeBuilt.tsx` (3 Akashic layers) | `life-cream` |
| 9 | the-stake | `life/LifeStake.tsx` (two-tone + kicker) | white |
| 10 | talk-to-our-team | `life/LifeClose.tsx` — the SHARED closure recipe, same as `Closure.tsx` and `AkashicClose.tsx` | white + `bg-ink` card |

An eleventh section, a `LifeVoice` quote band, sat between [06] and [07] and
was **removed 23 Jul 2026**. Its only attribution was "from a customer
platform review" — an unnamed testimonial, which this page cannot carry for a
product that is not sold. Stripping the attribution and keeping the quote
would have been worse (an unsourced claim). Do not reinstate without a named,
printable source.

**Two traps, both already paid for.** (1) `the-gap` and `the-solution` pin a
column with `position: sticky`; an `overflow-hidden` ancestor silently turns
sticky back into static, so those two sections must never carry it and
`LifeCornerArc` sits flush rather than bleeding off the corner. (2) Widths in
`em` must live on the element that owns the type size — `max-w` in `em`
resolves against the element's **own** `font-size`, so putting it on a wrapper
measures in 16px units.

#### `/solutions/eis` — the other outlier (rebuilt Jul 2026)

EIS was rebuilt to a different visual system on user direction and **no longer
shares the solution-page family pattern**: no numbered `[01]`-style eyebrows,
no chain rail, no `ProvenAtScale`. Do not "restore consistency" with
`knowledge/` without checking first.

| # | `id` | Component | Ground |
|---|---|---|---|
| 1 | hero | `eis/EisHero.tsx` (industry switcher) | atmosphere (`hero`) |
| 2 | the-gap | `eis/EisGap.tsx` (decision timeline) | `eis-band` #F4F5F0 |
| 3 | capabilities | `eis/EisCapabilities.tsx` (2 bands × 3, grid) | white |
| 4 | one-picture | `eis/EisOnePicture.tsx` (schema matrix + estate) | white + `dusk` panel |
| 5 | the-loop | `eis/EisLoop.tsx` (5-station circuit) | white |
| 6 | your-lens | `eis/EisLenses.tsx` (3 seats side by side) | white |
| 7 | proof | `eis/EisProof.tsx` (3 deployments, all shown) | white |
| 8 | questions | `eis/EisFaq.tsx` (3 bands, first answer open) | white |
| 9 | talk-to-our-team | `eis/EisClose.tsx` | atmosphere (`dusk`) |

**Section [03]'s id is `capabilities`, not `the-brief`** — `lib/eisSections.ts`
drives the minimap from these ids and they must match the `id` attributes.

**Every section is left-aligned at `max-w-[1180px]` with a two-tone headline**
(soft setup line, ink payoff line, per DESIGN_SYSTEM's two-tone rule). Two
sections used to carry a second full headline inside a `dusk` panel further
down ([one-picture], [the-loop]); both were removed, because a section with two
headlines has not decided what it is about.

Page-scoped primitives live in `components/ui/eis/`: `EisAtmosphere` (the
CSS/SVG sky that replaces photography) and `EisPill` (the page's one button
shape). Its palette is the `eis-*` token block in `tailwind.config.ts`.

Every wireframe on the page is **live React**, not a screenshot, and each one
is the evidence for the claim beside it — see §8a.

**Claims rules for this page (do not regress these).** A 22 Jul 2026 domain
review found four statements that a CIO, data lead, or finance team would have
rejected on sight. They are fixed; keep them fixed.

1. **Two planes, never one word.** Ingestion is read-only. Write-back is a
   short per-system list of *named actions*, scoped, approved, idempotent,
   reversible. The page previously said "READ ONLY" in five places and "writes
   to SAP" in six, which reads as either not understanding our own
   architecture or hiding the write path. Never state one without the other.
2. **No confidence score on a deterministic metric.** A `SUM` over a governed
   ledger is right or wrong; a percentage there reads as an LLM artefact
   bolted where it does not belong and undermines the provenance panel it sits
   in. Match confidence on **entity resolution** is real and is where it now
   lives (`CapSpineCard`).
3. **Lineage shows the definition, not the SQL.** When three teams produce
   three revenue numbers, the dispute is never the `SELECT` — it is recognised
   vs billed, which entities consolidate, intercompany eliminations, and the
   FX date. Show those.
4. **Systems corroborate, they do not "agree".** Contracts, delivery and HR
   hold different facts about one account. "3 systems agree" invites "about
   what?" and there is no answer.

Related: the loop's **scenario** station must show baseline, delta,
*sensitivity*, and the decision it argues for. A single variance number over an
unlabelled bar is a chart of nothing. It is also allowed to show a trade going
the customer's way (losing the account improves concentration), because a model
that only moves one direction is a sales tool, not a model.

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
