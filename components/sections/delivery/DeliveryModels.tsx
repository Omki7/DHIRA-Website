"use client";

/*
 * [01] Ways to Work with Dhira — One partner. Five ways to ship.
 * Feature showcase layout with pill tab switcher matching modern web standard.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface DeliveryModelItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
  icon: string;
  bullets: string[];
  href: string;
}

const DELIVERY_MODELS: DeliveryModelItem[] = [
  {
    id: "saas",
    number: "01",
    title: "Akashic SaaS",
    tagline: "Instant Managed Cloud",
    description: "Turnkey managed sovereign cloud instance. Zero setup friction, continuous automated pipelines, and 99.99% SLA.",
    image: "/delivery/saas.jpg",
    badge: "Managed Platform",
    icon: "🔄",
    bullets: ["99.99% Availability SLA", "Automated streaming pipelines", "Zero-drift data sync"],
    href: "/akashic",
  },
  {
    id: "whitelabel",
    number: "02",
    title: "White Label",
    tagline: "Sovereign Private Cloud",
    description: "Deploy Akashic inside your private ecosystem under your brand. Dedicated isolated VPC with customer-managed keys.",
    image: "/delivery/whitelabel.jpg",
    badge: "100% Whitelabeled",
    icon: "🛡️",
    bullets: ["Isolated VPC perimeter", "Customer-Managed Keys (CMEK)", "SAML 2.0 & SSO integration"],
    href: "#talk-to-our-team",
  },
  {
    id: "customai",
    number: "03",
    title: "Custom Tech & AI",
    tagline: "Bespoke Architectures",
    description: "Custom AI applications, specialized ML pipelines, and microservices built for your stack with 100% IP ownership.",
    image: "/delivery/customai.jpg",
    badge: "100% Sovereign IP",
    icon: "⚡",
    bullets: ["Custom PyTorch / LLM pipelines", "Distributed microservices", "Full code IP transfer"],
    href: "#capabilities",
  },
  {
    id: "engineering",
    number: "04",
    title: "Product Engineering",
    tagline: "Full Lifecycle Delivery",
    description: "Build new software products from scratch or modernise legacy systems with 2-week sprint cadences and production CI/CD.",
    image: "/delivery/engineering.jpg",
    badge: "Agile 2-Wk Sprints",
    icon: "📈",
    bullets: ["Automated QA & testing", "2-week sprint iterations", "Production CI/CD pipelines"],
    href: "#methodology",
  },
  {
    id: "augmentation",
    number: "05",
    title: "Staff Augmentation",
    tagline: "Embedded Senior Engineers",
    description: "Embed principal AI, cloud, and distributed systems engineers directly into your squads to accelerate release velocity.",
    image: "/delivery/augmentation.jpg",
    badge: "Direct Squad Sync",
    icon: "👥",
    bullets: ["Principal AI & Cloud leads", "Zero management overhead", "Direct GitHub & Jira sync"],
    href: "#talk-to-our-team",
  },
];

export default function DeliveryModels() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeModel = DELIVERY_MODELS[activeIndex];

  return (
    <section
      id="engagement-models"
      className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <span id="akashic-deployment" className="absolute -top-24" aria-hidden />
      <span id="product-engineering" className="absolute -top-24" aria-hidden />
      <span id="advisory-co-engineering" className="absolute -top-24" aria-hidden />

      <ScrollRevealRail>
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-center justify-center font-mono text-[11px] uppercase tracking-eyebrow text-center">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Ways to work with Dhira</span>
            </p>
          </div>

          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
            One partner. Five ways to ship.
          </h2>
          <p className="mt-3 text-center max-w-2xl mx-auto text-base text-inkSoft">
            Choose the engagement model that fits your timeline, team, and architecture. Every path delivers with sovereign engineering accountability.
          </p>
        </ScrollReveal>

        {/* Center Pill Tab Switcher */}
        <ScrollReveal delay={50}>
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-subtle-stroke bg-tertiary-bg/60 p-1.5 shadow-inner">
              {DELIVERY_MODELS.map((model, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-ink shadow-sm border border-subtle-stroke font-semibold"
                        : "text-secondary-text hover:text-ink hover:bg-white/50"
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
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
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
                  <span>Learn more about {activeModel.title}</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Visual Card Showcase */}
          <ScrollReveal delay={150} className="lg:col-span-6 xl:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-subtle-stroke bg-vault shadow-frame">
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
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vault/40 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>

        </div>
      </ScrollRevealRail>
    </section>
  );
}


