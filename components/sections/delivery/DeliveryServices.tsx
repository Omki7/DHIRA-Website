"use client";

/*
 * [01] Services: Advise. Engineer. Deploy.
 * The founder's three service lines (DHIRA_ai_Website_v2, 12 Oct 2026). The
 * nav's Services menu links each one here (#advisory, #engineering,
 * #ai-solutions), so keep those ids. Hairline-ruled columns rather than
 * cards (Rule 1), plain bullets and no checkmarks (Rule 2). Agentic
 * workflows carry the Preview mark: agents ship in preview. The founder's
 * "in weeks" promise is left out until it is confirmed (the site carries no
 * unconfirmed timeline).
 */

import PreviewTag from "@/components/ui/PreviewTag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

type ServiceLine = {
  id: string;
  verb: string;
  number: string;
  title: string;
  description: string;
  items: { label: string; preview?: boolean }[];
};

const SERVICE_LINES: ServiceLine[] = [
  {
    id: "advisory",
    verb: "Advise",
    number: "01",
    title: "Strategic Advisory",
    description:
      "Assess your data and AI readiness, prioritise high-value use cases and build a phased roadmap with ROI attached.",
    items: [{ label: "AI readiness" }, { label: "Use-case prioritisation" }, { label: "Roadmaps" }, { label: "Adoption and change" }],
  },
  {
    id: "engineering",
    verb: "Engineer",
    number: "02",
    title: "Engineering @Scale",
    description:
      "Architect, build, integrate, deploy and operate secure, modular data and AI systems at enterprise scale.",
    items: [
      { label: "Data pipelines" },
      { label: "Real-time analytics" },
      { label: "Cloud and data migration" },
      { label: "Product engineering" },
      { label: "Strategic resourcing" },
    ],
  },
  {
    id: "ai-solutions",
    verb: "Deploy",
    number: "03",
    title: "AI Solutions & Accelerators",
    description:
      "Semantic layers, knowledge assistants and governed workflows on Akashic, taken from pilot to production.",
    items: [
      { label: "Knowledge assistants" },
      { label: "Agentic workflows", preview: true },
      { label: "Governance and audit" },
      { label: "Ready-to-use solutions" },
    ],
  },
];

export default function DeliveryServices() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;What we do</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Three service lines</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Advise. Engineer. Deploy.
          </h2>
          <p className="mt-4 max-w-[42em] text-base leading-relaxed text-secondary-text md:text-lg">
            One partner, accountable for outcomes. We take you from strategy to measurable results on Akashic,
            owning delivery end to end and augmenting the systems you already run.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 border-t border-lineSoft md:grid-cols-3">
          {SERVICE_LINES.map((line, index) => (
            <ScrollReveal key={line.id} delay={index * 80} className="h-full">
              <article
                id={line.id}
                className={`h-full scroll-mt-28 py-8 md:py-10 ${
                  index === 0 ? "md:pr-8" : "border-t border-lineSoft md:border-l md:border-t-0 md:px-8"
                }`}
              >
                <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-eyebrow">
                  <span className="text-ink">{line.verb}</span>
                  <span className="text-overcast">{line.number}</span>
                </p>
                <h3 className="mt-5 text-[24px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[28px]">
                  {line.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary-text">{line.description}</p>
                <ul className="mt-6 space-y-2.5 border-t border-dashed border-lineSoft pt-5">
                  {line.items.map((item) => (
                    <li key={item.label} className="flex items-center gap-3 text-[14px] text-ink">
                      <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-blue" />
                      {item.label}
                      {item.preview && <PreviewTag />}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
