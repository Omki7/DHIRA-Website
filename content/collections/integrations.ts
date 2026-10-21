/* ------------------------------------------------------------------ */
/*  Integrations: the connector directory (added 15 Oct 2026)          */
/* ------------------------------------------------------------------ */
/* Every connector here is one the /akashic [10] module sheets already list
   (akashicModules: Pipelines source connectors, Warehouse connectors, Ask
   Akashic model providers), read from that document so the two pages
   cannot drift. Document intake and identity lines come from the same
   sheets' capability groups. Nothing is listed that the sheets do not.
   In a CMS a connector is one entry with a category reference; the
   module sheets then reference the same entries. Read through
   getIntegrations() (lib/content.ts). */

import { akashicModules, type Conn } from "../pages/akashic";

export type Connector = Conn & {
  /** The Akashic module that reads it. */
  module: string;
};

export interface ConnectorCategory {
  id: string;
  name: string;
  line: string;
  items: Connector[];
}

const conns = (moduleId: string, groupLabel: string): Conn[] => {
  const group = akashicModules.find((m) => m.id === moduleId)?.groups.find((g) => g.label === groupLabel);
  return group && group.kind === "conn" ? group.items : [];
};

const sources = conns("pipelines", "Source connectors");
const warehouses = conns("warehouse", "Warehouse connectors");
const models = conns("ask", "Model providers · bring your own key");

const pick = (list: Conn[], names: string[], module: string): Connector[] =>
  names.flatMap((name) => {
    const found = list.find((conn) => conn.name === name);
    return found ? [{ ...found, module }] : [];
  });

export const connectorCategories: ConnectorCategory[] = [
  {
    id: "applications",
    name: "Business applications",
    line: "CRM, ERP, HR and service systems, read in place.",
    items: pick(sources, ["Salesforce", "SAP", "NetSuite", "HubSpot", "Workday", "Zendesk"], "Akashic Pipelines"),
  },
  {
    id: "databases",
    name: "Databases",
    line: "Relational and document stores, by query or change capture.",
    items: pick(sources, ["Postgres", "MySQL", "MongoDB"], "Akashic Pipelines"),
  },
  {
    id: "platforms",
    name: "Cloud data platforms",
    line: "Your warehouse or ours. Models and metrics land where you choose.",
    items: pick(warehouses, ["Snowflake", "BigQuery", "Databricks", "Redshift", "Synapse"], "Akashic Warehouse"),
  },
  {
    id: "streams",
    name: "Streams, files and APIs",
    line: "Events as they happen, files on arrival, any system with an API.",
    items: pick(sources, ["Kafka", "Amazon S3", "Sheets", "REST / Webhook"], "Akashic Pipelines"),
  },
  {
    id: "documents",
    name: "Documents",
    line: "Unstructured intake, parsed and linked to the entities it mentions.",
    items: [
      { mono: "PDF", name: "PDF, layout-aware", color: "#B4372C", module: "Akashic Pipelines" },
      { mono: "DOC", name: "DOCX and XLSX", color: "#2B579A", module: "Akashic Pipelines" },
      { mono: "EML", name: "Email and attachments", color: "#5A6270", module: "Akashic Pipelines" },
      { mono: "OCR", name: "Scanned documents", color: "#1A1C1D", module: "Akashic Pipelines" },
    ],
  },
  {
    id: "models",
    name: "AI models",
    line: "Each task on a named model. Bring your own key, or host it inside your boundary.",
    items: pick(models, ["Anthropic Claude", "OpenAI", "Azure OpenAI", "Llama / Mistral", "Akashic-hosted"], "Ask Akashic"),
  },
  {
    id: "identity",
    name: "Identity and delivery",
    line: "Sign-in, provisioning and the surfaces answers reach.",
    items: [
      { mono: "SSO", name: "SAML single sign-on", color: "#3E63DD", module: "Akashic Governance" },
      { mono: "SC", name: "SCIM provisioning", color: "#3E63DD", module: "Akashic Governance" },
      { mono: "SDK", name: "Embedded analytics", color: "#1A1C1D", module: "Akashic BI" },
      { mono: "@", name: "Scheduled email reports", color: "#5A6270", module: "Akashic BI" },
    ],
  },
];
