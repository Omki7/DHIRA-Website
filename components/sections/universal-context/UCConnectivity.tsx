import ScrollReveal from "@/components/ui/ScrollReveal";

// Ordered to walk the source types the copy above claims: business systems,
// then relational, then NoSQL, then streaming, then object storage, then the
// manual files (spreadsheets and documents) every estate actually runs on.
// Every tile is captioned — most of these marks are glyph-only (dolphin, leaf,
// elephant, cloud) and a reader who doesn't already know them would otherwise
// be guessing at what we connect to (user direction 20 Jul 2026).
const LOGOS: { src: string; label: string; inset: string }[] = [
  { src: "/universal-context/salesforce.svg", label: "Salesforce", inset: "inset-[30%_24%]" },
  { src: "/universal-context/sap.svg", label: "SAP", inset: "inset-[27%]" },
  { src: "/universal-context/netsuite.png", label: "NetSuite", inset: "inset-[36%_18%]" },
  { src: "/universal-context/oracle.svg", label: "Oracle", inset: "inset-[44%_13%]" },
  { src: "/universal-context/postgresql.svg", label: "PostgreSQL", inset: "inset-[29%]" },
  { src: "/universal-context/mysql.svg", label: "MySQL", inset: "inset-[30%]" },
  { src: "/universal-context/mongodb.svg", label: "MongoDB", inset: "inset-[29%]" },
  { src: "/universal-context/apachekafka.svg", label: "Kafka", inset: "inset-[29%]" },
  { src: "/universal-context/amazons3.svg", label: "Amazon S3", inset: "inset-[28%]" },
  { src: "/universal-context/excel.svg", label: "Excel", inset: "inset-[28%]" },
  { src: "/universal-context/googlesheets.svg", label: "Sheets", inset: "inset-[30%]" },
  { src: "/universal-context/pdf.svg", label: "PDF", inset: "inset-[30%]" },
];

function LogoTile({ logo, echo }: { logo: (typeof LOGOS)[number]; echo: boolean }) {
  return (
    // The marquee renders the list twice for a seamless loop; the second copy
    // is hidden from assistive tech so each system is announced once.
    <div aria-hidden={echo || undefined} className="flex w-[84px] shrink-0 flex-col items-center gap-2.5 px-4 md:w-[116px] md:px-5 lg:w-[128px]">
      <div className="group relative size-16 md:size-[88px] lg:size-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[15px] bg-[linear-gradient(-30.12deg,#151519_25.6%,#2A2A31_163%)] shadow-[inset_0.2px_0.2px_2px_rgba(255,255,255,0.1),0_1.5px_1.5px_rgba(0,0,0,0.25)] md:rounded-[21px] lg:rounded-[23px]" />
        <div className={`absolute ${logo.inset}`}>
          <img
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain brightness-0 invert opacity-50 transition-opacity duration-250 ease-settle group-hover:opacity-90"
            src={logo.src}
          />
        </div>
      </div>
      {/* 12px `uc-mute`: at 11px in `uc-dim` the captions sat at 4.4:1, under
          AA for text this small. */}
      <p className="text-[12px] leading-none text-uc-mute">
        {logo.label}
      </p>
    </div>
  );
}

export default function UCConnectivity() {
  return (
    <div className="relative overflow-hidden pb-16 pt-20 text-center md:pb-24 md:pt-24 lg:pt-28">
      {/* radially-masked pinstripe texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 text-white/[0.035] [mask-image:radial-gradient(ellipse_55%_42%_at_50%_38%,transparent_32%,black_72%)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px 8px)",
        }}
      />

      {/* THE BUSINESS QUESTION this band answers is "do we have to replace
          anything?", not "what can it connect to?". The tiles and the step
          rail already say every source is connected; saying it a third time
          ("Your whole estate, connected." over a list of source types) was
          the redundancy. The logos carry the list, so the sub paragraph went
          too, and the band opens 150px tighter. No pill label, no CTA: [02]
          has one exit, in UCSdk. */}
      <ScrollReveal className="flex flex-col items-center px-6 md:px-10 xl:px-14">
        <h3 className="max-w-[24em] text-balance text-[28px] font-semibold leading-[1.15] tracking-tight lg:text-[32px]">
          <span className="block text-uc-mute">Nothing to rip out.</span>
          <span className="block text-uc-text">Akashic works with the systems you already run.</span>
        </h3>
      </ScrollReveal>

      {/* Single-row marquee: the whole estate scrolls past on one strip. Two
          identical copies ride one track (uc-marquee reversed, so it drifts
          right-to-left); edges fade so tiles enter and leave the frame instead
          of clipping. Pauses on hover; holds still under reduced-motion. */}
      <div
        className="group relative mt-12 overflow-hidden md:mt-16 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
      >
        <div className="flex w-max animate-[uc-marquee_50s_linear_infinite_reverse] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <LogoTile key={`${logo.src}-${i}`} logo={logo} echo={i >= LOGOS.length} />
          ))}
        </div>
      </div>
    </div>
  );
}
