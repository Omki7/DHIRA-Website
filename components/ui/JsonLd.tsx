/*
 * One structured-data block. The pattern AkashicFaq used inline, extracted so
 * every page can carry schema.org data (Organization, FAQPage, Article,
 * NewsArticle, Event, DefinedTermSet, BreadcrumbList) the same way.
 * `<` is escaped so no string in the data can close the script tag.
 */

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue | undefined };

export default function JsonLd({ data }: { data: { [key: string]: JsonValue | undefined } }) {
  const json = JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
