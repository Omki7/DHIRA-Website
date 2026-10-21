"use client";

/* ------------------------------------------------------------------------
 * EXECUTIVE COMPARATIVE BENCHMARK — Section [02]: The Decision Gap.
 * Rebuilt from an abstract line diagram into an intuitive 3-way comparative
 * benchmark, inspired by ProblemSection and DivergentAnswers.
 * --------------------------------------------------------------------- */

interface Approach {
  num: string;
  category: string;
  name: string;
  badge: string;
  badgeTone: "late" | "unverified" | "governed";
  metric: string;
  metricLabel: string;
  workflow: string;
  consequence: string;
  verdict: string;
  isHero?: boolean;
}

const APPROACHES: Approach[] = [
  {
    num: "01",
    category: "TRADITIONAL REPORTING",
    name: "The Monthly Pack",
    badge: "17 Days Late",
    badgeTone: "late",
    metric: "Day 26",
    metricLabel: "End-of-month review meeting",
    workflow: "Data is manually extracted into spreadsheets weeks after month-end. Leadership reviews the figures after the reporting window shuts.",
    consequence: "Account renewal deadline expired 17 days earlier. Client churn is already locked in before the board packet is opened.",
    verdict: "Late Observation: Compounding revenue loss discovered only after margins have already eroded.",
  },
  {
    num: "02",
    category: "GENERIC AI CHATBOT",
    name: "Ungrounded Assistant",
    badge: "No Audit Trail",
    badgeTone: "unverified",
    metric: "4 Seconds",
    metricLabel: "Instant prompt response",
    workflow: "Runs ad-hoc queries against raw tables or vector embeddings. Lacks semantic definitions, row-level security, and system crosswalks.",
    consequence: "Generates plausible hallucinations with no data lineage or contract terms. No CFO or legal officer can defend or sign the output.",
    verdict: "Unusable Speed: Fast text with zero grounding produces zero executable executive decisions.",
  },
  {
    num: "03",
    category: "AKASHIC PLATFORM",
    name: "Akashic EIS",
    badge: "Same Morning",
    badgeTone: "governed",
    metric: "09:30 AM",
    metricLabel: "Within 30 minutes of event",
    workflow: "Autonomous agents correlate ERPNext aged receivables, Jira delivery slips, and Salesforce renewal dates on the live knowledge graph.",
    consequence: "Presents a verified intervention with quantified impact. Designated executive approves dual-key write-back with complete audit lineage.",
    verdict: "Decisive Action: Risk caught, verified, and resolved 18 days before the contract deadline expires.",
    isHero: true,
  },
];

export default function EisGapTimelineMockup() {
  return (
    <div className="overflow-hidden rounded-outer border border-line bg-background shadow-sm">
      {/* Real-World Scenario Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-lineSoft bg-primary-bg px-5 py-3.5 sm:px-7">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-red animate-pulse" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
            Scenario Benchmark · Northwind Insurance Renewal Exposure
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="text-secondary-text">Event: Invoice 74d overdue + Sponsor departure</span>
          <span className="rounded bg-red/10 border border-red/20 px-2 py-0.5 font-bold text-red">
            $180,000 ARR at Risk
          </span>
        </div>
      </div>

      {/* 3-Way Comparative Benchmark Cards */}
      <div className="grid grid-cols-1 divide-y divide-lineSoft lg:grid-cols-3 lg:divide-y-0 lg:divide-x">
        {APPROACHES.map((app) => (
          <div
            key={app.name}
            className={`flex flex-col justify-between p-6 sm:p-7 transition-colors ${
              app.isHero ? "bg-blue-subtle/30" : "bg-background"
            }`}
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold tracking-eyebrow uppercase text-tertiary-text">
                  {app.num} · {app.category}
                </span>
                <span
                  className={`rounded-[4px] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider border ${
                    app.badgeTone === "late"
                      ? "bg-red/10 border-red/20 text-red"
                      : app.badgeTone === "unverified"
                      ? "bg-yellow-500/10 border-yellow-500/25 text-yellow-700"
                      : "bg-positive-subtle border-positive-border text-positive"
                  }`}
                >
                  {app.badge}
                </span>
              </div>

              {/* Approach Title */}
              <h3 className="mt-3 text-[19px] font-semibold tracking-tight text-ink sm:text-[21px]">
                {app.name}
              </h3>

              {/* Speed Metric */}
              <div className="mt-4 rounded-card border border-lineSoft bg-background p-3.5">
                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-heading text-[28px] font-bold tracking-tight leading-none ${
                      app.badgeTone === "late"
                        ? "text-red"
                        : app.badgeTone === "unverified"
                        ? "text-yellow-600"
                        : "text-positive"
                    }`}
                  >
                    {app.metric}
                  </span>
                  <span className="font-mono text-[10px] text-tertiary-text uppercase">
                    Decision Horizon
                  </span>
                </div>
                <p className="mt-1.5 text-[11.5px] text-secondary-text leading-tight">
                  {app.metricLabel}
                </p>
              </div>

              {/* The Workflow */}
              <div className="mt-5 space-y-3 text-[13px] leading-relaxed">
                <div>
                  <span className="font-semibold text-ink block text-[11px] font-mono uppercase tracking-wider text-tertiary-text mb-1">
                    How it Operates:
                  </span>
                  <p className="text-secondary-text">{app.workflow}</p>
                </div>

                <div>
                  <span className="font-semibold text-ink block text-[11px] font-mono uppercase tracking-wider text-tertiary-text mb-1">
                    The Outcome:
                  </span>
                  <p className="text-secondary-text">{app.consequence}</p>
                </div>
              </div>
            </div>

            {/* Verdict Box */}
            <div
              className={`mt-6 rounded border p-3 text-[12px] leading-snug ${
                app.isHero
                  ? "border-blue-border bg-blue-subtle text-ink font-medium"
                  : "border-card-line bg-primary-bg text-secondary-text"
              }`}
            >
              <span className="font-semibold block text-ink mb-0.5">
                {app.isHero ? "Executive Advantage:" : "The Failure Mode:"}
              </span>
              {app.verdict}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Benchmark Takeaway */}
      <div className="border-t border-lineSoft bg-primary-bg px-5 py-3 sm:px-7 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-tertiary-text">
        <span>Benchmark: Contract renewal notice deadline at Day 9</span>
        <span className="text-ink font-semibold">
          Decision Runway: Reduced from 26 days to same-morning execution
        </span>
      </div>
    </div>
  );
}
