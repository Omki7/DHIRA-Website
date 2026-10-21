# ARCHITECTURE: DHIRA Website v3

Directory layout, layer boundaries, import rules, and the section maps for every
page: where code lives and what renders where. Related docs:

- [CONTENT.md](./CONTENT.md): the content model and the CMS migration.
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md): tokens and design rules.
- [STATE_AND_DATA.md](./STATE_AND_DATA.md): runtime state, environment and forms.
- [DEVELOPMENT.md](./DEVELOPMENT.md): scripts and checks.

## Stack

```
Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5.7 (strict) · Tailwind CSS 3.4 · framer-motion 12
ESLint 9 (eslint-config-next, flat config) · knip · Node >= 20.9
```

A content-driven marketing site:

- Every page is prerendered as static HTML at build time.
- All copy is typed data in `content/`, read through `lib/content.ts` (CONTENT.md).
- There is no database, no API route and no client data fetching.

## Layers and import rules

```
app/                    routes: load content, compose sections, set metadata
  └─ components/sections/*   page sections: templates, content in via props
       └─ components/demos/*, ui/*, icons/*, layout/*   building blocks
            └─ hooks/, lib/     behaviour and helpers
content/                typed documents; read only by lib/content.ts
```

- **Path alias:** `@/*` maps to the project root. Cross-directory imports use it
  (`@/components/...`, `@/lib/...`); no deep relative chains.
- **Dependency direction:** sections may import demos, ui, icons, hooks and lib.
  demos, ui and icons never import sections. `hooks/` and `lib/` never import
  `components/`.
- **Content boundary:** only `lib/content.ts` imports content values. Everything
  else may import content *types* only. ESLint enforces this
  (`@typescript-eslint/no-restricted-imports` in `eslint.config.mjs`).
- **Server and client:**
  - Routes, layouts and most sections are Server Components.
  - Interactive pieces declare `"use client"` and take plain-data props.
  - Client components read interface strings with `useUi()`, never by fetching.
  - `lib/content.ts` is `server-only`.
- **Never place files flat in `components/`.** Use a subdirectory: `layout/`,
  `sections/<page>/`, `demos/`, `demos/mockups/`, `ui/`, `icons/`, `pages/` or
  `providers/`. Simulated product UI goes in `demos/mockups/` (§8a).
- **One section, one id.** A section's DOM id is the `id` of its entry in the
  page's `sections` list (minimap, hero index, nav anchors).

## Directory tree

```
app/
  layout.tsx           Root layout. Loads site settings and interface strings and provides them
                       (UiProvider). Organization JSON-LD, theme bootstrap, Google Fonts <link>
                       (Google Sans family, Newsreader, Inter: next/font has no Google Sans Text or
                       Google Sans Mono), ContactModal, RegionSuggest, OffscreenAnimationGate
  page.tsx             Home composer
  globals.css          Tailwind layers, component classes, keyframes, focus ring
  theme.css            Complete light/dark semantic values and illustration palettes on every route.
                       The root data-theme preference applies to all pages and shared chrome
  <route>/page.tsx     One composer per route: `generateMetadata()` from the document's `seo`, then
                       `await getPage(...)` and sections in order. Every `<main>` is `id="main"`
    about, akashic, akashic/1-0, careers, delivery, solutions, solutions/{eis,life}
    sectors/{education,energy,finance,healthcare,manufacturing,retail,public-sector}
    pricing, in/pricing (India version, see "Regions")
    insights, insights/[slug], customers, customers/[slug], newsroom, newsroom/[slug]
                       (detail routes use generateStaticParams over their collection)
    trust, integrations, glossary, contact, partners, events
    privacy, terms, cookies, accessibility, legal (one LegalDocument layout)
    site-map           The HTML site map (GIGW)
  not-found.tsx        Branded 404 (content/pages/not-found.ts)
  manifest.ts, robots.ts, sitemap.ts, llms.txt/route.ts, insights/rss.xml/route.ts
                       Generated from content (lib/routes.ts for the route list), never by hand
  opengraph-image.png  The default social card

content/               EVERY WORD ON THE SITE. Typed documents, plain data (CONTENT.md)
  types.ts             Shared primitives: Link, Cta, ImageAsset, Seo, PageSection, Eyebrow, TwoTone,
                       Faq, Block (long-form rich text)
  blocks.ts            Reusable section blocks: PageCloseBlock, ProvenAtScaleBlock
  site.ts              Site settings: company facts, offices, inbox, legal line, default SEO; mailto()
  navigation.ts        Header menus, announcement bar, CTA, footer columns and legal row
  ui.ts                Interface microcopy (aria labels, controls, forms, region prompts)
  site-map.ts          The static route list and the /site-map and llms.txt copy
  pages/<page>.ts      One document per page (sectors.ts: the six sector documents + shared template;
                       sectors-map.ts: their map scenes)
  collections/*.ts     insights, press-releases, customer-stories, roles, leaders, events, glossary,
                       integrations, legal

lib/
  content.ts           The content API (server-only): getSiteSettings, getNavigation, getUiStrings,
                       getSiteMap, getPage(key), getSector(slug), and a getter per collection.
                       The one file a CMS integration rewrites
  routes.ts            The full route list: site-map groups plus every collection entry. Feeds
                       sitemap.xml, /site-map and llms.txt
  env.ts               The one reader of process.env (NEXT_PUBLIC_SITE_URL), with defaults
  site.ts              SITE_URL and absoluteUrl()
  metadata.ts          pageMetadata(seo): title, description, canonical, hreflang, Open Graph, Twitter
  region.ts            Regions: REGIONAL_PATHS, basePath, regionPath, regionHref, regionAlternates
  navigation.ts        isCurrentSection / isCurrentPage (the nav's active state)
  richText.ts          outline, readingMinutes, formatDate (en-GB) for Block[] content
  pricing.ts           planPrice(): a plan's monthly price for a term and region
  glossary.ts          groupByLetter() for the /glossary index
  theme.ts             Sitewide appearance preference store and pre-paint bootstrap

hooks/
  usePrefersReducedMotion.ts  Reduced-motion preference as an external store (useSyncExternalStore):
                       false on the server and at hydration. Derive resting state from it
  useCountUp.ts        Scroll-triggered count-up for one string figure. The server HTML carries the
                       real figure. Do not add a second count-up
  useDrawn.ts          True once an element enters view (always under reduced motion). Pairs with
                       `data-drawn` and the `.ad-*` classes
  useOnScreen.ts       True while an element is on screen. Every loop and carousel gates on it (Rule 6a)
  usePageScrollSpy.ts  PageMinimap active state and section jumps
  useMenuIntent.ts     The nav's hover intent: 120ms open, 300ms close grace, click to pin
  useRegion.ts         The visitor's region: the page's own, else the stored choice, else a time-zone
                       guess. chooseRegion() records a choice

components/
  providers/
    UiProvider.tsx     Hands the interface strings to client components (useUi())
  layout/
    Nav.tsx            Server shell: loads navigation and strings, renders nav/NavBar. 72px bar;
                       sticky offsets across the site depend on it. See DESIGN_SYSTEM "Navigation"
    nav/               NavBar (client: hide-on-scroll, menus, drawer), MegaSheet (the one shared
                       desktop sheet), MenuPanel, NavFeatured, MobileNav (dialog drawer),
                       AnnouncementBar, NavIcons
    Footer.tsx         Dark footer (bg-vault): columns and legal row from navigation, company line
                       from site settings, RegionSwitch in the ribbon
    ContactForm.tsx    The "Talk to our team" form (ContactModal and /contact). SIMULATED submit
    ContactModal.tsx   Opens for links to #talk-to-our-team (and #get-started, #briefing-form)
    PageMinimap.tsx    Right-edge section rail, driven by the page's `sections`
    ThemeSwitch.tsx    Light/dark switch on the routes that support it
    OffscreenAnimationGate.tsx  Pauses infinite CSS and SMIL animation off screen (Rule 6a)
    region/            RegionSuggest (the one-time "other version" card) and RegionSwitch

  sections/            Page sections, one file per section
    <page>/            about, akashic, careers, contact, customers, delivery, eis, events, glossary,
                       insights, integrations, legal, life, longform (shared article layout),
                       newsroom, partners, pricing, public-sector, release, sectors (shared sector
                       template), solutions, trust, universal-context (the parts of homepage
                       [02] MeetAkashic), and the six bespoke sector families (education,
                       energy, finance, healthcare, manufacturing, retail)
    *.tsx              The homepage sections (Hero, ProblemSection, MeetAkashic, BuiltOnAkashic,
                       HowWeDeliver, EverySector, TheProof, EnterpriseSecurity, Closure,
                       CareersStrip) and ProvenAtScale, which home, /akashic and /delivery share.
                       See the Home map for the current order

  pages/               Page bodies shared by two routes: PricingPage for /pricing and /in/pricing

  demos/               Animated or interactive pieces used inside sections
    about/ careers/ pricing/   The drawing-page figures (see the About and Careers maps)
    akashic/           AgentRunDrawing, GroundworkDrawing, SolutionWorkflow, ContextTentacles (the
                       /akashic hero's tentacles and module index)
    ProvenStories, DivergentAnswers, AshokaChakra, AkashicFlowConnectors, VoicesDispatches,
    SolutionsOnFoundation (homepage [03])
    mockups/           SIMULATED PRODUCT UI, not real functionality (§8a)
      AkashicModuleMomentsMockup   One moment per module (tease, do not reveal): homepage [02] drives
                                   `ModuleMomentStage`; /akashic/1-0 [01] uses the default export
      AkashicModuleScreensMockup   /akashic hero: the seven module screens, small (tease), with
                                   AkashicScreenKitMockup (chrome, Pipelines and Warehouse screens)
                                   and AkashicBIScreenMockup
      AkashicTeardownMockup        /akashic modular teardown stage
      ProofComparisonMockup        TheProof before/after slider (role="slider", keyboard operable)
      DeliveryFitPreviewMockup     The three small previews under /delivery [06]
      EisBrowserChromeMockup + eis/*   /solutions/eis screens. Each is the evidence for the
                                   caption beside it; change the claim, change the screen
      life/*                       /solutions/life handset and record anatomy

  ui/                  Generic building blocks
    ScrollReveal, ScrollRevealRail (the centred 1440px column), FigureEyebrow (THE eyebrow),
    SectionHeader (THE section header), TwoToneTitle, SectionLink (a section's one onward
    link), SectionCoda, DrawingSetClose, PreviewTag, RegionLink,
    PageHero (hub and resource hero), PageClose (bg-ink closing card, #talk-to-our-team),
    FaqSection (+ FAQPage JSON-LD), JsonLd, RichText (renders Block[]), ShareLinks, SubscribeForm
    (SIMULATED)

  icons/               Static SVG components: AkashicLogo, DhiraLogo, DynamicSketchIcon, CloudProviderLogos

public/                Static files; every one is referenced (ASSETS.md)
docs/                  This documentation
```

## Regions (added 15 Oct 2026)

The founder asked for region-based pages: some specific to India, others for the
US and international visitors. One site serves both audiences:

- A regional page's **international** version keeps its usual path.
- Its **India** version lives at `/in` + path.
- Every page not listed in `REGIONAL_PATHS` (`lib/region.ts`) is one page for
  everyone.

**Live:**
- `/pricing` and `/in/pricing`.
- Confirmed for later: Home, Public Sector, Sectors, Contact and Careers. Akashic,
  About and the rest stay shared.

**What may differ:**
- How a buyer buys: currency, GST, GeM and procurement routes.
- Offices and contact routing.

There is one company (DHIRA Software Labs Pvt. Ltd.) and no US customer proof
yet. The international version never gains invented customers or figures
(Rule 4); it reuses the real proof.

**One body, two routes.**
- A regional page's body lives in `components/pages/` (`PricingPage.tsx`) and
  takes `region`.
- `app/<path>/page.tsx` and `app/in/<path>/page.tsx` only load content, set
  metadata and pass the region.
- Copy that differs by region is keyed by region in the page's document
  (`Record<Region, ...>`).

**Metadata.** `pageMetadata({ ...seo, region })` sets the version's own
canonical, the hreflang alternates (`en`, `en-IN`, and `x-default` for
international) and the Open Graph locale.

**Links.**
- Use `ui/RegionLink` (a drop-in for next/link) for internal links in shared
  chrome.
- It resolves a regional path to the visitor's region: the page's own, else
  their stored choice, else the device time-zone guess (`hooks/useRegion`).
- Every other href passes through unchanged.
- The nav works on `basePath(pathname)`, so `/in/pricing` marks the same items as
  `/pricing`.

**Never redirect.**
- `layout/region/RegionSuggest` offers the other version once, until the visitor
  picks one. Its offer line per path is `ui.region.offers` in `content/ui.ts`.
- `layout/region/RegionSwitch` in the footer changes the region at any time.
- A forced redirect would hide one version from crawlers and trap travellers and
  VPN users.

**Adding a regional page:**

1. Move its body to `components/pages/`.
2. Add `app/in/<path>/page.tsx`.
3. Add the path to `REGIONAL_PATHS`, and its offer line to `ui.region.offers`.
4. Pass `region` to `pageMetadata` on both routes. Keep `<main id="main">`.

`app/sitemap.ts` and `/site-map` list the India URL with hreflang automatically.

## Section Maps

Backgrounds, ids, and per-section intent. Eyebrow numbering `[NN]` is deliberate
(renumber only when a section is inserted or removed, and update this map in the same change).

### Home (`app/page.tsx`)

Every numbered section uses the section grammar (DESIGN_SYSTEM §3): the shared
eyebrow rail and header, and no next-section or section-foot buttons (removed
20 Oct 2026, founder). Copy lives in `content/pages/home.ts`.

| Order | ID | File | Background | Notes |
|---|---|---|---|---|
| — | nav | `layout/Nav.tsx` + `layout/nav/` | `bg-background`, solid | Announcement bar above it scrolls away. Hides on scroll down, shows on up |
| 00 | hero | `sections/Hero.tsx` | `bg-background` | Rotating "Answers are easy" headline on a dot grid, platform badge, the page's first CTA pair |
| 01 | problem | `sections/ProblemSection.tsx` + `demos/DivergentAnswers` | `bg-background` | "You asked for one number. / You got three." Header, then the industry record (left) beside the three answers (right), then the verdict as the section's last line. No bridge button |
| 02 | platform | `sections/MeetAkashic.tsx` + `universal-context/` (UCHero, UCFeatureIcon, UCModules) + `demos/mockups/AkashicModuleMomentsMockup` (`ModuleMomentStage`) | `uc-bg` | The orb intro ("Meet Akashic", one CTA) with the five capabilities as a lined strip INSIDE the dome (21 Oct 2026, so the first fold says what Akashic does; a curved arrangement was rejected the same day), then "Seven modules, one platform": the modules as a timed rail on the left, each module's drawing and plain caption on the right, the lead-in to [03]. The particle "Ask why a number moved" demo it replaced is in `.archive/removed-2026-10-21/`. The eyebrow aligns with every other rail; below it the section is full bleed. "Nothing to rip out" and "Seven modules" removed 20 Oct 2026 (founder); a shorter rebuild was rejected the same day (user): do not cut further without asking |
| 03 | solutions | `sections/BuiltOnAkashic.tsx` + `demos/SolutionsOnFoundation` | `bg-background` | "Problems we already solve. / Off the shelf, on your data." The solutions are the point (user, 21 Oct 2026); "running on Akashic" is the lede's second beat and the drawing's job: the solutions stand on an Akashic base and the active one fans into the modules it uses. The fourth, dashed block is "Your own process", the bridge into [04]. Module use from the mapping shared with /akashic and /solutions |
| 04 | delivery | `sections/HowWeDeliver.tsx` | Page ground with `anchor` panel | Same delivery composition, using a solid pastel-blue panel in light mode and midnight in dark. Three opaque service cards, crisp borders, no shadow, glow or texture (21 Oct 2026). Header "Need it built for you? / Our engineers plan and build it." under the eyebrow "Our services": the problems only the reader has, with or without Akashic (user, 21 Oct 2026: earlier headers sounded obsessed with Akashic). The three cards are the nav's three service lines (Strategic Advisory, Engineering at Scale, AI Solutions and Accelerators), each linking to its /delivery anchor |
| 05 | sectors | `sections/EverySector.tsx` | `bg-background` | "Whatever your sector, / we know the work." Six industry tabs with photography; each photo headline fits one line at every width (22 characters or fewer); legacy sector hashes; Public Sector link |
| 06 | proof | `sections/TheProof.tsx` + `demos/mockups/ProofComparisonMockup` | `bg-background` | "Same team. Same data. / Less reconciling, more deciding." Before/after slider (stays by direction, 23 Jul 2026) |
| 07 | scale | `sections/ProvenAtScale.tsx` | `bg-background` | Shared with /akashic and /delivery. Deployment carousel, chakra ornament beside the header |
| 08 | voices | `sections/Voices.tsx` | flat `band` | "Ask the people who run it. / In their own words." Draft dispatches |
| 09 | governance | `sections/EnterpriseSecurity.tsx` | `bg-background` | "Your data stays yours. / Governed inside your walls." Rising curve, four figures, certification bar |
| 10 | get-started | `sections/Closure.tsx` | closing card | Centred close with the page's second CTA pair |
| — | careers | `sections/CareersStrip.tsx` | `bg-background` | Unnumbered eyebrow "Careers"; roles from the collection; not in the minimap |
| — | footer | `layout/Footer.tsx` | `vault` | Link columns |

### Akashic (`app/akashic/page.tsx`)

The nav's Platform menu (content/navigation.ts, redrawn 15 Oct 2026) links here: its
Foundation, Intelligence and Trust categories to the span ids `AkashicModules`
renders (`#data-pipelines`, `#master-data`, `#data-warehousing`,
`#business-intelligence`, `#ask-ai`, `#machine-learning`, `#governance`) and to
`#trust` and `#open`; its Intelligence list's "AI agents · Preview" row
to `#agents`. Rename any of these ids
and the nav breaks silently: update content/navigation.ts in the same change.

| Order | ID | File | Background |
|---|---|---|---|
| 00 | hero / platform-screens | `akashic/AkashicHeroQuote.tsx` (`AkashicHero` + `AkashicShowcase`) | `bg-background` / flat `band` sticky quote layer (matches [07]). "The intelligence layer / behind every decision." No figures in the hero. `AkashicShowcase` renders `AkashicModuleScreensMockup`: the seven module screens at about 0.56 scale, fading out, with the context tentacles beneath as the module index (restored 20 Oct 2026 on the founder's request; the moments moved to homepage [02]) |
| 01 | akashic-in-action | `akashic/AkashicFourMoves.tsx` | `bg-background`. Full-width eyebrow rail over two columns. "Why the number moved, / answered in seconds." From lg the h2 size tracks the column (`clamp`). Its "See what's underneath" button went 20 Oct 2026 (no next-section buttons) |
| 02 | how-it-works | `akashic/AkashicModular.tsx` | `bg-primary-bg` (exploded platform scroll scene). Headline (in `AkashicTeardownMockup`, eyebrow `bare` over the pinned scene) "Start with one module. / Grow into the platform."; its close lost the button that pointed at [03]. [01] Ask into [02] the modules is the page's opening sequence (user, 14 Oct 2026): do not put another section between them |
| 03 | architecture | `akashic/AkashicArchitecture.tsx` | `bg-background`; `ui/SectionHeader` with a one-line title, "Deploy where your data has to live." |
| 04 | modules | `akashic/AkashicModules.tsx` | White; "Seven modules. / Nothing to stitch together." Compact architecture schematic with three labelled layers, module capabilities and shared governance. Pipelines and Master Data carry an AI agent line with a `PreviewTag`; the coda ("Agents, in preview. The groundwork they need, already live.") hands off to [05]. Heading and introduction left-aligned. Module links open [10] entries |
| 05 | agents | `akashic/AkashicAgents.tsx` + `demos/akashic/AgentRunDrawing.tsx` | White, `border-t`. Added 14 Oct 2026 from the founder's agents section. "Agents do the legwork. / People make the call." One drawing: a six-step run (Ask, Plan, Retrieve, Verify, Approve, Record) under three lane brackets (agents dashed blue, a person ink, the record solid blue); each of his eight named agents hangs from the step it works in, the Approve column holds no agent ("No agent signs off."), and the golden-record steward and pipeline monitor run under every run. Placed after the foundation and before [06] Trust. `PreviewTag` on the label; flip `AKASHIC_AGENTS.preview` when agents ship. Claims rules applied to his copy are in the `AKASHIC_AGENTS` comment |
| 06 | trust | `akashic/AkashicTrust.tsx` | White; "Put AI to work. / Keep control of your data." Restored four privacy cards with compact illustrations and control badges |
| 07 | open | `akashic/AkashicOpenFoundations.tsx` | Flat `#F1F5FE`; "No lock-in. / Your data, your formats, your call." Restored four principles: modular, inspectable, extensible and portable |
| 08 | build-vs-buy | `akashic/AkashicBuildVsBuy.tsx` + `demos/akashic/GroundworkDrawing.tsx` | White; one drawing (30 Sep 2026), ending on its measure line (the "Map your first use case" button went 20 Oct 2026). Four use cases (dashboards, forecasts, AI answers, AI agents in preview) built project by project, groundwork hatched and rebuilt per column, against Akashic, groundwork laid once as a solid blue band. Four numbered pins key one-line CFO, CIO/CTO, CDO/AI and CEO/COO seats listed beneath; one measure line with the CTA. Replaced a lifecycle strip, comparison table and four executive cards. Legacy anchor retained |
| 09 | scale | `sections/ProvenAtScale.tsx` | `bg-white` (reused, id="scale"). On /akashic: eyebrow "In production", title "Proven at national scale. / Ready for your organisation." (`title` accepts a node). Keeps its own sourced figures; the founder's programme figures are leadership track record and are not used here |
| 10 | stack | `akashic/AkashicStack.tsx` | `bg-depth`; compact expandable module index with light specification sheets, grouped connectors and adjacent capability qualifiers. First open; addressable `#reference-*` anchors. Carries the founder's per-module figures: Pipelines 25 built-in transforms, BI 61 data sources and 50+ chart types, Governance 80+ metadata connectors |
| 11 | solutions | `akashic/AkashicPlatform.tsx` + `demos/akashic/SolutionWorkflow.tsx` | White. "Ready-made for one process. / Live on the foundation you already run." Owns the configuration claim, NOT [08]'s "groundwork once" (the old "One foundation" headline and foundation strip restated [08] and were removed). One sheet in [08]'s grid language: an axis column, then Enterprise Intelligence, IPMS and Akashic Life side by side (category, audience, claim, three-step glyph workflow, one note). Below, on the `panel` band, the seven modules run as unbroken lines under every column: blue node = switched on, hollow ring = available, a blue spine joins each solution's modules. Desktop rows align through CSS `subgrid` (`.ak-config-*` in akashic-story.css); below lg each solution stacks with only its own modules. Module use per solution is sourced in the `AKASHIC_SOLUTIONS` comment (Rule 4). No autoplay, no simulated screens. The nav's Solutions featured card links here |
| 12 | faq | `akashic/AkashicFaq.tsx` | White, `border-t`. Added 14 Oct 2026, the founder's FAQ re-cut (`AKASHIC_FAQ`): "Questions leaders ask. / Answered plainly." Six questions as an open two-column list on hairlines (no accordion) plus FAQPage JSON-LD. Every answer restates a claim the page already makes |
| 13 | talk-to-our-team | `akashic/AkashicClose.tsx` | White with `bg-depth` closing card; "See what your data / can decide." (the founder's closing line); question, data and first-step agenda; existing contact modal via `#get-started` |

Sections [04–08], [10–12] and the close use `akashic/AkashicStory.tsx` (`StoryLabel` renders `ui/FigureEyebrow`) and
page-scoped `akashic/akashic-story.css` (23 Sep 2026 redesign). All copy, the
section index and the module sheets that [04] and [10] read live in
`content/pages/akashic.ts` (the `akashic` document). 14 Oct 2026: [05] Agents and [12] Questions were inserted and later
sections renumbered (eyebrows, the document's `sections`, the `scale` block's `number`). Security certification
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

**The sections below the hero read as a set of engineering drawings** in one
line language: hairline strokes, mono labels on leaders, blue for what exists
today, dashed for what does not yet. Each section opens with the site's eyebrow
rail (`AboutHeading`, or `AboutSection`'s `eyebrow` where the heading sits
beside a drawing, so the rail still runs full width). Shared parts:
`ui/FigureEyebrow`, `ui/SectionCoda`, `hooks/useDrawn` + the `.ad-*` classes,
`about/AboutSection.tsx` and `about/about-page.css`; copy in
`content/pages/about.ts`. No visible copy uses a hyphen or a dash. The hero is
a centred, text-only opening over an original landscape photograph
(provenance in ASSETS.md). [05] Culture's invitation ends on a text link, not a
button.

| Order | ID | File | Background | Drawing |
|---|---|---|---|---|
| 00 | hero | `about/AboutHero.tsx` | Photographic sky and green hills, fading to white | Centred company copy, two actions and an unboxed proof row. No diagram. Landscape extends behind the navigation. Desktop description uses one sentence per line. |
| 01 | why-we-exist | `about/AboutConviction.tsx` + `demos/about/ThreadConvergence.tsx` | `bg-background` | Three concise beliefs beside the original thread drawing: records, documents and streams converge into governed data, with blue AI threads growing from that foundation. |
| 02 | journey | `about/AboutJourney.tsx` + `demos/about/JourneyLayers.tsx` | `bg-background` | "Eight years of layers. / One foundation." One complete terraced figure with cumulative native scrolling. From 1200 × 820, when the measured stage fits, the stage pins at 88px and adds one year per 150px of scroll (1350px travel including the final hold). Reverse scrolling retraces the record. The stationary reading area carries the year, headline and explanation. Show all years removes the pin while preserving position. Each layer carries a 17px Google Sans title and 13px mono year on one line, with no supporting subtitle. The year is kept beside its title for context. The calendar ruler uses 12px type and the era captions use 11px; the founding label reserves 208px against the actual historical span. Trusted context, scoped action and human authority are explained inside the right-hand dashed horizon, explicitly an ambition with no release date. **User-restored composition:** no separate Read the full timeline disclosure and no future text block below the figure. Below 1024px, the complete emblem precedes a chronological ledger of titles and years, with historical descriptions for assistive technology and the future principles visible; the ledger is screen-reader-only on desktop. Short viewports and reduced motion show the completed figure without pinning. Without JS, the ledger is visible at every width. The 2025 recognition remains the coda. Content: `content/pages/about.ts` (`journey`). |
| 03 | vision | `about/AboutVision.tsx` + `demos/about/SiloLayer.tsx` | `bg-depth` (the page's one dark section) | Elevation: fourteen systems on one ground, each labelled by a public function any government runs; the layer is solid over the three live programmes (education, health, labour; homepage figures, generic names, tagged India in the key) and dashed elsewhere. Headline is jurisdiction agnostic ("intelligence as public infrastructure"): India is the proof, never the market. No Western deployment is implied. Legend keyed to the drawing |
| 04 | people | `about/AboutPeople.tsx` | `bg-background` | Five framed monochrome portraits follow a fine flowing line, with the founder centred and larger. AI-enhanced 1122 × 1402px derivatives of the existing photographs replace the enlarged cutouts. Sources, prompts and final asset paths: ASSETS.md. Roles and responsibilities replace draft quotes. Mobile places the founder first and the other leaders in two columns. |
| 05 | culture | `about/AboutCulture.tsx` + `demos/about/KolamCulture.tsx` | `bg-background` (`lg:py-20`) | "A kolam has three rules. / So do we." The page's one answer to why work here. Heading on the left (lede one line from `xl`), a kolam emblem on the right that draws a FIGURE each run: People (heart) first, then AI, Governance (pillared building), Security (padlock), Data (database cylinder). The line is the page's blue thread at the weight of [01]'s threads, over small ink dots, drawn by an ink pen (a heavy black lattice read as cold, 7 Oct 2026). The lede is a full sentence for newcomers: "Every morning, South Indian homes draw a kolam at the doorstep: one line around every dot." The dots are laid out in the figure, so one closed mirror curve looped around them traces its outline; inside it runs as a regular diagonal weave with a mirror only where loops had to join (each figure verified as ONE line). One pen draws it without lifting from a blue start; the figure's name appears as the line closes; "Draw another" moves to the next ("Same rules, any shape."). Below, the three rules in one row, two tone titles (grey kolam rule over ink team rule); hovering a rule replays it on the figure. Then the invitation as its own band, unnumbered so the three rules stay three: "Find your seat." with a "See where you fit" button and the teams people join in a 2 × 2 grid of groups (Build, Discover, Foundations, Ways in). No count and no link to the roles collection; no location or work mode claims; national systems stay with journey and vision. Replaced the 7 × 7 plate on 7 Oct 2026 (too complex, formed no shape, pushed text to the edges). Copy is a DRAFT for review. |
| 06 | talk-to-our-team | `about/AboutClose.tsx` | `bg-background`, inset `bg-depth` | Two-column close: contact first, careers second, with office locations. Stacks on mobile. Carries `#careers` / `#join-us`. |

`about/AboutMotion.tsx` wraps this page and coordinates native Web Animations reveals and restrained hero scroll depth. All motion respects reduced preferences, including changes during a visit. The journey owns its cumulative scroll reveal and hover lineage, independent of the page reveal controller; its content has a complete static reading alternative. The vision uses the same `AboutHeading` as conviction, leadership and contact; its old rail and duplicate reveal wrappers are removed. Culture [05] was inserted before the close on 5 Oct 2026; the close is now [06].

Retired 16 Oct 2026 (dead-code cleanup): the unrendered About sections and drawings (`AboutWhatWeBuild`, `SystemSection`, `SurveyScale`, `JourneyExplorer`, `GrowthRings`, `AboutBeliefs`, `AboutCareers`, `AboutHow`, `AboutPointOfView`, `AboutWhoWeServe`, `AboutProof`, `AboutWhy`). They are in git history before that date.

### Careers (`app/careers/page.tsx`)

⚠ Apply links anchor to `#talk-to-our-team` — wire a real careers inbox/ATS
before ship.

**Runs the same drawing language as `/about`** (rebuilt 22 Sep 2026): hairline
strokes, mono 11px labels, blue for what is live, dashed for what is not yet,
`ui/FigureEyebrow.tsx` + `hooks/useDrawn.ts` + the `.ad-*` classes. Figures
live in `components/demos/careers/`. No visible copy carries a hyphen or dash,
which is why the culture principles read `W01`…`W06`.

The four open roles are ONE source, the roles collection
(`content/collections/roles.ts`): the hero's seating plan, this page's board
(the canonical one) and the homepage CareersStrip all read it. Add or close a
role there and every surface follows.

| Order | ID | File | Background | Drawing |
|---|---|---|---|---|
| 00 | hero | `careers/CareersHero.tsx` + `demos/careers/SeatingPlan.tsx` | `bg-background` | The team's table in plan, cut by break lines at both ends (a countable plan would be a headcount claim); the four open roles are empty blue chairs. Vertical on phones |
| 01 | the-work | `careers/CareersImpact.tsx` + `demos/careers/ReachArcs.tsx` | `bg-background` | Arcs of consequence from one branch to a country, landing on the three national programmes with one public record figure each |
| 02 | how-we-work | `careers/CareersCulture.tsx` | soft blue band (Rule 5a) | Six candid questions, ALL on screen, each joined to its answer by a blue elbow and pinned to a working principle (W01 to W06, which live only here; the old link to /about opinions was removed). Fresher / Experienced toggle swaps the set |
| 03 | open-roles | `careers/CareersRoles.tsx` | `bg-background` | The board: the hero's four chairs as rows, chair glyph included; each whole row is the Apply target. Department filter chips were removed (four roles, up to three hidden behind a click) |
| 04 | how-we-hire | `careers/CareersHiring.tsx` + `demos/careers/HiringLoop.tsx` | `bg-background` | The loop drawn BOTH ways (we learn about you above, you learn about us below) forking into a drawn yes AND a drawn no: that fork is how "no ghosting" is shown rather than claimed |
| 05 | talk-to-our-team | `careers/CareersClose.tsx` | `bg-background`, `bg-ink` card (Rule 5b) | Title block matching the /about close, stamped with the hero's empty chair |

`demos/LineArtBust.tsx` (the old hiring scenes) was retired on 16 Oct 2026
with the unrendered About sections that imported it.

### Solutions hub (`app/solutions/page.tsx`, added 14 Oct 2026)

The founder's Solutions section (DHIRA_ai_Website_v2, 12 Oct 2026) as an
**editorial register** (user-approved over his card gallery): hairline-ruled
rows, numbered points, no cards, no checkmarks, no simulated screens. It exists
so every nav link has a destination: "All solutions", `#ipms` (IPMS has no page
yet) and `#function-<slug>`. Copy is DRAFT in `content/pages/solutions.ts`, the
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

### Resource pages (added 15 Oct 2026)

The pages an enterprise site of DHIRA's calibre carries and this one lacked (gap
list measured against 26 competitor and leading sites, 15 Oct 2026). They share
ONE grammar, the /solutions hub's user-approved editorial register: `ui/PageHero`
(text-only, on-page index), `ui/SectionHeader` sections on hairline registers
and ruled columns (no cards on grey, no checkmarks, no carousels), one soft blue
band per page (Rule 5a), and `ui/PageClose` (Rule 5b). Long-form pages (articles,
stories, press releases) share `sections/longform/LongformArticle`; policy pages
share `sections/legal/LegalDocument`. Copy is typed content in `content/`, much of it
DRAFT for the founder (each file's header lists what is his, what is drafted,
and what needs confirming). No prices, counts or customer names are invented
(Rule 4). Every page is registered in `content/site-map.ts`.

| Route | Sections (ids) | Blue band | Notes |
|---|---|---|---|
| `/pricing` (+ `/in/pricing`) | plans · compare · included · deployment · services · how-to-buy · faq · talk-to-our-team | deployment | No hero (user, 15 Oct 2026): [01] Plans opens the page and carries the h1, the term switch (monthly / 1 year / 3 years) and the region line. The founder's four plans with PLACEHOLDER prices (`LIST_USD` in content/pages/pricing.ts; INR on /in/pricing) and the pricing workbook's limits. Body in `components/pages/PricingPage` (regions). `PlanFigure` draws capacity per plan; compare marks are drawn nodes and rings |
| `/insights`, `/insights/[slug]` | hero · latest · subscribe · close | subscribe | Six DRAFT articles in `content/collections/insights.ts`, team bylines (no executive quoted). RSS at `/insights/rss.xml`; BlogPosting + BreadcrumbList JSON-LD |
| `/customers`, `/customers/[slug]` | hero · stories · close | none | The three ProvenStories deployments, now read from `content/collections/customer-stories.ts` by the carousel too. Naming and analytical-claims rules unchanged |
| `/newsroom`, `/newsroom/[slug]` | hero · announcements · recognition · media-kit · talk-to-our-team | media-kit | Akashic 1.0 release (founder's own quote), the three real recognitions, marks in `public/brand/`, leadership portraits from `ABOUT_LEADERS` |
| `/trust` | hero · security · privacy · responsible-ai · compliance · documents · subprocessors · disclosure · faq · talk-to-our-team | responsible-ai | Controls by domain from the founder's eight; frameworks repeat the homepage [07] set; document requests are mailto subjects |
| `/integrations` | hero · directory · how-it-connects · talk-to-our-team | how-it-connects | Connectors read from `AKASHIC_MODULES` (the /akashic [10] sheets), so the two pages cannot drift. Client filter |
| `/glossary` | hero (A to Z index) · terms · close | none | Term ids are linkable anchors (`/glossary#entity-resolution`); DefinedTermSet JSON-LD |
| `/contact` | hero · write-to-us · routes · offices | write-to-us | `layout/ContactForm` inline; other routes are subject-lined mailto links to the one published inbox |
| `/partners` | hero · ways-to-partner · what-partners-get · how-to-join · talk-to-our-team | how-to-join | No partner named until one is confirmed |
| `/events` | hero · upcoming · invitations · close | invitations | Only real events: the launch (Event JSON-LD) and the founder's standing walkthrough |
| `/akashic/1-0` | hero · generally-available · in-preview · where-it-runs · talk-to-our-team | where-it-runs | [01] opens with the module moments above the register; modules read from the /akashic data; agents carry PreviewTag; launch countdown. Flip `RELEASE.live` on 1 Nov |
| `/privacy`, `/terms`, `/cookies`, `/accessibility`, `/legal` | header · document · other policies | none | DRAFT FOR LEGAL REVIEW (`content/collections/legal.ts`); replace the footer's old dead anchors |
| `/site-map`, 404 | hero · groups | none | Site map from `lib/routes.ts` (content/site-map.ts + the collections) + India versions; the 404 routes to six destinations |

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

**Section [03]'s id is `capabilities`, not `the-brief`**: `content/pages/solutions-eis.ts`
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

### Dynamic imports (perf)
Do not `ssr:false` a content section: it would drop from the server HTML and
hurt SEO and CLS. Only a purely decorative canvas may load that way.

### `ui/ScrollRevealRail.tsx`
The rail draws nothing since 15 Oct 2026 (its edge lines and gold trail were
removed on every page, user; `.rail-container` and `.ak-story-wrap` lost their
`border-x` the same day). It is still a 1440px column, so a section inside it
**must not** carry a `w-screen` rule (it overflows the body). If a section needs
edge-to-edge rules, take it out of the rail entirely. Do not bring edge lines
back without direction.
