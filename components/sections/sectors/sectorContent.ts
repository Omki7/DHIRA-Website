/*
 * Content config for the six sector pages (/sectors/*).
 * Every page runs six sections: hero (bespoke board per sector, SectorBoards),
 * problem, replay (touchline + same-day-on-Akashic wire log), solution rail,
 * outcomes ledger (the page's Rule 5a blue band), dark close.
 * Manufacturing keeps its own creative hero + problem files but shares the rest.
 * No invented marketing statistics (Rule 4): board figures are simulated
 * product UI (§8a), never claims.
 */

export type SectorContent = {
  slug: string;
  name: string;
  eyebrow: string;
  headlinePlain: string;
  headlineMarked: string;
  intro: string;
  heroFootnote: string;
  problem: {
    label: string;
    title: string;
    scenario: string;
    fractures: { title: string; body: string }[];
  };
  touchline: string;
  replay: {
    label: string;
    intro: string;
    steps: { time: string; event: string; detail: string }[];
    outcome: string;
  };
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
};

export const SECTOR_PAGES: Record<string, SectorContent> = {
  manufacturing: {
    slug: "manufacturing",
    name: "Manufacturing",
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
    replay: {
      label: "Same Tuesday, on Akashic",
      intro:
        "Replay the same morning with the floor and the enterprise on one governed record.",
      steps: [
        {
          time: "08:14",
          event: "Torque drifts on station three",
          detail: "Forty-millisecond samples, streaming into the foundation",
        },
        {
          time: "08:15",
          event: "Akashic flags the drift",
          detail: "Pattern matched against this line's own scrap history",
        },
        {
          time: "08:31",
          event: "Technician inspects the seal head",
          detail: "Work order raised with the batch and machine attached",
        },
        {
          time: "08:47",
          event: "Line back in spec",
          detail: "No scrap ran. Nothing to reconstruct at month end",
        },
      ],
      outcome:
        "The Tuesday that used to cost three weeks of reconstruction now costs thirty-three minutes of attention.",
    },
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
            { label: "Akashic Insights", href: "/akashic#ask-ai" },
            { label: "Akashic BI", href: "/akashic#business-intelligence" },
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
    replay: {
      label: "Same admission, on Akashic",
      intro:
        "Replay the same night with every system resolved into one patient record.",
      steps: [
        {
          time: "02:04",
          event: "Patient arrives in emergency",
          detail: "One search. One record. Every registration already resolved",
        },
        {
          time: "02:05",
          event: "Full history on screen",
          detail: "HIS, labs, imaging, and claims, with sources attached",
        },
        {
          time: "02:11",
          event: "Allergy conflict caught",
          detail: "Flagged from a discharge summary filed years ago",
        },
        {
          time: "02:26",
          event: "Treatment starts, fully informed",
          detail: "Every access consent-checked and stamped as it happened",
        },
      ],
      outcome:
        "The patient told their story once, years ago. On one governed record, that was enough.",
    },
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
            { label: "Akashic Insights", href: "/akashic#ask-ai" },
            { label: "Akashic BI", href: "/akashic#business-intelligence" },
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
    replay: {
      label: "Same pattern, on Akashic",
      intro:
        "Replay the same afternoon with every channel watching one resolved graph.",
      steps: [
        {
          time: "14:02",
          event: "First transfer moves through cards",
          detail: "Streamed into the graph as it clears",
        },
        {
          time: "14:07",
          event: "Second hop lands in UPI",
          detail: "Both accounts resolve to the same entity",
        },
        {
          time: "14:09",
          event: "The chain is flagged as it forms",
          detail: "Pattern matched across products, not within one",
        },
        {
          time: "14:20",
          event: "Analyst escalates with evidence attached",
          detail: "Entities, hops, and source records in one view",
        },
      ],
      outcome:
        "The pattern that used to surface in a quarterly review surfaced in eighteen minutes, with its evidence already assembled.",
    },
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
            { label: "Akashic Insights", href: "/akashic#ask-ai" },
            { label: "Akashic BI", href: "/akashic#business-intelligence" },
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
    eyebrow: "Akashic for retail · Chains, brands & marketplaces",
    headlinePlain: "Know what sells.",
    headlineMarked: "Before it ships.",
    intro:
      "Demand shows up in your POS in real time and in your planning sheet three weeks later. Akashic connects sales, stock, and supply into one live picture, so the forecast runs on today's signal, not last month's export.",
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
    replay: {
      label: "Same promotion, on Akashic",
      intro:
        "Replay the same week with sales, stock, and supply on one live picture.",
      steps: [
        {
          time: "Mon 09:00",
          event: "Promotion spikes in the southern region",
          detail: "Sell-through visible per store as tills close each sale",
        },
        {
          time: "Mon 09:20",
          event: "Forecast updates on the live signal",
          detail: "Store-level stockout risk projected for Friday",
        },
        {
          time: "Mon 11:00",
          event: "Stock moves before the gap opens",
          detail: "Surplus at the northern DC routed to the stores that need it",
        },
        {
          time: "Fri 18:00",
          event: "Shelves full through the peak",
          detail: "No emergency freight. No markdown a month later",
        },
      ],
      outcome:
        "The promotion that used to end in empty shelves and a markdown ended in full shelves and a clean sell-through.",
    },
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
            { label: "Akashic Insights", href: "/akashic#ask-ai" },
            { label: "Akashic BI", href: "/akashic#business-intelligence" },
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
    eyebrow: "Akashic for education · Institutions & national programmes",
    headlinePlain: "Every learner.",
    headlineMarked: "One connected journey.",
    intro:
      "Akashic already runs inside India's national learning platform, connecting billions of learning interactions into decision-ready insight. The same foundation connects your campus: one governed journey from enrolment to placement.",
    heroFootnote:
      "Built for universities, school networks, and national education programmes · proven at population scale",
    problem: {
      label: "The invisible journey",
      title: "You can count enrolments. You can't see journeys.",
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
    replay: {
      label: "Same term, on Akashic",
      intro:
        "Replay the same term with every system that touches the learner on one record.",
      steps: [
        {
          time: "Week 2",
          event: "Attendance dips below the learner's own pattern",
          detail: "One signal, logged against one governed record",
        },
        {
          time: "Week 3",
          event: "Assessment slide joins the picture",
          detail: "The combination matches a known at-risk pattern",
        },
        {
          time: "Week 4",
          event: "Counsellor reaches out",
          detail: "A conversation in week four, not paperwork in week fourteen",
        },
        {
          time: "Term end",
          event: "Still enrolled. Back on pace",
          detail: "The intervention is now part of what the model knows",
        },
      ],
      outcome:
        "The drop-out that used to be discovered in a term-end report became a conversation in week four.",
    },
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
            { label: "Akashic Insights", href: "/akashic#ask-ai" },
            { label: "Akashic BI", href: "/akashic#business-intelligence" },
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
    replay: {
      label: "Same summer, on Akashic",
      intro:
        "Replay the same eleven days with the historian feeding the people who can act.",
      steps: [
        {
          time: "Day 1",
          event: "Thermal drift begins on the feeder",
          detail: "Streaming from SCADA into the governed foundation",
        },
        {
          time: "Day 2",
          event: "Drift flagged against this asset's history",
          detail: "Condition score drops. The transformer raises its hand",
        },
        {
          time: "Day 4",
          event: "Crew dispatched on condition",
          detail: "Work order carries the telemetry and the asset lineage",
        },
        {
          time: "Peak evening",
          event: "The feeder holds",
          detail: "No trip. No call centre. No post-mortem",
        },
      ],
      outcome:
        "The failure that used to be explained in a post-mortem was prevented by a work order on day four.",
    },
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
            { label: "Akashic Insights", href: "/akashic#ask-ai" },
            { label: "Akashic BI", href: "/akashic#business-intelligence" },
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
