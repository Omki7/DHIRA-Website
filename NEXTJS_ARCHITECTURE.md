# NEXTJS_ARCHITECTURE.md — DHIRA Website v3

The approved Next.js architecture for this repository: folder structure,
routing conventions, Server and Client Component boundaries, data access,
coding standards and the development checklist. Every future change follows
it. Read it with [AGENTS.md](AGENTS.md) (the design, voice and content
kernel) and the topic docs in [docs/](docs/).

| Item       | Value                                                                        |
| ---------- | ---------------------------------------------------------------------------- |
| Repository | `dhira-io/Dhira-Website` (DHIRA company website v3)                          |
| Status     | v1.0 — analysis of the current tree + approved target structure              |
| Analysed   | 03 Nov 2026, branch `features/project-setup`                                 |
| Principle  | **Analyse first. Document second. Refactor only when explicitly requested.** |

Throughout this document:

- **Current** = what the code does today (verified in the source).
- **Target** = the approved structure that new and touched code moves towards.
- **Proposed** = a recommendation that still needs an explicit request.

---

## Contents

1. [Architecture overview](#1-architecture-overview)
2. [Technology stack](#2-technology-stack)
3. [Current folder structure](#3-current-folder-structure)
4. [Assessment of the current architecture](#4-assessment-of-the-current-architecture)
5. [Target folder structure](#5-target-folder-structure)
6. [Folder responsibilities and layer rules](#6-folder-responsibilities-and-layer-rules)
7. [Feature-based modules](#7-feature-based-modules)
8. [Routing conventions](#8-routing-conventions)
9. [Server and Client Components](#9-server-and-client-components)
10. [Feature-level data and API architecture](#10-feature-level-data-and-api-architecture)
11. [Central API infrastructure](#11-central-api-infrastructure)
12. [Server Actions and Route Handlers](#12-server-actions-and-route-handlers)
13. [Data fetching, rendering and caching](#13-data-fetching-rendering-and-caching)
14. [State management](#14-state-management)
15. [Forms and validation](#15-forms-and-validation)
16. [Component architecture](#16-component-architecture)
17. [Styling and design system](#17-styling-and-design-system)
18. [Security](#18-security)
19. [Performance](#19-performance)
20. [Testing](#20-testing)
21. [Imports and dependencies](#21-imports-and-dependencies)
22. [Naming conventions](#22-naming-conventions)
23. [Development checklist](#23-development-checklist)
24. [Architecture decision rules](#24-architecture-decision-rules)
25. [Decision log](#25-decision-log)
26. [Migration roadmap](#26-migration-roadmap)

---

## 1. Architecture overview

This is a **content-driven marketing website**, statically rendered at build
time. It has no database, no login, no client data fetching and no external
backend API today. Every word on the site is typed data in `src/content/`,
read on the server through one content service and passed to components as
props.

The architecture is **feature-based and layered** on Next.js App Router
conventions:

```
src/app/            routing only: thin route files compose a feature's page
   ↓
src/features/<x>/   one business area (a page family): components, pages, types, utils, actions
   ↓
src/shared/         business-agnostic kit, hooks and utilities
src/services/       infrastructure: the content service (CMS hand-off), future API clients
src/config/         validated environment and site constants
src/content/        the typed content documents (the CMS stand-in), read only by services/content
```

Dependencies point **down** only. A route never contains business UI; a
feature never reaches into another feature's internals; `shared/` never
knows about features.

---

## 2. Technology stack

**Current** (installed versions, verified 03 Nov 2026):

| Concern                             | Choice                                                                                                                                            | Version            | Evidence                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| Framework                           | Next.js, **App Router**, Turbopack                                                                                                                | 16.4.4 (`^16.4.4`) | `src/app/`, `next.config.mjs`                                                                    |
| UI                                  | React + React DOM                                                                                                                                 | 19.0.0             | Server Components by default                                                                     |
| Language                            | TypeScript, `strict: true`                                                                                                                        | 5.7.3              | `tsconfig.json`; no `any` in `src/`                                                              |
| Rendering                           | Static prerendering of every route (53)                                                                                                           | —                  | `npm run build`; `generateStaticParams` for `[slug]` routes                                      |
| Styling                             | Tailwind CSS + CSS custom-property tokens; **Sass 1.83.4 installed** with SCSS tokens and mixins for the approved SCSS Modules migration (ADR-03) | Tailwind 3.4.17    | `tailwind.config.ts`, `src/app/theme.css`, `src/assets/styles/`                                  |
| Animation                           | framer-motion                                                                                                                                     | 12.42.2            | Client Components only                                                                           |
| Validation                          | Zod                                                                                                                                               | 3.25.76            | `src/config/env.ts`                                                                              |
| Server state                        | None (build-time content, React `cache()`)                                                                                                        | —                  | `src/services/content/content.ts`                                                                |
| Client state                        | `useState`, React Context, `useSyncExternalStore` stores                                                                                          | —                  | `src/shared/providers/UiProvider/`, `src/shared/utils/theme.ts`, `src/shared/hooks/useRegion.ts` |
| Forms                               | Native forms; one Server Action                                                                                                                   | —                  | `ContactForm.tsx`, `src/services/subscribe/subscribe.ts`                                         |
| HTTP client / TanStack Query / auth | None                                                                                                                                              | —                  | No backend calls, no login                                                                       |
| Lint / format                       | ESLint 9 flat config (`eslint-config-next` 16.4.4 + layer, import-order and no-cycle rules), Prettier 3.9.10, knip 5.88.1                         | —                  | `eslint.config.mjs`, `.prettierrc.json`, `knip.json`                                             |
| Testing                             | None                                                                                                                                              | —                  | No test runner or test files                                                                     |
| Hosting                             | Vercel (preview noted in content); security headers in `next.config.mjs`                                                                          | —                  | `next.config.mjs`, `content/navigation.ts`                                                       |
| Node                                | `>=20.9.0`, pinned in `.nvmrc`                                                                                                                    | —                  | `package.json`                                                                                   |

No middleware or proxy file exists. The stack does not change (§24).

---

## 3. Current folder structure

**Current** (after Phases 1 and 2 of §26, 03 Nov 2026):

```
public/                       static files (brand, avatars, proof, sectors, solutions, favicons)
src/
  app/                        routes (32 page.tsx), layout.tsx, error.tsx, not-found.tsx,
                              globals.css, theme.css, manifest/robots/sitemap,
                              llms.txt/route.ts, insights/rss.xml/route.ts
    _lib/metadata.ts          pageMetadata(seo): canonical, hreflang, Open Graph (private folder)
    _components/Nav.tsx       server shell: loads navigation, renders shared NavBar
    _components/Footer.tsx    server shell: loads content, composes shared FooterContent
                              with the newsletter and region features (slots)
  features/                   SCSS Modules, ComponentName/ folders, public index.ts
    contact/                  ContactForm, ContactModal
    newsletter/               FooterSubscribe + actions/subscribe.action.ts (Server Action, SIMULATED save)
    region/                   RegionSuggest, RegionSwitch
  shared/
    components/               SCSS Modules, ComponentName/ folders; import from the group barrel
      ui/                     16: FigureEyebrow, SectionHeader, SectionLink, SectionCoda, TwoToneTitle,
                              Tag, PreviewTag, PageHero, PageClose, DrawingSetClose, MotionToggle,
                              RotatingPhrase, ScrollReveal, ScrollRevealRail, ThemeSwitch,
                              OffscreenAnimationGate
      navigation/             10: NavBar (split), MegaSheet, MenuPanel, MobileNav, NavFeatured,
                              AnnouncementBar, FooterContent, PageMinimap, RegionLink, HashLanding
      data-display/           FaqSection, RichText, JsonLd, ShareLinks
      forms/                  SubscribeForm
      icons/                  DhiraLogo, AkashicLogo, AkashicWordmark, AssistantLogo,
                              CloudProviderLogos, ConnectorLogo, DynamicSketchIcon, NavIcons
    providers/UiProvider/     UiProvider + useUi() (interface strings for Client Components)
    hooks/                    10 hooks (reduced motion, on-screen, drawn, tour, region…)
    utils/                    cx, format, region, richText, navigation, theme, pricing, glossary, insights
  components/                 LEGACY LOCATION (Tailwind), dissolves into features/ in Phase 3
    sections/<page>/          page sections (26 folders) + 12 homepage sections at the root
    demos/  demos/mockups/    animated figures; simulated product UI (*Mockup)
    ui/eis/  ui/life/  pages/ page-scoped pieces of solutions and pricing
  content/                    typed content documents: pages/, collections/, site, navigation, ui
  services/content/           content.ts (server-only content API), routes.ts (route list)
  config/                     env.ts (Zod-validated), site.ts (SITE_URL, absoluteUrl)
  assets/styles/              _tokens.scss, _mixins.scss, index.scss
```

**Path changes from the older docs.** `AGENTS.md` and `docs/*.md` were written
before the move and still name the old paths. Read them through this table:

| Old path in AGENTS.md / docs                                             | Current path                                                               |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `app/…`                                                                  | `src/app/…`                                                                |
| `components/…`                                                           | `src/components/…`                                                         |
| `content/…`                                                              | `src/content/…`                                                            |
| `hooks/…`                                                                | `src/shared/hooks/…`                                                       |
| `lib/content.ts`, `lib/routes.ts`                                        | `src/services/content/content.ts`, `…/routes.ts`                           |
| `lib/subscribe.ts`                                                       | `src/features/newsletter/actions/subscribe.action.ts`                      |
| `lib/env.ts`, `lib/site.ts`                                              | `src/config/env.ts`, `src/config/site.ts`                                  |
| `lib/metadata.ts`                                                        | `src/app/_lib/metadata.ts`                                                 |
| `lib/<other>.ts`                                                         | `src/shared/utils/<other>.ts`                                              |
| `components/providers/UiProvider.tsx`                                    | `src/shared/providers/UiProvider/`                                         |
| `components/ui/<Name>.tsx`                                               | `src/shared/components/{ui,data-display,forms}/<Name>/`                    |
| `components/icons/<Name>.tsx`, `layout/nav/NavIcons`                     | `src/shared/components/icons/<Name>/`                                      |
| `components/layout/nav/*`, `PageMinimap`, `HashLanding`, `ui/RegionLink` | `src/shared/components/navigation/<Name>/`                                 |
| `components/layout/ThemeSwitch`, `OffscreenAnimationGate`                | `src/shared/components/ui/<Name>/`                                         |
| `components/layout/Nav`, `Footer`                                        | `src/app/_components/Nav.tsx`, `Footer.tsx` (+ `navigation/FooterContent`) |
| `components/layout/ContactForm`, `ContactModal`                          | `src/features/contact/`                                                    |
| `components/layout/FooterSubscribe`                                      | `src/features/newsletter/`                                                 |
| `components/layout/region/*`                                             | `src/features/region/`                                                     |

---

## 4. Assessment of the current architecture

| Area                | Current implementation                                                                                                                                                                       | Verdict                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Router              | App Router only; 32 pages, 3 dynamic `[slug]` routes with `generateStaticParams`; 2 permanent redirects in `next.config.mjs`                                                                 | Good                                                                                                |
| Route files         | Each `page.tsx` loads content, sets metadata and composes sections; **every page also renders `<Nav />` and `<Footer />` itself** (32 copies)                                                | Thin, but the chrome belongs in a group layout (§8, P-01)                                           |
| Server/Client split | Server Components by default; 88 of 245 `.tsx` files are Client Components, all leaf-level (animation, menus, toggles); no Client Component imports a server-only module                     | Good                                                                                                |
| Data                | Content is typed, read through `services/content` (`server-only`, React `cache()`); ESLint blocks content-value imports anywhere else                                                        | Good; CMS-ready                                                                                     |
| Server Actions      | One: footer sign-up, validates on the server, save is SIMULATED                                                                                                                              | Correct pattern; needs a real backend before launch                                                 |
| Route Handlers      | `llms.txt`, `insights/rss.xml`, both `force-static`, generated from content                                                                                                                  | Good                                                                                                |
| Organisation        | By page under `components/sections/<page>/`, with page-specific figures split away into `components/demos/`                                                                                  | **Weakness:** one page's code is spread across 3–4 folders; no feature modules or public `index.ts` |
| Shared kit          | `components/ui/` holds the section grammar (eyebrow, header, page hero, close, FAQ, tags)                                                                                                    | Good content; wrong location (target `shared/components/`)                                          |
| Component files     | One flat file per component, 196 of 211 default exports, inline prop types; 15 files over 300 lines (largest 1,293)                                                                          | Weakness (§16)                                                                                      |
| Styling             | Tailwind utility classes everywhere, tokens as CSS variables (light + dark), 2 page-scoped CSS files                                                                                         | Consistent; SCSS Modules migration approved (ADR-03)                                                |
| Error / loading     | `error.tsx` (branded) and `not-found.tsx`; no `global-error.tsx`; no `loading.tsx` (nothing streams)                                                                                         | Add `global-error.tsx` (P-04)                                                                       |
| Forms               | Native validation; contact submit SIMULATED; careers "Apply" points at `#talk-to-our-team`                                                                                                   | Real submission missing (P-06)                                                                      |
| Environment         | One reader (`config/env.ts`), Zod-validated, public value only, documented in `.env.example`                                                                                                 | Good                                                                                                |
| Security            | CSP, HSTS, `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`; JSON-LD escapes `<`; external links `noopener noreferrer`; production `npm audit`: 0 vulnerabilities | Good                                                                                                |
| Fonts               | Google Fonts `<link>`, not `next/font`: `next/font` has no Google Sans Text or Google Sans Mono (comment in `app/layout.tsx`)                                                                | Justified exception                                                                                 |
| Images              | `next/image` in 24 files; one plain `<img>` (`sections/newsroom/NewsroomSections.tsx`)                                                                                                       | Minor (P-08)                                                                                        |
| Testing / CI        | None in the repository                                                                                                                                                                       | **Weakness** (P-05)                                                                                 |
| Quality gate        | `npm run check` (tsc + ESLint + knip) and `npm run build` pass                                                                                                                               | Good                                                                                                |

**Architectural weaknesses, in priority order**

1. Page code is scattered across `sections/`, `demos/`, `demos/mockups/`, `ui/<page>/` and `pages/`; there are no feature modules or public APIs (fixed by §5 and §26).
2. Site chrome (`Nav`, `Footer`) is repeated in every route instead of one route-group layout.
3. No automated tests and no CI pipeline.
4. Forms and careers applications are simulated (launch blocker, not an architecture gap).
5. Large components (15 over 300 lines) and default-export, flat-file components.
6. No `global-error.tsx`.

---

## 5. Target folder structure

**Target** for this project. It applies the reference standard to what the
site actually is: no `(auth)` or `(dashboard)` groups, no `services/api/`,
`store/` or `services/auth/` until a real need exists (§24). Folders are
created only when they hold code.

```
public/                               static files; referenced by absolute path
src/
  app/                                ROUTING ONLY
    (site)/                           route group: no URL segment; one layout for the chrome
      layout.tsx                      <Nav /> … <Footer />  (P-01)
      page.tsx                        → features/home
      akashic/page.tsx  akashic/1-0/page.tsx
      services/  about/  careers/  contact/  partners/  pricing/  glossary/  site-map/
      solutions/  solutions/enterprise-intelligence/  solutions/life/
      sectors/{education,energy,finance,healthcare,manufacturing,retail,public-sector}/
      insights/  insights/[slug]/  customers/  customers/[slug]/  newsroom/  newsroom/[slug]/
      privacy/  terms/  cookies/  accessibility/  legal/
    insights/rss.xml/route.ts         Route Handlers keep their public URLs
    llms.txt/route.ts
    _lib/metadata.ts                  route-level helpers (private folder)
    providers/                        UiProvider (+ any future app-wide provider)
    layout.tsx  error.tsx  global-error.tsx  not-found.tsx
    globals.scss  theme.css           (globals.css until Tailwind is retired)
    manifest.ts  robots.ts  sitemap.ts  opengraph-image.png

  features/                           ONE FOLDER PER BUSINESS AREA
    home/  akashic/  services/  about/  careers/  solutions/  sectors/
    pricing/  insights/  customers/  newsroom/  proof/  contact/  newsletter/
    partners/  glossary/  legal/  site-map/  region/

  shared/
    components/
      ui/                             FigureEyebrow, SectionHeader, SectionLink, TwoToneTitle, Tag,
                                      PreviewTag, PageHero, PageClose, MotionToggle, RotatingPhrase,
                                      ScrollReveal, ScrollRevealRail, ThemeSwitch, …
      navigation/                     Nav, NavBar, MegaSheet, MenuPanel, MobileNav, Footer,
                                      PageMinimap, AnnouncementBar, RegionLink
      data-display/                   FaqSection, RichText, JsonLd, ShareLinks, LongformArticle
      feedback/                       OffscreenAnimationGate, HashLanding, (future Toast)
      icons/                          DhiraLogo, AkashicLogo, AkashicWordmark, AssistantLogo, …
    hooks/                            usePrefersReducedMotion, useOnScreen, useDrawn, useTour, …
    utils/                            format, richText, navigation, theme
    types/                            shared primitives (Link, Cta, ImageAsset, Seo, Block…)
    constants/                        (when needed)

  services/
    content/                          content.ts (server-only CMS hand-off), routes.ts
    api/                              ONLY when a real backend arrives (§11)

  config/                             env.ts, site.ts
  content/                            typed documents: the CMS stand-in (ADR-02)
  assets/styles/                      _tokens.scss, _mixins.scss, index.scss
```

Route groups never change URLs: `src/app/(site)/about/page.tsx` still serves `/about`.

---

## 6. Folder responsibilities and layer rules

| Folder               | Responsibility                                                                                     | Must not contain                                               |
| -------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `src/app/`           | URLs, layouts, metadata, special files; route files load data and render one feature page          | Business UI, styling decisions, content                        |
| `src/features/<x>/`  | Everything one business area needs: components, the page composition, types, utils, Server Actions | Code another feature needs (move it to `shared/` or export it) |
| `src/shared/`        | Business-agnostic building blocks used by two or more features                                     | Feature names, content values, data access                     |
| `src/services/`      | Infrastructure: the content service, future HTTP clients and integrations                          | Feature UI or feature-specific endpoints                       |
| `src/config/`        | Validated environment, site constants                                                              | Anything app-specific                                          |
| `src/content/`       | Typed content documents (copy, figures, links)                                                     | Logic or React                                                 |
| `src/assets/styles/` | SCSS tokens, mixins, globals                                                                       | Component styles (those live beside the component)             |

**Import rules** (ESLint-enforced in `eslint.config.mjs`):

| Layer                                           | May import                                                                     | Must not import                  |
| ----------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------- |
| `app/`                                          | features (public `index.ts`), shared, services, config                         | feature internals                |
| `features/<x>/`                                 | shared, services, config, content **types**, other features' public `index.ts` | another feature's internal files |
| `shared/`                                       | shared, config, assets, content **types**                                      | features, app, services          |
| `services/`                                     | config, shared/types, `src/content` (content service only)                     | features, app, components        |
| `config/`                                       | nothing app-specific                                                           | everything else                  |
| everything except `services/content/content.ts` | content **types** only                                                         | content **values**               |

---

## 7. Feature-based modules

### 7.1 Feature anatomy (this project)

```
features/akashic/
  components/
    AkashicHeroQuote/
      AkashicHeroQuote.tsx
      AkashicHeroQuote.module.scss
      index.ts
    AkashicModules/  AkashicStack/  …
  mockups/                    simulated product UI for this feature (*Mockup + banner, ARCHITECTURE §8a)
  pages/
    AkashicPage.tsx           composes the sections in order (Server Component)
  types/                      only when types are not already in src/content
  utils/
  actions/                    Server Actions owned by this feature (e.g. newsletter)
  index.ts                    PUBLIC API: AkashicPage, and what other features may reuse
```

Use only the folders a feature needs. `api/`, `schemas/` and `hooks/` appear
when the feature fetches, validates or has reusable logic.

### 7.2 Feature map (current location → target feature)

| Feature                                     | Moves in from (current)                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `home`                                      | `components/sections/*.tsx` (Hero, ProblemSection, MeetAkashic, BuiltOnAkashic, HowWeDeliver, EverySector, TheProof, EnterpriseSecurity, Voices, Closure, CareersStrip), `sections/universal-context/`, `demos/{DivergentAnswers,SolutionsOnFoundation,SolutionIllustration,VoicesDispatches}`, `mockups/{HomeHeroTeasers,HomeModuleIllustrations,AkashicOutcomeCards,ProofComparison}Mockup` |
| `akashic`                                   | `sections/akashic/` (16), `sections/release/` (the /akashic/1-0 page), `demos/akashic/`, `demos/AkashicFlowConnectors`, `mockups/Akashic{Teardown,PlateScreens,ModuleMoments}Mockup`                                                                                                                                                                                                          |
| `proof`                                     | `sections/ProvenAtScale`, `demos/ProvenStories`, `demos/AshokaChakra` (shared by home, akashic and services through `@/features/proof`)                                                                                                                                                                                                                                                       |
| `services`                                  | `sections/services/`, `demos/services/`                                                                                                                                                                                                                                                                                                                                                       |
| `about`                                     | `sections/about/` (+ `about-page.css`), `demos/about/`                                                                                                                                                                                                                                                                                                                                        |
| `careers`                                   | `sections/careers/`, `demos/careers/`                                                                                                                                                                                                                                                                                                                                                         |
| `solutions`                                 | `sections/solutions/`, `sections/eis/`, `sections/life/`, `demos/life/`, `mockups/eis/`, `mockups/life/`, `ui/eis/`, `ui/life/`                                                                                                                                                                                                                                                               |
| `sectors`                                   | `sections/sectors/` (+ `map/`), `sections/{education,energy,finance,healthcare,manufacturing,retail,public-sector}/`                                                                                                                                                                                                                                                                          |
| `pricing`                                   | `pages/PricingPage`, `sections/pricing/`, `demos/pricing/`, `shared/utils/pricing.ts`                                                                                                                                                                                                                                                                                                         |
| `insights`                                  | `sections/insights/`, `shared/utils/insights.ts`                                                                                                                                                                                                                                                                                                                                              |
| `customers`, `newsroom`                     | `sections/customers/`, `sections/newsroom/`                                                                                                                                                                                                                                                                                                                                                   |
| `contact`                                   | `sections/contact/`, `layout/ContactForm`, `layout/ContactModal`                                                                                                                                                                                                                                                                                                                              |
| `newsletter`                                | `layout/FooterSubscribe`, `services/subscribe/subscribe.ts` → `features/newsletter/actions/subscribe.action.ts`                                                                                                                                                                                                                                                                               |
| `region`                                    | `layout/region/{RegionSuggest,RegionSwitch}`, `shared/hooks/useRegion`, `shared/utils/region`                                                                                                                                                                                                                                                                                                 |
| `glossary`, `partners`, `legal`, `site-map` | their `sections/<name>/`; `shared/utils/glossary.ts` → `glossary`                                                                                                                                                                                                                                                                                                                             |

### 7.3 Thin route files

```tsx
// src/app/(site)/akashic/page.tsx  (target)
import type { Metadata } from "next";
import { pageMetadata } from "@/app/_lib/metadata";
import { AkashicPage } from "@/features/akashic";
import { getPage } from "@/services/content/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("akashic");
  return pageMetadata(page.seo);
}

export default async function Page() {
  const content = await getPage("akashic");
  return <AkashicPage content={content} />;
}
```

The route reads content and metadata; the feature page renders. Keep
`<main id="main">` and the page's `sections` list (minimap ids) intact when
moving a page (AGENTS.md).

---

## 8. Routing conventions

`src/app/` is the single source of truth for URLs.

| File                         | Responsibility here                                                                                                                 | Current                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `page.tsx`                   | The route's UI: load content, set metadata, render one feature page                                                                 | 32 routes                                                                     |
| `layout.tsx`                 | Shared shell. Root: fonts, theme bootstrap, `UiProvider`, `ContactModal`, `RegionSuggest`, Organization JSON-LD. Group: site chrome | Root only; **target** adds `(site)/layout.tsx`                                |
| `template.tsx`               | Re-mounts per navigation; use only for per-page enter animations                                                                    | Not used; not needed                                                          |
| `loading.tsx`                | Suspense fallback while a segment streams                                                                                           | Not used: every route is static. Add only with dynamic data                   |
| `error.tsx`                  | Client error boundary for a segment; offers retry                                                                                   | `src/app/error.tsx` (copy in `content/ui.ts` `error`)                         |
| `global-error.tsx`           | Replaces the root layout when the layout itself fails; must render `<html>` and `<body>`                                            | **Missing** (P-04)                                                            |
| `not-found.tsx`              | Branded 404                                                                                                                         | `src/app/not-found.tsx`                                                       |
| `route.ts`                   | Route Handler for a non-HTML response                                                                                               | `llms.txt`, `insights/rss.xml`                                                |
| `default.tsx`                | Fallback for parallel-route slots                                                                                                   | Not used                                                                      |
| Parallel routes (`@slot`)    | Render two segments in one layout                                                                                                   | Not used; no need today                                                       |
| Intercepting routes (`(.)x`) | Show a route in a modal on soft navigation                                                                                          | Not used; the contact modal is hash-driven (`#talk-to-our-team`) and stays so |
| Route groups (`(name)`)      | Share a layout without changing URLs                                                                                                | **Target:** `(site)` for the chrome                                           |
| Dynamic routes (`[slug]`)    | Collection detail pages with `generateStaticParams`                                                                                 | `customers`, `insights`, `newsroom`                                           |
| `_private` folders           | Colocated non-route code                                                                                                            | `_lib/`                                                                       |

Redirects live in `next.config.mjs` (permanent, fragments preserved). Never
redirect by region (docs/ARCHITECTURE.md "Regions").

---

## 9. Server and Client Components

**Rule: Server Components by default.** `"use client"` only where the browser
is required.

| Server Components (default)                | Client Components (opt in)                                         |
| ------------------------------------------ | ------------------------------------------------------------------ |
| Route files and layouts                    | `useState`, `useEffect`, `useRef` behaviour                        |
| Feature pages and static sections          | Event handlers: menus, tabs, carousels, sliders, toggles           |
| Reading content through `services/content` | Browser APIs: `IntersectionObserver`, `matchMedia`, `localStorage` |
| Metadata, JSON-LD, SEO copy                | framer-motion animation                                            |
| Static SVG figures                         | Form interaction (`ContactForm`, `FooterSubscribe`)                |

Rules:

1. Never put `"use client"` on a page, layout or section that only renders markup. Push the boundary down to the smallest interactive leaf.
2. Content reaches Client Components as **serialisable props** or through `useUi()` (`UiProvider`). Client Components never fetch content.
3. `services/content/content.ts` and `routes.ts` start with `import "server-only"`. Never import them, or any `*.server.ts`, from a Client Component.
4. Browser-only modules (future) start with `import "client-only"` (add the package when the first one appears).
5. Only `NEXT_PUBLIC_*` variables reach the browser, and only through `config/env.ts`. Secrets never get that prefix.
6. Do not `ssr: false` a content section; it drops from the HTML and hurts SEO and layout shift (docs/ARCHITECTURE.md "Dynamic imports").

**Current:** compliant. 88 Client Components, all leaves; layouts and pages are Server Components.

---

## 10. Feature-level data and API architecture

**Current:** there is no backend API. Data is the typed content in
`src/content/`, read through `services/content/content.ts`:

```ts
// src/services/content/content.ts (current)
import "server-only";
import { cache } from "react";
export const getPage = cache(async <K extends PageKey>(key: K) => pages[key]);
```

React `cache()` dedupes reads within one render; when a CMS replaces the local
documents, only this file changes (docs/CONTENT.md).

**Target, when a feature first needs remote data** (do not create these files
before then):

```
features/<x>/api/
  <x>.server.ts      import "server-only"; server fetches (Server Components, Server Actions)
  <x>.client.ts      browser fetches, only if the feature has client-side server state
  <x>.queries.ts     TanStack Query keys and options, only if TanStack Query is adopted (§13)
  <x>.mutations.ts   mutation hooks + invalidation, same condition
  index.ts
```

Rules: one function per backend operation; typed end to end from the real
contract; never invent endpoints; no business endpoints in a global service.

---

## 11. Central API infrastructure

**Current:** none, correctly: there is nothing to call.

**Target, created with the first real integration** (CMS, CRM, mailing list,
careers ATS):

```
services/api/
  api-client.server.ts   server fetch wrapper: base URL and secrets from config/env.ts, timeout, headers
  api-client.client.ts   browser wrapper, only if browser calls are needed
  api-error.ts           ApiError + toApiError(); users see a friendly message, logs keep the detail
  api.types.ts           shared envelope and pagination types from the real contract
```

Prefer the platform `fetch` (with Next.js caching options) over adding Axios.
Feature-specific calls stay in `features/<x>/api/`.

---

## 12. Server Actions and Route Handlers

**Server Actions** (`"use server"`) handle form posts and other mutations.

- **Current:** `src/services/subscribe/subscribe.ts` (footer sign-up). It checks the address and refuses personal mailboxes on the server; the save is SIMULATED.
- **Target:** feature-owned, `features/newsletter/actions/subscribe.action.ts`; the contact form gets `features/contact/actions/contact.action.ts` when its backend is chosen.
- Rules: validate every input on the server with Zod (client validation is convenience only); return typed result states, never throw raw errors to the client; keep provider keys server-side; the browser posts only to this origin (CSP `form-action 'self'`).

**Route Handlers** (`route.ts`) expose non-HTML responses.

- **Current:** `src/app/llms.txt/route.ts`, `src/app/insights/rss.xml/route.ts`, both `export const dynamic = "force-static"` and generated from content.
- Public machine-readable files keep their URLs (no `/api` prefix). A JSON endpoint for other systems would go under `src/app/api/`. None is needed today; do not add a proxy in front of a Server Action.

---

## 13. Data fetching, rendering and caching

| Need                                                 | Use                                                                                                                     | Here                                                                                      |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Page content, metadata, SEO                          | Server Component reading `services/content` at build time                                                               | Every page                                                                                |
| Collection detail pages                              | `generateStaticParams` + static rendering                                                                               | `customers`, `insights`, `newsroom`                                                       |
| Text feeds                                           | Route Handler, `force-static`                                                                                           | RSS, llms.txt                                                                             |
| A mutation from a form                               | Server Action                                                                                                           | Footer sign-up                                                                            |
| Interactive client-side server state with refetching | TanStack Query                                                                                                          | **Not needed today**; adopt only for a real interactive data feature and record it in §25 |
| Remote CMS data (future)                             | Server-side `fetch` in `content.ts` with `next: { revalidate, tags }`; `revalidateTag` from a CMS webhook Route Handler | Planned hand-off                                                                          |

Rules: static by default; never make a route dynamic without a reason; never
duplicate server data into client state; loading and error states exist for
anything that streams or fetches (`loading.tsx`, `error.tsx`, empty states in
lists such as the insights search).

---

## 14. State management

| State                         | Tool                                                            | Current examples                                                      |
| ----------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- |
| Local UI                      | `useState` / `useReducer`                                       | menus, sliders, tabs, form fields                                     |
| Feature UI shared by siblings | React Context inside the feature                                | `PricingTerm` (term switch), `JourneyLayers` timeline                 |
| App-wide, small, stable       | Context                                                         | `UiProvider` (interface strings)                                      |
| Browser preferences           | `useSyncExternalStore` stores                                   | theme (`shared/utils/theme.ts`), region (`useRegion`), reduced motion |
| Server state                  | Server Components (TanStack Query only if §13 says so)          | content                                                               |
| Form state                    | Native forms today; React Hook Form for non-trivial forms (§15) | contact, sign-up                                                      |

No Zustand or Redux: nothing justifies a global store. Shareable view state
(for example the insights topic and search) should live in the URL search
params when touched (P-09).

---

## 15. Forms and validation

**Current:** two native forms. `ContactForm` uses `required` and
`type="email"` and disables submit while pending (submission SIMULATED).
`FooterSubscribe` posts to the Server Action, which validates on the server.

**Target:**

- Schemas in `features/<x>/schemas/<entity>.schema.ts` (Zod), shared by the client form and the Server Action so rules are written once.
- React Hook Form + `zodResolver` for the contact form when its backend is connected (adds `react-hook-form` and `@hookform/resolvers`: approved with that work).
- Server-side validation is mandatory; field errors map back onto fields, other errors show one form-level message.
- Disable submit while pending; never show raw server errors.

---

## 16. Component architecture

**Standards for new and touched components:**

- Functional components, **named exports**, explicit props: `interface <Name>Props`.
- Folder per component: `ComponentName/ComponentName.tsx`, `ComponentName.module.scss`, `index.ts`.
- About 300 lines or fewer per file; split by sub-component when a file grows.
- Composition over prop drilling (more than about two levels → composition or context).
- Early returns instead of nested ternaries.
- Reuse the kit (`shared/components/ui`): the section grammar (one `FigureEyebrow`, one `SectionHeader`, at most one `SectionLink`) is mandatory (AGENTS.md).
- Simulated product UI: `*Mockup` name and the `SIMULATED PRODUCT UI` banner comment.
- Next.js special files (`page.tsx`, `layout.tsx`, `error.tsx`…) keep the **default export** Next.js requires.

**Current:** flat files, 196 of 211 default exports, mostly inline prop types,
15 files over 300 lines. Converted feature by feature (§26), not in one pass.

---

## 17. Styling and design system

**Current:** Tailwind utility classes on every component. Colour values are
CSS custom properties for light and dark in `src/app/theme.css`; Tailwind
names them in `tailwind.config.ts`. Two page-scoped CSS files
(`about-page.css`, `akashic-story.css`).

**Approved target (ADR-03): SCSS Modules.** Infrastructure is in place:

```scss
// Any *.module.scss
@use "assets/styles" as *; // tokens + mixins (Sass loadPaths: src/)

.card {
  @include elevation; // opaque surface + precise border, no shadow
  padding: $space-4;
  border-radius: $radius-card;
  color: c(ink); // rgb(var(--ink) / 1): follows light and dark
  @include focus-ring;
  @include respond-to(lg) {
    padding: $space-8;
  }
}
```

Rules:

- Colours only through `c(<token>)`; values stay in `theme.css`, so both appearances keep working.
- Spacing, radius, type, motion and breakpoints from `_tokens.scss`; no hardcoded design values.
- Class names in camelCase (`styles.cardHeader`); no global class leakage.
- **One component, one system:** a component is either fully Tailwind (not yet migrated) or fully SCSS Module. Never both in one file.
- Tailwind and `globals.css` are removed when the last feature is migrated (§26 Phase 4).
- The design kernel in AGENTS.md (flat colour, blue-black darks, one soft blue band per page, reduced motion) applies unchanged.

---

## 18. Security

| Topic            | Standard                                                                                                      | Current                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Authentication   | None (public site). Add only with a real need; then server-side sessions, httpOnly cookies                    | N/A                                                                     |
| Authorisation    | Enforced on the server (Server Actions, Route Handlers); middleware or client guards are never the only check | N/A                                                                     |
| Tokens / secrets | Server-only env vars without `NEXT_PUBLIC_`; read only in `config/env.ts`                                     | Compliant (one public var)                                              |
| Environment      | Zod-validated at start-up; build fails on a bad value                                                         | `config/env.ts`                                                         |
| XSS              | React escaping; `dangerouslySetInnerHTML` only for trusted static output                                      | JSON-LD (escapes `<`) and the theme bootstrap script only               |
| CSRF             | Server Actions are POST-only with Next.js origin checks; CSP `form-action 'self'`                             | Compliant                                                               |
| Input validation | Server-side Zod on every action                                                                               | Sign-up validates on the server; adopt Zod there when touched           |
| Headers          | CSP, HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; `noindex` on `*.vercel.app` | `next.config.mjs`                                                       |
| Links            | External `target="_blank"` with `rel="noopener noreferrer"`                                                   | Compliant                                                               |
| Dependencies     | `npm audit` clean for production; Next.js on the latest 16.x patch                                            | 0 production vulnerabilities; 15 moderate dev-only (ESLint `minimatch`) |
| Sensitive data   | No personal data in logs or URLs                                                                              | No console output in `src/`                                             |

---

## 19. Performance

| Practice             | Standard                                                                                                                | Current                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Rendering            | Static by default; dynamic only with a reason                                                                           | All 53 routes static               |
| Streaming / Suspense | Use with dynamic data only                                                                                              | Not needed                         |
| Client JavaScript    | Smallest possible client boundaries                                                                                     | Leaf-only Client Components        |
| Lazy loading         | `next/dynamic` for heavy, below-the-fold, purely decorative widgets; never `ssr:false` on content                       | None needed so far                 |
| Images               | `next/image` with width and height (or `fill` + `sizes`); AVIF/WebP enabled                                             | 24 files; one plain `<img>` (P-08) |
| Fonts                | `next/font` where the family exists; Google Sans Text/Mono are not in `next/font`, so the `<link>` + `preconnect` stays | Justified exception                |
| Motion               | Loops pause off screen; `prefers-reduced-motion` respected                                                              | `OffscreenAnimationGate`, hooks    |
| Bundle               | Measure with the Next.js bundle analyser and Lighthouse before optimising; set a budget                                 | Not measured (P-07)                |
| Re-renders           | Fix by state colocation first; memoise only after measuring                                                             | —                                  |

---

## 20. Testing

**Current:** no test runner, no tests. The gate is static: `npm run check`
(tsc + ESLint + knip) and `npm run build`.

**Target** (adding a runner is a dependency decision: P-05):

| Level                       | What                                                                          | Tool                                  |
| --------------------------- | ----------------------------------------------------------------------------- | ------------------------------------- |
| Unit                        | `shared/utils`, `config/env`, schema rules, region and pricing helpers        | Vitest                                |
| Component                   | Kit components in `shared/components/ui`                                      | Vitest + React Testing Library        |
| Hook                        | `useTour`, `useOnScreen`, `useRegion`                                         | RTL `renderHook`                      |
| Server Action               | Sign-up and contact actions: valid, invalid, refused inputs                   | Vitest (call the action directly)     |
| Content integrity           | Every page's `sections` ids exist in its built HTML                           | Script over `.next/server/app/*.html` |
| Critical flows / regression | Home, contact modal, pricing term switch, insights search; axe on every route | Playwright + `@axe-core/playwright`   |

Never skip or weaken a test to pass a build.

---

## 21. Imports and dependencies

- **Alias:** `@/*` → `src/*` (`tsconfig.json`). Cross-folder imports use it; relative imports only inside one feature or component folder.
- **Barrels:** each feature and each shared component folder has an `index.ts`. Import a feature through `@/features/<name>`; deep imports into another feature are an ESLint error.
- **Order** (ESLint `import/order`): built-in → external → `@/` → parent → sibling → index → `*.module.scss`, no blank lines between groups.
- **Cycles:** `import/no-cycle` is an error.
- **Server/client boundary:** `server-only` modules never reach a Client Component (§9).
- **Content boundary:** content values only through `services/content` (ESLint).
- **New dependencies** need a reason, a check that nothing installed covers it, its size and maintenance status, and approval. Pin dev tools exactly.

---

## 22. Naming conventions

| Item                         | Convention                                       | Example                               |
| ---------------------------- | ------------------------------------------------ | ------------------------------------- |
| Components and their folders | PascalCase                                       | `SectionHeader/SectionHeader.tsx`     |
| Hooks                        | camelCase with `use`                             | `useOnScreen.ts`                      |
| Functions, variables         | camelCase                                        | `formatNumber`                        |
| Constants                    | UPPER_SNAKE_CASE                                 | `REGIONAL_PATHS`, `THEME_INIT_SCRIPT` |
| Types and interfaces         | PascalCase, no `I` prefix                        | `PageSection`, `SectionHeaderProps`   |
| Feature folders              | kebab-case                                       | `features/site-map/`                  |
| Server-only modules          | `<name>.server.ts`                               | `insights.server.ts`                  |
| Server Actions               | `<verb>-<noun>.action.ts`                        | `subscribe.action.ts`                 |
| Schemas                      | `<entity>.schema.ts`                             | `contact.schema.ts`                   |
| SCSS Modules                 | `<Component>.module.scss`                        | `PageHero.module.scss`                |
| Simulated product UI         | `<Name>Mockup.tsx` + banner                      | `ProofComparisonMockup.tsx`           |
| Booleans                     | `is`/`has`/`can`/`should`                        | `isOpen`, `isPaused`                  |
| Handlers                     | `handleX` inside, `onX` as a prop                | `handleSelect`, `onSelect`            |
| Section ids                  | kebab-case, equal to the page's `sections` entry | `talk-to-our-team`                    |

Code quality: strict TypeScript, no `any`, no dead code (knip), ESLint and
Prettier clean, SonarQube-friendly. Copy follows AGENTS.md voice rules.

---

## 23. Development checklist

Every task, in order:

1. Read `CLAUDE.md`, this file and `AGENTS.md`; open the topic doc in `docs/` that matches the task.
2. Inspect the relevant feature (or its current location, §7.2) and how it is composed in `src/app`.
3. Reuse the kit and existing hooks before writing new ones.
4. Decide the server/client boundary for anything new (§9).
5. Check data access: content through `services/content`; no invented endpoints.
6. Follow the folder structure; new code goes to its target location, touched code may move there in the same change.
7. Change only what the task needs; preserve behaviour, section ids and `<main id="main">`.
8. Run `npm run typecheck`, `npm run lint`, `npm run knip`, relevant tests, then `npm run build`.
9. Verify in the browser at mobile and desktop widths, both themes, reduced motion.
10. Report changed files and open issues; update this file when an approved decision changes.

---

## 24. Architecture decision rules

- Do not change an established pattern only because another exists. To change one: name the current pattern with file references, its concrete limits, the alternative, the migration impact; get approval; record it in §25.
- Do not change the framework (Next.js App Router) or rewrite the application.
- Do not create empty folders, invent endpoints, add unneeded dependencies or Client Components.
- Large refactors happen only when explicitly requested, in reviewable phases (§26), with the build green after each phase.
- Consistent existing conventions that differ from the reference standard are documented here as the project standard.

---

## 25. Decision log

| #      | Date        | Decision                                                                                                                                               | Reason                                                                                   | Status                                           |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------ |
| ADR-01 | 03 Nov 2026 | Keep Next.js App Router with static rendering; adopt the feature-based + layered structure inside `src/`                                               | SEO and performance of a marketing site; user decision                                   | Approved (user)                                  |
| ADR-02 | 03 Nov 2026 | Keep `src/content/` as the single typed content source behind `services/content` (the CMS stand-in), not split into features                           | One replaceable hand-off point for the CMS; ESLint-enforced boundary                     | Approved                                         |
| ADR-03 | 03 Nov 2026 | Migrate styling from Tailwind to SCSS Modules with tokens over the existing CSS variables, feature by feature; never mix in one component              | User decision; reference standard §12                                                    | Approved (user), in progress                     |
| ADR-04 | 03 Nov 2026 | Move code into `src/` with `app`, `config`, `services`, `shared`, `assets`; layer, import-order and no-cycle ESLint rules; Prettier; Zod env           | Phase 1 of §26                                                                           | Done (uncommitted at time of writing)            |
| ADR-05 | 03 Nov 2026 | Route Handlers for public text files keep their URLs (`/llms.txt`, `/insights/rss.xml`), not under `app/api/`                                          | They are public files with fixed URLs                                                    | Approved                                         |
| ADR-06 | 03 Nov 2026 | Google Fonts via `<link>` instead of `next/font`                                                                                                       | `next/font` lacks Google Sans Text and Google Sans Mono                                  | Approved (existing)                              |
| ADR-07 | 03 Nov 2026 | No TanStack Query, Axios, global store or auth layer until a real feature needs one                                                                    | No backend, no login, static content                                                     | Approved                                         |
| ADR-08 | —           | `(site)` route group layout for Nav and Footer                                                                                                         | Removes 32 copies of the chrome                                                          | Proposed (P-01)                                  |
| ADR-09 | 03 Nov 2026 | `UiProvider`/`useUi()` live in `shared/providers/`, not `app/providers/`                                                                               | Shared kit components need `useUi()`; `shared/` may not import `app/`                    | Done (Phase 2)                                   |
| ADR-10 | 03 Nov 2026 | Data-loading chrome shells in `app/_components/` (`Nav`, `Footer`); the shared `FooterContent` takes the newsletter sign-up and region switch as slots | Shared code may not import services or features; composition keeps the footer agnostic   | Done (Phase 2)                                   |
| ADR-11 | 03 Nov 2026 | `contact`, `newsletter` and `region` became features in Phase 2 (ahead of Phase 3)                                                                     | They lived in the dissolved `components/layout/`; the kit may not depend on them         | Done (Phase 2)                                   |
| ADR-12 | 03 Nov 2026 | Kit components are named exports through group barrels (`@/shared/components/ui`); inside `shared/`, siblings import by folder path                    | Barrels for consumers; folder paths inside avoid import cycles                           | Done (Phase 2)                                   |
| ADR-13 | 03 Nov 2026 | A Tailwind caller that overrides a migrated SCSS-Module kit component on the same property uses `!` (important) until the caller migrates              | Module CSS loads after the Tailwind utilities, so equal-specificity overrides would lose | Applied once (`ServicesCapabilities` Tag height) |

---

## 26. Migration roadmap

Each phase ends with typecheck, lint, knip and build green, and a pause for review.

| Phase         | Scope                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Status                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 1. Foundation | `src/` layers, `config/env.ts` (Zod), Sass tokens and mixins, Prettier, ESLint layer/order/cycle rules, `.gitattributes`, Next.js 16.4.4                                                                                                                                                                                                                                                                                                                                               | **Done** (uncommitted) |
| 2. Shared kit | `components/{ui,icons,layout}` → `shared/components/{ui,icons,navigation,data-display,forms}` as `ComponentName/` folders, named exports, SCSS Modules; `contact`, `newsletter`, `region` features; `app/_components` shells. Verified pixel-equivalent: computed-style fingerprints of all 33 routes at 1440 and 375 px, mega menus, mobile drawer and contact modal match the pre-migration build                                                                                    | **Done** (uncommitted) |
| 3. Features   | One or two features per step (§7.2): components, mockups, page composition and styles move together; route files become thin; `(site)` group layout (P-01). Batch 1 **done**: `features/home` (sections, mockups, `pages/HomePage`) and `features/proof` (`ProvenAtScale`), verified against the previous build at 1440 and 375 px. Next: 2 `akashic` (+ 1.0 release), 3 `services`/`about`/`careers`, 4 `solutions` (hub, EIS, Life), 5 `sectors`, 6 resource pages + `(site)` layout | In progress            |
| 4. Quality    | `global-error.tsx`, Zod + React Hook Form for contact, tests + CI, remove Tailwind and `globals.css`, run Prettier, update AGENTS.md and docs/ paths                                                                                                                                                                                                                                                                                                                                   | Pending                |

### Outstanding recommendations

| ID   | Recommendation                                                                    | Priority                               |
| ---- | --------------------------------------------------------------------------------- | -------------------------------------- |
| P-01 | `(site)` route-group layout for Nav and Footer                                    | High (Phase 3)                         |
| P-02 | Feature modules with public `index.ts` (§7)                                       | High (Phases 2–3)                      |
| P-03 | Update path references in AGENTS.md and docs/ (§3 table)                          | High (Phase 4, or sooner if requested) |
| P-04 | Add `global-error.tsx`                                                            | Medium                                 |
| P-05 | Vitest + RTL + Playwright/axe, and a CI job running `npm ci`, check, build, audit | High                                   |
| P-06 | Real backends for contact, sign-up and careers applications (launch blocker)      | High                                   |
| P-07 | Bundle and Lighthouse budget                                                      | Medium                                 |
| P-08 | Replace the one plain `<img>` with `next/image`                                   | Low                                    |
| P-09 | Insights topic and search in URL params                                           | Low                                    |
| P-10 | Split the 15 components over 300 lines while migrating them                       | Medium                                 |
