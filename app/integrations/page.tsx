import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageMinimap from "@/components/layout/PageMinimap";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import IntegrationsDirectory from "@/components/sections/integrations/IntegrationsDirectory";
import { HOW_IT_CONNECTS, INTEGRATIONS_HERO, INTEGRATIONS_SECTIONS } from "@/lib/integrations";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Integrations",
  description: `${INTEGRATIONS_HERO.payoff} ${INTEGRATIONS_HERO.lede}`,
  path: "/integrations",
});

const pad = (n: number) => String(n).padStart(2, "0");

/* [02] How it connects: four stations on the page's one soft blue band. */
function HowItConnects() {
  const c = HOW_IT_CONNECTS;
  return (
    <section
      id="how-it-connects"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader num="02" label={c.label} setup={c.setup} payoff={c.payoff} />
        <ScrollReveal delay={80}>
          <ol className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {c.steps.map((step, index) => (
              <li key={step.title} className={`border-b border-lineSoft py-8 sm:pr-6 lg:border-b-0 ${index > 0 ? "lg:border-l lg:pl-6" : ""} ${index % 2 === 1 ? "sm:border-l sm:pl-6" : ""}`}>
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">[{pad(index + 1)}]</p>
                <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-secondary-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export default function IntegrationsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero
          label={INTEGRATIONS_HERO.label}
          setup={INTEGRATIONS_HERO.setup}
          payoff={INTEGRATIONS_HERO.payoff}
          lede={INTEGRATIONS_HERO.lede}
          meta={INTEGRATIONS_HERO.facts.join("  ·  ")}
        />
        <IntegrationsDirectory />
        <HowItConnects />
        <PageClose
          label="Talk to our team"
          setup="Running a system we did not list?"
          payoff="Tell us which one."
          body="Most systems connect through REST, webhooks or files on day one. A solutions architect will confirm the route for yours."
          primary={{ label: "Talk to our team", href: "#talk-to-our-team" }}
          secondary={{ label: "See the module reference", href: "/akashic#stack" }}
        />
      </main>
      <Footer />
      <PageMinimap sections={INTEGRATIONS_SECTIONS} aria-label="Integrations sections" />
    </>
  );
}
