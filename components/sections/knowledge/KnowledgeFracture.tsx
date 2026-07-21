/*
 * [01] The Systemic Fracture — 19th-Century Software.
 * Three fracture figures in the watermark-and-rail idiom, anchored by the
 * DIKSHA precedent paragraph.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const fractures = [
  {
    figure: "96%",
    watermark: "96",
    title: "Outdated curriculum",
    desc: "Textbooks expire the moment they are printed. Knowledge evolves faster than the syllabus.",
  },
  {
    figure: "50%",
    watermark: "50",
    title: "The one-size fallacy",
    desc: "Teaching every student with a single method ensures half will always be left behind.",
  },
  {
    figure: "Zero",
    watermark: "0",
    title: "Retention",
    desc: "Students are drowning in data but starving for wisdom. Rote memorisation is not intelligence.",
  },
];

export default function KnowledgeFracture() {
  return (
    <section id="the-fracture" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The systemic fracture</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Not a hypothetical gap</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            A 21st-century civilisation on 19th-century software.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:mt-16">
          {fractures.map((fracture, idx) => (
            <ScrollReveal key={fracture.title} delay={100 + idx * 100}>
              <div className="relative pl-7">
                <span
                  className="absolute bottom-1 left-0 top-1 w-[2.5px] origin-top rounded-full bg-blue/70"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 select-none font-sans text-[6rem] font-semibold leading-none tracking-tighter text-ink/[0.04] lg:text-[7rem]"
                  aria-hidden
                >
                  {fracture.watermark}
                </span>
                <div className="relative">
                  <div className="whitespace-nowrap text-[44px] font-semibold leading-none tracking-tighter text-ink md:text-[48px]">
                    {fracture.figure}
                  </div>
                  <div className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                    {fracture.title}
                  </div>
                  <p className="mt-2.5 max-w-[24em] text-[15px] leading-relaxed text-inkSoft">
                    {fracture.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-14 max-w-[52em] border-t border-dashed border-lineSoft pt-8 text-lg leading-relaxed text-secondary-text lg:mt-16">
            This is not a hypothetical gap. DHIRA already runs the platform handling
            this exact problem at national scale: DIKSHA, the Ministry of
            Education&rsquo;s flagship platform, tracks 564 crore learning sessions
            and 18.25 crore total enrolments. The lesson from that scale is the
            lesson behind Akashic Knowledge. A single syllabus cannot serve every
            learner. An adaptive system can.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
