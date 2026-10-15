import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import LongformArticle from "@/components/sections/longform/LongformArticle";
import RelatedList from "@/components/sections/longform/RelatedList";
import { INSIGHTS_BY_DATE } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";
import { PRESS_RELEASES, findRelease } from "@/lib/newsroom";
import { formatDate } from "@/lib/richText";
import { SITE, absoluteUrl, mailto } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRESS_RELEASES.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const release = findRelease(slug);
  if (!release) return {};
  return pageMetadata({ title: release.title, description: release.dek, path: `/newsroom/${slug}`, type: "article" });
}

export default async function PressReleasePage({ params }: Params) {
  const { slug } = await params;
  const release = findRelease(slug);
  if (!release) notFound();

  const url = absoluteUrl(`/newsroom/${release.slug}`);
  const reading = INSIGHTS_BY_DATE.slice(0, 3).map((insight) => ({
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
            author: { "@type": "Organization", name: SITE.name },
            publisher: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
            mainEntityOfPage: url,
          }}
        />
        <LongformArticle
          crumbs={[
            { label: "Newsroom", href: "/newsroom" },
            { label: "Press release", href: "/newsroom#announcements" },
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
        <RelatedList heading="From Insights" items={reading} />
        <PageClose
          label="Media contact"
          setup="Writing about this announcement?"
          payoff="Reach the team directly."
          body="Interview requests, product briefings and fact checks go to one inbox."
          primary={{ label: "Email the press team", href: mailto("Press enquiry") }}
          secondary={{ label: "Get the media kit", href: "/newsroom#media-kit" }}
        />
      </main>
      <Footer />
    </>
  );
}
