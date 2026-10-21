# CONTENT: DHIRA Website v3

Where every word on the site lives, how it reaches the page, and how to move it
into a headless CMS. Read this before you edit copy, add a page or article, or
connect a CMS.

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
content/*.ts                 typed documents (today: local files; later: the CMS)
   │
lib/content.ts               the content API: async, cached getters (server only)
   │
app/**/page.tsx              the route: awaits its document, passes slices down
   │
components/sections/*        templates: render props, never fetch
components/demos/*
```

1. **The route loads.** `app/delivery/page.tsx` calls `await getPage("delivery")`,
   plus any collection it needs (`getCustomerStories()`), and uses `seo` for
   `generateMetadata`.
2. **The route passes slices.** Each section gets exactly its part:
   `<DeliveryFAQ content={page.faq} />`. The section's prop type is a slice of the
   document type (`DeliveryPage["faq"]`), so a field change shows up as a type
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

Every getter is `async` and wrapped in React `cache()` today. That is deliberate:
when a CMS replaces the local files, the getters start awaiting a network call
and nothing that calls them changes. A document is read once per request
however many components ask for it.

## The content model

| Kind | Where | Read with | CMS equivalent |
|---|---|---|---|
| Shared primitives | `content/types.ts` (`Link`, `Cta`, `ImageAsset`, `Seo`, `PageSection`, `Eyebrow`, `TwoTone`, `Faq`, `Block`) | (types only) | field types and objects |
| Reusable blocks | `content/blocks.ts` (`PageCloseBlock`, `ProvenAtScaleBlock`) | (types only) | block or object types used on several pages |
| Site settings | `content/site.ts` | `getSiteSettings()` | singleton |
| Navigation | `content/navigation.ts` | `getNavigation()` | singleton |
| Interface strings | `content/ui.ts` | `getUiStrings()` / `useUi()` | singleton (or the i18n message store) |
| Site map | `content/site-map.ts` | `getSiteMap()`; `lib/routes.ts` adds collections | singleton, or derived from page documents |
| Pages | `content/pages/*.ts` | `getPage(key)` | one document type per page template |
| Sector pages | `content/pages/sectors.ts` + `sectors-map.ts` | `getSector(slug)` | one `sector` type, six documents |
| Collections | `content/collections/*.ts` | `getInsights()`, `getInsight(slug)`, ... | one document type per collection |

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
  interfaces are the CMS contract: a CMS schema must produce these shapes, or its
  generated types replace them.
- **Plain data only:** strings, numbers, booleans, arrays and objects. No JSX,
  no functions, no class instances. A document must survive being serialised to
  JSON, because that is what a CMS returns and what crosses the server/client
  boundary.
- **Long-form text is `Block[]`** (`content/types.ts`): `p`, `h2` (with an `id`
  for the table of contents), `h3`, `ul`, `ol`, `quote` and `note`. Inline links
  are written `[label](href)` inside any text. `ui/RichText` renders the blocks.
  A CMS rich-text field (Portable Text, Lexical, Slate) maps onto these block
  types one to one.
- **Section ids are content.** `sections: PageSection[]` drives the page minimap
  and the hero's on-page index, and each `id` must match the rendered section's
  DOM id. Nav links point at these ids, so renaming one is a breaking change.
- **Images** are paths under `public/` today, typed `ImageAsset` (with `alt`)
  where the document owns the image. A CMS asset URL drops into the same field.
  Add the CMS host to `images.remotePatterns` and to the CSP `img-src` in
  `next.config.mjs`.
- **Mailto links** are built in content with `mailto(subject)` from
  `content/site.ts`, so the inbox is defined once.
- **Region-specific copy** is keyed by region (`Record<Region, ...>`), for example
  the pricing page's `seo` and how-to-buy routes. See ARCHITECTURE "Regions".

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
all follow. Do the same for press releases and customer stories.

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

## Connecting a CMS

The migration replaces **the bodies of the functions in `lib/content.ts`** and
nothing else. Routes, components and types stay as they are.

1. **Model.** Create one CMS type per interface above:
   - pages, the sector template and collections as document types
   - `site`, `navigation` and `ui` as singletons
   - `blocks.ts` shapes as reusable objects
   - `Block[]` as the rich-text field

   Keep field names identical, or map them in step 3.
2. **Import.** Each local file is plain data, so it can be exported to JSON and
   imported as the first revision of its document. That gives editors exactly
   what is live today.
3. **Fetch.** In `lib/content.ts`, replace each `cache(async () => localDoc)` with
   a fetch from the CMS client that returns the same type. Validate at the
   boundary: parse the response with a schema (for example Zod) generated from,
   or checked against, the interfaces. A CMS typo must fail loudly at build or
   in preview, not render `undefined`.
4. **Revalidate.** Tag each fetch (`next: { tags: ["page:delivery"] }`), add a
   route handler the CMS webhook calls with `revalidateTag`, and keep pages
   static.
5. **Preview.** Enable Next.js Draft Mode in a route handler. In draft mode the
   getters read draft content and skip the cache.
6. **Secrets.** CMS project ids and tokens go in `lib/env.ts` (server-only, no
   `NEXT_PUBLIC_` prefix) and in `.env.example`.
7. **Delete** the migrated local files. Keep `content/types.ts` and the
   interfaces, or replace them with the CMS's generated types.

Things that stay in code after the migration: the artwork boundary above,
`lib/region.ts` (which paths have an India version), and design tokens.
