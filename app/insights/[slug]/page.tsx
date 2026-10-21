import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { InsightsSubscribe } from "@/components/sections/insights/InsightsIndex";
import LongformArticle from "@/components/sections/longform/LongformArticle";
import RelatedList from "@/components/sections/longform/RelatedList";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import { getInsight, getInsights, getPage, getRelatedInsights, getSiteSettings, getUiStrings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { formatDate, readingMinutes } from "@/lib/richText";
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
  return pageMetadata({ title: insight.title, description: insight.dek, path: `/insights/${slug}`, type: "article" });
}

export default async function InsightArticlePage({ params }: Params) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  const [page, site, ui, relatedInsights] = await Promise.all([getPage("insights"), getSiteSettings(), getUiStrings(), getRelatedInsights(slug, 3)]);
  const url = absoluteUrl(`/insights/${insight.slug}`);
  const related = relatedInsights.map((item) => ({
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
            author: { "@type": "Organization", name: `${insight.author.name}, ${site.name}` },
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
        <LongformArticle
          crumbs={[
            { label: page.article.crumb, href: "/insights" },
            { label: insight.category, href: "/insights#latest" },
          ]}
          title={insight.title}
          dek={insight.dek}
          meta={
            <>
              <span className="text-inkSoft">{insight.author.name}</span>&nbsp;&nbsp;·&nbsp;&nbsp;{formatDate(insight.date)}
              &nbsp;&nbsp;·&nbsp;&nbsp;{readingMinutes(insight.blocks)} {ui.longform.minRead}
            </>
          }
          blocks={insight.blocks}
          url={url}
        />
        <RelatedList items={related} />
        <InsightsSubscribe content={page.subscribe} num="01" />
        <PageClose {...page.article.close} />
      </main>
      <Footer />
    </>
  );
}
