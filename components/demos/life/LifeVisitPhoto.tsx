import Image from "next/image";

// Keep the existing tight crop: the care gesture, without a geographic claim.
export default function LifeVisitPhoto({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src="/proof/point-of-care.jpg" alt="" aria-hidden fill priority
        sizes="(min-width: 1024px) 40vw, 0px" className="object-cover object-center" />
    </div>
  );
}
