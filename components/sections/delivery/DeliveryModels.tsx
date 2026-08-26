"use client";

/*
 * [01] Ways to Work with Dhira — One partner. Five ways to ship.
 * Split visual interactive model layout matching modern feature showcase standard.
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
        {/* Section Eyebrow */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Ways to work with Dhira</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Five engagement options</span>
          </div>
        </ScrollReveal>

        {/* Split Container: Left visual showcase, Right interactive model selector */}
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Visual Card Image Display */}
          <ScrollReveal delay={100} className="lg:col-span-6 xl:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-subtle-stroke bg-vault shadow-frame">
              
              {/* Animated Image Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModel.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
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
                  {/* Subtle inner gradient shadow overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vault/90 via-vault/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Glassmorphism Pill Badge Overlay */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-vault/70 px-3.5 py-1.5 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" />
                  <span className="font-mono text-[11px] font-bold tracking-eyebrow text-white uppercase">
                    {activeModel.badge}
                  </span>
                </div>
                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10.5px] font-bold text-white/80 backdrop-blur-md">
                  {activeModel.number} / 05
                </span>
              </div>

              {/* Bottom Image Info Bar */}
              <div className="absolute bottom-0 inset-x-0 p-6 pointer-events-none">
                <div className="rounded-2xl border border-white/15 bg-vault/80 p-4 text-white backdrop-blur-xl">
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-blue font-bold">
                    {activeModel.tagline}
                  </p>
                  <h4 className="mt-1 text-xl font-bold tracking-tight text-white">
                    {activeModel.title}
                  </h4>
                  {/* Bullet points */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeModel.bullets.map((b, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/10 px-2.5 py-1 font-mono text-[10.5px] text-white/90"
                      >
                        <span className="text-blue font-bold">&bull;</span>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Content & Interactive Model List */}
          <ScrollReveal delay={150} className="lg:col-span-6 xl:col-span-5">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-4xl">
                One partner. Five ways to ship.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-secondary-text">
                Choose the engagement model that fits your timeline, team, and architecture. Every path delivers with sovereign engineering accountability.
              </p>

              {/* Models List with Icons & Divider Lines */}
              <div className="mt-8 divide-y divide-subtle-stroke border-y border-subtle-stroke">
                {DELIVERY_MODELS.map((model, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`group flex w-full items-center justify-between py-4 px-3 text-left transition-all duration-200 rounded-xl my-0.5 ${
                        isActive
                          ? "bg-blue-subtle/70 shadow-sm"
                          : "hover:bg-primary-bg"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon Container */}
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg transition-all duration-200 ${
                            isActive
                              ? "bg-blue text-white shadow-sm scale-105"
                              : "bg-primary-bg text-secondary-text group-hover:bg-white group-hover:text-ink border border-subtle-stroke"
                          }`}
                        >
                          <span>{model.icon}</span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-base text-ink group-hover:text-blue transition-colors">
                              {model.title}
                            </span>
                          </div>
                          <p className="text-xs text-secondary-text mt-0.5 font-sans">
                            {model.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Right indicator */}
                      <div className="flex items-center gap-2">
                        {isActive ? (
                          <span className="rounded-full bg-blue px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-eyebrow text-white">
                            Active
                          </span>
                        ) : (
                          <span className="text-overcast group-hover:text-blue group-hover:translate-x-0.5 transition-all text-sm">
                            &rarr;
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Pill CTA Button */}
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href={activeModel.href}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-action-hover hover:shadow-lg"
                >
                  <span>Explore {activeModel.title}</span>
                  <span>&rarr;</span>
                </Link>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </ScrollRevealRail>
    </section>
  );
}

