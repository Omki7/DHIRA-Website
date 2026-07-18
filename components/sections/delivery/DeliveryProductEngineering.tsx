/*
 * [03] Model 2 — Product Engineering.
 * Two build paths as one editorial decision split (no card chrome,
 * five-second read): each side opens with the reader's situation, answers
 * with what we build and the week-range figure, divided by a dashed axis
 * with a floating OR node.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

type BuildPath = {
  blue: boolean;
  situation: string;
  situationNote: string;
  build: string;
  figure: string;
  advantage: string;
  engine: string;
};

const paths: BuildPath[] = [
  {
    blue: true,
    situation:
      "Your product needs a data layer that is sovereign, traceable, and AI-ready from day one.",
    situationNote: "Common in healthcare, finance, and public sector.",
    build: "On Akashic.",
    figure: "12–20",
    advantage:
      "Launch months faster by not rebuilding complex data infrastructure from scratch.",
    engine: "Akashic as the engine · Data layer · Knowledge graph · AI runtime",
  },
  {
    blue: false,
    situation: "Your stack is already decided: SAP, mainframe, or a custom environment.",
    situationNote: "Or the product is a brand-specific, customer-facing application.",
    build: "On your stack.",
    figure: "10–16",
    advantage:
      "High-velocity engineering on your existing architecture, governed by our standards.",
    engine: "Your existing stack · SAP · Mainframe · Custom",
  },
];

function OrNode({ className = "" }: { className?: string }) {
  return (
    <span
      className={`items-center justify-center rounded-full border border-subtle-stroke bg-white font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-inkSoft shadow-frame ${className}`}
      aria-hidden
    >
      or
    </span>
  );
}

function PathPanel({ path, align }: { path: BuildPath; align: "left" | "right" }) {
  return (
    <div className={`flex h-full flex-col ${align === "left" ? "lg:pr-16" : "lg:pl-16"}`}>
      <p
        className={`font-mono text-[10px] font-semibold uppercase tracking-eyebrow ${
          path.blue ? "text-blue" : "text-inkSoft"
        }`}
      >
        If this is you
      </p>
      <p className="mt-3 max-w-[24em] text-[17px] font-medium leading-snug tracking-tight text-ink md:text-[19px]">
        {path.situation}
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed text-inkSoft">{path.situationNote}</p>

      <div className="mt-7 border-t border-dashed border-lineSoft pt-5">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
          We build it
        </p>
        <h3 className="mt-2 text-[21px] font-semibold tracking-tight text-ink md:text-[23px]">
          {path.build}
        </h3>
        <div className="mt-4 flex items-baseline gap-3">
          <span
            className={`text-[34px] font-semibold leading-none tracking-tighter md:text-[38px] ${
              path.blue ? "text-blue" : "text-ink"
            }`}
          >
            {path.figure}
          </span>
          <span className="text-[15px] font-medium text-inkSoft">weeks to MVP</span>
        </div>
      </div>

      <div className="mt-6 border-t border-dashed border-lineSoft pt-5">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
          The advantage
        </p>
        <p className="mt-2 max-w-[28em] text-[15.5px] font-medium leading-relaxed text-ink">
          {path.advantage}
        </p>
      </div>

      <p
        className={`mt-auto border-t pt-4 font-mono text-[10px] uppercase tracking-eyebrow ${
          path.blue ? "border-blue-border text-blue" : "border-lineSoft text-inkSoft"
        }`}
      >
        {path.engine}
      </p>
    </div>
  );
}

export default function DeliveryProductEngineering() {
  return (
    <section id="product-engineering" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Model 02 &middot; Product Engineering</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Akashic optional</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            We build what you need. Akashic is optional.
          </h2>
          <p className="mt-5 max-w-[42em] text-lg leading-relaxed text-secondary-text">
            Sometimes you need a bespoke application, not a platform. We&nbsp;engineer it.
            <br />
            If&nbsp;Akashic accelerates the outcome, we use it as the engine.
            <br />
            If&nbsp;your environment demands a native build, we engineer it to your exact
            specifications.
          </p>
        </ScrollReveal>

        <div className="relative mt-12 lg:mt-16">
          <span
            className="absolute inset-y-2 left-1/2 hidden w-px -translate-x-1/2 bg-[repeating-linear-gradient(180deg,#e4e7ec_0_8px,transparent_8px_16px)] lg:block"
            aria-hidden
          />
          <OrNode className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 lg:flex" />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0">
            <ScrollReveal delay={100}>
              <PathPanel path={paths[0]} align="left" />
            </ScrollReveal>

            <div className="flex items-center gap-4 lg:hidden" aria-hidden>
              <span className="h-px flex-1 border-t border-dashed border-lineSoft" />
              <OrNode className="flex h-10 w-10" />
              <span className="h-px flex-1 border-t border-dashed border-lineSoft" />
            </div>

            <ScrollReveal delay={180}>
              <PathPanel path={paths[1]} align="right" />
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-12 border-t border-lineSoft pt-5 text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:mt-14">
            Both paths &middot; governed by DHIRA standards &middot; you own the code
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
