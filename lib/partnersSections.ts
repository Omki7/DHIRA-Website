import type { PageSection } from "./pageSection";

/* ------------------------------------------------------------------ */
/*  /partners (added 15 Oct 2026)                                      */
/* ------------------------------------------------------------------ */
/* The partner programme, in the shape 22 of 26 reference sites run
   (Databricks, Vercel, Anthropic, OpenAI, Ramp partner pages, measured
   15 Oct 2026). White Label is already a /delivery engagement model, so
   the white-label line restates it rather than inventing a new offer.
   DRAFT: no partner is named (none is confirmed); the benefits and the
   joining steps need the founder's confirmation. */

export const PARTNERS_SECTIONS: PageSection[] = [
  { id: "hero", label: "Partners" },
  { id: "ways-to-partner", label: "Ways to partner" },
  { id: "what-partners-get", label: "What partners get" },
  { id: "how-to-join", label: "How to join" },
  { id: "talk-to-our-team", label: "Become a partner" },
];

export const PARTNERS_HERO = {
  label: "Partners",
  setup: "Partners.",
  payoff: "Build, deliver and sell on Akashic.",
  lede: "Systems integrators, technology companies and resellers who bring Akashic to more organisations, on the same governed foundation.",
};

export const PARTNER_TYPES = [
  {
    name: "Delivery partners",
    line: "Systems integrators and consultancies that implement Akashic and the solutions built on it for their clients.",
  },
  {
    name: "Technology partners",
    line: "Software, data and model providers whose products connect to Akashic through its connectors and open interfaces.",
  },
  {
    name: "White label partners",
    line: "Organisations that run Akashic inside their own private cloud, under their own brand.",
  },
  {
    name: "Resellers",
    line: "Regional and public sector resellers who carry Akashic under their own agreements and procurement routes.",
  },
];

export const PARTNER_BENEFITS = [
  { title: "Enablement", text: "Training and certification for the people who implement and support Akashic." },
  { title: "Solution architects", text: "DHIRA architects on joint pursuits, from first workshop to production." },
  { title: "Demo environments", text: "Akashic environments with sample data, for your demos and proofs." },
  { title: "Deal registration", text: "Registered opportunities, protected from channel conflict." },
  { title: "Partner pricing", text: "Commercial terms that leave room for your services." },
  { title: "Co-marketing", text: "Joint stories, events and announcements once a deployment is live." },
];

export const PARTNER_STEPS = [
  { title: "Apply", text: "Tell us about your practice, your clients and the sectors you serve." },
  { title: "Qualify", text: "A partner manager reviews fit, regions and the first opportunity together with you." },
  { title: "Enable", text: "Your team trains on Akashic and builds a first demo on sample data." },
  { title: "Go to market", text: "Joint pursuits, registered deals and the first deployment." },
];
