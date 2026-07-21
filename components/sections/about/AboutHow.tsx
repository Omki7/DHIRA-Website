/*
 * [04] How We Work — The Way We Show Up.
 * Four commitments on one engagement rail (the methodology idiom): a
 * single dashed line from day one to the last day, four numbered nodes,
 * each column carrying its day-tag, statement and commitment. Restrained
 * enterprise register — no illustration, CSS-only hover dimming, server
 * component. Copy unchanged.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const commitments = [
  {
    num: "01",
    tag: "Day one",
    title: "We start with listening.",
    body: "Every engagement begins with understanding your context. Your systems, your constraints, your politics.",
  },
  {
    num: "02",
    tag: "The build",
    title: "We build with you, not for you.",
    body: "Your team learns the system as we build it. By the time we hand over, you are equipped, not dependent.",
  },
  {
    num: "03",
    tag: "In production",
    title: "We stay until it works.",
    body: "Not until the contract ends. Until your team is confident running it.",
  },
  {
    num: "04",
    tag: "The last day",
    title: "We tell the truth.",
    body: "If Akashic is not the right fit, we say so. We would rather earn your trust than close a deal.",
  },
];

function RailNode({ num, last }: { num: string; last?: boolean }) {
  return (
    <span
      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white font-mono text-[10px] font-bold shadow-card ${
        last ? "border-blue bg-blue-subtle text-blue" : "border-blue-border text-blue"
      }`}
    >
      {num}
      {last && (
        <span className="absolute inset-0 rounded-full border border-blue/40 animate-[ps-ring_2.4s_ease-out_infinite]" aria-hidden />
      )}
    </span>
  );
}

function FlowSegment() {
  return (
    <span
      className="h-px flex-1 bg-[length:16px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,#C8D2F5_0_8px,transparent_8px_16px)] animate-[ps-dash_1.4s_linear_infinite]"
      aria-hidden
    />
  );
}

export default function AboutHow() {
  return (
    <section id="how-we-work" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;How we work</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Four commitments</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            The way we show up.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-inkSoft">
            Four commitments. The same on the first day of an engagement as the last.
          </p>
        </ScrollReveal>

        {/* Desktop: one continuous engagement rail */}
        <div className="group/comm mt-12 hidden md:grid md:grid-cols-4 lg:mt-16">
          {commitments.map((item, idx) => (
            <ScrollReveal key={item.num} delay={100 + idx * 90}>
              <div className="transition-opacity duration-300 ease-settle hover:!opacity-100 group-hover/comm:opacity-45">
                <div className="flex items-center">
                  <RailNode num={item.num} last={idx === commitments.length - 1} />
                  {idx < commitments.length - 1 && <FlowSegment />}
                </div>
                <div className={idx < commitments.length - 1 ? "pr-10" : ""}>
                  <p className="mt-5 font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">
                    {item.tag}
                  </p>
                  <h3 className="mt-2 text-[21px] font-semibold leading-[1.2] tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <div className="mt-3 mb-3 w-8 border-t border-blue/40" aria-hidden />
                  <p className="text-[14.5px] leading-relaxed text-inkSoft">{item.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: one continuous vertical rail */}
        <div className="relative mt-10 md:hidden">
          <span
            className="absolute bottom-4 left-4 top-4 w-px bg-[length:1px_16px] bg-repeat-y bg-[repeating-linear-gradient(180deg,#C8D2F5_0_8px,transparent_8px_16px)]"
            aria-hidden
          />
          <div className="space-y-9">
            {commitments.map((item, idx) => (
              <ScrollReveal key={item.num} delay={100 + idx * 90}>
                <div className="flex gap-5">
                  <RailNode num={item.num} last={idx === commitments.length - 1} />
                  <div className="min-w-0 pt-1">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">
                      {item.tag}
                    </p>
                    <h3 className="mt-1.5 text-[20px] font-semibold tracking-tight text-ink">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-inkSoft">{item.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
