/*
 * [02] The Adaptive Grid — Every Learner, Their Own Curriculum.
 * Two grid principles as wide feature plates, each with a micro-visual:
 * universal access (device chips) and personalised pace (per-learner
 * difficulty bars — canned sample data, §8a).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

function AccessVisual() {
  const devices = ["Smartphone", "Feature phone", "Desktop", "Tablet", "Classroom TV"];
  return (
    <div className="flex flex-wrap gap-1.5">
      {devices.map((device) => (
        <span
          key={device}
          className="inline-flex items-center gap-1.5 rounded-full border border-subtle-stroke bg-white px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.05em] text-inkSoft shadow-card"
        >
          <span className="h-[4px] w-[4px] rounded-full bg-[#30A46C]" aria-hidden />
          {device}
        </span>
      ))}
    </div>
  );
}

function PaceVisual() {
  const paces = [
    { name: "Learner A", width: "34%" },
    { name: "Learner B", width: "68%" },
    { name: "Learner C", width: "89%" },
  ];
  return (
    <div className="space-y-2">
      {paces.map((pace) => (
        <div key={pace.name} className="flex items-center gap-3">
          <span className="w-16 shrink-0 font-mono text-[9px] uppercase tracking-[0.06em] text-overcast">
            {pace.name}
          </span>
          <span className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-tertiary-bg">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#5B7BE8] to-blue"
              style={{ width: pace.width }}
            />
          </span>
        </div>
      ))}
      <p className="pt-1 font-mono text-[8.5px] uppercase tracking-[0.08em] text-overcast">
        Difficulty and speed, tuned per learner
      </p>
    </div>
  );
}

const plates = [
  {
    num: "01",
    title: "Universal access",
    desc: "Content accessible on any device, anywhere, instantly: built for the connectivity realities of every classroom, urban or rural.",
    visual: <AccessVisual />,
  },
  {
    num: "02",
    title: "Personalised pace",
    desc: "AI adapts the difficulty and speed of every lesson to match each student's individual learning curve, in real time.",
    visual: <PaceVisual />,
  },
];

export default function KnowledgeGrid() {
  return (
    <section id="the-grid" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[02]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The adaptive grid</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ It learns from the student</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            One platform. Every learner, their own curriculum.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            We don&rsquo;t just digitise textbooks. We built a hyper-personalised
            Knowledge Grid that learns from the student.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-2">
          {plates.map((plate, idx) => (
            <ScrollReveal key={plate.num} delay={100 + idx * 100}>
              <div className="flex h-full flex-col overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg transition-all duration-250 ease-settle hover:-translate-y-1 hover:border-blue/25 hover:shadow-frame">
                <div className="h-[3px] bg-gradient-to-r from-blue/55 via-blue/25 to-transparent" aria-hidden />
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-[22px] font-semibold tracking-tight text-ink md:text-[25px]">
                      {plate.title}
                    </h3>
                    <span className="font-mono text-[10px] text-overcast">{plate.num} / 02</span>
                  </div>
                  <p className="mt-3 max-w-[36em] text-[15px] leading-relaxed text-inkSoft">
                    {plate.desc}
                  </p>
                  <div className="mt-auto border-t border-dashed border-lineSoft pt-5">{plate.visual}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
