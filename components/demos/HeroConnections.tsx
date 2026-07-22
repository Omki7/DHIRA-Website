export default function HeroConnections() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[120px] z-0 h-[800px] w-[1400px] -translate-x-1/2 overflow-visible">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1400 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
      >
        <defs>
          <linearGradient id="line-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8E8F91" stopOpacity="0" />
            <stop offset="30%" stopColor="#8E8F91" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8E8F91" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-fade-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3E63DD" stopOpacity="0" />
            <stop offset="50%" stopColor="#3E63DD" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3E63DD" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Left */}
        <path d="M 100 200 C 100 500, 600 700, 700 750" stroke="url(#line-fade)" strokeWidth="1" fill="none" />
        <circle cx="100" cy="200" r="3" fill="#8E8F91" />
        {/* Mid Left */}
        <path d="M 300 250 C 300 550, 650 700, 700 750" stroke="url(#line-fade)" strokeWidth="1" fill="none" />
        <circle cx="300" cy="250" r="3" fill="#8E8F91" />
        {/* Inner Left (Active blue) */}
        <path d="M 500 300 C 500 600, 680 700, 700 750" stroke="url(#line-fade-blue)" strokeWidth="2" fill="none" />
        <circle cx="500" cy="300" r="4" fill="#3E63DD" />

        {/* Outer Right */}
        <path d="M 1300 200 C 1300 500, 800 700, 700 750" stroke="url(#line-fade)" strokeWidth="1" fill="none" />
        <circle cx="1300" cy="200" r="3" fill="#8E8F91" />
        {/* Mid Right */}
        <path d="M 1100 250 C 1100 550, 750 700, 700 750" stroke="url(#line-fade)" strokeWidth="1" fill="none" />
        <circle cx="1100" cy="250" r="3" fill="#8E8F91" />
        {/* Inner Right */}
        <path d="M 900 300 C 900 600, 720 700, 700 750" stroke="url(#line-fade)" strokeWidth="1" fill="none" />
        <circle cx="900" cy="300" r="3" fill="#8E8F91" />



        {/* Labels positioned near the top of the lines */}
        <g style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fill: "#5C5E63", letterSpacing: "0.08em", fontWeight: 500 }}>
          <text x="100" y="180" textAnchor="middle">Semantic models</text>
          <text x="300" y="230" textAnchor="middle">Governance rules</text>
          <text x="500" y="280" textAnchor="middle" style={{ fill: "#3E63DD", fontWeight: 600 }}>Endorsed datasets</text>
          
          <text x="900" y="280" textAnchor="middle">Schema &amp; lineage</text>
          <text x="1100" y="230" textAnchor="middle">Prior analyses</text>
          <text x="1300" y="180" textAnchor="middle">Live suggestions</text>
        </g>
      </svg>
    </div>
  );
}
