import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/content";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { name, seo } = await getSiteSettings();
  return {
    name: seo.title,
    short_name: name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0E24",
    theme_color: "#0A0E24",
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
