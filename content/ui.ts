/* ------------------------------------------------------------------ */
/*  Interface microcopy                                                */
/* ------------------------------------------------------------------ */
/* Every short string the site chrome speaks: accessible names, control
   labels, status messages and the contact and subscribe forms. Delivered
   once per page by the root layout through components/providers/UiProvider,
   so any client component reads it with useUi(). In a CMS this is a
   singleton "Interface strings" document; it is also the file a translation
   would start from. */

import type { Region } from "@/lib/region";

export interface UiStrings {
  skipLink: string;
  homeLink: string;
  llmsLinkTitle: string;
  nav: {
    primary: string;
    openMenu: string;
    closeMenu: string;
    siteMenu: string;
    allMenus: string;
  };
  footer: {
    rights: string;
    policies: string;
    lastUpdated: string;
    registeredOffice: string;
    cin: string;
    /** Accessible name for a social profile link; the profile label follows. */
    socialPrefix: string;
  };
  theme: {
    label: string;
    toggle: string;
    toLight: string;
    toDark: string;
  };
  region: {
    label: string;
    suggestion: string;
    stay: string;
    names: Record<Region, string>;
    question: Record<Region, string>;
    hasVersion: Record<Region, string>;
    view: Record<Region, string>;
    /** One terse line per regional page and region, for the suggestion card. Keyed by path. */
    offers: Record<string, Record<Region, string>>;
  };
  preview: string;
  /** Appended, visually hidden, to links that open a new tab. */
  opensInNewTab: string;
  carousel: { roleDescription: string; previous: string; next: string; show: string };
  onThisPage: string;
  pageSections: string;
  longform: { breadcrumb: string; contents: string; keepReading: string; minRead: string };
  /** Policy pages (sections/legal/LegalDocument). `crumb` links to /legal. */
  legal: { crumb: string; lastUpdated: string; otherPolicies: string };
  drawnBy: string;
  share: {
    label: string;
    linkedIn: string;
    x: string;
    email: string;
    copy: string;
    copied: string;
  };
  contactModal: {
    dialogLabel: string;
    close: string;
    closeBackdrop: string;
    badge: string;
    title: string;
    body: string;
    assurances: { id: "discovery" | "response" | "privacy"; title: string; text: string }[];
    footerLeft: string;
    footerRight: string;
  };
  contactForm: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    interest: { label: string; placeholder: string; options: string[] };
    message: { label: string; placeholder: string };
    submit: string;
    submitting: string;
    consent: { before: string; link: { label: string; href: string }; after: string };
    sentTitle: string;
    sentBody: string;
    sendAnother: string;
    close: string;
  };
  subscribe: {
    label: string;
    placeholder: string;
    submit: string;
    thanks: string;
  };
}

export const ui: UiStrings = {
  skipLink: "Skip to main content",
  homeLink: "DHIRA homepage",
  llmsLinkTitle: "LLM summary",
  nav: {
    primary: "Primary",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    siteMenu: "Site menu",
    allMenus: "All menus",
  },
  footer: {
    rights: "All rights reserved.",
    policies: "Website policies",
    lastUpdated: "Last updated",
    registeredOffice: "Registered office:",
    cin: "CIN",
    socialPrefix: "DHIRA on",
  },
  theme: {
    label: "Appearance",
    toggle: "Dark mode",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  region: {
    label: "Region",
    suggestion: "Regional version of this page",
    stay: "Stay here",
    names: { intl: "International", in: "India" },
    question: { intl: "Viewing from outside India?", in: "Viewing from India?" },
    hasVersion: { intl: "This page has an international version.", in: "This page has an India version." },
    view: { intl: "View the international page", in: "View the India page" },
    offers: {
      "/pricing": {
        intl: "Prices in USD and international buying routes.",
        in: "Prices in INR, GST and GeM buying routes.",
      },
    },
  },
  preview: "Preview",
  opensInNewTab: "(opens in a new tab)",
  carousel: { roleDescription: "carousel", previous: "Previous", next: "Next", show: "Show" },
  onThisPage: "On this page",
  pageSections: "Page sections",
  longform: { breadcrumb: "Breadcrumb", contents: "Contents", keepReading: "Keep reading", minRead: "min read" },
  legal: { crumb: "Legal", lastUpdated: "Last updated", otherPolicies: "Other policies" },
  drawnBy: "Drawn by",
  share: {
    label: "Share",
    linkedIn: "LinkedIn",
    x: "X",
    email: "Email",
    copy: "Copy link",
    copied: "Link copied",
  },
  contactModal: {
    dialogLabel: "Talk to our team",
    close: "Close",
    closeBackdrop: "Close dialog",
    badge: "Talk to our team",
    title: "Tell us what you’re trying to solve.",
    body: "A few details are enough to get the right people in the room. We read every message directly.",
    assurances: [
      { id: "discovery", title: "30-minute technical discovery", text: "No pitch deck, just direct engineering dialogue." },
      { id: "response", title: "Reply within 1 business day", text: "Read directly by our senior team." },
      { id: "privacy", title: "Strict confidentiality", text: "Your details stay with us. Nothing shared, nothing sold." },
    ],
    footerLeft: "DHIRA tech squad",
    footerRight: "NY · HYD · BLR",
  },
  /* Placeholders are neutral examples, never a real person's details. */
  contactForm: {
    name: { label: "Full name", placeholder: "Your name" },
    email: { label: "Work email", placeholder: "name@organisation.com" },
    company: { label: "Company", placeholder: "Your organisation" },
    interest: {
      label: "I’m interested in",
      placeholder: "Select one",
      options: ["Platform deployment", "Product build", "Advisory", "Just exploring"],
    },
    message: { label: "What are you trying to solve?", placeholder: "Tell us about your data challenge, project goals, or questions..." },
    submit: "Send message",
    submitting: "Sending message…",
    consent: {
      before: "By sending this you agree we may contact you about your enquiry. See our",
      link: { label: "privacy policy", href: "/privacy" },
      after: ".",
    },
    sentTitle: "Your message is sent",
    sentBody: "It’s with our team now. Expect a reply within one business day from a real engineer who read it.",
    sendAnother: "Send another message",
    close: "Close",
  },
  subscribe: {
    label: "Work email",
    placeholder: "name@organisation.com",
    submit: "Subscribe",
    thanks: "Thank you. Look for a confirmation email at",
  },
};
