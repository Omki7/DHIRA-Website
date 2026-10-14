# DESIGN SYSTEM — DHIRA Website v3

Brand, voice, design tokens, component recipes, the eight design rules, and
accessibility standards. Tailwind exposes the tokens in `tailwind.config.ts`;
appearance values live in `app/theme.css`. Keep this doc and both files in sync.

## Brand identity

- **DHIRA** = the company. **Akashic** = the platform. Keep distinct. Never write
  "DHIRA's Akashic."
- Akashic unifies structured, unstructured, and streaming data into one governed
  foundation, links it through a governed knowledge layer, and runs BI,
  conversational AI, ML, and agentic orchestration on top.
- **"Knowledge layer", never "knowledge graph"** (user direction, 22 Jul 2026,
  enforced sitewide). A knowledge graph names a specific artifact the reader will
  then expect to be shown. What Akashic guarantees is that the *meaning* of things
  is preserved and carried, which is what "knowledge layer" claims and what is
  defensible in any room. This is a claims decision, not a styling one: do not
  reintroduce "graph" anywhere in on-screen copy, page metadata, or product-UI
  mockups.
- Positioning: one accountable partner (platform + delivery), not a stack of
  vendors. Not pure SaaS, not pure consultancy.
- Proof points: national-scale DPI delivery in India; Maha Hackathon 2025 winner;
  Telangana AI Rising 2025 winner; Startup India recognised; offices in New York,
  Hyderabad, Bangalore.
- Sectors: Government, Smart Cities, Healthcare, Banking and Finance, Retail and
  Manufacturing, Education, Energy and Utility.

## Brand voice

- **Direct, declarative, short.** Headlines are complete thoughts.
- **No em dashes** in marketing copy. Use colons or periods.
- **No vaporware.** Never market a roadmap feature as live.
- **Precise over vague.** No "powerful," "seamless," "next-generation" filler.
- **British/Indian English** throughout: "organisation," "recognised," "colour,"
  "optimise."
- **Claims must be verifiable.** No invented SLA numbers, certifications, or
  client names.
- Two-tier motif: "trust / trace / act on" is the emotional promise; "grounded"
  is the technical mechanism (the governed knowledge layer). Keep distinct.
- **AI positioning (30 Sep 2026):** Akashic is "the governed data and AI
  platform", placed alongside how Databricks, Snowflake, Fabric and Reltio
  lead with AI. Live AI is named plainly (text to SQL and cited answers in Ask
  Akashic, AI-built charts in BI, ML). AI agents in Pipelines and Master Data
  ship in **preview** and always carry the dashed `PreviewTag`
  (`akashic/AkashicStory.tsx`); "ready for agents" is the uncommitted claim.
  Never present agents as generally available, autonomous, or acting on
  source systems. No sparkle icons or gradients to signal AI: the word and
  the dashed mark carry it.

**Drawing-page copy rules** (the /about and /careers polish, 23 Sep 2026).
Every word carries weight; the page reads as a website, never an article.

- **Headline:** two short lines, each a complete phrase, each two lines or
  fewer at 1440 (`ui/TwoToneTitle`). Setup states the ground, payoff lands the
  claim ("Not beside the system. / Inside the system.").
- **Lede:** one or two sentences, fifteen to twenty words in total. Fragments
  are fine ("Reliability, scale, ownership.").
- **No back-pointing pronouns.** No "it", "that", "they", "this" referring
  to an earlier line, and no relative "that" clauses ("a team that ships"
  becomes "We ship."). Name the noun again or cut the clause.
- **Coda** (`ui/SectionCoda`): two fragments, one new idea, never a restated
  headline.
- **Parallel items** (legends, captions, bios): noun phrases or matched
  sentences with the same rendered line count. Bios drop the verb
  ("Core platform engineering and distributed systems.").
- **No orphans.** A last line holding a single word gets rewritten, not
  reflowed. Measure headline line counts at 1440 and 390 before shipping.
- **One owner per claim** across a page: a line never reappears in a later
  section's lede, coda or close.

## Design tokens

### Colours

**Light is the default, with a white ground.** Home, Akashic and Company
(`/about`) also offer an explicit dark appearance (14 Oct 2026). Use
`bg-background`, never a hardcoded `bg-white`, for theme-aware surfaces.
The table below records light values; the dark values and behaviour are in
the appearance section below. Use arbitrary hex only for section-specific
semantic colours without a token (Rule 8).

| Token | Value | Use |
|---|---|---|
| `background` | `#FFFFFF` | Page/section background |
| `band` | `#F1F5FE` | The shared soft blue band; becomes muted navy in dark mode |
| `anchor` | `#1A1C1D` | A permanently dark card, distinct from the adaptive foreground `ink` |
| `on-action` | `#FFFFFF` | Foreground on an adaptive `ink` / `action` fill |
| `blue-solid` | `#3E63DD` | Saturated blue fill with white lettering in either mode |
| `primary-bg` | `#FAFAFB` | Card surfaces, inset panels |
| `tertiary-bg` | `#F3F3F4` | Subtle inset areas, hover fills |
| `ink` / `primary-text` / `action` | `#1A1C1D` | Headings, body, primary button fill |
| `secondary-text` | `#5C5E63` | Secondary copy: nav captions and idle triggers, ledes (6.5:1 on white) |
| `tertiary-text` | `#8E8F91` | Deemphasised UI text in mockups (3.2:1: never for readable copy; the nav's labels moved to `overcast`) |
| `inkSoft` | `#6f7988` | Section body copy |
| `action-hover` | `#2F3132` | Button hover |
| `blue` | `#3E63DD` | Accent links, highlighted data, focus rings |
| `blue-500` / `blue-400` / `blue-300` | `#5B7FEA` / `#8AA8FB` / `#AEC3FF` | The same accent lifted for **dark grounds** (`depth`, `uc-bg`/`vault`, the EIS wireframes). Added Jul 2026: `blue` was a bare string, so Tailwind generated no numbered steps and the ~60 `text-blue-400` classes already in the EIS mockups compiled to nothing |
| `blue-hover` | `#3351B8` | Blue accent hover |
| `blue-subtle` | `#EEF1FC` | Accent background tint |
| `blue-border` | `#C8D2F5` | Accent border |
| `red` | `#E5484D` | Problem section only, means **cost** not error. Chips, bars, rules |
| `red-deep` | `#9B1C21` | Section [01]'s large cost **figures** only (8.1:1, ledger ink) |
| `positive` | `#30A46C` | Positive/"live" family — accent |
| `positive-text` | `#1B7A47` | Positive text |
| `positive-subtle` | `#EDF7F1` | Positive background tint |
| `positive-border` | `#CBE8D7` | Positive border |
| `overcast` | `#64748B` | Tertiary labels, watermarks |
| `subtle-stroke` | `#EEEFF1` | Card borders |
| `default-stroke` | `#D9DADB` | Control borders (`btn-secondary`), dividers |
| `lineSoft` | `#e4e7ec` | Section borders, dividers |
| `line` | `#d3d8df` | Stronger dividers |
| `card-line` | `#E4E8F0` | Simulated-UI card edge |
| `card-divide` | `#EBEEF4` | Simulated-UI card divider |
| `panel` | `#F7F8FB` | Simulated-UI header tint |
| `depth` | `#0A0E24` | Deep "anchor" ground (`.ak-depth` slabs) |
| `depth-raised` | `#141A38` | Raised surface on depth |
| `vault` | `#0a0a0c` | Footer ground; the dark cards in `Closure` [10] and `HowWeDeliver` [04] |
| `uc-bg` | `#0a0a0c` | MeetAkashic section ground (= `vault`, the same black as [04]'s card; was indigo `#0A0E24` until 22 Sep 2026) |
| `uc-surface` | `#151519` | UC tile/card surfaces (`vault` + 5% white) |
| `uc-stroke` | `#1D1D22` | UC hairlines, dividers (`vault` + 8% white) |
| `uc-line` | `#2A2A31` | UC stronger borders, progress track (`vault` + 14% white) |
| `uc-vertex` | `#55555F` | UC drafting-grid vertices (`vault` + 30% white) |
| `uc-dim` | `#6f7988` | UC secondary body text (= `inkSoft`) |
| `uc-mute` | `#8f99a8` | UC muted text, progress fill |
| `uc-text` | `#fafafb` | UC primary text on dark |

**`eis-*` — `/solutions/eis` only.** Scoped exactly like `uc-*` above. This page
runs a **neutral warm-grey** text ramp instead of the cool `primary-text` family,
because its grounds are photographic atmosphere and a warm `#F4F5F0` band, and
the cool greys go blue against both. Do not use these anywhere else.

| Token | Value | Where |
|---|---|---|
| `eis-ink` | `#111111` | Headings and primary text |
| `eis-body` | `#666666` | Section body copy |
| `eis-caption` | `#989898` | Card captions, wireframe labels |
| `eis-muted` | `#999999` | Closing lines, idle tab labels |
| `eis-idle` | `#bdbdbd` | Unselected role in the lens switcher |
| `eis-line` | `#e5e5e5` | Hairlines, FAQ dividers, outline buttons |
| `eis-chip` / `eis-chip-hover` | `#f9f9f9` / `#e9e9e9` | Carousel arrows, toggle track |
| `eis-band` | `#F4F5F0` | The one warm ground on the site. This page only |
| `eis-sky-high` … `eis-ridge-near` | see config | The `EisAtmosphere` ramp (aerial perspective: further = closer to haze) |

**`life-*` — `/solutions/life` only.** Scoped exactly like `uc-*` and `eis-*`
above. A single **navy → cyan ocean ramp** carries every ground, rule, glyph
and heading on that page. It exists because the brand `blue` #3E63DD is an
indigo *accent*, not a ramp: it has no light cyan end to sit a glyph on a navy
ground with, and no deep end to build a ground from, so running the page on it
gave either indigo-on-indigo mush or a third of the reference's contrast.
`life-abyss` stays inside Rule 5's blue-black family (cf. `depth` #0A0E24).
Do not use these anywhere else.

| Token | Value | Where |
|---|---|---|
| `life-abyss` | `#0A0E24` | The page's five dark grounds. **Deliberately the same value as `depth`**, so the page's darkest ground is the /akashic `.ak-depth` ground. (It also matched MeetAkashic's `uc-bg` until that moved to `vault` on 22 Sep 2026.) Was #020A33 until 23 Jul 2026 |
| `life-navy` | `#03045E` | Headings on the light grounds |
| `life-deep` | `#050E38` | Eyebrow labels on light |
| `life-ocean` | `#023E8A` | Mid stop in the navy ground ramps |
| `life-blue` | `#0077B6` | Uppercase sub-headings on light (5.3:1) |
| `life-cyan` | `#00B4D8` | The accent: square glyphs, CTA capsule, leaders |
| `life-sky` | `#48CAE4` | The same accent lifted for navy grounds (7.5:1+) |
| `life-mist` / `life-frost` | `#90E0EF` / `#B2F5FF` | Pale cyan; `frost` is the eyebrow cross |
| `life-ice` | `#CAF0F8` | Light ground start, skeleton rows, hairlines in the mockup |
| `life-cream` | `#FBF8F1` | Light ground end. The page's warm note |
| `life-body` | `#333333` | Body copy on light (12.6:1) |
| `life-ghost` | `#E1EAF5` | The giant ghost figures behind [02]'s evidence blocks |
| `life-line` | `#DCE3EC` | Column rule and ticks on the light grounds |

**Keep this table in sync with `tailwind.config.ts`** — add a token, add a row;
remove usage, remove the config row in the same change.

**Tokenisation note:** arbitrary `[#hex]` classes whose value equals a token are
tokenised (`bg-[#3E63DD]` → `bg-blue`). Values shared across families (`#FFFFFF`,
`#FAFAFB`, `#0A0E24`, `#141A38`, `#6f7988`) are left as-is where the semantic
target is ambiguous, and hex inside `style={}`/SVG attrs is a Rule 8 exception.
Near-miss greys not equal to any token (e.g. `#E9EAEE`) should be consolidated to
`card-line`/`subtle-stroke` only with design sign-off (it changes the colour).

### Appearance: light and dark

The palette follows the separation of surfaces, borders and text in
[Vercel Geist](https://vercel.com/geist/colors), with the restrained hierarchy
of [Linear](https://linear.app/) as a visual reference. Reviewed 14 Oct 2026.
DHIRA keeps its own blue-black grounds, drawings and typography.

`app/theme.css` holds RGB channel variables; Tailwind's semantic tokens retain
alpha modifiers. Dark values apply through
`:root[data-theme="dark"]:is([data-theme-boot], :has([data-theme-page]))`.
The head bootstrap marks supported routes before any body HTML is parsed; the
temporary boot marker is removed after hydration. Only the three opted-in
page composers carry that marker. The shared nav, modal and body inherit the
same palette. Other routes stay light, without deleting the visitor's preference.

| Tokens | Dark values |
|---|---|
| `background` / `primary-bg` / `tertiary-bg` | `#0B1019` / `#111925` / `#1A2433` |
| `ink`, `primary-text`, `action` | `#EEF2F8` |
| `secondary-text` / `inkSoft` / `tertiary-text` / `overcast` | `#B0BDCE` / `#92A3B8` / `#8C9BB0` / `#93A4BC` |
| `action-hover` / `on-action` / `anchor` | `#FFFFFF` / `#101722` / `#101725` |
| `blue` / `blue-hover` / `blue-subtle` / `blue-border` | `#9AB8FF` / `#BED0FF` / `#182742` / `#344D78` |
| `band` / `panel` | `#101C30` / `#151F2E` |
| `subtle-stroke` / `default-stroke` / `lineSoft` / `line` | `#253043` / `#455570` / `#283448` / `#3B4A61` |
| `card-line` / `card-divide` | `#334158` / `#29364A` |
| `red` / `red-deep` | `#F08085` / `#F5A2A7` |
| `positive` / `positive-text` / `positive-subtle` / `positive-border` | `#62C99A` / `#85D7AE` / `#132C27` / `#295044` |
| `vault`, `uc-bg` / `uc-surface` / `uc-stroke` / `uc-line` / `uc-vertex` | `#080D16` / `#111A28` / `#222E40` / `#35445B` / `#65758C` |
| `uc-dim` | `#91A0B5` |

Fixed inverted buttons and numbered accent steps keep their own colours.
Use `on-action` on adaptive filled controls; white lettering on lifted `ink`
would disappear. Use `blue-solid` for blue controls with white lettering.
The shadow ladder uses a darker shadow in dark appearance, with a fine top edge.

Illustration-only CSS variables in `theme.css` cover the screen surfaces,
machined plate faces and edges, diagram status colours, AWS wordmark and the
journey's individual terrace fills. Keep those local to the drawings. SVG and
inline product chrome read the variables directly; no blanket inversion filter.
The Company landscape uses a dusk exposure grade, while portraits retain natural
contrast. The Voices portrait disables its light-mode multiply blend in dark mode.

The sun/moon switch has a 44px minimum hit area, a visible focus ring and native
button keyboard handling with `role="switch"`. Motion is limited to the thumb
and is removed under reduced motion. `lib/theme.ts` applies the saved choice
before paint; first visits always use light, regardless of OS appearance.
The local-storage key is `dhira-appearance`. Storage failures fall back to the
current tab; normal preferences synchronise between tabs. No theme dependency.

### Typography

- **`font-sans`** (Google Sans Text): body, most UI copy.
- **`font-heading`** (Google Sans): headings that opt in via `font-heading`.
- **`font-mono`** (Google Sans Mono): eyebrow labels, mono figures, dossier chrome.
- **`font-display`** (Newsreader): **editorial pull-quotes only** (Voices). Rare — Rule 3.
- **No section-local faces.** MeetAkashic ran on Inter (`font-inter`) until 22 Sep
  2026 and read as a different site; the token is gone. Inter is still loaded
  for the simulated product UI inside `demos/mockups/` (inline `fontFamily`),
  which imitates real software chrome, and nowhere else.

| Scale | Size | Weight | Tracking |
|---|---|---|---|
| Hero headline | 56–64px | 600 | `tracking-tighter` |
| Section headline | 48–64px | 600 | `tracking-tighter` |
| Subsection | 28–32px | 600 | tight |
| Body | 16–18px | 400 | default |
| Small body | 14px | 400–500 | default |
| Eyebrow | 11–13px | 500 | `tracking-eyebrow` (0.14em), UPPERCASE font-mono |

**Two-tone headline grammar (one rule, sitewide):** a headline split across two
colours is always **soft setup → ink payoff** — `text-inkSoft` (or `text-uc-mute`
on the dark ground) for the setup line, `text-ink` / `text-uc-text` for the line
that carries the claim. Never the reverse, and never a third grey. Before 22 Jul
2026 the site ran all three variants at once — `ProblemSection` soft→ink,
`EnterpriseSecurity` ink→soft, `EverySector` ink→`overcast`,
`AkashicOpenFoundations` ink→`secondary-text`, `UCSignals`/`UCSdk` white→mute —
which is what the team read as "some titles are black, some are black and grey".

**Eyebrow pattern:** `[NN]  SECTION NAME` — numbers in `text-overcast`, rest in
`text-inkSoft`. Homepage eyebrow rails are **left-only** (`flex items-center`);
the right-hand `/ DESCRIPTOR` was removed from every homepage section (exception:
`JoinTheTeam` right slot holds the live "NOW HIRING" pulse). /about and /careers
use the same left-only rail (`ui/FigureEyebrow`, 23 Sep 2026); other sub-pages
still carry the right descriptor in the borderless variant.

**Section header layout (/about, /careers, and the homepage/Akashic default):**
eyebrow rail, then the headline, then the lede directly UNDER the headline, all
in the left column (`ui/SectionHeader`). Never headline left and lede in a right
column: the user rejected that split on 23 Sep 2026.
**No accent colour and no status dot on a section eyebrow**: the one that
carried a pulsing blue dot ([02]) read as a different class of thing from its
neighbours. The [01]→[02] bridge control uses the same palette and earns its
emphasis by filling to `ink` on hover.

### Spacing, shape, timing

- **8px grid.** Common wrapper: `pt-12 pb-24 lg:pt-16 lg:pb-32`.
- Radius scale: `chip` 6 / `micro` 4 / `tile` 8 / `card` 8 / `inner` 10 /
  `frame` 10 / `btn` 10 / `outer` 14. Every radius lands on a step.
- Shadow ladder (one indigo light source, `rgba(11,20,64)`): `card` (resting),
  `frame` (floating/hover), `deep` (modal), `float-dark` (white cards on the
  dark slab — true-black so the lift is visible).
- Timing: `ease-settle` `cubic-bezier(0.2,0.8,0.2,1)` (UI transitions),
  `ease-smooth` `cubic-bezier(0.4,0,0.2,1)` (continuous motion). Durations are
  numeric tokens (`duration-250`, `duration-400`, `duration-650`) — `settle`/
  `smooth` are timing functions, not durations.

## §4a — Stat Bands (site-wide consistency)

Any "band of figures" uses ONE recipe — `components/ui/StatBand.tsx` standalone,
or match its chrome by hand inside a card that owns its outer frame:

- Outer: `overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg`
- Top accent: `h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent`
- Cell dividers: **dashed** (`border-dashed border-lineSoft`), never solid/gap
- Eyebrow: pulsing blue dot (`h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]`) + mono uppercase label
- Figure: `font-semibold leading-none tracking-tighter text-ink`, count-up via `useCountUp`
- Footer caption: `border-t border-dashed border-lineSoft` mono uppercase

**About hero exception (29–30 Sep 2026):** centred text sits over an original photographic landscape of open blue sky and distant green hills. The image extends behind the navigation through the proof row, then fades into white. A light overlay preserves text contrast. This opening owns the page's soft blue ground. Asset and generation prompt: `ABOUT_LANDSCAPE_ASSET.md`. Hero description sentences occupy one line each at desktop widths (1024px and above), with natural wrapping below. About paragraphs and subheadings use balanced wrapping; explicitly unbroken diagram labels remain unbroken. Narrow-screen type and tablet legend layout avoid stranded words. No hero diagram. The final polish adds a staggered entrance, a restrained landscape settle and up to 28px of scroll depth, all disabled for reduced motion.

**Deliberate exceptions:** `EnterpriseSecurity`'s 2×2 governance grid (gap-as-
divider beside an SVG chart); `PublicSectorProven`'s dark row-based record board.

## §5 — CSS component classes (globals.css)

| Class | Description |
|---|---|
| `.btn-primary` | Dark (ink) fill, 36px, 10px radius |
| `.btn-secondary` | White, `default-stroke` border, 36px, 10px radius |
| `.btn-primary-invert` | White fill, ink text — the primary **on a dark ground** |
| `.btn-secondary-invert` | Transparent, `white/34` border, white text — dark ground |
| `.btn-lg` | Size modifier: 44px / 28px padding. Compose, e.g. `btn-primary-invert btn-lg` |
| `.btn-ghost` | Transparent, tints to `tertiary-bg` on hover |
| `.dot-grid` | 1px dot radial-gradient at 10px pitch |
| `.rail-container` | Centred 1440px wrapper, `border-x border-lineSoft` |
| `.hs-card` | Absolute 840×592 card for HeroProducts carousel (`data-pos`) |
| `.ad-draw` / `.ad-fade` / `.ad-strike` / `.ad-ping` | `/about` drawing kit. Paths carry `pathLength="1"` and draw once when the figure's wrapper flips `data-drawn="true"` (`hooks/useDrawn.ts`); stagger with `--ad-delay`, pace with `--ad-dur`. `.ad-fade` owns `transform`, so position a label on an outer span and fade an inner one. Reduced motion lands on the final state with no delay |
| `.alife-*` | `/solutions/life` only — `eyebrow`, `wavefield`, `aurora`, `orbit`/`orbit-rev`, `sonar`, `leader`. Page-scoped like the `life-*` tokens. `.alife-eyebrow` sets in `font-mono` on purpose: the reference uses its body sans, but the mono face is what every other section label on the site is set in, and it is the cheapest thing that stops nine labels reading as another company's |

**Controls sit on `default-stroke`, cards sit on `subtle-stroke`.**
`.btn-secondary` used to rest on `subtle-stroke` #EEEFF1 — a 1.06:1 edge against
the white ground, so the site's most-used CTA ("Talk to our team") looked
unbordered until you hovered it. Do not put a control back on the card edge.

**Dark grounds use the `-invert` pair, never `btn-secondary`.** Every closure
card and dark hero previously hand-rolled its CTAs: `.btn-secondary` (a *white*
button, i.e. the primary) beside an inline `h-9 border-white/25` link, or an
`h-10 bg-white/[0.08]` pair — three heights and three border weights for one
recipe. All of them now compose the two classes above.

### §5a — Onboarding a non-obvious control

[06]'s drag-compare is the pattern: a seam parked at 50% does not read as a
control however loud the knob is, so on first entry the slider **plays its own
comparison** — one slow pass holding 750ms a side, one quick pass, settle back
to 50/50, then `proofNudge` throws the knob both ways to hand the gesture over.
Three rules any copy of this must keep: **once per mount** (first intersection,
never a loop); **any interaction kills it mid-flight** (`stopDemo()` on
pointerdown, arrow keys and the toggle, so it never fights the reader for the
handle); and **nothing moves under `prefers-reduced-motion`**.

The wipe and divider stay inside the comparison stage. Before / Compare / After
controls provide direct views and a reset. The slider uses pointer capture and
`touch-action: pan-y` so vertical page scrolling stays available. Mobile uses
its own node positions and a taller stage to keep labels readable.

All `@keyframes` live in `globals.css` (`ps-*` family, `fl-*`, `alife-*`, `ad-ping`,
`softpulse`, `dashmove`, `progressFill`, `vconn-flow`, `proof*`,
`closeRule`/`closeFloat`). **Do not add a component-local
`<style dangerouslySetInnerHTML>` keyframe block** — it risks silently
redefining a global keyframe.

## §6 — Navigation (rebuilt 14 Oct 2026)

Researched against Stripe, Vercel, Databricks, Snowflake, Linear and C3 AI
(their live menus measured headlessly on 14 Oct 2026) and NN/G's mega-menu
and timing guidance. Data lives in `lib/navigation.ts`, parts in
`components/layout/nav/`.

- **IA.** Akashic · Solutions · Services · Company, then "Talk to our team"
  (opens the ContactModal). The logo is home: a "Home" item was built and
  dropped the same day (no reference site has one, nor the founder's
  wireframe; it put home twice side by side and took the first slot from the
  product). Insights is gone. Agents live inside the Akashic menu with
  `PreviewTag`, never top-level, while agents ship in preview. No Login until a
  real app URL exists. Four top items: do not add more without direction.
- **One shared sheet, attached.** Every desktop menu opens into the same
  full-bleed white surface hanging off the header's bottom edge: no caret, no
  gap, so a diagonal pointer path never leaves the hover region. Height morphs
  between menus over 250ms `ease-settle`; the incoming panel slides 16px in
  from the side it was reached from (`nav-in-*` keyframes in globals.css). Do
  not go back to a popover per trigger: the jump between them is what read as
  dated.
- **Timing** (`hooks/useMenuIntent`). 120ms hover intent on fine pointers,
  instant switching once a menu is open, 300ms close grace, a click pins a
  hover-opened menu, Escape closes and returns focus. Touch and keyboard
  toggle.
- **Focus scrim.** `bg-depth/20` with a 3px backdrop blur over the page:
  blue-black per Rule 5. The header and the announcement bar stay crisp above
  it.
- **Type leads, no icons.** Lead title 24px/600 `font-heading`; items 15px/500
  ink; captions 13px `secondary-text` (6.5:1; `inkSoft` is 4.4:1 at this size);
  group labels 11px mono `overcast` (4.8:1). No icon tile per row. Captions
  are terse noun phrases on one line; leads and featured titles wrap balanced,
  with no orphans.
- **Grid.** 12 columns, 32px gutter: lead (hairline to its right), link groups,
  featured card. Spans are data (`span` in the config). If a label wraps,
  shorten the label, not the column.
- **Featured card.** One per menu, `primary-bg` on `subtle-stroke`, hugging its
  content. Its figure is a hairline drawing in the /about line language (blue
  for what is live), drawn with `.ad-draw` the first time its menu opens. No
  product screenshots, no AI gradients or sparkles.
- **Indicators.** A 2px ink underline slides to the open trigger; a 1px
  `blue/40` thread grows from it along the sheet's top edge; the current
  section's trigger rests in ink, the others in `secondary-text`.
- **Announcement bar.** One line above the header in normal flow, so the
  header keeps its 72px. `z-[45]`: above the scrim and the /about landscape.
  `NAV_ANNOUNCEMENT = null` removes it.
- **Mobile (below lg).** Full-screen drill-down drawer: 20px level-one rows,
  each menu slides in with an "All menus" back control, 44px targets, a sticky
  CTA, scroll lock and a focus trap. Focus moves with `preventScroll`, because a
  plain focus scrolls the track mid-slide and leaves every panel offset.
- **Accessibility and SEO.** W3C disclosure-navigation pattern: button
  triggers with `aria-expanded` / `aria-controls`, no `role=menu`. Tab from an
  open trigger enters its panel; Tab past the last link moves to the next
  trigger. Every panel is SSR-rendered and `hidden`, so all links are in the
  HTML. `aria-current` marks the current page. Reduced motion lands every
  state instantly.

## §7 — Design rules

1. **Shape discipline.** Every section gets its own organic shape. Cards are a
   last resort, not a default. Design the container to match the content.
2. **The checkmark is sacred.** The checkmark character appears only in
   FieldLedger's telemetry badge; since FieldLedger stopped rendering, the shipped
   site emits **no checkmarks**. Affirm with numbers/labels/statements instead.
3. **Newsreader is rare.** `font-display` = editorial pull-quotes only (Voices).
4. **No invented data.** All UI numbers are real (Stanford HAI 2026 for the AI
   chart; real deployment figures for scale stats). Do not invent numbers.
5. **Dark sections are deliberate, not default.** Three permanent dark regions:
   Footer (`vault`), `MeetAkashic` (`uc-bg` = `vault`, by direction 22 Sep 2026, to
   match [04]'s card), `ProvenAtScale` (deep navy). **Every
   dark ground is blue-black, never neutral black** — match the indigo family
   (`#0A0E24` / `#0a0a0c`), do not lighten toward `blue`. New sections default to
   `bg-white`/`bg-background`.
   - **5c — the EIS wireframes are light. All of them.** A dark
     `EisBriefScreenMockup` on `depth`/`uc-*` (plus a `tone="depth"` browser
     chrome) was built and reverted on user direction, 22 Jul 2026. Do not
     reach for a dark product screen on `/solutions/eis` again without fresh
     direction. Light does not mean the card grid, though: the brief's content
     area is **white with hairline dividers**, not white cards floating on
     `CANVAS` grey, because that nesting is what made its first build read as a
     2010 dashboard.
   - **5a — One soft blue band per page.**
     `bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)]`
     (fade endpoints must equal `background`). Pick the page's narrative/trust
     "breather" section. Do not add a second without user direction. On the
     homepage that is [04], as a wash behind its black card.
     **User-approved seconds (22 Sep 2026):** homepage [07] Voices and the
     /akashic sticky quote (after the wireframes) both run the **flat**
     `bg-[#F1F5FE]` that /akashic [06] Open architecture uses, no fade. Do not
     spread the flat band further without asking.
     `/solutions/life` is exempt and runs its own ground rhythm: it alternates
     dark and light **in pairs** across eleven sections on the `life-*` ramp,
     which is the whole point of that page's system. Its `life-ice`→`life-cream`
     band at [05]–[06] is the local equivalent of this rule, not a violation of
     it. `/solutions/eis` is exempt in the same way via `eis-band`.
   - **5b — the page's dark cards are [04] and [10], both `vault`.** Three
     recolours were tried and reverted on 22 Jul 2026: deep blue #10265F on
     [10] + footer; a light woven blue panel on [10]; the same panel swapped up
     to [04]. The settled answer is the original — [04] and [10] black, footer
     black — so do not reach for a coloured closing card again without fresh
     direction. Sub-page closure cards stay on `bg-ink`, except the Akashic
     redesign commissioned 23 Sep 2026: its close uses `bg-depth`, matching
     its technical reference section.
6. **Reduced motion.** Global CSS zeroes `*` animation-duration under
   `prefers-reduced-motion`. Any new animation must degrade safely.
7. **Images require real files.** Never point `<Image>`/`<img>` at a path not in
   `public/`. Photography is stock under free commercial licence (Unsplash); keep
   proof filenames non-identifying. A proof photo must also carry the *right*
   subject: `public/proof/` shots are illustrative of the deployment's sector and
   its **scale**, never a screenshot of the system. Replaced 22 Jul 2026 on that
   test — `vaccination.jpg` showed an infant being immunised, which reads as
   routine childhood vaccination rather than a national adult drive, and
   `mobility.jpg` was a moody duty-free concourse that read as leisure travel.
   Both now show people being processed at scale (a mass vaccination hall with
   registration desks; a queue at airport check-in). Avoid frames dominated by
   commercial branding or a single identifiable country's flags and signage.
8. **Tailwind over inline styles.** Utility classes are the styling method. The
   only sanctioned inline-style exceptions are computed geometry and multi-stop
   conic/radial gradient/mask layers (MeetAkashic orb/pinstripes, edge masks, the
   iso map scene). Do not let the exception spread.

## Accessibility standards (WCAG 2.1 AA)

- **Landmarks:** every page composes `<Nav>` + `<main>` + `<Footer>`. Keep the
  section list inside `<main>`.
- **Focus visible:** `globals.css` defines a global `:focus-visible` ring (2px
  `blue`, 2px offset; white on `.ak-depth`/`#akashic-in-action`). Do **not** use
  `outline-none` on a focusable element without pairing a `focus-visible:` ring —
  `outline-none` (0,2,0) beats the global rule (0,1,0) and removes the indicator
  (this bit the ProofComparison slider handle; now fixed with a
  `focus-visible:ring`).
- **ARIA:** interactive nav dropdowns carry `aria-expanded`/`aria-label`; the
  drag-compare handle is `role="slider"` with `aria-valuemin/max/now`. Dynamic
  regions need `aria-live` where state changes silently.
- **Contrast:** body text meets ≥4.5:1 on both light and the dark UC/depth
  grounds (the 21 Jul UC re-tint moved hue, not luminance, so ratios held).






## About journey: the layer drawing (6 Oct 2026)

**User-restored composition.** The complete desktop story belongs in one
visual. The timeline uses titles and years only, per the latest user request;
the year stays beside its title so the labels have a clear context. Retain the
complete ambition panel on the right. Do not add a Read the full timeline
disclosure or distribute the future into an additional reading section.

**Reading and motion.** The terraced silhouette accumulates one year at a
time, retaining earlier layers. The stationary reading area carries the
year, a short headline and an explanation. The stage pins at 88px from
1200 × 820 only when its measured height fits. Each year occupies 150px of
native scrolling, with 1350px total travel including the final hold.
No wheel interception, snapping or autoplay. Reverse scrolling retraces
the years. Show all years provides an immediate overview at the same place.

**Drawing.** Calendar time remains proportional through Today. Equal-height
layers carry no quantitative thickness claim. Built capabilities rise above
the data engineering foundation; national programmes sit below. Research
is hatched until the 2022 launch. Each terrace carries a 17px Google Sans
title and a 13px mono year on one baseline, with 24px line height and a 12px
gap. The uppercase supporting subtitles are removed. The founding label has
208px of reserved space, calculated against the actual historical span, so
the larger title and year stay inside the drawing. Calendar labels are 12px
and era captions 11px, both in secondary-text for readable contrast.
Hover highlights the foundation of a layer; labels retain full contrast.

**Final typography and linework (7 Oct 2026).** Google Sans carries all titles,
Google Sans Text carries explanations, and mono is reserved for dates and
small labels. Timeline titles share a -0.01em tracking value across the drawing
and ledger. The section heading uses -0.035em tracking, 1.12 leading and a
medium-weight overcast setup. Text stays ink or secondary-text; the small
ambition status and recognition coda also use secondary-text for contrast.
Blue terrace boundaries, cool grey programme boundaries and quieter ruler
lines have distinct roles. Research hatching is spaced at 7px; the dashed
horizon has round caps. All stroke colours use existing tokens. Only the
graduated terrace fills use local semantic colours.

**Horizon.** The right-hand continuation contains the full ambition panel:
trusted context, scoped action and human authority, with their explanations.
The horizon reserves at least 228px: a 22px heading, 16px principle titles and
14px explanations at 20px leading. A fine dashed guide connects the principle
nodes and stops at the last node; it follows the text instead of a fixed SVG
height. The status uses sentence case. Keep clearance above the date ruler.
The dashed horizon has no future calendar ticks. These are ambitions with
no release date, not claims of shipped capabilities. The wording is informed
by [Trustworthy agents in practice](https://www.anthropic.com/research/trustworthy-agents)
and [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents).

**Alternatives.** Below 1024px, a small complete emblem precedes the full
chronological ledger, with 17px titles and 14px years on a shared 24px line,
with 20px vertical padding per year. Historical descriptions
remain available to assistive technology; the ambition and its principles
stay visible. The ledger is screen-reader-only on desktop. Short viewports and reduced motion
show the completed drawing without pinning. Reduced-motion changes during
the visit are observed. Without scripting, the ledger shows at every width.

**Updating.** Content lives in lib/aboutJourney.ts. Keep layer facts and
year summaries consistent with the supplied chronology, and update
JOURNEY_TODAY with the record. The 2025 recognition remains the coda.

### About final motion and portrait treatment

`AboutMotion.tsx` owns page-scoped entrance and scroll reveals. Text moves only 14px and settles over 850ms, with short stagger intervals. Reveals play once; content is visible without JavaScript. The landscape entrance is clipped to its own bounds. Native anchor scrolling is smooth, with no wheel interception. Portraits use a fine photographic frame and a 1.018× hover scale on precise pointers only. All portrait rendering stays monochrome. Asset sources, the built-in imagegen prompt set and final file paths are recorded in `ABOUT_PORTRAIT_ASSETS.md`.

The journey's cumulative reveal and hover lineage are independent of the page reveal controller; its header still reveals with the rest of the page.

The vision now shares `AboutHeading` with the other editorial sections. Its shorter title avoids a stranded word on narrow screens. The leadership heading uses two complete three-word phrases. Copy wrapping was measured at 320, 360, 390, 430, 768, 1024, 1280 and 1440px widths.
