import React from "react";

const ICONS: Record<string, React.ReactNode[]> = {
  "Akashic Data Warehouse": [
    <rect key="1" x="4" y="4" width="16" height="16" rx="2" />,
    <line key="2" x1="4" y1="10" x2="20" y2="10" />,
    <line key="3" x1="4" y1="16" x2="20" y2="16" />,
    <circle key="4" cx="8" cy="7" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Akashic Data Pipelines": [
    <path key="1" d="M4 12h5l3 4h8" />,
    <path key="2" d="M4 8h3l3 4h2" />,
    <circle key="3" cx="20" cy="16" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Akashic BI": [
    <rect key="1" x="4" y="14" width="4" height="6" rx="1" />,
    <rect key="2" x="10" y="8" width="4" height="12" rx="1" />,
    <rect key="3" x="16" y="4" width="4" height="16" rx="1" />,
    <circle key="4" cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Akashic Insights": [
    <circle key="1" cx="11" cy="11" r="6" />,
    <line key="2" x1="15" y1="15" x2="20" y2="20" />,
    <path key="3" d="M11 8v3l2 2" />,
    <circle key="4" cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Akashic Machine Learning": [
    <path key="1" d="M12 4v4m0 8v4m-8-8h4m8 0h4" />,
    <rect key="2" x="8" y="8" width="8" height="8" rx="2" />,
    <circle key="3" cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Akashic Master Data": [
    <circle key="1" cx="12" cy="12" r="5" />,
    <path key="2" d="M12 3v4M12 17v4M3 12h4M17 12h4" />,
    <circle key="3" cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Akashic Data Governance": [
    <rect key="1" x="5" y="6" width="14" height="14" rx="2" />,
    <path key="2" d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />,
    <circle key="3" cx="12" cy="13" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Akashic Workflow": [
    <rect key="1" x="4" y="4" width="6" height="6" rx="1.5" />,
    <rect key="2" x="14" y="14" width="6" height="6" rx="1.5" />,
    <path key="3" d="M7 10v4a2 2 0 0 0 2 2h5" />,
    <circle key="4" cx="17" cy="7" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Akashic EIS": [
    <rect key="1" x="4" y="4" width="16" height="16" rx="2" />,
    <path key="2" d="M4 9h16M9 4v16" />,
    <circle key="3" cx="14" cy="14" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Akashic Life": [
    <circle key="1" cx="12" cy="8" r="4" />,
    <path key="2" d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />,
    <circle key="3" cx="12" cy="8" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Akashic Knowledge": [
    <path key="1" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />,
    <path key="2" d="M4 10h16M8 4v16" />,
    <circle key="3" cx="12" cy="14" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Public Sector": [
    <path key="1" d="M12 3L4 8v1h16V8L12 3z" />,
    <path key="2" d="M6 9v8M10 9v8M14 9v8M18 9v8" />,
    <path key="3" d="M4 17h16v3H4z" />,
    <circle key="4" cx="12" cy="6" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Healthcare": [
    <path key="1" d="M12 6v12M6 12h12" />,
    <circle key="2" cx="12" cy="12" r="8" />,
    <circle key="3" cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Education": [
    <path key="1" d="M12 4l8 5-8 5-8-5 8-5z" />,
    <path key="2" d="M6 10v6c0 2 3 4 6 4s6-2 6-4v-6" />,
    <circle key="3" cx="12" cy="14" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Enterprise": [
    <rect key="1" x="4" y="10" width="6" height="10" rx="1" />,
    <rect key="2" x="14" y="4" width="6" height="16" rx="1" />,
    <circle key="3" cx="17" cy="8" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Manufacturing": [
    <path key="1" d="M4 20V11l4 3V11l4 3V11l4 3V4l4 4v12H4z" />,
    <path key="2" d="M4 20h16" />,
    <circle key="3" cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Finance": [
    <path key="1" d="M4 19h16" />,
    <path key="2" d="M6 19V11m5 8V6m5 13v-9" />,
    <circle key="3" cx="16" cy="10" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Retail": [
    <path key="1" d="M5 8l1.5-4h11L19 8" />,
    <path key="2" d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8z" />,
    <path key="3" d="M9 12a3 3 0 0 0 6 0" />,
    <circle key="4" cx="18" cy="8" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Energy": [
    <path key="1" d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />,
    <circle key="2" cx="18" cy="12" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "AI Readiness Audit": [
    <path key="1" d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />,
    <path key="2" d="M16 3v6M13 6h6" />,
    <circle key="3" cx="16" cy="6" r="1.5" fill="currentColor" stroke="none" />,
    <path key="4" d="M8 12l3 3 4-4" />,
  ],
  "Sovereign Blueprint": [
    <path key="1" d="M4 4h16v16H4z" />,
    <path key="2" d="M4 12h16M12 4v16" />,
    <circle key="3" cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Governance Framework": [
    <rect key="1" x="4" y="4" width="16" height="16" rx="2" />,
    <path key="2" d="M8 4v16M16 4v16" />,
    <circle key="3" cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Platform Deployment": [
    <path key="1" d="M12 4v8M8 8l4-4 4 4" />,
    <path key="2" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />,
    <circle key="3" cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Legacy Modernization": [
    <path key="1" d="M4 12a8 8 0 0 1 8-8 8 8 0 0 1 8 8" />,
    <path key="2" d="M20 12h-4M4 12H8" />,
    <path key="3" d="M12 12v4" />,
    <circle key="4" cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Custom Accelerators": [
    <path key="1" d="M13 3L8 12h5l-1 9 5-9h-5l1-9z" />,
    <circle key="2" cx="14" cy="10" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Customer Stories": [
    <path key="1" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    <circle key="2" cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Perspectives": [
    <path key="1" d="M2 12A10 10 0 0 0 22 12A10 10 0 0 0 2 12z" />,
    <path key="2" d="M12 2A15 15 0 0 0 12 22A15 15 0 0 0 12 2z" />,
    <path key="3" d="M2 12h20" />,
    <circle key="4" cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Documentation": [
    <path key="1" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />,
    <path key="2" d="M14 2v6h6" />,
    <path key="3" d="M8 13h8M8 17h8" />,
    <circle key="4" cx="10" cy="9" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Guides": [
    <path key="1" d="M9 4L4 10l5 6" />,
    <path key="2" d="M15 4l5 6-5 6" />,
    <circle key="3" cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "About Us": [
    <path key="1" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    <circle key="2" cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Careers": [
    <rect key="1" x="6" y="8" width="12" height="12" rx="1" />,
    <path key="2" d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />,
    <circle key="3" cx="12" cy="14" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Access Control": [
    <rect key="1" x="4" y="10" width="16" height="11" rx="2" />,
    <path key="2" d="M8 10V7a4 4 0 0 1 8 0v3" />,
    <circle key="3" cx="12" cy="15.5" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Lineage": [
    <path key="1" d="M5 19V9a4 4 0 0 1 4-4h10" />,
    <path key="2" d="M5 13h8a4 4 0 0 0 4-4V5" />,
    <circle key="3" cx="19" cy="5" r="1.5" fill="currentColor" stroke="none" />,
    <circle key="4" cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Audit Trails": [
    <path key="1" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />,
    <path key="2" d="M14 2v6h6" />,
    <path key="3" d="M8 13h6M8 17h4" />,
    <circle key="4" cx="16" cy="17" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Data Residency": [
    <path key="1" d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />,
    <circle key="2" cx="12" cy="10" r="2.5" />,
    <circle key="3" cx="12" cy="10" r="1" fill="currentColor" stroke="none" />,
  ],
  "Cloud Deployment": [
    <path key="1" d="M7 18a4 4 0 0 1-.6-7.96 5.5 5.5 0 0 1 10.9-.54A4.3 4.3 0 0 1 16.7 18H7z" />,
    <circle key="2" cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "On-Premises": [
    <rect key="1" x="5" y="3" width="14" height="18" rx="2" />,
    <path key="2" d="M9 7.5h6M9 11.5h6M9 15.5h3" />,
    <circle key="3" cx="15" cy="17.5" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Hybrid Deployment": [
    <rect key="1" x="3" y="13" width="8" height="8" rx="1.5" />,
    <path key="2" d="M15 11a3 3 0 0 1 0-6 4 4 0 0 1 7.5 1.2A2.6 2.6 0 0 1 21 11h-6z" />,
    <path key="3" d="M11 17h4a3 3 0 0 0 3-3v-3" />,
    <circle key="4" cx="7" cy="17" r="1.5" fill="currentColor" stroke="none" />,
  ],
  "Workforce": [
    <circle key="1" cx="12" cy="12" r="8" />,
    <path key="2" d="M4 12h16" />,
    <path key="3" d="M12 4a12 12 0 0 1 0 16 12 12 0 0 1 0-16z" />,
    <circle key="4" cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />,
  ],
};

const DEFAULT_ICON = [
  <rect key="1" x="3" y="3" width="18" height="18" rx="2" />,
  <path key="2" d="M8 8l8 8" />,
  <circle key="3" cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />,
];

export default function DynamicSketchIcon({ text, className = "" }: { text: string; className?: string }) {
  const shapes = ICONS[text] || DEFAULT_ICON;

  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {shapes}
    </svg>
  );
}
