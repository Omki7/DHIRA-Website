import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { HomePage } from "@/features/home";
import { getCustomerStories, getPage, getRoles } from "@/services/content/content";
import { PageMinimap } from "@/shared/components/navigation";

/* The home page takes the site-wide title and description (app/layout.tsx);
   it sets only its canonical. The body is features/home (HomePage). */
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const [page, stories, roles] = await Promise.all([getPage("home"), getCustomerStories(), getRoles()]);
  return (
    <>
      <Nav />
      <HomePage page={page} stories={stories} roles={roles} />
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
