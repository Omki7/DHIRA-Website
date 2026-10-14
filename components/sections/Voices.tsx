import ScrollReveal from "@/components/ui/ScrollReveal";
import VoicesDispatches from "@/components/demos/VoicesDispatches";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function Voices() {
  return (
    <section id="voices" aria-labelledby="voices-heading" className="relative overflow-hidden bg-band pb-12 pt-10 lg:pb-16 lg:pt-14">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="mb-8 flex items-center border-y border-dashed border-blue-border/70 px-[2px] py-[17px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft lg:mb-10">
            <span><span className="text-overcast">[07]</span>&nbsp;&nbsp;PARTNER VOICES</span>
          </div>
          <h2 id="voices-heading" className="max-w-[19ch] text-[40px] font-semibold leading-[1.08] tracking-tighter text-ink sm:text-[48px] lg:text-[56px]">Proven in the field,<br />not in a pitch deck.</h2>
        </ScrollReveal>
        <ScrollReveal delay={120}><VoicesDispatches /></ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
