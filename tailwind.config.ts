import type { Config } from "tailwindcss";

const colour = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Paired surface, text and accent palettes live in app/theme.css.
      colors: {
        "background": colour("background"),
        "band": colour("band"),
        "anchor": colour("anchor"),
        "on-action": colour("on-action"),
        "on-accent": colour("on-accent"),
        "on-photo": colour("on-photo"),
        "scrim": colour("scrim"),
        "blue-solid": colour("blue-solid"),
        "primary-bg": colour("primary-bg"),
        "tertiary-bg": colour("tertiary-bg"),
        "ink": colour("ink"),
        "secondary-text": colour("secondary-text"),
        "tertiary-text": colour("tertiary-text"),
        "action": colour("action"),
        "action-hover": colour("action-hover"),
        "blue-hover": colour("blue-hover"),
        "blue-subtle": colour("blue-subtle"),
        "blue-border": colour("blue-border"),
        "red": colour("red"),
        "red-deep": colour("red-deep"),
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
        "card-line": colour("card-line"),
        "card-divide": colour("card-divide"),
        "panel": colour("panel"),
        "depth": colour("depth"),
        "depth-raised": colour("depth-raised"),
        "uc-bg": colour("uc-bg"),
        "uc-surface": colour("uc-surface"),
        "uc-stroke": colour("uc-stroke"),
        "uc-line": colour("uc-line"),
        "uc-vertex": colour("uc-vertex"),
        "uc-dim": colour("uc-dim"),
        "uc-mute": colour("uc-mute"),
        "uc-text": colour("uc-text"),
        "eis-ink": colour("eis-ink"),
        "eis-body": colour("eis-body"),
        "eis-caption": colour("eis-caption"),
        "eis-muted": colour("eis-muted"),
        "eis-idle": colour("eis-idle"),
        "eis-line": colour("eis-line"),
        "eis-chip": colour("eis-chip"),
        "eis-chip-hover": colour("eis-chip-hover"),
        "eis-band": colour("eis-band"),
        "eis-sky-high": colour("eis-sky-high"),
        "eis-sky-mid": colour("eis-sky-mid"),
        "eis-haze": colour("eis-haze"),
        "eis-horizon": colour("eis-horizon"),
        "eis-ridge-far": colour("eis-ridge-far"),
        "eis-ridge-mid": colour("eis-ridge-mid"),
        "eis-ridge-near": colour("eis-ridge-near"),
        "life-abyss": colour("life-abyss"),
        "life-navy": colour("life-navy"),
        "life-deep": colour("life-deep"),
        "life-ocean": colour("life-ocean"),
        "life-blue": colour("life-blue"),
        "life-cyan": colour("life-cyan"),
        "life-sky": colour("life-sky"),
        "life-mist": colour("life-mist"),
        "life-frost": colour("life-frost"),
        "life-ice": colour("life-ice"),
        "life-cream": colour("life-cream"),
        "life-body": colour("life-body"),
        "life-ghost": colour("life-ghost"),
        "life-line": colour("life-line"),
        "primary-text": colour("ink"),
        blue: {
          DEFAULT: colour("blue"),
          300: colour("blue-300"),
          400: colour("blue-400"),
          500: colour("blue-500"),
        },
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
      // Flat surfaces: legacy shadow tokens resolve to none.
      boxShadow: { card: "none", frame: "none", deep: "none", "float-dark": "none" },
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
        "fade-in": "fade-in 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
