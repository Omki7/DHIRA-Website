/* SIMULATED PRODUCT UI: part of EisCommandCentreMockup (see its banner).
   The sample business behind the five role cockpits. Every figure here is
   demonstration data for an unnamed services firm. */

export type RoleId = "ceo" | "finance" | "sales" | "delivery" | "hr";

export interface RoleConfig {
  id: RoleId;
  label: string;
  initials: string;
  title: string;
  caption: string;
  kpis: { label: string; value: string; note: string; tone?: "positive" | "negative" | "neutral" }[];
  preview: {
    title: string;
    badge: string;
    meta: string;
    items: { label: string; value: string; sub: string; status?: "ok" | "warn" | "bad" }[];
  };
}

export const ROLES: RoleConfig[] = [
  {
    id: "ceo",
    label: "CEO",
    initials: "DH",
    title: "Chief executive cockpit",
    caption: "Know where the enterprise lands this year, every hour. Real-time EBITDA, cash runway and prioritised risks.",
    kpis: [
      { label: "FY Revenue Outlook", value: "$11.4M", note: "Plan $10.8M · +$600K ahead", tone: "positive" },
      { label: "FY EBITDA Margin", value: "19.4%", note: "Target 17.0% · +2.4 pts", tone: "positive" },
      { label: "Overdue Receivables", value: "$392K", note: "of $1.1M open · DSO 58d", tone: "negative" },
    ],
    preview: {
      title: "Top enterprise exposure",
      badge: "Priority 01",
      meta: "Triangulated across ERPNext + Salesforce",
      items: [
        { label: "Northwind Insurance", value: "$180K ARR", sub: "74-day overdue invoice · VP Claims sponsor departure", status: "bad" },
        { label: "Project P-104 (Claims Engine)", value: "19% Margin", sub: "3 weeks behind schedule · CR-07 scope dispute", status: "warn" },
        { label: "Civic Digital Kickoff", value: "8 Engineers", sub: "Kickoff in 14 days · Bench deployment plan ready", status: "ok" },
      ],
    },
  },
  {
    id: "finance",
    label: "Finance",
    initials: "NP",
    title: "Finance cockpit",
    caption: "Rolling 12-month P&L, aged receivables, and cash conversion without waiting for end-of-month reconciliations.",
    kpis: [
      { label: "Rolling 12M Revenue", value: "$11.2M", note: "Oct 26 – Sep 27 model", tone: "neutral" },
      { label: "Overdue Receivables", value: "$392K", note: "DSO 58d · Target <45d", tone: "negative" },
      { label: "Net Cash Runway", value: "14.2 Mo", note: "Current burn $142K/mo", tone: "positive" },
    ],
    preview: {
      title: "Aged receivables by tier",
      badge: "Real-time Ledger",
      meta: "ERPNext Accounts sync · 2 min ago",
      items: [
        { label: "Northwind Insurance (Inv #8942)", value: "$118,000", sub: "74 days past due · Sponsor contact held", status: "bad" },
        { label: "Hanseatic Holdings (Inv #8911)", value: "$94,000", sub: "48 days past due · Expected 28 Oct", status: "warn" },
        { label: "Lumen Bank Corp (Inv #8890)", value: "$62,000", sub: "Current · Net-30 payment scheduled", status: "ok" },
      ],
    },
  },
  {
    id: "sales",
    label: "Sales",
    initials: "RS",
    title: "Sales cockpit",
    caption: "Pipeline health, deal velocity, and account expansion signals correlated with engineering delivery health.",
    kpis: [
      { label: "Weighted Pipeline", value: "$1.1M", note: "9 open deals · $2.4M unweighted", tone: "neutral" },
      { label: "Net Revenue Retention", value: "118%", note: "Target 115% · Strong expansion", tone: "positive" },
      { label: "Contracts at Risk", value: "$240K", note: "2 accounts under renewal watch", tone: "negative" },
    ],
    preview: {
      title: "Account health and renewals",
      badge: "CRM + Delivery",
      meta: "Salesforce + Jira sync · 1 min ago",
      items: [
        { label: "Lumen Bank Corp", value: "$312K ARR", sub: "Health 84/100 · Expansion opportunity $90K", status: "ok" },
        { label: "Meridian Health", value: "$264K ARR", sub: "Health 88/100 · UAT milestone approved", status: "ok" },
        { label: "Northwind Insurance", value: "$180K ARR", sub: "Health 46/100 · Renewal due in 18 days", status: "bad" },
      ],
    },
  },
  {
    id: "delivery",
    label: "Delivery",
    initials: "AM",
    title: "Delivery cockpit",
    caption: "Project RAG status, fixed-price budget burn, and engineering allocation across all active client engagements.",
    kpis: [
      { label: "Active Engagements", value: "14", note: "9 on track · 3 watch · 2 at risk", tone: "neutral" },
      { label: "Delivery Margin MTD", value: "36.8%", note: "Target 35.0% · +1.8 pts", tone: "positive" },
      { label: "Unbilled Milestones", value: "$210K", note: "2 milestones pending client sign-off", tone: "negative" },
    ],
    preview: {
      title: "Project health and margin",
      badge: "Jira + ERP",
      meta: "Sprint velocity & budget burn",
      items: [
        { label: "P-101 · Risk Data Hub (Lumen)", value: "41% Margin", sub: "Build phase · Milestone 3 delivered on plan", status: "ok" },
        { label: "P-103 · Cancer Care CDSS (Meridian)", value: "38% Margin", sub: "UAT phase · Client review underway", status: "warn" },
        { label: "P-104 · Claims Intelligence (Northwind)", value: "19% Margin", sub: "Build phase · 18% over budget; CR-07 dispute", status: "bad" },
      ],
    },
  },
  {
    id: "hr",
    label: "People",
    initials: "RK",
    title: "People cockpit",
    caption: "Billable utilisation, bench allocation costs, and flight risks cross-referenced with upcoming project kickoffs.",
    kpis: [
      { label: "Total Headcount", value: "96", note: "89 technical · 7 G&A", tone: "neutral" },
      { label: "Utilisation MTD", value: "82%", note: "Target 80% · 9 on bench", tone: "positive" },
      { label: "Bench Holding Cost", value: "$29.7K", note: "Per month · 6 match upcoming kickoffs", tone: "negative" },
    ],
    preview: {
      title: "Workforce allocation and readiness",
      badge: "Workday Sync",
      meta: "HRMS + Delivery staffing plan",
      items: [
        { label: "Civic Digital Kickoff (20 Oct)", value: "8 Needed", sub: "6 bench engineers matched · 2 reallocated", status: "ok" },
        { label: "Critical Flight Risks", value: "3 Staff", sub: "Lead architect on P-104 flagged · Compensation review", status: "bad" },
        { label: "Engineering Bench", value: "9 Staff", sub: "Average bench duration 18 days (industry 32d)", status: "warn" },
      ],
    },
  },
];
