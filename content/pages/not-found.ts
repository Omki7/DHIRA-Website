/* ------------------------------------------------------------------ */
/*  404 page (added 15 Oct 2026)                                       */
/* ------------------------------------------------------------------ */
/* Says what happened in one line, then routes the visitor to the places
   most people are looking for. Composer: app/not-found.tsx. */

import type { Cta } from "../types";

export interface NotFoundPage {
  label: string;
  setup: string;
  payoff: string;
  lede: string;
  destinations: { label: string; href: string; line: string }[];
  home: Cta;
}

export const notFoundPage: NotFoundPage = {
  label: "404",
  setup: "Page not found.",
  payoff: "The link may be old, or the page has moved.",
  lede: "Try one of these, or go back to the home page.",
  destinations: [
    { label: "Akashic", href: "/akashic", line: "The governed data and AI platform" },
    { label: "Solutions", href: "/solutions", line: "Business problems, solved on Akashic" },
    { label: "Pricing", href: "/pricing", line: "Plans, deployment and how to buy" },
    { label: "Insights", href: "/insights", line: "Perspectives from the team" },
    { label: "Contact", href: "/contact", line: "Talk to the people who build it" },
    { label: "Site map", href: "/site-map", line: "Every page, in one place" },
  ],
  home: { label: "Go to the home page", href: "/" },
};
