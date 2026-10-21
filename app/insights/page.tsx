import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { InsightsLatest, InsightsSubscribe } from "@/components/sections/insights/InsightsIndex";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { getInsights, getPage, getUiStrings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, rss } = await getPage("insights");
  return {
    ...(await pageMetadata(seo)),
    alternates: {
      canonical: seo.path,
      types: { "application/rss+xml": [{ url: "/insights/rss.xml", title: rss.title }] },
    },
  };
}

export default async function InsightsPage() {
  const [page, insights, ui] = await Promise.all([getPage("insights"), getInsights(), getUiStrings()]);
  const { hero } = page;
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero
          label={hero.label}
          setup={hero.setup}
          payoff={hero.payoff}
          lede={hero.lede}
          meta={`${insights.length} ${hero.metaSuffix} · ${hero.metaTopics}`}
        />
        <InsightsLatest insights={insights} content={page.latest} minRead={ui.longform.minRead} />
        <InsightsSubscribe content={page.subscribe} />
        <PageClose {...page.close} />
      </main>
      <Footer />
    </>
  );
}
