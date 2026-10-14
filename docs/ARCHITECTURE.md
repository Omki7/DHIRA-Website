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
  layout.tsx           Root layout: loads Google Sans family + Newsreader + Inter (Inter: product-UI mockups only) (Google Fonts, display=swap)
  page.tsx             Home: <Nav> + <main> of sections in order + <Footer> + PageMinimap
  globals.css          Tailwind directives + component classes + keyframe animations + :focus-visible ring
  theme.css            Light/dark semantic values, theme switch and illustration palettes. Dark applies
                       only while a main[data-theme-page] marker is present (home, /akashic, /about)
  {about,akashic,careers,delivery,solutions,sectors/*,solutions/*}/page.tsx   Sub-page composers
                       (`solutions/page.tsx` is the /solutions hub; `solutions/{eis,life}` are product pages)

components/
  layout/
    Nav.tsx            Site header shell (rebuilt 14 Oct 2026): logo (= home) · Akashic · Solutions ·
                       Services · Company + "Talk to our team". Hide-on-scroll, 72px bar (sticky offsets across the
                       site depend on it), root stays `<header data-scrolled>` (about-page.css targets it).
                       All labels and links live in lib/navigation.ts. See DESIGN_SYSTEM "Navigation"
    nav/               Header parts
      MegaSheet.tsx       The ONE shared desktop sheet every menu opens into: attached to the header,
                          height morphs between menus, panels SSR-rendered and `hidden` until shown
      MenuPanel.tsx       One menu's lead / groups / featured grid; exports MenuRow (reused by the drawer)
      NavFeatured.tsx     Featured card + its hairline figure (`.ad-draw` kit), one figure per menu
      MobileNav.tsx       Below lg: full-screen drill-down drawer (dialog, focus trap, scroll lock)
      AnnouncementBar.tsx The founder's launch line, ABOVE the sticky header in normal flow; set
                          NAV_ANNOUNCEMENT to null to remove it everywhere
      NavIcons.tsx        Chevron, arrows, menu and close glyphs
    Footer.tsx         Dark footer (bg-vault) with link columns. Still on the OLD IA (Insights, Delivery,
                       EIS label): mirror lib/navigation.ts when the footer is next touched
    PageMinimap.tsx    Right-edge section minimap (aria-labelled)
    ThemeSwitch.tsx    Accessible sun/moon switch in the header and mobile drawer. Persists the explicit
                      light/dark choice; hidden on routes outside the initial three-page rollout

  sections/            One file per page section (see Section Maps below)
    universal-context/ Parts of MeetAkashic (legacy UC* names from the Attio-replica origin)
    about/ akashic/ careers/ delivery/ eis/ life/ public-sector/ solutions/
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
    about/                The /about drawings: GrowthRings, ThreadConvergence, JourneyLayers, SurveyScale, SystemSection,
                          SiloLayer, KolamCulture (see the About section map)
    careers/              The /careers drawings: SeatingPlan, ReachArcs, HiringLoop (see the Careers map)
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
    FigureEyebrow.tsx     `[NN]  LABEL` eyebrow on the homepage dashed rail (/about, /careers); `live` adds
                          the pulsing NOW HIRING marker right; `bare` drops the rail (heroes, closing card)
    SectionHeader.tsx     /about + /careers section header: eyebrow rail, then TwoToneTitle, then the lede
                          UNDER it, all left (never headline left / lede right); `children` sit under the lede
    TwoToneTitle.tsx      Two-tone section headline (soft setup, ink payoff); `tone` light / depth / ink
    SectionCoda.tsx       Mono sign-off line that ends a drawing-page section; `rule` adds the dashed hairline
    DrawingSetClose.tsx   Closing `bg-ink` card with the engineering title block + stamp slot (/about, /careers)
    StatBand.tsx          Site-wide stat-tile recipe (see DESIGN_SYSTEM §4a). Currently unimported —
                          documented design-system primitive, keep unless the §4a rule is retired
    PreviewTag.tsx        The dashed "Preview" mark for capabilities that ship in preview (AI agents).
                          Promoted from sections/akashic/AkashicStory (which re-exports it) so the nav and
                          the /akashic demos carry it without importing from sections/

hooks/
  useCountUp.ts        useCountUp (default, single-string figure), useCountUpValue (re-triggerable numeric),
                       usePrefersReducedMotion. Do not add a third count-up copy — extend one of these.
  usePageScrollSpy.ts  Scroll-spy for PageMinimap active state
  useDrawn.ts          True once an element enters view (true at once under reduced motion). Pairs with
                       `data-drawn` and the `.ad-*` classes; used by every /about drawing
  useMenuIntent.ts     The nav's open state: 120ms hover intent, 300ms close grace, instant switching
                       between open menus, click pins a hover-opened menu (MENU_OPEN_DELAY / MENU_CLOSE_DELAY)

lib/                   Static content config, one file per page (see STATE_AND_DATA.md)
  theme.ts             Typed appearance preference, route allowlist, pre-paint bootstrap and tab sync.
                       Root layout injects the bootstrap before the body; light is always the first-visit default
  pageSection.ts       Shared section typing
  navigation.ts        The site navigation, one source of truth: NAV_MENUS (lead, groups, featured),
                       NAV_ANNOUNCEMENT, NAV_CTA. Every href must resolve to a route + an id
  {home,about,akashic,careers,delivery,eis,life,publicSector,solutions}Sections.ts
  careersRoles.ts      The four open roles: hero seating plan, /careers board, JoinTheTeam (unrendered)
  {education,energy,finance,healthcare,manufacturing,retail}Sections.ts + sectorContent.ts
```

## Section Maps

Backgrounds, ids, and per-section intent. Eyebrow numbering `[NN]` is deliberate
(renumber only when a section is inserted or removed, and update this map in the same change).

### Home (`app/page.tsx`)

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| — | nav | `layout/Nav.tsx` + `layout/nav/` | `bg-background/95 backdrop-blur-md` (solid while a menu is open) | Announcement bar above it scrolls away. Hides on scroll down (30px), shows on up (15px)/near top, always shown while a menu or the drawer is open |
| 00 | hero | `sections/Hero.tsx` | `bg-background` | Text only on a dot-grid ground (product screen carousel removed 23 Sep 2026; `HeroProductsMockup` + `HeroConnections` kept on disk, unused) |
| 01 | problem | `sections/ProblemSection.tsx` | `bg-white` | Argument left (headline + demoted industry-record footnote), evidence right (`DivergentAnswers`), verdict below. Three-answers (34–42px) outrank $581B/46% figures. Stanford HAI 2026 + S&P Global data |
| 02 | platform | `sections/MeetAkashic.tsx` + `universal-context/` | `bg-uc-bg` (= `vault` #0a0a0c, matches [04]) | Eyebrow `THE PLATFORM`. Written for the senior decision maker who funds AI; picks up [01]'s "data never made ready for AI". One job per part, no claim twice: `UCHero` "The intelligence layer" (was "The missing layer"; matches /akashic hero, 14 Oct 2026) / Meet Akashic (64px) / ready for AI, then AI at work · `UCFeatureGrid` what your AI knows (entity resolution, semantic layer, document intelligence, knowledge layer, data lineage; captions balanced to 10 to 12 words) · `UCSignals` what it does (find the change, reason across sources, answer with citations, govern and audit; never oversell: no autonomous decisions, no write-back, there is no reverse ETL; `GlyphMorphCanvas` glyphs index-matched) · `UCConnectivity` nothing to rip out (logo marquee) · `UCSdk` the seven modules under dashboards, models and agents + the section's one CTA (`btn-primary-invert` to `/akashic`). Security, "one platform" and delivery stay out: [08], [06], [04] own them. Site type stack only (no Inter). **FULL BLEED — the one homepage section outside `ScrollRevealRail`.** Carries `#platform` id |
| 03 | scale | `sections/ProvenAtScale.tsx` | `bg-background` (light; `dark` prop unused on home) | Eyebrow "In production", "Proven at national scale. / Ready for your organisation." (the component default since 14 Oct 2026, shared with /akashic [09]) over the `ProvenStories` carousel. Bridge into [04]: "Akashic is the platform. / DHIRA is your delivery partner." (same partner word as the /akashic close) |
| 03 | delivery | `sections/HowWeDeliver.tsx` | soft blue band | Three-engagement-model journey selector. The page's one blue band (Rule 5a) |
| 04 | sectors | `sections/EverySector.tsx` | `bg-white` | Six named industry tabs, photographic feature and concise use cases from `HOME_INDUSTRIES`; manual selection, keyboard navigation, legacy sector hashes and a Public Sector link. Responsive tab grid on mobile |
| 05 | proof | `sections/TheProof.tsx` | `bg-background`, inset `panel` before side | `ProofComparisonMockup` before/after wipe, three view controls, pointer capture and keyboard input. Engraved record stacks and interrupted threads become a continuous shared spine; responsive labels, no floating node cards. Copy in `HOME_PROOF` |
| 06 | voices | `sections/Voices.tsx` | flat `bg-[#F1F5FE]` (user-approved second band, same as /akashic [06]) | Reader-led interview spread: arched portrait, Newsreader quote, manual author index. No autoplay |
| 07 | governance | `sections/EnterpriseSecurity.tsx` | `bg-white` | Stat grid + animated trust-coverage curve |
| — | careers | `sections/CareersStrip.tsx` | `bg-background` | Unnumbered strip, out of `HOME_SECTIONS`. Open invitation between hairlines: two-tone headline, four branching discipline links sourced from `careersRoles`, primary CTA to `/careers`. Full board lives on /careers |
| 09 | closure | `sections/Closure.tsx` | `bg-white` | High-contrast dark closure card, mock CLI |
| — | footer | `layout/Footer.tsx` | `bg-vault` | Dark footer, link columns |

### Akashic (`app/akashic/page.tsx`)

The nav's Akashic menu (lib/navigation.ts) links here: its Platform group to
`#how-it-works`, `#architecture`, `#trust`, `#open`, `#stack`; its Modules group
to the span ids `AkashicModules` renders (`#data-pipelines`, `#master-data`,
`#data-warehousing`, `#machine-learning`, `#ask-ai`, `#business-intelligence`,
`#governance`), and "AI agents · Preview" to `#agents`. Rename any of these ids
and the nav breaks silently: update lib/navigation.ts in the same change.

| Order | ID | File | Background |
|---|---|---|---|
| 00 | hero / platform-screens | `akashic/AkashicHeroQuote.tsx` (`AkashicHero` + `AkashicShowcase`) | `bg-background` / flat `bg-[#F1F5FE]` sticky quote layer (matches [07]). Hero rewritten 14 Oct 2026 from the founder's wireframe: "The intelligence layer / behind every decision." (his category, our decision promise), eyebrow ASK · PREDICT · DECIDE, lede ends on the organisation-wide gain (every team, same figures, traced). No figures in the hero (user, 14 Oct 2026); his platform figures live in [10] |
| 01 | akashic-in-action | `akashic/AkashicFourMoves.tsx` | `bg-background`. Eyebrow `ASK AKASHIC`. Header rewritten 14 Oct 2026 to the executive gain, not the demo: "Why the number moved, / answered in seconds." From lg the h2 size tracks the column (`clamp`) so the setup line never wraps. CTA "See what's underneath" leads to [02] |
| 02 | how-it-works | `akashic/AkashicModular.tsx` | `bg-primary-bg` (exploded platform scroll scene). Headline (in `AkashicTeardownMockup`) "Start with one module. / Grow into the platform."; the lede keeps how the modules hand off to each other. [01] Ask into [02] the modules is the page's opening sequence (user, 14 Oct 2026): do not put another section between them |
| 03 | architecture | `akashic/AkashicArchitecture.tsx` | `bg-white` |
| 04 | modules | `akashic/AkashicModules.tsx` | White; compact architecture schematic with three labelled layers, module capabilities and shared governance. Pipelines and Master Data carry an AI agent line with a `PreviewTag`; the coda ("Agents, in preview. The groundwork they need, already live.") hands off to [05]. Heading and introduction left-aligned. Module links open [10] entries |
| 05 | agents | `akashic/AkashicAgents.tsx` + `demos/akashic/AgentRunDrawing.tsx` | White, `border-t`. Added 14 Oct 2026 from the founder's agents section. "Agents do the legwork. / People make the call." One drawing: a six-step run (Ask, Plan, Retrieve, Verify, Approve, Record) under three lane brackets (agents dashed blue, a person ink, the record solid blue); each of his eight named agents hangs from the step it works in, the Approve column holds no agent ("No agent signs off."), and the golden-record steward and pipeline monitor run under every run. Placed after the foundation and before [06] Trust. `PreviewTag` on the label; flip `AKASHIC_AGENTS.preview` when agents ship. Claims rules applied to his copy are in the `AKASHIC_AGENTS` comment |
| 06 | trust | `akashic/AkashicTrust.tsx` | White; "Put AI to work. / Keep control of your data." Restored four privacy cards with compact illustrations and control badges |
| 07 | open | `akashic/AkashicOpenFoundations.tsx` | Flat `#F1F5FE`; "No lock-in. / Your data, your formats, your call." Restored four principles: modular, inspectable, extensible and portable |
| 08 | build-vs-buy | `akashic/AkashicBuildVsBuy.tsx` + `demos/akashic/GroundworkDrawing.tsx` | White; one drawing (30 Sep 2026). Four use cases (dashboards, forecasts, AI answers, AI agents in preview) built project by project, groundwork hatched and rebuilt per column, against Akashic, groundwork laid once as a solid blue band. Four numbered pins key one-line CFO, CIO/CTO, CDO/AI and CEO/COO seats listed beneath; one measure line with the CTA. Replaced a lifecycle strip, comparison table and four executive cards. Legacy anchor retained |
| 09 | scale | `sections/ProvenAtScale.tsx` | `bg-white` (reused, id="scale"). On /akashic: eyebrow "In production", title "Proven at national scale. / Ready for your organisation." (`title` accepts a node). Keeps its own sourced figures; the founder's programme figures are leadership track record and are not used here |
| 10 | stack | `akashic/AkashicStack.tsx` | `bg-depth`; compact expandable module index with light specification sheets, grouped connectors and adjacent capability qualifiers. First open; addressable `#reference-*` anchors. Carries the founder's per-module figures: Pipelines 25 built-in transforms, BI 61 data sources and 50+ chart types, Governance 80+ metadata connectors |
| 11 | solutions | `akashic/AkashicPlatform.tsx` + `demos/akashic/SolutionWorkflow.tsx` | White. Rebuilt 14 Oct 2026: "Not separate products. / Akashic, configured around one process." Owns the configuration claim, NOT [08]'s "groundwork once" (the old "One foundation" headline and foundation strip restated [08] and were removed). One sheet in [08]'s grid language: an axis column, then Enterprise Intelligence, IPMS and Akashic Life side by side (category, audience, claim, three-step glyph workflow, one note). Below, on the `panel` band, the seven modules run as unbroken lines under every column: blue node = switched on, hollow ring = available, a blue spine joins each solution's modules. Desktop rows align through CSS `subgrid` (`.ak-config-*` in akashic-story.css); below lg each solution stacks with only its own modules. Module use per solution is sourced in the `AKASHIC_SOLUTIONS` comment (Rule 4). No autoplay, no simulated screens. The nav's Solutions featured card links here |
| 12 | faq | `akashic/AkashicFaq.tsx` | White, `border-t`. Added 14 Oct 2026, the founder's FAQ re-cut (`AKASHIC_FAQ`): "Questions leaders ask. / Answered plainly." Six questions as an open two-column list on hairlines (no accordion) plus FAQPage JSON-LD. Every answer restates a claim the page already makes |
| 13 | talk-to-our-team | `akashic/AkashicClose.tsx` | White with `bg-depth` closing card; "See what your data / can decide." (the founder's closing line); question, data and first-step agenda; existing contact modal via `#get-started` |

Sections [04–08], [10–12] and the close use `akashic/AkashicStory.tsx` and
page-scoped `akashic/akashic-story.css` (23 Sep 2026 redesign). Narrative copy
lives in `AKASHIC_STORY`, `AKASHIC_AGENTS`, `AKASHIC_FAQ`, `AKASHIC_SECURITY`, `AKASHIC_OPEN_PRINCIPLES` and
`AKASHIC_ADVANTAGE` and `AKASHIC_SOLUTIONS`; [04] and [10] read the existing module configuration
in `lib/akashicSections.ts`. 14 Oct 2026: [05] Agents and [12] Questions were inserted and later
sections renumbered (eyebrows, `AKASHIC_SECTIONS`, `ProvenAtScale sectionNumber`). Security certification
badges and the unconfirmed six-week closing promise are not rendered.

Shared: `demos/AkashicFlowConnectors.tsx` (FlowPath/FanIn/MergeDown/SplitDown/
MobileConn), `akashic/AkashicCardChrome.tsx` (simulated-UI chrome + MiniStack).

### Delivery (`app/delivery/page.tsx`)

| Order | ID | File | Background |
|---|---|---|---|
| 00 | hero | `delivery/DeliveryHero.tsx` | `bg-background` |
| 01 | services | `delivery/DeliveryServices.tsx` | `bg-background`; the founder's Advise / Engineer / Deploy service lines (added 14 Oct 2026) as hairline-ruled columns with ids `#advisory`, `#engineering`, `#ai-solutions` (the nav's "What we do" targets). No week figures; "Agentic workflows" carries Preview |
| 02 | engagement-models | `delivery/DeliveryModels.tsx` | `bg-white`; each model is addressable as `#model-<id>` (saas, whitelabel, customai, engineering, augmentation) and opens its own tab, from the hash on arrival or a same-page link click |
| 03 | capabilities | `delivery/DeliveryCapabilities.tsx` | `bg-white` |
| 04 | methodology | `delivery/DeliveryMethodology.tsx` | `bg-white` |
| 05 | proven-at-scale | `delivery/DeliveryProven.tsx` | `bg-white` |
| 06 | partnership-fit | `delivery/DeliveryFit.tsx` | soft blue band (Rule 5a) |
| 07 | faq | `delivery/DeliveryFAQ.tsx` | `bg-white` |
| 08 | talk-to-our-team | `delivery/DeliveryClose.tsx` | `bg-white` (dark card; `#talk-to-our-team`) |

The nav labels this page **Services** (the founder's term); the route stays `/delivery` and
the page is already titled "Delivery & Services".

### About (`app/about/page.tsx`)

The nav's Company menu links here: "About DHIRA" → `/about`, "Leadership" →
`/about#people`. Careers goes to `/careers`, Impact to `/#scale`.

**The sections below the hero read as a set of engineering drawings** (rebuilt 22 Sep 2026), one
per section, in ONE line language: hairline strokes, mono 11px labels on
leaders, blue for what exists today, dashed for what does not exist yet. Each
eyebrow names its drawing on the right (`/ THREADS`, `/ SECTION` ...). Shared
parts: `ui/FigureEyebrow.tsx`, `ui/TwoToneTitle.tsx`, `ui/SectionCoda.tsx`,
`ui/DrawingSetClose.tsx`, `hooks/useDrawn.ts` + the `.ad-*` classes in
globals.css (draw once on view, final state under reduced motion). Copy
follows the drawing-page copy rules in DESIGN_SYSTEM.md.
Figures live in `components/demos/about/`. No visible copy on this page uses a
hyphen or a dash (user direction, 22 Sep 2026).

**Current treatment (30 Sep 2026):** a centred, text-only hero sits over an original landscape photograph spanning the navigation, copy and proof row, then fading into the conviction section. The hero owns an absolutely positioned Next Image (`public/about-landscape.webp`), a contrast overlay and a bottom fade. See ABOUT_LANDSCAPE_ASSET.md for the generation prompt and responsive treatment. Section 01 explains the data-first conviction. Section 02 (rebuilt 6 Oct 2026) draws the whole record as one terraced drawing on white: every release since 2018 is a layer that runs on to today, national programmes hang below the line and only the ambition is dashed. Native scrolling now accumulates one year at a time on roomy desktop viewports, with a stable reading area and a Show all years shortcut. The complete story stays in the drawing: release titles paired with their years, plus trusted context, scoped action and human authority in the right-hand ambition panel. The separate timeline disclosure and future block below were removed at the user's request. Phones and tablets get the complete drawing as an emblem above a readable ledger; without JS the ledger shows at every width. The journey flows directly into section 03, the public-infrastructure vision. The former How we work section and system cutaway are retired because they repeat the conviction and journey. Section 04 places the five leaders on an organic portrait arc; section 05 (added 5 Oct 2026) pairs the three kolam rules with how the team works beside a kolam that draws People, AI, Governance, Security and Data, and its invitation hands off to careers; section 06 closes with contact and careers. Shared editorial styles live in `about/AboutSection.tsx` and `about/about-page.css`; copy lives in `lib/aboutContent.ts` and `lib/aboutJourney.ts`. The opening remains the one soft blue band. Unverified draft quotes are not rendered.

| Order | ID | File | Background | Drawing |
|---|---|---|---|---|
| 00 | hero | `about/AboutHero.tsx` | Photographic sky and green hills, fading to white | Centred company copy, two actions and an unboxed proof row. No diagram. Landscape extends behind the navigation. Desktop description uses one sentence per line. |
| 01 | why-we-exist | `about/AboutConviction.tsx` + `demos/about/ThreadConvergence.tsx` | `bg-background` | Three concise beliefs beside the original thread drawing: records, documents and streams converge into governed data, with blue AI threads growing from that foundation. |
| 02 | journey | `about/AboutJourney.tsx` + `demos/about/JourneyLayers.tsx` | `bg-background` | "Eight years of layers. / One foundation." One complete terraced figure with cumulative native scrolling. From 1200 × 820, when the measured stage fits, the stage pins at 88px and adds one year per 150px of scroll (1350px travel including the final hold). Reverse scrolling retraces the record. The stationary reading area carries the year, headline and explanation. Show all years removes the pin while preserving position. Each layer carries a 17px Google Sans title and 13px mono year on one line, with no supporting subtitle. The year is kept beside its title for context. The calendar ruler uses 12px type and the era captions use 11px; the founding label reserves 208px against the actual historical span. Trusted context, scoped action and human authority are explained inside the right-hand dashed horizon, explicitly an ambition with no release date. **User-restored composition:** no separate Read the full timeline disclosure and no future text block below the figure. Below 1024px, the complete emblem precedes a chronological ledger of titles and years, with historical descriptions for assistive technology and the future principles visible; the ledger is screen-reader-only on desktop. Short viewports and reduced motion show the completed figure without pinning. Without JS, the ledger is visible at every width. The 2025 recognition remains the coda. Content: `lib/aboutJourney.ts`. |
| 03 | vision | `about/AboutVision.tsx` + `demos/about/SiloLayer.tsx` | `bg-depth` (the page's one dark section) | Elevation: fourteen systems on one ground, each labelled by a public function any government runs; the layer is solid over the three live programmes (education, health, labour; homepage figures, generic names, tagged India in the key) and dashed elsewhere. Headline is jurisdiction agnostic ("intelligence as public infrastructure"): India is the proof, never the market. No Western deployment is implied. Legend keyed to the drawing |
| 04 | people | `about/AboutPeople.tsx` | `bg-background` | Five framed monochrome portraits follow a fine flowing line, with the founder centred and larger. AI-enhanced 1122 × 1402px derivatives of the existing photographs replace the enlarged cutouts. Sources, prompts and final asset paths: `ABOUT_PORTRAIT_ASSETS.md`. Roles and responsibilities replace draft quotes. Mobile places the founder first and the other leaders in two columns. |
| 05 | culture | `about/AboutCulture.tsx` + `demos/about/KolamCulture.tsx` | `bg-background` (`lg:py-20`) | "A kolam has three rules. / So do we." The page's one answer to why work here. Heading on the left (lede one line from `xl`), a kolam emblem on the right that draws a FIGURE each run: People (heart) first, then AI, Governance (pillared building), Security (padlock), Data (database cylinder). The line is the page's blue thread at the weight of [01]'s threads, over small ink dots, drawn by an ink pen (a heavy black lattice read as cold, 7 Oct 2026). The lede is a full sentence for newcomers: "Every morning, South Indian homes draw a kolam at the doorstep: one line around every dot." The dots are laid out in the figure, so one closed mirror curve looped around them traces its outline; inside it runs as a regular diagonal weave with a mirror only where loops had to join (each figure verified as ONE line). One pen draws it without lifting from a blue start; the figure's name appears as the line closes; "Draw another" moves to the next ("Same rules, any shape."). Below, the three rules in one row, two tone titles (grey kolam rule over ink team rule); hovering a rule replays it on the figure. Then the invitation as its own band, unnumbered so the three rules stay three: "Find your seat." with a "See where you fit" button and the teams people join in a 2 × 2 grid of groups (Build, Discover, Foundations, Ways in). No count and no link to `lib/careersRoles.ts`; no location or work mode claims; national systems stay with journey and vision. Replaced the 7 × 7 plate on 7 Oct 2026 (too complex, formed no shape, pushed text to the edges). Copy is a DRAFT for review. |
| 06 | talk-to-our-team | `about/AboutClose.tsx` | `bg-background`, inset `bg-depth` | Two-column close: contact first, careers second, with office locations. Stacks on mobile. Carries `#careers` / `#join-us`. |

`about/AboutMotion.tsx` wraps this page and coordinates native Web Animations reveals and restrained hero scroll depth. All motion respects reduced preferences, including changes during a visit. The journey owns its cumulative scroll reveal and hover lineage, independent of the page reveal controller; its content has a complete static reading alternative. The vision uses the same `AboutHeading` as conviction, leadership and contact; its old rail and duplicate reveal wrappers are removed. Culture [05] was inserted before the close on 5 Oct 2026; the close is now [06].

Not rendered, kept on disk: `AboutWhatWeBuild` and `demos/about/SystemSection` (How we work retired 30 Sep 2026), `demos/about/SurveyScale` (replaced by JourneyExplorer), `demos/about/JourneyExplorer` + `journeyNetwork.ts` + `journey-explorer.css` (the scroll-pinned canvas journey, replaced by JourneyLayers 6 Oct 2026; its chapter exports stay in `lib/aboutJourney.ts`), `demos/about/GrowthRings` (retired from the hero 29 Sep 2026), `AboutBeliefs`, `AboutCareers`, `AboutHow`,
`AboutPointOfView` (previously merged into How we work), `AboutWhoWeServe` (removed 23 Sep 2026), `AboutProof`, `AboutWhy` (earlier drafts; do not silently delete).

### Careers (`app/careers/page.tsx`)

⚠ Apply links anchor to `#talk-to-our-team` — wire a real careers inbox/ATS
before ship.

**Runs the same drawing language as `/about`** (rebuilt 22 Sep 2026): hairline
strokes, mono 11px labels, blue for what is live, dashed for what is not yet,
`ui/FigureEyebrow.tsx` + `hooks/useDrawn.ts` + the `.ad-*` classes. Figures
live in `components/demos/careers/`. No visible copy carries a hyphen or dash,
which is why the culture principles read `W01`…`W06`.

The four open roles are ONE source, `lib/careersRoles.ts`: the hero's seating
plan, this page's board (the canonical one) and `JoinTheTeam.tsx` (not
rendered since CareersStrip replaced it, kept in the tree) all read it. Add or
close a role there and every surface follows.

| Order | ID | File | Background | Drawing |
|---|---|---|---|---|
| 00 | hero | `careers/CareersHero.tsx` + `demos/careers/SeatingPlan.tsx` | `bg-background` | The team's table in plan, cut by break lines at both ends (a countable plan would be a headcount claim); the four open roles are empty blue chairs. Vertical on phones |
| 01 | the-work | `careers/CareersImpact.tsx` + `demos/careers/ReachArcs.tsx` | `bg-background` | Arcs of consequence from one branch to a country, landing on the three national programmes with one public record figure each |
| 02 | how-we-work | `careers/CareersCulture.tsx` | soft blue band (Rule 5a) | Six candid questions, ALL on screen, each joined to its answer by a blue elbow and pinned to a working principle (W01 to W06, which live only here; the old link to /about opinions was removed). Fresher / Experienced toggle swaps the set |
| 03 | open-roles | `careers/CareersRoles.tsx` | `bg-background` | The board: the hero's four chairs as rows, chair glyph included; each whole row is the Apply target. Department filter chips were removed (four roles, up to three hidden behind a click) |
| 04 | how-we-hire | `careers/CareersHiring.tsx` + `demos/careers/HiringLoop.tsx` | `bg-background` | The loop drawn BOTH ways (we learn about you above, you learn about us below) forking into a drawn yes AND a drawn no: that fork is how "no ghosting" is shown rather than claimed |
| 05 | talk-to-our-team | `careers/CareersClose.tsx` | `bg-background`, `bg-ink` card (Rule 5b) | Title block matching the /about close, stamped with the hero's empty chair |

Not rendered after the rebuild, kept on disk: `demos/LineArtBust.tsx` (was the
hiring scenes; `AboutBeliefs` still imports it) — do not silently delete.

### Solutions hub (`app/solutions/page.tsx`, added 14 Oct 2026)

The founder's Solutions section (DHIRA_ai_Website_v2, 12 Oct 2026) as an
**editorial register** (user-approved over his card gallery): hairline-ruled
rows, numbered points, no cards, no checkmarks, no simulated screens. It exists
so every nav link has a destination: "All solutions", `#ipms` (IPMS has no page
yet) and `#function-<slug>`. Copy is DRAFT in `lib/solutionsSections.ts`, the
founder's words with the claims rules applied (no week figures until he
confirms them; agent lines carry `PreviewTag` and stay on explanation, never
autonomy; no "golden record" or "Knowledge Graph"). Enterprise Intelligence IS
`/solutions/eis` (user, 14 Oct 2026), so his separate "Enterprise Intelligence
System" card was dropped. The industry and function mappings are drafted from
his copy and need his review. Akashic Life's lines are read from
`AKASHIC_SOLUTIONS`, not copied.

| Order | ID | File | Background |
|---|---|---|---|
| 00 | hero | `solutions/SolutionsHero.tsx` | `bg-background`; text only, on-page index under the lede |
| 01 | built-on-akashic | `solutions/SolutionsFeatured.tsx` | White; three rows with ids `#enterprise-intelligence`, `#ipms`, `#akashic-life` |
| 02 | more-solutions | `solutions/SolutionsMore.tsx` | White; seven register rows, each an anchor |
| 03 | industries (+ `#functions`) | `solutions/SolutionsIndex.tsx` | The page's one soft blue band (Rule 5a); two registers, function rows carry `#function-<slug>` |
| 04 | talk-to-our-team | `solutions/SolutionsClose.tsx` | White + `bg-ink` closing card (Rule 5b) |

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
