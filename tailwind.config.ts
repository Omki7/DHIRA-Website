import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
        "subtle-stroke": "#EEEFF1",
        "default-stroke": "#D9DADB",
        "vault": "#0a0a0c",
        "inkSoft": "#6f7988",
        "overcast": "#64748B",
        "lineSoft": "#e4e7ec",
        "line": "#d3d8df",
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
        "btn": "6px",
        "card": "8px",
        "frame": "10px",
      },
      boxShadow: {
        "frame": "0px 4px 10px rgba(0, 0, 0, 0.04), 0px 10px 30px -4px rgba(0, 0, 0, 0.08)",
        "card": "0px 2px 5px rgba(0, 0, 0, 0.03), 0px 4px 12px rgba(0, 0, 0, 0.04)",
        "input": "0px 1px 4px rgba(56,62,71,0.1)",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4,0,0.2,1)",
        "settle": "cubic-bezier(0.2,0.8,0.2,1)",
      },
      transitionDuration: {
        "250": "250ms",
        "400": "400ms",
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
