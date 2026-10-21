# STATE & DATA: DHIRA Website v3

Runtime state, environment, forms and the boundaries of the data layer. Where
content lives and how it reaches the page is in [CONTENT.md](./CONTENT.md).

## What exists, and what does not

The site is static and content-driven. Every route is prerendered at build time
from the typed documents in `content/`, through `lib/content.ts`.

What does not exist yet, on purpose:

- **No client data fetching.** No SWR, react-query or API client. Pages receive
  everything at build time.
- **No API routes.** The generated text routes (`llms.txt`, `rss.xml`) are
  static.
- **No client state library.** State is local to components (below).
- **No runtime validation.** All inputs are typed local documents today. The CMS
  migration adds schema validation where the network boundary appears
  (CONTENT.md, step 3).

Do not scaffold loading, error or retry states for data that is not fetched at
runtime. When a real runtime data source arrives (a CMS preview, a CRM form
endpoint), follow the section at the end of this file.

## Client state (the only state here)

Local, component-scoped `useState`, `useRef` and `useEffect`, always degrading
under `prefers-reduced-motion`.

**Reduced motion.** Read it with `hooks/usePrefersReducedMotion` (an external
store, false on the server). Derive the resting state from it:
`const visible = reduced || revealed`. Do not set state in an effect because
the preference is on. ESLint's `react-hooks/set-state-in-effect` flags that
pattern.

**Patterns in use:**

- **Carousels and auto-advance.** An active index plus a timer, paused on hover
  or focus and gated on `useOnScreen` (ProvenStories, EverySector, UCSignals).
- **Toggles.** Before/after (TheProof), the world switch (AkashicFourMoves).
  Reset state in the event handler that changes it, not in an effect.
- **Scroll-driven.**
  - `ScrollReveal` and `useDrawn` use IntersectionObserver.
  - `usePageScrollSpy` drives PageMinimap.
  - Sticky scrollytelling: SectorMap, JourneyLayers, LifeSolution.
- **Count-ups.** `useCountUp`. The server HTML carries the real figure. Do not
  add a second count-up.
- **Clocks.** LaunchCountdown reads time as an external store that ticks each
  minute, so the server render and hydration match.

**Appearance.**
- `lib/theme.ts` is a browser preference store, read with
  `useSyncExternalStore` by `layout/ThemeSwitch`.
- `localStorage` (`dhira-appearance`) persists the choice, and a head bootstrap
  applies it before paint.
- A first visit is always light. Every route supports both appearances,
  including regional pages, collection detail pages, policies and the 404.
  Navigation keeps the selected appearance; storage changes synchronise tabs.

**Region.**
- `hooks/useRegion` uses the same pattern for International / India.
- It reads the stored choice (`dhira-region`), else guesses from the device time
  zone (`Asia/Kolkata`). No request leaves the browser.
- During SSR only the page's own region is known, so links settle after mount.

Name animation and timing constants at module top (`ROTATE_MS = 7000`), not as
magic numbers in the body.

## Environment

`lib/env.ts` is the only reader of `process.env`. Every variable is declared
there with a safe default and documented in `.env.example`.

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.dhira.ai` | Canonical origin for metadata, sitemap.xml and structured data. Set it on preview deployments |

Local overrides go in `.env.local`, which git ignores (`.env*` except
`.env.example`). Server-only secrets never take the `NEXT_PUBLIC_` prefix.

## Forms

The contact form (`layout/ContactForm`, used by ContactModal and /contact) and
the sign-up form (`ui/SubscribeForm`) are **simulated**: they validate, then
show their success state without sending anything. The site is the final
high-fidelity build. Developers wire both at hand-off:

- Submit through a Server Action or a route handler.
- Validate on the server with a schema, and return field errors to the form.
- Send to the CRM or email provider. Keys go in `lib/env.ts`, server-only.
- Add the provider's origin to the CSP `connect-src` or `form-action` in
  `next.config.mjs` only if the browser talks to it directly.
- Keep the success and error copy in `content/ui.ts`.

## When a runtime data source is added

Adopt the full standard at that boundary, not before:

- **Typed fetchers.** Put them behind `lib/content.ts`, or in a sibling module
  for non-content data.
- **Schema validation.** Validate every external response at the boundary.
- **Explicit UI states.** Loading, error with retry, empty and success, wherever
  data arrives on the client.
- **Error boundaries.** Use `error.tsx` per route segment, so one failing source
  degrades its section and not the page.
- **Caching.** Use tag-based revalidation (`revalidateTag`) from the source's
  webhook. Pages stay static where they can.
