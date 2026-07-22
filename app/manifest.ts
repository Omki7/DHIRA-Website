import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DHIRA — Answers you can act on.",
    short_name: "DHIRA",
    description:
      "From spreadsheets to PDFs to live streams, DHIRA gives your AI the full picture. Powered by Akashic, the complete record of your data.",
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
