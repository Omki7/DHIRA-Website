import type { OrganizationCredential } from "@/content/pages/about";
import styles from "./AboutCredentials.module.scss";

/* ------------------------------------------------------------------ */
/*  Vector Marks: Hackathons / DPIIT / Udyam / IIT Madras             */
/* ------------------------------------------------------------------ */

/**
 * Hackathon Winner mark:
 * Victory laurel cup and central radiant star.
 */
function HackathonSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M13 10H27V19C27 22.866 23.866 26 20 26C16.134 26 13 22.866 13 19V10Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M13 12H10C8.5 12 7.5 13.5 8 15C8.8 17.5 11 19 13 19.5"
        stroke="rgb(var(--ink))"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M27 12H30C31.5 12 32.5 13.5 32 15C31.2 17.5 29 19 27 19.5"
        stroke="rgb(var(--ink))"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M20 26V31M15 31H25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M20 13.5L21.2 16.5H24.5L21.8 18.2L22.8 21.2L20 19.5L17.2 21.2L18.2 18.2L15.5 16.5H18.8L20 13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Startup India / DPIIT mark:
 * Ashoka Chakra foundation anchor with dynamic ascending multi-tier wings.
 */
function DpiitSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="13" cy="27" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="13" cy="27" r="1.8" fill="currentColor" />
      <line x1="13" y1="20.5" x2="13" y2="33.5" stroke="currentColor" strokeWidth="1" />
      <line x1="6.5" y1="27" x2="19.5" y2="27" stroke="currentColor" strokeWidth="1" />
      <line x1="8.4" y1="22.4" x2="17.6" y2="31.6" stroke="currentColor" strokeWidth="0.9" />
      <line x1="8.4" y1="31.6" x2="17.6" y2="22.4" stroke="currentColor" strokeWidth="0.9" />
      <path
        d="M16 20C19.5 14 26 8.5 35 5.5C31.5 14.5 26.5 21 21.5 24"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 22.5C22 17.5 28 12.5 36.5 10C33 18 28 23 23 26"
        stroke="rgb(var(--ink))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 16.5L37.5 6L28.5 22.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Udyam Registration (Ministry of MSME) mark:
 * Precision 12-tooth industrial spur gear, inner 24-spoke Ashoka core, and growth arcs.
 */
function UdyamSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M18 5h4l1 3 3 1 3-2 3 3-2 3 1 3 3 1v4l-3 1-1 3 2 3-3 3-3-2-3 1-1 3h-4l-1-3-3-1-3 2-3-3 2-3-1-3-3-1v-4l3-1 1-3-2-3 3-3 3 2 3-1 1-3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="8" stroke="rgb(var(--ink))" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="2.2" fill="currentColor" />
      <line x1="20" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1" />
      <line x1="14.34" y1="14.34" x2="25.66" y2="25.66" stroke="currentColor" strokeWidth="0.9" />
      <line x1="14.34" y1="25.66" x2="25.66" y2="14.34" stroke="currentColor" strokeWidth="0.9" />
      <path d="M7 29C7 29 5 18 13.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M33 29C33 29 35 18 26.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * IIT Madras Centre of Excellence mark:
 * Radiant sunburst, knowledge portal arch, flanking gear teeth, flame, and waves of action.
 */
function IitMadrasSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M20 4.5V7.5M13.5 7.5L15.5 9.5M26.5 7.5L24.5 9.5M9.5 12.5H12.5M30.5 12.5H27.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M16 10.5C16 8.3 17.8 6.5 20 6.5C22.2 6.5 24 8.3 24 10.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M12 29V14.5C12 12.5 14 10.5 20 10.5C26 10.5 28 12.5 28 14.5V29"
        stroke="rgb(var(--ink))"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M9 17.5H12M9 21.5H12M9 25.5H12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M28 17.5H31M28 21.5H31M28 25.5H31" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M20 15.5C18.5 18.5 18 20.5 20 22.5C22 20.5 21.5 18.5 20 15.5Z" fill="currentColor" />
      <path d="M10 31.5C13 30 17 30 20 31.5C23 33 27 33 30 31.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 34.5C15 33 18 33 20 34.5C22 36 25 36 28 34.5" stroke="rgb(var(--ink))" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function CredentialSymbol({ symbol }: { symbol: OrganizationCredential["symbol"] }) {
  switch (symbol) {
    case "hackathons":
      return <HackathonSymbol className="h-full w-full" />;
    case "dpiit":
      return <DpiitSymbol className="h-full w-full" />;
    case "udyam":
      return <UdyamSymbol className="h-full w-full" />;
    case "iit-madras":
      return <IitMadrasSymbol className="h-full w-full" />;
    default:
      return null;
  }
}

export default function AboutCredentials({ credentials }: { credentials?: OrganizationCredential[] }) {
  if (!credentials || credentials.length === 0) return null;

  return (
    <div className={styles.wrapper} aria-label="Recognition and institutional credentials">
      <div className={styles.grid}>
        {credentials.map((cred) => (
          <article key={cred.id} className={styles.item}>
            <div className={styles.symbolRow}>
              <div className={styles.symbolBox}>
                <CredentialSymbol symbol={cred.symbol} />
              </div>
              <span className={styles.tag}>{cred.tag}</span>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{cred.name}</h3>
              <p className={styles.issuer}>{cred.issuer}</p>
              <p className={styles.detail}>{cred.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
