import React from "react";

export default function AkashicLogo({
  className = "h-6 w-6",
  primaryColor = "currentColor",
  accentColor = "#0F9CA6",
}: {
  className?: string;
  primaryColor?: string;
  accentColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <line x1="100" y1="50" x2="58" y2="156" stroke={primaryColor} strokeWidth="6" />
      <line x1="100" y1="50" x2="142" y2="156" stroke={primaryColor} strokeWidth="6" />
      
      <line x1="79" y1="103" x2="121" y2="103" stroke={accentColor} strokeWidth="6" />
      
      <circle cx="58" cy="156" r="10" fill={primaryColor} />
      <circle cx="142" cy="156" r="10" fill={primaryColor} />
      
      <circle cx="79" cy="103" r="8" fill={primaryColor} />
      <circle cx="121" cy="103" r="8" fill={primaryColor} />
      
      <circle cx="100" cy="50" r="13" fill={accentColor} />
      
      <circle cx="124" cy="30" r="4" fill={accentColor} opacity="0.6" />
      <circle cx="80" cy="26" r="3.4" fill={accentColor} opacity="0.45" />
    </svg>
  );
}
