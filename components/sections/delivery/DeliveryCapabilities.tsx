/*
 * [02] Capabilities — Akashic is our product. Our engineering capabilities go beyond it.
 * Precision hairline matrix presenting engineering capabilities without AI buzzwords or floating box grids.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface CapabilityArea {
  num: string;
  title: string;
  scope: string;
  deliverables: string;
}

const capabilities: CapabilityArea[] = [
  {
    num: "01",
    title: "AI & Machine Learning",
    scope: "Domain-specific AI applications, automated document processing, classification models, and predictive workflows.",
    deliverables: "Model integration, LLM fine-tuning, inference pipelines, and evaluation harnesses.",
  },
  {
    num: "02",
    title: "Data Platforms & Pipelines",
    scope: "High-throughput streaming, batch ETL/ELT pipelines, master data management, and lakehouse storage.",
    deliverables: "Data ingestion frameworks, schema registries, validation layers, and governance pipelines.",
  },
  {
    num: "03",
    title: "Business Intelligence & Analytics",
    scope: "Enterprise dashboards, automated operational reports, self-service analytics, and embedded intelligence.",
    deliverables: "Semantic data models, query optimisation, report automation, and executive dashboards.",
  },
  {
    num: "04",
    title: "Cloud & Sovereign Infrastructure",
    scope: "Multi-cloud architecture, sovereign on-premise deployments, Kubernetes container orchestration, and IaC.",
    deliverables: "Terraform automation, CI/CD pipelines, zero-trust network policies, and observability stacks.",
  },
  {
    num: "05",
    title: "Custom Software Systems",
    scope: "Bespoke backend APIs, mission-critical workflow systems, and secure integrations with legacy software.",
    deliverables: "Microservice architectures, database optimization, transactional consistency, and public/private APIs.",
  },
  {
    num: "06",
    title: "Product Engineering & Modernisation",
    scope: "Full-lifecycle software product development, technical refactoring, performance scaling, and cloud migration.",
    deliverables: "Product architecture, sprint execution, automated testing, and continuous deployment.",
  },
];

export default function DeliveryCapabilities() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[02]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Beyond the platform</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Clarifying Akashic&rsquo;s role</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Akashic is our product.
            <br />
            Our engineering capabilities go beyond it.
          </h2>
          <p className="mt-5 max-w-[44em] text-lg leading-relaxed text-secondary-text">
            Akashic is one way to work with Dhira. When your technical needs fall outside the platform, our engineering teams design, build, and maintain custom solutions around your existing stack.
          </p>
        </ScrollReveal>

        {/* Editorial Principle Rule Banner */}
        <ScrollReveal delay={80}>
          <div className="mt-8 border-l-2 border-blue bg-primary-bg/50 p-4 pl-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-eyebrow text-blue">
              Core Engineering Principle
            </p>
            <p className="mt-1 text-[15.5px] font-semibold text-ink md:text-[16.5px]">
              The right technology should follow the requirement: not the other way around.
            </p>
            <p className="mt-1 text-[13.5px] text-secondary-text">
              We select the technology based on the problem, your existing environment, and the outcome you need to achieve.
            </p>
          </div>
        </ScrollReveal>

        {/* 6-Cell Hairline Capability Matrix (No Floating Box Grid) */}
        <ScrollReveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-tile border border-subtle-stroke bg-white shadow-sm lg:mt-16">
            <div className="grid grid-cols-1 divide-y divide-subtle-stroke md:grid-cols-2 md:divide-y md:divide-x lg:grid-cols-3">
              {capabilities.map((c) => (
                <div
                  key={c.num}
                  className="flex flex-col justify-between p-6 transition-colors duration-200 hover:bg-primary-bg/40 lg:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-dashed border-lineSoft pb-3">
                      <span className="font-mono text-[11px] font-bold text-blue">
                        {c.num}
                      </span>
                      <span className="font-mono text-[9.5px] uppercase tracking-eyebrow text-inkSoft">
                        Engineering Domain
                      </span>
                    </div>

                    <h3 className="mt-4 text-[18px] font-semibold tracking-tight text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-secondary-text">
                      {c.scope}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-dashed border-lineSoft pt-3">
                    <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                      Deliverables
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium text-inkSoft leading-snug">
                      {c.deliverables}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
