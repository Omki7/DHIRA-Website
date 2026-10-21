"use client";

/*
 * [03] Beyond the Platform — Capabilities Explorer Slider
 * Horizontal interactive carousel slider matching modern research/products showcase standard.
 */

import { useState, useRef } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { DeliveryPage } from "@/content/pages/delivery";

type CapabilityItem = DeliveryPage["capabilities"]["items"][number];

export default function DeliveryCapabilities({ content }: { content: DeliveryPage["capabilities"] }) {
  const CAPABILITIES = content.items;
  const CATEGORIES = content.categories;
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<CapabilityItem | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredCapabilities =
    activeCategory === "all"
      ? CAPABILITIES
      : CAPABILITIES.filter((c) => c.category === activeCategory);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="capabilities"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[{content.eyebrow.number}]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;{content.eyebrow.label}</span>
            </p>
            <span className="hidden text-overcast sm:inline">{content.eyebrow.aside}</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            {content.title}
          </h2>
          <p className="mt-4 max-w-[42em] text-base leading-relaxed text-secondary-text md:text-lg">
            {content.lede}
          </p>
        </ScrollReveal>

        {/* Top Category Filter Tabs & Navigation Arrows */}
        <ScrollReveal delay={80}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-subtle-stroke pb-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative pb-1.5 transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? "text-ink font-semibold"
                      : "text-secondary-text hover:text-ink"
                  }`}
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-ink rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Navigation Slider Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label={content.scrollLeft}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-subtle-stroke bg-background text-ink  transition-all hover:bg-primary-bg hover:border-line"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label={content.scrollRight}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-subtle-stroke bg-background text-ink  transition-all hover:bg-primary-bg hover:border-line"
              >
                &rarr;
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Carousel Slider */}
        <ScrollReveal delay={120}>
          <div
            ref={sliderRef}
            className="mt-8 flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredCapabilities.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedItem(c)}
                className="group relative flex w-[290px] shrink-0 snap-start flex-col cursor-pointer sm:w-[320px] lg:w-[340px]"
              >
                {/* Visual Image Artwork Box */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-subtle-stroke bg-primary-bg  transition-all duration-300  group-hover:-translate-y-1">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 290px, (max-width: 1024px) 320px, 340px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle top pill */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-background px-2.5 py-1 font-mono text-[10px] font-bold text-ink ">
                      {c.telemetry}
                    </span>
                  </div>
                </div>

                {/* Card Title & Subtitle */}
                <div className="mt-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold text-ink group-hover:text-blue transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-secondary-text leading-relaxed line-clamp-2">
                      {c.scope}
                    </p>
                  </div>

                  {/* Category Tag */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-dashed border-lineSoft">
                    <span className="font-mono text-[10.5px] uppercase tracking-eyebrow text-inkSoft">
                      {content.domain} {c.num}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-blue group-hover:translate-x-0.5 transition-transform">
                      {content.viewDetails}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Modal Detail Dialog for Selected Capability */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-scrim/70 p-4 "
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-subtle-stroke bg-background p-6  sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label={content.closeLabel}
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-primary-bg text-inkSoft hover:bg-tertiary-bg"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-eyebrow text-blue">
                <span>
                  {content.domain} {selectedItem.num}
                </span>
                <span>&middot;</span>
                <span>{selectedItem.telemetry}</span>
              </div>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
                {selectedItem.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                {selectedItem.scope}
              </p>

              {/* Tech Stack Pills */}
              <div className="mt-5 border-t border-dashed border-lineSoft pt-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-eyebrow text-overcast">
                  {content.stackLabel}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedItem.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-blue-subtle px-2.5 py-1 font-mono text-[11px] font-semibold text-blue"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="mt-4 border-t border-dashed border-lineSoft pt-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-eyebrow text-overcast">
                  {content.deliverablesLabel}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed font-medium text-ink">
                  {selectedItem.deliverables}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="btn-primary text-xs"
                >
                  {content.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </ScrollRevealRail>
    </section>
  );
}

