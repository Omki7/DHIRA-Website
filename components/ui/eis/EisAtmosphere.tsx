// Solid surfaces establish the product page's hierarchy in both appearances.
export default function EisAtmosphere({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "overcast" | "dusk";
  className?: string;
}) {
  const surface = variant === "hero" ? "bg-eis-band" : variant === "overcast" ? "bg-primary-bg" : "bg-anchor";
  return <div aria-hidden className={`pointer-events-none absolute inset-0 ${surface} ${className}`} />;
}
