"use client";

/*
 * [02] Beyond the Platform — Capabilities Explorer Slider
 * Horizontal interactive carousel slider matching modern research/products showcase standard.
 */

import { useState, useRef } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface CapabilityItem {
  id: string;
  num: string;
  category: "ai" | "data" | "cloud" | "software";
  title: string;
  scope: string;
  stack: string[];
  deliverables: string;
  telemetry: string;
  image: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "ai-ml",
    num: "01",
    category: "ai",
    title: "AI & Machine Learning",
    scope: "Domain-specific AI applications, automated document processing, classification models, and predictive workflows.",
    stack: ["PyTorch", "LLM Fine-Tuning", "Inference Pipelines", "Eval Harnesses"],
    deliverables: "Model integration, automated evaluation harnesses, custom embeddings, and sovereign inference runtimes.",
    telemetry: "< 35ms Inference Latency",
    image: "/delivery/capabilities/ai.jpg",
  },
  {
    id: "data-pipelines",
    num: "02",
    category: "data",
    title: "Data Platforms & Pipelines",
    scope: "High-throughput streaming, batch ETL/ELT pipelines, master data management, and lakehouse storage.",
    stack: ["Apache Kafka", "ClickHouse", "Apache Iceberg", "dbt"],
    deliverables: "Data ingestion frameworks, schema registries, validation layers, and governance pipelines.",
    telemetry: "100k+ Events / Sec",
    image: "/delivery/capabilities/data.jpg",
  },
  {
    id: "bi-analytics",
    num: "03",
    category: "data",
    title: "Business Intelligence & Analytics",
    scope: "Enterprise dashboards, automated operational reports, self-service analytics, and embedded intelligence.",
    stack: ["Semantic Layers", "SQL Optimisation", "Cube.js", "Grafana"],
    deliverables: "Semantic data models, query optimisation, report automation, and executive dashboards.",
    telemetry: "Real-Time Telemetry",
    image: "/delivery/capabilities/bi.jpg",
  },
  {
    id: "cloud-sovereign",
    num: "04",
    category: "cloud",
    title: "Cloud & Sovereign Infrastructure",
    scope: "Multi-cloud architecture, sovereign on-premise deployments, Kubernetes container orchestration, and IaC.",
    stack: ["Kubernetes", "Terraform", "Zero-Trust", "Air-Gapped VPC"],
    deliverables: "Terraform automation, CI/CD pipelines, zero-trust network policies, and observability stacks.",
    telemetry: "100% In-Region Sovereign",
    image: "/delivery/capabilities/cloud.jpg",
  },
  {
    id: "custom-software",
    num: "05",
    category: "software",
    title: "Custom Software Systems",
    scope: "Bespoke backend APIs, mission-critical workflow systems, and secure integrations with legacy software.",
    stack: ["Go", "Rust", "Node.js", "PostgreSQL", "gRPC"],
    deliverables: "Microservice architectures, database optimization, transactional consistency, and public/private APIs.",
    telemetry: "Sub-10ms DB p95",
    image: "/delivery/capabilities/software.jpg",
  },
  {
    id: "product-engineering",
    num: "06",
    category: "software",
    title: "Product Engineering & Modernisation",
    scope: "Full-lifecycle software product development, technical refactoring, performance scaling, and cloud migration.",
    stack: ["React / Next.js", "TypeScript", "E2E Testing", "Distributed Arch"],
    deliverables: "Product architecture, sprint execution, automated testing, and continuous deployment.",
    telemetry: "2-Week Sprint Cadence",
    image: "/delivery/capabilities/product.jpg",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Capabilities" },
  { id: "ai", label: "AI & ML" },
  { id: "data", label: "Data & BI" },
  { id: "cloud", label: "Cloud & Infra" },
  { id: "software", label: "Software Systems" },
];

export default function DeliveryCapabilities() {
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
              <span className="text-overcast">[02]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Beyond the platform</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Clarifying Akashic&rsquo;s role</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Engineering capabilities beyond the platform.
          </h2>
          <p className="mt-4 max-w-[42em] text-base leading-relaxed text-secondary-text md:text-lg">
            When your technical needs fall outside Akashic SaaS, our engineering teams design, build, and maintain bespoke solutions around your existing stack.
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
                aria-label="Scroll left"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-subtle-stroke bg-white text-ink shadow-sm transition-all hover:bg-primary-bg hover:border-line"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-subtle-stroke bg-white text-ink shadow-sm transition-all hover:bg-primary-bg hover:border-line"
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
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-subtle-stroke bg-primary-bg shadow-sm transition-all duration-300 group-hover:shadow-frame group-hover:-translate-y-1">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 290px, (max-width: 1024px) 320px, 340px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle top pill */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold text-ink shadow-sm backdrop-blur-md">
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
                      Domain {c.num}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-blue group-hover:translate-x-0.5 transition-transform">
                      View details &rarr;
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-vault/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-subtle-stroke bg-white p-6 shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-primary-bg text-inkSoft hover:bg-tertiary-bg"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-eyebrow text-blue">
                <span>Domain {selectedItem.num}</span>
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
                  Core Technologies &amp; Stack
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
                  Standard Engineering Deliverables
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
                  Close Capability Summary
                </button>
              </div>
            </div>
          </div>
        )}
      </ScrollRevealRail>
    </section>
  );
}

