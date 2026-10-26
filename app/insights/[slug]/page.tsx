import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { InsightsSubscribe } from "@/components/sections/insights/InsightsIndex";
import InsightArticle, { RelatedInsights } from "@/components/sections/insights/InsightArticle";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import { getInsight, getInsights, getPage, getRelatedInsights, getSiteSettings, getUiStrings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return {};
  const metadata = await pageMetadata({ title: insight.title, description: insight.dek, path: `/insights/${slug}`, type: "article" });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: insight.date, authors: [insight.author.name], section: insight.category } };
}

export default async function InsightArticlePage({ params }: Params) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  const [page, site, ui, relatedInsights] = await Promise.all([getPage("insights"), getSiteSettings(), getUiStrings(), getRelatedInsights(slug, 3)]);
  const url = absoluteUrl(`/insights/${insight.slug}`);

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
            dateModified: insight.date,
            inLanguage: "en-GB",
            citation: insight.sources.map(source => source.href.startsWith("/") ? absoluteUrl(source.href) : source.href),
            author: { "@type": "Organization", name: insight.author.name },
            publisher: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
            mainEntityOfPage: url,
            articleSection: insight.category,
          }}
        />
        <JsonLd
          data={{
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: page.article.crumb, item: absoluteUrl("/insights") },
              { "@type": "ListItem", position: 2, name: insight.title, item: url },
            ],
          }}
        />
        <InsightArticle insight={insight} content={page.article} url={url} />
        <RelatedInsights insights={relatedInsights} content={page.article} minRead={ui.longform.minRead} />
        <InsightsSubscribe content={page.subscribe} />
        <PageClose {...page.article.close} />
      </main>
      <Footer />
    </>
  );
}
