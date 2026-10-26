/* [01] The three service lines, all visible, as homepage [03] shows its
   solutions: a drawing on the pale panel, then the nav's name for the line,
   homepage [04]'s card title and description (the same words the reader
   clicked), its scope as tags (ui/Tag, never bullets) and what you leave
   with. Each column keeps its anchor (#advisory, #engineering,
   #ai-solutions) for the nav and home. */

import Tag from "@/components/ui/Tag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceDrawing from "@/components/demos/delivery/ServiceDrawing";
import type { DeliveryPage } from "@/content/pages/delivery";

export default function DeliveryServices({ content: c }: { content: DeliveryPage["services"] }) {
  return (
    <section id="services" className="scroll-mt-28 bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num={c.eyebrow.number} label={c.eyebrow.label} setup={c.title.setup} payoff={c.title.payoff} lede={c.lede} />
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-6 lg:mt-14 lg:gap-8">
          {c.lines.map((line, i) => (
            <ScrollReveal key={line.id} delay={i * 80} className="h-full">
              <article id={line.id} className="flex h-full scroll-mt-28 flex-col">
                <div className="flex h-[280px] items-center justify-center overflow-hidden border-y border-lineSoft bg-primary-bg lg:h-[304px]">
                  <ServiceDrawing kind={line.drawing} label={line.drawingLabel} />
                </div>
                <div className="flex flex-1 flex-col px-1 pt-6 lg:px-2 lg:pt-8">
                  <p className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary-text">{line.scope}</p>
                  <h3 className="mt-3 text-[26px] font-medium leading-tight tracking-tight text-ink lg:text-[28px]">{line.title}</h3>
                  <p className="mt-3 max-w-[28em] text-pretty text-[15px] leading-relaxed text-secondary-text lg:text-base">{line.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {line.items.map((item) => (
                      <li key={item.label}>
                        <Tag preview={item.preview}>{item.label}</Tag>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <div className="border-t border-dashed border-lineSoft pt-5">
                      <p className="font-mono text-[11px] uppercase tracking-eyebrow text-blue">{c.outputLabel}</p>
                      <p className="mt-2 text-pretty text-[14px] font-medium leading-relaxed text-ink">{line.output}</p>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
