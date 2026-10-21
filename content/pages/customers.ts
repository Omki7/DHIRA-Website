/* ------------------------------------------------------------------ */
/*  Customer stories hub and story template                            */
/* ------------------------------------------------------------------ */
/* The /customers hub and the strings every story page shares. The stories
   are the customer stories collection (content/collections/customer-stories.ts),
   which also feeds the "Proven at scale" carousel. Programmes are described
   by sector, not by name. Composers: app/customers/page.tsx and
   app/customers/[slug]/page.tsx. */

import type { PageCloseBlock } from "../blocks";
import type { Seo } from "../types";

export interface CustomersPage {
  seo: Seo;
  hero: { label: string; setup: string; payoff: string; lede: string; metaSuffix: string; note: string };
  library: { num: string; label: string; setup: string; payoff: string; lede: string; readStory: string };
  close: PageCloseBlock;
  story: {
    crumb: string;
    photoCaption: string;
    builtOn: string;
    relatedHeading: string;
    close: PageCloseBlock;
  };
}

export const customersPage: CustomersPage = {
  seo: {
    title: "Customer stories",
    description:
      "Intelligence layers, in production. Country-scale programmes where Akashic is the intelligence layer: records from every state, district and system, resolved into figures an authority can publish and defend.",
    path: "/customers",
  },
  hero: {
    label: "Customer stories",
    setup: "Customer stories.",
    payoff: "Intelligence layers, in production.",
    lede: "Country-scale programmes where Akashic is the intelligence layer: records from every state, district and system, resolved into figures an authority can publish and defend.",
    metaSuffix: "programmes",
    note: "Programmes are described by sector, not by name.",
  },
  library: {
    num: "01",
    label: "In production",
    setup: "Country-scale programmes.",
    payoff: "One governed picture each.",
    lede: "DHIRA built the intelligence layer in each programme, not the transaction system. The figures below are what Akashic unified, resolved and reconciled.",
    readStory: "Read the story",
  },
  close: {
    label: "Talk to our team",
    setup: "Bring the records you have.",
    payoff: "See what they can answer.",
    body: "A solutions architect works through one of your questions on your own data, with the governance a published figure needs.",
    primary: { label: "Talk to our team", href: "#talk-to-our-team" },
    secondary: { label: "See pricing", href: "/pricing" },
  },
  story: {
    crumb: "Customer stories",
    photoCaption: "Photograph illustrative of the sector",
    builtOn: "Built on",
    relatedHeading: "More customer stories",
    close: {
      label: "Talk to our team",
      setup: "Your figures, with their trail.",
      payoff: "Start with one programme.",
      body: "A solutions architect works through one of your questions on your own records.",
      primary: { label: "Talk to our team", href: "#talk-to-our-team" },
      secondary: { label: "All customer stories", href: "/customers" },
    },
  },
};
