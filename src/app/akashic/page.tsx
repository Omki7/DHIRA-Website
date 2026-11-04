import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { pageMetadata } from "@/app/_lib/metadata";
import { AkashicPage } from "@/features/akashic";
import { getCustomerStories, getPage } from "@/services/content/content";
import { PageMinimap } from "@/shared/components/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("akashic");
  return pageMetadata(seo);
}

export default async function Page() {
  const [page, stories] = await Promise.all([getPage("akashic"), getCustomerStories()]);
  return (
    <>
      <Nav />
      <AkashicPage page={page} stories={stories} />
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
