/* [06] What you own, on the page's one soft blue band. The historical
   #partnership-fit anchor now owns handover terms. Left, the operating pack
   drawn flat as a sheet (no tilt, no backing card), closed by the line the
   hero and [04] draw: blue while DHIRA builds, ink once your team runs it.
   Right, the three terms agreed before work begins. */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { DeliveryPage } from "@/content/pages/delivery";

function DocGlyph() {
  return (
    <svg viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" className="mt-0.5 h-5 w-4 shrink-0 text-blue" aria-hidden>
      <path d="M2 1H10L14 5V19H2ZM10 1V5H14M5 10H11M5 14H11" />
    </svg>
  );
}

export default function DeliveryFit({ content: c }: { content: DeliveryPage["fit"] }) {
  return (
    <section id="partnership-fit" className="scroll-mt-28 bg-band pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num={c.eyebrow.number} label={c.eyebrow.label} setup={c.title.setup} payoff={c.title.payoff} lede={c.lede} />
        <div className="mt-12 grid items-start gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <figure className="overflow-hidden rounded-frame border border-line bg-background">
              <figcaption className="px-5 pb-4 pt-5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-blue sm:px-7">{c.packLabel}</figcaption>
              <ul>
                {c.documents.map((doc) => (
                  <li key={doc.title} className="flex gap-4 border-t border-lineSoft px-5 py-4 sm:px-7">
                    <DocGlyph />
                    <span>
                      <span className="block text-[15px] font-medium leading-snug text-ink">{doc.title}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-secondary-text">{doc.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 border-t border-line bg-panel px-5 py-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] sm:px-7" aria-hidden="true">
                <span className="shrink-0 text-blue">{c.handover.build}</span>
                <span className="h-px flex-1 bg-blue" />
                <span className="h-2 w-2 shrink-0 rotate-45 bg-ink" />
                <span className="h-px flex-1 bg-ink" />
                <span className="shrink-0 text-ink">{c.handover.run}</span>
              </div>
            </figure>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="border-t border-line">
              {c.items.map((item) => (
                <article key={item.title} className="border-b border-line py-6">
                  <h3 className="text-[20px] font-medium tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-2.5 max-w-[38em] text-pretty text-[15px] leading-relaxed text-secondary-text">{item.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-secondary-text">{c.note}</p>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
