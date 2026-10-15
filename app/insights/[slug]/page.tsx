import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import LongformArticle from "@/components/sections/longform/LongformArticle";
import RelatedList from "@/components/sections/longform/RelatedList";
import { InsightsSubscribe } from "@/components/sections/insights/InsightsIndex";
import { INSIGHTS, findInsight, relatedInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";
import { formatDate, readingMinutes } from "@/lib/richText";
import { SITE, absoluteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INSIGHTS.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const insight = findInsight(slug);
  if (!insight) return {};
  return pageMetadata({ title: insight.title, description: insight.dek, path: `/insights/${slug}`, type: "article" });
}

export default async function InsightArticlePage({ params }: Params) {
  const { slug } = await params;
  const insight = findInsight(slug);
  if (!insight) notFound();

  const url = absoluteUrl(`/insights/${insight.slug}`);
  const related = relatedInsights(insight.slug, 3).map((item) => ({
    href: `/insights/${item.slug}`,
    eyebrow: `${item.category} · ${formatDate(item.date)}`,
    title: item.title,
    dek: item.dek,
  }));

  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <JsonLd
          data={{
            "@type": "BlogPosting",
            headline: insight.title,
            description: insight.dek,
            datePublished: insight.date,
            author: { "@type": "Organization", name: `${insight.author.name}, ${SITE.name}` },
            publisher: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
            mainEntityOfPage: url,
            articleSection: insight.category,
          }}
        />
        <JsonLd
          data={{
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Insights", item: absoluteUrl("/insights") },
              { "@type": "ListItem", position: 2, name: insight.title, item: url },
            ],
          }}
        />
        <LongformArticle
          crumbs={[
            { label: "Insights", href: "/insights" },
            { label: insight.category, href: "/insights#latest" },
          ]}
          title={insight.title}
          dek={insight.dek}
          meta={
            <>
              <span className="text-inkSoft">{insight.author.name}</span>&nbsp;&nbsp;·&nbsp;&nbsp;{formatDate(insight.date)}
              &nbsp;&nbsp;·&nbsp;&nbsp;{readingMinutes(insight.blocks)} min read
            </>
          }
          blocks={insight.blocks}
          url={url}
        />
        <RelatedList items={related} />
        <InsightsSubscribe num="01" />
        <PageClose
          label="Talk to our team"
          setup="See it on your own data."
          payoff="Start with one use case."
          body="A solutions architect walks through Akashic with the question you most need answered."
          primary={{ label: "Talk to our team", href: "#talk-to-our-team" }}
          secondary={{ label: "See pricing", href: "/pricing" }}
        />
      </main>
      <Footer />
    </>
  );
}
