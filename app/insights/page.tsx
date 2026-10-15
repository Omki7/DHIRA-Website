import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { InsightsLatest, InsightsSubscribe } from "@/components/sections/insights/InsightsIndex";
import { INSIGHTS, INSIGHTS_HERO } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Insights",
    description: `${INSIGHTS_HERO.payoff} ${INSIGHTS_HERO.lede}`,
    path: "/insights",
  }),
  alternates: {
    canonical: "/insights",
    types: { "application/rss+xml": [{ url: "/insights/rss.xml", title: "DHIRA Insights" }] },
  },
};

export default function InsightsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero
          label={INSIGHTS_HERO.label}
          setup={INSIGHTS_HERO.setup}
          payoff={INSIGHTS_HERO.payoff}
          lede={INSIGHTS_HERO.lede}
          meta={`${INSIGHTS.length} articles · Perspectives · Product · Public sector`}
        />
        <InsightsLatest />
        <InsightsSubscribe />
        <PageClose
          label="Talk to our team"
          setup="Have a question an article raised?"
          payoff="Ask the people who wrote it."
          body="Our product, advisory and public sector teams answer every enquiry directly."
          primary={{ label: "Talk to our team", href: "#talk-to-our-team" }}
          secondary={{ label: "Explore Akashic", href: "/akashic" }}
        />
      </main>
      <Footer />
    </>
  );
}
