import type { PageSection } from "./pageSection";

/* Ten stops, down from eleven (23 Jul 2026, homepage pacing pass).
   "Join the team" is gone because careers is a strip now, not a stop — the
   rail lists the page's argument, and a hiring band is not part of it.
   "The difference" was briefly gone too and is back by direction; it is the
   one section where the reader proves the thesis to themselves.
   Order and ids must stay in sync with the [NN] eyebrows in each section. */
export const HOME_SECTIONS: PageSection[] = [
  { id: "hero", label: "Introduction" },
  { id: "problem", label: "The problem" },
  { id: "platform", label: "Meet Akashic" },
  { id: "scale", label: "Proven at scale" },
  { id: "delivery", label: "How we deliver" },
  { id: "sectors", label: "Every sector" },
  { id: "proof", label: "The difference" },
  { id: "voices", label: "Voices" },
  { id: "governance", label: "Enterprise trust" },
  { id: "get-started", label: "Get started" },
];
