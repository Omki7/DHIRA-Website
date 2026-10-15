import type { Block } from "./richText";

/* ------------------------------------------------------------------ */
/*  /insights (added 15 Oct 2026)                                      */
/* ------------------------------------------------------------------ */
/* The founder's IA has Insights under Company; it left the nav on 14 Oct
   2026 only because it had no content. These six articles give the hub and
   the article template real material.

   DRAFT: every article is drafted from claims the site already makes
   (homepage [01] and [03], /akashic [04], [05], [08] and [10],
   ProvenStories' sourced figures, the founder's GA date) and needs review.
   Bylines are teams, never a named executive: no person is quoted saying
   something they did not write. Swap in named authors when they write or
   approve their own pieces. Dates are draft publishing dates.

   Claims rules carried in: "knowledge layer", never graph; entity
   resolution, not golden records; agents are in preview and never sign off
   or write back; public programmes are never named, and only the figures
   ProvenStories already sources are used. */

export type InsightCategory = "Perspectives" | "Product" | "Public sector";

export type Insight = {
  slug: string;
  title: string;
  dek: string;
  category: InsightCategory;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  author: { name: string; role: string };
  blocks: Block[];
};

export const INSIGHTS_HERO = {
  label: "Insights",
  setup: "Insights.",
  payoff: "How governed data becomes decisions.",
  lede: "Perspectives from the team building Akashic and delivering it at national scale: data made ready for AI, agents people can trust, and what it takes to run both.",
};

export const INSIGHTS_SUBSCRIBE = {
  label: "Subscribe",
  setup: "New insights, by email.",
  payoff: "One note when something ships.",
  lede: "Articles, product releases and event invitations. No more than one email a month.",
};

const PRODUCT_TEAM = { name: "Akashic product team", role: "DHIRA" };
const PUBLIC_TEAM = { name: "Public sector team", role: "DHIRA" };
const ADVISORY_TEAM = { name: "Strategic Advisory", role: "DHIRA" };

export const INSIGHTS: Insight[] = [
  {
    slug: "akashic-1-0-generally-available",
    title: "Akashic 1.0: what is generally available",
    dek: "Akashic 1.0 is generally available on 1 November 2026. What ships, what stays in preview, and how to start.",
    category: "Product",
    date: "2026-10-15",
    author: PRODUCT_TEAM,
    blocks: [
      {
        type: "p",
        text: "Akashic 1.0 is generally available on 1 November 2026. It brings every Akashic module onto one governed foundation, with the same security, lineage and audit under each one.",
      },
      { type: "h2", id: "what-ships", text: "What is generally available" },
      {
        type: "ol",
        items: [
          "Akashic Pipelines: ingest and validate every source, structured, unstructured and streaming.",
          "Akashic Master Data: entity resolution, with the lineage of every merge kept.",
          "Akashic Warehouse: dimensional models, and metrics defined once.",
          "Akashic ML: train, deploy and monitor models, with drift and bias monitoring.",
          "Ask Akashic: plain-language questions, answered with citations, on the model you choose.",
          "Akashic BI: dashboards, alerts and AI-built charts with row-level security.",
          "Akashic Governance: permissions, lineage and an append-only audit log.",
        ],
      },
      { type: "h2", id: "in-preview", text: "What stays in preview" },
      {
        type: "p",
        text: "AI agents remain in preview with design partners. Pipeline agents help build and monitor pipelines. Matching agents suggest entity matches for data stewards to approve. The access control, lineage and audit the agents depend on are generally available today.",
      },
      { type: "h2", id: "where-it-runs", text: "Where it runs" },
      {
        type: "p",
        text: "Akashic 1.0 runs as multi-tenant SaaS operated by DHIRA, in your own AWS, Azure or GCP account, or on-premise on Docker and Kubernetes. The modules, governance and answers are the same in all three.",
      },
      { type: "h2", id: "how-to-start", text: "How to start" },
      {
        type: "p",
        text: "Start with one use case on your own data, on the Launch plan. Move up a plan as use grows, on the same foundation. [See plans and pricing](/pricing), or [read what is in 1.0](/akashic/1-0).",
      },
    ],
  },
  {
    slug: "agents-do-the-legwork",
    title: "Agents do the legwork. People make the call.",
    dek: "How Akashic's agents are designed: six steps, three lanes, and one column no agent ever fills.",
    category: "Product",
    date: "2026-10-08",
    author: PRODUCT_TEAM,
    blocks: [
      {
        type: "p",
        text: "Enterprise AI agents are usually sold on autonomy: fewer people, faster decisions, work that runs itself. For the decisions that matter in a ministry, a bank or a hospital, that pitch misses what buyers need. They need the legwork done, and the decision left with a person who can answer for it.",
      },
      {
        type: "p",
        text: "Akashic's agents are built to that brief. They are in preview today, and every one of them works inside the same run of six steps.",
      },
      { type: "h2", id: "six-steps", text: "Six steps, every time" },
      {
        type: "ol",
        items: [
          "Ask: a question, an alert or a schedule starts the run.",
          "Plan: the orchestrator breaks the work into steps and routes each one.",
          "Retrieve: agents query the governed warehouse, the documents and the metadata.",
          "Verify: citations, lineage and rules are checked before anything is shown.",
          "Approve: a person reviews the evidence and signs off, or does not.",
          "Record: the run, the evidence, the model and prompt versions and the decision go to the audit log.",
        ],
      },
      { type: "h2", id: "the-empty-column", text: "The empty column" },
      {
        type: "p",
        text: "Draw the six steps as columns and hang each agent under the step it works in. Planning, retrieval and verification fill up quickly. The Approve column stays empty. No agent signs off.",
      },
      {
        type: "p",
        text: "That empty column is the design. Agents gather evidence across tables and documents, explain what changed and point to what deserves a look. A person decides. The record shows who decided, on what evidence, with which model.",
      },
      { type: "h2", id: "governed-data", text: "Only as good as the data underneath" },
      {
        type: "p",
        text: "An agent that reads ungoverned data produces confident errors at machine speed. Akashic's agents work only on the governed foundation: resolved entities, defined metrics, recorded lineage and enforced access. Permissions follow the person who asked, down to the rows an agent may read.",
      },
      { type: "h2", id: "what-preview-means", text: "What preview means" },
      {
        type: "p",
        text: "Preview means the agents work with design partners, on real data, under the same controls as the rest of Akashic. The access control, lineage and audit they depend on are generally available in Akashic 1.0. The agents move to general availability when they meet the bar those partners set.",
      },
      {
        type: "note",
        label: "Become a design partner",
        text: "Agents are in preview with design partners, quoted with your plan. [Talk to our team](#talk-to-our-team) to join.",
      },
    ],
  },
  {
    slug: "what-is-a-knowledge-layer",
    title: "What a knowledge layer is, and why AI needs one",
    dek: "A model can read a document. It cannot know that the supplier in the contract is the vendor in the ERP. That knowledge has to be built, governed and kept.",
    category: "Perspectives",
    date: "2026-09-30",
    author: PRODUCT_TEAM,
    blocks: [
      {
        type: "p",
        text: "Most organisations hold more data than they can use and less context than they need. The ERP knows the vendor code. The contract knows the legal name. The email thread knows the account manager changed in March. No single system knows that all three describe the same relationship.",
      },
      {
        type: "p",
        text: "A knowledge layer is where that context is kept: the entities an organisation cares about, the relationships between them, and the meaning of the terms used to describe them, all of it governed.",
      },
      { type: "h2", id: "four-parts", text: "The four parts" },
      { type: "h3", text: "Entity resolution" },
      {
        type: "p",
        text: "Every version of a customer, supplier, asset or person across every source resolves to one record, with the lineage of what was merged kept intact. Without it, every later answer counts the same thing twice or misses it entirely.",
      },
      { type: "h3", text: "A semantic layer" },
      {
        type: "p",
        text: "Metrics and terms are defined once: what counts as an active customer, how margin is calculated, which date closes a quarter. Every dashboard, model and AI answer uses the same definition.",
      },
      { type: "h3", text: "Document intelligence" },
      {
        type: "p",
        text: "Contracts, certificates, reports and scanned forms are read, classified and linked to the entities they mention, with page-level citations back to the source.",
      },
      { type: "h3", text: "Lineage and policy" },
      {
        type: "p",
        text: "Every fact carries where it came from, who may see it and how it has changed. Access rules follow the person from the underlying records to the final answer.",
      },
      { type: "h2", id: "why-ai-needs-it", text: "Why AI needs it" },
      {
        type: "p",
        text: "Language models are good at language and poor at institutional memory. Given a question, a model reaches for whatever text is nearest. A knowledge layer changes what is nearest: the resolved entity, the governed definition, the cited page.",
      },
      {
        type: "p",
        text: "It also changes what can be checked. An answer grounded in a knowledge layer can show its working: which records, which definition, which page. An answer without one can only be trusted or not.",
      },
      { type: "quote", text: "The model is the easy part. The context it reasons over is the work.", cite: "Akashic product team" },
      { type: "h2", id: "build-it-once", text: "Build it once" },
      {
        type: "p",
        text: "The expensive mistake is building this context project by project: one integration for the forecasting model, another for the assistant, a third for the dashboard. Each rebuild costs months and drifts from the others. Built once, the same layer serves every use case that follows.",
      },
      {
        type: "note",
        label: "Where Akashic fits",
        text: "In Akashic, the knowledge layer is built from Master Data's resolved entities and the links between them, and governed by Akashic Governance. [Read the module reference](/akashic#stack).",
      },
    ],
  },
  {
    slug: "why-your-systems-disagree",
    title: "Three teams, three revenue numbers. Why your systems disagree.",
    dek: "When finance, sales and delivery bring different figures to the same meeting, the dispute is rarely the arithmetic. It is the definition underneath.",
    category: "Perspectives",
    date: "2026-09-22",
    author: ADVISORY_TEAM,
    blocks: [
      {
        type: "p",
        text: "Ask three teams for last quarter's revenue and you often get three numbers. Finance reports what was recognised. Sales reports what was booked. Delivery reports what was billed against milestones. Each figure is correct inside its own system, and each is wrong in the meeting where all three are on the table.",
      },
      {
        type: "p",
        text: "The usual response is to argue about the query. Someone pulls the SQL, someone else pulls a spreadsheet, and an hour goes to finding the line where the numbers part. That hour goes to the wrong problem.",
      },
      { type: "h2", id: "the-definition", text: "The dispute is the definition" },
      {
        type: "p",
        text: "Revenue looks like one word and behaves like four decisions. Change any one and the total moves. Two teams can read the same ledger and produce different numbers without either making an error.",
      },
      {
        type: "ul",
        items: [
          "Recognised or billed: the timing of revenue, not its existence.",
          "Consolidation scope: which subsidiaries and joint ventures roll up.",
          "Intercompany eliminations: whether internal trades are netted out.",
          "The FX date: transaction date, month end or reporting date.",
        ],
      },
      {
        type: "p",
        text: "None of these choices lives in a dashboard. They live in people's heads, in spreadsheet tabs and in the comments of a query written two years ago.",
      },
      { type: "h2", id: "why-it-matters-now", text: "Why it matters more with AI" },
      {
        type: "p",
        text: "A person who gets the wrong number usually notices it looks odd. A model does not. Put an AI assistant on three systems that disagree and it answers confidently from whichever source it reached first. The answer is fluent, fast and indefensible.",
      },
      {
        type: "p",
        text: "This is why so many AI pilots stall after the demo. The model works. The data underneath was never made ready for it: entities never resolved, definitions never agreed, lineage never recorded.",
      },
      { type: "h2", id: "what-fixes-it", text: "What fixes it" },
      { type: "p", text: "Not another report. A governed layer between the systems and every surface that reads them:" },
      {
        type: "ol",
        items: [
          "Resolve entities, so one customer, supplier or citizen is one record across every source.",
          "Define each metric once, with its choices written down: recognition basis, scope, eliminations, FX date.",
          "Record lineage at column level, so any figure traces to the records it came from.",
          "Serve every dashboard, model and AI answer from that same layer.",
        ],
      },
      {
        type: "p",
        text: "When a number is questioned, the answer is then a definition and a trail, not a debate. That is the difference between a figure people quote and a figure people act on.",
      },
      {
        type: "note",
        label: "Where Akashic fits",
        text: "Akashic Master Data resolves entities, Akashic Warehouse defines metrics once, and Akashic Governance records lineage and access. Ask Akashic answers from that layer and cites its sources. [See how the modules fit together](/akashic#modules).",
      },
    ],
  },
  {
    slug: "reconciling-national-scale-data",
    title: "Reconciling two billion records: what national programmes teach",
    dek: "At national scale the hard part is never the volume. It is making every published figure traceable.",
    category: "Public sector",
    date: "2026-09-10",
    author: PUBLIC_TEAM,
    blocks: [
      {
        type: "p",
        text: "Public programmes run at a scale few enterprises see. A national immunisation record holds billions of dose records. A national learning platform records billions of interactions. At that size, small inconsistencies stop being small: one duplicated record becomes thousands, and a disputed figure becomes a public one.",
      },
      {
        type: "p",
        text: "DHIRA built the intelligence layer inside programmes like these. Not the transaction systems, which belong to the governments that run them, but the layer that reads them, reconciles them and turns them into figures an authority can publish.",
      },
      { type: "h2", id: "volume", text: "Volume is not the problem" },
      {
        type: "p",
        text: "Storage and compute scale. Agreement does not scale on its own. When every state, district and facility reports through its own system, the same child, school or worker appears many times under many spellings. The work is resolving those records into one, and keeping the trail of what was merged.",
      },
      {
        type: "ul",
        items: [
          "A national immunisation registry: 2 billion+ dose records and 26 million+ vaccination sessions reconciled.",
          "A national learning platform: 5.75 billion+ learning interactions unified and 187 million+ enrolments resolved.",
          "An overseas employment registry: 4 million+ worker clearances reconciled and 282,000+ employer profiles resolved.",
        ],
      },
      { type: "h2", id: "traceable", text: "Every published figure traceable" },
      {
        type: "p",
        text: "A figure a health ministry publishes will be questioned by journalists, by auditors and by other departments. The only defensible answer is a trail: this figure, from these records, through these rules, on this date. In public data, lineage is not an engineering nicety. It is the difference between a number that holds and one that is withdrawn.",
      },
      { type: "h2", id: "lessons", text: "Lessons that carry to the enterprise" },
      {
        type: "ol",
        items: [
          "Resolve entities before anything else. Every later answer depends on it.",
          "Write definitions where the platform can enforce them, not in a handbook.",
          "Keep lineage at column level from the first pipeline, not after the first dispute.",
          "Separate reading from running. The intelligence layer reads source systems and leaves them in place.",
        ],
      },
      {
        type: "p",
        text: "None of these lessons is unique to government. They are what any organisation learns once its numbers start being quoted outside the room.",
      },
      { type: "note", label: "Read the stories", text: "[See how each programme was unified](/customers)." },
    ],
  },
  {
    slug: "lay-the-groundwork-once",
    title: "Lay the groundwork once. Build every use case on top.",
    dek: "Dashboards, forecasts, AI answers and agents all need the same foundation. Building it project by project is the most expensive way to get it.",
    category: "Perspectives",
    date: "2026-08-27",
    author: ADVISORY_TEAM,
    blocks: [
      {
        type: "p",
        text: "Every data and AI use case needs the same groundwork: connections to the source systems, entities resolved, metrics defined, access controlled and lineage recorded. The use cases differ. The groundwork does not.",
      },
      {
        type: "p",
        text: "Yet most organisations build it again for every project. The dashboard team builds pipelines. The forecasting team builds its own. The AI pilot builds a third set, plus a retrieval layer, plus its own access rules. Each is reasonable alone. Together they are three foundations that disagree.",
      },
      { type: "h2", id: "the-hidden-cost", text: "The hidden cost" },
      {
        type: "p",
        text: "The cost is not only the duplicated build. It is the drift: three definitions of the same customer, three refresh schedules, three places to check when a figure is wrong. Every new use case inherits the disagreement and adds to it.",
      },
      { type: "h2", id: "four-seats", text: "What each seat should measure" },
      {
        type: "ul",
        items: [
          "The CFO: how long it takes to answer why a number moved.",
          "The CIO or CTO: how many integrations each new use case adds.",
          "The CDO or head of AI: how many AI answers can show their sources.",
          "The CEO or COO: how long a decision waits for agreed figures.",
        ],
      },
      { type: "p", text: "If those measures worsen with every project, the groundwork is being rebuilt, not reused." },
      { type: "h2", id: "build-or-buy", text: "Build or buy the foundation" },
      {
        type: "p",
        text: "Building a governed foundation in-house is possible. It takes a standing team, years of work and the discipline to keep every project on it. Buying one moves that effort into the platform, so each new use case adds only its own work.",
      },
      {
        type: "p",
        text: "Either way, the decision that matters is the same: lay the groundwork once, and build every use case on top of it.",
      },
      { type: "note", label: "Where Akashic fits", text: "[See the groundwork drawn out](/akashic#build-vs-buy) on the Akashic page." },
    ],
  },
];

/** Newest first. */
export const INSIGHTS_BY_DATE = [...INSIGHTS].sort((a, b) => b.date.localeCompare(a.date));

export const findInsight = (slug: string) => INSIGHTS.find((insight) => insight.slug === slug);

/** Up to `count` other articles, same category first, then newest. */
export function relatedInsights(slug: string, count = 2) {
  const current = findInsight(slug);
  const others = INSIGHTS_BY_DATE.filter((insight) => insight.slug !== slug);
  const same = others.filter((insight) => insight.category === current?.category);
  const rest = others.filter((insight) => insight.category !== current?.category);
  return [...same, ...rest].slice(0, count);
}
