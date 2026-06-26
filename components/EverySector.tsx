"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const SP = "cubic-bezier(0.16, 1, 0.3, 1)";

const SECTORS = [
  { id:"smart-cities", index:"01", name:"Smart Cities", shortName:"Cities",
    image: "/sectors/smart-cities-real.png",
    description:"Transform urban operations with unified data. From transit to emergency response, one continuous signal across the entire city." },
  { id:"healthcare",   index:"02", name:"Healthcare",   shortName:"Health",
    image: "/sectors/healthcare-real.png",
    description:"Move from fragmented legacy systems to a unified patient truth. Better care, delivered faster and with less overhead." },
  { id:"finance",      index:"03", name:"Finance",      shortName:"Finance",
    image: "/sectors/finance-real.png",
    description:"Real-time pattern recognition across every transaction. Catch risk before it materialises and maintain audit-ready compliance by design." },
  { id:"retail",       index:"04", name:"Retail",       shortName:"Retail",
    image: "/sectors/retail-real.png",
    description:"Forecast demand with unprecedented accuracy. Connect supply chain signals in real-time, catching defects before they ever ship." },
  { id:"education",    index:"05", name:"Education",    shortName:"Edu",
    image: "/sectors/education-real.png",
    description:"Connect the entire student journey from enrollment to placement. Improve learning outcomes with predictive, data-driven insights." },
  { id:"energy",       index:"06", name:"Energy",       shortName:"Energy",
    image: "/sectors/energy-real.png",
    description:"Predict grid failures and optimise distribution on live signals. Build a smarter, more resilient infrastructure." },
];

export default function EverySector() {
  const [activeId, setActiveId] = useState(SECTORS[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="sectors" className="overflow-hidden bg-white py-32 lg:py-40">
      <div className="rail-container">
        
        <ScrollReveal>
          <div className="mb-10 flex items-center gap-2 border-b border-dashed border-lineSoft pb-4 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span className="text-overcast">[05]</span>
            <span>/</span>
            <span>EVERY SECTOR</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="max-w-[14em] text-[48px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[56px] lg:text-[64px]">
            <span className="text-ink">One platform.</span>
            <br />
            <span className="text-overcast">Every industry.</span>
          </h2>
        </ScrollReveal>

        {/* Mobile Accordion */}
        <ScrollReveal delay={120} className="lg:hidden">
          <div className="flex flex-col gap-3">
            {SECTORS.map((sector) => {
              const isActive = activeId === sector.id;
              return (
                <div
                  key={sector.id}
                  onClick={() => setActiveId(sector.id)}
                  className="relative overflow-hidden rounded-[20px] border border-line/20 bg-white shadow-sm"
                  style={{
                    height: isActive ? 480 : 76,
                    transition: `height 600ms ${SP}`,
                    cursor: isActive ? "default" : "pointer",
                  }}
                >
                  {/* Always-visible Header for Mobile */}
                  <div className="absolute top-0 left-0 right-0 z-20 flex h-[76px] items-center justify-between px-6 bg-white">
                    <h3 className="font-sans text-[18px] font-semibold text-ink">{sector.name}</h3>
                    <span className="font-mono text-[11px] text-inkSoft">{sector.index}</span>
                  </div>

                  {/* Expandable Content */}
                  <div 
                    className="absolute top-[76px] left-0 right-0 bottom-0 flex flex-col"
                    style={{
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                      transition: `opacity 400ms ${SP} ${isActive ? '200ms' : '0ms'}`,
                    }}
                  >
                    <div className="relative h-[200px] w-full overflow-hidden bg-ash">
                      <Image 
                        src={sector.image} 
                        alt={sector.name} 
                        fill 
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center px-6 py-5 bg-white">
                      <p className="mb-4 text-[14px] leading-[1.6] text-inkSoft">
                        {sector.description}
                      </p>
                      <Link href="#contact"
                        className="inline-flex items-center gap-2 text-[14px] font-medium text-action"
                      >
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

        {/* Desktop Squeezy Carousel */}
        <ScrollReveal delay={120} className="hidden lg:flex w-full h-[600px] rounded-[24px] border border-line/20 shadow-sm overflow-hidden bg-white">
          {SECTORS.map((sector, idx) => {
            const isActive = activeId === sector.id;
            const isHovered = hoveredId === sector.id;
            
            return (
              <div
                key={sector.id}
                role="tab"
                tabIndex={isActive ? -1 : 0}
                onClick={() => !isActive && setActiveId(sector.id)}
                onMouseEnter={() => setHoveredId(sector.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative overflow-hidden ${idx === SECTORS.length - 1 ? '' : 'border-r border-line/20'}`}
                style={{
                  flexGrow: isActive ? 10 : (isHovered ? 1.5 : 1),
                  flexBasis: 0,
                  cursor: isActive ? "default" : "pointer",
                  transition: `flex-grow 800ms ${SP}`,
                  backgroundColor: "#ffffff",
                }}
              >
                {/* 
                  Inner wrapper is strictly dimensioned so its contents never squash 
                  during the flex-grow transition. It acts like a sliding window.
                */}
                {/* Image (Centered relative to flex item) */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%", overflow: "hidden", backgroundColor: "#f3f4f6" }}>
                  <Image
                    src={sector.image}
                    alt={sector.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      transform: isActive ? "scale(1)" : isHovered ? "scale(1.04)" : "scale(1)",
                      transition: `transform 800ms ${SP}`,
                    }}
                  />
                  {/* Darker overlay on inactive cards */}
                  <div style={{
                    position: "absolute", inset: 0, backgroundColor: "#0a0a0c",
                    opacity: isActive ? 0 : 0.3, transition: `opacity 800ms ${SP}`
                  }} />
                </div>

                {/* Bottom Text (Sliding Window) */}
                <div style={{ position: "absolute", bottom: 0, left: 0, width: "800px", height: "40%", padding: "32px 40px", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
                  <div 
                    style={{ 
                      opacity: isActive ? 1 : 0, 
                      transform: isActive ? "translateX(0)" : "translateX(-10px)",
                      transition: `opacity 500ms ${SP} ${isActive ? '250ms' : '0ms'}, transform 500ms ${SP} ${isActive ? '250ms' : '0ms'}`,
                      display: "flex", flexDirection: "column", height: "100%"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <span className="font-mono text-[12px] font-medium uppercase tracking-eyebrow text-inkSoft">
                        {sector.index}&thinsp;/&thinsp;06
                      </span>
                      <h3 className="font-sans text-[28px] font-semibold tracking-tight text-ink">
                        {sector.name}
                      </h3>
                    </div>
                    
                    <p className="text-[16px] leading-[1.6] text-inkSoft mb-auto max-w-[500px]">
                      {sector.description}
                    </p>
                    
                    <Link href="#contact"
                      className="group inline-flex w-fit items-center gap-2 text-[15px] font-medium text-action transition-colors duration-settle hover:text-action/80"
                    >
                      Deploy for {sector.shortName}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        className="transition-transform duration-settle ease-settle group-hover:translate-x-1">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="1.2" d="M2 6h8m0 0L7.5 3M10 6L7.5 9" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Vertical Name for Inactive State */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: isActive ? 0 : 1, transition: `opacity 400ms ${SP} ${isActive ? '0ms' : '300ms'}`, 
                  pointerEvents: "none"
                }}>
                  <span style={{
                    fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: 600,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    color: "#1c1d1f", whiteSpace: "nowrap",
                    transform: "rotate(-90deg)"
                  }}>
                    {sector.name}
                  </span>
                </div>
              </div>
            );
          })}
        </ScrollReveal>

      </div>
    </section>
  );
}
