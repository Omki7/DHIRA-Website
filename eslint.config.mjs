import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

/* ESLint flat config (Next.js 16 removed `next lint`; run `npm run lint`).
   Next's Core Web Vitals and TypeScript rule sets, plus the layer rules of
   FRONTEND_ARCHITECTURE §4 and §20:
   - Content boundary: outside src/services/content/content.ts nothing
     imports a content value. Routes read content through the content
     service; components receive it as props. Type imports from content/
     are the contract and stay allowed (docs/CONTENT.md).
   - Layers: shared/ never imports features, app or services; services/
     imports config and shared types only; config/ imports nothing
     app-specific; another feature is imported through its public
     index.ts only.
   - Import order and no import cycles.
   eslint-config-prettier comes last so formatting is Prettier's job. */

const contentBoundary = {
  group: ["@/content", "@/content/*", "@/content/**"],
  allowTypeImports: true,
  message: "Read content through the content service in the route and pass it down as props (docs/CONTENT.md).",
};

const featureInternals = {
  group: ["@/features/*/**"],
  message: "Import another feature through its public index.ts (@/features/<name>), never its internal files.",
};

const forbid = (groups, message) => ({ group: groups, message });

const restrict = (...patterns) => [
  "error",
  { patterns: [contentBoundary, featureInternals, ...patterns] },
];

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    settings: {
      "import/resolver": { typescript: { project: "./tsconfig.json" }, node: true },
    },
    rules: {
      "@typescript-eslint/no-restricted-imports": restrict(),
      "import/no-cycle": ["error", { ignoreExternal: true }],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            { pattern: "@/**", group: "internal" },
            { pattern: "./*.module.scss", group: "index", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "never",
        },
      ],
    },
  },
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-restricted-imports": restrict(
        forbid(["@/app", "@/app/**", "@/features", "@/features/**", "@/services", "@/services/**", "@/components/**"],
          "shared/ is business-agnostic: it may import shared/, config/ and assets/ only (FRONTEND_ARCHITECTURE §4)."),
      ),
    },
  },
  {
    files: ["src/services/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-restricted-imports": restrict(
        forbid(["@/app", "@/app/**", "@/features", "@/features/**", "@/components/**"],
          "services/ may import config/ and shared/types only (FRONTEND_ARCHITECTURE §4)."),
        {
          group: ["@/shared/**", "!@/shared/types", "!@/shared/types/**"],
          allowTypeImports: true,
          message: "services/ may import config/ and shared/types only (FRONTEND_ARCHITECTURE §4).",
        },
      ),
    },
  },
  {
    files: ["src/config/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-restricted-imports": restrict(
        forbid(["@/app", "@/app/**", "@/features", "@/features/**", "@/services/**", "@/shared/**", "@/components/**"],
          "config/ holds env and constants only; it imports nothing app-specific (FRONTEND_ARCHITECTURE §4)."),
      ),
    },
  },
  {
    /* Building blocks never reach up into page sections (docs/ARCHITECTURE.md). */
    files: ["src/components/{demos,ui,icons}/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-restricted-imports": restrict(
        forbid(["@/components/sections/**"], "demos, ui and icons never import page sections."),
      ),
    },
  },
  {
    /* The content documents and the one service that reads them. */
    files: ["src/content/**/*.ts", "src/services/content/content.ts"],
    rules: { "@typescript-eslint/no-restricted-imports": "off" },
  },
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".archive/**", "public/**"]),
]);
