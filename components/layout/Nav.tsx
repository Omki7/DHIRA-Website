"use client";

import type { FocusEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import DhiraLogo from "@/components/icons/DhiraLogo";

/* ------------------------------------------------------------------ */
/*  Menu data                                                          */
/* ------------------------------------------------------------------ */

type MenuLink = {
  title: string;
  desc?: string;
  href: string;
};

type MenuGroup = {
  heading: string;
  items: MenuLink[];
};

const akashicGroups: MenuGroup[] = [
  {
    heading: "Data Foundation",
    items: [
      { title: "Akashic Data Pipelines", desc: "Ingest governed data from any source", href: "/akashic#data-pipelines" },
      { title: "Akashic Master Data", desc: "Unify entities into one trusted record", href: "/akashic#master-data" },
      { title: "Akashic Data Warehouse", desc: "Centralised records for BI, AI, and operations", href: "/akashic#data-warehousing" },
      { title: "Akashic Workflow", desc: "Coordinate data work across teams", href: "/akashic#modules" },
    ],
  },
  {
    heading: "Intelligence & Governance",
    items: [
      { title: "Akashic Machine Learning", desc: "Train models on governed data", href: "/akashic#machine-learning" },
      { title: "Akashic BI", desc: "Real-time analytics for faster decisions", href: "/akashic#business-intelligence" },
      { title: "Akashic Insights", desc: "Conversational search over trusted data", href: "/akashic#ask-ai" },
      { title: "Akashic Data Governance", desc: "Control access, lineage, and residency", href: "/akashic#governance" },
    ],
  },
];

const solutionsGroups: MenuGroup[] = [
  {
    heading: "Akashic Plugin",
    items: [
      { title: "Akashic EIS", desc: "Executive intelligence for leadership teams", href: "/solutions/eis" },
      { title: "Akashic Life", desc: "Life-saving AI diagnostics at the remote edge", href: "/solutions/life" },
      { title: "Akashic Knowledge", desc: "Adaptive learning infrastructure at national scale", href: "/solutions/knowledge" },
    ],
  },
  {
    heading: "Sectors",
    items: [
      { title: "Manufacturing", desc: "Production, quality, and equipment signals", href: "/sectors/manufacturing" },
      { title: "Healthcare", desc: "Patient records with privacy controls", href: "/sectors/healthcare" },
      { title: "Finance", desc: "Risk detection and audit-ready compliance", href: "/sectors/finance" },
      { title: "Retail", desc: "Demand, inventory, and supply-chain signals", href: "/sectors/retail" },
      { title: "Education", desc: "Connected systems for institutions and learners", href: "/sectors/education" },
      { title: "Energy", desc: "Grid maintenance and resilience signals", href: "/sectors/energy" },
    ],
  },
];

const deliveryItems: MenuLink[] = [
  { title: "Akashic Deployment", desc: "Bring Akashic into your environment", href: "/delivery#akashic-deployment" },
  { title: "Product Engineering", desc: "Custom products on Akashic or your stack", href: "/delivery#product-engineering" },
  { title: "Advisory & Co-Engineering", desc: "Audits, roadmaps, and senior squads", href: "/delivery#advisory-co-engineering" },
];

const companyItems: MenuLink[] = [
  { title: "About Us", desc: "How DHIRA builds accountable data systems", href: "/about" },
  { title: "Careers", desc: "Join engineers building production systems", href: "/careers" },
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
  align?: "start" | "center" | "end";
  widthClassName: string;
  children?: ReactNode;
};

const panelAlign = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

const notchAlign = {
  start: "left-7",
  center: "left-1/2 -translate-x-1/2",
  end: "right-7",
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`transition-transform duration-250 ease-settle ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" d="M4.5 6.25 8 9.75l3.5-3.5" />
    </svg>
  );
}

function DropdownTrigger({
  id,
  label,
  href,
  openMenu,
  setOpenMenu,
  align = "center",
  widthClassName,
  children,
}: DropProps) {
  const isOpen = openMenu === id;
  const triggerClass = `group inline-flex h-10 items-center justify-center gap-2 rounded-btn px-3 text-[15px] font-medium text-primary-text transition-colors duration-250 ease-settle hover:bg-tertiary-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/30 ${
    isOpen ? "bg-tertiary-bg" : ""
  }`;

  const closeOnBlur = (event: FocusEvent<HTMLLIElement>) => {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setOpenMenu(null);
    }
  };

  return (
    <li
      className="relative -my-3 py-3"
      onMouseEnter={() => setOpenMenu(id)}
      onMouseLeave={() => setOpenMenu(null)}
      onFocus={() => setOpenMenu(id)}
      onBlur={closeOnBlur}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpenMenu(null);
      }}
    >
      {href ? (
        <Link
          href={href}
          className={triggerClass}
          onClick={() => setOpenMenu(null)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {label}
          <Chevron open={isOpen} />
        </Link>
      ) : (
        <button
          type="button"
          className={triggerClass}
          onClick={() => setOpenMenu(isOpen ? null : id)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {label}
          <Chevron open={isOpen} />
        </button>
      )}

      {isOpen && (
        <div className={`absolute top-full z-50 pt-2 ${panelAlign[align]}`}>
          <span
            className={`absolute top-[5px] h-3 w-3 rotate-45 border-l border-t border-subtle-stroke bg-white ${notchAlign[align]}`}
            aria-hidden
          />
          <div
            className={`relative overflow-hidden rounded-frame border border-subtle-stroke bg-white shadow-frame ring-1 ring-black/[0.02] ${widthClassName}`}
            onClick={() => setOpenMenu(null)}
          >
            {children}
          </div>
        </div>
      )}
    </li>
  );
}

function MenuHeading({ children }: { children: ReactNode }) {
  return (
    <p className="px-2 pb-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-tertiary-text">
      {children}
    </p>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="opacity-0 transition-opacity duration-250 ease-settle group-hover:opacity-100" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.85 6.85a.5.5 0 0 0 0-.7L8.35 3.65a.5.5 0 1 0-.7.7L9.29 6H2.5a.5.5 0 0 0 0 1h6.79L7.65 8.65a.5.5 0 1 0 .7.7l2.5-2.5Z" fill="currentColor" />
    </svg>
  );
}

function MenuRow({ item, dense = false }: { item: MenuLink; dense?: boolean }) {
  return (
    <Link
      href={item.href}
      className={`group grid min-w-0 grid-cols-[auto_1fr] items-center rounded-card border border-transparent transition-colors duration-250 ease-settle hover:border-subtle-stroke hover:bg-primary-bg focus-visible:border-blue/40 focus-visible:bg-blue-subtle/60 focus-visible:outline-none ${
        dense ? "gap-2.5 px-2 py-2" : "gap-3 px-2 py-2.5"
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-btn border border-subtle-stroke bg-secondary-bg text-primary-text transition-colors duration-250 ease-settle group-hover:border-blue-border group-hover:bg-blue-subtle group-hover:text-blue ${
          dense ? "h-7 w-7" : "h-8 w-8"
        }`}
      >
        <DynamicSketchIcon text={item.title} className={dense ? "h-4 w-4" : "h-[18px] w-[18px]"} />
      </span>
      <span className="min-w-0">
        <span className="flex min-w-0 items-center gap-1.5 text-[13px] font-semibold leading-tight text-primary-text">
          <span className="truncate">{item.title}</span>
          <ArrowIcon />
        </span>
        {item.desc && (
          <span className={`mt-1 block text-[12px] leading-[1.35] text-secondary-text ${dense ? "truncate" : ""}`}>
            {item.desc}
          </span>
        )}
      </span>
    </Link>
  );
}

function PanelFooter({ href, label, copy }: { href: string; label: string; copy: string }) {
  return (
    <div className="mt-3 flex items-center justify-between gap-4 border-t border-dashed border-lineSoft px-2 pt-3">
      <p className="text-[12px] leading-relaxed text-secondary-text">{copy}</p>
      <Link
        href={href}
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-btn px-2 py-1.5 text-[12px] font-semibold text-blue transition-colors duration-250 ease-settle hover:bg-blue-subtle"
      >
        {label}
        <ArrowIcon />
      </Link>
    </div>
  );
}

function GroupColumn({ group, dense = false }: { group: MenuGroup; dense?: boolean }) {
  return (
    <div className="min-w-0">
      <MenuHeading>{group.heading}</MenuHeading>
      <div className={dense ? "grid grid-cols-2 gap-1" : "space-y-1"}>
        {group.items.map((item) => (
          <MenuRow key={item.title} item={item} dense={dense} />
        ))}
      </div>
    </div>
  );
}

function AkashicPanel() {
  return (
    <div className="p-3">
      <div className="grid grid-cols-2 gap-4">
        {akashicGroups.map((group) => (
          <GroupColumn key={group.heading} group={group} />
        ))}
      </div>
      <PanelFooter
        href="/akashic"
        label="View platform"
        copy="One governed foundation for structured, unstructured, and streaming data."
      />
    </div>
  );
}

function SolutionsPanel() {
  const [plugins, sectors] = solutionsGroups;

  return (
    <div className="p-3">
      <div className="grid grid-cols-[280px_1fr] gap-3">
        <GroupColumn group={plugins} />
        <GroupColumn group={sectors} dense />
      </div>
      <PanelFooter
        href="/akashic#solutions"
        label="Explore solutions"
        copy="Plugins and sector pages use the same governed Akashic foundation."
      />
    </div>
  );
}

function FlatPanel({ items, href, label, copy }: { items: MenuLink[]; href: string; label: string; copy: string }) {
  return (
    <div className="p-3">
      <div className="space-y-1">
        {items.map((item) => (
          <MenuRow key={item.title} item={item} />
        ))}
      </div>
      <PanelFooter href={href} label={label} copy={copy} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile menu                                                        */
/* ------------------------------------------------------------------ */

type MobileSectionConfig = {
  id: string;
  label: string;
  href?: string;
  groups?: MenuGroup[];
  items?: MenuLink[];
};

const mobileSections: MobileSectionConfig[] = [
  { id: "akashic", label: "Akashic", href: "/akashic", groups: akashicGroups },
  { id: "solutions", label: "Solutions", groups: solutionsGroups },
  { id: "delivery", label: "Delivery", href: "/delivery", items: deliveryItems },
  { id: "company", label: "Company", items: companyItems },
];

function MobileMenuRow({ item, onNavigate }: { item: MenuLink; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="grid grid-cols-[28px_1fr] items-center gap-2.5 rounded-card px-2 py-2 text-primary-text transition-colors duration-250 ease-settle hover:bg-tertiary-bg focus-visible:bg-blue-subtle focus-visible:outline-none"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-btn border border-subtle-stroke bg-white text-primary-text">
        <DynamicSketchIcon text={item.title} className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[14px] font-semibold leading-tight">{item.title}</span>
        {item.desc && <span className="mt-0.5 block truncate text-[12px] text-secondary-text">{item.desc}</span>}
      </span>
    </Link>
  );
}

function MobileSection({
  section,
  open,
  onToggle,
  onNavigate,
}: {
  section: MobileSectionConfig;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-subtle-stroke last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-left text-[15px] font-semibold text-primary-text"
        onClick={onToggle}
        aria-expanded={open}
      >
        {section.label}
        <Chevron open={open} />
      </button>

      {open && (
        <div className="space-y-3 pb-4">
          {section.href && (
            <Link
              href={section.href}
              onClick={onNavigate}
              className="inline-flex rounded-btn bg-primary-bg px-2.5 py-1.5 text-[12px] font-semibold text-blue"
            >
              {section.label} overview
            </Link>
          )}

          {section.groups?.map((group) => (
            <div key={group.heading}>
              <MenuHeading>{group.heading}</MenuHeading>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <MobileMenuRow key={item.title} item={item} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          ))}

          {section.items && (
            <div className="space-y-1">
              {section.items.map((item) => (
                <MobileMenuRow key={item.title} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main nav                                                           */
/* ------------------------------------------------------------------ */

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>("akashic");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let accumulatedDelta = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }

      accumulatedDelta += delta;

      if (currentY < 10) {
        setVisible(true);
        accumulatedDelta = 0;
      } else if (accumulatedDelta > 30) {
        setVisible(false);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -15) {
        setVisible(true);
        accumulatedDelta = 0;
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showHeader = visible || mobileOpen || openMenu !== null;
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection("akashic");
  };

  return (
    <header className={`sticky top-0 z-50 border-b border-subtle-stroke bg-white/95 backdrop-blur-md transition-transform duration-300 ease-settle ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
      <nav className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            href="/"
            aria-label="DHIRA homepage"
            className="flex shrink-0 items-center gap-1.5 text-primary-text"
            onClick={() => setOpenMenu(null)}
          >
            <DhiraLogo className="h-9 w-9" />
            <span className="text-[22px] font-semibold tracking-tight">DHIRA</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            <DropdownTrigger id="akashic" label="Akashic" href="/akashic" align="start" widthClassName="w-[704px] max-w-[calc(100vw-32px)]" openMenu={openMenu} setOpenMenu={setOpenMenu}>
              <AkashicPanel />
            </DropdownTrigger>

            <DropdownTrigger id="solutions" label="Solutions" align="start" widthClassName="w-[704px] max-w-[calc(100vw-32px)]" openMenu={openMenu} setOpenMenu={setOpenMenu}>
              <SolutionsPanel />
            </DropdownTrigger>

            <DropdownTrigger id="delivery" label="Delivery" href="/delivery" widthClassName="w-[420px] max-w-[calc(100vw-32px)]" openMenu={openMenu} setOpenMenu={setOpenMenu}>
              <FlatPanel
                items={deliveryItems}
                href="/delivery"
                label="View delivery"
                copy="Three engagement models for platform rollout, product builds, and advisory."
              />
            </DropdownTrigger>

            <li>
              <span
                className="inline-flex h-10 cursor-default items-center justify-center rounded-btn px-3 text-[15px] font-medium text-primary-text"
                aria-disabled="true"
              >
                Insights
              </span>
            </li>

            <DropdownTrigger id="company" label="Company" widthClassName="w-[360px] max-w-[calc(100vw-32px)]" openMenu={openMenu} setOpenMenu={setOpenMenu}>
              <FlatPanel
                items={companyItems}
                href="/about"
                label="Meet DHIRA"
                copy="Offices in New York, Hyderabad, and Bangalore."
              />
            </DropdownTrigger>
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link href="#login" className="btn-secondary hidden text-sm lg:inline-flex" onClick={() => setOpenMenu(null)}>
            Login
          </Link>
          <Link href="#talk-to-our-team" className="btn-primary text-sm" onClick={() => setOpenMenu(null)}>
            Talk to our team
          </Link>

          <button
            type="button"
            className="btn-ghost lg:hidden"
            onClick={() => {
              setMobileOpen((value) => !value);
              setOpenMenu(null);
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 6H3M15 12H3" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-subtle-stroke bg-white px-4 py-2 shadow-card lg:hidden">
          {mobileSections.map((section) => (
            <MobileSection
              key={section.id}
              section={section}
              open={mobileSection === section.id}
              onToggle={() => setMobileSection((current) => (current === section.id ? null : section.id))}
              onNavigate={closeMobile}
            />
          ))}
          <div className="grid grid-cols-2 gap-2 py-4">
            <Link href="#login" className="btn-secondary w-full" onClick={closeMobile}>
              Login
            </Link>
            <Link href="#talk-to-our-team" className="btn-primary w-full" onClick={closeMobile}>
              Talk to our team
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
