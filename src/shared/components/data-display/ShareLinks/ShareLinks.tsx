"use client";

/*
 * Share row for articles and press releases: LinkedIn, X, email, and copy
 * link. Text links in the mono label style, no brand icons (the footer
 * carries the one LinkedIn mark). The copy button confirms in place.
 */

import { useState } from "react";
import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import styles from "./ShareLinks.module.scss";

export interface ShareLinksProps {
  url: string;
  title: string;
}

export function ShareLinks({ url, title }: ShareLinksProps) {
  const { share } = useUi();
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    { label: share.linkedIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: share.x, href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}` },
    { label: share.email, href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ];
  const linkClass = styles.link;

  return (
    <div className={styles.root}>
      <p className={styles.label}>{share.label}</p>
      <ul className={styles.list}>
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
            className={cx(linkClass, styles.copy)}
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
            {copied ? share.copied : share.copy}
          </button>
        </li>
      </ul>
    </div>
  );
}
