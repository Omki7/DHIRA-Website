"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import DhiraLogo from "@/components/icons/DhiraLogo";

const slug = (s: string) =>
  `#${s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

/* ------------------------------------------------------------------ */
/*  Menu data                                                          */
/* ------------------------------------------------------------------ */

type MenuLink = {
  title: string;
  desc?: string;
  href: string;
};

const akashicGroups = [
  {
    heading: "Data Foundation",
    items: [
      { title: "Akashic Data Pipelines", desc: "Automate and scale data ingestion from any source", href: "/akashic#data-pipelines" },
      { title: "Akashic Master Data", desc: "Create a unified, accurate view of core business entities", href: "/akashic#master-data" },
      { title: "Akashic Data Warehouse", desc: "Centralised, secure storage for all your business records", href: "/akashic#data-warehousing" },
      { title: "Akashic Workflow", desc: "Automate complex data processes and team operations", href: "/akashic#modules" },
    ] as MenuLink[],
  },
  {
    heading: "Intelligence & Governance",
    items: [
      { title: "Akashic Machine Learning", desc: "Train and deploy AI models on your proprietary data", href: "/akashic#machine-learning" },
      { title: "Akashic BI", desc: "Real-time analytics and dashboards for faster decisions", href: "/akashic#business-intelligence" },
      { title: "Akashic Insights", desc: "AI-driven search to uncover hidden trends instantly", href: "/akashic#ask-ai" },
      { title: "Akashic Data Governance", desc: "Control access, track lineage, and ensure compliance", href: "/akashic#governance" },
    ] as MenuLink[],
  },
];

const solutionsGroups = [
  {
    heading: "Akashic Plugin",
    items: [
      { title: "Akashic EIS", desc: "Real-time executive dashboards for leadership teams", href: slug("Akashic EIS") },
      { title: "Akashic Life", desc: "Comprehensive data profiles for human-centric services", href: slug("Akashic Life") },
      { title: "Akashic Knowledge", desc: "Centralised intelligence for your entire organisation", href: slug("Akashic Knowledge") },
    ] as MenuLink[],
  },
  {
    heading: "Sectors",
    items: [
      { title: "Manufacturing", desc: "Optimised supply chain and shop floor data systems", href: slug("Manufacturing") },
      { title: "Healthcare", desc: "Unified patient records meeting strict privacy standards", href: slug("Healthcare") },
      { title: "Education", desc: "Connected data systems for institutions and learners", href: slug("Education") },
      { title: "Enterprise", desc: "Scalable data architecture for global organisations", href: slug("Enterprise") },
    ] as MenuLink[],
  },
];

const deliveryGroups = [
  {
    heading: "Strategize",
    items: [
      { title: "AI Readiness Audit", desc: "Assess and prepare your data foundation for AI", href: slug("AI Readiness Audit") },
      { title: "Sovereign Blueprint", desc: "Design secure, localised data infrastructure", href: slug("Sovereign Blueprint") },
      { title: "Governance Framework", desc: "Establish robust data policies and compliance", href: slug("Governance Framework") },
    ] as MenuLink[],
  },
  {
    heading: "Engineer",
    items: [
      { title: "Platform Deployment", desc: "End-to-end implementation of the Akashic platform", href: slug("Platform Deployment") },
      { title: "Legacy Modernization", desc: "Upgrade from outdated legacy systems", href: slug("Legacy Modernization") },
      { title: "Custom Accelerators", desc: "Pre-built modules to speed up deployment", href: slug("Custom Accelerators") },
    ] as MenuLink[],
  },
];

const insightsItems: MenuLink[] = [
  { title: "Customer Stories", desc: "Real-world success and ROI from DHIRA customers", href: slug("Customer Stories") },
  { title: "Perspectives", desc: "Strategic insights on data, AI, and enterprise tech", href: slug("Perspectives") },
  { title: "Documentation", desc: "Technical resources and API references for builders", href: slug("Documentation") },
  { title: "Guides", desc: "Practical walkthroughs to master the platform", href: slug("Guides") },
];

const companyItems: MenuLink[] = [
  { title: "About Us", desc: "Our vision for the future of enterprise data", href: slug("About Us") },
  { title: "Careers", desc: "Join our team of engineers and data experts", href: slug("Careers") },
];

/* ------------------------------------------------------------------ */
/*  Dropdown + row helpers                                             */
/* ------------------------------------------------------------------ */

type DropProps = {
  id: string;
  label: string;
  href?: string;
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
  children?: React.ReactNode;
};

function DropdownTrigger({ id, label, href, openMenu, setOpenMenu, children }: DropProps) {
  const chevron = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
    </svg>
  );

  return (
    <li className="relative">
      {href ? (
        <Link
          href={href}
          className="btn-ghost"
          onMouseEnter={() => setOpenMenu(id)}
          onMouseLeave={() => setOpenMenu(null)}
          onClick={() => setOpenMenu(null)}
          aria-haspopup="true"
          aria-expanded={openMenu === id}
        >
          {label}
          {chevron}
        </Link>
      ) : (
        <button
          className="btn-ghost"
          onMouseEnter={() => setOpenMenu(id)}
          onMouseLeave={() => setOpenMenu(null)}
          aria-haspopup="true"
          aria-expanded={openMenu === id}
        >
          {label}
          {chevron}
        </button>
      )}
      {openMenu === id && (
        <div
          onMouseEnter={() => setOpenMenu(id)}
          onMouseLeave={() => setOpenMenu(null)}
          className="absolute left-0 top-full z-50 mt-1 rounded-card border border-subtle-stroke bg-white p-4 shadow-lg"
        >
          {children}
        </div>
      )}
    </li>
  );
}

function MobileMenuGroups({ heading, groups, topPadding = true }: { heading: string; groups: { heading: string; items: MenuLink[] }[]; topPadding?: boolean }) {
  return (
    <>
      <p className={`${topPadding ? "pt-2 " : ""}text-xs font-medium uppercase tracking-eyebrow text-tertiary-text`}>{heading}</p>
      {groups.map((group) => (
        <div key={group.heading}>
          <p className="pt-1 px-2 text-[11px] uppercase tracking-eyebrow text-tertiary-text">{group.heading}</p>
          {group.items.map((item) => (
            <Link key={item.title} href={item.href} className="block rounded-lg px-2 py-1.5 text-sm font-medium text-primary-text hover:bg-tertiary-bg">
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

function MobileMenuFlat({ heading, items }: { heading: string; items: MenuLink[] }) {
  return (
    <>
      <p className="pt-2 text-xs font-medium uppercase tracking-eyebrow text-tertiary-text">{heading}</p>
      {items.map((item) => (
        <Link key={item.title} href={item.href} className="block rounded-lg px-2 py-1.5 text-sm font-medium text-primary-text hover:bg-tertiary-bg">
          {item.title}
        </Link>
      ))}
    </>
  );
}

function MenuRow({ item }: { item: MenuLink }) {
  return (
    <Link
      href={item.href}
      className="group flex items-center gap-3 rounded-lg p-2 hover:bg-tertiary-bg"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-subtle-stroke bg-secondary-bg text-primary-text">
        <DynamicSketchIcon text={item.title} className="h-5 w-5" />
      </div>
      <div>
        <div className="flex items-center gap-1 text-sm font-medium text-primary-text">
          {item.title}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-0 transition-opacity group-hover:opacity-100">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.3536 6.35356C10.5488 6.1583 10.5488 5.84171 10.3536 5.64645L7.85355 3.14645C7.65829 2.95118 7.34171 2.95118 7.14645 3.14645C6.95118 3.34171 6.95118 3.65829 7.14645 3.85355L8.79289 5.5L2 5.50001C1.72386 5.50001 1.5 5.72386 1.5 6.00001C1.5 6.27615 1.72386 6.50001 2 6.50001L8.79289 6.5L7.14645 8.14645C6.95118 8.34171 6.95118 8.65829 7.14645 8.85355C7.34171 9.04882 7.65829 9.04882 7.85355 8.85355L10.3536 6.35356Z" fill="currentColor" />
          </svg>
        </div>
        {item.desc && <div className="text-xs leading-relaxed text-secondary-text">{item.desc}</div>}
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main nav                                                           */
/* ------------------------------------------------------------------ */

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let accumulatedDelta = 0;
    
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      
      // Reset accumulated delta if direction changes
      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }
      
      accumulatedDelta += delta;
      
      if (currentY < 10) {
        setVisible(true);
        accumulatedDelta = 0;
      } else {
        if (accumulatedDelta > 30) {
          setVisible(false);
          accumulatedDelta = 0;
        } else if (accumulatedDelta < -15) {
          setVisible(true);
          accumulatedDelta = 0;
        }
      }
      
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showHeader = visible || mobileOpen || openMenu !== null;

  return (
    <header className={`sticky top-0 z-50 border-b border-subtle-stroke bg-white/95 backdrop-blur-md transition-transform duration-300 ease-settle ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
      <nav className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          {/* DHIRA wordmark */}
          <Link
            href="/"
            aria-label="DHIRA homepage"
            className="flex items-center gap-1.5 text-primary-text"
          >
            <DhiraLogo className="h-10 w-10" />
            <span className="text-[22px] font-semibold tracking-tight">DHIRA</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            <DropdownTrigger id="akashic" label="Akashic" href="/akashic" openMenu={openMenu} setOpenMenu={setOpenMenu}>
              <div className="w-[640px] grid grid-cols-2 gap-x-6">
                {akashicGroups.map((group) => (
                  <div key={group.heading} className="space-y-1">
                    <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-tertiary-text">
                      {group.heading}
                    </p>
                    {group.items.map((item) => <MenuRow key={item.title} item={item} />)}
                  </div>
                ))}
              </div>
            </DropdownTrigger>

            <DropdownTrigger id="solutions" label="Solutions" openMenu={openMenu} setOpenMenu={setOpenMenu}>
              <div className="w-[640px] grid grid-cols-2 gap-x-6">
                {solutionsGroups.map((group) => (
                  <div key={group.heading} className="space-y-1">
                    <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-tertiary-text">
                      {group.heading}
                    </p>
                    {group.items.map((item) => <MenuRow key={item.title} item={item} />)}
                  </div>
                ))}
              </div>
            </DropdownTrigger>

            <DropdownTrigger id="delivery" label="Delivery" openMenu={openMenu} setOpenMenu={setOpenMenu}>
              <div className="w-[640px] grid grid-cols-2 gap-x-6">
                {deliveryGroups.map((group) => (
                  <div key={group.heading} className="space-y-1">
                    <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-tertiary-text">
                      {group.heading}
                    </p>
                    {group.items.map((item) => <MenuRow key={item.title} item={item} />)}
                  </div>
                ))}
              </div>
            </DropdownTrigger>

            <DropdownTrigger id="insights" label="Insights" openMenu={openMenu} setOpenMenu={setOpenMenu}>
              <div className="w-[420px] space-y-1">
                {insightsItems.map((item) => <MenuRow key={item.title} item={item} />)}
              </div>
            </DropdownTrigger>

            <DropdownTrigger id="company" label="Company" openMenu={openMenu} setOpenMenu={setOpenMenu}>
              <div className="w-[300px] space-y-1">
                {companyItems.map((item) => <MenuRow key={item.title} item={item} />)}
              </div>
            </DropdownTrigger>
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <Link href="#login" className="btn-secondary hidden text-sm lg:inline-flex">
            Login
          </Link>
          <Link href="#talk-to-our-team" className="btn-primary text-sm">
            Talk to our team
          </Link>

          <button
            className="btn-ghost lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M15 6H3M15 12H3" />
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-subtle-stroke bg-white px-4 py-4 lg:hidden">
          <div className="space-y-2">
            <MobileMenuGroups heading="Akashic" groups={akashicGroups} topPadding={false} />
            <MobileMenuGroups heading="Solutions" groups={solutionsGroups} />
            <MobileMenuGroups heading="Delivery" groups={deliveryGroups} />
            <MobileMenuFlat heading="Insights" items={insightsItems} />
            <MobileMenuFlat heading="Company" items={companyItems} />
            <div className="flex flex-col gap-2 pt-4">
              <Link href="#login" className="btn-secondary w-full">Login</Link>
              <Link href="#talk-to-our-team" className="btn-primary w-full">Talk to our team</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}