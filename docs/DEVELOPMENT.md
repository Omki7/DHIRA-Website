# DEVELOPMENT: DHIRA Website v3

## Requirements

- Node `>= 20.9` (Next.js 16). `.nvmrc` pins 24 (current LTS): `nvm use`.
- npm (the lockfile is `package-lock.json`). Install with `npm ci`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) at `localhost:3000` |
| `npm run build` | Production build. **The ship gate** |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit`, strict |
| `npm run lint` | ESLint (flat config, `eslint.config.mjs`) |
| `npm run knip` | Unused files, exports and dependencies |
| `npm run check` | typecheck + lint + knip. Run before you hand work back |

Next.js 16 removed `next lint`; ESLint runs through its own CLI.

## Checks before calling work done

There is no unit or integration test suite. Verification is:

1. **`npm run check`.** Must be clean: no type errors, no lint errors or
   warnings, nothing unused.
2. **`npm run build`.** Must succeed and prerender every route. It also catches
   Server/Client boundary mistakes that the typecheck misses.
3. **Look at it.** For any visual change, compare the dev server against the
   reference before calling it done. Puppeteer or Playwright against
   `localhost:3000` works when a browser tab is not available. Do not assert a
   visual result from code alone.
4. **For refactors that must not change copy:** build the previous commit in a
   git worktree, serve both builds, and diff the visible text of every route in
   `sitemap.xml`. Moving content must produce no text change.

## What the tooling enforces

- **TypeScript strict.** No `any`, explicit or implicit, and no unsafe casts.
  When a field is added, extend the content interface; do not loosen it.
- **Content boundary.** Value imports from `@/content` outside `lib/content.ts`
  fail the lint (CONTENT.md).
- **React rules.** These come from `eslint-config-next`, including the React
  Compiler-era hooks rules:
  - No `setState` called synchronously in an effect: derive state, use an
    external store, or reset in the event handler.
  - No components defined inside render.
  - Complete effect dependencies.

  A rule may be disabled on one line only, with a written reason
  (`// eslint-disable-next-line <rule> -- why`).
- **knip.** No unused files, exports or dependencies. Exports used only inside
  their own file are fine. Exported types are not reported, because the content
  interfaces are the CMS contract.

## Security headers

`next.config.mjs` sends these on every route:

- A Content Security Policy:
  - `self`, plus Google Fonts for styles and fonts.
  - `'unsafe-inline'` for the theme bootstrap and JSON-LD.
  - `frame-ancestors 'none'`.
- HSTS.
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and
  `Permissions-Policy`.

`X-Powered-By` is off. When you add a third-party origin (CMS images, analytics,
a form provider), add it to the CSP in the same change and check the browser
console on the built site.

## Housekeeping

- **Assets.** Every file in `public/` must be referenced by code or content
  (ASSETS.md).
- **Styles.** A class or keyframe in `globals.css` that nothing uses is dead.
  Remove it with the component that used it.
- **Archive, do not hoard.** A file you remove but may want back goes to
  `.archive/` (git-ignored, local only). It is not in the build, the typecheck
  or the lint. Reference material (the founder's wireframe, the pricing
  workbook, the EIS prototype) lives in `.archive/reference/`.

## Git workflow

- Work on a branch, never directly on `main`. Commit or push only when asked.
- Before a large structural refactor, commit or stash in-progress work so the
  refactor stays reviewable and revertible.
- Parallel sessions may be editing the same tree. Re-read a file before editing
  it, and tell the other session before you move or delete its files.

## What not to do

- Do not put copy, figures or links in a component. Put them in `content/`
  (CONTENT.md).
- Do not add `console.log` to shipped components.
- Do not install a package when React, Next.js or Tailwind already cover the need.
- Do not write multi-line comments that restate *what* the code does. Short
  *why* comments are welcome.
- Do not change section order without updating the page composer
  (`app/**/page.tsx`), the document's `sections`, and the section maps in
  [ARCHITECTURE.md](./ARCHITECTURE.md).
- Do not add files flat in `components/`. Use a subdirectory.
- Do not add a component-local `<style>` keyframe block. Keyframes go in
  `globals.css` (DESIGN_SYSTEM §7).
- Do not hand-roll a section eyebrow or header, and do not end a section on a
  button or a "next section" control (DESIGN_SYSTEM §3, Section grammar).
- Do not delete a file the running dev server has already compiled without
  restarting it afterwards: Tailwind's content cache stats the old path and
  every page returns 500 until the dev server restarts.
- Do not point images at paths absent from `public/` (Rule 7).
- Do not add a public route without listing it in `content/site-map.ts`, and do
  not give a page's `<main>` anything but `id="main"` (the skip link's target).
- Do not edit `sitemap.xml`, `robots.txt`, `llms.txt` or the RSS feed by hand.
  They are generated.
