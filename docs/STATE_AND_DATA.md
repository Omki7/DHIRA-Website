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
- India-only items on shared pages (careers, ARCHITECTURE.md "Regions") work
  the same way: absent from the static HTML, shown after mount to visitors
  in India (`ui/RegionOnly`, `isShownTo`).

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

The contact form (`features/contact/components/ContactForm`, used by
ContactModal and /contact) submits through a Server Action,
`features/contact/actions/contact.action.ts`, which filters spam (4 Nov 2026,
user: the live site gets about 50 spam messages a day). Delivery is still
**simulated**: the action reports success without sending anything until
developers connect email or a CRM at its `HAND-OFF` line. Every check is
invisible to people:

1. **Bot traps** (`utils/spam.ts` `isBot`). A hidden honeypot field
   (`website`), and the time the form was open (`elapsed`, added by the form
   only when it sends, so a bot copying the page's HTML does not have it).
   Under 3 seconds, or missing, is a bot. A bot is told its message was sent,
   so it learns nothing, and nothing is kept. These checks run before
   validation.
2. **Validation** (`schemas/contact.schema.ts`, Zod). The form checks the
   same rules first, so a person sees field errors at once; the server
   checks again. `interest` must be empty or one of the form's own options.
   Field errors go back to their fields; a failed send shows one line under
   the button.
3. **Content flags** (`utils/spam.ts` `spamFlags`). Signs of spam a person
   could also send: more than two links, a link in the name or company, a
   stock pitch (SEO, backlinks, guest posts, crypto, casino and the like),
   Cyrillic or East Asian script, a message that repeats the name or company.
   These never block. The message is delivered with `suspectedSpam: true`
   and the matched flags, so the team can file it for review and a real
   enquiry is never lost to a false match.

If spam still gets through after launch, the next layer is a challenge such
as Cloudflare Turnstile (needs an account, its keys in `config/env.ts`, and
its origin in the CSP), or a rate limit per address backed by a store such as
Vercel KV. In-memory limits do not hold across serverless instances.

The site is the final high-fidelity build.

The email sign-ups are **simulated** too, and already submit through a
Server Action, `lib/subscribe.ts`. One form, `features/newsletter`
`SubscribeForm`, in two places: the footer's "Stay in touch"
(`layout/FooterSubscribe`) and, since 4 Nov 2026, the /insights follow
section on the index and every article ("Get new essays"). Both join one
list; a hidden `source` field (`footer` or `insights`) says which, since
the footer also shows on /insights pages. No consent checkbox: the form
does nothing but subscribe, so pressing the button is the consent, with
the notice under it. The action checks the address, turns away personal
mailboxes (gmail.com, outlook.com and the like) with a request for a
business email, drops honeypot submissions, then reports success without
saving. Connecting a mailing list or CRM is the one marked `HAND-OFF` line
in that action. Its error state (`failed`) and copy are already in place.

Both forms already submit through a Server Action, and the contact form
validates with a schema and returns field errors. Developers wire delivery
at hand-off:

- Send to the CRM or email provider. Keys go in `lib/env.ts`, server-only.
- For the contact form, mark `suspectedSpam` messages (a "[Suspected spam]"
  subject or a review folder); never drop them.
- For the sign-ups, send a confirmation email before adding an address
  (double opt-in), keep `source`, `page` and the time of signing up, and put
  an unsubscribe link in every email. The /insights notice promises it.
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
