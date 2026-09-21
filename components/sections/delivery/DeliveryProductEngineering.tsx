/*
 * [03] Model 02 — Product Engineering: the fork.
 * One brief, two routes. The old two-column prose split is replaced by the
 * junction drawn for real: a dashed spine descends from ONE BRIEF and
 * branches into two labelled route bands, each ending in its destination
 * figure (MVP · 12–20 WKS on Akashic, MVP · 10–16 WKS on your stack).
 * Figures are deliberately NOT bars on a shared axis: the two paths are
 * not the same job (the Akashic path includes the data layer), and two
 * numbers racing on one scale read as a race whatever the labels say
 * (HowWeDeliver precedent). Colour encodes the engine: blue = Akashic,
 * ink = your stack. Copy is terse cells under mono labels.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

type Route = {
  blue: boolean;
  engine: string;
  figure: string;
  unit: string;
  situation: string;
  situationNote: string;
  engineDetail: string;
  engineChips: string;
  advantage: string;
};

const routes: Route[] = [
  {
    blue: true,
    engine: "On Akashic",
    figure: "12–20",
    unit: "WKS TO MVP",
    situation:
      "Your product needs a data layer that is sovereign, traceable, and AI-ready from day one.",
    situationNote: "Common in healthcare, finance, and public sector.",
    engineDetail: "Akashic as the engine",
    engineChips: "Data layer · Knowledge layer · AI runtime",
    advantage: "No data-infrastructure rebuild. Launch months faster.",
  },
  {
    blue: false,
    engine: "On your stack",
    figure: "10–16",
    unit: "WKS TO MVP",
    situation: "Your stack is already decided: SAP, mainframe, or a custom environment.",
    situationNote: "Or the product is a brand-specific, customer-facing application.",
    engineDetail: "Your architecture, our standards",
    engineChips: "SAP · Mainframe · Custom",
    advantage: "High-velocity engineering on the architecture you already run.",
  },
];

function RouteBand({ route, index }: { route: Route; index: number }) {
  const chipCls = route.blue
    ? "border border-blue-border bg-gradient-to-b from-[#F3F6FF] to-[#E8EDFC] text-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
    : "bg-gradient-to-b from-[#2A2D2F] to-ink text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]";
  const lineCls = route.blue
    ? "bg-[repeating-linear-gradient(90deg,#3E63DD_0_8px,transparent_8px_16px)]"
    : "bg-[repeating-linear-gradient(90deg,#8E8F91_0_8px,transparent_8px_16px)]";

  return (
    <div className={`relative border-t border-lineSoft py-6 lg:py-7 ${index === routes.length - 1 ? "border-b" : ""}`}>
      {/* The branch from the spine into this route */}
      <span
        className={`absolute -left-7 top-[42px] hidden w-7 border-t border-dashed lg:block ${
          route.blue ? "border-blue/50" : "border-ink/30"
        }`}
        aria-hidden
      />

      {/* Route header: engine chip, the route line, destination figure */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className={`inline-flex items-center rounded-[7px] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.06em] ${chipCls}`}>
          {route.engine}
        </span>
        <span className={`relative h-px min-w-[60px] flex-1 bg-[length:16px_1px] bg-repeat-x ${lineCls}`} aria-hidden>
          <svg
            className={`absolute -right-1 top-1/2 -translate-y-1/2 ${route.blue ? "text-blue" : "text-tertiary-text"}`}
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            aria-hidden
          >
            <path d="M1 5h9M7 1.5 10.5 5 7 8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="flex items-baseline gap-2.5">
          <span className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">MVP</span>
          <span className={`text-[26px] font-semibold leading-none tracking-tighter md:text-[30px] ${route.blue ? "text-blue" : "text-ink"}`}>
            {route.figure}
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-inkSoft">
            {route.unit}
          </span>
        </span>
      </div>

      {/* The route's three cells, terse under mono labels */}
      <div className="mt-5 grid gap-x-8 gap-y-5 md:grid-cols-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
            If this is you
          </p>
          <p className="mt-2 max-w-[26em] text-[14px] font-medium leading-snug text-ink">
            {route.situation}
          </p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-inkSoft">{route.situationNote}</p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
            The engine
          </p>
          <p className="mt-2 text-[14px] font-medium leading-snug text-ink">{route.engineDetail}</p>
          <p className={`mt-1.5 font-mono text-[10px] uppercase tracking-[0.06em] ${route.blue ? "text-blue" : "text-inkSoft"}`}>
            {route.engineChips}
          </p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
            The advantage
          </p>
          <p className="mt-2 max-w-[26em] text-[14px] font-medium leading-snug text-ink">
            {route.advantage}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DeliveryProductEngineering() {
  return (
    <section id="product-engineering" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Model 02 &middot; Product Engineering</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Akashic optional</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            <span className="text-inkSoft">We build what you need.</span>
            <br />
            Akashic is optional.
          </h2>
          <p className="mt-5 max-w-[42em] text-lg leading-relaxed text-secondary-text">
            Sometimes you need a bespoke application, not a platform. Two engines
            for the same brief:
          </p>
        </ScrollReveal>

        {/* The fork: one brief descends, two routes branch off */}
        <ScrollReveal delay={120}>
          <div className="relative mt-10 lg:mt-12 lg:pl-7">
            {/* Spine + entry node (desktop) */}
            <span
              className="absolute bottom-10 left-[7px] top-14 hidden border-l border-dashed border-line lg:block"
              aria-hidden
            />
            <div className="mb-6 hidden items-center gap-2.5 lg:flex" aria-hidden>
              <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full border border-ink/25 bg-white">
                <span className="h-[5px] w-[5px] rounded-full bg-ink" />
              </span>
              <span className="font-mono text-[9.5px] font-semibold uppercase tracking-eyebrow text-inkSoft">
                One brief
              </span>
            </div>

            <div className="lg:-mt-2">
              {routes.map((route, idx) => (
                <RouteBand key={route.engine} route={route} index={idx} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:mt-10">
            Both paths &middot; governed by DHIRA standards &middot; you own the code
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
