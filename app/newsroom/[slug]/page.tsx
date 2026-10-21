import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import LongformArticle from "@/components/sections/longform/LongformArticle";
import RelatedList from "@/components/sections/longform/RelatedList";
import { getInsights, getPage, getPressRelease, getPressReleases, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/richText";
import { absoluteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const releases = await getPressReleases();
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const release = await getPressRelease(slug);
  if (!release) return {};
  return pageMetadata({ title: release.title, description: release.dek, path: `/newsroom/${slug}`, type: "article" });
}

export default async function PressReleasePage({ params }: Params) {
  const { slug } = await params;
  const release = await getPressRelease(slug);
  if (!release) notFound();

  const [{ release: copy }, site, insights] = await Promise.all([getPage("newsroom"), getSiteSettings(), getInsights()]);
  const url = absoluteUrl(`/newsroom/${release.slug}`);
  const reading = insights.slice(0, 3).map((insight) => ({
    href: `/insights/${insight.slug}`,
    eyebrow: `${insight.category} · ${formatDate(insight.date)}`,
    title: insight.title,
    dek: insight.dek,
  }));

  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <JsonLd
          data={{
            "@type": "NewsArticle",
            headline: release.title,
            description: release.dek,
            datePublished: release.date,
            dateline: release.dateline,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
            mainEntityOfPage: url,
          }}
        />
        <LongformArticle
          crumbs={[
            { label: copy.crumb, href: "/newsroom" },
            { label: copy.kind, href: "/newsroom#announcements" },
          ]}
          title={release.title}
          dek={release.dek}
          meta={
            <>
              <span className="text-inkSoft">{release.dateline}</span>&nbsp;&nbsp;·&nbsp;&nbsp;{formatDate(release.date)}
            </>
          }
          blocks={release.blocks}
          url={url}
        />
        <RelatedList heading={copy.readingHeading} items={reading} />
        <PageClose {...copy.close} />
      </main>
      <Footer />
    </>
  );
}
