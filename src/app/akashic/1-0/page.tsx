import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { pageMetadata } from "@/app/_lib/metadata";
import { AkashicReleasePage } from "@/features/akashic";
import { getPage, getUiStrings } from "@/services/content/content";
import { PageMinimap } from "@/shared/components/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("akashic/1-0");
  return pageMetadata(seo);
}

/* The hero carries the launch countdown; the page carries
   SoftwareApplication structured data for the release. */
export default async function Page() {
  const [page, ui] = await Promise.all([getPage("akashic/1-0"), getUiStrings()]);
  return (
    <>
      <Nav />
      <AkashicReleasePage page={page} ui={ui} />
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
