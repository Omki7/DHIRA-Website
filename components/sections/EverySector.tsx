"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

// ease-smooth from AGENTS.md
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

const SECTORS = [
  { id: "smart-cities", index: "01", name: "Smart Cities", shortName: "Cities",
    image: "/sectors/smart-cities-real.png",
    description: "Transform urban operations with unified data. From transit to emergency response, one operating picture across the entire city." },
  { id: "healthcare", index: "02", name: "Healthcare", shortName: "Health",
    image: "/sectors/healthcare-real.png",
    description: "Move from fragmented legacy systems to a unified patient truth. Better care, delivered faster and with less overhead." },
  { id: "finance", index: "03", name: "Finance", shortName: "Finance",
    image: "/sectors/finance-real.png",
    description: "Real-time pattern recognition across every transaction. Catch risk before it materialises and maintain audit-ready compliance by design." },
  { id: "retail", index: "04", name: "Retail & Manufacturing", shortName: "Retail",
    image: "/sectors/retail-real.png",
    description: "Forecast demand with greater certainty. Connect supply chain and shop-floor signals in real time, catching quality issues before they reach the customer." },
  { id: "education", index: "05", name: "Education", shortName: "Education",
    image: "/sectors/education-real.png",
    description: "Connect the entire student journey from enrolment to placement. Spot at-risk learners and measure what actually works." },
  { id: "energy", index: "06", name: "Energy", shortName: "Energy",
    image: "/sectors/energy-real.png",
    description: "Predict grid failures and optimise distribution on live signals. Build a smarter, more resilient infrastructure." },
];

export default function EverySector() {
  const [activeId, setActiveId] = useState(SECTORS[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      
      if (hash === "#public-sector" || hash === "#smart-cities") {
        setActiveId("smart-cities");
      } else if (hash === "#healthcare") {
        setActiveId("healthcare");
      } else if (hash === "#education") {
        setActiveId("education");
      } else if (hash === "#enterprise" || hash === "#finance") {
        setActiveId("finance");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange, { passive: true });
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const displayId = hoveredId ?? activeId;
  const displaySector = SECTORS.find(s => s.id === displayId)!;

  return (
    <section id="sectors" className="overflow-hidden bg-white pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>

        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[05]</span>
              &nbsp;&nbsp;EVERY SECTOR
            </span>
            <span className="text-overcast">/ SIX SECTORS</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="max-w-[14em] text-[48px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[56px] lg:text-[64px] mb-12">
            <span className="text-ink">A foundation for</span>
            <br />
            <span className="text-overcast">every field.</span>
          </h2>
        </ScrollReveal>

        {/* Mobile: accordion */}
        <ScrollReveal delay={120} className="lg:hidden -mx-4 sm:-mx-6">
          <div className="flex flex-col border-t border-lineSoft">
            {SECTORS.map((sector) => {
              const isActive = activeId === sector.id;
              return (
                <div
                  key={sector.id}
                  id={sector.id === "smart-cities" ? "public-sector" : sector.id === "finance" ? "enterprise" : sector.id}
                  onClick={() => setActiveId(sector.id)}
                  className="relative overflow-hidden border-b border-lineSoft bg-white"
                  style={{
                    height: isActive ? 480 : 76,
                    transition: `height 600ms ${EASE}`,
                    cursor: isActive ? "default" : "pointer",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 z-20 flex h-[76px] items-center justify-between px-6 bg-white">
                    <h3 className="font-heading text-[18px] font-semibold text-ink">{sector.name}</h3>
                    <span className="font-mono text-[11px] text-overcast">{sector.index}</span>
                  </div>
                  <div
                    className="absolute top-[76px] left-0 right-0 bottom-0 flex flex-col"
                    style={{
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                      transition: `opacity 400ms ${EASE} ${isActive ? "200ms" : "0ms"}`,
                    }}
                  >
                    <div className="relative h-[200px] w-full overflow-hidden">
                      <Image src={sector.image} alt={sector.name} fill sizes="100vw" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center px-6 py-5 bg-white">
                      <p className="mb-4 text-sm leading-relaxed text-inkSoft">{sector.description}</p>
                      <Link href="#get-started" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-blue transition-colors duration-250 ease-settle">
                        Deploy for {sector.shortName}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2 6h8m0 0L7.5 3M10 6L7.5 9" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Desktop: image strips (left) + fixed text panel (right) */}
        <ScrollReveal
          delay={120}
          className="hidden lg:flex -mx-4 sm:-mx-6 lg:-mx-8 h-[500px] border-y border-lineSoft overflow-hidden"
        >
          {/* Left: accordion image strips */}
          <div
            className="flex flex-1 overflow-hidden"
            onMouseLeave={() => setHoveredId(null)}
          >
            {SECTORS.map((sector, idx) => {
              const isTarget = displayId === sector.id;
              return (
                <div
                  key={sector.id}
                  id={`${sector.id === "smart-cities" ? "public-sector" : sector.id === "finance" ? "enterprise" : sector.id}-desktop`}
                  onClick={() => setActiveId(sector.id)}
                  onMouseEnter={() => setHoveredId(sector.id)}
                  className={`relative overflow-hidden${idx < SECTORS.length - 1 ? " border-r border-white/10" : ""}`}
                  style={{
                    flexGrow: isTarget ? 10 : 1,
                    flexBasis: 0,
                    cursor: activeId === sector.id ? "default" : "pointer",
                    transition: `flex-grow 800ms ${EASE}`,
                  }}
                >
                  <Image
                    src={sector.image}
                    alt={sector.name}
                    fill
                    sizes="(max-width: 1440px) 800px, 900px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      transform: isTarget ? "scale(1.0)" : "scale(1.06)",
                      transition: `transform 1000ms ${EASE}`,
                    }}
                  />
                  {/* Gradient on active, flat dark on inactive */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isTarget
                        ? "linear-gradient(to top, rgba(10,10,12,0.22) 0%, rgba(10,10,12,0.04) 45%, transparent 100%)"
                        : "rgba(10,10,12,0.46)",
                      transition: `background 700ms ${EASE}`,
                    }}
                  />
                  {/* Index label — only on collapsed strips */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center pointer-events-none"
                    style={{
                      opacity: isTarget ? 0 : 1,
                      transition: `opacity 500ms ${EASE}`,
                    }}
                  >
                    <span className="font-mono text-[11px] font-medium tracking-eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {sector.index}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: fixed text panel — matches primary-bg card surface used across the page */}
          <div className="w-[340px] flex-shrink-0 py-10 px-9 border-l border-lineSoft bg-primary-bg flex flex-col">
            {/* key triggers re-mount → restarts .sector-text-in animation */}
            <div key={displayId} className="flex flex-col h-full sector-text-in">

              <div className="flex-1">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-overcast mb-3.5">
                  {displaySector.index}&thinsp;/&thinsp;06
                </p>
                <h3 className="font-heading text-[30px] font-semibold leading-[1.2] tracking-tight text-ink mb-[18px]">
                  {displaySector.name}
                </h3>
                <p className="text-base leading-relaxed text-inkSoft">
                  {displaySector.description}
                </p>
              </div>

              {/* Pill-dot sector navigator */}
              <div className="flex gap-1.5 items-center mb-7">
                {SECTORS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setActiveId(s.id); setHoveredId(null); }}
                    aria-label={s.name}
                    style={{
                      width: activeId === s.id ? "20px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      backgroundColor: activeId === s.id ? "#1A1C1D" : "#d3d8df",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: `width 500ms ${EASE}, background-color 300ms ${EASE}`,
                    }}
                  />
                ))}
              </div>

              <Link
                href="#get-started"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-blue transition-colors duration-250 ease-settle"
              >
                Deploy for {displaySector.shortName}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="1.2" d="M2 6h8m0 0L7.5 3M10 6L7.5 9" />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </ScrollRevealRail>
    </section>
  );
}
