/*
 * [06] Open architecture — modular, open, and yours to control.
 * Principle cards on a blue-hued slab whose background grid continues from
 * [05] Trust, so the two sections read as one field. Header follows the
 * page's shared grammar (a [NN] mono eyebrow + heading-sm/md h2) and it
 * closes on the standard one-line Akashic mark + tagline, like [09].
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicLogo from "@/components/icons/AkashicLogo";

const commitments = [
  {
    eyebrow: "Principle 01",
    title: "Modular by design",
    desc: "Use one module or all seven. What you don’t deploy, you don’t pay for, and don’t have to work around.",
  },
  {
    eyebrow: "Principle 02",
    title: "Open, not a black box",
    desc: "Every table, transform, and metric definition is readable by tools you already own — no proprietary engine.",
  },
  {
    eyebrow: "Principle 03",
    title: "Yours to extend",
    desc: "Open interfaces at every layer. Build on top of Akashic without asking us for an API.",
  },
  {
    eyebrow: "Principle 04",
    title: "Yours to keep",
    desc: "Your data and your work live in open formats you own. Fully portable, so you stay by choice, not because you have to.",
  },
];

export default function AkashicOpenFoundations() {
  return (
    <section id="open" className="relative scroll-mt-24 overflow-hidden bg-[#F1F5FE]">
      {/* Background grid — bleeds down from [05] Trust at the very top, then
          fades out within the header so it never sits behind the four
          principles and hurts their readability. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-80 opacity-[0.15]"
        style={{
          maskImage: "linear-gradient(to bottom, #000, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, #000, transparent)",
        }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="open-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1A1C1D" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#open-grid)" />
        </svg>
      </div>

      <div className="relative z-10 rail-container pt-16 pb-24 lg:pt-24 lg:pb-32">
        <ScrollReveal>
          {/* Top Section */}
          <div className="flex flex-col items-start gap-5">
            <p className="font-mono text-[11px] uppercase tracking-eyebrow">
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Open architecture</span>
            </p>

            <h2 className="max-w-[28em] text-balance text-heading-sm font-semibold text-ink md:text-heading-md">
              Open by design.{" "}
              <span className="text-secondary-text">Yours to control, end to end.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards Row */}
        <ScrollReveal delay={100}>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {commitments.map((c) => (
              <div 
                key={c.title} 
                className="border-l border-lineSoft px-6 pb-12 pt-2"
              >
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-secondary-text">{c.eyebrow}</p>
                <h3 className="mt-4 text-[17px] font-medium text-ink">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary-text">{c.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Closing line — one line, standard Akashic mark + tagline (like [10]) */}
        <ScrollReveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center lg:mt-16">
            <span className="inline-flex items-center font-semibold text-ink">
              <AkashicLogo className="h-5 w-5" />
              <span className="-ml-1 text-[14px]">kashic</span>
            </span>
            <span className="text-[14px] font-medium text-secondary-text">
              &middot; Own your data. Own your standards. Stay because it&rsquo;s the best call.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
