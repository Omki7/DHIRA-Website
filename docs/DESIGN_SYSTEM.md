# DESIGN SYSTEM — DHIRA Website v3

The rules every page follows: brand and voice, the section grammar, tokens,
type, components, the eight design rules and accessibility. Values live in
code (`src/app/theme.css` for colour; `tailwind.config.ts` and
`src/assets/styles/_tokens.scss` for names and scales). This doc records roles
and rules, not values. History lives in git.

Paths: a component written `group/Name` is under `src/shared/components/`
(`ui/FigureEyebrow`); every other path is under `src/`.

**The frame is fixed; the content is yours.** These rules fix what a reader
meets on every page: the section header, the voice, what is true, and the
colour and motion discipline. They do not fix what sits inside a section.
Below the header, design from the content: find the shape the idea already
has (a ledger, a rail, a terrace, one drawing, a quote, a single figure) and
build that (Rule 1). Existing pages show the rules applied; they are examples,
not templates. If a better idea needs a rule broken, build it within the rule
and say what you would change.

## 1. Brand

- **DHIRA** is the company, **Akashic** the platform. Never "DHIRA's Akashic".
- **What Akashic does.** It unifies structured, unstructured and streaming
  data into one governed foundation, links it through a governed knowledge
  layer, and runs Business Intelligence, conversational AI, Machine Learning
  and agents on top.
- **Positioning.** One accountable partner (platform plus delivery), not a
  stack of vendors. DHIRA was a data company from day one; engineering is the
  foundation, never "grew into data".
- **Proof points.** National-scale DPI delivery in India; Maha Hackathon 2025;
  Telangana AI Rising 2025; Startup India; offices in New York, Hyderabad and
  Bangalore.
- **"Knowledge layer", never "knowledge graph"**, in copy, metadata and
  mockups. A graph is an artefact the reader then expects to be shown; the
  layer is the defensible claim.
- **AI positioning.** Akashic is "the governed data and AI platform". Name
  live AI plainly (cited answers and text to SQL in Ask Akashic, AI-built
  charts in Business Intelligence, Machine Learning). Agents ship in
  **preview** and always carry `ui/PreviewTag`. Never present agents as
  generally available or autonomous, and never claim write-back into a source
  system: a person decides. No sparkle icons or gradients to signal AI.
- **Akashic wordmark** (`icons/AkashicWordmark`: the logo stands in for the
  "A"). Use it where Akashic stands alone as a name: badges, labels, headings,
  mockup chrome. Inside a sentence and in compound names ("Ask Akashic",
  "Akashic 1.0"), write the plain word. Content-driven labels use
  `nameOrWordmark(label)`. Never set the logo before the full word: it reads
  "AAkashic".
- **The full form** "Digital Human Interfaces & Robotic Agents" follows the
  wordmark in the header. Initials are bold (medium weight, in ink) and never
  coloured.

## 2. Voice and copy

- Direct, declarative, short. Headlines are complete thoughts.
- **No em dashes.** Colons or periods. British/Indian English ("organisation",
  "colour", "optimise").
- No filler ("powerful", "seamless", "next-generation"), no vaporware, no
  invented figures, certifications or client names (Rule 4).
- **Headers state the reader's gain; the lede says how.** "The platform, at
  work" states the obvious; "Every next solution goes live faster" states the
  benefit. AI is the mechanism, not the point. Favour transparency and control
  (citations, shown working, access rules, audit) over autonomy.
- **Headline:** two tones, setup then payoff, each two lines or fewer at
  1440. Most run as one sentence across the two tones ("Share one set of
  data, / and teams stop reconciling."). Save the fragment pair ("X. Y.") for
  a few signature lines: repeated, it reads machine-written.
- **Lede:** one or two sentences, roughly fifteen to thirty words.
- **Name the noun again** rather than a pronoun ("it", "that", "they")
  pointing at an earlier line: headlines and ledes are often read alone.
- **Parallel items** (tiles, captions, bios): matched phrases with the same
  rendered line count.
- **No orphans.** A last line holding one word is rewritten, not reflowed.
  Check at 1440 and 390.
- **One owner per claim** per page: a line never reappears in a later
  section's lede, coda or close.
- **Plain words first.** Use current terms (entity resolution, semantic
  layer, document intelligence, knowledge layer, data lineage), but for a
  reader with no context an industry term never stands alone: it rides above
  a plain title that says what it does.
- **No short forms in shipped copy.** Full product and module names, full
  names of laws and bodies ("Digital Personal Data Protection Act"), figures
  in words ("1.19 million", "$581 billion"), "and" not "&" or "@". Kept: "AI",
  the brand full form, and names that are themselves the proper name
  (ISO 27001, SOC 2 Type II, S&P Global).
- **One name per module, everywhere:** Data Pipelines, Master Data, Data
  Warehouse, Business Intelligence, Ask Akashic, Machine Learning, Governance,
  and AI agents (preview). No "Akashic" prefix ("Akashic BI"); never "Akashic
  Insights", "Akashic AI" or "AI module". `icon:` fields are lookup keys, not
  copy.
- **No instruction lines** ("Drag the divider", "Scroll to …"). A design that
  needs one gets simpler. Keyboard help stays, for screen readers only.
- **Claims hold for every deployment option.** Key custody is claimed for
  self-hosted only. Certifications and the laws followed are separate,
  labelled groups.
- **The demo world is a sample business**, unnamed. Its screens carry no
  "illustrative" caption (Rule 4).
- **The homepage tells one story** a newcomer can follow by reading only the
  eyebrows and headlines; each section answers the question the previous one
  raises. The spine is at the top of `content/pages/home.ts`; keep a new or
  changed section on it.

## 3. Section grammar

Every numbered section on every page opens the same way. Use the shared
components; never hand-roll an eyebrow or a header. The grammar governs a
section's top and its buttons; the body below the header is free (Rule 1).

1. **Eyebrow.** `ui/FigureEyebrow`: a dashed hairline above and below,
   `[NN]  LABEL` in 12px uppercase mono, number `overcast`, label `inkSoft`.
   Left-aligned, full width of the column; never centred, coloured, dotted or
   on two lines. A status mark (`PreviewTag`) goes in its `tag` slot. In a
   closing card or over a pinned scene it drops the rail (`bare`).
2. **Header.** `ui/SectionHeader`: eyebrow, `ui/TwoToneTitle`, then the lede
   **under** the headline, all in the left column (max 46rem). Never a lede
   or a button in a right-hand column. Where the title must sit inside a
   drawing, compose the same parts (`StoryLabel`/`StoryTitle` on /akashic and
   `AboutHeading` on /about wrap them). Where a heading sits in a column
   beside a drawing, the eyebrow moves up so its rail still runs full width.
3. **Spacing.** Section padding 48px top, 64px bottom; 64 and 96px from lg
   (`pt-12 pb-16 lg:pt-16 lg:pb-24`). Eyebrow to headline 40px, 48px from lg;
   headline to lede 24px; header to content 48px, 56px from lg.
4. **No next-section buttons, no section-foot buttons.** A section ends on
   its content: a drawing, a caption, a coda line.
5. **One onward link, under the lede.** A section that leads to a deeper page
   carries one quiet `ui/SectionLink`, passed as `SectionHeader` children.
   Per-item links inside the content ("See the solution") are content, not
   this link.
6. **Buttons live in heroes and closing cards**, plus homepage [02]'s centred
   "Meet Akashic". These are centred compositions with an unnumbered kicker
   over the headline. Everything else is left-aligned.
7. **Unnumbered strips** (the homepage careers strip) use the same eyebrow
   without a number.
8. **Numbers mark order only.** Inside a section, number items only when the
   order is real: steps, a timeline, a key to a drawing. No decorative
   01/02/03 on cards or lists.

## 4. Tokens

Light is the default; every route offers light and dark (`app/theme.css`
defines both as RGB channels). Use tokens: Tailwind classes (`bg-background`,
never `bg-white`) or `c(token)` in SCSS Modules. Raw `[#hex]` only for a
per-section semantic colour with no token; hex in `style={}` or SVG attributes
is the Rule 8 exception. Add a token, add a row; remove its last use, remove
the token.

| Role | Tokens |
|---|---|
| Grounds | `background` (page), `band` (the soft blue band), `primary-bg` / `tertiary-bg` (insets, hover fills), `panel` (simulated-UI header surface) |
| Feature surfaces | `depth`, `depth-raised`, `vault`, `anchor`: pastel blue in light, layered midnight in dark. For sections, the footer and closing cards |
| Text | `ink` = `primary-text` (headings, body; blue-black), `secondary-text` (ledes, captions), `inkSoft` (two-tone setup lines, section body), `overcast` (eyebrow numbers, labels), `tertiary-text` (readable mockup chrome) |
| Actions | `action` / `action-hover`: the primary button fill, ink like the text (navy-black in light, near-white in dark), never blue: ink reads premium, blue reads vague. `on-action` is its lettering. `on-accent` is white lettering on the fixed cobalt `blue-solid` |
| Accent | `blue` (links, live data, focus), `blue-hover`, `blue-subtle`, `blue-border`, `blue-300/400/500` (the accent lifted for deep grounds) |
| Status | `red` (cost, not error; problem sections only), `red-deep` (its large figures), `positive` family (live) |
| Lines | `subtle-stroke` (card edges), `default-stroke` (control edges), `lineSoft` (section dividers, eyebrow rails), `line` (stronger dividers), `card-line` / `card-divide` (simulated UI). In light, `subtle-stroke`, `lineSoft`, `card-line` and `uc-stroke` share one hairline value; keep using each name for its role |
| Photography | `on-photo`, `scrim` |
| Legacy `uc-*` | `uc-bg`, `uc-surface`, `uc-stroke`, `uc-line`, `uc-vertex`, `uc-dim`, `uc-mute`, `uc-text`: the deep-ground text ramp used by `tone="depth"` headers. Do not grow it |

**Page-scoped families.** `eis-*` belongs to
`/solutions/enterprise-intelligence` (pastel blue in light, twilight in dark);
`life-*` to `/solutions/life` (pale ice blue in light, deep ocean in dark).
Never use them elsewhere.

**The look.** Light: porcelain is the reading ground, and pale blue (the
Akashic pastel treatment) gives feature panels, illustrations and closures
their hierarchy. Dark: midnight grounds, slate-blue raised surfaces, cool
white text, moonlight-blue accents.

**Flat colour.** No cast shadows, glows, decorative gradients, translucent
fills or colour washes. Solid colours, precise borders, restrained radii and
space. Pale blue is an opaque surface, not an overlay. Never mix `ink` into a
surface to make another shade. Highlighted records use `blue-subtle` with
`blue-border`, not an arbitrary accent opacity. The surface colours stay as
specified: no re-tuning and no texture without a new brief.

**Identity hue 258.** The `band` blue behind the /akashic hero quote (OKLCH
L .962, C .014, h 258) is the reference. Every light surface, line and accent
tint sits on hue 258; only the lightness changes. Surfaces grow chroma with
depth, C ≈ 0.36 × (1 − L). Lines and tints (`lineSoft` and kin, `line`,
`default-stroke`, `card-divide`, `blue-subtle`, `blue-border`, the `plate-*`
greys) keep their strength on the same hue. Outside the rule: the cobalt
`blue` family (hue 266, the brand), text greys, status colours, `eis-*` and
`life-*`, diagram category colours and real logos. Dark mode sits at hue 255
to 259. Check a new light token in OKLCH, not by eye.

**Text and photographs.** Readable copy uses a text token at full opacity,
never a surface token or reduced opacity to look quiet. `default-stroke` is
for control boundaries, `subtle-stroke` for decorative edges. Photography
keeps its natural colour (except /about, §12); text sits on a solid surface
beside it or in a caption panel. Downloadable brand artwork shows on a small
fixed paper or reversed-mark swatch.

**Appearance switch.** `ui/ThemeSwitch`: 44px hit area, `role="switch"`,
visible focus ring, no thumb motion under reduced motion.
`shared/utils/theme.ts` applies the saved choice before paint (key
`dhira-appearance`); first visits are light. Illustration-only variables stay
local to their drawings in theme.css.

## 5. Typography

- `font-sans` (Google Sans Text): body and UI. `font-heading` (Google Sans):
  headings. `font-mono` (Google Sans Mono): eyebrows, labels, mono figures.
- **`font-display` (Newsreader): editorial pull-quotes only** (Rule 3).
- No section-local faces. Inter only inside simulated product UI.

| Scale | Size | Weight | Tracking |
|---|---|---|---|
| Hero headline | 56 to 64px | 500 | `tracking-tightest` |
| Section headline (`TwoToneTitle`) | 34 / 48 / 52px | 500 | `tracking-tighter` |
| Subsection | 20 to 28px | 500 to 600 | tight |
| Body / lede | 16 to 18px, about 65 characters a line | 400 | default |
| Large figure | as the section needs | 600, `tabular-nums` | `tracking-tighter` |
| Eyebrow and mono labels | 12px | 400 to 500 | `tracking-eyebrow` (0.14em), uppercase mono |

**Headlines are medium (500), never bold.** Large figures are 600 with
tabular digits, so a section's number is its heaviest element and a count-up
holds its width.

**Two-tone headlines** are soft setup (`inkSoft`) over ink payoff, never
reversed and never a third grey.

## 6. Spacing, shape, timing

- 8px grid. Section spacing in §3.
- Radius steps: `chip` 6, `micro` 4, `tile` 8, `card` 8, `inner` 10, `frame`
  10, `btn` 10, `outer` 14.
- Timing: `ease-settle` for UI transitions, `ease-smooth` for continuous
  motion. Hover, tab and menu feedback 200ms or less; 250ms and up is for
  state changes, never hover. Scroll reveals 500ms, once, a 16px rise, no
  scale or blur. Count-ups 900ms, starting when half the figure is in view.

## 7. Components

| Class / component | Use |
|---|---|
| `.btn-primary` / `.btn-secondary` (+ `.btn-lg`) | Hero and closing-card CTAs only (§3.6). Primary is ink (`action`), not blue |
| `.btn-ghost` | Toolbar-style controls inside a drawing |
| `ui/SectionLink` | A section's one onward link |
| `ui/FigureEyebrow`, `ui/SectionHeader`, `ui/TwoToneTitle` | The section grammar |
| `ui/SectionCoda` | A mono sign-off line: two fragments, one new idea |
| `ui/PageHero`, `ui/PageClose` | Resource-page hero and closing card |
| `ui/PreviewTag` | The dashed preview mark on anything agentic |
| `ui/Tag` | A short name read as part of a set (scope, deliverables, modules, systems). Hairline, three words or fewer. Tone is meaning: `akashic` (blue) an Akashic module, `custom` (ink) work on your own stack, `muted` a name at rest in a figure, `neutral` otherwise; `preview` dashes it |
| `ui/MotionToggle` | The pause control for anything that advances by itself: a small round icon right beside what it stops, never in a row of its own. Picking an item stops the cycle too. Tooltip names the action; the accessible name adds what it stops. Hidden under reduced motion (Rule 6b) |
| `.dot-grid` | 1px dot ground at 10px pitch |
| `.rail-container` / `ui/ScrollRevealRail` | The centred 1440px column with side gutters; no edge lines |
| `.ad-draw` / `.ad-fade` / `.ad-strike` / `.ad-ping` | The drawing kit: paths draw once when the wrapper flips `data-drawn` (`shared/hooks/useDrawn`); final state under reduced motion |

**Lists.** No bullet lists in shipped UI; they read legacy. Pick by what the
items are:
- **Short names read as a set:** `ui/Tag`s in a wrapping row.
- **Items read one by one** (responsibilities, terms, documents): hairline
  spec rows, a divider above each, one mono key at the column's head. When
  two parties share the work, pair their rows as a ledger.
- **Ordered steps:** numbered nodes on a rail, only when the order is real.
- **One outcome:** a mono label over one sentence.

**Stat bands** share one recipe: `rounded-frame` outer on `subtle-stroke`,
dashed cell dividers, mono uppercase labels, figures `font-semibold
tracking-tighter tabular-nums` with `useCountUp`.

**A non-obvious control** (the homepage before/after slider) demonstrates
itself once per mount on first view, stops on any interaction, and moves
nothing under reduced motion.

**Keyframes.** Tailwind components use the keyframes in `globals.css`; SCSS
Module components keep theirs in the module.

## 8. Simulated product UI

Everything in a `mockups/` folder is fake software (`*Mockup`, banner comment
`SIMULATED PRODUCT UI`).

- **Tease, never reveal.** A reader needs proof the product exists and has
  taste, not its layout. Show an outcome, not the application.
- **Pictures a business reader already uses** (a customer family tree, a
  metric tree, a gap-to-plan chart, one report seen by two roles), never a
  mechanism only engineers recognise (deduplication, join canvases).
- **Native size.** Small React fragments with readable type; never a whole
  dashboard scaled down. One focal result. No application chrome or builder
  canvases.
- **One demo world**, in USD (`AkashicPlateScreensMockup`). Figures in a
  mockup come from it, never new ones. No-short-forms (§2) applies inside
  drawings too.
- **Prefer a line drawing** to another screen; the homepage is screen-heavy
  already. Product UI never answers a copy problem.
- Motion plays once in view and respects reduced motion.
- References for showing product to business readers: Ramp, Vistiq,
  ThoughtSpot, Hex, Cube.

Current forms, as examples rather than templates: business snapshots around
the homepage hero (`HomeHeroTeasersMockup`); outcome cards on homepage [02]
(`AkashicOutcomeCardsMockup`: a role, the plain question it asks, one legible
answer with its outcome in blue, one hairline drawing, a mono provenance
line); module moments on /akashic/1-0 (`AkashicModuleMomentsMockup`: one
drawing per module playing its verb). A new form is welcome if it keeps to
the points above.

## 9. Navigation and naming

- **Header.** Platform · Solutions · Services · Resources · About, then "Talk
  to our team". No Home item (the logo is home), no Sign in. Data in
  `content/navigation.ts`, parts in `navigation/`.
- **Menus.** One shared full-bleed sheet attached to the header. Each menu: a
  lead, vertical link lists, one featured card with a hairline drawing. Type
  leads, no icons, full labels. Agents only inside Platform, with
  `PreviewTag`.
- **Behaviour.** 120ms hover intent, instant switching once open, 300ms close
  grace, a chevron click pins, Escape closes and returns focus. A label is a
  link to its lead page (on that page, it scrolls to the top); the chevron
  beside it opens the menu. The current section rests in ink with a 2px
  `blue` bar.
- **URLs say what the menu says.** Paths and anchors use the label's own
  words in full: `/services`, `/solutions/enterprise-intelligence`,
  `#intelligent-procurement`. A renamed path redirects permanently
  (`next.config.mjs`); a renamed anchor keeps its old id as an alias.
  Exception: Platform leads to `/akashic`, the product's own page.
- **One name per page, everywhere.** The header menus are the source of
  names; the footer, site map, `seo.title`, index rows, tabs, badges and
  minimap labels use the same words. The footer heads each group with the
  menu's label or the menu's own group heading (By industry), links in menu
  order. Industries: Public sector, Financial services, Healthcare, Retail and
  consumer goods, Manufacturing, Education, Energy and utilities (never BFSI,
  CPG or Finance). A page title is the name alone; the description carries
  the keywords. Rename in `content/navigation.ts` first, then search for the
  old name.
- **Mobile.** Full-screen drill-down drawer, 44px targets, focus trap.
- **Accessibility.** Disclosure pattern: each label a link, its chevron a
  button with `aria-expanded`; no `role=menu`; every panel server-rendered.
- **Section index** (`navigation/PageMinimap`): right-edge dots driven by the
  page's `sections` list; the line runs from the first dot to the current
  one; labels unfold on hover or focus. Hidden below lg.
- **Landing.** Every jump to a section (section index, menus, in-page
  links, a URL with a hash, back and forward) lands on the section's
  eyebrow with 32px of air above it (24px on phones), not on the
  section's top padding: `sectionScrollTop` in `shared/utils/navigation`,
  used by `usePageScrollSpy`, `HashLanding` and `scrollToHashTarget`. The
  header hides on the way down, so only an upward jump leaves room for it.
  `FigureEyebrow` carries `data-section-eyebrow` for this; a bare eyebrow
  inside a card does not, and its section lands on its own top.

## 10. The eight design rules

1. **Shape discipline.** Each section gets a shape that fits its content.
   Cards are a last resort. This is where the design work is.
2. **No checkmark characters and no bullet lists** in the shipped UI. Affirm
   with numbers, labels or statements; list with tags, spec rows or a rail
   (§7, Lists).
3. **Newsreader is rare:** editorial pull-quotes only.
4. **No invented data.** Every figure presented as fact (a statistic, a
   result, a customer outcome) is real and sourced. Sample figures inside
   simulated screens and drawings belong to the unnamed sample business and
   carry no label: the terms and website policies say "Product screens are
   illustrations with sample data", as B2B sites do. Label a sample figure
   only where it sits beside real, sourced figures and could be mistaken for
   one (homepage [01] "Illustrative scenario"), or keep it in a footnote that
   also cites sources (/solutions/enterprise-intelligence close). Stock
   photographs of people on a page about a customer or DHIRA carry a caption
   (customer stories).
5. **Light surfaces stay light.** No permanently dark sections or cards in
   light mode; grounds come from the shared pastel-blue tokens. Any dark value
   is blue-black, never neutral black. `/solutions/enterprise-intelligence`
   and `/solutions/life` run their own scoped grounds.
   **5a:** one soft blue band (`band`) per page, on its breather section.
   Homepage [08] Voices and the /akashic sticky quote are the approved
   seconds.
6. **Reduced motion.** Every animation degrades to its final state.
   **6a:** animate only `transform` and `opacity`; anything that loops stops
   off screen (`ui/OffscreenAnimationGate` for CSS and SMIL,
   `shared/hooks/useOnScreen` for timers and rAF); no `backdrop-filter` on
   sticky chrome. **6b** (WCAG 2.2.2): anything that advances by itself
   carries `ui/MotionToggle`, and a reader's pick stops the cycle until Play.
7. **Images are real files** in `public/`, licensed, showing the right
   subject at the right scale. Provenance in ASSETS.md.
8. **Styles through the system.** Tailwind classes or an SCSS Module
   (NEXTJS_ARCHITECTURE.md §17), never both in one component. Inline `style`
   only for computed geometry, token-based SVG and diagram colours, and
   functional clipping masks.

## 11. Accessibility (WCAG 2.1 AA)

- Every page: `<Nav>` + `<main id="main">` + `<Footer>`; the skip link
  targets `#main`.
- Visible focus everywhere: never `outline-none` without a `focus-visible`
  ring.
- Interactive drawings expose state (`aria-pressed`, `role="slider"` with
  values); decorative drawings are `aria-hidden` with the claim in text.
- Body text at least 4.5:1 in both appearances.

## 12. Page notes

- **/about photographs of people are monochrome**, including on hover: the
  hero portraits and the employee photographs in [05].
- **/about journey** (`components/demos/about/JourneyLayers`): one terraced
  drawing. Every release since 2018 is a layer running on to today; national
  programmes hang below the line; only the ambition is dashed. Without JS, a
  readable ledger shows at every width.
- **/about reveals** (`components/sections/about/AboutMotion`,
  `data-about-reveal`): 14px rise over 500ms, once, visible without JS.
