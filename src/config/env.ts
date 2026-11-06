/* ------------------------------------------------------------------ */
/*  Environment                                                        */
/* ------------------------------------------------------------------ */
/* The one place the app reads process.env. Every variable is declared
   here, given a safe default where one exists, validated once with Zod
   (the build fails fast on a bad value) and documented in .env.example.
   A CMS integration adds its project id and tokens here (server-only
   values without the NEXT_PUBLIC_ prefix). NEXT_PUBLIC_ names stay
   written out in full so Next.js can inline them for the browser. */

import { z } from "zod";

const EnvSchema = z.object({
  /** Canonical origin for metadata, sitemaps and structured data. Override
      on preview deployments so canonicals point at the preview host. */
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("https://www.dhira.ai")
    .transform((url) => url.replace(/\/$/, "")),
  /** Base address for the Dhira Strapi/CMS instance. */
  CMS_URL: z
    .string()
    .url()
    .default("http://44.237.23.212:4000")
    .transform((url) => url.replace(/\/$/, "")),
});

const parsed = EnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  CMS_URL: process.env.CMS_URL || undefined,
});

export const env = {
  siteUrl: parsed.NEXT_PUBLIC_SITE_URL,
  cmsUrl: parsed.CMS_URL,
} as const;
