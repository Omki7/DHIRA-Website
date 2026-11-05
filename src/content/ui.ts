/* ------------------------------------------------------------------ */
/*  Interface microcopy                                                */
/* ------------------------------------------------------------------ */
/* Every short string the site chrome speaks: accessible names, control
   labels, status messages and the contact and subscribe forms. Delivered
   once per page by the root layout through components/providers/UiProvider,
   so any client component reads it with useUi(). In a CMS this is a
   singleton "Interface strings" document; it is also the file a translation
   would start from. */

import type { Region } from "@/shared/utils/region";

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
    /** Accessible name for a header menu's chevron; the menu label follows. */
    menuFor: string;
  };
  footer: {
    rights: string;
    policies: string;
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
  /** ui/MotionToggle: the pause control for content that moves by itself.
      `headline` and `tour` complete its accessible name ("Pause the rotating headline"). */
  motion: { pause: string; play: string; headline: string; tour: string; stories: string };
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
    assurances: ContactAssurance[];
    footerLeft: string;
    footerRight: string;
    /** In place of the ask above while the form is a job application. */
    application: { dialogLabel: string; badge: string; title: string; body: string; assurances: ContactAssurance[] };
  };
  contactForm: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    /** `options` in the order they show. `careers` is the one of them that
        makes the form a job application; it shows only to visitors in India,
        like every other way into careers. */
    interest: {
      label: string;
      placeholder: string;
      options: string[];
      careers: string;
    };
    message: { label: string; placeholder: string };
    /** In place of the business wording while the interest is `careers`. */
    application: {
      email: { label: string; placeholder: string };
      company: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
      /** The optional resume attachment. `hint` stands in for a file name. */
      resume: { label: string; choose: string; change: string; hint: string; remove: string };
      submit: string;
      submitting: string;
      consentBefore: string;
      sentTitle: string;
      sentBody: string;
      errors: { message: string; resume: string };
    };
    submit: string;
    submitting: string;
    consent: { before: string; link: { label: string; href: string }; after: string };
    sentTitle: string;
    sentBody: string;
    sendAnother: string;
    close: string;
    /** One line under each field it belongs to; `failed` under the button. */
    errors: { name: string; email: string; company: string; interest: string; message: string; failed: string };
  };
  /** The footer's business email sign-up (layout/FooterSubscribe). Its
      `submitting` and `errors` are shared by every sign-up form. */
  subscribe: SubscribeCopy & {
    heading: string;
    lede: string;
    submitting: string;
    errors: { invalid: string; personal: string; failed: string };
  };
  /** Accessible name before an assistant's name: "Ask ChatGPT about DHIRA". */
  askAssistant: { before: string; after: string };
  /** app/error.tsx: shown when a page fails while rendering. */
  error: { label: string; setup: string; payoff: string; lede: string; retry: string; home: { label: string; href: string } };
}

/** One line of the contact dialog's ask. `id` picks the icon. */
export interface ContactAssurance {
  id: "discovery" | "response" | "privacy";
  title: string;
  text: string;
}

/** One sign-up form's own words (features/newsletter SubscribeForm): the
    footer's here, the /insights one in content/pages/insights.ts. */
export interface SubscribeCopy {
  label: string;
  placeholder: string;
  submit: string;
  /** Shown in place of the form; the address follows. */
  done: string;
  consent: { before: string; link: { label: string; href: string }; after: string };
}

/* The contact form's careers option: listed in its `options` and named as
   `careers`, written once so the two cannot differ. */
const JOINING_DHIRA = "Joining DHIRA";

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
    menuFor: "Menu for",
  },
  footer: {
    rights: "All rights reserved.",
    policies: "Website policies",
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
    /* Empty since 21 Oct 2026: pricing is USD only (user), so no page has
       an India version yet. */
    offers: {},
  },
  preview: "Preview",
  opensInNewTab: "(opens in a new tab)",
  carousel: { roleDescription: "carousel", previous: "Previous", next: "Next", show: "Show" },
  motion: { pause: "Pause", play: "Play", headline: "the rotating headline", tour: "the module tour", stories: "the stories" },
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
    /* 5 Nov 2026 (user: the Apply buttons opened a business form with no
       option for candidates). Every promise here is already on /careers. */
    application: {
      dialogLabel: "Apply to DHIRA",
      badge: "Join the team",
      title: "Tell us what you’ve built.",
      body: "Share shipped work and the role you want. Every candidate gets an answer.",
      assurances: [
        { id: "discovery", title: "Intro call with your future team", text: "Thirty minutes. You interview us too." },
        { id: "response", title: "A clear yes or no", text: "With reasons. No puzzles, no ghosting." },
        { id: "privacy", title: "Strict confidentiality", text: "Your details stay with us. Nothing shared, nothing sold." },
      ],
    },
  },
  /* Placeholders are neutral examples, never a real person's details. */
  contactForm: {
    name: { label: "Full name", placeholder: "Your name" },
    email: { label: "Work email", placeholder: "name@organisation.com" },
    company: { label: "Company", placeholder: "Your organisation" },
    /* 5 Nov 2026 (user): Partnership and "Something else" for anything the
       site does not list; one "Joining DHIRA" for candidates, not the open
       roles one by one, so the form never depends on the roles board. */
    interest: {
      label: "I’m interested in",
      placeholder: "Select one",
      options: ["Platform deployment", "Product build", "Advisory", "Partnership", "Just exploring", JOINING_DHIRA, "Something else"],
      careers: JOINING_DHIRA,
    },
    message: { label: "What are you trying to solve?", placeholder: "Tell us about your data challenge, project goals or questions..." },
    application: {
      email: { label: "Email", placeholder: "you@example.com" },
      company: { label: "Company or college", placeholder: "Optional" },
      message: { label: "What have you built?", placeholder: "The role you want, and links to shipped work, GitHub or LinkedIn." },
      resume: { label: "Resume (optional)", choose: "Attach resume", change: "Change", hint: "PDF or Word, up to 4 MB", remove: "Remove" },
      submit: "Send application",
      submitting: "Sending application…",
      consentBefore: "By sending this you agree we may contact you about your application. See our",
      sentTitle: "Your application is sent",
      sentBody: "It’s with the hiring team now. Every candidate gets an answer: a clear yes or no, with reasons.",
      errors: { message: "Please tell us what you’ve built.", resume: "Attach a PDF or Word file of 4 MB or less." },
    },
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
    errors: {
      name: "Please enter your name.",
      email: "Enter a valid email address.",
      company: "Please enter your company.",
      interest: "Please choose one of the options.",
      message: "Please tell us what you’re trying to solve.",
      failed: "We couldn’t send your message just now. Please try again, or write to info@dhira.ai.",
    },
  },
  /* No newsletter yet (2 Nov 2026, user): the copy promises news, not a
     schedule, and no confirmation email is sent. */
  subscribe: {
    heading: "Stay in touch",
    lede: "Get the latest from DHIRA.",
    label: "Business email",
    /* The field's only visible label: the footer has no room for one above. */
    placeholder: "Business email",
    submit: "Subscribe",
    submitting: "Subscribing…",
    done: "Thank you. We’ll keep you posted at",
    errors: {
      invalid: "Enter a valid email address.",
      personal: "Please use your business email address.",
      failed: "We couldn’t sign you up just now. Please try again, or write to info@dhira.ai.",
    },
    consent: {
      before: "We’ll only email you news from DHIRA. See our",
      link: { label: "privacy policy", href: "/privacy" },
      after: ".",
    },
  },
  askAssistant: { before: "Ask", after: "about DHIRA" },
  error: {
    label: "Error",
    setup: "Something went wrong.",
    payoff: "This page did not load.",
    lede: "Try again, or go back to the home page.",
    retry: "Try again",
    home: { label: "Go to the home page", href: "/" },
  },
};
