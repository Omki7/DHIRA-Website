/*
 * A section's one onward link: a quiet text link with an arrow, set UNDER the
 * lede inside `ui/SectionHeader` (pass it as `children`). Never a button and
 * never at the section's foot: sections end on their content (DESIGN_SYSTEM,
 * "Section grammar", founder 20 Oct 2026).
 */

import Link from "next/link";

export default function SectionLink({ href, children, tone = "light" }: { href: string; children: string; tone?: "light" | "depth" }) {
  return (
    <Link
      href={href}
      className={`group mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium underline underline-offset-[6px] transition-colors duration-200 ease-settle hover:decoration-current ${
        tone === "depth"
            ? "text-uc-text decoration-line hover:text-blue-300"
            : "text-ink decoration-line hover:text-blue"
      }`}
    >
      {children}
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden>
        <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
