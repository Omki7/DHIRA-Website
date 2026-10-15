import type { PageSection } from "./pageSection";
import { mailto } from "./site";

/* ------------------------------------------------------------------ */
/*  /contact (added 15 Oct 2026)                                       */
/* ------------------------------------------------------------------ */
/* One page for every reason to get in touch. Sales and demos use the same
   form as the global ContactModal (layout/ContactForm). Every other route
   goes to the one published inbox with a subject line that routes it, the
   way the founder's wireframe does (mailto with subjects).
   DRAFT: office street addresses and phone numbers are for the founder to
   supply; until then the offices show city, country and time zone only. */

export const CONTACT_SECTIONS: PageSection[] = [
  { id: "hero", label: "Contact" },
  { id: "write-to-us", label: "Write to us" },
  { id: "routes", label: "Other enquiries" },
  { id: "offices", label: "Offices" },
];

export const CONTACT_HERO = {
  label: "Contact",
  setup: "Contact.",
  payoff: "Talk to the people who build it.",
  lede: "Tell us what you are trying to solve. Every enquiry is read by the team that would do the work, in New York, Hyderabad and Bangalore.",
};

export type ContactRoute = { name: string; line: string; cta: string; href: string };

export const CONTACT_ROUTES: ContactRoute[] = [
  { name: "Partnerships", line: "Systems integrators, technology partners and resellers.", cta: "Write to partnerships", href: mailto("Partnership enquiry") },
  { name: "Press", line: "Interviews, briefings, fact checks and the media kit.", cta: "Write to the press team", href: mailto("Press enquiry") },
  { name: "Security", line: "Security reviews, questionnaires and vulnerability reports.", cta: "Visit the Trust Center", href: "/trust" },
  { name: "Customer support", line: "Help with an Akashic deployment you already run.", cta: "Write to support", href: mailto("Support request") },
  { name: "Careers", line: "Open roles, internships and how we hire.", cta: "See open roles", href: "/careers" },
  { name: "Privacy", line: "Questions about your personal data, or a request to exercise your rights.", cta: "Write to privacy", href: mailto("Privacy request") },
];
