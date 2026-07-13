/*
 * [02] Working Here — The Honest Version.
 * Candidate-lens culture section (rewritten Jul 2026): the published
 * principles translated into what they mean for the person joining. No
 * invented perks — specifics are pointed at the intro call, on purpose
 * (Rule 4 applied to our own careers page).
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const culture = [
  {
    num: "W-01",
    title: "You ship real things, early.",
    line: "A small team has no bench of observers. Your work lands in production systems that a country depends on, within your first weeks.",
  },
  {
    num: "W-02",
    title: "Outcomes over hours.",
    line: "We measure by whether the answer is trusted, not by time logged. That is a written principle, and it applies inside the team too.",
  },
  {
    num: "W-03",
    title: "An open stack that travels with you.",
    line: "We build on open technologies. The skills you sharpen here are inspectable, swappable, and yours to keep.",
  },
  {
    num: "W-04",
    title: "Straight answers, both directions.",
    line: "Clear yes or no, with reasons: in hiring, in reviews, in daily work. We tell the truth. It is written down.",
  },
  {
    num: "W-05",
    title: "Work where you work best.",
    line: "New York, Hyderabad, Bangalore, and remote. The team already ships across three time zones.",
  },
  {
    num: "W-06",
    title: "No throwaway projects, no throwaway teams.",
    line: "We build systems meant to outlive budget cycles, and we staff them like it. Long-term is the whole point.",
  },
];

export default function CareersCulture() {
  return (
    <section id="how-we-work" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-32">
            <ScrollReveal>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow">
                <span className="text-overcast">[02]</span>
                <span className="text-inkSoft">&nbsp;&nbsp;Working here</span>
              </p>
              <h2 className="mt-5 text-heading-sm font-semibold leading-[1.05] tracking-tighter text-ink md:text-heading-md">
                What it&rsquo;s like to work here.
              </h2>
              <p className="mt-6 max-w-[26em] text-lg leading-relaxed text-inkSoft">
                We publish the principles we hold clients to. The culture is those
                same principles, applied to the people who work here.
              </p>
              <div className="mt-8 rounded-card border border-subtle-stroke bg-primary-bg p-5">
                <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                  Compensation &amp; benefits
                </p>
                <p className="mt-2 max-w-[24em] text-[14px] leading-relaxed text-ink">
                  We don&rsquo;t print marketing numbers. Ask us anything on the
                  intro call: pay, leave, hardware, how reviews work. You will get
                  the real answer.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/about#what-we-believe" className="btn-secondary">
                  Read the published principles
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="group/culture">
            {culture.map((item, idx) => (
              <ScrollReveal key={item.num} delay={100 + idx * 70}>
                <div className="flex flex-col gap-1.5 border-t border-subtle-stroke py-5 transition-opacity duration-300 ease-settle last:border-b hover:!opacity-100 group-hover/culture:opacity-50 sm:flex-row sm:items-baseline sm:gap-8 lg:py-6">
                  <span className="w-12 shrink-0 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blue">
                    {item.num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-ink md:text-[21px]">
                      {item.title}
                    </h3>
                    <p className="mt-1 max-w-[40em] text-[14px] leading-relaxed text-inkSoft">
                      {item.line}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
