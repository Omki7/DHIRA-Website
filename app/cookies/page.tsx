import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { getLegalDoc, getLegalDocs } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const SLUG = "cookies";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc(SLUG);
  return doc ? pageMetadata({ title: doc.title, description: doc.summary, path: `/${SLUG}` }) : {};
}

export default async function CookiesPage() {
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
