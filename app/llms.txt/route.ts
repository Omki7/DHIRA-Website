import { getSiteMap, getSiteSettings } from "@/lib/content";
import { getRouteGroups } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

/* /llms.txt (llmstxt.org format), built from the one route list so it
   cannot drift. It points AI systems at canonical descriptions of DHIRA
   and Akashic; evidence that assistants read it is thin, so it stays small
   and generated. Static at build time. */

export const dynamic = "force-static";

export async function GET() {
  const [groups, site, { llms }] = await Promise.all([getRouteGroups(), getSiteSettings(), getSiteMap()]);
  const sections = groups.map((group) => {
    const lines = group.routes.map((route) => `- [${route.title}](${absoluteUrl(route.path)}): ${route.description}`);
    return `## ${group.heading}\n\n${lines.join("\n")}`;
  });

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    llms.note,
    "",
    `${llms.offices}: ${site.offices.map((office) => office.city).join(", ")}. ${llms.contact}: ${site.email}.`,
    "",
    ...sections.flatMap((section) => [section, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
