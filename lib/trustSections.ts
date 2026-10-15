import type { PageSection } from "./pageSection";

/* ------------------------------------------------------------------ */
/*  /trust, the Trust Center (added 15 Oct 2026)                       */
/* ------------------------------------------------------------------ */
/* What a security reviewer looks for first, on one page: controls by domain,
   privacy commitments, AI governance, frameworks, documents on request,
   subprocessors and how to report a vulnerability. Modelled on the trust
   centres of Palantir, Databricks, Reltio, Glean and Sarvam (12 of 26
   reference sites link one, measured 15 Oct 2026).

   Kept from existing claims: the founder's eight controls, AKASHIC_SECURITY
   ("not used to train models", permissions that follow the person,
   residency you control), govTiles (append-only audit, in-region), the
   deployment lines, the Ask Akashic model providers.
   DRAFT: the frameworks list repeats the homepage [07] set and its status
   wording, the document list, the AI-guidance mapping and the
   subprocessor scope all need the founder's and security lead's
   confirmation. Executives supply the final certification content. */

export const TRUST_SECTIONS: PageSection[] = [
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
];

export const TRUST_HERO = {
  label: "Trust Center",
  setup: "Trust Center.",
  payoff: "Security, privacy and AI you can audit.",
  lede: "How DHIRA protects your data and how Akashic governs every answer: the controls, the commitments, the documents a security review asks for, and who to contact.",
};

export const TRUST_CONTROLS = {
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
};

export const TRUST_PRIVACY = {
  label: "Privacy",
  setup: "Your data stays yours.",
  payoff: "In use, at rest and when you leave.",
  commitments: [
    { title: "Never used to train models", text: "Your data and queries are not used to train models, ours or a provider's." },
    { title: "Processed for your purposes only", text: "We process customer data only to provide the service you contracted, under a data processing agreement." },
    { title: "Open formats, always", text: "Tables, transforms and metric definitions export with tools your team already uses." },
    { title: "Deleted on request", text: "At the end of a contract your data is returned or deleted, on a schedule written into your agreement." },
  ],
};

export const TRUST_AI = {
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
  frameworks: [
    "India AI Governance Guidelines (MeitY, 2025)",
    "RBI FREE-AI framework, for financial services",
    "NIST AI Risk Management Framework",
    "EU AI Act, for deployments in the EU",
  ],
};

export const TRUST_COMPLIANCE = {
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
};

export const TRUST_DOCUMENTS = {
  label: "Documents",
  setup: "What a security review asks for.",
  payoff: "Ready before you ask.",
  lede: "Request any document below. Reports marked NDA are shared under a mutual non-disclosure agreement.",
  items: [
    { name: "Security whitepaper", note: "Architecture, controls and operations" },
    { name: "Penetration test summary", note: "Latest independent test, findings and fixes", nda: true },
    { name: "SOC 2 Type II report", note: "Auditor's report", nda: true },
    { name: "ISO 27001 certificate", note: "Scope and validity" },
    { name: "Data processing agreement", note: "Standard DPA for customer data" },
    { name: "Standard questionnaires", note: "CAIQ and SIG Lite, completed" },
    { name: "Business continuity summary", note: "Backups, recovery and resilience" },
    { name: "Accessibility conformance report", note: "WCAG 2.2 AA and GIGW 3.0" },
  ],
};

export const TRUST_SUBPROCESSORS = {
  label: "Subprocessors",
  setup: "Who touches customer data.",
  payoff: "Named, with their purpose.",
  lede: "Private cloud and on-premise deployments run in your own infrastructure, with no DHIRA subprocessor in the data path.",
  rows: [
    { name: "Amazon Web Services", purpose: "Infrastructure for multi-tenant SaaS", scope: "SaaS customers" },
    { name: "Model providers you enable", purpose: "Language model inference, for example Anthropic, OpenAI or Azure OpenAI, only when you choose them", scope: "Customers who enable them" },
  ],
};

export const TRUST_DISCLOSURE = {
  label: "Report a vulnerability",
  setup: "Found a security issue?",
  payoff: "Tell us first.",
  steps: [
    "Email the details to our security team, with the subject line Security report.",
    "Include the affected URL or component, steps to reproduce and the impact you observed.",
    "Give us reasonable time to fix the issue before any public disclosure.",
    "We acknowledge every report, keep you informed and credit you if you wish.",
  ],
  harbour:
    "Research done in good faith under this policy is authorised. We will not pursue legal action against researchers who avoid privacy violations, data destruction and service disruption.",
};

export const TRUST_FAQ = {
  label: "Questions",
  setup: "Security, plainly.",
  payoff: "The questions reviewers ask first.",
  items: [
    {
      q: "Where is our data stored?",
      a: "Where you choose. Multi-tenant SaaS runs on AWS in your region. Private cloud runs in your own AWS, Azure or GCP account. On-premise runs in your data centre.",
    },
    {
      q: "Is our data used to train AI models?",
      a: "No. Your data and queries are not used to train models, ours or a provider's.",
    },
    {
      q: "Can Akashic run inside our own network?",
      a: "Yes. On-premise installs run on Docker and Kubernetes in your data centre, with models hosted inside your boundary.",
    },
    {
      q: "How do we start a security review?",
      a: "Request the documents on this page or send your questionnaire. Our security team answers directly.",
    },
  ],
};
