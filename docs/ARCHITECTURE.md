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
  subscribe.ts         Server Action for the footer sign-up: checks the address, turns away personal
                       mailboxes, then reports success. SIMULATED: the save is the hand-off point
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
    Footer.tsx         Footer (bg-vault), on ThoughtSpot's footer: brand block (tagline, offices,
                       email, "Ask AI for a summary" assistant marks, "Stay in touch" sign-up),
                       then four columns of stacked groups in the header's order:
                       Platform | Solutions, By industry | Services, Resources | About.
                       Groups, the legal row and the Ask AI prompt come from navigation;
                       the ribbon holds the company line from site settings, the policy row,
                       LinkedIn, and RegionSwitch while a page has an India version (none
                       today). What earns a footer link: the audit note above the footer
                       columns in content/navigation.ts
    FooterSubscribe.tsx  The footer's business email sign-up (client). Posts to lib/subscribe.ts.
                       SIMULATED save
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
                       insights, legal, longform (shared article layout),
                       newsroom, partners, pricing, public-sector, release, sectors (shared sector
                       template), universal-context (the parts of homepage
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
      AkashicOutcomeCardsMockup    Homepage [02]: one outcome card per module (role, typed question,
                                   answer, drawing, provenance) in the fan. Copy in platform.showcase
                                   (type OutcomeShowcase in content/pages/akashic.ts).
                                   Replaced the 21 Oct module screens (22 Oct 2026; deleted 3 Nov)
      AkashicTeardownMockup        /akashic modular teardown stage. Since 26 Oct 2026 each module's plate
                                   carries AkashicPlateScreensMockup over the hidden abstract sketch the
                                   scroll code drives
      AkashicPlateScreensMockup    The teardown plate faces: one monotone crop of the product per module
                                   at plate size (536 × 376): panel header with breadcrumb and view tabs,
                                   one canvas (run graph, customer hierarchy with stewardship, schema diagram, forecast, cited
                                   answer, dashboard tiles), status bar. No app chrome, no colour
      ProofComparisonMockup        TheProof before/after slider (role="slider", keyboard operable)
      (eis/* moved to features/solutions/mockups, 4 Nov 2026, and life/* was replaced there by
                                   LifeVisitMockup, 5 Nov 2026; each screen is still the evidence
                                   for the caption beside it: change the claim, change the screen)

  ui/                  Generic building blocks
    ScrollReveal, ScrollRevealRail (the centred 1440px column), FigureEyebrow (THE eyebrow),
    SectionHeader (THE section header), TwoToneTitle, SectionLink (a section's one onward
    link), SectionCoda, DrawingSetClose, PreviewTag, RegionLink,
    PageHero (hub and resource hero), PageClose (bg-ink closing card, #talk-to-our-team),
    FaqSection (+ FAQPage JSON-LD), JsonLd, RichText (renders Block[]), ShareLinks,
    RotatingPhrase (the hero phrases), MotionToggle (the pause control for
    anything that advances by itself)

  icons/               Static SVG components: AkashicLogo, DhiraLogo, DynamicSketchIcon, CloudProviderLogos,
                       ConnectorLogo (the grey connector marks in the /akashic reference),
                       AssistantLogo (the AI assistant marks in the footer's Ask AI row)

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

**India-only content on shared pages (4 Nov 2026, user: "careers should only
be visible for Indian audience").** Smaller than a regional page: an item in
a content document carries `audience: "in"` and shows only to visitors whose
region (`hooks/useRegion`) is India. Live for every way into careers:

| Where | Content field | International visitors see |
|---|---|---|
| Company menu, desktop and mobile | `navigation.ts` Careers link `audience`; `feature` as `{ in, intl }` | No Careers row; the offices card ("Three offices. / One team across time zones." → `/contact#offices`, `offices` drawing) in place of "Find your seat." |
| Footer About column | `navigation.ts` footer Careers link `audience` | No Careers link |
| Homepage careers strip | `home.ts` `careers.audience` | No strip |
| /about [05] | `about.ts` `culture.link.audience` | No "Explore working at DHIRA" link |
| /contact [02] | `contact.ts` Careers route `audience` (listed last, so the row numbers stay in sequence) | Five routes, no Careers |
| /site-map | `site-map.ts` `/careers` `audience` | No Careers row; the page count is one lower |
| Contact form "I’m interested in" | `ui.ts` `contactForm.interest.careers` ("Joining DHIRA", with an optional resume; docs/STATE_AND_DATA.md, Forms) | No "Joining DHIRA" option. A careers Apply link still opens the form on it |

- Client Components filter with `isShownTo(audience, region)` and pick a
  `Regional<T>` value with `forRegion` (`lib/region.ts`). Server Components
  wrap the item in `ui/RegionOnly` (`region`, optional `fallback`).
- The server does not know the visitor, so the static HTML is the
  international version. India-only items appear after hydration: they never
  flash for anyone else, and Indian visitors see them a moment after load.
- While `REGIONAL_PATHS` is empty the footer switch is hidden, so
  `useRegion` ignores any stored choice and the device time zone decides
  (5 Nov 2026). Before that, an Indian visitor who had picked International
  while `/in/pricing` existed never saw Careers and had no way to undo it.
- India is detected from the device time zone (`Asia/Kolkata`). A visitor
  in India whose device or browser reports another zone (a laptop on UTC,
  Brave or Firefox fingerprint protection) is treated as international.
- `/careers` itself is unchanged and open to anyone with the link, and
  `sitemap.xml` and `llms.txt` still list it, so it stays in search results
  in India. Nothing redirects.

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
| 00 | hero | `sections/Hero.tsx` + `demos/mockups/HomeHeroTeasersMockup` | `bg-background` | Rotating "Answers are easy" headline, platform badge and the first CTA pair, surrounded by seven executive-facing module illustrations (22 Oct 2026, Vistiq reference). Master Data shows a business hierarchy; Business Intelligence shows performance charts. No app chrome. Desktop places the snapshots around the pitch; smaller screens use a scrollable strip below the copy. Sample figures carry no caption (DESIGN_SYSTEM Rule 4, 4 Nov 2026). The /akashic hero remains unchanged |
| 01 | problem | `sections/ProblemSection.tsx` + `demos/DivergentAnswers` | `bg-background` | "You asked for one number. / You got three." Header, then one composition under one hairline: the three answers (right, 600px from xl) framed on the left by the industry record (top, level with the question) and the verdict (foot, level with "Which number do you act on?"; the section's last line). No bridge button |
| 02 | platform | `sections/MeetAkashic.tsx` + `universal-context/` (UCHero, UCCapabilities, UCFeatureIcon) + `demos/mockups/AkashicOutcomeCardsMockup` + `demos/akashic/ContextTentacles` | `uc-bg` | Since 23 Oct 2026 (user: swapped with the /akashic hero's treatment, content and tagline unchanged): the centred intro ("Meet Akashic", one CTA), then the outcome cards in the fan with the context tentacles as the module index (captions are the section's own module lines, from `platform.showcase`), then the five capabilities as one lined strip. The dome and the module rail with its drawings went to /akashic; the "Seven modules share one platform" heading went with the rail. The eyebrow aligns with every other rail; below it the fan and the strip's hairline run wide. "Nothing to rip out" and "Seven modules" removed 20 Oct 2026 (founder): do not cut further without asking |
| 03 | solutions | `features/home/…/BuiltOnAkashic` + `SolutionsOnFoundation` + `SolutionIllustration` (+ `ui/DrawnFigure`) | `bg-background`; one plate on `subtle-stroke` | "Our solutions arrive ready-made / and run on your own data." Rebuilt 4 Nov 2026 (user: [03] and [04] did not feel at the level of the rest of the page) as ONE plate: three bays standing on the Akashic foundation, so every solution visibly rests on the whole platform. Each bay: audience (mono), name, benefit, then "See the solution" at the foot of the copy; under it the content-specific process drawing on `primary-bg`, resting on the foundation (`depth`): invoices, timesheets and opportunities revising a rolling forecast; a tender requirement linked to bid evidence for human review; an offline antenatal visit carried into the same record at the health centre. The generic document/circle/badge illustrations were rejected (user, 21 Oct 2026). Each drawing plays its process once on entering view (`ui/DrawnFigure` + the `.ad-*` kit; labels, sheets and places are drawn from the start; final state under reduced motion). They carry no figures, so no "illustrative" label (Rule 4, 4 Nov 2026); accessible summaries in `home.solutions`. Pointing at a bay deepens its two grounds one step (`primary-bg`, `tertiary-bg`), fills its socket on the foundation's edge and lights all seven module cells: every solution uses the complete platform; no module subsets or cycling selection. The foundation keeps the wordmark, "Every solution. All seven modules." and the seven modules as cells with dashed dividers (two columns on phones, four on tablets, seven from lg). Tablets set copy beside drawing; phones stack each bay. [04] owns bespoke delivery. Module names shared with /akashic |
| 04 | services | `features/home/…/HowWeDeliver` + `ServiceRoute` (+ `ui/DrawnFigure`) | Page ground; the route on the `anchor` panel | "Need it built for you? / Our engineers plan and build it." under the eyebrow "Our services": the problems only the reader has, with or without Akashic (user, 21 Oct 2026: earlier headers sounded obsessed with Akashic). Rebuilt 4 Nov 2026 (user: the three cards were not at the level of the rest of the page). The header now sits on the page ground through `SectionHeader`, like every other section (it used to sit inside the card). The nav's three service lines (Strategic Advisory, Engineering at Scale, AI Solutions and Accelerators, each linking to its /services anchor) are stops on ONE route from "Your problem" (a tangled line) to "In daily use" (the route's one filled node, with a hairline ring). The line changes as it passes each stop: dashed after Plan (mapped, not built), solid ink after Build, blue after Bring AI into your work. No numbers: a reader may bring DHIRA in for one stop or the whole route (/services [01]). Each stop: scope (mono), title with an arrow, description, "You leave with" (the /services [01] output, in `home.delivery.services[].output`). From lg the five columns share their rows through CSS subgrid, so titles, descriptions and outputs stay level; below lg the rail runs down the left, and on tablets each output sits beside its words. Draws in once (the tangle, then each stretch and node); static under reduced motion. The pastel panel stays as approved (21 Oct 2026); textures and re-tuned palettes (28 Oct 2026) stay rejected (DESIGN_SYSTEM §4). Keeps `#delivery` as an alias |
| 05 | sectors | `sections/EverySector.tsx` | `bg-background` | "Whatever your sector, / we know the work." Six industry tabs with photography that rotate on their own like [02]'s modules (22 Oct 2026): the selected tab's line fills blue and the next sector takes over as it lands; held off screen and under keyboard focus, off under reduced motion; each photo headline fits one line at every width (22 characters or fewer); legacy sector hashes; Public Sector link |
| 06 | proof | `sections/TheProof.tsx` + `demos/mockups/ProofComparisonMockup` | `bg-background` | "Same team. Same data. / Less reconciling, more deciding." Before/after slider (stays by direction, 23 Jul 2026) |
| 07 | scale | `sections/ProvenAtScale.tsx` | `bg-background` | Shared with /akashic and /services. Deployment carousel, chakra ornament beside the header |
| 08 | voices | `sections/Voices.tsx` | flat `band` | "Ask the people who run it. / In their own words." Draft dispatches |
| 09 | governance | `sections/EnterpriseSecurity.tsx` | `bg-background` | "Your data stays yours. / Governed inside your walls." Rising curve, four figures, certification bar |
| 10 | get-started | `sections/Closure.tsx` | closing card | Centred close with the page's second CTA pair |
| — | careers | `sections/CareersStrip.tsx` | `bg-background` | Unnumbered eyebrow "Careers"; roles from the collection; not in the minimap. India only (Regions, 4 Nov 2026) |
| — | footer | `layout/Footer.tsx` | `vault` | Brand block, then four columns of link groups headed by the header's menu labels |

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
| 00 | hero | `akashic/AkashicHeroQuote.tsx` (`AkashicHero`; the hero alone if the document has no `quote`) | `bg-background` / flat `band` sticky quote layer. "The intelligence layer / behind every decision." No figures in the hero. The hero fills the first screen under the header and lands straight on the sticky quote (23 Oct 2026, user). The quote's attribution is still a DRAFT placeholder: replace it with a real, attributed quote before launch (Rule 4). It was removed and restored on 5 Nov 2026 (user); its line now breaks after "numbers" (three lines from md up, no word alone), and its track is sized from the hero's CSS height before measuring, so nothing below shifts after hydration |
| 01 | akashic-in-action | `akashic/AkashicFourMoves.tsx` | `bg-background`. Full-width eyebrow rail over two columns, top-aligned. "Why the number moved, / answered in seconds." Since 5 Nov 2026 the section arrives with the answer already shown; the run (question typing, four moves, answer) plays only from the `MotionToggle` beside the example tabs (Rule 6b), and the page no longer glides itself to the section. The examples are a WAI-ARIA tab set (arrow keys, `#ask-run` tab panel). Its "See what's underneath" button went 20 Oct 2026 (no next-section buttons) |
| 02 | how-it-works | `akashic/AkashicModular.tsx` + `demos/mockups/AkashicTeardownMockup` | `bg-primary-bg`. From lg, the exploded-platform scroll scene, pinned over a 424vh track (cut from 1010vh, 5 Nov 2026): about three screens of scroll. The HUD label, the narrative text and the lifted plate switch together; the scene never moves the page by itself, never rewrites the URL, and its frame loop stops when nothing moves. Below lg the same markup is a plain column (no pin, no scene, no HUD): `display: contents` on the frame and root and CSS `order` interleave each module's anchor span with its text. The section element carries `id="how-it-works"`, so the scroll spy keeps module hashes (`#master-data`). Module anchors sit mid-segment with a 120px scroll margin (`moduleAnchorVh`). [01] Ask into [02] the modules is the page's opening sequence (user, 14 Oct 2026): do not put another section between them |
| 03 | scale | `sections/ProvenAtScale.tsx` | `bg-white` (reused, id="scale"). Moved up from [09] on 5 Nov 2026 so the national proof follows the opening. On /akashic: eyebrow "In production", "The platform behind national programmes / is ready for your organisation." Keeps its own sourced figures |
| 04 | architecture | `akashic/AkashicArchitecture.tsx` | `bg-background`; `ui/SectionHeader` with a one-line title, "Deploy where your data has to live." |
| 05 | modules | `features/akashic/…/AkashicModules` + `ArchitectureParts` + `ArchitectureFlow` | Page ground; four accented layer bands inside one platform frame | "You get seven modules / and nothing to stitch together." Compact executive/CTO architecture, refined 4 Nov 2026: twelve teams over four layers (Governance, Intelligence, Knowledge, Data), then your systems. Each module tile's arrow opens its matching `#reference-*` sheet in [09]; by prior user direction the onward link "See every module in detail" stays under the figure and leads to [09]. Existing `modules-*` and older aliases remain; canonical module hashes belong to [02]. One measured question path travels down and back with a pausable pulse that stops off screen and respects reduced motion |
| 06 | agents | `akashic/AkashicAgents.tsx` + `demos/akashic/AgentRunDrawing.tsx` | White, `border-t`. "Agents do the legwork. / People make the call." One drawing: a six-step run (Ask, Plan, Retrieve, Verify, Approve, Record); the Approve column holds no agent ("No agent signs off."). `PreviewTag` on the label; flip `AKASHIC_AGENTS.preview` when agents ship |
| 07 | trust | `akashic/AkashicTrust.tsx` | Flat `band`, the page's one soft blue band (Rule 5a). Merged 5 Nov 2026 from [06] Trust and [07] Open: "Put AI to work / without losing control of your data." A two-column ledger, "Private by default" and "Open, with no lock-in", three rows each; the open group carries the `#open` anchor other pages link to. Under it, certifications and the laws followed as two separate, labelled lines (homepage [09] wording). `AkashicOpenFoundations` is retired and unrendered; delete it after the next dev-server restart |
| 08 | build-vs-buy | `features/akashic/…/AkashicBuildVsBuy` + `GroundworkDrawing` + `LeaderGains` | White. "Build a foundation that lasts / beyond the first project." Two rows of the same three initiatives: project by project, each rebuilds its groundwork; on one foundation, the groundwork is shared. No savings figure (Rule 4). Under the drawing since 5 Nov 2026 (user: benefits direct to the CTO, COO and other executives), `LeaderGains`: "Your leadership", six roles (Chief Executive, Operating, Financial, Technology, Data and Risk Officers), each a two-line gain and one reason, all restating reuse; drawn in [05]'s neutral "Every team" treatment, never a layer colour. On phones the second and third projects' rebuilt tasks shrink to one row of glyphs. The four reasons that once followed the drawing repeated [02], [04] and [05] and stay retired. Legacy anchor retained |
| 09 | licensing | `features/akashic/…/AkashicLicensing` | `bg-background`, `border-t`. "Transparent licensing by capacity. / Your intellectual property stays yours." Two-pillar architectural ledger: capacity-based plans progression (Launch, Growth, Scale, Enterprise with 3 deployment footprints and 5 included modules) paired with intellectual property sovereignty (customer asset ownership, open formats, sovereign model boundary, cryptographic provenance). SectionLink to /pricing under the lede, and dedicated pricing bridge card |
| 10 | stack | `features/akashic/…/AkashicStack` + `ReferenceSheet` | `bg-depth`; "Capabilities and connections", rebuilt 5 Nov 2026 in [05]'s language: a module index grouped by layer (Data, Intelligence, Governance, each in its `arch-*` tone, [05]'s module order inside each layer; labelled at every width) beside the chosen module's specification sheet (header in the layer's solid tone, then hairline spec rows: connectors, capabilities, chart types; preview rows dashed and tagged). ARIA tabs; the index stays in view from lg and a port line joins the chosen tab to its sheet. Every `#reference-*` link (the [05] tiles) selects and lands on its sheet; all seven sheets are server-rendered and show stacked without JS. Carries the founder's per-module figures: Data Pipelines 25 built-in transforms, BI 61 data sources and 50+ chart types, Governance 80+ metadata connectors. Customer-held keys are claimed for self-hosted only |
| 11 | solutions | `akashic/AkashicPlatform.tsx` + `demos/akashic/SolutionWorkflow.tsx` | White. "Each solution is ready-made for one process / and runs on the foundation you already have." An axis column, then Enterprise Intelligence, the Intelligent Procurement Management System and Akashic Life side by side (category, audience, claim, three-step workflow, link; desktop rows align through `subgrid`). Under all three, one shared "Akashic underneath" band names the seven modules once; it replaced the 21-cell module matrix on 5 Nov 2026. All seven modules are in use under every solution (user correction, 21 Oct 2026). Module names from `solutionModules`, shared with the homepage |
| 12 | faq | `akashic/AkashicFaq.tsx` | White, `border-t`. "The questions leaders ask, / answered plainly." Six questions as an open two-column list on hairlines (no accordion) plus FAQPage JSON-LD. Every answer restates a claim the page already makes; the solutions answer says all seven modules, as [10] does |
| 13 | talk-to-our-team | `akashic/AkashicClose.tsx` | White with `bg-depth` closing card; "See what your data / can decide." (the founder's closing line); question, data and first-step agenda; existing contact modal via `#get-started` |

Sections [05–13] use `akashic/AkashicStory.tsx` (`StoryLabel` renders `ui/FigureEyebrow`) and
page-scoped `akashic/akashic-story.css` (23 Sep 2026 redesign). All copy, the
section index and the module sheets that [05] and [09] read live in
`content/pages/akashic.ts` (the `akashic` document).
5 Nov 2026 (platform audit): order and numbers changed as in the table above. 14 Oct 2026: [05] Agents and [12] Questions were inserted and later
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
`/about#leadership` (`#people` stays as an alias). Careers goes to `/careers` (India only, see Regions), Impact to `/#scale`.

**The page moves from systems to people.** Sections 01–03 use threads, cumulative terraces and connected public systems. Leadership [04] holds the leaders along one unbroken line. Culture [05] uses a compact Attio-style portrait field, explicitly requested on 4 Nov 2026, and the closing card [06] returns to [03]'s joined systems. Sections 04–06 live in `features/about/` (SCSS Modules); the hero and 01–03 remain in `components/sections/about/`. Numbered sections keep the shared eyebrow. Culture's centred heading is the user-requested exception to the normal heading grammar. Page copy is in `content/pages/about.ts`; leaders and the wider team have separate typed collections. All people photography is monochrome. No stock people are shown.

| Order | ID | File | Background | Drawing |
|---|---|---|---|---|
| 00 | hero | `about/AboutHero.tsx` | `bg-background` | Centred company promise, CTA pair and bordered proof strip. Three small monochrome portraits sit in the team link, introducing people before the diagrams. Contact opens the dialog directly. Desktop description uses one sentence per line. |
| 01 | why-we-exist | `about/AboutConviction.tsx` + `demos/about/ThreadConvergence.tsx` | `bg-background` | Three concise beliefs beside the original thread drawing: records, documents and streams converge into governed data, with blue AI threads growing from that foundation. |
| 02 | journey | `about/AboutJourney.tsx` + `demos/about/JourneyLayers.tsx` | `bg-background` | "Building since 2018, / and live at national scale since 2020." Refined 4 Nov 2026: the full-width header precedes a fixed reading column beside the terraced landscape. Quiet contours establish the complete shape; native scroll fills its layers and labels the current year's milestones. From 1200 × 760, only when the measured stage fits, it pins at 104px and advances one step per 180px (1620px including the final hold); reverse scrolling retraces the record. A keyboard-accessible year rail selects any chapter. Show all years removes the pin and reveals every label; Explore by year restores exploration. Labels use 16px titles / 12px dates from 1280px, 15px / 11px below. One sparse calendar ruler replaces the duplicate era rail. The undated dashed horizon stays in the landscape; its three principles and PreviewTag sit in the reading column at Ahead, explicitly an ambition with no release date. No separate timeline disclosure or future block beneath the figure. Below 1024px, the complete emblem precedes the readable chronological ledger; the ledger remains screen-reader accessible on desktop. Short viewports and reduced motion begin with the completed figure and support manual year selection without pinning. Without JS, the ledger shows at every width. The 2025 recognition remains beneath the drawing. Content: `content/pages/about.ts` (`journey`). |
| 03 | vision | `about/AboutVision.tsx` + `demos/about/SiloLayer.tsx` | `bg-depth` (the page's one dark section) | Elevation: fourteen systems on one ground, each labelled by a public function any government runs; the layer is solid over the three live programmes (education, health, labour; homepage figures, generic names, tagged India in the key) and dashed elsewhere. Headline is jurisdiction agnostic ("Public systems, working as one. / Citizens tell their story once."): India is the proof, never the market. No Western deployment is implied. Deployment figures are in words, so their labels under the ground show from `xl`; below 1280px they list under the drawing. Legend keyed to the drawing. The lede connects the engineering to enterprise records and operations, with a SectionLink to /customers. |
| 04 | leadership | `features/about/…/AboutLeadership` | `bg-background` | "One team builds Akashic / and answers for your system." Two lines of the same kind. Left, under the heading (sticky from xl) and Services link: "The usual route", a grey dashed line broken twice (`//`) between platform vendor, integrator and support desk. Right, "At DHIRA": one unbroken blue line from an open ring ("First architecture decision") to a filled node ("In production"), ending in an arrow at "Built for: The person on the other side" (a learner and a worker stand behind live programmes; "Your team, making a difficult decision" hands on to [06]). The five leaders (portrait, name, role, focus) are held by ONE bracket whose back is the line, never as stops on it: the same team the whole way, not a relay of handovers (review, 4 Nov 2026). The line grows on a named view timeline (`--about-spine`) where supported, completing before the last leaders reach the fold; the production node and arrow appear as it reaches them; static under reduced motion. Company point of view, not an attributed quote; coda "The technology can be complex. / The experience should be clear." (payoff on its own line on phones). Keeps `#people` as an alias. |
| 05 | culture | `features/about/…/AboutCulture` + `TeamField` | `bg-background` | "A team of curious builders." Explicit user-requested Attio composition: centred compact heading, a responsive staggered field of larger monochrome circles and one selected third-person introduction below. All 75 supplied workbook names plus seven existing profiles: 82 named profiles, 57 portraits and 25 initials. The layout grows with the roster; initials stay fully legible, with a restrained spotlight on the selected face. Desktop extends the field with decorative circles. Native radio controls support pointer and keyboard selection; the 8.5-second tour pauses on interaction, off screen and under reduced motion. Bios are user-requested editorial drafts, not employee quotes. Data: `content/collections/about-team.ts`; source ledgers: `docs/ABOUT_TEAM_SOURCES.md` and `docs/ABOUT_TEAM_WORKBOOK.md`. India-only careers link remains beneath the intro; `#careers` and `#join-us` aliases remain. Replaces `ColleaguesRiver` and its hobby descriptions. |
| 06 | talk-to-our-team | `features/about/…/AboutClose` + `NextJoinDrawing` | `bg-background`, inset `bg-depth` card | Centred closing card, kicker "What comes next" without a number. [03]'s elevation returns at full width (up to 880px): the same three systems [03] draws solid (Education, Health, Labour: nothing added) joined by the solid layer, which runs on dashed to one system standing apart, "Your system", with an open ring where its join would be. The page ends where [03] began. Labels under the ground, placed with `translate` because `.ad-fade` owns `transform`; the three names show from md. "Show us where your data disagrees, / and leave with the next step." answers the hero. One CTA (careers lives in 05); offices in mono at the foot. |

`about/AboutMotion.tsx` wraps this page and coordinates native Web Animations reveals and restrained hero scroll depth. All motion respects reduced preferences, including changes during a visit. The journey owns its cumulative scroll reveal and hover lineage, independent of the page reveal controller; its content has a complete static reading alternative. The vision uses the same `AboutHeading` as conviction and leadership; its old rail and duplicate reveal wrappers are removed. Culture [05] was inserted before the close on 5 Oct 2026; the close is now [06]. Retired 4 Nov 2026 with the remodel: `AboutPeople`, the old `AboutCulture` and `AboutClose`, and `demos/about/KolamCulture` (in git history).

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

### Solutions hub (`app/solutions/page.tsx`, added 14 Oct 2026, rebuilt 5 Nov 2026)

The founder's Solutions section (DHIRA_ai_Website_v2, 12 Oct 2026) as an
editorial hub. It exists so every nav link has a destination: "All
solutions", `#intelligent-procurement` (the procurement system has no page
yet) and `#function-<slug>`. On 5 Nov 2026 [01] was rebuilt from a written
script (docs/SOLUTIONS_PAGE_SCRIPT.md) and the whole page moved into
`features/solutions` as SCSS Modules: the route renders
`pages/SolutionsPage`. The hero, [02] and [03] are the user's picks, ported
without visual change. Copy is in `content/pages/solutions.ts`; claims
rules unchanged (no week figures until confirmed; agent work carries
`PreviewTag`; no "golden record" or "Knowledge Graph"). The industry and
function mappings are drafted from the founder's copy and need his review.

| Order | ID | Component | Background |
|---|---|---|---|
| 00 | hero | `SolutionsHero` | white; text only, on-page index under the lede |
| 01 | built-on-akashic | `SolutionsFeatured` (+ `ForecastMoment`, `LifecycleMoment`, `VisitsMoment`) | white; three chapters with ids `#enterprise-intelligence`, `#intelligent-procurement`, `#akashic-life`: audience, name, gain, how, tags, one link, and a moment on an inset panel that answers the reader's question; a thread runs down the chapters into the foundation strip (all seven modules, `solutionModules`) |
| 02 | more-solutions | `SolutionsMore` | white; seven register rows, each an anchor |
| 03 | industries (+ `#functions`) | `SolutionsIndex` | the page's one soft blue band (Rule 5a); two registers, function rows carry `#function-<slug>` |
| 04 | talk-to-our-team | `ClosingCard` (shared with /solutions/life) | white + the homepage closing card on `vault` |

Moments use each solution's own sample world: Enterprise Intelligence's
($11.4 million, $600,000 ahead of plan, Northwind's $180,000 renewal), the
procurement system's twelve stages and prior-delivery evidence, and Akashic
Life's sample visit (no numbers on that screen).

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
(`#subscribe`, on /insights and under every article) is an email sign-up
since 4 Nov 2026 (user): "Get the next essay / in your inbox.", the
newsletter feature's `SubscribeForm` (`variant="section"`, `source:
"insights"`), the same list and Server Action as the footer. The generated
feed is linked on the line under the form; copying its address went with
the old `ui/SubscribeForm`.
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
| `/solutions/life` | shared system since 5 Nov 2026; `life-*` grounds only — see below |

#### `/solutions/life` (rebuilt 23 Jul 2026, rewritten 5 Nov 2026)

Rewritten on 5 Nov 2026 from a written script and flow
(docs/LIFE_PAGE_SCRIPT.md), with /solutions/enterprise-intelligence as the
model: the shared `SectionHeader` on every numbered section, porcelain
grounds, hairline drawings with mono labels, blue for the live answer, the
homepage closing card. The user kept the hero, [02] and [03]; everything
else was replaced. The whole page lives in `features/solutions` as SCSS
Modules: the route renders `pages/LifePage`; copy, including every
drawing's labels, is in `content/pages/solutions-life.ts`. Each section was
critiqued by an independent Impeccable design review plus its detector and
fixed before the next was built.

The story: the problem in the reader's own framework (the three delays,
Thaddeus and Maine 1994), how it works, what changes, one sample visit,
every level that acts on it, the proof underneath, questions. One sample
mother (Meena, third trimester) runs through [04] and [05], and one road
runs through [01] and [04]. The drawings share one pen: paths draw at one
pace by length (`utils/land.ts`: `measurePath`, `PEN_PACE`), dashed
stretches are revealed through masks, labels land as the pen reaches them,
and the final state shows under reduced motion and without JS.

**The hero photograph.** `public/proof/point-of-care.jpg`, stock under a
free commercial licence (Pexels). A page about people needs a photograph of
people; it keeps its natural colour. From lg it sits beside the headline;
below lg it follows the buttons.

**Claims rules specific to this page.** Akashic Life is not sold, so it
carries **no figures of its own** anywhere: no accuracy, parameter count,
risk score, case volume or elapsed time, and **no number on any Akashic
Life screen** (user direction, 23 Jul 2026: readings are named in words).
Figures appear only in [01], about the problem, each sourced (World Health
Organization 2025; Sample Registration System 2020 to 2022), and in [06],
the national programmes' (customer stories), cited in the close's footnote.
National programmes are never named beyond "National Immunisation Registry"
and "National Learning Platform". A trained clinician makes every clinical
decision; the product never "diagnoses". No ranking or count stands in for
an answer in [05]. A quote band was removed 23 Jul 2026 (unnamed source);
do not reinstate it without a named, printable source.

| # | `id` (aliases) | Component | Ground |
|---|---|---|---|
| 00 | hero | `LifeHero` (pill badge, headline, lede, site buttons, photograph) | `life-abyss` |
| 01 | the-gap | `LifeDelays` + `LongRoad` (the three delays as one road over contour land: coils where time is lost, the referral leg round the hill, the third inside the hospital grounds; sourced stat band; coda) | white |
| 02 | the-solution | `LifeHowItWorks` (three circles pinned while the reader scrolls; all three at once below lg and under reduced motion) | `life-abyss` |
| 03 | what-changes | `LifeChanges` (four claims on a centre rule, each with a node) | `life-abyss` |
| 04 | at-the-visit (`the-record`) | `LifeVisit` + `VisitRoad` + `mockups/LifeVisitMockup` (the handset after one visit; the road dashed until a bar appears, then blue to the referral unit) | white |
| 05 | every-level (`altitude`) | `LifeLevels` + `Watershed` (brooks to centres to district to state; Meena's reading named, then anonymised past a marked boundary; four outcome cards) | white |
| 06 | built-on-akashic (`record-of-work`, `how-its-built`, `the-stake`) | `LifeFoundation` + `OneGround` (the programmes' tall growths with their figures, Akashic Life young and blue; one root system: Master Data and Governance shared, Machine Learning new) | white |
| 07 | questions | `LifeFaq` (shared FaqSection, two groups) | white |
| 08 | talk-to-our-team | `ClosingCard` (shared with the hub) | white + `vault` card |

**One trap, already paid for.** [02] pins its circles with
`position: sticky`; an `overflow` ancestor silently turns sticky back into
static, so `LifeHowItWorks` must never carry `overflow`.

#### `/solutions/enterprise-intelligence` (rebuilt Jul 2026, realigned 4 Nov 2026)

EIS was rebuilt in Jul 2026 and drifted into its own look. On 4 Nov 2026 the
user asked for it to match the homepage and /akashic, so it now follows the
shared system: the homepage hero scale and pill badge, numbered
`SectionHeader`s, flat hairline mockups (no shadows, pulses, tints by opacity
or app chrome), the stat band recipe in [02], and the homepage closing card.
It still has no chain rail and no `ProvenAtScale`.

The whole page lives in `features/solutions` as SCSS Modules: the route
renders `pages/EnterpriseIntelligencePage`, sections are in `components/`,
simulated screens in `mockups/` (`MondayInboxMockup`). Page copy, including
every drawing's labels and sample figures, is in
`content/pages/solutions-eis.ts`. Rebuilt 5 Nov 2026 from a written script
and flow (docs/EIS_PAGE_SCRIPT.md): problem first, then what it is, the
stories, the week, every leader, trust, questions. Each new section was
critiqued (Impeccable: an independent review plus its detector) and fixed
before the next was built. One sample business runs through every section
(Northwind Insurance's renewal, the Claims Engine project, Civic Digital's
kickoff); keep its figures in agreement.

| # | `id` (aliases) | Component | Ground |
|---|---|---|---|
| 00 | hero | `EisHero` (pill, headline, lede, buttons; typed ask bar: each question links to its story in [03] and lands an answer; pause control) | white |
| 01 | the-gap | `EisGap` (swimlane board: one client across three departments' systems over one month, with the decision runway; industry stat band; coda) | `eis-band` |
| 02 | one-picture | `EisOnePicture` (constellation: one client, eight linked records in four departments, the solid chain across departments in causal order; below xl a numbered list) | white |
| 03 | use-cases | `EisTeasers` (four 30-second teaser videos; posters are frames of the videos; colour-matrix filter matches the footage ground to the page) | white |
| 04 | your-monday (`the-loop`) | `EisMonday` + `MondayInboxMockup` (2,418 changes as banded dots, one band per live system; three changes per decision flow into the ranked inbox, measured by `MondayWires`; PreviewTag) | white |
| 05 | every-leader (`your-lens`) | `EisLeaders` (five seats in the homepage outcome-card grammar; stems into one root) | white |
| 06 | trust (`capabilities`) | `EisTrust` (one figure as a receipt: value from, risk signals; the route a proposal takes, PreviewTag) | white |
| 07 | questions | `EisFaq` (shared FaqSection, two groups) | white |
| 08 | talk-to-our-team | `EisClose` (homepage closing card on `vault`) | white |

The section ids drive the minimap through `sections` in
`content/pages/solutions-eis.ts`; they must match the `id` attributes, and a
renamed section keeps its old id as an alias.

**Every section opens with the shared `SectionHeader`** (two-tone headline,
lede under it). A section never carries a second full headline further down.

The page-scoped palette is the `eis-*` token block; today only [01]'s
`eis-band` ground uses it.

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
