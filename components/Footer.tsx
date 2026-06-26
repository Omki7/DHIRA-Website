"use client";

import Link from "next/link";
import DhiraLogo from "./DhiraLogo";

const footerLinks = {
  Akashic: ["Data Pipelines", "Master Data", "Data Warehouse", "Workflow", "Machine Learning", "BI", "Insights", "Data Governance"],
  Solutions: ["EIS", "Life", "Knowledge", "Public Sector", "Healthcare", "Education", "Enterprise"],
  Delivery: ["AI Readiness Audit", "Sovereign Blueprint", "Governance Framework", "Platform Deployment", "Legacy Modernization", "Custom Accelerators"],
  Company: ["About Us", "Careers", "Customer Stories", "Perspectives", "Documentation", "Guides"],
};

const slug = (s: string) => `#${s.toLowerCase().replace(/[^a-z0-9]+/g, "")}`;

export default function Footer() {
  return (
    <footer className="bg-vault text-white pt-20 pb-10">
      <div className="rail-container-dark">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 lg:gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2 flex flex-col items-start">
            <Link href="/" aria-label="DHIRA homepage" className="flex items-center gap-1.5 text-white mb-6">
              <DhiraLogo className="h-10 w-10 text-white" />
              <span className="text-[22px] font-semibold tracking-tight">DHIRA</span>
            </Link>
            <p className="text-overcast text-sm leading-relaxed max-w-[260px] mb-8">
              DHIRA brings all of your data and AI together, grounded in the full picture.
            </p>
            <div className="flex items-center gap-1.5 text-sm font-medium text-white/90">
              <span className="text-[#266df2]">&#10003;</span> Verified Record
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href={slug(link)} className="text-overcast text-sm hover:text-white transition-colors duration-250 ease-settle">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-overcast">
            <span>&copy; {new Date().getFullYear()} DHIRA. All rights reserved.</span>
            <Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-4 text-overcast">
            <Link href="#twitter" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
            <Link href="#linkedin" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
