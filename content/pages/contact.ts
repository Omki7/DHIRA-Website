/* ------------------------------------------------------------------ */
/*  Contact page (added 15 Oct 2026)                                   */
/* ------------------------------------------------------------------ */
/* One page for every reason to get in touch. Sales and demos use the same
   form as the global ContactModal (layout/ContactForm). Every other route
   goes to the one published inbox with a subject line that routes it, the
   way the founder's wireframe does (mailto with subjects). The offices and
   the inbox are site settings (content/site.ts). Composer:
   app/contact/page.tsx.
   DRAFT: office street addresses and phone numbers are for the founder to
   supply; until then the offices show city, country and time zone only. */

import { mailto } from "../site";
import type { Link, PageSection, Seo } from "../types";

export interface ContactRoute {
  name: string;
  line: string;
  cta: Link;
}

interface ContactSectionHead {
  num: string;
  label: string;
  setup: string;
  payoff: string;
}

export interface ContactPage {
  seo: Seo;
  sections: PageSection[];
  hero: { label: string; setup: string; payoff: string; lede: string };
  writeToUs: ContactSectionHead & { lede: string; steps: string[] };
  routes: ContactSectionHead & { items: ContactRoute[] };
  offices: ContactSectionHead & { general: Link };
}

export const contactPage: ContactPage = {
  seo: {
    title: "Contact",
    description:
      "Talk to the people who build it. Tell us what you are trying to solve. Every enquiry is read by the team that would do the work, in New York, Hyderabad and Bangalore.",
    path: "/contact",
  },
  sections: [
    { id: "hero", label: "Contact" },
    { id: "write-to-us", label: "Write to us" },
    { id: "routes", label: "Other enquiries" },
    { id: "offices", label: "Offices" },
  ],
  hero: {
    label: "Contact",
    setup: "Contact.",
    payoff: "Talk to the people who build it.",
    lede: "Tell us what you are trying to solve. Every enquiry is read by the team that would do the work, in New York, Hyderabad and Bangalore.",
  },
  writeToUs: {
    num: "01",
    label: "Write to us",
    setup: "Sales, demos and first questions.",
    payoff: "A reply from someone who read it.",
    lede: "A few details are enough to get the right people in the room: a solutions architect, and the delivery lead for your sector.",
    steps: [
      "You tell us the question you most need answered.",
      "A solutions architect replies and sets up a 30-minute discovery.",
      "We walk through Akashic on a problem like yours, then propose a first step.",
    ],
  },
  routes: {
    num: "02",
    label: "Other enquiries",
    setup: "Something else in mind?",
    payoff: "Go straight to the right team.",
    items: [
      { name: "Partnerships", line: "Systems integrators, technology partners and resellers.", cta: { label: "Write to partnerships", href: mailto("Partnership enquiry") } },
      { name: "Press", line: "Interviews, briefings, fact checks and the media kit.", cta: { label: "Write to the press team", href: mailto("Press enquiry") } },
      { name: "Security", line: "Security reviews, questionnaires and vulnerability reports.", cta: { label: "Visit the Trust Center", href: "/trust" } },
      { name: "Customer support", line: "Help with an Akashic deployment you already run.", cta: { label: "Write to support", href: mailto("Support request") } },
      { name: "Careers", line: "Open roles, internships and how we hire.", cta: { label: "See open roles", href: "/careers" } },
      { name: "Privacy", line: "Questions about your personal data, or a request to exercise your rights.", cta: { label: "Write to privacy", href: mailto("Privacy request") } },
    ],
  },
  offices: {
    num: "03",
    label: "Offices",
    setup: "Three offices.",
    payoff: "One team across time zones.",
    /** The label leads; the inbox address is the link text. */
    general: { label: "General enquiries:", href: mailto("General enquiry") },
  },
};
