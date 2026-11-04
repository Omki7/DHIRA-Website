import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { getLegalDoc, getLegalDocs } from "@/services/content/content";
import { pageMetadata } from "@/app/_lib/metadata";

const SLUG = "accessibility";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc(SLUG);
  return doc ? pageMetadata({ title: doc.title, description: doc.summary, path: `/${SLUG}` }) : {};
}

export default async function AccessibilityPage() {
  const [doc, docs] = await Promise.all([getLegalDoc(SLUG), getLegalDocs()]);
  if (!doc) notFound();
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <LegalDocument doc={doc} others={docs.filter((item) => item.slug !== SLUG)} />
      </main>
      <Footer />
    </>
  );
}
