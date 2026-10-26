/* ------------------------------------------------------------------ */
/*  Partners page (added 15 Oct 2026)                                  */
/* ------------------------------------------------------------------ */
/* The partner programme, in the shape 22 of 26 reference sites run
   (Databricks, Vercel, Anthropic, OpenAI, Ramp partner pages, measured
   15 Oct 2026). White Label is already a /services engagement model, so
   the white-label line restates it rather than inventing a new offer.
   Composer: app/partners/page.tsx.
   DRAFT: no partner is named (none is confirmed); the benefits and the
   joining steps need the founder's confirmation. */

import type { PageCloseBlock } from "../blocks";
import { mailto } from "../site";
import type { PageSection, Seo } from "../types";

interface PartnersSectionHead {
  num: string;
  label: string;
  setup: string;
  payoff: string;
}

export interface PartnersPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: { label: string; setup: string; payoff: string; lede: string };
  types: PartnersSectionHead & { lede: string; items: { name: string; line: string }[] };
  benefits: PartnersSectionHead & { items: { title: string; text: string }[] };
  join: PartnersSectionHead & { steps: { title: string; text: string }[] };
  close: PageCloseBlock;
}

export const partnersPage: PartnersPage = {
  seo: {
    title: "Partners",
    description:
      "Build, deliver and sell on Akashic. Systems integrators, technology companies and resellers who bring Akashic to more organisations, on the same governed foundation.",
    path: "/partners",
  },
  sections: [
    { id: "hero", label: "Partners" },
    { id: "ways-to-partner", label: "Ways to partner" },
    { id: "what-partners-get", label: "What partners get" },
    { id: "how-to-join", label: "How to join" },
    { id: "talk-to-our-team", label: "Become a partner" },
  ],
  sectionsLabel: "Partners page sections",
  hero: {
    label: "Partners",
    setup: "Partners.",
    payoff: "Build, deliver and sell on Akashic.",
    lede: "Systems integrators, technology companies and resellers who bring Akashic to more organisations, on the same governed foundation.",
  },
  types: {
    num: "01",
    label: "Ways to partner",
    setup: "Four ways in.",
    payoff: "One platform under all of them.",
    lede: "Implement it, connect to it, run it under your brand or carry it to your market.",
    items: [
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
    ],
  },
  benefits: {
    num: "02",
    label: "What partners get",
    setup: "Everything to deliver well.",
    payoff: "And to be paid for it.",
    items: [
      { title: "Enablement", text: "Training and certification for the people who implement and support Akashic." },
      { title: "Solution architects", text: "DHIRA architects on joint pursuits, from first workshop to production." },
      { title: "Demo environments", text: "Akashic environments with sample data, for your demos and proofs." },
      { title: "Deal registration", text: "Registered opportunities, protected from channel conflict." },
      { title: "Partner pricing", text: "Commercial terms that leave room for your services." },
      { title: "Co-marketing", text: "Joint stories, events and announcements once a deployment is live." },
    ],
  },
  join: {
    num: "03",
    label: "How to join",
    setup: "Four steps.",
    payoff: "From application to first deployment.",
    steps: [
      { title: "Apply", text: "Tell us about your practice, your clients and the sectors you serve." },
      { title: "Qualify", text: "A partner manager reviews fit, regions and the first opportunity together with you." },
      { title: "Enable", text: "Your team trains on Akashic and builds a first demo on sample data." },
      { title: "Go to market", text: "Joint pursuits, registered deals and the first deployment." },
    ],
  },
  close: {
    label: "Become a partner",
    setup: "Bring Akashic to your clients.",
    payoff: "Start with one conversation.",
    body: "Tell us about your practice and the clients you serve. A partner manager replies with next steps.",
    primary: { label: "Apply to partner", href: mailto("Partnership application") },
    secondary: { label: "See how we deliver", href: "/services" },
  },
};
