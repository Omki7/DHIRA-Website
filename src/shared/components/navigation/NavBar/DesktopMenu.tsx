import type { KeyboardEvent, MouseEvent, PointerEvent, RefObject } from "react";
import type { NavMenu } from "@/content/navigation";
import { Chevron } from "@/shared/components/icons/NavIcons";
import { RegionLink } from "@/shared/components/navigation/RegionLink";
import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import { isCurrentSection } from "@/shared/utils/navigation";
import styles from "./DesktopMenu.module.scss";

const isMouse = (event: PointerEvent) => event.pointerType === "mouse";

export interface DesktopMenuProps {
  menus: NavMenu[];
  openId: string | null;
  pathname: string;
  /** The label spans, measured for the underline and the blue thread. */
  labels: RefObject<Record<string, HTMLSpanElement | null>>;
  /** The chevron buttons, focused by Escape and by Tab out of a panel. */
  triggers: RefObject<Record<string, HTMLButtonElement | null>>;
  hoverTrigger: (id: string) => void;
  leaveTrigger: () => void;
  toggle: (id: string, fromPointer: boolean) => void;
  onLabelClick: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
  onTriggerKeyDown: (id: string) => (event: KeyboardEvent<HTMLButtonElement>) => void;
}

/* One menu item: the label link, then the chevron button. The current
   section rests in ink with a 2px blue bar on the header's bottom edge,
   under its label: inset by the link's 12px left padding on the left and by
   gap + chevron + padding (32px) on the right. The open menu's ink
   underline slides over it. */
export function DesktopMenu({
  menus,
  openId,
  pathname,
  labels,
  triggers,
  hoverTrigger,
  leaveTrigger,
  toggle,
  onLabelClick,
  onTriggerKeyDown,
}: DesktopMenuProps) {
  const ui = useUi();
  return (
    <ul className={styles.list}>
      {menus.map((item) => {
        const open = openId === item.id;
        const current = isCurrentSection(item, pathname);
        return (
          <li
            key={item.id}
            className={cx(styles.item, (open || current) && styles.itemActive, current && styles.itemCurrent)}
            onPointerEnter={(event) => isMouse(event) && hoverTrigger(item.id)}
            onPointerLeave={(event) => isMouse(event) && leaveTrigger()}
          >
            <RegionLink
              href={item.lead.href}
              aria-current={current ? "true" : undefined}
              className={styles.label}
              onClick={onLabelClick(item.lead.href)}
            >
              <span
                ref={(node) => {
                  labels.current[item.id] = node;
                }}
              >
                {item.label}
              </span>
            </RegionLink>
            <button
              ref={(node) => {
                triggers.current[item.id] = node;
              }}
              type="button"
              aria-label={`${ui.nav.menuFor} ${item.label}`}
              aria-expanded={open}
              aria-controls={`nav-panel-${item.id}`}
              className={styles.trigger}
              onClick={(event) => toggle(item.id, event.detail > 0)}
              onKeyDown={onTriggerKeyDown(item.id)}
            >
              <Chevron open={open} className={styles.chevron} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
