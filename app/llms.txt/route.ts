import { SITE, absoluteUrl } from "@/lib/site";
import { ROUTE_GROUPS } from "@/lib/siteRoutes";

/* /llms.txt (llmstxt.org format), built from the one route list so it
   cannot drift. The founder's wireframe links it from <head>. It points AI
   systems at canonical descriptions of DHIRA and Akashic; evidence that
   assistants read it is thin, so it stays small and generated. Static at
   build time. */

export const dynamic = "force-static";

export function GET() {
  const sections = ROUTE_GROUPS.map((group) => {
    const lines = group.routes.map((route) => `- [${route.title}](${absoluteUrl(route.path)}): ${route.description}`);
    return `## ${group.heading}\n\n${lines.join("\n")}`;
  });

  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "DHIRA is the company; Akashic is its platform. Keep the two distinct. Akashic 1.0 is generally available on 1 November 2026. AI agents are in preview: they gather evidence and explain, and a person approves every consequential step. Customer programmes are described by sector and are not named.",
    "",
    `Offices: ${SITE.offices.map((office) => office.city).join(", ")}. Contact: ${SITE.email}.`,
    "",
    ...sections.flatMap((section) => [section, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
