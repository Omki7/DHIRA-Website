import type { ReactNode } from "react";
import type { ArchitectureIconKey } from "@/content/pages/akashic";

/*
 * The [04] architecture figure's own glyphs (4 Nov 2026, user: the generic
 * sketch icons read weak). One family: a 24-unit grid, round caps and
 * joins, one stroke weight, no fills, so a role, a module and a control
 * read as the same drawing. Drawn for this figure (no third-party set).
 * Every glyph is decorative: its name always sits beside it.
 */
const GLYPHS: Record<ArchitectureIconKey, ReactNode> = {
  /* Teams, boardroom to front line */
  executives: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18M10.5 12.5V14h3v-1.5" />
    </>
  ),
  finance: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9.5h.01M18 14.5h.01" />
    </>
  ),
  sales: <path d="M3 17l5.5-5.5 4 4L21 7M15 7h6v6" />,
  marketing: <path d="M4 9.5h3l8-4.5v14l-8-4.5H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zM7 14.5l1.5 5h2.5l-1.3-4.2M18.5 9.5a3.5 3.5 0 0 1 0 5" />,
  operations: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  "supply-chain": (
    <>
      <rect x="2.5" y="6" width="11" height="9.5" rx="1.5" />
      <path d="M13.5 9h4l3 3.5v3h-7" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M15.5 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.3c2 .8 3.5 2.6 3.5 5.2" />
    </>
  ),
  risk: <path d="M12 4v16M8 20h8M5 7.5h14M5 7.5l-2.5 6a2.5 2.5 0 0 0 5 0zM19 7.5l-2.5 6a2.5 2.5 0 0 0 5 0z" />,
  service: (
    <>
      <path d="M4.5 15v-3a7.5 7.5 0 0 1 15 0v3M19 19c0 1.4-1.6 2.2-4 2.2h-1.5" />
      <rect x="3" y="13.5" width="4" height="5.5" rx="1.5" />
      <rect x="17" y="13.5" width="4" height="5.5" rx="1.5" />
    </>
  ),
  analysts: <path d="M3.5 3.5v17h17M7.5 15l3.5-4 3 2.5 5-6" />,
  "data-teams": <path d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5M13.5 5l-3 14" />,
  "front-line": <path d="M4.5 10v10h15V10M3 10l1.8-5.5h14.4L21 10zM9.5 20v-5.5h5V20" />,

  /* Governance and its controls */
  governance: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" />
      <circle cx="12" cy="10.5" r="2" />
      <path d="M12 12.5v3" />
    </>
  ),
  access: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5v-3a4 4 0 0 1 8 0v3M12 14.5v2" />
    </>
  ),
  masking: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zM4 4l16 16" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  lineage: (
    <>
      <circle cx="5.5" cy="12" r="2.2" />
      <circle cx="18.5" cy="5.5" r="2.2" />
      <circle cx="18.5" cy="18.5" r="2.2" />
      <path d="M7.5 11l9-4.5M7.5 13l9 4.5" />
    </>
  ),
  audit: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <rect x="9" y="3" width="6" height="3" rx="1" />
      <path d="M8.5 10.5h7M8.5 14h7M8.5 17.5h4" />
    </>
  ),
  quality: (
    <>
      <path d="M4 17a8 8 0 1 1 16 0M12 17l3.5-5" />
      <circle cx="12" cy="17" r="1.2" />
    </>
  ),
  residency: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5z" />
    </>
  ),

  /* Intelligence */
  "business-intelligence": (
    <>
      <path d="M4 20h16" />
      <rect x="5.5" y="12" width="3" height="5.5" rx=".6" />
      <rect x="10.5" y="8" width="3" height="9.5" rx=".6" />
      <rect x="15.5" y="4.5" width="3" height="13" rx=".6" />
    </>
  ),
  "ask-akashic": <path d="M20.5 14.5a2 2 0 0 1-2 2H9l-4.5 4v-15a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zM8.5 8.5h8M8.5 12h5" />,
  "machine-learning": (
    <>
      <circle cx="5.5" cy="6" r="2.2" />
      <circle cx="5.5" cy="18" r="2.2" />
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="18.5" cy="12" r="2.2" />
      <path d="M7.1 7.6l3.3 2.8M7.1 16.4l3.3-2.8M14.2 12h2.1" />
    </>
  ),
  agents: (
    <>
      <rect x="3" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="14" y="13.5" width="7" height="7" rx="1.8" />
      <circle cx="17.5" cy="7" r="2.2" />
      <path d="M6.5 10.5v3a3 3 0 0 0 3 3H14" />
    </>
  ),

  /* Knowledge */
  entities: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" />,
  relationships: <path d="M10 13.5a4 4 0 0 0 6 .4l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.4 1.4M14 10.5a4 4 0 0 0-6-.4l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.4-1.4" />,
  definitions: <path d="M12 6.5C10 5 7 4.5 3.5 5v13.5C7 18 10 18.5 12 20c2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5V20" />,
  history: <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1M3.5 3.8v4h4M12 7.5V12l3 2" />,

  /* Data */
  "data-pipelines": <path d="M3 6h3c3.5 0 4 6 7.5 6H21M3 18h3c3.5 0 4-6 7.5-6M18 9l3 3-3 3" />,
  "master-data": (
    <>
      <rect x="3" y="4" width="8" height="5" rx="1.2" />
      <rect x="3" y="15" width="8" height="5" rx="1.2" />
      <rect x="13" y="9.5" width="8" height="5" rx="1.2" />
      <path d="M11 6.5h4a2 2 0 0 1 2 2v1M11 17.5h4a2 2 0 0 0 2-2v-1" />
    </>
  ),
  "data-warehouse": (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.75" />
      <path d="M4.5 5.5v13c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75v-13M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75" />
    </>
  ),

  /* Systems without a licensed mark */
  documents: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 16.5h4" />,
};

export interface ArchitectureIconProps {
  name: ArchitectureIconKey;
  className?: string;
}

export function ArchitectureIcon({ name, className }: ArchitectureIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[name]}
    </svg>
  );
}
