/*
 * [03] Nation Builder — Infrastructure to Teach a Billion.
 * Three automation engines on the shared AkashicCardChrome header, each
 * closed by a SIMULATED-UI micro-visual (§8a: canned translation hop,
 * automated-task rows, and format-to-lesson chain).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { CARD, CardHeader } from "@/components/sections/akashic/AkashicCardChrome";

function VisTranslate() {
  return (
    <div className="flex flex-wrap items-center gap-y-1.5">
      <span className="rounded-[6px] border border-subtle-stroke bg-white px-2 py-[3px] font-mono text-[8.5px] text-inkSoft">
        English
      </span>
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden className="mx-1 shrink-0">
        <path d="M1 4h12M10.5 1.5L13 4l-2.5 2.5" stroke="#3E63DD" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {["हिन्दी", "తెలుగు", "मराठी", "தமிழ்"].map((lang) => (
        <span
          key={lang}
          className="mr-1.5 rounded-[6px] border border-blue-border bg-blue-subtle px-2 py-[3px] text-[9.5px] font-medium text-blue"
        >
          {lang}
        </span>
      ))}
    </div>
  );
}

function VisAssistant() {
  const tasks = ["Grading", "Attendance", "Lesson prep"];
  return (
    <div className="space-y-1.5">
      {tasks.map((task) => (
        <div key={task} className="flex items-center justify-between gap-2">
          <span className="font-mono text-[8.5px] uppercase tracking-[0.06em] text-inkSoft">{task}</span>
          <span className="flex items-center gap-1 rounded-[5px] border border-blue-border bg-blue-subtle px-1.5 py-[2px] font-mono text-[7.5px] font-bold text-blue">
            <span className="h-[4px] w-[4px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
            AUTOMATED
          </span>
        </div>
      ))}
    </div>
  );
}

function VisIngest() {
  const formats = ["PDF", "VIDEO", "SLIDES"];
  return (
    <div className="flex flex-wrap items-center gap-y-1.5">
      {formats.map((format, idx) => (
        <span key={format} className="flex items-center">
          <span className="rounded-[6px] border border-subtle-stroke bg-white px-2 py-[3px] font-mono text-[8.5px] text-inkSoft">
            {format}
          </span>
          {idx < formats.length - 1 && <span className="mx-1 font-mono text-[8.5px] text-overcast">&middot;</span>}
        </span>
      ))}
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden className="mx-1 shrink-0">
        <path d="M1 4h12M10.5 1.5L13 4l-2.5 2.5" stroke="#3E63DD" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="rounded-[6px] border-[1.5px] border-blue bg-blue-subtle px-2 py-[3px] font-mono text-[8.5px] font-bold text-blue">
        MICRO-LESSON · TAGGED
      </span>
    </div>
  );
}

const engines = [
  {
    icon: "Perspectives",
    name: "The translation engine",
    sub: "Multilingual NLP",
    desc: "Real-time AI translation converts STEM content into regional Indian languages instantly: built on the same multilingual NLP capability inside Akashic AI.",
    visual: <VisTranslate />,
  },
  {
    icon: "Akashic Workflow",
    name: "The AI teaching assistant",
    sub: "Admin, automated",
    desc: "Automates a significant share of administrative burden for teachers: grading, attendance, and lesson planning, freeing up classroom time for actual teaching.",
    visual: <VisAssistant />,
  },
  {
    icon: "Documentation",
    name: "Universal ingestion",
    sub: "Any format in",
    desc: "Ingest any format: PDF, video, slides, and auto-tag it into an adaptive micro-lesson. This is Akashic Unstructured Data, already proven on government policy documents and financial reports.",
    visual: <VisIngest />,
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
                <div className="mt-4 border-t border-dashed border-lineSoft px-4 pb-4 pt-3.5">
                  {engine.visual}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
