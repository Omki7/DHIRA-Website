/* ------------------------------------------------------------------ */
/*  Environment                                                        */
/* ------------------------------------------------------------------ */
/* The one place the app reads process.env. Every variable is declared
   here, given a safe default where one exists, and documented in
   .env.example. A CMS integration adds its project id and tokens here
   (server-only values without the NEXT_PUBLIC_ prefix). */

const trimSlash = (url: string) => url.replace(/\/$/, "");

export const env = {
  /** Canonical origin for metadata, sitemaps and structured data. Override
      on preview deployments so canonicals point at the preview host. */
  siteUrl: trimSlash(process.env.NEXT_PUBLIC_SITE_URL || "https://www.dhira.ai"),
} as const;
