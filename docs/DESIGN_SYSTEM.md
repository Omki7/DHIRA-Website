# DESIGN SYSTEM — DHIRA Website v3

The rules every page follows: brand and voice, the section grammar, tokens,
type, components, the eight design rules and accessibility. Values live in
code (`app/theme.css` for colour, `tailwind.config.ts` for the token names and
scales); this doc records roles and rules, not hex values, so it cannot drift
from the palette. History lives in git, not here.

Rewritten 20 Oct 2026 after the founder's review found the site inconsistent
(four eyebrow formats, some sections ending in "next section" buttons, headers
that stated the obvious). The **Section grammar** below is the fix. Apply it
to every page you touch.

## 1. Brand

- **DHIRA** is the company, **Akashic** the platform. Keep them distinct; never
  "DHIRA's Akashic".
- **The Akashic wordmark** (`icons/AkashicWordmark`): the logo stands in for
  the "A", then "kashic". Use it wherever Akashic stands alone as a name:
  badges, labels, menu titles, footer headings, card headers, the homepage
  [03] base, mockup chrome (user, 21 Oct 2026). Inside a sentence, and in
  compound names ("Ask Akashic", "Akashic 1.0"), write the plain word. For a
  content-driven label use `nameOrWordmark(label)`. Never set the logo
  before the full word ("logo Akashic"): that reads as "AAkashic".
- **The full form** "Digital Human Interfaces & Robotic Agents" sits after the
  wordmark in the header. Each word's initial is **bold, never coloured**
  (founder, 20 Oct 2026), and the bold is subtle: medium weight in ink over
  the regular grey. Extrabold read as ugly at 11px (user, 21 Oct 2026), and
  Google Sans Text has no 600, so anything above 500 lands on 700. It hides at lg (1024 to 1279px), where the menus need
  the room.
- Akashic unifies structured, unstructured and streaming data into one governed
  foundation, links it through a governed knowledge layer, and runs BI,
  conversational AI, ML and agents on top.
- **"Knowledge layer", never "knowledge graph"**, in copy, metadata and mockups.
  A graph is an artefact the reader then expects to be shown; the layer is the
  defensible claim (meaning preserved and carried).
- Positioning: one accountable partner (platform plus delivery), not a stack of
  vendors. DHIRA was a data company from day one; engineering is the
  foundation, never "grew into data".
- Proof points: national-scale DPI delivery in India; Maha Hackathon 2025;
  Telangana AI Rising 2025; Startup India; offices in New York, Hyderabad and
  Bangalore.
- **AI positioning.** Akashic is "the governed data and AI platform". Name live
  AI plainly (cited answers and text to SQL in Ask Akashic, AI-built charts in
  BI, ML). Agents ship in **preview** and always carry the dashed `PreviewTag`.
  Never present agents as generally available or autonomous, and never claim
  write-back into a source system: a person decides. No sparkle icons or
  gradients to signal AI.

## 2. Voice and copy

- Direct, declarative, short. Headlines are complete thoughts.
- **No em dashes.** Colons or periods. British/Indian English ("organisation",
  "colour", "optimise").
- No vaporware, no filler ("powerful", "seamless", "next-generation"), no
  invented figures, certifications or client names (Rule 4).
- **Headers state the reader's gain; the lede says how** (founder, 14 and 20
  Oct 2026). "The platform, at work" states the obvious; "Every next solution
  goes live faster" states the benefit. Name AI as the mechanism, not the
  point. Never oversell: transparency and control (citations, shows its
  working, access rules, audit) over autonomy.
- **Headline:** two tones, setup then payoff, each two lines or fewer at
  1440. Write most headlines as one sentence running across the two tones
  ("Share one set of data, / and teams stop reconciling."). Keep the
  fragment pair ("X. Y.") for a few signature lines only: homepage [01],
  /about [01] and [05], the /akashic agents and walkthrough headers (UX
  review, 23 Oct 2026: the repeated pattern read machine-written).
- **Lede:** one or two sentences, roughly fifteen to thirty words.
- **No back-pointing pronouns** ("it", "that", "they" referring to an earlier
  line) and no relative "that" clauses. Name the noun again.
- **Parallel items** (tiles, captions, bios): matched noun phrases or matched
  sentences with the same rendered line count.
- **No orphans.** A last line holding one word is rewritten, not reflowed.
  Check line counts at 1440 and 390.
- **One owner per claim** per page: a line never reappears in a later
  section's lede, coda or close. List who owns what before writing a section.
- Use current terms: entity resolution, semantic layer, document intelligence,
  knowledge layer, data lineage. For a reader with no context, an industry
  term never stands alone: it rides above a plain title that says what it
  does (homepage [02]).
- **No short forms in shipped copy** (user, 21 Oct 2026). Full product and
  module names ("Intelligent Procurement Management System", "Business
  Intelligence", "Machine Learning"), full names of laws and bodies ("Digital
  Personal Data Protection Act", "General Data Protection Regulation"),
  figures in words ("1.19 million", "282,000+", "$581 billion"), "and" not
  "&" or "@". Kept: "AI", the brand full form, and names that are themselves
  the proper name (ISO 27001, SOC 2 Type II, S&P Global).
- **One name per module, everywhere** (UX review, 23 Oct 2026): Data
  Pipelines, Master Data, Data Warehouse, Business Intelligence, Ask Akashic,
  Machine Learning, Governance, and AI agents (preview). No "Akashic" prefix
  ("Akashic BI", "Akashic Warehouse"), and never "Akashic Insights", "Akashic
  AI" or "AI module". The `icon:` fields that pick a sketch icon are lookup
  keys, not copy.
- **No instruction lines** ("Drag the divider", "Scroll to …"). A design that
  needs one gets simpler. Keyboard help stays, for screen readers only.
- **Claims hold for every deployment option.** Cloud, on premises and hybrid
  differ, so key custody is claimed for self-hosted only. Certifications
  (ISO 27001, SOC 2) and the laws followed are separate, labelled groups.
- **The demo world is a sample business**, unnamed, and said once where its
  figures first appear ("Sample business · illustrative").
- **The homepage tells one story** a newcomer can follow by reading only the
  eyebrows and headlines; each section answers the question the previous one
  raises. The spine is written at the top of `content/pages/home.ts`; keep a
  new or changed section on it.

## 3. Section grammar (sitewide, 20 Oct 2026)

Every numbered section on every page is built the same way. Use the shared
components; do not hand-roll an eyebrow or a header.

1. **Eyebrow: one format.** `ui/FigureEyebrow`: a dashed hairline above and
   below, `[NN]  LABEL` in 12px uppercase mono, number `overcast`, label
   `inkSoft`. Always **left-aligned**, full width of the section's column,
   never centred, never coloured, no dots, no second line. A required status
   mark (`PreviewTag` on agents) goes in its `tag` slot. Inside a closing card,
   or over a pinned scene, it drops the rail (`bare`) but keeps the format.
2. **Header: one stack.** `ui/SectionHeader`: eyebrow, then `ui/TwoToneTitle`
   (34 / 48 / 52px, weight 500, soft setup over ink payoff), then the lede **under** the
   headline, all in the left column (max 46rem). Never a lede or a button in a
   right-hand column. Sections whose title must sit inside a drawing compose
   the same parts (`FigureEyebrow` + `TwoToneTitle`); /akashic uses
   `StoryLabel`/`StoryTitle` and /about uses `AboutHeading`, both wrappers
   over the same parts. Where a heading sits in a column beside a drawing, the
   eyebrow moves up to the section so the rail still runs full width.
3. **Spacing.** Section padding `pt-12 pb-16 lg:pt-16 lg:pb-24`. Eyebrow to
   headline `mt-10 lg:mt-12`; headline to lede `mt-6`; header to content
   `mt-12 lg:mt-14`.
4. **No next-section buttons, no section-foot buttons.** A section ends on its
   content (a drawing, a caption, a coda line). The `[NN] NEXT SECTION ↓`
   bridge control and its `ui/SectionBridge` are retired, as are mid-page
   buttons that scroll to the next section or open contact.
5. **One onward link, under the lede.** A section that leads to a deeper page
   carries one quiet text link with an arrow (`ui/SectionLink`), passed as
   `SectionHeader` children. Content links inside a section (per-solution
   "See the solution", per-sector "Explore") are content, not this link.
6. **Buttons live in heroes and closing cards:** the hero's CTA pair, the
   closing card's CTA pair, and the one centred intro inside a section,
   homepage [02]'s orb ("Meet Akashic", one CTA). These are centred
   compositions; their kicker is centred over the headline and carries no
   number. Everything else is left-aligned.
7. **Unnumbered strips** (the homepage careers strip) use the same eyebrow
   without a number.
8. **Numbers mark order only.** The `[NN]` eyebrows stay. Inside a section,
   number items only when the order is real: steps, a timeline, a list keyed
   to a drawing. No decorative 01/02/03 on cards or lists (UX review, 23 Oct
   2026).

## 4. Tokens

Light is the default. Every route offers light and dark (`app/theme.css`
defines both appearances as RGB channels; Tailwind exposes them with alpha
support). Use tokens, never raw hex in classes; `bg-background`, never
`bg-white`. Raw `[#hex]` is only for a per-section semantic colour with no
token, and hex inside `style={}` or SVG attributes is the Rule 8 exception.
**Add a token, add a row; remove the last use, remove the token.**

| Role | Tokens |
|---|---|
| Grounds | `background` (page), `band` (the soft blue band), `primary-bg` / `tertiary-bg` (insets, hover fills), `panel` (simulated-UI header surface) |
| Feature surfaces | `depth`, `depth-raised`, `vault`, `anchor`: pastel blue in light, layered midnight in dark. Applies to every section, footer and closing card, including homepage [04]. No permanently dark layout panels |
| Text | `ink` = `primary-text` (headings, body; blue-black since 23 Oct 2026, for contrast), `secondary-text` (ledes, captions), `inkSoft` (two-tone setup lines, section body), `overcast` (eyebrow numbers, labels), `tertiary-text` (readable mockup chrome). All are paired with the selected appearance |
| Actions | `action` / `action-hover`: the primary button fill, **ink like the text** (navy-black in light, near-white in dark), never blue (user, 21 Oct 2026: blue read vague, ink reads premium). `on-action` is its lettering. `on-accent` is white lettering on the fixed cobalt `blue-solid` |
| Accent | `blue` (links, live data, focus), `blue-hover`, `blue-subtle`, `blue-border`, `blue-300/400/500` (the accent lifted for deep grounds) |
| Status | `red` (cost, not error; problem section only), `red-deep` (its large figures), `positive` family (live) |
| Lines | `subtle-stroke` (card edges), `default-stroke` (control edges), `lineSoft` (section dividers, eyebrow rails), `line` (stronger dividers), `card-line` / `card-divide` (simulated UI). In light, `subtle-stroke`, `lineSoft`, `card-line` and `uc-stroke` share one hairline value (UX review, 23 Oct 2026); keep using each name for its role |
| Photography | `on-photo`, `scrim` |
| Legacy `uc-*` | `uc-bg`, `uc-surface`, `uc-stroke`, `uc-line`, `uc-vertex`, `uc-dim`, `uc-mute`, `uc-text`: the deep-ground text ramp used by `tone="depth"` headers. Do not grow it |

**Page-scoped families.** `eis-*` is `/solutions/eis` only (pastel blue
atmosphere in light, twilight in dark); `life-*` is `/solutions/life` only
(pale ice blue in light, deep ocean in dark). Never use them elsewhere.

**Art direction (21 Oct 2026).** Akashic's pastel blue treatment is the
reference for the entire light appearance, per the user. Porcelain is the
reading ground; pale blue gives feature panels, illustrations and closures
their hierarchy. Preserve the section concepts and compositions. Homepage
[04] uses a solid pale blue panel and opaque paper cards. Its previous
permanent dark exception is retired. Dark mode uses midnight grounds,
slate-blue raised surfaces, cool white text and moonlight-blue accents.

**No cast shadows, glows, decorative gradients, translucent fills or colour
washes** (user, 21 Oct 2026). Use solid colours, precise borders, restrained
corner radii and space. Pale blue is a specified opaque surface colour, not
an overlay. Never mix `ink` into a surface to make another shade.
Use `blue-subtle` and `blue-border` together for highlighted records, not an
arbitrary accent opacity that compromises the caption contrast.

Readable copy never uses surface tokens (`text-blue-subtle`, `text-lineSoft`)
or opacity to look quiet. Use a text token at full opacity. Reserve
`default-stroke` for control boundaries and `subtle-stroke` for decorative
edges. Legacy shadow recipes resolve to `none`. Photography keeps its natural
colour; place text on a solid surface beside it or in a defined caption panel.
Downloaded brand artwork is shown on a small fixed paper or reversed-mark
swatch; the surrounding media-kit panel follows the theme.

The surface/text separation follows [Geist](https://vercel.com/geist/colors);
the restrained hierarchy was informed by
[Linear's theme refinement](https://linear.app/now/behind-the-latest-design-refresh).
The palette itself belongs to DHIRA.

**Appearance switch.** `layout/ThemeSwitch`: 44px hit area, `role="switch"`,
visible focus ring, thumb motion removed under reduced motion. `lib/theme.ts`
applies the saved choice before paint (key `dhira-appearance`); first visits
are light. Illustration-only variables (screen surfaces, diagram status
colours, terrace fills) stay local to their drawings in theme.css.

## 5. Typography

- `font-sans` (Google Sans Text): body and UI. `font-heading` (Google Sans):
  headings. `font-mono` (Google Sans Mono): eyebrows, labels, mono figures.
- **`font-display` (Newsreader): editorial pull-quotes only** (Voices; Rule 3).
- No section-local faces. Inter is loaded only for simulated product UI in
  `demos/mockups/`.

| Scale | Size | Weight | Tracking |
|---|---|---|---|
| Hero headline | 56 to 64px | 500 | `tracking-tightest` |
| Section headline (`TwoToneTitle`) | 34 / 48 / 52px | 500 | `tracking-tighter` |
| Subsection | 20 to 28px | 500 to 600 | tight |
| Body / lede | 16 to 18px, about 65 characters a line | 400 | default |
| Large figure | as the section needs | 600, `tabular-nums` | `tracking-tighter` |
| Eyebrow and mono labels | 12px | 400 to 500 | `tracking-eyebrow` (0.14em), uppercase mono |

**Headlines are medium, never bold** (UX review, 23 Oct 2026): every
headline-size heading is 500. Large figures stay 600, so a section's number
is its heaviest element, and use tabular digits so columns line up and a
count-up holds its width.

**Two-tone headlines** are always soft setup (`inkSoft`) over ink payoff,
never the reverse and never a third grey.

## 6. Spacing, shape, timing

- 8px grid. Section padding in §3.
- Radius steps: `chip` 6, `micro` 4, `tile` 8, `card` 8, `inner` 10, `frame`
  10, `btn` 10, `outer` 14.
- Shadows: `card` (resting), `frame` (floating), `deep` (modal),
  `float-dark`.
- Timing: `ease-settle` for UI transitions, `ease-smooth` for continuous
  motion. Hover, tab and menu feedback 200ms or less (`duration-150`,
  `duration-200`); `duration-250` and up are for state changes, never hover.
  Scroll reveals 500ms, once, a 16px rise, no scale or blur. Count-ups 900ms,
  starting when half the figure is in view (UX review, 23 Oct 2026).

## 7. Components (globals.css and ui/)

| Class / component | Use |
|---|---|
| `.btn-primary` / `.btn-secondary` (+ `.btn-lg`) | Hero and closing-card CTAs only (§3.6). Primary is ink (`action`), not blue. Controls sit on `default-stroke` |
| `.btn-ghost` | Toolbar-style controls inside a drawing |
| `ui/SectionLink` | A section's one onward link |
| `ui/FigureEyebrow`, `ui/SectionHeader`, `ui/TwoToneTitle` | The section grammar |
| `ui/SectionCoda` | A mono sign-off line: two fragments, one new idea |
| `ui/PageHero`, `ui/PageClose` | Resource-page hero and closing card |
| `ui/PreviewTag` | The dashed preview mark on anything agentic |
| `ui/MotionToggle` | The pause control for anything that advances by itself. A small round pause/play icon placed right beside what it stops, never in a row of its own (user, 23 Oct 2026): after the rotating hero word (`RotatingPhrase` renders it; the hero h1 takes its name from a hidden plain copy via `aria-labelledby`), at the end of the homepage [02] module index (`ContextTentacles` `control`), beside the stories' dots. Picking a card or story stops its cycle too. Tooltip names the action, the accessible name adds what it stops. Hidden under reduced motion (Rule 6b) |
| `.dot-grid` | 1px dot ground at 10px pitch |
| `.rail-container` / `ui/ScrollRevealRail` | The centred 1440px column with side gutters; no edge lines |
| `.ad-draw` / `.ad-fade` / `.ad-strike` / `.ad-ping` | The drawing kit: paths draw once when the wrapper flips `data-drawn` (`hooks/useDrawn`); final state under reduced motion |

**Stat bands** (any band of figures) use one recipe: `rounded-frame` outer on
`subtle-stroke`, dashed cell dividers, mono uppercase labels, figures
`font-semibold tracking-tighter tabular-nums` with `useCountUp`.

**Onboarding a non-obvious control** (the homepage before/after slider): play
the demonstration once per mount on first view, stop it on any interaction,
and move nothing under reduced motion.

All `@keyframes` live in `globals.css`. No component-local keyframe blocks.

## 8. Simulated product UI

Everything in `demos/mockups/` is fake software (`*Mockup`, banner comment
`SIMULATED PRODUCT UI`). Rules:

- **Tease, never reveal** (founder, 15 and 20 Oct 2026). A reader needs proof
  the product exists and has taste, not its layout. Three approved forms:
  - **Business snapshots** (`HomeHeroTeasersMockup`, homepage hero only;
    22 Oct 2026): compact executive-facing illustrations surround the centred
    headline, inspired by Vistiq's placement and Ramp's cropped product
    details. Render native-size React fragments, never scale an entire SVG
    dashboard down to unreadable type. Use one focal result, readable labels,
    entity cards, source chips and varied surfaces. Master Data shows a
    business hierarchy; Business Intelligence shows channel contribution;
    Machine Learning shows a demand outlook. Motion entrances and chart
    growth play once in view and respect reduced motion. No application
    chrome or engineering canvases. Smaller
    screens place the same seven drawings in a scrollable strip below the
    copy. Example figures are labelled illustrative. This treatment does
    not replace the homepage [02] outcome cards or context tentacles.
  - **Moments** (`AkashicModuleMomentsMockup`; /akashic/1-0 [01]): one drawing
    per module playing its verb, no app chrome, native small type, lines
    leaving the frame. The homepage's no-short-forms rule reaches inside
    the drawings too ("Business Intelligence", "82,400 orders", "Week 1").
  - Retired 21 Oct 2026: the particle glyph field (`GlyphMorphCanvas`, in
    `.archive/removed-2026-10-21/`). If particles return, keep its refined
    settings: fine single-ink atoms, a smooth flow field, no check marks or
    sparkles.
  - **Outcome cards** (`AkashicOutcomeCardsMockup`, homepage [02] since 23
    Oct 2026, swapped with the /akashic hero's moments by the user; founder,
    22 Oct 2026: the module screens "show too much", make them end-user and
    executive friendly). Taken from how ThoughtSpot, Hex and Cube show
    product to business readers. One card per module in the fan, context
    tentacles beneath as the index. Each card: a role and the plain question
    that role asks (typed in), one legible answer with its outcome phrase in
    blue, one hairline drawing proving it (sources enter from beyond the
    card's edge, colour = source system), and a mono provenance line. No app
    chrome, no builder canvases. Neighbour cards keep opaque shells and fade
    their contents, so no card shows through another. Each drawing is a
    picture a business reader already uses (user, 22 Oct 2026: "more
    intuitive and creative"): Master Data a customer family tree rolling up,
    Warehouse a metric tree, Business Intelligence a gap-to-plan chart with
    its alert, Governance one report seen by two roles. Never a mechanism
    only engineers recognise (deduplication, join canvases).
- One demo world in USD (see `AkashicScreenKitMockup`). Figures in a mockup
  are lifted from that world, never new.
- The homepage is already screen-heavy: prefer line drawings over another
  screen. Product UI is never the answer to a copy problem.

## 9. Navigation and section index

- **Header.** Platform · Solutions · Services · Resources · About, then "Talk
  to our team". Five menus; no Home item (the logo is home), no Sign in. Data
  in `content/navigation.ts`, parts in `components/layout/nav/`.
- **Menus.** One shared full-bleed sheet attached to the header. Every menu:
  a lead, vertical link lists, one featured card on the right with a hairline
  drawing. Type leads, no icons. Full labels, never abbreviations. Agents only
  inside Platform, with `PreviewTag`.
- **Timing.** 120ms hover intent, instant switching once open, 300ms close
  grace, a chevron click pins, Escape closes and returns focus. Scrim
  `bg-depth/20` with a light blur only while open.
- **Labels are links.** A click on a menu's label goes straight to its lead's
  page (the hero); on that page already, it scrolls back to the top. The
  chevron beside it opens the menu.
- **Current section** rests in ink with a 2px `blue` bar under its label.
- **Mobile.** Full-screen drill-down drawer, 44px targets, focus trap.
- **Accessibility.** Disclosure pattern with top-level links: each label is
  a link, its chevron a button with `aria-expanded`; no `role=menu`; every
  panel is server-rendered.
- **Section index** (`layout/PageMinimap`): right-edge dots, the line runs
  only from the first dot to the current one, labels unfold on hover or focus
  onto a docked sheet. Driven by each page's `sections` list; hidden below lg.

## 10. The eight design rules

1. **Shape discipline.** Each section gets a shape that fits its content.
   Cards are a last resort.
2. **No checkmark characters** in the shipped UI. Affirm with numbers,
   labels or statements.
3. **Newsreader is rare:** editorial pull-quotes only.
4. **No invented data.** Every UI figure is real and sourced, or explicitly
   labelled illustrative.
5. **Light surfaces stay light.** No permanently dark sections or cards in
   light mode. Use the shared pastel-blue surface family across every page.
   Grounds come from tokens. One soft blue band per page (`band`) on the
   page's breather section; homepage [08] Voices and the /akashic sticky quote
   are the approved flat seconds. Any dark value is blue-black, never neutral
   black. `/solutions/eis` and `/solutions/life` run their own scoped grounds.
6. **Reduced motion.** Every animation degrades to its final state.
   **6a:** animate only `transform` and `opacity`; anything that loops stops
   off screen (`layout/OffscreenAnimationGate` for CSS and SMIL,
   `hooks/useOnScreen` for timers and rAF); no `backdrop-filter` on sticky
   chrome. **6b** (WCAG 2.2.2, UX review 23 Oct 2026): anything that
   advances by itself carries `ui/MotionToggle`, and a reader's pick (a
   card, a story) stops the cycle until Play.
7. **Images are real files** in `public/`, licensed, and show the right
   subject at the right scale. Provenance in ASSETS.md.
8. **Tailwind over inline styles.** Inline `style` only for computed geometry,
   token-based SVG/diagram colours, and functional clipping masks. No decorative
   gradients, shadows or tinted overlays.

## 11. Accessibility (WCAG 2.1 AA)

- Every page: `<Nav>` + `<main id="main">` + `<Footer>`; the skip link
  targets `#main`.
- Visible focus everywhere: never `outline-none` without a `focus-visible`
  ring.
- Interactive drawings expose state (`aria-pressed`, `role="slider"` with
  values); decorative drawings are `aria-hidden` with the claim in text.
- Body text at least 4.5:1 in both appearances.

## 12. Page notes

**About journey (`demos/about/JourneyLayers`).** One terraced drawing: every
release since 2018 is a layer running on to today; national programmes hang
below the line; only the ambition is dashed. Titles with their years, no
subtitles. From 1200 × 820, when the stage fits, it pins at 88px and adds one
year per 150px of native scroll (1350px travel); reverse scrolling retraces;
"Show all years" lands the whole figure. Below 1024px an emblem precedes a
readable ledger; without JS the ledger shows at every width. Content in
`content/pages/about.ts` (`journey`).

**About motion (`sections/about/AboutMotion`).** Page-scoped reveals via
`data-about-reveal`: 14px rise over 850ms, once, visible without JS.
Portraits stay monochrome.
