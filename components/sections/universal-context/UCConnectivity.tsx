import ScrollReveal from "@/components/ui/ScrollReveal";
import UCButton from "./UCButton";

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

function LogoTile({ logo }: { logo: (typeof LOGOS)[number] }) {
  return (
    <div className="flex w-[84px] shrink-0 flex-col items-center gap-2.5 px-4 md:w-[116px] md:px-5 lg:w-[128px]">
      <div className="group relative size-16 md:size-[88px] lg:size-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[15px] bg-[linear-gradient(-30.12deg,#141A38_25.6%,#2A3157_163%)] shadow-[inset_0.2px_0.2px_2px_rgba(255,255,255,0.1),0_1.5px_1.5px_rgba(0,0,0,0.25)] md:rounded-[21px] lg:rounded-[23px]" />
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
      <p className="text-[11px] font-medium leading-none tracking-[-0.11px] text-uc-dim">
        {logo.label}
      </p>
    </div>
  );
}

export default function UCConnectivity() {
  return (
    <div className="relative overflow-hidden pb-[72px] pt-[152px] text-center max-xl:pt-[112px] max-lg:pt-[88px] md:pb-[112px]">
      {/* radially-masked pinstripe texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 text-white/[0.035] [mask-image:radial-gradient(ellipse_55%_42%_at_50%_38%,transparent_32%,black_72%)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px 8px)",
        }}
      />

      <ScrollReveal className="flex flex-col items-center px-6 md:px-14">
        <p className="inline-flex h-6 items-center rounded-lg bg-uc-pill px-1.5 text-[14px] font-medium leading-5 tracking-[-0.14px] text-uc-pilltext">
          Connectivity
        </p>
        <h3 className="mt-6 max-w-[696px] text-balance text-[32px] font-medium leading-[36px] tracking-[-0.01em] text-uc-text lg:text-[40px] lg:leading-[44px]">
          Your whole estate, connected.
        </h3>
        <p className="mt-4 max-w-[464px] text-balance text-[16px] font-medium leading-5 tracking-[-0.16px] text-uc-mute">
          Business systems, databases, live streams, spreadsheets, documents: everything
          your organisation already runs on.
        </p>
        <UCButton href="/akashic#data-pipelines" className="mt-8">
          See the pipelines
        </UCButton>
      </ScrollReveal>

      {/* Single-row marquee: the whole estate scrolls past on one strip. Two
          identical copies ride one track (uc-marquee reversed, so it drifts
          right-to-left); edges fade so tiles enter and leave the frame instead
          of clipping. Pauses on hover; holds still under reduced-motion. */}
      <div
        className="group relative mt-16 overflow-hidden md:mt-20 lg:mt-24 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
      >
        <div className="flex w-max animate-[uc-marquee_50s_linear_infinite_reverse] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <LogoTile key={`${logo.src}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}
