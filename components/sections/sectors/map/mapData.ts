/*
 * Scene + story data for the six sector maps (SectorMap / SectorMapScene).
 * All scenes share one composition skeleton (slots A–E around the Akashic
 * plate, console top-right) so routes and quality stay consistent, while
 * every sector gets its own players, labels, story steps, and alert moment.
 * Figures inside alerts/labels are simulated product UI (§8a), not claims.
 */

export type Slot = "A" | "B" | "C" | "D" | "E";

export type BuildingType =
  | "tower"
  | "block"
  | "stack"
  | "shed"
  | "unit"
  | "mast"
  | "homes"
  | "pylons"
  | "console";

export type Building = {
  type: BuildingType;
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  group: 1 | 2 | 3;
  slot?: Slot;
  label?: [string, string?];
  labelAt?: [number, number];
};

export type MapStep = { tag: string; title: string; body: string };

export type MapScene = {
  eyebrow: string;
  noun: string;
  buildings: Building[];
  alert: { x: number; y: number; w: number; text: string; tick: [number, number, number, number] };
  steps: [MapStep, MapStep, MapStep, MapStep];
};

/* shared flow routes (skeleton positions are identical across scenes) */
export const ROUTES: Record<Slot, string> = {
  A: "M 190 340 Q 310 440 442 480",
  B: "M 300 405 Q 380 450 474 470",
  C: "M 408 318 Q 435 400 502 455",
  D: "M 640 300 Q 600 390 556 462",
  E: "M 790 435 Q 690 480 588 460",
};
export const RETURN_ROUTE = "M 548 442 Q 680 350 870 264";

const CONSOLE: Omit<Building, "label" | "labelAt"> = {
  type: "console",
  x: 880,
  y: 270,
  w: 54,
  d: 34,
  h: 24,
  group: 3,
};

export const MAP_SCENES: Record<string, MapScene> = {
  manufacturing: {
    eyebrow: "YOUR PLANT, MAPPED",
    noun: "plant",
    buildings: [
      { ...CONSOLE, label: ["Boardroom", "live answers"], labelAt: [878, 296] },
      { type: "shed", x: 590, y: 275, w: 120, d: 80, h: 56, group: 2, slot: "D", label: ["Warehouse", "WMS · movements"], labelAt: [655, 300] },
      { type: "unit", x: 400, y: 310, w: 26, d: 20, h: 34, group: 1, slot: "C", label: ["MES"], labelAt: [432, 316] },
      { type: "mast", x: 95, y: 385, w: 8, d: 8, h: 74, group: 1 },
      { type: "stack", x: 150, y: 330, w: 70, d: 50, h: 56, group: 1, slot: "A", label: ["The line", "machines · SCADA"], labelAt: [140, 352] },
      { type: "block", x: 285, y: 400, w: 64, d: 46, h: 46, group: 1, slot: "B", label: ["Station three", "seal head"], labelAt: [300, 422] },
      { type: "tower", x: 770, y: 430, w: 62, d: 50, h: 108, group: 2, slot: "E", label: ["Enterprise", "ERP · QMS · planning"], labelAt: [800, 452] },
    ],
    alert: { x: 226, y: 246, w: 152, text: "Drift flagged · ST-03", tick: [302, 272, 302, 300] },
    steps: [
      {
        tag: "The players",
        title: "Every player is already on the field.",
        body: "Machines, sensors, MES, warehouse, ERP, boardroom: your plant has all of them today. They just don't share a truth.",
      },
      {
        tag: "The floor speaks",
        title: "The line starts streaming.",
        body: "Torque, vibration, counts, states: every signal lands on the governed foundation the moment it happens, not at month end.",
      },
      {
        tag: "The enterprise joins",
        title: "Floor and ledger, one record.",
        body: "Warehouse movements, ERP orders, and quality results resolve against the same batches and machines. One genealogy.",
      },
      {
        tag: "Answers flow back",
        title: "The boardroom sees the floor. Live.",
        body: "The drift on station three is flagged, the work order is raised, and leadership watches the same line the shift does.",
      },
    ],
  },

  healthcare: {
    eyebrow: "YOUR HOSPITAL, MAPPED",
    noun: "hospital",
    buildings: [
      { ...CONSOLE, label: ["Point of care", "one record on screen"], labelAt: [878, 296] },
      { type: "shed", x: 590, y: 275, w: 120, d: 80, h: 56, group: 2, slot: "D", label: ["Insurer", "claims archive"], labelAt: [655, 300] },
      { type: "unit", x: 400, y: 310, w: 26, d: 20, h: 34, group: 1, slot: "C", label: ["Imaging · PACS"], labelAt: [432, 316] },
      { type: "tower", x: 150, y: 330, w: 80, d: 60, h: 100, group: 1, slot: "A", label: ["Wards", "HIS · admissions"], labelAt: [140, 352] },
      { type: "block", x: 285, y: 400, w: 64, d: 46, h: 46, group: 1, slot: "B", label: ["Laboratory", "LIS · results"], labelAt: [300, 422] },
      { type: "tower", x: 770, y: 430, w: 62, d: 50, h: 108, group: 2, slot: "E", label: ["Pharmacy & billing", "stock · invoices"], labelAt: [800, 452] },
    ],
    alert: { x: 85, y: 116, w: 150, text: "Full history · 02:05", tick: [160, 142, 160, 168] },
    steps: [
      {
        tag: "The players",
        title: "Every system holds a piece of the patient.",
        body: "Wards, labs, imaging, pharmacy, the insurer: each keeps its own version of the person. None of them agree.",
      },
      {
        tag: "The systems speak",
        title: "Every record starts streaming.",
        body: "Admissions, results, scans, and claims land on the governed foundation as they're written, not when someone exports them.",
      },
      {
        tag: "One patient forms",
        title: "Three registrations. One person.",
        body: "Master data resolves duplicate identities into one longitudinal record, with consent and masking enforced by the platform.",
      },
      {
        tag: "Care answers back",
        title: "The full history reaches the bedside.",
        body: "The 2 a.m. clinician sees everything, with sources attached. The patient tells their story once.",
      },
    ],
  },

  finance: {
    eyebrow: "YOUR BANK, MAPPED",
    noun: "bank",
    buildings: [
      { ...CONSOLE, label: ["Risk desk", "evidence attached"], labelAt: [878, 296] },
      { type: "shed", x: 590, y: 275, w: 120, d: 80, h: 56, group: 2, slot: "D", label: ["KYC registry", "four names, one person"], labelAt: [655, 300] },
      { type: "unit", x: 400, y: 310, w: 26, d: 20, h: 34, group: 1, slot: "C", label: ["Payments · UPI"], labelAt: [432, 316] },
      { type: "tower", x: 150, y: 330, w: 80, d: 60, h: 100, group: 1, slot: "A", label: ["Core banking", "accounts · transfers"], labelAt: [140, 352] },
      { type: "block", x: 285, y: 400, w: 64, d: 46, h: 46, group: 1, slot: "B", label: ["Cards", "issuing · switches"], labelAt: [300, 422] },
      { type: "tower", x: 770, y: 430, w: 62, d: 50, h: 108, group: 2, slot: "E", label: ["Lending", "loans · exposure"], labelAt: [800, 452] },
    ],
    alert: { x: 226, y: 246, w: 158, text: "Chain flagged · 3 hops", tick: [302, 272, 302, 300] },
    steps: [
      {
        tag: "The players",
        title: "Every channel watches alone.",
        body: "Core banking, cards, payments, KYC, lending: each runs its own surveillance. A chain that spans them is invisible to all of them.",
      },
      {
        tag: "Transactions stream",
        title: "Every hop lands on one graph.",
        body: "Card swipes, UPI transfers, and account movements stream in as they clear, not in tomorrow's batch file.",
      },
      {
        tag: "Identities resolve",
        title: "Four names. One entity.",
        body: "Near-identical KYC records resolve into one customer, and the chain of small transfers suddenly has a single owner.",
      },
      {
        tag: "The desk sees it",
        title: "Flagged as it forms. Evidence attached.",
        body: "The pattern reaches the risk desk in minutes, with entities, hops, and source records already assembled.",
      },
    ],
  },

  retail: {
    eyebrow: "YOUR CHAIN, MAPPED",
    noun: "chain",
    buildings: [
      { ...CONSOLE, label: ["Planner", "live sell-through"], labelAt: [878, 296] },
      { type: "shed", x: 590, y: 275, w: 130, d: 84, h: 58, group: 2, slot: "D", label: ["Distribution centre", "WMS · in-transit"], labelAt: [660, 302] },
      { type: "unit", x: 400, y: 310, w: 26, d: 20, h: 34, group: 1, slot: "C", label: ["E-commerce"], labelAt: [432, 316] },
      { type: "homes", x: 130, y: 340, w: 36, d: 28, h: 22, group: 1, slot: "A", label: ["Stores", "POS · tills"], labelAt: [140, 362] },
      { type: "block", x: 285, y: 400, w: 64, d: 46, h: 46, group: 1, slot: "B", label: ["Backrooms", "store stock"], labelAt: [300, 422] },
      { type: "tower", x: 770, y: 430, w: 62, d: 50, h: 108, group: 2, slot: "E", label: ["HQ", "ERP · planning"], labelAt: [800, 452] },
    ],
    alert: { x: 72, y: 236, w: 178, text: "Stockout Friday · Store 114", tick: [162, 262, 162, 288] },
    steps: [
      {
        tag: "The players",
        title: "Every link keeps its own count.",
        body: "Stores, e-commerce, the DC, logistics, HQ planning: each holds its own number for the same product.",
      },
      {
        tag: "Tills stream",
        title: "Every sale is a live signal.",
        body: "POS and e-commerce sales stream in as tills close, not through Monday's export.",
      },
      {
        tag: "Stock resolves",
        title: "One picture, DC to shelf.",
        body: "Warehouse, in-transit, and backroom stock resolve into one live position per SKU, per store.",
      },
      {
        tag: "The gap closes",
        title: "Stock moves before the shelf empties.",
        body: "The Friday stockout is projected on Monday morning, and 240 units are already on the road.",
      },
    ],
  },

  education: {
    eyebrow: "YOUR CAMPUS, MAPPED",
    noun: "campus",
    buildings: [
      { ...CONSOLE, label: ["Counsellor", "sees the journey"], labelAt: [878, 296] },
      { type: "shed", x: 590, y: 275, w: 120, d: 80, h: 56, group: 2, slot: "D", label: ["Hostel & fees", "residence · payments"], labelAt: [655, 300] },
      { type: "unit", x: 400, y: 310, w: 26, d: 20, h: 34, group: 1, slot: "C", label: ["Assessment"], labelAt: [432, 316] },
      { type: "tower", x: 150, y: 330, w: 80, d: 60, h: 100, group: 1, slot: "A", label: ["Admissions", "SIS · enrolment"], labelAt: [140, 352] },
      { type: "block", x: 285, y: 400, w: 64, d: 46, h: 46, group: 1, slot: "B", label: ["Classrooms", "LMS · attendance"], labelAt: [300, 422] },
      { type: "tower", x: 770, y: 430, w: 62, d: 50, h: 108, group: 2, slot: "E", label: ["Placement cell", "outcomes · offers"], labelAt: [800, 452] },
    ],
    alert: { x: 226, y: 246, w: 156, text: "Flagged early · Week 4", tick: [302, 272, 302, 300] },
    steps: [
      {
        tag: "The players",
        title: "Every office holds a slice of the learner.",
        body: "Admissions, classrooms, assessment, hostel, placement: five systems, five versions of the same student.",
      },
      {
        tag: "Signals stream",
        title: "The journey starts writing itself.",
        body: "Attendance, scores, and fee events land on one governed record as they happen, all term long.",
      },
      {
        tag: "One learner forms",
        title: "Rows become a journey.",
        body: "Master data resolves every system's entries into one record per learner, visible role by role.",
      },
      {
        tag: "Someone sees it coming",
        title: "A conversation in week four.",
        body: "The at-risk pattern is flagged with a term to spare, and the counsellor reaches out before any exit paperwork exists.",
      },
    ],
  },

  energy: {
    eyebrow: "YOUR GRID, MAPPED",
    noun: "grid",
    buildings: [
      { ...CONSOLE, label: ["Control room", "sees it coming"], labelAt: [878, 296] },
      { type: "shed", x: 590, y: 275, w: 120, d: 80, h: 56, group: 2, slot: "D", label: ["Historian", "years of telemetry"], labelAt: [655, 300] },
      { type: "homes", x: 395, y: 315, w: 30, d: 24, h: 18, group: 1, slot: "C", label: ["Meters · AMI"], labelAt: [438, 320] },
      { type: "pylons", x: 120, y: 330, w: 0, d: 0, h: 78, group: 1, slot: "A", label: ["Feeders", "SCADA · load"], labelAt: [150, 352] },
      { type: "block", x: 285, y: 400, w: 64, d: 46, h: 46, group: 1, slot: "B", label: ["Substation", "TX-042"], labelAt: [300, 422] },
      { type: "tower", x: 770, y: 430, w: 62, d: 50, h: 108, group: 2, slot: "E", label: ["Asset register", "GIS · inspections"], labelAt: [800, 452] },
    ],
    alert: { x: 226, y: 246, w: 158, text: "Thermal drift · TX-042", tick: [302, 272, 302, 300] },
    steps: [
      {
        tag: "The players",
        title: "The grid already reports everything.",
        body: "Feeders, substations, meters, the historian, the asset register: the signals exist. Nobody is listening to all of them at once.",
      },
      {
        tag: "Telemetry streams",
        title: "The historian comes alive.",
        body: "SCADA and metering stream onto the governed foundation, joined to weather and outage events in real time.",
      },
      {
        tag: "Assets resolve",
        title: "Every asset carries its history.",
        body: "Live telemetry links to inspection records and lineage, so condition is judged per asset, not per calendar.",
      },
      {
        tag: "The room sees it coming",
        title: "Dispatched before the trip.",
        body: "The thermal drift on TX-042 raises a work order on day two. Peak evening passes without a single call.",
      },
    ],
  },
};
