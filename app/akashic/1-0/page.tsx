import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageMinimap from "@/components/layout/PageMinimap";
import LaunchCountdown from "@/components/sections/release/LaunchCountdown";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import PreviewTag from "@/components/ui/PreviewTag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageMetadata } from "@/lib/metadata";
import { RELEASE, RELEASE_DEPLOYMENTS, RELEASE_HERO, RELEASE_MODULES, RELEASE_PREVIEW, RELEASE_SECTIONS } from "@/lib/releaseSections";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Akashic 1.0",
  description: `${RELEASE_HERO.payoff} ${RELEASE_HERO.lede}`,
  path: "/akashic/1-0",
});

const INDEX = RELEASE_SECTIONS.filter((section) => !["hero", "talk-to-our-team"].includes(section.id));
const pad = (n: number) => String(n).padStart(2, "0");
const label = "font-mono text-[11px] uppercase tracking-eyebrow text-overcast";

/* /akashic/1-0: what ships, what stays in preview, where it runs. Text-led
   like the other hubs; the hero carries the launch countdown. Copy:
   lib/releaseSections.ts. */
export default function AkashicReleasePage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <JsonLd
          data={{
            "@type": "SoftwareApplication",
            name: "Akashic",
            softwareVersion: RELEASE.version,
            datePublished: RELEASE.launchAt.slice(0, 10),
            applicationCategory: "BusinessApplication",
            operatingSystem: "Multi-tenant SaaS; private cloud on AWS, Azure or GCP; on-premise on Docker and Kubernetes",
            featureList: RELEASE_MODULES.map((module) => module.name),
            url: absoluteUrl("/akashic"),
          }}
        />
        <PageHero
          label={RELEASE_HERO.label}
          setup={RELEASE_HERO.setup}
          payoff={RELEASE_HERO.payoff}
          lede={RELEASE_HERO.lede}
          meta={<LaunchCountdown launchAt={RELEASE.launchAt} />}
          index={INDEX}
        />

        <section id="generally-available" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
          <ScrollRevealRail>
            <SectionHeader
              num="01"
              label="Generally available"
              setup="Seven modules."
              payoff="One governed foundation."
              lede="Every module reads the same entities, definitions and permissions as the rest."
            />
            <ScrollReveal delay={80}>
              <ol className="mt-12 border-t border-lineSoft lg:mt-16">
                {RELEASE_MODULES.map((module, index) => (
                  <li key={module.name} className="grid gap-3 border-b border-lineSoft py-7 lg:grid-cols-12 lg:items-baseline lg:gap-10">
                    <span className={`${label} lg:col-span-1`}>{pad(index + 1)}</span>
                    <span className="lg:col-span-4">
                      <Link href={module.href} className="text-[20px] font-semibold tracking-[-0.01em] text-ink transition-colors duration-150 hover:text-blue">
                        {module.name}
                      </Link>
                      <span className="mt-1 block text-[15px] text-secondary-text">{module.sub}</span>
                    </span>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-7">
                      {module.caps.map((cap) => (
                        <li key={cap} className="grid grid-cols-[14px_1fr] gap-1.5 text-[14.5px] text-ink">
                          <span aria-hidden className="mt-[0.5em] h-[5px] w-[5px] rounded-[1px] bg-blue" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </ScrollRevealRail>
        </section>

        <section id="in-preview" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
          <ScrollRevealRail>
            <SectionHeader
              num="02"
              label="In preview"
              setup="Agents, with design partners."
              payoff="The groundwork they need, already live."
              lede="Agents work on the governed foundation and stop for a person's approval. The access control, lineage and audit around them ship in 1.0."
            />
            <ScrollReveal delay={80}>
              <ul className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-16">
                {RELEASE_PREVIEW.map((agent, index) => (
                  <li key={agent.name} className={`border-b border-lineSoft py-8 sm:pr-6 ${index > 0 ? "sm:border-l sm:pl-6" : ""}`}>
                    <p className="flex items-center gap-2 text-[22px] font-semibold tracking-[-0.02em] text-ink">
                      {agent.name}
                      <PreviewTag />
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-secondary-text">{agent.line}</p>
                  </li>
                ))}
              </ul>
              <Link
                href="/insights/agents-do-the-legwork"
                className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
              >
                How the agents are designed
                <span aria-hidden className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            </ScrollReveal>
          </ScrollRevealRail>
        </section>

        <section
          id="where-it-runs"
          className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pb-20 pt-16 lg:pb-28 lg:pt-20"
        >
          <ScrollRevealRail>
            <SectionHeader
              num="03"
              label="Where it runs"
              setup="Three footprints."
              payoff="The same platform in each."
              lede="The modules, governance and answers are the same in all three."
            />
            <ScrollReveal delay={80}>
              <ul className="mt-12 grid border-t border-ink/80 lg:mt-16 lg:grid-cols-3">
                {RELEASE_DEPLOYMENTS.map((option, index) => (
                  <li key={option.name} className={`border-b border-lineSoft py-8 lg:border-b-0 lg:pr-8 ${index > 0 ? "lg:border-l lg:pl-8" : ""}`}>
                    <p className={label}>[{pad(index + 1)}]</p>
                    <p className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink">{option.name}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-secondary-text">{option.line}</p>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </ScrollRevealRail>
        </section>

        <PageClose
          label="Start"
          setup="Start with one use case."
          payoff="Grow on the same foundation."
          body="Bring the question that matters most, on your own data. Move up a plan as use grows, with no data migration and no metrics to redefine."
          primary={{ label: "See plans and pricing", href: "/pricing" }}
          secondary={{ label: "Talk to our team", href: "#talk-to-our-team" }}
        />
      </main>
      <Footer />
      <PageMinimap sections={RELEASE_SECTIONS} aria-label="Akashic 1.0 sections" />
    </>
  );
}
