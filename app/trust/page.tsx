import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageMinimap from "@/components/layout/PageMinimap";
import FaqSection from "@/components/ui/FaqSection";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import {
  TrustCompliance,
  TrustDisclosure,
  TrustDocuments,
  TrustPrivacy,
  TrustResponsibleAi,
  TrustSecurity,
  TrustSubprocessors,
} from "@/components/sections/trust/TrustSections";
import { pageMetadata } from "@/lib/metadata";
import { mailto } from "@/lib/site";
import { TRUST_FAQ, TRUST_HERO, TRUST_SECTIONS } from "@/lib/trustSections";

export const metadata = pageMetadata({
  title: "Trust Center",
  description: `${TRUST_HERO.payoff} ${TRUST_HERO.lede}`,
  path: "/trust",
});

const INDEX = TRUST_SECTIONS.filter((section) => !["hero", "talk-to-our-team"].includes(section.id));

export default function TrustPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero label={TRUST_HERO.label} setup={TRUST_HERO.setup} payoff={TRUST_HERO.payoff} lede={TRUST_HERO.lede} index={INDEX} />
        <TrustSecurity />
        <TrustPrivacy />
        <TrustResponsibleAi />
        <TrustCompliance />
        <TrustDocuments />
        <TrustSubprocessors />
        <TrustDisclosure />
        <FaqSection num="08" label={TRUST_FAQ.label} setup={TRUST_FAQ.setup} payoff={TRUST_FAQ.payoff} items={TRUST_FAQ.items} />
        <PageClose
          label="Security review"
          setup="Running a security review?"
          payoff="Send us the questionnaire."
          body="Ask for any document on this page, or send your own questionnaire. Our security team answers directly."
          primary={{ label: "Start a security review", href: mailto("Security review") }}
          secondary={{ label: "Read the privacy policy", href: "/privacy" }}
        />
      </main>
      <Footer />
      <PageMinimap sections={TRUST_SECTIONS} aria-label="Trust Center sections" />
    </>
  );
}
