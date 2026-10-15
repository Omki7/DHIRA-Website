import type { Block } from "./richText";
import { SITE } from "./site";

/* ------------------------------------------------------------------ */
/*  Legal and policy pages (added 15 Oct 2026)                         */
/* ------------------------------------------------------------------ */
/* The founder's footer lists privacy, terms, accessibility, copyright and
   hyperlinking policies and a sitemap (GIGW 3.0 asks a site to carry them).
   They replace the footer's dead #privacy / #terms anchors.

   DRAFT FOR LEGAL REVIEW. Written to the DPDP Act 2023 and DPDP Rules 2025
   (most duties apply from 13 May 2027; Rule 9 asks for a published privacy
   contact), the GDPR where EU visitors are concerned, the Companies
   (Incorporation) Rules 2014 Rule 26, and GIGW 3.0. Facts about the site
   are true today: it stores one appearance preference and one region
   choice in local storage, sets no advertising cookies, and the forms are
   wired to the team's inbox at hand-off. The governing-law clause, the
   retention periods and the named grievance officer need counsel and the
   founder. Customer data in Akashic is governed by the customer agreement
   and DPA, not by these pages. */

export type LegalDoc = {
  slug: string;
  title: string;
  /** Short title for lists and the footer. */
  short: string;
  summary: string;
  /** ISO date. */
  updated: string;
  blocks: Block[];
};

const contact = `[${SITE.email}](mailto:${SITE.email}?subject=Privacy)`;

export const PRIVACY: LegalDoc = {
  slug: "privacy",
  title: "Privacy policy",
  short: "Privacy",
  summary: "What personal data this website collects, why, how long we keep it, and the rights you have over it.",
  updated: "2026-10-15",
  blocks: [
    { type: "h2", id: "who-we-are", text: "Who we are" },
    {
      type: "p",
      text: `This website is operated by ${SITE.legalName} ("DHIRA", "we", "us"). For the personal data described here we are the data fiduciary under India's Digital Personal Data Protection Act 2023, and the controller under the EU General Data Protection Regulation where it applies.`,
    },
    {
      type: "p",
      text: "This policy covers the website and the enquiries you send through it. When an organisation uses Akashic, the personal data it puts into the platform is processed under that organisation's agreement with us and our data processing agreement, not under this policy.",
    },
    { type: "h2", id: "what-we-collect", text: "What we collect" },
    {
      type: "ul",
      items: [
        "Details you send us: your name, work email, organisation, area of interest and message, when you use a contact or enquiry form.",
        "Your email address, if you subscribe to Insights or event invitations.",
        "Technical data your browser sends with every request, such as IP address, browser type and the pages requested, kept in server logs for security.",
        "Two preferences stored in your own browser: your light or dark appearance, and the region you choose. These stay on your device.",
      ],
    },
    { type: "h2", id: "why-we-use-it", text: "Why we use it" },
    {
      type: "ul",
      items: [
        "To reply to your enquiry and arrange the conversation you asked for. The basis is your consent, given when you send the form, and our legitimate interest in answering it.",
        "To send the updates you subscribed to, until you unsubscribe. The basis is your consent.",
        "To keep the website secure and working. The basis is our legitimate interest in protecting the service.",
        "To meet legal obligations, such as responding to lawful requests from authorities.",
      ],
    },
    { type: "p", text: "We do not sell personal data, and we do not use it to train AI models." },
    { type: "h2", id: "who-we-share-it-with", text: "Who we share it with" },
    {
      type: "p",
      text: "Service providers who host the website, deliver email and manage our enquiries process personal data on our instructions, under contracts that require them to protect it. We disclose personal data to authorities only when the law requires it.",
    },
    { type: "h2", id: "where-it-is-processed", text: "Where it is processed" },
    {
      type: "p",
      text: "We work from India and the United States, so your data may be processed in either country. Where data leaves the country it was collected in, we rely on the safeguards the applicable law provides, such as contractual protections.",
    },
    { type: "h2", id: "how-long-we-keep-it", text: "How long we keep it" },
    {
      type: "p",
      text: "Enquiries are kept for as long as we need them to respond and follow up, and then deleted or anonymised. Subscriptions last until you unsubscribe. Security logs are kept for a limited period and then deleted.",
    },
    { type: "h2", id: "your-rights", text: "Your rights" },
    {
      type: "p",
      text: "You may ask us to tell you what personal data we hold about you, to correct or complete it, and to erase it. You may withdraw consent at any time, which does not affect processing already done. Under the DPDP Act you may also nominate another person to exercise your rights, and you may raise a grievance with us and then with the Data Protection Board of India. Where the GDPR applies you may also object to or restrict processing, ask for your data in a portable form, and complain to your supervisory authority.",
    },
    { type: "p", text: `To exercise any right, write to ${contact}. We will confirm who you are before acting on a request.` },
    { type: "h2", id: "children", text: "Children" },
    { type: "p", text: "This website is for organisations and their people. It is not directed at children, and we do not knowingly collect children's personal data." },
    { type: "h2", id: "security", text: "Security" },
    {
      type: "p",
      text: "We protect personal data with encryption in transit, access control and monitoring. Our wider security practice is described in the [Trust Center](/trust).",
    },
    { type: "h2", id: "cookies", text: "Cookies and local storage" },
    { type: "p", text: "How the site uses cookies and browser storage is set out in the [cookie policy](/cookies)." },
    { type: "h2", id: "changes", text: "Changes to this policy" },
    { type: "p", text: "When this policy changes, the new version is published here with its date. Material changes are highlighted on the page." },
    { type: "h2", id: "contact", text: "Contact and grievances" },
    {
      type: "p",
      text: `Questions, requests and grievances about personal data go to ${contact}. We acknowledge every request and reply within the period the law sets.`,
    },
  ],
};

export const TERMS: LegalDoc = {
  slug: "terms",
  title: "Terms of use",
  short: "Terms",
  summary: "The terms on which you may use this website. Use of Akashic itself is governed by your agreement with DHIRA.",
  updated: "2026-10-15",
  blocks: [
    { type: "h2", id: "acceptance", text: "Acceptance" },
    {
      type: "p",
      text: `This website is operated by ${SITE.legalName}. By using it you agree to these terms. If you do not agree, please do not use the site.`,
    },
    { type: "h2", id: "using-the-site", text: "Using the site" },
    {
      type: "p",
      text: "You may browse, read and share the site's pages for your own information and your organisation's evaluation of DHIRA and Akashic. You may not:",
    },
    {
      type: "ul",
      items: [
        "attempt to gain unauthorised access to the site or the systems behind it;",
        "interfere with the site's operation, including by automated requests at a volume that degrades it;",
        "copy the site's content into another product or service, or present it as your own;",
        "use the site for any unlawful purpose.",
      ],
    },
    { type: "p", text: "Security research done in good faith under our [vulnerability disclosure policy](/trust#disclosure) is welcome." },
    { type: "h2", id: "intellectual-property", text: "Intellectual property" },
    {
      type: "p",
      text: "The site's text, design, drawings, product illustrations, logos and the names DHIRA and Akashic belong to DHIRA or its licensors. The [website policies](/legal) explain how you may reproduce content and use the marks.",
    },
    { type: "h2", id: "information-on-the-site", text: "Information on the site" },
    {
      type: "p",
      text: "We work to keep the site accurate, but it is provided for general information. It is not an offer, and product descriptions, illustrations and plans may change. Product screens shown on the site are illustrations with sample data. Features marked Preview are not generally available. The terms of any purchase are those of the agreement you sign with us.",
    },
    { type: "h2", id: "links", text: "Links to other sites" },
    {
      type: "p",
      text: "The site links to sites we do not control. We are not responsible for their content or their privacy practices. Linking to this site is covered by the [hyperlinking policy](/legal#hyperlinking).",
    },
    { type: "h2", id: "what-you-send-us", text: "What you send us" },
    {
      type: "p",
      text: "Please do not send confidential information through the site's forms before an agreement covers it. How we handle what you send is set out in the [privacy policy](/privacy).",
    },
    { type: "h2", id: "liability", text: "Liability" },
    {
      type: "p",
      text: "To the extent the law allows, the site is provided as is, and DHIRA is not liable for loss arising from its use or from reliance on its content. Nothing in these terms limits liability that cannot be limited by law.",
    },
    { type: "h2", id: "governing-law", text: "Governing law" },
    { type: "p", text: "These terms are governed by the laws of India. The courts at Hyderabad, Telangana have jurisdiction over any dispute about them." },
    { type: "h2", id: "changes", text: "Changes" },
    { type: "p", text: "We may update these terms. The version on this page, with its date, is the one that applies." },
    { type: "h2", id: "contact", text: "Contact" },
    { type: "p", text: `Questions about these terms go to [${SITE.email}](mailto:${SITE.email}?subject=Terms%20of%20use).` },
  ],
};

export const COOKIES: LegalDoc = {
  slug: "cookies",
  title: "Cookie policy",
  short: "Cookies",
  summary: "What this website stores in your browser, why, and how to control it.",
  updated: "2026-10-15",
  blocks: [
    { type: "h2", id: "what-we-store", text: "What we store today" },
    {
      type: "p",
      text: "The site sets no advertising cookies and no cross-site tracking. It keeps two preferences in your browser's local storage, on your device only:",
    },
    {
      type: "ul",
      items: [
        "Appearance: whether you chose the light or dark appearance, so pages open the way you left them.",
        "Region: whether you chose the international or the India version of pages that have both.",
      ],
    },
    { type: "p", text: "Neither preference is sent to us, and neither identifies you." },
    { type: "h2", id: "categories", text: "Categories we may use" },
    {
      type: "ol",
      items: [
        "Strictly necessary: storage the site needs to work, such as the preferences above and security protections. Always on.",
        "Measurement: privacy-first analytics that count visits and pages so we can improve the site. Off unless you agree.",
        "Marketing: storage used to measure campaigns. Not used today. If we ever add it, it will be off unless you agree.",
      ],
    },
    {
      type: "note",
      label: "Before any optional category is switched on",
      text: "We will ask first, with a banner that makes declining as easy as accepting, and a Cookie preferences link in the footer to change your choice at any time.",
    },
    { type: "h2", id: "managing", text: "Managing storage" },
    {
      type: "p",
      text: "You can clear local storage and cookies from your browser's settings at any time. The site works without them; it will simply open in the light appearance and the international version.",
    },
    { type: "h2", id: "contact", text: "Contact" },
    { type: "p", text: `Questions go to ${contact}. See also the [privacy policy](/privacy).` },
  ],
};

export const ACCESSIBILITY: LegalDoc = {
  slug: "accessibility",
  title: "Accessibility statement",
  short: "Accessibility",
  summary: "Our commitment to an accessible website, what we have done, the limits we know about, and how to tell us about a barrier.",
  updated: "2026-10-15",
  blocks: [
    { type: "h2", id: "commitment", text: "Our commitment" },
    {
      type: "p",
      text: "We want everyone to be able to use this website, including people who use a screen reader, a keyboard, magnification or voice control. We design to the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, and to the Guidelines for Indian Government Websites and Apps (GIGW) 3.0.",
    },
    { type: "h2", id: "what-we-do", text: "What we do" },
    {
      type: "ul",
      items: [
        "Every page can be used with a keyboard, with a visible focus ring and a link to skip straight to the main content.",
        "Animation respects your system's reduced-motion setting: figures appear in their final state and nothing moves on its own.",
        "Text and interface colours meet the AA contrast ratios, checked against our design tokens.",
        "Pages use headings, landmarks and labels, so screen readers can navigate them.",
        "Images carry text alternatives; decorative drawings are hidden from assistive technology.",
        "Text can be enlarged to 200 per cent with browser zoom without loss of content.",
      ],
    },
    { type: "h2", id: "known-limits", text: "Known limits" },
    {
      type: "ul",
      items: [
        "Some product illustrations are detailed simulated screens. Their point is always stated in the text beside them, which is the version to rely on.",
        "A few interactive figures are easiest with a pointer. Each has a keyboard equivalent or a complete static alternative.",
        "Documents we share on request, such as PDFs, may not yet meet the same standard. Ask and we will provide an accessible version.",
      ],
    },
    { type: "h2", id: "tell-us", text: "Tell us about a barrier" },
    {
      type: "p",
      text: `If something on the site does not work for you, write to [${SITE.email}](mailto:${SITE.email}?subject=Accessibility) with the page and what happened. We read every report, reply, and fix what we can.`,
    },
    { type: "h2", id: "how-we-check", text: "How we check" },
    {
      type: "p",
      text: "We review new pages with automated checks, keyboard-only use and screen readers (NVDA on Windows, VoiceOver on macOS and iOS) in current versions of Chrome, Edge, Firefox and Safari. This statement was prepared on the date above and is reviewed as the site changes.",
    },
  ],
};

export const WEBSITE_POLICIES: LegalDoc = {
  slug: "legal",
  title: "Website policies",
  short: "Website policies",
  summary: "Copyright, hyperlinking, trademarks and disclaimer, in one place, with every legal document this site carries.",
  updated: "2026-10-15",
  blocks: [
    { type: "h2", id: "copyright", text: "Copyright policy" },
    {
      type: "p",
      text: `The content on this website is © ${SITE.legalName} unless stated otherwise. You may quote or reproduce short extracts with attribution to DHIRA and a link to the page. You may not reproduce content in a misleading context, or use drawings, product illustrations or photographs without permission. For permissions, write to [${SITE.email}](mailto:${SITE.email}?subject=Copyright%20permission).`,
    },
    { type: "h2", id: "hyperlinking", text: "Hyperlinking policy" },
    {
      type: "p",
      text: "You may link to any page of this site without asking. Please do not frame our pages inside another site, and do not imply an endorsement or partnership that does not exist. Links from this site to others are provided for convenience; we do not endorse their content and are not responsible for it.",
    },
    { type: "h2", id: "trademarks", text: "Trademarks" },
    {
      type: "p",
      text: "DHIRA and Akashic, and their marks, belong to DHIRA. DHIRA is the company and Akashic is the platform: please keep the two distinct. Logo files and usage notes are in the [media kit](/newsroom#media-kit). Other names and marks belong to their owners.",
    },
    { type: "h2", id: "disclaimer", text: "Disclaimer" },
    {
      type: "p",
      text: "Information on this site is general and may change. Product screens are illustrations with sample data. Features marked Preview are not generally available. Customer programmes are described by sector and are not named. The full terms are in the [terms of use](/terms).",
    },
    { type: "h2", id: "documents", text: "All legal documents" },
    {
      type: "ul",
      items: [
        "[Privacy policy](/privacy)",
        "[Terms of use](/terms)",
        "[Cookie policy](/cookies)",
        "[Accessibility statement](/accessibility)",
        "[Trust Center: security, subprocessors and vulnerability disclosure](/trust)",
        "[Site map](/site-map)",
      ],
    },
    { type: "h2", id: "help", text: "Help" },
    {
      type: "p",
      text: "Looking for something? The [site map](/site-map) lists every page. For anything else, the [contact page](/contact) routes you to the right team.",
    },
  ],
};

export const LEGAL_DOCS: LegalDoc[] = [PRIVACY, TERMS, COOKIES, ACCESSIBILITY, WEBSITE_POLICIES];
