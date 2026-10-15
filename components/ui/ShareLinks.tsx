"use client";

/*
 * Share row for articles and press releases: LinkedIn, X, email, and copy
 * link. Text links in the mono label style, no brand icons (the footer
 * carries the one LinkedIn mark). The copy button confirms in place.
 */

import { useState } from "react";

export default function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "X", href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}` },
    { label: "Email", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ];
  const linkClass = "text-inkSoft transition-colors duration-150 hover:text-blue";

  return (
    <div className="font-mono text-[11px] uppercase tracking-eyebrow">
      <p className="text-overcast">Share</p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={linkClass}
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            className={`${linkClass} uppercase`}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? "Link copied" : "Copy link"}
          </button>
        </li>
      </ul>
    </div>
  );
}
