import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/* ESLint flat config (Next.js 16 removed `next lint`; run `npm run lint`).
   Next's Core Web Vitals and TypeScript rule sets, plus the one rule that
   keeps the site CMS-ready: outside lib/content.ts, nothing imports a
   content value. Routes read content through lib/content.ts; components
   receive it as props. Type imports from content/ are the contract and
   stay allowed. See docs/CONTENT.md. */

const contentBoundary = {
  patterns: [
    {
      group: ["@/content", "@/content/*", "@/content/**"],
      allowTypeImports: true,
      message: "Read content through lib/content.ts in the route and pass it down as props (docs/CONTENT.md).",
    },
  ],
};

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "hooks/**/*.ts", "lib/**/*.ts"],
    ignores: ["lib/content.ts"],
    rules: {
      "@typescript-eslint/no-restricted-imports": ["error", contentBoundary],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".archive/**", "public/**"]),
]);
