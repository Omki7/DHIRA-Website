import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { pageMetadata } from "@/lib/metadata";
import { REGIONAL_PAGES, regionPath } from "@/lib/region";
import { ALL_ROUTES, ROUTE_GROUPS } from "@/lib/siteRoutes";

export const metadata = pageMetadata({
  title: "Site map",
  description: "Every page on the DHIRA website, grouped the way the navigation is.",
  path: "/site-map",
});

/* The HTML site map (GIGW 3.0; the founder's footer links one). Built from
   lib/siteRoutes.ts, the list sitemap.xml and llms.txt also read, plus the
   India versions from lib/region.ts. Article and story pages indent under
   their hub. */
export default function SiteMapPage() {
  const depth = (path: string) => path.split("/").filter(Boolean).length;
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero
          label="Site map"
          setup="Site map."
          payoff="Every page, in one place."
          lede="Grouped the way the navigation is. Articles, stories and press releases sit under their hubs."
          meta={`${ALL_ROUTES.length + REGIONAL_PAGES.length} pages`}
        />
        <section className="bg-background pb-24 pt-12 lg:pb-32 lg:pt-16">
          <ScrollRevealRail isLast>
            <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {ROUTE_GROUPS.map((group) => (
                <div key={group.heading}>
                  <h2 className="border-b border-lineSoft pb-3 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{group.heading}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {group.routes.map((route) => {
                      const child = depth(route.path) > 1 && !route.path.startsWith("/sectors") && !route.path.startsWith("/solutions/") && route.path !== "/akashic/1-0";
                      return (
                        <li key={route.path} className={child ? "pl-4" : ""}>
                          <Link
                            href={route.path}
                            className={`${child ? "text-[14px] text-secondary-text" : "text-[15px] font-medium text-ink"} transition-colors duration-150 hover:text-blue`}
                          >
                            {route.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {REGIONAL_PAGES.length > 0 && (
                <div>
                  <h2 className="border-b border-lineSoft pb-3 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">India</h2>
                  <ul className="mt-4 space-y-2.5">
                    {REGIONAL_PAGES.map((page) => {
                      const title = ALL_ROUTES.find((route) => route.path === page.path)?.title ?? page.path;
                      return (
                        <li key={page.path}>
                          <Link href={regionPath(page.path, "in")} className="text-[15px] font-medium text-ink transition-colors duration-150 hover:text-blue">
                            {title}, India
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </ScrollRevealRail>
        </section>
      </main>
      <Footer />
    </>
  );
}
