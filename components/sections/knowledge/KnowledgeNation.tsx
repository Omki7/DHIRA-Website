/*
 * [03] Nation Builder — Infrastructure to Teach a Billion.
 * Three automation engines on the shared AkashicCardChrome header, each tied
 * to the Akashic module that powers it.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { CARD, CardHeader } from "@/components/sections/akashic/AkashicCardChrome";

const engines = [
  {
    icon: "Perspectives",
    name: "The translation engine",
    sub: "Multilingual NLP",
    desc: "Real-time AI translation converts STEM content into regional Indian languages instantly: built on the same multilingual NLP capability inside Akashic AI.",
    foot: "Language is not a barrier",
  },
  {
    icon: "Akashic Workflow",
    name: "The AI teaching assistant",
    sub: "Admin, automated",
    desc: "Automates a significant share of administrative burden for teachers: grading, attendance, and lesson planning, freeing up classroom time for actual teaching.",
    foot: "Time back for teaching",
  },
  {
    icon: "Documentation",
    name: "Universal ingestion",
    sub: "Any format in",
    desc: "Ingest any format: PDF, video, slides, and auto-tag it into an adaptive micro-lesson. This is Akashic Unstructured Data, already proven on government policy documents and financial reports.",
    foot: "PDF · video · slides",
  },
];

export default function KnowledgeNation() {
  return (
    <section id="nation-builder" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Nation builder</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Scale requires automation</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            We built the infrastructure to teach a billion.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:mt-14">
          {engines.map((engine, idx) => (
            <ScrollReveal key={engine.name} delay={100 + idx * 90}>
              <div className={`${CARD} h-full`}>
                <CardHeader
                  icon={engine.icon}
                  name={engine.name}
                  sub={engine.sub}
                  chip={
                    <span className="font-mono text-[10px] text-overcast">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  }
                />
                <p className="flex-1 px-4 pt-3 text-[13.5px] leading-relaxed text-inkSoft">
                  {engine.desc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 border-t border-dashed border-lineSoft px-4 py-3">
                  <span className="h-[5px] w-[5px] rounded-full bg-blue/60" aria-hidden />
                  <span className="font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft">
                    {engine.foot}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
