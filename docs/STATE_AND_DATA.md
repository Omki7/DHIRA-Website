# STATE & DATA — DHIRA Website v3

## This is a presentational site — there is no data layer

Read this before adding any data-fetching, state library, API client, or runtime
validation. As of this writing the site has **none** of these, on purpose:

- **No data fetching.** No `fetch`, SWR, react-query, axios, or API routes.
- **No server state / caching layer.** Nothing to cache; content is baked at build.
- **No client state library.** No Redux/Zustand/Jotai. Client state is local UI
  state only (see below).
- **No environment/runtime config.** No `process.env` usage, no `.env` needed, no
  keys. Do not add a `.env` or env-schema abstraction for something that has no
  variables.
- **No runtime schema validation (Zod, etc.).** There are no external inputs to
  validate. Types come from TypeScript on static config.

Directives about "loading/error/empty/success states," "retry mechanisms," "API
fetching layers," and "Zod validation of API inputs" **do not apply to the
current codebase** — they describe a data-driven app this one is not. See the
forward-looking section below for when they would.

## Where content lives

All copy, figures, and per-section config are **static, typed modules** in `lib/`,
one file per page:

```
lib/pageSection.ts                     Shared section typing (the PageSection shape)
lib/homeSections.ts                    Home section metadata (drives PageMinimap)
lib/{about,akashic,careers,delivery}Sections.ts
lib/{eis,life,knowledge,publicSector}Sections.ts
lib/sectorContent.ts                   Drives the shared six-sector template
lib/{education,energy,finance,healthcare,manufacturing,retail}Sections.ts
lib/site.ts                            Company facts and SITE_URL: one source for metadata, JSON-LD, footer, contact
lib/siteRoutes.ts                      Every public route: feeds sitemap.xml, /site-map and llms.txt
lib/{pricing,trust,contact,partners,release}Sections.ts
lib/{insights,customerStories,newsroom,integrations,glossary,events,legal}.ts
                                       The 15 Oct 2026 hub and resource pages (ARCHITECTURE "Resource pages")
lib/richText.ts                        The Block type for long-form copy
```

Long-form copy (articles, press releases, story pages, policy pages) is still
config: a typed `Block[]` (`lib/richText.ts`) rendered by `ui/RichText`, with
`[label](href)` for inline links. Add an article by adding an entry to
`lib/insights.ts`; its page, the hub row, the RSS item, the sitemap entry and the
llms.txt line all follow. Generated files (`sitemap.xml`, `robots.txt`,
`llms.txt`, `insights/rss.xml`) are never edited by hand.

The forms (`layout/ContactForm`, `ui/SubscribeForm`) are SIMULATED: they show
their success state without sending anything. The site is the final hi-fi
mockup and developers wire both at hand-off; when they do, the "If a real data
layer is ever added" section below applies.

Rules:
- **Content is config, not JSX.** Copy, ordered lists, figures, and chip labels
  belong in the relevant `lib/*Sections.ts` module, typed — not hardcoded inside a
  section component. This is the site's single source of truth for content.
- **Figures must be real** (Design Rule 4). Several solution/sector figures are
  flagged "confirm/reconcile" in the source scripts — resolve before ship, don't
  invent.
- Section components are pure functions of their props + their `lib/` config.

## Client state patterns (the only state here)

Local, component-scoped `useState`/`useEffect`/`useRef`, always degrading under
`prefers-reduced-motion` (via `usePrefersReducedMotion`):

- **Carousels/auto-advance:** `activeCard`/`active` index + interval, pausing on
  hover/focus (HeroProductsMockup, ProvenStories, EverySector, UCSignals — 6–7s).
- **Toggles:** Before/After (TheProof), two-world question (AkashicFourMoves).
- **Scroll-driven:** IntersectionObserver reveals (`ScrollReveal`), scroll-spy
  (`usePageScrollSpy` → PageMinimap), sticky scrollytelling (`SectorMap`).
- **Count-ups:** `useCountUp` / `useCountUpValue` (do not add a third copy).
- **Appearance:** `lib/theme.ts` is a small browser preference store, read with
  React's `useSyncExternalStore` by `layout/ThemeSwitch`. The HTML attribute
  carries the current choice and `localStorage` (`dhira-appearance`) persists it.
  A head bootstrap applies the choice before paint. First visit is light;
  unsupported routes stay light while retaining the choice. Storage failures
  leave the current-tab switch usable. No external state library or server state.
- **Region:** `hooks/useRegion` is the same pattern for International / India
  (ARCHITECTURE "Regions"). It reads the visitor's choice from `localStorage`
  (`dhira-region`) and guesses from the device time zone (`Asia/Kolkata`), so no
  geolocation service and no request leaves the browser. During SSR only the page's
  own region is known; links settle after mount. Region-keyed copy lives in the
  page's `lib/` module as `Record<Region, ...>` (e.g. `HOW_TO_BUY.routes`).

Keep animation/timing constants named at module top (e.g. `ROTATE_MS = 7000`),
not scattered as magic numbers.

## If a real data layer is ever added

Then, and only then, adopt the production standard the generic brief describes:
typed fetchers in a `services/` layer, Zod validation at every external boundary,
the four explicit UI states (loading skeleton / error-with-retry / empty /
success), and feature-level Error Boundaries so a data failure degrades
gracefully. Put env config behind a typed schema with a `.env.example`. Until
there is external data, none of this exists — do not scaffold it speculatively.
