import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFB",
        "primary-bg": "#FFFFFF",
        "secondary-bg": "#FAFAFB",
        "tertiary-bg": "#F3F3F4",
        ink: "#1A1C1D",
        "primary-text": "#1A1C1D",
        "secondary-text": "#5C5E63",
        "tertiary-text": "#8E8F91",
        "accent-text": "#6E6F71",
        action: "#1A1C1D",
        "action-hover": "#2F3132",
        "action-pressed": "#0F1011",
        blue: "#3E63DD",
        "blue-hover": "#3351B8",
        "blue-subtle": "#EEF1FC",
        "blue-border": "#C8D2F5",
        "subtle-stroke": "#EEEFF1",
        "default-stroke": "#D9DADB",
        "weak-stroke": "#E8E8E9",
        "white-100": "#FFFFFF",
        "white-700": "#F3F3F4",
        "white-800": "#CAD0D9",
        "black-100": "#1A1C1D",
        "black-500": "#6E6F71",
        "vault": "#0a0a0c",
        "inkSoft": "#6f7988",
        "overcast": "#8f99a8",
        "lineSoft": "#e4e7ec",
        "line": "#d3d8df",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
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
