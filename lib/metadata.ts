import type { Metadata } from "next";
import { REGIONS, regionAlternates, regionPath, type Region } from "./region";

/* Page metadata in one shape: title, description, canonical, Open Graph and
   Twitter card. Paths are relative; the root layout's metadataBase
   (lib/site.ts SITE_URL) makes them absolute. Older pages still spell the
   same block out by hand; new pages use this.
   `region` is for a page with an India version (lib/region.ts): the
   canonical becomes that version's own path and both versions are listed
   as hreflang alternates, so search shows each country its own page. */

export function pageMetadata({
  title,
  description,
  path,
  image = "/og-image.png",
  type = "website",
  region,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  region?: Region;
}): Metadata {
  const full = `${title} | DHIRA`;
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
      siteName: "DHIRA",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [image] },
  };
}
