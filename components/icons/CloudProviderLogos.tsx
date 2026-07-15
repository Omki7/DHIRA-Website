import React from "react";

/*
 * Real cloud-provider marks (brand-accurate colours) used by the /akashic
 * architecture section. Static SVG only, no logic.
 */

export function AwsLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 30" className={className} role="img" aria-label="AWS" fill="none">
      <text
        x="25"
        y="17"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="17"
        fontWeight="700"
        letterSpacing="-0.8"
        fill="#232F3E"
      >
        aws
      </text>
      <path d="M7 20.8c9.4 5.8 26.3 5.8 35-.7" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M41.2 16.9l4.5 1.4-3.2 3.6c-.2-1.7-.7-3.4-1.3-5z" fill="#FF9900" />
    </svg>
  );
}

export function AzureLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="Microsoft Azure" fill="none">
      <path
        fill="#0089D6"
        d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505L13.23 2.7z"
      />
    </svg>
  );
}

export function GoogleGLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Google Cloud" fill="none">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
