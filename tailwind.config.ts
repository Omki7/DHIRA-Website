import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* The ground is WHITE and stays white: it is what gives the page
           its contrast and air, and it is the only neutral the cool blue
           family (`blue-subtle` #EEF1FC, the Rule 5a band #F1F5FE) reads
           cleanly against. A warm off-white ground was tried in Jul 2026
           and reverted — warm ground + cool blue is two tints fighting.
           Every <section> uses `bg-background` rather than a hardcoded
           `bg-white`, so the ground stays a single-token change. */
        background: "#FFFFFF",
        "primary-bg": "#FAFAFB",
        "secondary-bg": "#FFFFFF",
        "tertiary-bg": "#F3F3F4",
        ink: "#1A1C1D",
        "primary-text": "#1A1C1D",
        "secondary-text": "#5C5E63",
        "tertiary-text": "#8E8F91",
        action: "#1A1C1D",
        "action-hover": "#2F3132",
        blue: "#3E63DD",
        "blue-hover": "#3351B8",
        "blue-subtle": "#EEF1FC",
        "blue-border": "#C8D2F5",
        red: "#E5484D",
        /* Positive / "live" family — mirrors the blue family's four steps.
           These four values were already in use as raw hex across LiveChip,
           [01], [04], [05] and [09]; tokenising them stops the next
           near-miss green from being eyedropped in. */
        "positive": "#30A46C",
        "positive-text": "#1B7A47",
        "positive-subtle": "#EDF7F1",
        "positive-border": "#CBE8D7",
        "subtle-stroke": "#EEEFF1",
        "default-stroke": "#D9DADB",
        "vault": "#0a0a0c",
        "inkSoft": "#6f7988",
        "overcast": "#64748B",
        "lineSoft": "#e4e7ec",
        "line": "#d3d8df",
        /* Akashic design-system tokens — one card edge, one divider, one
           header tint, one deep "anchor" ground. Replaces the per-section
           eyedropped grays (#E3E7F0 / #E9ECF3 / #E9EAEE …) so every
           simulated-UI card shares the same family. */
        "card-line": "#E4E8F0",
        "card-divide": "#EBEEF4",
        "panel": "#F7F8FB",
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
           every text contrast ratio in the section is unchanged. */
        "uc-bg": "#0A0E24",
        "uc-surface": "#141A38",
        "uc-stroke": "#1E2547",
        "uc-line": "#2A3157",
        "uc-vertex": "#545E82",
        "uc-dim": "#6f7988",
        "uc-mute": "#8f99a8",
        "uc-text": "#fafafb",
        "uc-pill": "#1B2550",
        "uc-pilltext": "#c8dcff",
      },
      fontFamily: {
        sans: ["'Google Sans Text'", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["'Google Sans'", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'Google Sans Mono'", "SF Mono", "Fira Code", "JetBrains Mono", "monospace"],
        display: ["Newsreader", "Georgia", "serif"],
        inter: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
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
        "card": "0 1px 2px rgba(11,20,64,0.04), 0 4px 12px -2px rgba(11,20,64,0.06)",
        "frame": "0 4px 10px rgba(11,20,64,0.05), 0 18px 40px -8px rgba(11,20,64,0.14)",
        "deep": "0 2px 6px rgba(11,20,64,0.12), 0 28px 56px -22px rgba(11,20,64,0.55)",
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
