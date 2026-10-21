/* ------------------------------------------------------------------ */
/*  Trust Center (added 15 Oct 2026)                                   */
/* ------------------------------------------------------------------ */
/* What a security reviewer looks for first, on one page: controls by domain,
   privacy commitments, AI governance, frameworks, documents on request,
   subprocessors and how to report a vulnerability. Modelled on the trust
   centres of Palantir, Databricks, Reltio, Glean and Sarvam (12 of 26
   reference sites link one, measured 15 Oct 2026). Composer:
   app/trust/page.tsx; sections: components/sections/trust/TrustSections.tsx.

   Kept from existing claims: the founder's eight controls, the /akashic
   security panel ("not used to train models", permissions that follow the
   person, residency you control), the homepage governance tiles
   (append-only audit, in-region), the deployment lines, the Ask Akashic
   model providers.
   DRAFT: the frameworks list repeats the homepage [07] set and its status
   wording, the document list, the AI-guidance mapping and the
   subprocessor scope all need the founder's and security lead's
   confirmation. Executives supply the final certification content. */

import type { PageCloseBlock } from "../blocks";
import { mailto } from "../site";
import type { Cta, Faq, Link, PageSection, Seo } from "../types";

/** The `[NN]  LABEL` eyebrow and two-tone title every Trust section opens with. */
export interface TrustSectionHead {
  num: string;
  label: string;
  setup: string;
  payoff: string;
}

/** A titled line in a numbered register (privacy commitments, AI principles). */
export interface TrustPoint {
  title: string;
  text: string;
}

export interface TrustDocument {
  name: string;
  note: string;
  /** Shared under a mutual NDA. */
  nda?: boolean;
  /** Where "Request" goes: a mailto with the document in the subject. */
  href: string;
}

export interface TrustPage {
  seo: Seo;
  sections: PageSection[];
  sectionsLabel: string;
  hero: { label: string; setup: string; payoff: string; lede: string };
  security: TrustSectionHead & { lede: string; domains: { name: string; items: string[] }[] };
  privacy: TrustSectionHead & { policy: Link; commitments: TrustPoint[] };
  responsibleAi: TrustSectionHead & { lede: string; principles: TrustPoint[]; frameworksLabel: string; frameworks: string[] };
  compliance: TrustSectionHead & { frameworks: { name: string; scope: string }[]; evidence: Link };
  documents: TrustSectionHead & { lede: string; ndaLabel: string; requestLabel: string; items: TrustDocument[] };
  subprocessors: TrustSectionHead & {
    lede: string;
    columns: { name: string; purpose: string; scope: string };
    rows: { name: string; purpose: string; scope: string }[];
  };
  disclosure: TrustSectionHead & {
    cta: Cta;
    steps: string[];
    harbourLabel: string;
    harbour: string;
    machineReadable: { lead: string; link: Link };
  };
  faq: TrustSectionHead & { items: Faq[] };
  close: PageCloseBlock;
}

const documents: Omit<TrustDocument, "href">[] = [
  { name: "Security whitepaper", note: "Architecture, controls and operations" },
  { name: "Penetration test summary", note: "Latest independent test, findings and fixes", nda: true },
  { name: "SOC 2 Type II report", note: "Auditor's report", nda: true },
  { name: "ISO 27001 certificate", note: "Scope and validity" },
  { name: "Data processing agreement", note: "Standard DPA for customer data" },
  { name: "Standard questionnaires", note: "CAIQ and SIG Lite, completed" },
  { name: "Business continuity summary", note: "Backups, recovery and resilience" },
  { name: "Accessibility conformance report", note: "WCAG 2.2 AA and GIGW 3.0" },
];

export const trustPage: TrustPage = {
  seo: {
    title: "Trust Center",
    description:
      "Security, privacy and AI you can audit. How DHIRA protects your data and how Akashic governs every answer: the controls, the commitments, the documents a security review asks for, and who to contact.",
    path: "/trust",
  },
  sections: [
    { id: "hero", label: "Trust Center" },
    { id: "security", label: "Security" },
    { id: "privacy", label: "Privacy" },
    { id: "responsible-ai", label: "Responsible AI" },
    { id: "compliance", label: "Compliance" },
    { id: "documents", label: "Documents" },
    { id: "subprocessors", label: "Subprocessors" },
    { id: "disclosure", label: "Report a vulnerability" },
    { id: "faq", label: "Questions" },
    { id: "talk-to-our-team", label: "Security review" },
  ],
  sectionsLabel: "Trust Center sections",
  hero: {
    label: "Trust Center",
    setup: "Trust Center.",
    payoff: "Security, privacy and AI you can audit.",
    lede: "How DHIRA protects your data and how Akashic governs every answer: the controls, the commitments, the documents a security review asks for, and who to contact.",
  },
  security: {
    num: "01",
    label: "Security",
    setup: "Controls in every plan.",
    payoff: "Grouped the way auditors ask.",
    lede: "The same controls run in SaaS, in your cloud and on-premise. None is an add-on.",
    domains: [
      {
        name: "Identity and access",
        items: ["Single sign-on and MFA", "Fine-grained, role-based access", "Row and column rules at query time", "Permissions that follow the person to the answer"],
      },
      {
        name: "Data protection",
        items: ["Encryption in transit and at rest", "PII detection and masking", "Tenant isolation at the data, storage, identity and network levels", "Customer-managed keys in private deployments"],
      },
      {
        name: "Accountability",
        items: ["Column-level lineage on every figure", "Append-only audit log of every action", "Maker-checker approvals", "Model and prompt version on every agent action"],
      },
      {
        name: "Residency",
        items: ["Multi-tenant SaaS on AWS, isolated per tenant", "Your own AWS, Azure or GCP account", "On-premise on Docker and Kubernetes", "Storage, processing and inference in your region"],
      },
    ],
  },
  privacy: {
    num: "02",
    label: "Privacy",
    setup: "Your data stays yours.",
    payoff: "In use, at rest and when you leave.",
    policy: { label: "Read the privacy policy", href: "/privacy" },
    commitments: [
      { title: "Never used to train models", text: "Your data and queries are not used to train models, ours or a provider's." },
      { title: "Processed for your purposes only", text: "We process customer data only to provide the service you contracted, under a data processing agreement." },
      { title: "Open formats, always", text: "Tables, transforms and metric definitions export with tools your team already uses." },
      { title: "Deleted on request", text: "At the end of a contract your data is returned or deleted, on a schedule written into your agreement." },
    ],
  },
  responsibleAi: {
    num: "03",
    label: "Responsible AI",
    setup: "AI that shows its working.",
    payoff: "And leaves the decision with a person.",
    lede: "Six principles govern every AI feature in Akashic, from Ask Akashic to the agents in preview.",
    principles: [
      { title: "Grounded", text: "Answers come from your governed data and cite the records and pages behind them." },
      { title: "Governed", text: "AI sees only what the person asking may see. Permissions apply at query time." },
      { title: "Decided by people", text: "Agents gather evidence and explain. No agent approves, and none writes back to a source system." },
      { title: "Recorded", text: "Every run logs the evidence, the model and prompt versions, and who decided." },
      { title: "Vendor-neutral", text: "Each task runs on a named model: a commercial provider, your own key, or a model hosted inside your boundary." },
      { title: "Private", text: "Your data and prompts are never used to train models." },
    ],
    frameworksLabel: "Guidance we map our controls to",
    frameworks: [
      "India AI Governance Guidelines (MeitY, 2025)",
      "RBI FREE-AI framework, for financial services",
      "NIST AI Risk Management Framework",
      "EU AI Act, for deployments in the EU",
    ],
  },
  compliance: {
    num: "04",
    label: "Compliance",
    setup: "The frameworks we work to.",
    payoff: "With evidence on request.",
    frameworks: [
      { name: "DPDP Act", scope: "India data protection" },
      { name: "ISO 27001", scope: "Information security" },
      { name: "SOC 2 Type II", scope: "Trust and availability" },
      { name: "GDPR", scope: "EU data privacy" },
      { name: "CERT-In", scope: "Cyber security directions" },
    ],
    evidence: { label: "Evidence on request", href: "#documents" },
  },
  documents: {
    num: "05",
    label: "Documents",
    setup: "What a security review asks for.",
    payoff: "Ready before you ask.",
    lede: "Request any document below. Reports marked NDA are shared under a mutual non-disclosure agreement.",
    ndaLabel: "NDA",
    requestLabel: "Request",
    items: documents.map((document) => ({ ...document, href: mailto(`Trust document request: ${document.name}`) })),
  },
  subprocessors: {
    num: "06",
    label: "Subprocessors",
    setup: "Who touches customer data.",
    payoff: "Named, with their purpose.",
    lede: "Private cloud and on-premise deployments run in your own infrastructure, with no DHIRA subprocessor in the data path.",
    columns: { name: "Subprocessor", purpose: "Purpose", scope: "Applies to" },
    rows: [
      { name: "Amazon Web Services", purpose: "Infrastructure for multi-tenant SaaS", scope: "SaaS customers" },
      {
        name: "Model providers you enable",
        purpose: "Language model inference, for example Anthropic, OpenAI or Azure OpenAI, only when you choose them",
        scope: "Customers who enable them",
      },
    ],
  },
  disclosure: {
    num: "07",
    label: "Report a vulnerability",
    setup: "Found a security issue?",
    payoff: "Tell us first.",
    cta: { label: "Report a vulnerability", href: mailto("Security report") },
    steps: [
      "Email the details to our security team, with the subject line Security report.",
      "Include the affected URL or component, steps to reproduce and the impact you observed.",
      "Give us reasonable time to fix the issue before any public disclosure.",
      "We acknowledge every report, keep you informed and credit you if you wish.",
    ],
    harbourLabel: "Safe harbour",
    harbour:
      "Research done in good faith under this policy is authorised. We will not pursue legal action against researchers who avoid privacy violations, data destruction and service disruption.",
    machineReadable: { lead: "Machine-readable contact:", link: { label: "security.txt", href: "/.well-known/security.txt" } },
  },
  faq: {
    num: "08",
    label: "Questions",
    setup: "Security, plainly.",
    payoff: "The questions reviewers ask first.",
    items: [
      {
        question: "Where is our data stored?",
        answer:
          "Where you choose. Multi-tenant SaaS runs on AWS in your region. Private cloud runs in your own AWS, Azure or GCP account. On-premise runs in your data centre.",
      },
      {
        question: "Is our data used to train AI models?",
        answer: "No. Your data and queries are not used to train models, ours or a provider's.",
      },
      {
        question: "Can Akashic run inside our own network?",
        answer: "Yes. On-premise installs run on Docker and Kubernetes in your data centre, with models hosted inside your boundary.",
      },
      {
        question: "How do we start a security review?",
        answer: "Request the documents on this page or send your questionnaire. Our security team answers directly.",
      },
    ],
  },
  close: {
    label: "Security review",
    setup: "Running a security review?",
    payoff: "Send us the questionnaire.",
    body: "Ask for any document on this page, or send your own questionnaire. Our security team answers directly.",
    primary: { label: "Start a security review", href: mailto("Security review") },
    secondary: { label: "Read the privacy policy", href: "/privacy" },
  },
};
