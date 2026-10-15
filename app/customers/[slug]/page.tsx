import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import LongformArticle from "@/components/sections/longform/LongformArticle";
import RelatedList from "@/components/sections/longform/RelatedList";
import { MetricPair } from "@/components/sections/customers/CustomersLibrary";
import { STORIES, findStory } from "@/lib/customerStories";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STORIES.map((story) => ({ slug: story.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const story = findStory(slug);
  if (!story) return {};
  return pageMetadata({
    title: story.title,
    description: story.description,
    path: `/customers/${slug}`,
    image: story.image,
    type: "article",
  });
}

export default async function CustomerStoryPage({ params }: Params) {
  const { slug } = await params;
  const story = findStory(slug);
  if (!story) notFound();

  const url = absoluteUrl(`/customers/${story.id}`);
  const others = STORIES.filter((item) => item.id !== story.id).map((item) => ({
    href: `/customers/${item.id}`,
    eyebrow: item.authority,
    title: item.title,
    dek: item.description,
  }));

  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <JsonLd
          data={{
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Customer stories", item: absoluteUrl("/customers") },
              { "@type": "ListItem", position: 2, name: story.title, item: url },
            ],
          }}
        />
        <LongformArticle
          crumbs={[
            { label: "Customer stories", href: "/customers" },
            { label: story.sector, href: `/customers#${story.id}` },
          ]}
          title={story.title}
          dek={story.description}
          meta={
            <>
              <span className="text-inkSoft">{story.platform}</span>&nbsp;&nbsp;·&nbsp;&nbsp;{story.authority}
            </>
          }
          blocks={story.body}
          url={url}
          lead={
            <div className="mb-14">
              <MetricPair metrics={story.metrics} />
              <figure className="mt-10">
                <div className="relative aspect-[16/9] overflow-hidden rounded-frame bg-panel">
                  <Image src={story.image} alt={story.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
                  Photograph illustrative of the sector
                </figcaption>
              </figure>
              <div className="mt-10 border-t border-dashed border-lineSoft pt-5">
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">Built on</p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {story.modules.map((module) => (
                    <li key={module} className="text-[15px] font-medium text-ink">
                      {module}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          }
        />
        <RelatedList heading="More customer stories" items={others} />
        <PageClose
          label="Talk to our team"
          setup="Your figures, with their trail."
          payoff="Start with one programme."
          body="A solutions architect works through one of your questions on your own records."
          primary={{ label: "Talk to our team", href: "#talk-to-our-team" }}
          secondary={{ label: "All customer stories", href: "/customers" }}
        />
      </main>
      <Footer />
    </>
  );
}
