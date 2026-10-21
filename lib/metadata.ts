import type { Metadata } from "next";
import type { Seo } from "@/content/types";
import { getSiteSettings } from "./content";
import { REGIONS, regionAlternates, regionPath, type Region } from "./region";

/* Page metadata in one shape: title, description, canonical, Open Graph and
   Twitter card, from a page document's `seo` block. Paths are relative; the
   root layout's metadataBase (lib/env.ts) makes them absolute.
   `region` is for a page with an India version (lib/region.ts): the
   canonical becomes that version's own path and both versions are listed
   as hreflang alternates, so search shows each country its own page. */

export async function pageMetadata({ title, description, path, image, type = "website", region }: Seo & { region?: Region }): Promise<Metadata> {
  const { name, seo } = await getSiteSettings();
  const full = `${title} | ${name}`;
  const card = image ?? seo.ogImage;
  const url = region ? regionPath(path, region) : path;
  return {
    title,
    description,
    alternates: region ? regionAlternates(path, region) : { canonical: path },
    openGraph: {
      title: full,
      description,
      url,
      ...(region && { locale: REGIONS[region].locale }),
      type,
      siteName: name,
      images: [{ url: card, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [card] },
  };
}
