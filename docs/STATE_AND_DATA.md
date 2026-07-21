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
```

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

Keep animation/timing constants named at module top (e.g. `ROTATE_MS = 7000`),
not scattered as magic numbers.

## If a real data layer is ever added

Then, and only then, adopt the production standard the generic brief describes:
typed fetchers in a `services/` layer, Zod validation at every external boundary,
the four explicit UI states (loading skeleton / error-with-retry / empty /
success), and feature-level Error Boundaries so a data failure degrades
gracefully. Put env config behind a typed schema with a `.env.example`. Until
there is external data, none of this exists — do not scaffold it speculatively.
