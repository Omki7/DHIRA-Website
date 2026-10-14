import type { Config } from "tailwindcss";

const colour = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic colours resolve in app/theme.css. Light remains the default.
        background: colour("background"),
        band: colour("band"),
        anchor: colour("anchor"),
        "on-action": colour("on-action"),
        "blue-solid": "#3E63DD",
        "primary-bg": colour("primary-bg"),
        "tertiary-bg": colour("tertiary-bg"),
        ink: colour("ink"),
        "primary-text": colour("ink"),
        "secondary-text": colour("secondary-text"),
        "tertiary-text": colour("tertiary-text"),
        action: colour("ink"),
        "action-hover": colour("action-hover"),
        /* `blue` is an object rather than a string so the family has light
           steps for dark grounds. It was a bare "#3E63DD", which meant
           Tailwind generated NO numbered steps — so the ~60 `text-blue-400`
           / `bg-blue-400` / `border-blue-400/40` classes already written
           across the EIS mockups compiled to nothing at all and those
           accents silently rendered as inherited colour. `DEFAULT` keeps
           every existing `bg-blue` / `text-blue` / `border-blue/40` working
           unchanged; 300 and 400 are the same hue lifted to carry on the
           `depth` navy at AA. The separate `blue-hover` / `blue-subtle` /
           `blue-border` keys are untouched and still resolve. */
        blue: {
          DEFAULT: colour("blue"),
          300: "#AEC3FF",
          400: "#8AA8FB",
          500: "#5B7FEA",
        },
        "blue-hover": colour("blue-hover"),
        "blue-subtle": colour("blue-subtle"),
        "blue-border": colour("blue-border"),
        red: colour("red"),
        /* Section [01]'s cost FIGURES only. `red` #E5484D is a UI alert red —
           at 34px it reads as an error state and, at 3.4:1 on white, as a
           warning light rather than a loss. This is the same hue dropped to
           8.1:1: heavier, closer to a ledger's red ink, which is the mood the
           section is arguing (user direction, 22 Jul 2026). Inline chips,
           bars and rules stay on `red` — only the big numbers come here. */
        "red-deep": colour("red-deep"),
        /* Positive / "live" family — mirrors the blue family's four steps.
           These four values were already in use as raw hex across LiveChip,
           [01], [04], [05] and [09]; tokenising them stops the next
           near-miss green from being eyedropped in. */
        "positive": colour("positive"),
        "positive-text": colour("positive-text"),
        "positive-subtle": colour("positive-subtle"),
        "positive-border": colour("positive-border"),
        "subtle-stroke": colour("subtle-stroke"),
        "default-stroke": colour("default-stroke"),
        "vault": colour("vault"),
        "inkSoft": colour("inkSoft"),
        "overcast": colour("overcast"),
        "lineSoft": colour("lineSoft"),
        "line": colour("line"),
        /* Akashic design-system tokens — one card edge, one divider, one
           header tint, one deep "anchor" ground. Replaces the per-section
           eyedropped grays (#E3E7F0 / #E9ECF3 / #E9EAEE …) so every
           simulated-UI card shares the same family. */
        "card-line": colour("card-line"),
        "card-divide": colour("card-divide"),
        "panel": colour("panel"),
        "depth": "#0A0E24",
        "depth-raised": "#141A38",
        /* Universal Context section (Attio replica, user direction 18 Jul) —
           the section's own dark palette, scoped by the `uc-` prefix so it
           never leaks into the brand's light surfaces.
           Re-tinted 21 Jul (user direction): the ramp was neutral gray
           (#101010 → #505967), the one dark region on the site that wasn't in
           the brand's indigo family — every other dark ground (`depth`
           #0A0E24, ProvenAtScale #02183E, the shadow ladder's rgba(11,20,64))
           is blue-black, so near-black read as borrowed, not ours. The surface
           steps now sit on the `depth` family. Hue moved, LUMINANCE did not —
           #101010 and #0A0E24 have the same relative luminance (0.0052), so
           every text contrast ratio in the section is unchanged.
           Re-grounded 22 Sep 2026 (user direction): the section now sits on
           `vault`, the same black as [04]'s card, so the homepage runs ONE
           dark ground instead of two near-identical ones. The surface steps
           are `vault` with a white film (5 / 8 / 14 / 30%), which is how [04]
           draws its own borders and tiles. Luminance barely moved (#0a0a0c vs
           #0A0E24), so the text ratios still hold. */
        "uc-bg": colour("uc-bg"),
        "uc-surface": colour("uc-surface"),
        "uc-stroke": colour("uc-stroke"),
        "uc-line": colour("uc-line"),
        "uc-vertex": colour("uc-vertex"),
        "uc-dim": colour("uc-dim"),
        "uc-mute": "#8f99a8",
        "uc-text": "#fafafb",
        /* Akashic EIS page (/solutions/eis) — an editorial, atmospheric
           surface treatment scoped to that one page, in the same spirit as
           the `uc-` block above: prefixed so it cannot leak into the brand's
           standard light surfaces, and tokenised so the page's greys are one
           family rather than nine eyedropped hexes.
           The ramp is a NEUTRAL warm-grey ladder (#111 → #666 → #989898 →
           #bdbdbd), not the cool `primary-text`/`secondary-text` family —
           the page's whole argument is photographic atmosphere behind
           near-black type, and the cool ramp greys go blue against a warm
           #F4F5F0 band. `eis-band` is that band; it is the ONE warm ground on
           the site and is confined to this page. */
        "eis-ink": "#111111",
        "eis-body": "#666666",
        "eis-caption": "#989898",
        "eis-muted": "#999999",
        "eis-idle": "#bdbdbd",
        "eis-line": "#e5e5e5",
        "eis-chip": "#f9f9f9",
        "eis-chip-hover": "#e9e9e9",
        "eis-band": "#F4F5F0",
        /* Atmosphere ramp — the CSS-rendered sky in EisAtmosphere. Aerial
           perspective: the further a ridge sits, the closer it gets to the
           haze value. Blue-slate, so the page's one dark ground stays in the
           brand's blue-black family (Rule 5). */
        "eis-sky-high": "#6F8CAC",
        "eis-sky-mid": "#9BB0C6",
        "eis-haze": "#CBD4DC",
        "eis-horizon": "#EDEAE1",
        "eis-ridge-far": "#A9B9C7",
        "eis-ridge-mid": "#8DA2B5",
        "eis-ridge-near": "#73899E",
        /* Akashic Life (/solutions/life) — a page-scoped OCEAN ramp, in the
           same spirit as the `uc-` and `eis-` blocks above: prefixed so it
           cannot leak into the brand's standard surfaces, and tokenised so
           the page's blues are one family rather than a dozen eyedropped
           hexes.
           Why a second blue family at all: the page was redesigned Jul 2026
           against a healthcare reference whose entire argument is a single
           navy→cyan ocean ramp carrying every ground, rule, glyph and
           heading. The brand `blue` #3E63DD is an indigo accent, not a ramp
           — it has no light cyan end to put a glyph on a navy ground with,
           and no deep end to build a ground from. Running the page on
           `blue` produced either indigo-on-indigo mush or a third of the
           reference's contrast.
           `life-abyss` is deliberately the SAME value as `depth`: the page's
           darkest ground is the /akashic `.ak-depth` ground, not a second,
           bluer one. It started at #020A33 and was retuned 23 Jul 2026 when
           the page was compared side by side with the homepage (whose
           MeetAkashic then ran on #0A0E24; it moved to `vault` 22 Sep 2026).
           Only the mid-tones of the ramps are this page's own.
           AA on every pairing: `life-blue` on white 5.3:1, `life-cyan` on
           `life-abyss` 7.9:1, `life-navy` on white 15:1, `life-body` 12.6:1. */
        "life-abyss": "#0A0E24",
        "life-navy": "#03045E",
        "life-deep": "#050E38",
        "life-ocean": "#023E8A",
        "life-blue": "#0077B6",
        "life-cyan": "#00B4D8",
        "life-sky": "#48CAE4",
        "life-mist": "#90E0EF",
        "life-frost": "#B2F5FF",
        "life-ice": "#CAF0F8",
        "life-cream": "#FBF8F1",
        "life-body": "#333333",
        "life-ghost": "#E1EAF5",
        "life-line": "#DCE3EC",
      },
      fontFamily: {
        sans: ["'Google Sans Text'", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["'Google Sans'", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'Google Sans Mono'", "SF Mono", "Fira Code", "JetBrains Mono", "monospace"],
        display: ["Newsreader", "Georgia", "serif"],
      },
      fontSize: {
        "heading-sm": ["35px", { lineHeight: "1.1", letterSpacing: "-0.035em" }],
        "heading-md": ["48px", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "heading-lg": ["56px", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "heading-xl": ["64px", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        "tighter": "-0.04em",
        "tightest": "-0.05em",
        "eyebrow": "0.14em",
      },
      borderRadius: {
        "btn": "10px",
        "card": "8px",
        "frame": "10px",
        /* Akashic radius scale — five steps, nested largest to smallest:
           outer card / inner panel / icon tile / chip / micro tag.
           `tile` and `micro` were added Jul 2026: the scale previously
           stopped at three steps, so icon badges and status tags escaped
           to arbitrary [7px]/[8px]/[9px]/[4px] values. Every radius on the
           page now lands on a step. */
        "outer": "14px",
        "inner": "10px",
        "tile": "8px",
        "chip": "6px",
        "micro": "4px",
      },
      /* ---------------------------------------------------------------
         Elevation ladder — ONE light source, three steps.
           card  → a resting card
           frame → a floating panel, and the hover step above `card`
           deep  → modal weight; white surfaces on a dark/blue ground
         Every shadow is cast in a single indigo-black tint (11,20,64).
         Neutral black reads muddy on a blue-white page; a faintly indigo
         shadow is what the brand's own accent implies. Before Jul 2026 the
         page cast shadows in FOUR different blacks — rgba(0,0,0),
         (11,20,64), (18,20,26), (26,28,29) — i.e. four light sources.
         `deep` exists because `card`/`frame` alone could not cover modal
         weight, so [01] and [05] hand-rolled their own shadow-[...] and
         each picked its own tint. Add a step here rather than escaping.
         Names stay semantic (not e1..e4) so the 23 existing card/frame
         usages across nine other pages need no migration — and so we
         don't ship two names for one value. --- */
      boxShadow: {
        "card": "var(--shadow-card)",
        "frame": "var(--shadow-frame)",
        "deep": "var(--shadow-deep)",
        /* For white cards on the dark ak-depth slab ([05], [09]): the navy
           `deep` shadow is the same hue as the #0A0E24 ground and vanishes
           into it, so cards read as glued-on. This uses true black (darker
           than the slab) so the lift is actually visible. */
        "float-dark": "0 2px 8px rgba(0,0,0,0.30), 0 30px 60px -20px rgba(0,0,0,0.72)",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4,0,0.2,1)",
        "settle": "cubic-bezier(0.2,0.8,0.2,1)",
      },
      /* Duration ladder. `settle`/`smooth`/`pop` are TIMING FUNCTIONS and
         are not valid here — `duration-settle` silently emitted nothing
         and fell back to Tailwind's 150ms default (AkashicBuildVsBuy). */
      transitionDuration: {
        "150": "150ms",
        "250": "250ms",
        "400": "400ms",
        "650": "650ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.65s cubic-bezier(0.2,0.8,0.2,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
