"use client";

/*
 * [02] Ways to Work with Dhira — One partner. Five ways to ship.
 * Feature showcase layout with pill tab switcher matching modern web standard.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { DeliveryPage } from "@/content/pages/delivery";


export default function DeliveryModels({ content }: { content: DeliveryPage["models"] }) {
  const DELIVERY_MODELS = content.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeModel = DELIVERY_MODELS[activeIndex];

  /* Every model is addressable (#model-saas … #model-augmentation), so the
     nav's "Ways to engage" links open their own tab instead of all landing
     on the first. The hash is read on arrival; a same-page click changes the
     URL without a hashchange event (Next pushes state), hence the click
     listener beside the hashchange one. */
  useEffect(() => {
    const select = (hash: string) => {
      const index = DELIVERY_MODELS.findIndex((model) => `#model-${model.id}` === hash);
      if (index >= 0) setActiveIndex(index);
    };
    select(window.location.hash);
    const onHashChange = () => select(window.location.hash);
    const onClick = (event: MouseEvent) => {
      const href = (event.target as HTMLElement | null)?.closest("a")?.getAttribute("href") ?? "";
      if (href.includes("#model-")) select(`#${href.split("#")[1]}`);
    };
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, [DELIVERY_MODELS]);

  return (
    <section
      id="engagement-models"
      className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <span id="akashic-deployment" className="absolute -top-24" aria-hidden />
      <span id="product-engineering" className="absolute -top-24" aria-hidden />
      <span id="advisory-co-engineering" className="absolute -top-24" aria-hidden />
      {DELIVERY_MODELS.map((model) => (
        <span key={model.id} id={`model-${model.id}`} className="absolute -top-24" aria-hidden />
      ))}

      <ScrollRevealRail>
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-center justify-center font-mono text-[11px] uppercase tracking-eyebrow text-center">
            <p>
              <span className="text-overcast">[{content.eyebrow.number}]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;{content.eyebrow.label}</span>
            </p>
          </div>

          <h2 className="mt-4 text-center text-3xl font-medium tracking-tight text-ink md:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-3 text-center max-w-2xl mx-auto text-base text-inkSoft">
            {content.lede}
          </p>
        </ScrollReveal>

        {/* Center Pill Tab Switcher */}
        <ScrollReveal delay={50}>
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-subtle-stroke bg-tertiary-bg p-1.5 ">
              {DELIVERY_MODELS.map((model, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-background text-ink  border border-subtle-stroke font-semibold"
                        : "text-secondary-text hover:text-ink hover:bg-tertiary-bg"
                    }`}
                  >
                    {model.title}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Interactive Content Display */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Copy, Bullets & CTA */}
          <ScrollReveal delay={100} className="lg:col-span-6 xl:col-span-5">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {activeModel.title}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-eyebrow text-blue font-semibold">
                  {activeModel.tagline}
                </p>
              </div>

              <p className="text-base leading-relaxed text-inkSoft">
                {activeModel.description}
              </p>

              {/* Bullet list (Rule 2: bullet indicators, no checkmarks) */}
              <div className="space-y-3 pt-2">
                {activeModel.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-subtle text-blue">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                    </div>
                    <span className="text-sm font-medium text-ink">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* CTA Link */}
              <div className="pt-4">
                <Link
                  href={activeModel.href}
                  className="inline-flex items-center gap-2 font-semibold text-sm text-blue hover:text-blue-hover transition-colors group"
                >
                  <span>
                    {content.learnMore} {activeModel.title}
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Visual Card Showcase */}
          <ScrollReveal delay={150} className="lg:col-span-6 xl:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-subtle-stroke bg-vault ">
              {/* Animated Image Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModel.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeModel.image}
                    alt={activeModel.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                    className="object-cover object-center"
                  />
                  
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>

        </div>
      </ScrollRevealRail>
    </section>
  );
}


