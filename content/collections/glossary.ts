/* ------------------------------------------------------------------ */
/*  Glossary terms (added 15 Oct 2026)                                 */
/* ------------------------------------------------------------------ */
/* The terms the site uses, defined once, in the site's own vocabulary
   (DESIGN_SYSTEM and the copy-voice rules): "knowledge layer", never graph;
   entity resolution, not golden records; agents are in preview and never
   approve. Each definition is general first, then one line on how Akashic
   does it, linked to where the site shows it. `id` is the term's anchor
   on /glossary (#entity-resolution), so other pages can link to it.
   DRAFT: definitions need product review. Read through getGlossary(). */

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  /** One line on how Akashic does it. */
  inAkashic?: string;
  /** Where the site shows it. */
  href?: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "ai-agent",
    term: "AI agent",
    definition: "Software that uses a language model to plan and carry out steps of a task, such as retrieving data, reading documents or checking citations.",
    inAkashic: "Agents are in preview. They gather evidence and explain; a person approves every consequential step.",
    href: "/akashic#agents",
  },
  {
    id: "append-only-audit-log",
    term: "Append-only audit log",
    definition: "A record of actions that can be added to but never edited or deleted, so the history of who did what stays intact.",
    inAkashic: "Always on, under every module.",
    href: "/trust#security",
  },
  {
    id: "change-data-capture",
    term: "Change data capture (CDC)",
    definition: "Reading inserts, updates and deletes from a source database as they happen, instead of copying whole tables on a schedule.",
    inAkashic: "One of three ingestion modes in Akashic Pipelines, beside streaming and batch.",
    href: "/integrations",
  },
  {
    id: "citation",
    term: "Citation",
    definition: "A pointer from an answer to the records, documents or pages it was drawn from, so anyone can check it.",
    inAkashic: "Ask Akashic cites its sources on every answer.",
    href: "/akashic#ask-ai",
  },
  {
    id: "column-level-lineage",
    term: "Column-level lineage",
    definition: "The trail from a figure back through every transformation to the source columns it came from.",
    inAkashic: "Recorded automatically, across every layer.",
    href: "/akashic#governance",
  },
  {
    id: "data-contract",
    term: "Data contract",
    definition: "An agreed, versioned description of the shape and quality of the data a source will deliver, checked when the data arrives.",
    inAkashic: "Versioned in Akashic Pipelines; failures are quarantined, retried and backfilled.",
    href: "/akashic#data-pipelines",
  },
  {
    id: "data-residency",
    term: "Data residency",
    definition: "Keeping data storage, processing and AI inference inside a chosen country or boundary.",
    inAkashic: "SaaS in your region, your own cloud account, or on-premise.",
    href: "/trust#security",
  },
  {
    id: "data-steward",
    term: "Data steward",
    definition: "The person accountable for the quality of a set of records, who reviews proposed matches and merges.",
    inAkashic: "Stewards approve matches in the Master Data review queue.",
    href: "/akashic#master-data",
  },
  {
    id: "document-intelligence",
    term: "Document intelligence",
    definition: "Reading contracts, certificates, reports and scanned forms, extracting their facts and linking them to the entities they mention.",
    inAkashic: "PDF, Office, email and scanned intake, with page-level citations.",
    href: "/integrations#documents",
  },
  {
    id: "entity-resolution",
    term: "Entity resolution",
    definition: "Recognising that records in different systems describe the same customer, supplier, asset or person, and resolving them into one record with the lineage of what was merged.",
    inAkashic: "Exact and fuzzy matching with survivorship rules in Akashic Master Data.",
    href: "/akashic#master-data",
  },
  {
    id: "governed-metric",
    term: "Governed metric",
    definition: "A metric defined once, with its calculation and choices written down, and served the same way to every dashboard, model and answer.",
    inAkashic: "Defined in the semantic layer of Akashic Warehouse.",
    href: "/akashic#data-warehousing",
  },
  {
    id: "grounding",
    term: "Grounding",
    definition: "Making an AI answer draw on specific, governed sources rather than on what a model remembers, so the answer can cite them.",
    inAkashic: "Ask Akashic grounds every answer in the governed foundation.",
    href: "/akashic#ask-ai",
  },
  {
    id: "knowledge-layer",
    term: "Knowledge layer",
    definition: "The governed layer that holds an organisation's entities, the relationships between them and the meaning of its terms, for people and AI to reason over.",
    inAkashic: "Built from Master Data's resolved entities and governed by Akashic Governance.",
    href: "/insights/what-is-a-knowledge-layer",
  },
  {
    id: "maker-checker",
    term: "Maker-checker",
    definition: "A control in which one person prepares an action and a second person approves it before it takes effect.",
    inAkashic: "Available in every plan.",
    href: "/pricing#included",
  },
  {
    id: "bring-your-own-model",
    term: "Bring your own model",
    definition: "Running each AI task on a model you choose: a commercial provider with your own key, an open model, or one hosted inside your boundary.",
    inAkashic: "Ask Akashic works with the model providers you enable.",
    href: "/integrations#models",
  },
  {
    id: "pii-masking",
    term: "PII masking",
    definition: "Detecting personal data such as names, identity numbers and addresses, and hiding it from the people and answers not permitted to see it.",
    inAkashic: "Detected on arrival, masked in answers.",
    href: "/trust#security",
  },
  {
    id: "row-and-column-security",
    term: "Row and column security",
    definition: "Access rules that limit which rows and columns of a table a person may see, applied at the moment the query runs.",
    inAkashic: "Permissions follow the person from the records to the answer.",
    href: "/trust#security",
  },
  {
    id: "semantic-layer",
    term: "Semantic layer",
    definition: "Shared definitions of metrics and business terms, so that active customer or margin means the same thing everywhere.",
    inAkashic: "Part of Akashic Warehouse, read by BI, ML and Ask Akashic.",
    href: "/akashic#data-warehousing",
  },
  {
    id: "sovereign-ai",
    term: "Sovereign AI",
    definition: "AI that runs on models and infrastructure inside a country's or organisation's own boundary, under its own control.",
    inAkashic: "Models hosted inside your boundary in on-premise and private cloud deployments.",
    href: "/pricing#deployment",
  },
  {
    id: "tenant-isolation",
    term: "Tenant isolation",
    definition: "Keeping each customer's data, storage, identity and network separate inside a shared service.",
    inAkashic: "Multi-tenant SaaS isolates every tenant at all four levels.",
    href: "/trust#security",
  },
  {
    id: "text-to-sql",
    term: "Text to SQL",
    definition: "Turning a plain-language question into a database query.",
    inAkashic: "Ask Akashic shows the answer with its sources alongside.",
    href: "/akashic#ask-ai",
  },
];
