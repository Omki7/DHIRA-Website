/* The earlier interactive kolam is retained in .archive. Its continuous
   sources meeting a common foundation reprise section 01 in the close. */
export default function KolamCulture() {
  return (
    <svg viewBox="0 0 320 80" fill="none" aria-hidden="true" className="h-auto w-full text-blue">
      {[12, 40, 68].map((y) => (
        <g key={y}>
          <circle cx="8" cy={y} r="3" stroke="rgb(var(--inkSoft))" />
          <path d={`M11 ${y} H80 C124 ${y} 116 40 160 40 H205`} stroke="rgb(var(--inkSoft))" strokeWidth="1.2" />
        </g>
      ))}
      <path d="M205 40H310" stroke="currentColor" strokeWidth="2" />
      <circle cx="205" cy="40" r="4" fill="currentColor" />
      <path d="m302 34 8 6-8 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
