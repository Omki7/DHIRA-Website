/*
 * The six sector pages (/sectors/*): one document per sector, plus the
 * template strings and section index they share. Composers: app/sectors/*.
 * Every page runs six sections: hero (bespoke board per sector, SectorBoards),
 * problem, replay (touchline + same-day-on-Akashic wire log), solution rail,
 * outcomes ledger (the page's Rule 5a blue band), dark close.
 * Manufacturing keeps its own creative hero + problem files but shares the rest.
 * No invented marketing statistics (Rule 4): board figures are simulated
 * product UI (§8a), never claims.
 */

import type { Cta, ImageAsset, PageSection, Seo } from "../types";

/** Strings every sector page shares (the template's own chrome). */
export interface SectorTemplate {
  badge: string;
  primary: Cta;
  secondary: Cta;
  map: { eyebrow: { number: string }; aside: string; lede: { lead: string; tail: string } };
  solution: { eyebrow: { number: string; label: string }; aside: string; footer: string };
  outcomes: { eyebrow: { number: string; label: string }; aside: string; before: string; after: string; beforeShort: string; afterShort: string; footerLeft: string; footerRight: string };
  close: { primary: Cta; secondary: Cta };
  /** The [01] problem section's frame, the same on every sector page. */
  problem: { eyebrow: { number: string; label: string }; scenarioLabel: string; footer: string };
}

export const sectorTemplate: SectorTemplate = {
  badge: "Akashic by sector",
  primary: { label: "See how Akashic tackles it", href: "#solution" },
  secondary: { label: "Talk to our team", href: "#talk-to-our-team" },
  map: {
    eyebrow: { number: "02" },
    aside: "/ Players & flows",
    lede: { lead: "Scroll through your own", tail: ": the players you already have, and what changes when their data lands on one governed record." },
  },
  solution: {
    eyebrow: { number: "03", label: "How Akashic tackles it" },
    aside: "/ Four moves, one foundation",
    footer: "Every module runs on the same governed foundation · every answer arrives with its lineage",
  },
  outcomes: {
    eyebrow: { number: "04", label: "What changes" },
    aside: "/ Before & after",
    before: "Before Akashic",
    after: "On Akashic",
    beforeShort: "Before",
    afterShort: "After",
    footerLeft: "Same team · same systems of record",
    footerRight: "One governed foundation",
  },
  close: {
    primary: { label: "Talk to our team", href: "/#get-started" },
    secondary: { label: "Explore the platform", href: "/akashic" },
  },
  problem: {
    eyebrow: { number: "01", label: "The problem" },
    scenarioLabel: "How it plays out today",
    footer: "None of these are people problems. All of them are architecture problems.",
  },
};

/** The six sector pages share one section index (layout/PageMinimap). */
export const sectorSections: PageSection[] = [
  { id: "hero", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "map", label: "Industry Map" },
  { id: "solution", label: "Capabilities" },
  { id: "outcomes", label: "What Changes" },
  { id: "talk-to-our-team", label: "Get Started" },
];

export type SectorSlug = "manufacturing" | "healthcare" | "finance" | "retail" | "education" | "energy";

/** One row in the problem section's dark card (tag box, text, optional note or live dot). */
export interface StoryRow {
  tag?: string;
  text: string;
  note?: string;
  flag?: boolean;
}

/** The bespoke [01] problem section on each sector page (sections/<sector>/*): the
    split of what the systems held against how the organisation found out. */
export interface SectorStory {
  aside: string;
  title: string;
  left: { label: string; figure: string; accent: string; caption: string; rows?: StoryRow[]; body: string };
  divider: string;
  right: { label: string; figure: string; caption: string; body: string };
  verdict: string;
  evidence: {
    image: ImageAsset;
    chip: string;
    stages: string[];
    /** One small label above each stage. */
    stageLabels: string[];
    label: string;
    signals: { tag: string; title: string; body: string }[];
  };
}

/** The desktop record-fracture panel in the healthcare problem section. */
export interface HealthcarePanel {
  image: ImageAsset;
  chip: string;
  kicker: string;
  title: string;
  body: string;
  label: string;
  fragments: { system: string; record: string; detail: string }[];
  resolved: string;
  checks: string[];
  footer: string;
}

export interface SectorContent {
  seo: Seo;
  /** The hero photograph. */
  image: ImageAsset;
  story?: SectorStory;
  slug: SectorSlug;
  name: string;
  eyebrow: string;
  headlinePlain: string;
  headlineMarked: string;
  intro: string;
  heroFootnote: string;
  /** Minimap accessible name ("Finance page sections"). */
  sectionsLabel: string;
  problem: {
    label: string;
    title: string;
    scenario: string;
    fractures: { title: string; body: string }[];
    panel?: HealthcarePanel;
  };
  touchline: string;
  solution: {
    title: string;
    intro: string;
    steps: {
      phase: string;
      title: string;
      body: string;
      modules: { label: string; href: string }[];
    }[];
  };
  outcomes: {
    title: string;
    intro: string;
    rows: { before: string; after: string }[];
  };
  close: {
    title: string;
    body: string;
    chips: string[];
    yourThing: string;
  };
}

export const sectorPages: Record<SectorSlug, SectorContent> = {
  manufacturing: {
    slug: "manufacturing",
    name: "Manufacturing",
    seo: { title: "Manufacturing Sector", description: "Akashic connects the shop floor to the enterprise: MES, SCADA, and ERP unified into one governed record, so drift is caught while the shift can still act.", path: "/sectors/manufacturing" },
    sectionsLabel: "Manufacturing page sections",
    image: { src: "/sectors/manufacturing-hq.jpg", alt: "Wide manufacturing bay with overhead cranes, steel columns, and marked production lanes" },
    story: {
      aside: "/ TWO CLOCKS",
      title: "Two clocks run your plant. They never meet.",
      left: {
        label: "The machine clock",
        figure: "08:14:02",
        accent: ".318",
        caption: "Torque sample · every 40 ms",
        body: "Station three starts drifting on a Tuesday morning. The machine records it instantly, in a table nobody joins.",
      },
      divider: "The gap",
      right: {
        label: "The meeting clock",
        figure: "Month end",
        caption: "Variance review · three weeks after the drift",
        body: "The scrap surfaces in Thursday’s quality report. The cost lands in month-end variance. The root cause is reconstructed from four systems that disagree about what happened.",
      },
      verdict: "The gap between the two clocks is where downtime, scrap, and recalls live.",
      evidence: {
        image: { src: "/sectors/manufacturing-hq.jpg", alt: "Manufacturing floor with marked lanes, overhead cranes, and steel columns" },
        chip: "Bay A · Line 3",
        stages: ["Press", "Weld", "Coat"],
        stageLabels: ["ST-01", "ST-02", "ST-03"],
        label: "What the floor is already saying",
        signals: [
          {
            tag: "SENSOR",
            title: "Coating cell drift",
            body: "Temperature and torque move out of pattern before scrap appears in quality.",
          },
          {
            tag: "CONTEXT",
            title: "Batch and shift attached",
            body: "The signal carries the work order, operator shift, machine, and supplier lot.",
          },
          {
            tag: "ACTION",
            title: "Work order ready",
            body: "Maintenance sees the evidence while the line can still be brought back in spec.",
          },
        ],
      },
    },
    eyebrow: "Akashic for manufacturing · Plants & supply lines",
    headlinePlain: "The line already knows.",
    headlineMarked: "Now you will.",
    intro:
      "Your machines report every forty milliseconds. Your reports arrive every month. Akashic closes that gap: one governed record connecting the shop floor to the enterprise, so drift is caught while the shift can still act.",
    heroFootnote:
      "Built for plants, contract manufacturers, and multi-site operations · governed end to end",
    problem: {
      label: "Two clocks",
      title: "Two clocks run your plant. They never meet.",
      scenario:
        "A torque sensor on station three starts drifting on a Tuesday morning. The machine records it in milliseconds. The MES logs it in a table nobody joins. The scrap shows up in Thursday's quality report, the cost lands in month-end variance, and the root cause is reconstructed three weeks later from four systems that disagree about what happened.",
      fractures: [
        {
          title: "The floor and the ledger don't speak",
          body: "MES, SCADA, and the historian run in one world. ERP, quality, and planning run in another. Every handover between them is a spreadsheet, a delay, and a chance to disagree.",
        },
        {
          title: "Genealogy assembled by hand",
          body: "When a defect escapes, tracing which batch, machine, shift, and supplier lot were involved takes days of cross-referencing. The recall decision waits on the paperwork.",
        },
        {
          title: "Maintenance runs on the calendar",
          body: "Assets are serviced on schedule, not on condition. The signals that predict failure exist, they sit in a historian that no planning system ever queries.",
        },
      ],
    },
    touchline: "You built this line. You deserve to hear what it's telling you.",
    solution: {
      title: "One governed record, from sensor to boardroom.",
      intro:
        "Akashic doesn't replace your MES or ERP. It sits underneath them: streaming every signal into one governed foundation, resolving every part, machine, and batch into a single record, and answering in plain language with the lineage attached.",
      steps: [
        {
          phase: "Unify",
          title: "Connect the floor to the ledger",
          body: "Data Pipelines stream MES, SCADA, and ERP events the moment they happen. Master Data resolves every part, machine, batch, and supplier lot into one governed record.",
          modules: [
            { label: "Data Pipelines", href: "/akashic#data-pipelines" },
            { label: "Master Data", href: "/akashic#master-data" },
          ],
        },
        {
          phase: "Govern",
          title: "One traceable genealogy",
          body: "The warehouse keeps raw sensor history and certified quality records apart but linked. Every batch carries its full lineage: machine, shift, inputs, and inspection results.",
          modules: [
            { label: "Data Warehouse", href: "/akashic#data-warehousing" },
            { label: "Data Governance", href: "/akashic#governance" },
          ],
        },
        {
          phase: "Predict",
          title: "Maintenance before failure",
          body: "Models trained on your own vibration, torque, and scrap history flag drift before it becomes downtime, and forecast demand so the line runs to plan, not to guesswork.",
          modules: [{ label: "Machine Learning", href: "/akashic#machine-learning" }],
        },
        {
          phase: "Act",
          title: "Ask the line anything",
          body: "Supervisors ask in plain language and get answers grounded in the batch, machine, and shift they came from. Plant leadership watches live line health, not last month's OEE.",
          modules: [
            { label: "Ask Akashic", href: "/akashic#ask-ai" },
            { label: "Business Intelligence", href: "/akashic#business-intelligence" },
          ],
        },
      ],
    },
    outcomes: {
      title: "What changes on the floor.",
      intro:
        "Same machines. Same people. A different relationship with the truth of the line.",
      rows: [
        {
          before: "Downtime discovered in the morning report",
          after: "Drift flagged while the shift can still act",
        },
        {
          before: "Quality escapes traced by hand over days",
          after: "Batch genealogy resolved in one query",
        },
        {
          before: "ERP and MES disagree about yesterday's output",
          after: "One governed record both systems draw from",
        },
        {
          before: "OEE compiled in a spreadsheet at month end",
          after: "Live line health, traceable to every sensor",
        },
      ],
    },
    close: {
      title: "Let's talk about your line.",
      body: "Whether it's one plant drowning in disconnected systems or a multi-site operation that can't compare lines, we'd like to show you what one governed record of your production actually looks like.",
      chips: ["MES", "SCADA", "ERP", "QMS"],
      yourThing: "Your line",
    },
  },

  healthcare: {
    slug: "healthcare",
    name: "Healthcare",
    seo: { title: "Healthcare Sector", description: "Akashic resolves fragmented hospital systems into one governed longitudinal patient record, with consent and audit built into the platform itself.", path: "/sectors/healthcare" },
    sectionsLabel: "Healthcare page sections",
    image: { src: "/sectors/healthcare-hq.jpg", alt: "Modern clinical procedure room with surgical lights, monitors, and medical equipment" },
    eyebrow: "Akashic for healthcare · Hospitals & health systems",
    headlinePlain: "Every patient deserves one record.",
    headlineMarked: "Not seven.",
    intro:
      "Admissions, labs, imaging, claims, and paper registers each hold a fragment of the patient. Akashic resolves them into one governed longitudinal record, with consent and audit built into the platform, not the policy binder.",
    heroFootnote:
      "Built for hospitals, health networks, and public health programmes · governed end to end",
    problem: {
      label: "The fragmented patient",
      title: "The 2 a.m. admission is a data problem.",
      scenario:
        "A patient arrives in emergency at 2 a.m. Their history sits in the ward HIS, a lab system, a scan archive, an insurer's claim file, and a paper register two districts away. The clinician treats with a partial picture. The hospital absorbs the risk. The patient repeats their story for the fifth time.",
      panel: {
        image: { src: "/sectors/healthcare-hq.jpg", alt: "Clinical procedure room with monitors, surgical lights, and connected equipment" },
        chip: "Emergency bay · 02:04",
        kicker: "Point of care",
        title: "The clinician sees only the system in front of them.",
        body: "The missing history is not absent. It is scattered across systems that were never joined around the patient.",
        label: "The fragmented patient",
        fragments: [
          { system: "HIS", record: "Emergency admission", detail: "Ward record" },
          { system: "LIS", record: "Critical lab panel", detail: "Pathology" },
          { system: "PACS", record: "Imaging metadata", detail: "Radiology" },
          { system: "CLM", record: "Claim history", detail: "Insurer" },
        ],
        resolved: "On Akashic: resolved into one patient record",
        checks: ["Duplicate identities merged", "Consent checked before access", "Allergy conflict surfaced", "Every source record attached"],
        footer: "HIS · LIS · PACS · claims · consent · audit",
      },
      fractures: [
        {
          title: "Every department keeps its own patient",
          body: "Admissions, labs, imaging, and billing each hold their own version of the record. None of them agree, and no clinician sees all of them at once.",
        },
        {
          title: "Duplicate identities, reconciled by hand",
          body: "The same person registered three ways across departments and campuses. Matching them happens manually, after the fact, if at all.",
        },
        {
          title: "Compliance lives in documents, not systems",
          body: "Consent and access rules sit in policy binders while the systems that actually serve the data enforce none of them. Audit preparation is an annual emergency.",
        },
      ],
    },
    touchline: "Nobody should have to tell their story five times at 2 a.m.",
    solution: {
      title: "One longitudinal record, governed at the source.",
      intro:
        "Akashic doesn't rip out your HIS or LIS. It unifies what they hold into one patient truth, enforces consent and masking at the platform layer, and answers clinical and operational questions with the source attached.",
      steps: [
        {
          phase: "Unify",
          title: "Every system, one patient",
          body: "Data Pipelines connect HIS, LIS, imaging metadata, pharmacy, and claims as they change. Master Data resolves duplicate registrations into one golden patient record.",
          modules: [
            { label: "Data Pipelines", href: "/akashic#data-pipelines" },
            { label: "Master Data", href: "/akashic#master-data" },
          ],
        },
        {
          phase: "Govern",
          title: "Consent enforced by the platform",
          body: "Role-based access, PII masking, and consent rules execute at the graph layer. Every access is stamped and traceable, so the audit trail writes itself.",
          modules: [
            { label: "Data Governance", href: "/akashic#governance" },
            { label: "Data Warehouse", href: "/akashic#data-warehousing" },
          ],
        },
        {
          phase: "Predict",
          title: "Capacity and risk, forecast on your own history",
          body: "Models trained on your admissions, seasonality, and supply data forecast bed demand, flag readmission risk, and keep pharmacy stock ahead of need.",
          modules: [{ label: "Machine Learning", href: "/akashic#machine-learning" }],
        },
        {
          phase: "Act",
          title: "Answers at the point of care",
          body: "Clinicians ask in plain language and get the full history with sources. Administrators watch live occupancy and flow instead of last week's census.",
          modules: [
            { label: "Ask Akashic", href: "/akashic#ask-ai" },
            { label: "Business Intelligence", href: "/akashic#business-intelligence" },
          ],
        },
      ],
    },
    outcomes: {
      title: "What changes on the ward.",
      intro:
        "Same clinicians. Same systems of record. A complete picture where there were fragments.",
      rows: [
        {
          before: "History assembled by phone calls between departments",
          after: "One longitudinal record at the point of care",
        },
        {
          before: "Consent enforced by policy documents",
          after: "Consent enforced by the platform itself",
        },
        {
          before: "Audit preparation measured in weeks",
          after: "Every access already stamped and traceable",
        },
        {
          before: "Capacity planned on last month's census",
          after: "Bed and supply demand forecast on live signals",
        },
      ],
    },
    close: {
      title: "Let's talk about your patients' record.",
      body: "Whether it's a single hospital untangling duplicate registrations or a health system building one governed patient truth across campuses, we'd like to show you what that architecture looks like.",
      chips: ["HIS", "LIS", "PACS", "Claims"],
      yourThing: "Your hospital",
    },
  },

  finance: {
    slug: "finance",
    name: "Finance",
    seo: { title: "Finance & Banking", description: "Akashic watches every transaction against the whole graph: one resolved customer across products, real-time pattern recognition, and lineage on every alert.", path: "/sectors/finance" },
    sectionsLabel: "Finance page sections",
    image: { src: "/sectors/finance-hq.jpg", alt: "Financial-district towers at dusk, glass facades and trading-floor skyline" },
    story: {
      aside: "/ THE CHAIN",
      title: "Four systems watched. None saw the chain.",
      left: {
        label: "What each system saw",
        figure: "Three hops",
        accent: ".",
        caption: "Card, UPI, savings · six minutes apart",
        rows: [
          { tag: "CARD", text: "₹49,200 → A. K. Enterprises", note: "No flag" },
          { tag: "UPI", text: "₹48,700 → AK Enterprise", note: "No flag" },
          { tag: "SAV", text: "₹47,900 → A.K. Entprs", note: "No flag" },
        ],
        body: "Each transfer sat just under the reporting limit. Each system logged its own hop and saw nothing wrong.",
      },
      divider: "The blind spot",
      right: {
        label: "When the alert finally fired",
        figure: "Weeks later",
        caption: "Quarterly review · buried in false positives",
        body: "The chain surfaces in a review long after the money moves. The pattern that spanned three products was invisible to all of them, and the evidence is reconstructed by hand from logs that disagree.",
      },
      verdict: "The gap between the hops is where the money leaves, and where the audit questions begin.",
      evidence: {
        image: { src: "/sectors/finance-hq.jpg", alt: "Financial-district towers at dusk, glass facades and lit trading floors" },
        chip: "Risk desk · 14:09",
        stages: ["Card", "UPI", "Savings"],
        stageLabels: ["Hop", "Hop", "Hop"],
        label: "What the graph is already saying",
        signals: [
          {
            tag: "RESOLVE",
            title: "One entity, three accounts",
            body: "Near-identical names across cards, UPI, and savings resolve to a single beneficiary.",
          },
          {
            tag: "PATTERN",
            title: "Structuring recognised",
            body: "Transfers parked just under the reporting limit match a known laundering shape.",
          },
          {
            tag: "EVIDENCE",
            title: "Alert carries its lineage",
            body: "The chain, the entities, and every source record arrive with the escalation.",
          },
        ],
      },
    },
    eyebrow: "Akashic for finance · Banks, NBFCs & insurers",
    headlinePlain: "Catch risk",
    headlineMarked: "before it clears.",
    intro:
      "Fraud moves across products. Your monitoring watches one silo at a time. Akashic sees every transaction against the whole graph: one resolved customer, real-time pattern recognition, and lineage on every alert your auditor will ever ask about.",
    heroFootnote:
      "Built for banks, NBFCs, insurers, and capital markets · compliance by architecture",
    problem: {
      label: "The pattern nobody sees",
      title: "Each system saw one hop. Nothing saw the chain.",
      scenario:
        "A pattern of small transfers moves through accounts opened under near-identical names: one hop through cards, one through UPI, one through a dormant savings account. Each system logs its own step and sees nothing wrong. The alert finally fires weeks later, buried in a queue of false positives, long after the money is gone.",
      fractures: [
        {
          title: "Monitoring runs one silo at a time",
          body: "Core banking, cards, payments, and lending each run their own surveillance. A pattern that spans them is invisible to all of them.",
        },
        {
          title: "One customer, four KYC records",
          body: "The same person exists under slightly different names across products. Exposure, risk, and suspicious behaviour fragment with the identity.",
        },
        {
          title: "Evidence assembled after the fact",
          body: "When the regulator asks why an alert fired, or didn't, the answer is reconstructed by hand from logs across systems. Audit is an archaeology project.",
        },
      ],
    },
    touchline: "Trust is your product. Architecture is how you keep it.",
    solution: {
      title: "The whole graph, watching every transaction.",
      intro:
        "Akashic sits beneath your core systems: streaming every transaction into one governed foundation, resolving every identity across products, and giving risk teams answers that arrive with their evidence attached.",
      steps: [
        {
          phase: "Unify",
          title: "Every channel, one stream",
          body: "Data Pipelines ingest core banking, cards, payments, and lending events in real time. Master Data resolves near-identical identities into one customer across every product.",
          modules: [
            { label: "Data Pipelines", href: "/akashic#data-pipelines" },
            { label: "Master Data", href: "/akashic#master-data" },
          ],
        },
        {
          phase: "Govern",
          title: "Compliance by architecture",
          body: "Access rules, masking, and retention execute at the platform layer. Every query and every model decision is stamped, so the audit trail exists before anyone asks for it.",
          modules: [
            { label: "Data Governance", href: "/akashic#governance" },
            { label: "Data Warehouse", href: "/akashic#data-warehousing" },
          ],
        },
        {
          phase: "Predict",
          title: "Patterns flagged as they form",
          body: "Models trained on your own transaction graph recognise structuring, mule networks, and credit deterioration across products, not one silo at a time.",
          modules: [{ label: "Machine Learning", href: "/akashic#machine-learning" }],
        },
        {
          phase: "Act",
          title: "Alerts that carry their evidence",
          body: "Risk teams ask in plain language and get the chain, the entities, and the source records in one answer. Every escalation is audit-ready the moment it's raised.",
          modules: [
            { label: "Ask Akashic", href: "/akashic#ask-ai" },
            { label: "Business Intelligence", href: "/akashic#business-intelligence" },
          ],
        },
      ],
    },
    outcomes: {
      title: "What changes on the risk desk.",
      intro: "Same regulators. Same products. A different speed of sight.",
      rows: [
        {
          before: "Each channel monitored in its own silo",
          after: "Every transaction seen against the whole graph",
        },
        {
          before: "One customer scattered across four KYC records",
          after: "One resolved entity across every product",
        },
        {
          before: "Alerts triaged weeks after the pattern",
          after: "Risk flagged as the pattern forms",
        },
        {
          before: "Audit evidence assembled by hand",
          after: "Lineage attached to every decision by default",
        },
      ],
    },
    close: {
      title: "Let's talk about your risk architecture.",
      body: "Whether it's a fraud pattern your silos keep missing or a compliance programme that runs on manual evidence, we'd like to show you what surveillance on one governed graph looks like.",
      chips: ["Core banking", "Cards", "Payments", "KYC"],
      yourThing: "Your book",
    },
  },

  retail: {
    slug: "retail",
    name: "Retail",
    seo: { title: "Retail & Supply Chain", description: "Akashic connects POS, ERP, warehouse, and supplier feeds into one live picture, so the demand forecast runs on today's signal, not last month's export.", path: "/sectors/retail" },
    sectionsLabel: "Retail page sections",
    image: { src: "/sectors/retail-hq.jpg", alt: "Bright retail store aisle with stocked shelves receding into the distance" },
    story: {
      aside: "/ SHELF & WAREHOUSE",
      title: "The shelves were empty. The warehouse was full.",
      left: {
        label: "On the shelf",
        figure: "Sold out",
        accent: ".",
        caption: "Promotion running · southern region",
        rows: [
          { text: "Store 114 · Nagpur", note: "2 days cover", flag: true },
          { text: "Store 087 · Amravati", note: "3 days cover", flag: false },
          { text: "Store 091 · Akola", note: "4 days cover", flag: false },
        ],
        body: "Shelves empty in one state while the tills keep ringing. The replenishment order hasn’t even been raised.",
      },
      divider: "Two states apart",
      right: {
        label: "In the warehouse",
        figure: "Surplus",
        caption: "DC-2 Bhiwandi · 340 units of the same item",
        body: "POS says one thing, ERP another, the planning sheet a third, and all of them are days old. The replenishment lands after the promotion ends. The markdown follows a month later.",
      },
      verdict: "The gap between the shelf and the warehouse is where every markdown is born.",
      evidence: {
        image: { src: "/sectors/retail-hq.jpg", alt: "Retail store aisle with stocked shelves receding into the distance" },
        chip: "Region · Mon 09:20",
        stages: ["Shelf", "Backroom", "DC-2"],
        stageLabels: ["Stock", "Stock", "Stock"],
        label: "What the live picture is already saying",
        signals: [
          {
            tag: "RESOLVE",
            title: "One SKU, every location",
            body: "Shelf, backroom, in-transit, and DC stock resolve into one live position per product.",
          },
          {
            tag: "PROJECT",
            title: "Stockout seen on Monday",
            body: "The promotion spike projects a Friday gap while the surplus can still be moved.",
          },
          {
            tag: "ACT",
            title: "Replenishment routed",
            body: "Surplus at the northern DC is routed to the stores that need it, before the shelf goes bare.",
          },
        ],
      },
    },
    eyebrow: "Akashic for retail · Chains, brands & marketplaces",
    headlinePlain: "Know what sells.",
    headlineMarked: "Before it ships.",
    intro:
      "Demand shows up in your POS in real time and in your planning sheet three weeks later. Akashic connects sales, stock, and supply into one live picture, so the forecast runs on today’s signal, not last month’s export.",
    heroFootnote:
      "Built for retail chains, consumer brands, and marketplaces · from shelf to supplier",
    problem: {
      label: "The stale forecast",
      title: "The shelves were empty. The warehouse was full.",
      scenario:
        "A regional promotion empties shelves in one state while a warehouse two states over holds surplus of the same item. POS says one thing, ERP another, the planning sheet a third, and all of them are days old. The replenishment order lands after the promotion ends. The markdown follows a month later.",
      fractures: [
        {
          title: "Demand signals arrive late",
          body: "POS data reaches planners through overnight exports and weekly aggregation. By the time the trend is visible, the moment to act on it has passed.",
        },
        {
          title: "Stock is invisible between systems",
          body: "The DC, the store backroom, and in-transit inventory live in different systems that reconcile weekly. Nobody holds one live picture of where product actually is.",
        },
        {
          title: "The forecast lives in a spreadsheet",
          body: "Planning runs in files detached from live sales, weather, and promotions. Every forecast is stale on arrival and adjusted by gut feel.",
        },
      ],
    },
    touchline: "Every empty shelf is a promise you didn't get to keep.",
    solution: {
      title: "One live picture, from shelf to supplier.",
      intro:
        "Akashic unifies POS, ERP, warehouse, and supplier feeds as they change, resolves every product and location into one record, and puts the forecast on live signal instead of last month's export.",
      steps: [
        {
          phase: "Unify",
          title: "Every till, one stream",
          body: "Data Pipelines connect POS, e-commerce, ERP, WMS, and supplier EDI in real time. Master Data resolves every SKU, store, and supplier into one governed record.",
          modules: [
            { label: "Data Pipelines", href: "/akashic#data-pipelines" },
            { label: "Master Data", href: "/akashic#master-data" },
          ],
        },
        {
          phase: "Govern",
          title: "One version of stock",
          body: "The warehouse holds sales, inventory, and movement history in governed layers. When merchandising and finance pull a number, it's the same number.",
          modules: [
            { label: "Data Warehouse", href: "/akashic#data-warehousing" },
            { label: "Data Governance", href: "/akashic#governance" },
          ],
        },
        {
          phase: "Predict",
          title: "Forecast per store, not per region",
          body: "Models trained on your own sales, promotions, and seasonality forecast demand at store-SKU level, and flag supply anomalies before they become empty shelves.",
          modules: [{ label: "Machine Learning", href: "/akashic#machine-learning" }],
        },
        {
          phase: "Act",
          title: "Replenishment answers, not reports",
          body: "Planners ask which stores run out this week and get an answer with the stock, the trend, and the source attached. Merchandising watches live sell-through, not the Monday export.",
          modules: [
            { label: "Ask Akashic", href: "/akashic#ask-ai" },
            { label: "Business Intelligence", href: "/akashic#business-intelligence" },
          ],
        },
      ],
    },
    outcomes: {
      title: "What changes in the chain.",
      intro:
        "Same stores. Same suppliers. Decisions made on today's demand instead of last month's.",
      rows: [
        {
          before: "Demand visible in weekly aggregated exports",
          after: "Live sell-through, per store, per SKU",
        },
        {
          before: "Stock reconciled between systems weekly",
          after: "One live picture from DC to shelf",
        },
        {
          before: "Forecast adjusted by gut feel in a spreadsheet",
          after: "Store-level forecast on live signals",
        },
        {
          before: "Markdowns absorbing every planning miss",
          after: "Surplus flagged while it can still move",
        },
      ],
    },
    close: {
      title: "Let's talk about your demand signal.",
      body: "Whether it's stockouts your exports catch too late or a planning cycle that runs on stale spreadsheets, we'd like to show you what forecasting on live, governed data looks like.",
      chips: ["POS", "ERP", "WMS", "Supplier EDI"],
      yourThing: "Your network",
    },
  },

  education: {
    slug: "education",
    name: "Education",
    seo: { title: "Education Sector", description: "The intelligence layer inside national learning platforms, deployed for institutions: one governed learner record from enrolment to placement.", path: "/sectors/education" },
    sectionsLabel: "Education page sections",
    image: { src: "/sectors/education-hq.jpg", alt: "University campus with students and academic buildings" },
    story: {
      aside: "/ THE INVISIBLE JOURNEY",
      title: "You can count enrolments. You can’t see journeys.",
      left: {
        label: "What each system saw",
        figure: "Just noise",
        accent: ".",
        caption: "Three systems · three unread signals",
        rows: [
          { tag: "ATT", text: "Attendance dips", flag: false },
          { tag: "LMS", text: "Assessment slides", flag: false },
          { tag: "FEE", text: "Payment stalls", flag: true },
        ],
        body: "Each signal alone looks like a bad week. No system holds the person, so no system sees them add up.",
      },
      divider: "Never joined",
      right: {
        label: "What they added up to",
        figure: "Term end",
        caption: "Drop-out · discovered as paperwork",
        body: "Together they were a drop-out announcing itself a term in advance. Nobody saw them together, so the intervention came after the exit, when it was already a report.",
      },
      verdict: "The gap between the signals and the person is where the drop-out hides.",
      evidence: {
        image: { src: "/sectors/education-hq.jpg", alt: "University campus with students and academic buildings" },
        chip: "Cohort · Week 3",
        stages: ["Week 2", "Week 3", "Week 4"],
        stageLabels: ["Signal", "Signal", "Signal"],
        label: "What the journey is already saying",
        signals: [
          {
            tag: "RESOLVE",
            title: "One learner, every system",
            body: "Admissions, LMS, assessment, attendance, and fees resolve into one governed record.",
          },
          {
            tag: "PATTERN",
            title: "At-risk combination matched",
            body: "The three signals together match a known drop-out shape this cohort has shown before.",
          },
          {
            tag: "ACT",
            title: "Counsellor reaches out",
            body: "A conversation in week four, while there is still a term left to change the outcome.",
          },
        ],
      },
    },
    eyebrow: "Akashic for education · Institutions & national programmes",
    headlinePlain: "Every learner.",
    headlineMarked: "One connected journey.",
    intro:
      "Akashic already runs inside India’s national learning platform, connecting billions of learning interactions into decision-ready insight. The same foundation connects your campus: one governed journey from enrolment to placement.",
    heroFootnote:
      "Built for universities, school networks, and national education programmes · proven at population scale",
    problem: {
      label: "The invisible journey",
      title: "You can count enrolments. You can’t see journeys.",
      scenario:
        "A student starts strong, then their attendance dips in one system, their assessment scores slide in another, and their fee payments stall in a third. Each signal alone looks like noise. Together they are a drop-out announcing itself a term in advance. Nobody sees them together, so the intervention comes after the exit, as paperwork.",
      fractures: [
        {
          title: "The learner fragments across systems",
          body: "Admissions, the LMS, assessment, hostels, and placement each hold a slice of the student. No one system holds the person.",
        },
        {
          title: "Signals arrive after the outcome",
          body: "Reports are compiled at term end, when the drop-out has already happened. The data that predicted it existed all along, in systems that never met.",
        },
        {
          title: "Outcomes disconnect from teaching",
          body: "Placement results, learning outcomes, and course design live in separate worlds. What worked, and for whom, stays anecdotal.",
        },
      ],
    },
    touchline: "No drop-out is sudden. Someone just has to see it coming.",
    solution: {
      title: "One journey, from first enrolment to first job.",
      intro:
        "Akashic unifies every system that touches a learner into one governed record, flags risk while there's still a term left to act, and answers the questions institutions actually ask, with the evidence attached.",
      steps: [
        {
          phase: "Unify",
          title: "Every system, one learner",
          body: "Data Pipelines connect the SIS, LMS, assessment, attendance, and placement systems. Master Data resolves them into one governed record per learner.",
          modules: [
            { label: "Data Pipelines", href: "/akashic#data-pipelines" },
            { label: "Master Data", href: "/akashic#master-data" },
          ],
        },
        {
          phase: "Govern",
          title: "A record that protects the student",
          body: "Access rules and masking execute at the platform layer, so counsellors, faculty, and administrators each see exactly what their role permits, with every access stamped.",
          modules: [
            { label: "Data Governance", href: "/akashic#governance" },
            { label: "Data Warehouse", href: "/akashic#data-warehousing" },
          ],
        },
        {
          phase: "Predict",
          title: "Risk flagged a term early",
          body: "Models trained on your own cohorts recognise the combination of signals that precedes a drop-out or a failing outcome, while there is still time to intervene.",
          modules: [{ label: "Machine Learning", href: "/akashic#machine-learning" }],
        },
        {
          phase: "Act",
          title: "Questions answered with evidence",
          body: "Which cohorts are struggling, which courses lead to placements, which interventions worked: asked in plain language, answered with the source data attached.",
          modules: [
            { label: "Ask Akashic", href: "/akashic#ask-ai" },
            { label: "Business Intelligence", href: "/akashic#business-intelligence" },
          ],
        },
      ],
    },
    outcomes: {
      title: "What changes on campus.",
      intro:
        "Same faculty. Same systems. Learners seen as journeys instead of rows in five databases.",
      rows: [
        {
          before: "Drop-outs discovered in term-end reports",
          after: "At-risk learners flagged a term in advance",
        },
        {
          before: "The student assembled from five systems by hand",
          after: "One governed record per learner",
        },
        {
          before: "Course effectiveness argued from anecdote",
          after: "Outcomes traced from classroom to placement",
        },
        {
          before: "Compliance reporting as an annual scramble",
          after: "Regulator-ready reports from governed data",
        },
      ],
    },
    close: {
      title: "Let's talk about your learners.",
      body: "The intelligence layer inside India's national learning platform is the same foundation we deploy for institutions. We'd like to show you what one connected learner journey looks like for your campus.",
      chips: ["SIS", "LMS", "Assessment", "Placement"],
      yourThing: "Your campus",
    },
  },

  energy: {
    slug: "energy",
    name: "Energy",
    seo: { title: "Energy & Utilities", description: "Akashic unifies SCADA, metering, and asset data into one governed live picture, so the grid is maintained on condition, not on the calendar.", path: "/sectors/energy" },
    sectionsLabel: "Energy page sections",
    image: { src: "/sectors/energy-hq.jpg", alt: "High-voltage transmission towers and lines against a dusk sky" },
    story: {
      aside: "/ THE UNREAD SIGNAL",
      title: "The outage reached you as phone calls, not as data.",
      left: {
        label: "What the historian held",
        figure: "11 days",
        accent: ".",
        caption: "Thermal drift · recorded, never queried",
        rows: [
          { tag: "Day 1", text: "Thermal drift begins", flag: false },
          { tag: "Day 6", text: "Condition score dips", flag: false },
          { tag: "Day 11", text: "Peak load · feeder trips", flag: true },
        ],
        body: "The signal that predicted the trip was in the historian the whole time. No system ever asked it a question.",
      },
      divider: "Never queried",
      right: {
        label: "How you found out",
        figure: "Call centre",
        caption: "Peak evening · after the feeder tripped",
        body: "The asset register said mid-life. The maintenance plan said next quarter. The control room learned of the outage from customers, and the post-mortem found the signal everyone technically had.",
      },
      verdict: "The gap between the historian and the control room is where the outage lives.",
      evidence: {
        image: { src: "/sectors/energy-hq.jpg", alt: "High-voltage transmission towers and lines against a dusk sky" },
        chip: "Feeder 7 · Day 11",
        stages: ["Day 1", "Day 6", "Day 11"],
        stageLabels: ["Historian", "Historian", "Historian"],
        label: "What the grid is already saying",
        signals: [
          {
            tag: "RESOLVE",
            title: "One asset, full lineage",
            body: "Live telemetry, inspection history, and asset record resolve into one register entry.",
          },
          {
            tag: "PATTERN",
            title: "Thermal drift recognised",
            body: "The signature that precedes a trip is matched against this transformer's own history.",
          },
          {
            tag: "ACT",
            title: "Crew dispatched on condition",
            body: "The work order carries the telemetry and the location, days before the peak load.",
          },
        ],
      },
    },
    eyebrow: "Akashic for energy · Utilities & grid operators",
    headlinePlain: "See the grid",
    headlineMarked: "before it fails.",
    intro:
      "The telemetry that predicts a failure already exists. It sits in a historian nobody queries. Akashic unifies SCADA, metering, and asset data into one governed live picture, so the grid is maintained on condition, not on the calendar.",
    heroFootnote:
      "Built for utilities, grid operators, and energy producers · resilient by design",
    problem: {
      label: "The signal in the historian",
      title: "The outage reached you as phone calls, not as data.",
      scenario:
        "A feeder trips on a summer evening at peak load. The thermal drift that predicted it had been in the historian for eleven days. The asset register said the transformer was mid-life. The maintenance plan said next quarter. The control room found out from the call centre, and the post-mortem found the signal everyone technically had.",
      fractures: [
        {
          title: "Telemetry locked in the historian",
          body: "SCADA and sensor history accumulate in systems built for recording, not for asking. The signals that precede failure are stored and never seen.",
        },
        {
          title: "Assets maintained on the calendar",
          body: "Inspection and replacement run on fixed schedules. Healthy assets get serviced early, failing assets fail first, and the plan never learns.",
        },
        {
          title: "Load forecast apart from live demand",
          body: "Planning models run on historical aggregates while metering data streams in real time. The two meet in a monthly report, after the peak has passed.",
        },
      ],
    },
    touchline: "The grid has been talking all along. Now someone is listening.",
    solution: {
      title: "One live picture of the grid, governed end to end.",
      intro:
        "Akashic sits across your operational systems: streaming telemetry, resolving every asset into one record, and turning the historian from an archive into the thing that warns you first.",
      steps: [
        {
          phase: "Unify",
          title: "Every signal, one foundation",
          body: "Data Pipelines stream SCADA, AMI metering, weather, and outage events as they happen. Master Data resolves every asset, feeder, and site into one governed register.",
          modules: [
            { label: "Data Pipelines", href: "/akashic#data-pipelines" },
            { label: "Master Data", href: "/akashic#master-data" },
          ],
        },
        {
          phase: "Govern",
          title: "An asset record you can audit",
          body: "The warehouse links live telemetry to inspection history and asset lineage. Regulatory reporting draws from the same governed record operations run on.",
          modules: [
            { label: "Data Warehouse", href: "/akashic#data-warehousing" },
            { label: "Data Governance", href: "/akashic#governance" },
          ],
        },
        {
          phase: "Predict",
          title: "Failure flagged before the trip",
          body: "Models trained on your own telemetry recognise the drift that precedes failure and forecast load on live signals, so maintenance and dispatch run on condition.",
          modules: [{ label: "Machine Learning", href: "/akashic#machine-learning" }],
        },
        {
          phase: "Act",
          title: "The control room asks, the grid answers",
          body: "Operators ask which assets are trending toward failure and get an answer with the telemetry, the history, and the location attached. Leadership sees grid health live.",
          modules: [
            { label: "Ask Akashic", href: "/akashic#ask-ai" },
            { label: "Business Intelligence", href: "/akashic#business-intelligence" },
          ],
        },
      ],
    },
    outcomes: {
      title: "What changes in the control room.",
      intro:
        "Same grid. Same crews. Failures seen coming instead of explained afterwards.",
      rows: [
        {
          before: "Failures explained in the post-mortem",
          after: "Drift flagged days before the trip",
        },
        {
          before: "Maintenance on a fixed calendar",
          after: "Crews dispatched on asset condition",
        },
        {
          before: "Load planned on historical aggregates",
          after: "Demand forecast on live metering",
        },
        {
          before: "Outages reported by the call centre",
          after: "The grid reports on itself, with lineage",
        },
      ],
    },
    close: {
      title: "Let's talk about your grid.",
      body: "Whether it's a historian full of unread signals or a maintenance plan that never learns, we'd like to show you what a grid that reports on itself actually looks like.",
      chips: ["SCADA", "AMI", "Historian", "GIS"],
      yourThing: "Your grid",
    },
  },
};
