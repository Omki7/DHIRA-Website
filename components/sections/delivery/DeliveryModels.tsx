"use client";

/*
 * [01] Ways to Work with Dhira — One partner. Multiple ways to move forward.
 * Architectural split layout: sticky orientation on the left, clean ruled directory on the right.
 * Avoids generic boxy card grids; emphasizes typographic precision and clear engagement models.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface OfferingRow {
  num: string;
  category: "Platform" | "Engineering";
  title: string;
  tagline: string;
  desc: string;
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
}

const offerings: OfferingRow[] = [
  {
    num: "01",
    category: "Platform",
    title: "Akashic SaaS",
    tagline: "Ready-to-use platform instance",
    desc: "Deploy Akashic as a managed SaaS environment. We handle the data pipelines, governance layer, and continuous platform infrastructure.",
    deliverables: ["Managed sovereign cloud instance", "Pre-built connectors & pipelines", "Enterprise SLAs & automated maintenance"],
    ctaLabel: "Explore Akashic SaaS",
    ctaHref: "/akashic",
  },
  {
    num: "02",
    category: "Platform",
    title: "Akashic White Label",
    tagline: "Dedicated deployment under your brand",
    desc: "Deploy the Akashic platform within your own enterprise ecosystem, fully branded and customized for your internal or external users.",
    deliverables: ["Custom branding & UI integration", "Dedicated tenant security architecture", "Tailored API & ecosystem integrations"],
    ctaLabel: "Discuss White Label",
    ctaHref: "#talk-to-our-team",
  },
  {
    num: "03",
    category: "Engineering",
    title: "Custom Technology Services",
    tagline: "Solutions built around your specific requirements",
    desc: "Engage our engineering teams for initiatives outside Akashic: AI applications, data infrastructure, custom software, and system modernisation.",
    deliverables: ["End-to-end architecture & delivery", "Custom data & AI pipelines", "100% sovereign code ownership"],
    ctaLabel: "View Capabilities",
    ctaHref: "#capabilities",
  },
  {
    num: "04",
    category: "Engineering",
    title: "Product Engineering",
    tagline: "Build, modernize, and scale products",
    desc: "Partner with a dedicated engineering team to build new software products from the ground up or modernize legacy enterprise systems.",
    deliverables: ["Full-lifecycle product delivery", "Sprint-based milestone execution", "Production-grade QA & security"],
    ctaLabel: "Review Process",
    ctaHref: "#methodology",
  },
  {
    num: "05",
    category: "Engineering",
    title: "Staff Augmentation",
    tagline: "Extend your engineering capacity",
    desc: "Embed senior AI, data, cloud, and software engineers directly into your existing agile squads to accelerate delivery.",
    deliverables: ["Senior architects & engineers", "Seamless sprint integration", "Flexible engagement duration"],
    ctaLabel: "Request Engineers",
    ctaHref: "#talk-to-our-team",
  },
];

export default function DeliveryModels() {
  return (
    <section
      id="engagement-models"
      className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <span id="akashic-deployment" className="absolute -top-24" aria-hidden />
      <span id="product-engineering" className="absolute -top-24" aria-hidden />
      <span id="advisory-co-engineering" className="absolute -top-24" aria-hidden />

      <ScrollRevealRail>
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Ways to work with Dhira</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Five engagement options</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            One partner. Multiple ways to move forward.
          </h2>
          <p className="mt-5 max-w-[44em] text-lg leading-relaxed text-secondary-text">
            Choose the engagement model that fits your business, your team, and your technical goals. We support each path with the same standard of engineering quality and accountability.
          </p>
        </ScrollReveal>

        {/* Editorial Split Directory (Zero Box-in-a-Box Clutter) */}
        <div className="mt-12 border-t border-subtle-stroke lg:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-16">
            {/* Left Column: Context / Track Guide */}
            <div className="pt-8 lg:sticky lg:top-28 lg:self-start lg:pt-10">
              <div className="border-l-2 border-blue pl-5">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-blue">
                  Flexible Engagement Structure
                </p>
                <p className="mt-3 text-[16.5px] font-medium leading-snug text-ink">
                  Adopt a proven product, build custom software, or extend your existing team.
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-secondary-text">
                  You don&rsquo;t have to force your requirement into a rigid consulting model. Every engagement gives you direct access to experienced engineers with clear milestones.
                </p>
              </div>

              <div className="mt-8 space-y-3 font-mono text-[11.5px]">
                <div className="flex items-center gap-3 text-ink">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-subtle font-bold text-blue">
                    01-02
                  </span>
                  <span>Platform Track &middot; Akashic SaaS &amp; White Label</span>
                </div>
                <div className="flex items-center gap-3 text-ink">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-tertiary-bg font-bold text-inkSoft">
                    03-05
                  </span>
                  <span>Engineering Track &middot; Custom Services &amp; Squads</span>
                </div>
              </div>
            </div>

            {/* Right Column: Ruled Directory Rows */}
            <div className="divide-y divide-subtle-stroke">
              {offerings.map((item, idx) => (
                <ScrollReveal key={item.num} delay={80 + idx * 50}>
                  <div className="py-8 transition-colors duration-250 ease-settle hover:bg-primary-bg/30 lg:py-9">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-[12px] font-bold text-blue">
                          {item.num}
                        </span>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-[20px] font-semibold tracking-tight text-ink md:text-[22px]">
                              {item.title}
                            </h3>
                            <span className="rounded bg-tertiary-bg px-2 py-0.5 font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft">
                              {item.category}
                            </span>
                          </div>
                          <p className="mt-1 text-[13.5px] font-medium text-blue">
                            {item.tagline}
                          </p>
                          <p className="mt-2.5 max-w-[36em] text-[14.5px] leading-relaxed text-secondary-text">
                            {item.desc}
                          </p>

                          {/* Concrete deliverables list */}
                          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px] text-inkSoft">
                            {item.deliverables.map((d) => (
                              <span key={d} className="flex items-center gap-1.5">
                                <span className="h-1 w-1 rounded-full bg-blue" />
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 shrink-0 md:mt-0">
                        <Link
                          href={item.ctaHref}
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-blue transition-colors hover:text-blue-hover"
                        >
                          <span>{item.ctaLabel}</span>
                          <span>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
