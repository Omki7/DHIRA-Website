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
                       Google Sans Mono), ContactModal, RegionSuggest, OffscreenAnimationGate, HashLanding
  page.tsx             Home composer
  globals.css          Tailwind layers, component classes, keyframes, focus ring
  theme.css            Complete light/dark semantic values and illustration palettes on every route.
                       The root data-theme preference applies to all pages and shared chrome
  <route>/page.tsx     One composer per route: `generateMetadata()` from the document's `seo`, then
                       `await getPage(...)` and sections in order. Every `<main>` is `id="main"`
    about, akashic, akashic/1-0, careers, services, solutions,
    solutions/{enterprise-intelligence,life}   (redirects: /delivery, /solutions/eis; next.config.mjs)
    sectors/{education,energy,finance,healthcare,manufacturing,retail,public-sector}
    pricing (US dollars only; no India version since 21 Oct 2026, see "Regions")
    insights, insights/[slug], customers, customers/[slug], newsroom, newsroom/[slug]
                       (detail routes use generateStaticParams over their collection)
    glossary, contact, partners (trust, integrations and events were removed 21 Oct 2026;
                       their files are in .archive/removed-2026-10-21/)
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
  collections/*.ts     insights, press-releases, customer-stories, roles, leaders, glossary, legal

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
  pricing.ts           planPrice(), listPrice(), yearlySaving(): a plan's US dollar prices on a term
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
  useTour.ts           A figure that walks its items on its own (/services [02], [03]): a dwell clock
                       as a framer-motion `progress` value that fills 0 → 1, frozen off screen and
                       while pointer or focus is inside, stopped by a pick or a link until Play
                       (Rules 6a, 6b); never runs under reduced motion
  useHashTarget.ts     Which of a list of ids the URL hash points at (also same-page link clicks)
  useMinWidth.ts       Viewport at least N px wide, as an external store (true on the server)

components/
  providers/
    UiProvider.tsx     Hands the interface strings to client components (useUi())
  layout/
    Nav.tsx            Server shell: loads navigation and strings, renders nav/NavBar. 72px bar;
                       sticky offsets across the site depend on it. See DESIGN_SYSTEM "Navigation"
    nav/               NavBar (client: hide-on-scroll, menus, drawer), MegaSheet (the one shared
                       desktop sheet), MenuPanel, NavFeatured, MobileNav (dialog drawer),
                       AnnouncementBar, NavIcons
    Footer.tsx         Footer (bg-vault): columns and legal row from navigation, company line
                       from site settings, RegionSwitch in the ribbon while a page has an India
                       version (none today). What earns a footer link:
                       the audit note above the footer columns in content/navigation.ts
    ContactForm.tsx    The "Talk to our team" form (ContactModal and /contact). SIMULATED submit
    ContactModal.tsx   Opens for links to #talk-to-our-team (and #get-started, #briefing-form)
    PageMinimap.tsx    Right-edge section rail, driven by the page's `sections`; fades out over the footer
    ThemeSwitch.tsx    Light/dark switch on the routes that support it
    OffscreenAnimationGate.tsx  Pauses infinite CSS and SMIL animation off screen (Rule 6a)
    HashLanding.tsx    Re-lands a #hash link while the page settles (a pinned section grows
                       after hydration); lets go on the first scroll, tap or key
    region/            RegionSuggest (the one-time "other version" card) and RegionSwitch

  sections/            Page sections, one file per section
    <page>/            about, akashic, careers, contact, customers, services, eis, glossary,
                       insights, legal, life, longform (shared article layout),
                       newsroom, partners, pricing, public-sector, release, sectors (shared sector
                       template), solutions, universal-context (the parts of homepage
                       [02] MeetAkashic), and the six bespoke sector families (education,
                       energy, finance, healthcare, manufacturing, retail)
    *.tsx              The homepage sections (Hero, ProblemSection, MeetAkashic, BuiltOnAkashic,
                       HowWeDeliver, EverySector, TheProof, EnterpriseSecurity, Closure,
                       CareersStrip) and ProvenAtScale, which home, /akashic and /services share.
                       See the Home map for the current order

  pages/               Page bodies kept apart from their route: PricingPage for /pricing

  demos/               Animated or interactive pieces used inside sections
    about/ careers/    The drawing-page figures (see the About and Careers maps)
    pricing/           CapacityLine, the stepped line across the /pricing plan frame
    delivery/          DeliveryRoute (Services hero: your systems, one team, in production), ServiceDrawing
                       (the three service-line drawings in the homepage [03] idiom), sources.ts (source colours)
    akashic/           AgentRunDrawing, GroundworkDrawing, SolutionWorkflow, ContextTentacles (the
                       /akashic hero's tentacles and module index)
    ProvenStories, DivergentAnswers, AshokaChakra, AkashicFlowConnectors, VoicesDispatches,
    SolutionsOnFoundation + SolutionIllustration (homepage [03])
    mockups/           SIMULATED PRODUCT UI, not real functionality (§8a)
      HomeHeroTeasersMockup + HomeModuleIllustrationsMockup   Homepage hero only: seven native-size
                                   React product fragments around the centred pitch on desktop;
                                   a scrollable strip below it on smaller screens. One focal result
                                   per module, varied surfaces and Motion entrances that play once.
                                   Copy in hero.illustrations
      AkashicModuleMomentsMockup   One moment per module (tease, do not reveal): /akashic/1-0 [01]
                                   uses the default export. `ModuleMomentStage` has no caller since
                                   23 Oct 2026 (the rail that drove it is in .archive/removed-2026-10-23/)
      AkashicOutcomeCardsMockup    Homepage [02]: one outcome card per module (role, typed question,
                                   answer, drawing, provenance) in the fan. Copy in platform.showcase
                                   (type OutcomeShowcase in content/pages/akashic.ts).
                                   Replaced AkashicModuleScreensMockup + AkashicScreenKitMockup +
                                   AkashicBIScreenMockup (22 Oct 2026; unused, to archive)
      AkashicTeardownMockup        /akashic modular teardown stage. Since 26 Oct 2026 each module's plate
                                   carries AkashicPlateScreensMockup over the hidden abstract sketch the
                                   scroll code drives
      AkashicPlateScreensMockup    The teardown plate faces: one monotone crop of the product per module
                                   at plate size (536 × 376): panel header with breadcrumb and view tabs,
                                   one canvas (run graph, customer hierarchy with stewardship, schema diagram, forecast, cited
                                   answer, dashboard tiles), status bar. No app chrome, no colour
      ProofComparisonMockup        TheProof before/after slider (role="slider", keyboard operable)
      EisBrowserChromeMockup + eis/*   /solutions/enterprise-intelligence screens. Each is the evidence for the
                                   caption beside it; change the claim, change the screen
      life/*                       /solutions/life handset and record anatomy

  ui/                  Generic building blocks
    ScrollReveal, ScrollRevealRail (the centred 1440px column), FigureEyebrow (THE eyebrow),
    SectionHeader (THE section header), TwoToneTitle, SectionLink (a section's one onward
    link), SectionCoda, DrawingSetClose, PreviewTag, RegionLink,
    PageHero (hub and resource hero), PageClose (bg-ink closing card, #talk-to-our-team),
    FaqSection (+ FAQPage JSON-LD), JsonLd, RichText (renders Block[]), ShareLinks, SubscribeForm
    (SIMULATED), RotatingPhrase (the hero phrases), MotionToggle (the pause control for
    anything that advances by itself)

  icons/               Static SVG components: AkashicLogo, DhiraLogo, DynamicSketchIcon, CloudProviderLogos,
                       ConnectorLogo (the grey connector marks in the /akashic reference)

public/                Static files; every one is referenced (ASSETS.md)
docs/                  This documentation
marketing/             Not part of the site build (ignored by knip; no TypeScript)
  akashic-film/        The Akashic marketing film: an HTML composition rendered frame by frame
                       to MP4, with its own package.json. Its README has the script and build
```

## Regions (added 15 Oct 2026)

The founder asked for region-based pages: some specific to India, others for the
US and international visitors. One site serves both audiences:

- A regional page's **international** version keeps its usual path.
- Its **India** version lives at `/in` + path.
- Every page not listed in `REGIONAL_PATHS` (`lib/region.ts`) is one page for
  everyone.

**Live:** none. `/in/pricing` was the first regional page; it was removed on
21 Oct 2026 when pricing became US dollars only (user), and `REGIONAL_PATHS`
is empty. The routing below stays for the next regional page; while the list
is empty the footer hides its region switch and the suggestion card never
shows. Confirmed for later at the time: Home, Public Sector, Sectors,
Contact and Careers. Akashic, About and the rest stay shared.

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
| 00 | hero | `sections/Hero.tsx` + `demos/mockups/HomeHeroTeasersMockup` | `bg-background` | Rotating "Answers are easy" headline, platform badge and the first CTA pair, surrounded by seven executive-facing module illustrations (22 Oct 2026, Vistiq reference). Master Data shows a business hierarchy; Business Intelligence shows performance charts. No app chrome. Desktop places the snapshots around the pitch; smaller screens use a scrollable strip below the copy. Figures are labelled illustrative. The /akashic hero remains unchanged |
| 01 | problem | `sections/ProblemSection.tsx` + `demos/DivergentAnswers` | `bg-background` | "You asked for one number. / You got three." Header, then one composition under one hairline: the three answers (right, 600px from xl) framed on the left by the industry record (top, level with the question) and the verdict (foot, level with "Which number do you act on?"; the section's last line). No bridge button |
| 02 | platform | `sections/MeetAkashic.tsx` + `universal-context/` (UCHero, UCCapabilities, UCFeatureIcon) + `demos/mockups/AkashicOutcomeCardsMockup` + `demos/akashic/ContextTentacles` | `uc-bg` | Since 23 Oct 2026 (user: swapped with the /akashic hero's treatment, content and tagline unchanged): the centred intro ("Meet Akashic", one CTA), then the outcome cards in the fan with the context tentacles as the module index (captions are the section's own module lines, from `platform.showcase`), then the five capabilities as one lined strip. The dome and the module rail with its drawings went to /akashic; the "Seven modules share one platform" heading went with the rail. The eyebrow aligns with every other rail; below it the fan and the strip's hairline run wide. "Nothing to rip out" and "Seven modules" removed 20 Oct 2026 (founder): do not cut further without asking |
| 03 | solutions | `sections/BuiltOnAkashic.tsx` + `demos/SolutionsOnFoundation` + `demos/SolutionIllustration` | `bg-background` | "Problems we already solve. / Off the shelf, on your data." Three open product columns with content-specific process drawings: invoices, timesheets and opportunities revising a rolling forecast; a tender requirement linked to bid evidence for human review; an offline antenatal visit carried into the same record at the health centre. The generic document/circle/badge illustrations were rejected (user, 21 Oct 2026). Drawings are static, follow both appearances and have accessible summaries in `home.solutions`; quantitative curves and sample tender evidence are labelled illustrative. All three connect to one Akashic base listing all seven modules. All solutions use the complete platform; no module subsets or cycling selection. Tablet rows place drawing beside copy; mobile stacks above the same base. [04] owns bespoke delivery. Module names shared with /akashic |
| 04 | delivery | `sections/HowWeDeliver.tsx` | Page ground with `anchor` panel | Same delivery composition, using a solid pastel-blue panel in light mode and midnight in dark. Three opaque service cards, crisp borders, no shadow, glow or texture (21 Oct 2026; textures and re-tuned palettes tried on 28 Oct 2026 were rejected, DESIGN_SYSTEM §4). Header "Need it built for you? / Our engineers plan and build it." under the eyebrow "Our services": the problems only the reader has, with or without Akashic (user, 21 Oct 2026: earlier headers sounded obsessed with Akashic). The three cards are the nav's three service lines (Strategic Advisory, Engineering at Scale, AI Solutions and Accelerators), each linking to its /services anchor |
| 05 | sectors | `sections/EverySector.tsx` | `bg-background` | "Whatever your sector, / we know the work." Six industry tabs with photography that rotate on their own like [02]'s modules (22 Oct 2026): the selected tab's line fills blue and the next sector takes over as it lands; held off screen and under keyboard focus, off under reduced motion; each photo headline fits one line at every width (22 characters or fewer); legacy sector hashes; Public Sector link |
| 06 | proof | `sections/TheProof.tsx` + `demos/mockups/ProofComparisonMockup` | `bg-background` | "Same team. Same data. / Less reconciling, more deciding." Before/after slider (stays by direction, 23 Jul 2026) |
| 07 | scale | `sections/ProvenAtScale.tsx` | `bg-background` | Shared with /akashic and /services. Deployment carousel, chakra ornament beside the header |
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
| 00 | hero | `akashic/AkashicHeroQuote.tsx` (`AkashicHero`) | `bg-background` / flat `band` sticky quote layer (matches [07]). "The intelligence layer / behind every decision." No figures in the hero. The hero fills the first screen under the header and lands straight on the sticky quote (23 Oct 2026, user). The outcome cards that stood under it went to homepage [02]; the dome and module rail tried here the same day were removed (`.archive/removed-2026-10-23/`) |
| 01 | akashic-in-action | `akashic/AkashicFourMoves.tsx` | `bg-background`. Full-width eyebrow rail over two columns. "Why the number moved, / answered in seconds." From lg the h2 size tracks the column (`clamp`). Its "See what's underneath" button went 20 Oct 2026 (no next-section buttons) |
| 02 | how-it-works | `akashic/AkashicModular.tsx` | `bg-primary-bg` (exploded platform scroll scene). Headline (in `AkashicTeardownMockup`, eyebrow `bare` over the pinned scene) "Start with one module. / Grow into the platform."; its close lost the button that pointed at [03]. [01] Ask into [02] the modules is the page's opening sequence (user, 14 Oct 2026): do not put another section between them |
| 03 | architecture | `akashic/AkashicArchitecture.tsx` | `bg-background`; `ui/SectionHeader` with a one-line title, "Deploy where your data has to live." |
| 04 | modules | `akashic/AkashicModules.tsx` | White; "Seven modules. / Nothing to stitch together." Compact architecture schematic with three labelled layers, module capabilities and shared governance. Data Pipelines and Master Data carry an AI agent line with a `PreviewTag`; the coda ("Agents, in preview. The groundwork they need, already live.") hands off to [05]. Heading and introduction left-aligned. Module links open [10] entries |
| 05 | agents | `akashic/AkashicAgents.tsx` + `demos/akashic/AgentRunDrawing.tsx` | White, `border-t`. Added 14 Oct 2026 from the founder's agents section. "Agents do the legwork. / People make the call." One drawing: a six-step run (Ask, Plan, Retrieve, Verify, Approve, Record) under three lane brackets (agents dashed blue, a person ink, the record solid blue); each of his eight named agents hangs from the step it works in, the Approve column holds no agent ("No agent signs off."), and the golden-record steward and pipeline monitor run under every run. Placed after the foundation and before [06] Trust. `PreviewTag` on the label; flip `AKASHIC_AGENTS.preview` when agents ship. Claims rules applied to his copy are in the `AKASHIC_AGENTS` comment |
| 06 | trust | `akashic/AkashicTrust.tsx` | White; "Put AI to work. / Keep control of your data." Restored four privacy cards with compact illustrations and control badges |
| 07 | open | `akashic/AkashicOpenFoundations.tsx` | Flat `band` (the hero quote's blue, `.ak-open-principles`); "No lock-in. / Your data, your formats, your call." Restored four principles: modular, inspectable, extensible and portable |
| 08 | build-vs-buy | `akashic/AkashicBuildVsBuy.tsx` + `demos/akashic/GroundworkDrawing.tsx` | White; one drawing (30 Sep 2026), ending on its measure line (the "Map your first use case" button went 20 Oct 2026). Four use cases (dashboards, forecasts, AI answers, AI agents in preview) built project by project, groundwork hatched and rebuilt per column, against Akashic, groundwork laid once as a solid blue band. Four numbered pins key one-line CFO, CIO/CTO, CDO/AI and CEO/COO seats listed beneath; one measure line with the CTA. Replaced a lifecycle strip, comparison table and four executive cards. Legacy anchor retained |
| 09 | scale | `sections/ProvenAtScale.tsx` | `bg-white` (reused, id="scale"). On /akashic: eyebrow "In production", title "Proven at national scale. / Ready for your organisation." (`title` accepts a node). Keeps its own sourced figures; the founder's programme figures are leadership track record and are not used here |
| 10 | stack | `akashic/AkashicStack.tsx` | `bg-depth`; compact expandable module index with light specification sheets, grouped connectors and adjacent capability qualifiers. First open; addressable `#reference-*` anchors. Carries the founder's per-module figures: Data Pipelines 25 built-in transforms, BI 61 data sources and 50+ chart types, Governance 80+ metadata connectors |
| 11 | solutions | `akashic/AkashicPlatform.tsx` + `demos/akashic/SolutionWorkflow.tsx` | White. "Ready-made for one process. / Live on the foundation you already run." An axis column, then Enterprise Intelligence, IPMS and Akashic Life side by side (category, audience, claim, three-step glyph workflow, one note). All seven modules are in use under every solution (user correction, 21 Oct 2026), connected by blue spines on the `panel` band. Desktop rows align through CSS `subgrid`; below lg each solution stacks with all seven modules. Module names come from `solutionModules` in `content/pages/akashic.ts`, shared with the homepage. No autoplay or simulated screens. The nav's Solutions featured card links here |
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

### Services (`app/services/page.tsx`, rebuilt 26 Oct 2026)

Rebuilt the same afternoon as the morning redesign because the page still read
as a different website from home and /akashic. It now speaks their grammar:
the shared hero cadence, drawings that carry real words (the sample business's
systems in their homepage colours, a cited answer lifted from /akashic [01]),
figure frames with mono column heads and a legend foot, the /akashic close, and
the service lines named exactly as the nav and homepage [04] name them. The
story spine and claim owners sit at the top of `content/pages/services.ts`.
One line motif runs through the page: blue while DHIRA builds, ink once your
team runs it (hero, [02], [04], [06]). On [03] colour encodes the platform
split instead: blue = Akashic, ink = your stack.

| Order | ID | File | Background |
|---|---|---|---|
| 00 | hero | `services/ServicesHero.tsx` + `demos/services/DeliveryRoute` | `bg-background`; the home/akashic hero: pill ("Services \| With Akashic or on your stack" → #engagement-models), single-ink h1 "Data and AI systems / your teams can run on." with the shared `RotatingPhrase`, CTA pair. Drawing: four source systems enter from beyond the frame (colour = source system), one DHIRA team's four stages on a blue rail, three outcomes live in production, then the line turns ink and leaves the frame (handover). SVG from lg; the same parts stack as HTML below lg |
| 01 | services | `services/ServicesLines.tsx` + `demos/services/ServiceDrawing` | `bg-background`; three open columns, all visible, built like homepage [03]: drawing on the pale panel (use cases on value against readiness; three systems through one tested pipeline; a cited answer a person reviews), the nav's name as the mono label, homepage [04]'s card title and description, scope as `ui/Tag`s, "You leave with". Columns carry `#advisory`, `#engineering`, `#ai-solutions`; AI agent workflows carry Preview |
| 02 | engagement-models | `services/ServicesModels.tsx` | `bg-background`; one decision the figure tours (rebuilt three times on 26 Oct 2026: the responsibility table read "odd and hard to interpret", the static tree was asked to feel 2026, then to load like the homepage sections). "What do you need?" is the root of a tree splitting into two branch pills, A platform, ready to run (On Akashic) and Something built for you (On your stack); the five models are the leaves, left to right from DHIRA doing the most to your team doing the most, each showing only Builds and Runs (blue = DHIRA, ink = your team). `hooks/useTour` walks the five every 7s: the chosen model's route fills blue from the question with a disc at its head (one continuous path, so the fill stays on one clock) and its card's top line fills in step; the branch pill lights, the selection bar (layoutId) and the axis marker glide on springs, the detail cross-fades (description, then a ledger: DHIRA delivers beside Your team leads on paired hairline rows). A pick, or a link to `#model-<id>` or an older anchor (akashic-deployment, product-engineering, advisory-co-engineering), stops the tour; `ui/MotionToggle` sits just past the question. Hover or focus holds the clock and previews a route dashed. Routes are measured with a ResizeObserver and drawn in px on exact fifths. Tree from xl; below xl each branch is a labelled list on a rail and the detail opens under the chosen card's row. Reduced motion: no tour, final states |
| 03 | capabilities | `services/ServicesCapabilities.tsx` | `bg-background`; the /akashic [04] layer frame made to work like [02] (user, 26 Oct 2026: "the same way"). Applications, Intelligence, Data, Infrastructure, with a blue bar where Akashic covers the layer and ink where the work is custom. Each of the six discipline tiles is wired to what covers it on the right: Akashic modules by their one name (agents dashed + Preview), where Akashic runs, or "Custom, on your stack". `hooks/useTour` walks the six: the chosen tile's wires fill blue with a disc at each head, its covering nodes light, its top line fills in step, and the detail band under the layers cross-fades (scope, then typical delivery and where Akashic fits as `ui/Tag`s). A pick stops the tour; `ui/MotionToggle` ends the head row. Wires are measured per row with a ResizeObserver. From xl the figure fits one viewport (855px at 1440); below xl each layer lists its tiles, then its nodes as chips, and the detail opens under the chosen tile. One onward link to /akashic under the lede |
| 04 | methodology | `services/ServicesMethodology.tsx` | `bg-background`; the /akashic agents rail: lane brackets, four numbered stages each closing on an ink sign-off diamond, working output and sign-off under each, then the rail turns ink into "Your team". Across from xl, down the left below. Coda: the next stage waits for your sign-off |
| 05 | proven-at-scale | `sections/ProvenAtScale.tsx` (shared) | `bg-background`; the same carousel and chakra as home [07] and /akashic [09], with the services headline and a `link` to /customers (the optional prop added for this page) |
| 06 | partnership-fit | `services/ServicesFit.tsx` | The one `bg-band` section. The operating pack as a flat sheet (four documents, no tilt or backing card) closed by the blue-to-ink handover line, beside ownership, security and support terms. Preserves the anchor |
| 07 | faq | `services/ServicesFAQ.tsx` | `bg-background`; shared `FaqSection`, two groups with every answer visible and matching structured data |
| 08 | talk-to-our-team | `services/ServicesClose.tsx` | `bg-background`; the /akashic closing card recipe (`bg-depth` card, numbered questions on a dotted rail, footer with the stage flow in blue mono). Headline in homepage [04]'s words: "Bring us the problem / only you have." |

The nav labels this page **Services**; the route stays `/services`. Copy uses the
typed document in `content/pages/services.ts`. No unverified availability,
latency, throughput, sprint or universal ownership guarantees; commercial
terms are agreed per engagement. Drawing figures and names come from the
sample business on home and /akashic, never new. The morning's drawing kit
(DeliveryAssembly, DeliveryDrawings, EngagementDrawing, ServiceWork,
ServicesFitPreviewMockup, ServicesProven, useSectionChoice) is in
`.archive/removed-2026-10-26/`; the old stock photographs are under
`.archive/services-redesign/public/delivery/`.

### About (`app/about/page.tsx`)

The nav's Company menu links here: "About DHIRA" → `/about`, "Leadership" →
`/about#people`. Careers goes to `/careers`, Impact to `/#scale`.

**Sections 01–03 retain the engineering drawings:** threads, cumulative terraces and connected public systems. Sections 04–06 connect the people to platform engineering, implementation and remote working life (refined 28 Oct 2026). Each numbered section keeps the shared eyebrow and two-tone heading. Copy, images, roles and focal positions are typed in `content/pages/about.ts`; leadership comes from the shared leaders collection. All people photography is monochrome. Real employee photographs remain distinct from the labelled remote-review placeholder.

| Order | ID | File | Background | Drawing |
|---|---|---|---|---|
| 00 | hero | `about/AboutHero.tsx` | `bg-background` | Centred company promise, CTA pair and bordered proof strip. Three small monochrome portraits sit in the team link, introducing people before the diagrams. Contact opens the dialog directly. Desktop description uses one sentence per line. |
| 01 | why-we-exist | `about/AboutConviction.tsx` + `demos/about/ThreadConvergence.tsx` | `bg-background` | Three concise beliefs beside the original thread drawing: records, documents and streams converge into governed data, with blue AI threads growing from that foundation. |
| 02 | journey | `about/AboutJourney.tsx` + `demos/about/JourneyLayers.tsx` | `bg-background` | "Building since 2018. / Live since 2020." (the payoff must stay one line in the roughly 400px heading column at 1280). One complete terraced figure with cumulative native scrolling. From 1200 × 820, when the measured stage fits, the stage pins at 88px and adds one year per 150px of scroll (1350px travel including the final hold). Reverse scrolling retraces the record. The stationary reading area carries the year, headline and explanation. Show all years removes the pin while preserving position. Each layer carries a 17px Google Sans title and 13px mono year on one line, with no supporting subtitle. The year is kept beside its title for context. The calendar ruler uses 12px type and the era captions use 11px; the founding label reserves 208px against the actual historical span. Trusted context, scoped action and human authority are explained inside the right-hand dashed horizon, explicitly an ambition with no release date. **User-restored composition:** no separate Read the full timeline disclosure and no future text block below the figure. Below 1024px, the complete emblem precedes a chronological ledger of titles and years, with historical descriptions for assistive technology and the future principles visible; the ledger is screen-reader-only on desktop. Short viewports and reduced motion show the completed figure without pinning. Without JS, the ledger is visible at every width. The 2025 recognition has a readable ruled row beneath the drawing. Content: `content/pages/about.ts` (`journey`). |
| 03 | vision | `about/AboutVision.tsx` + `demos/about/SiloLayer.tsx` | `bg-depth` (the page's one dark section) | Elevation: fourteen systems on one ground, each labelled by a public function any government runs; the layer is solid over the three live programmes (education, health, labour; homepage figures, generic names, tagged India in the key) and dashed elsewhere. Headline is jurisdiction agnostic ("Public systems, working as one. / Citizens tell their story once."): India is the proof, never the market. No Western deployment is implied. Deployment figures are in words, so their labels under the ground show from `xl`; below 1280px they list under the drawing. Legend keyed to the drawing. The lede connects the engineering to enterprise records and operations, with a SectionLink to /customers. |
| 04 | leadership | `about/AboutPeople.tsx` | `bg-background` | Company point of view about building for the person using the technology and keeping the experience clear, with a modest founder portrait and four compact leader profiles. Mobile puts the founder in a portrait-and-caption row. Editorial is company copy, not an attributed quote. Services link under the lede. Keeps `#people` as an alias. |
| 05 | culture | `about/AboutCulture.tsx` | `bg-background` | One monochrome remote-review placeholder beside two working principles. Nine real employee profiles pair portraits with published roles and interests from dhira.io, in three columns on wide screens and readable rows on phones. Careers link under the lede. The user requested removal of Chiransh, Subhamoy and Diksha. Sources and replacement instructions: ASSETS.md and ABOUT_IMAGE_PROMPTS.md. |
| 06 | talk-to-our-team | `about/AboutClose.tsx` + `demos/about/KolamCulture.tsx` | `bg-background`, inset `bg-depth` | A shorter contact and careers invitation, three city names, and a small static source-convergence drawing recalling [01]. The old interactive kolam is retired. Keeps `#careers` and `#join-us` aliases. |

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
`/solutions/enterprise-intelligence` (user, 14 Oct 2026), so his separate "Enterprise Intelligence
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

Resource pages share `ui/SectionHeader`, theme tokens, one soft blue band
(Rule 5a) and `ui/PageClose`. Most use the text-only `ui/PageHero` and
ruled registers. Insights is a gallery (26 Oct 2026): a front-page mosaic
(the featured essay large, the three newest beside it, under a dated
masthead rule) over a library with topic tabs, search and a Gallery / Index
view toggle. Every essay has a computed line-art cover plate
(`sections/insights/InsightCover`: hairlines, one blue accent, no data).
Customer stories and press releases use `sections/longform/LongformArticle`.
Insights uses `sections/insights/InsightArticle`: a centred essay column with
byline, wide cover plate, `RichText size="essay"`, a reading line
(`ReadingProgress`), contents and sharing in the left margin on wide screens,
a "Written by" team card, sources and related reading. The follow section
links to the generated feed and uses `ui/SubscribeForm` to copy its address;
no email subscription is simulated.
Policy pages share `sections/legal/LegalDocument`. Copy is typed content in `content/`, much of it
DRAFT for the founder (each file's header lists what is his, what is drafted,
and what needs confirming). No prices, counts or customer names are invented
(Rule 4). Every page is registered in `content/site-map.ts`.

| Route | Sections (ids) | Blue band | Notes |
|---|---|---|---|
| `/pricing` | plans · compare · included · deployment · services · how-to-buy · faq · talk-to-our-team | deployment | Redesigned 21 Oct 2026, US dollars only. No hero: [01] Plans carries the h1 and the term switch, then one plan frame: `demos/pricing/CapacityLine` across the top, four columns (price on the term, struck list price and yearly saving, action, four limits), the five modules as a foundation along the bottom; Enterprise is the tinted column with the filled button (no "most popular" mark, Rule 4). [02] pins its plan row under the header from lg and prices it on the same term (`sections/pricing/PricingTerm`); Enterprise says "Sized to your estate" once per group. [03] the eight controls as one layer under all four plans. [04] three footprint boundaries. [05] rate card, [06] four doors, [07] FaqSection split with grouped questions. PLACEHOLDER prices in content/pages/pricing.ts |
| `/insights` | hero · latest · subscribe · talk-to-our-team | subscribe | Gallery redesign 26 Oct 2026. Front-page mosaic (featured + three newest), library with topic tabs and counts, search, Gallery / Index views, twelve computed cover plates, working article feed, closing card. `InsightsLibrary` receives summaries through `lib/insights.ts`, not full bodies. Hub order lives in `content/pages/insights.ts:sections`. |
| `/insights/[slug]` | article header · article-body (heading anchors) · sources · related · subscribe · talk-to-our-team | subscribe | Twelve original essays in `content/collections/insights.ts`, rewritten 26 Oct 2026 in a long-form blog voice, bylined to DHIRA teams (never a named person), with inline research citations and explicitly illustrative scenarios. Dates are DRAFT (staggered weekly). Six earlier slugs retained. Agent capabilities carry PreviewTag. BlogPosting + BreadcrumbList JSON-LD, per-article metadata, generated RSS at `/insights/rss.xml`. |
| `/customers`, `/customers/[slug]` | hero · stories · close | none | The three ProvenStories deployments, now read from `content/collections/customer-stories.ts` by the carousel too. Naming and analytical-claims rules unchanged |
| `/newsroom`, `/newsroom/[slug]` | hero · announcements · recognition · media-kit · talk-to-our-team | media-kit | Akashic 1.0 release (founder's own quote), the three real recognitions, marks in `public/brand/`, leadership portraits from `ABOUT_LEADERS` |
| `/glossary` | hero (A to Z index) · terms · close | none | Term ids are linkable anchors (`/glossary#entity-resolution`); DefinedTermSet JSON-LD |
| `/contact` | hero · write-to-us · routes · offices | write-to-us | `layout/ContactForm` inline; other routes are subject-lined mailto links to the one published inbox |
| `/partners` | hero · ways-to-partner · what-partners-get · how-to-join · talk-to-our-team | how-to-join | No partner named until one is confirmed |
| `/akashic/1-0` | hero · generally-available · in-preview · where-it-runs · talk-to-our-team | where-it-runs | [01] opens with the module moments above the register; modules read from the /akashic data; agents carry PreviewTag; launch countdown. Flip `RELEASE.live` on 1 Nov |
| `/privacy`, `/terms`, `/cookies`, `/accessibility`, `/legal` | header · document · other policies | none | DRAFT FOR LEGAL REVIEW (`content/collections/legal.ts`); replace the footer's old dead anchors |
| `/site-map`, 404 | hero · groups | none | Site map from `lib/routes.ts` (content/site-map.ts + the collections) + India versions; the 404 routes to six destinations |

### Solution pages (`/solutions/{enterprise-intelligence,life}`)

⚠ **Neither solution page follows the old family pattern any more.** Both were
rebuilt to their own visual systems on user direction (EIS Jul 2026, Life
23 Jul 2026). The split hero + six-step chain rail + count-up proof panels
recipe now survives only on `/solutions/knowledge`. Do not "restore
consistency" across the three without checking first.

| Page | Status |
|---|---|
| `/solutions/enterprise-intelligence` | own system, `eis-*` tokens — see below |
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

#### `/solutions/enterprise-intelligence` — the other outlier (rebuilt Jul 2026)

EIS was rebuilt to a different visual system on user direction and **no longer
shares the solution-page family pattern**: no numbered `[01]`-style eyebrows,
no chain rail, no `ProvenAtScale`. Do not "restore consistency" with
`knowledge/` without checking first.

| # | `id` | Component | Ground |
|---|---|---|---|
| 1 | hero | `eis/EisHero.tsx` (executive command bar & connectors) | atmosphere (`hero`) |
| 2 | your-lens | `eis/EisLenses.tsx` (5-role command centre) | white |
| 3 | the-gap | `eis/EisGap.tsx` (decision timeline) | `eis-band` #F4F5F0 |
| 4 | capabilities | `eis/EisCapabilities.tsx` (3 governed pillars) | white |
| 5 | the-loop | `eis/EisLoop.tsx` (5-station circuit) | white |
| 6 | proof | `eis/EisProof.tsx` (3 sovereign deployments) | white |
| 7 | questions | `eis/EisFaq.tsx` (5 executive questions) | white |
| 8 | talk-to-our-team | `eis/EisClose.tsx` | atmosphere (`dusk`) |

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
