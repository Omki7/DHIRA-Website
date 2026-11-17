# CONTENT: DHIRA Website v3

Where every word on the site lives and how it reaches the page. Read this
before you edit copy or add a page or article.

**There is no CMS.** Content is typed data in `src/content/`, edited in the
files and shipped with the build (17 Nov 2026, user: the Strapi integration
added on 6 Nov was removed; the site does not need one).

## The rule

**No copy in components.** Every word a visitor reads, every figure, link and
image path is data in `content/`. Components are templates: they receive
content as props and render it.

There is one documented exception: the [artwork boundary](#artwork-boundary).

The rule is enforced by tooling, not by convention:

- `eslint.config.mjs` fails the lint when anything in `app/`, `components/`,
  `hooks/` or `lib/` makes a **value** import from `@/content`. Type imports
  (`import type { AkashicPage } from "@/content/pages/akashic"`) are allowed:
  the types are the contract. `lib/content.ts` is the only exemption.
- `lib/content.ts` imports `server-only`, so a client component that tries to
  fetch content fails the build.

## How content reaches the page

```
content/*.ts                 typed documents: the one source of content
   │
lib/content.ts               the content API: async, cached getters (server only)
   │
app/**/page.tsx              the route: awaits its document, passes slices down
   │
components/sections/*        templates: render props, never fetch
components/demos/*
```

1. **The route loads.** `app/services/page.tsx` calls `await getPage("services")`,
   plus any collection it needs (`getCustomerStories()`), and uses `seo` for
   `generateMetadata`.
2. **The route passes slices.** Each section gets exactly its part:
   `<ServicesFAQ content={page.faq} />`. The section's prop type is a slice of the
   document type (`ServicesPage["faq"]`), so a field change shows up as a type
   error everywhere it matters.
3. **Interface microcopy** (aria labels, "Previous", "Read more", form labels) is
   one document, `content/ui.ts`:
   - Server components call `await getUiStrings()`.
   - Client components call `useUi()` (`components/providers/UiProvider.tsx`).
     The root layout loads the strings once and provides them, the way an i18n
     library hands messages to the client.
4. **Site-wide facts** (company name, legal entity, offices, inbox, social links,
   default SEO) are `content/site.ts`, read with `getSiteSettings()`.
   Navigation and footer are `content/navigation.ts`, read with
   `getNavigation()`.

Every getter is `async` and wrapped in React `cache()`: a document is read once
per render however many components ask for it, and the call sites would not
change if a getter's body ever did.

## The content model

| Kind | Where | Read with |
|---|---|---|
| Shared primitives | `content/types.ts` (`Link`, `Cta`, `ImageAsset`, `Seo`, `PageSection`, `Eyebrow`, `TwoTone`, `Faq`, `Block`) | (types only) |
| Reusable blocks | `content/blocks.ts` (`PageCloseBlock`, `ProvenAtScaleBlock`) | (types only) |
| Site settings | `content/site.ts` | `getSiteSettings()` |
| Navigation | `content/navigation.ts` | `getNavigation()` |
| Interface strings | `content/ui.ts` | `getUiStrings()` / `useUi()` |
| Site map | `content/site-map.ts` | `getSiteMap()`; `lib/routes.ts` adds collections |
| Pages | `content/pages/*.ts` | `getPage(key)` |
| Sector pages | `content/pages/sectors.ts` + `sectors-map.ts` | `getSector(slug)` |
| Collections | `content/collections/*.ts` | `getInsights()`, `getInsight(slug)`, ... |

**Collections** (many entries of one shape):

- `insights`: articles. Each has a slug, date, category and `Block[]` body.
- `press-releases`: newsroom releases.
- `customer-stories`: the "Proven at scale" programmes and `/customers/[slug]`.
- `roles`: open roles on /careers.
- `leaders`: the About page portraits.
- `events`.
- `glossary`: terms, linkable by `#id`.
- `integrations`: the connector directory. It is derived from the Akashic module
  sheets so the two pages cannot drift.
- `legal`: the five policy pages. `slug` is the route.

### Conventions

- **Every document is explicitly typed** and its interface sits beside it. The
  interfaces are the contract every component is typed against.
- **Plain data only:** strings, numbers, booleans, arrays and objects. No JSX,
  no functions, no class instances. A document must survive being serialised to
  JSON, because that is what crosses the server/client boundary.
- **Long-form text is `Block[]`** (`content/types.ts`): `p`, `h2` (with an `id`
  for the table of contents), `h3`, `ul`, `ol`, `quote` and `note`. Inline links
  are written `[label](href)` inside any text. `ui/RichText` renders the blocks.
- **Section ids are content.** `sections: PageSection[]` drives the page minimap
  and the hero's on-page index, and each `id` must match the rendered section's
  DOM id. Nav links point at these ids, so renaming one is a breaking change.
  An optional `chapter` groups consecutive sections into one index row
  (17 Nov 2026); their eyebrows then carry the chapter's number and read
  "Chapter / Label" (DESIGN_SYSTEM §3 and §9).
- **Images** are paths under `public/`, typed `ImageAsset` (with `alt`) where
  the document owns the image. The site loads no remote images: the CSP
  `img-src` in `next.config.mjs` is `'self'`.
- **Mailto links** are built in content with `mailto(subject)` from
  `content/site.ts`, so the inbox is defined once.
- **Region-specific copy** is keyed by region (`Record<Region, ...>`). No page
  has an India version today (pricing is US dollars only since 21 Oct 2026).
  See ARCHITECTURE "Regions".

### DRAFT markers

A document whose copy still needs sign-off says so in its header comment, with
`DRAFT` and what is pending (for example the Delivery SLA figures, the Trust
Center frameworks, the registered office and CIN). Keep the marker until the
founder or the named owner confirms. Never present a DRAFT figure as a sourced
one in new copy (Design Rule 4).

<a id="artwork-boundary"></a>
## The artwork boundary

Labels that are **part of a drawing or a simulated product screen** stay in the
component. Examples: the axis ticks in a diagram, "Rack 01" on a rack drawing,
the column headers in a fake dashboard, the sample rows in
`demos/mockups/*`. They are illustration, not editorial copy:

- They are tied to the geometry they label.
- A content editor changing them would break the drawing.
- They are not searchable claims.

The boundary:

| Moves to `content/` | Stays in the component |
|---|---|
| Headlines, ledes, body copy, captions under a figure | Labels drawn inside an SVG or a mockup |
| CTAs and links | Sample data inside a simulated screen |
| Every figure that makes a claim (stats, KPIs, prices) | Decorative glyphs and separators (`·`, `→`) |
| Accessible names (`aria-label`, `alt`) | Animation timing and layout constants |
| Section ids and eyebrow labels | |

If a label inside a drawing makes a factual claim (a real customer number, a real
system name used as proof), it belongs in content. Pass it in as a prop.

Every simulated screen lives in `components/demos/mockups/`. It is named
`*Mockup` and carries a `SIMULATED PRODUCT UI` banner comment.

## Common tasks

**Edit copy or a figure.** Find it in `content/pages/<page>.ts` (search for the
visible text). Change it there. Never edit the component.

**Add an article.** Add an entry to `content/collections/insights.ts`. The
article page, the hub row, the RSS item, the sitemap entry and the llms.txt line
all follow. Insights essays are written like a good long-form blog: open on a
scene, plain sentences of mixed length, a point of view, one pull quote
(`quote`), a closing `note` the reader can take into a meeting, no bullet
lists. Byline a DHIRA team from `TEAM`, never a person. A new essay needs a
cover plate: add its key to `InsightCover` and draw it in
`sections/insights/InsightCover.tsx` (hairlines, one blue accent, no data). Do the same for press releases and customer stories.

**Add a section to a page.**

1. Add its shape to the page's interface, and its content to the document.
2. Build the component under `components/sections/<page>/`, with props typed
   `PageType["newSection"]`.
3. Render it in the route, passing `content={page.newSection}`.
4. Add its entry to `sections`, then update the ARCHITECTURE section map.

**Add a page.**

1. Create `content/pages/<name>.ts` with a typed document that includes `seo`.
2. Register it in the `pages` map in `lib/content.ts`.
3. Create `app/<name>/page.tsx` with `generateMetadata` and `<main id="main">`.
4. Add the route to `content/site-map.ts`, which feeds the sitemap, `/site-map`
   and llms.txt.

**Add interface microcopy.** Add the key to `UiStrings` and its value in
`content/ui.ts`. Read it with `useUi()` (client) or `getUiStrings()` (server).
