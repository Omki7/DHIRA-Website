"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import type { NavMenu } from "@/content/navigation";
import { MenuPanel } from "@/shared/components/navigation/MenuPanel";
import { cx } from "@/shared/utils/cx";
import styles from "./MegaSheet.module.scss";

/* The one shared surface every desktop menu opens into (the pattern Stripe,
   Databricks, Snowflake and C3 use). Attached to the header's bottom edge
   with no gap, so a diagonal mouse path into the menu never leaves the hover
   region. Its height morphs between menus; the incoming panel slides in
   from the side it was reached from (`data-motion`, keyframes in
   globals.css). Every panel is server-rendered and `hidden` until shown, so
   all nav links are in the HTML. Reduced motion: the global rule zeroes the
   transitions and the swap is instant. */

export type SheetMotion = "fade" | "from-left" | "from-right";

export interface MegaSheetProps {
  menus: NavMenu[];
  openId: string | null;
  motion: SheetMotion;
  /** Viewport x of the open trigger's centre: where the blue thread grows from. */
  threadX: number;
  drawn: ReadonlySet<string>;
  pathname: string;
  currentHash?: string;
  onNavigate: () => void;
  /** Tab past the last link (or Shift+Tab before the first) of a panel. */
  onTabOut: (id: string, backwards: boolean) => void;
}

const FOCUSABLE = "a[href], button:not([disabled])";

export function MegaSheet({ menus, openId, motion, threadX, drawn, pathname, currentHash, onNavigate, onTabOut }: MegaSheetProps) {
  /* The last opened menu stays shown while the sheet closes, so the close
     reads as the sheet folding up rather than its contents vanishing. */
  const [shownId, setShownId] = useState<string | null>(null);
  if (openId && openId !== shownId) setShownId(openId);

  const panels = useRef<Record<string, HTMLDivElement | null>>({});
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!shownId) return;
    const panel = panels.current[shownId];
    if (!panel) return;
    const measure = () => setHeight(panel.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [shownId]);

  const open = openId !== null;

  const handleKeyDown = (id: string) => (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const active = document.activeElement;
    if (!event.shiftKey && active === items[items.length - 1]) {
      event.preventDefault();
      onTabOut(id, false);
    } else if (event.shiftKey && active === items[0]) {
      event.preventDefault();
      onTabOut(id, true);
    }
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) onNavigate();
  };

  return (
    <div className={styles.root} inert={!open} aria-hidden={!open}>
      {/* The blue thread: a hairline that grows out from the open trigger
          along the sheet's top edge, the site's drawing language. */}
      <span
        aria-hidden
        className={cx(styles.thread, open && styles.threadOpen)}
        style={{ transformOrigin: `${threadX}px 0`, transform: `scaleX(${open ? 1 : 0})` }}
      />
      <div
        className={cx(styles.body, open && styles.bodyOpen)}
        style={{ height: open ? height : 0 }}
      >
        <div className={styles.inner}>
          {menus.map((menu) => (
            <div
              key={menu.id}
              id={`nav-panel-${menu.id}`}
              ref={(node) => {
                panels.current[menu.id] = node;
              }}
              hidden={menu.id !== shownId}
              data-motion={menu.id === openId ? motion : undefined}
              className="nav-panel"
              onKeyDown={handleKeyDown(menu.id)}
              onClick={handleClick}
            >
              <MenuPanel menu={menu} drawn={drawn.has(menu.id)} pathname={pathname} currentHash={currentHash} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
