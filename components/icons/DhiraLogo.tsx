import React from "react";

export default function DhiraLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M48,32 L86,32 C133,32 164,62 164,100 C164,138 133,168 86,168 L48,168 Z M95,56 a30,44 0 1,0 0,88 a30,44 0 1,0 0,-88 Z"
      />
      <rect x="90" y="66" width="13" height="68" rx="2" fill="#1E63E6" />
      <polygon points="90,66 90,80 76,80" fill="#1E63E6" />
      <rect x="78" y="122" width="34" height="12" rx="2" fill="#1E63E6" />
    </svg>
  );
}
