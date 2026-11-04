"use client";

import Image from "next/image";
import { useId, type CSSProperties } from "react";
import type { AboutPage } from "@/content/pages/about";
import { MotionToggle } from "@/shared/components/ui/MotionToggle";
import useTour from "@/shared/hooks/useTour";
import styles from "./AboutCulture.module.scss";

/* Forty portrait positions form a compact five-row field, as requested.
   A missing photograph uses initials; unassigned positions stay neutral.
   Profiles are editorial drafts, not quotations from the people pictured. */
const ROWS = [6, 9, 10, 9, 6];
// Leave a few quiet spaces around the perimeter while the roster is a draft.
// Additional named people automatically fill these last six positions.
const PERIMETER = [0, 5, 6, 24, 34, 39];
const MEMBER_ORDER = [
  ...Array.from({ length: 40 }, (_, i) => i).filter(i => !PERIMETER.includes(i)),
  ...PERIMETER,
];
const SLOTS = ROWS.flatMap((count, row) =>
  Array.from({ length: count }, (_, column) => ({
    row: row + 1,
    column: (20 - count * 2) / 2 + column * 2 + 1,
    wideColumn: (48 - count * 2) / 2 + column * 2 + 1,
  })),
).map((slot, index) => ({ ...slot, memberIndex: MEMBER_ORDER.indexOf(index) }));
const AMBIENT = ROWS.flatMap((count, row) => {
  const offset = count % 2;
  const firstPortrait = (48 - count * 2) / 2 + 1;
  const lastPortrait = firstPortrait + (count - 1) * 2;
  return Array.from({ length: 24 - offset }, (_, column) => ({
    row: row + 1,
    column: column * 2 + 1 + offset,
    opacity: Math.min(.8, Math.min(column + 1, 24 - offset - column) / 7),
  })).filter(dot => dot.column < firstPortrait || dot.column > lastPortrait);
});
type SlotStyle = CSSProperties & { "--person-row": number; "--person-column": number; "--person-wide-column": number };

export function TeamField({ team }: { team: AboutPage["culture"]["team"] }) {
  const id = useId();
  const { ref, active, paused, pick, toggle, hold } = useTour<HTMLFieldSetElement>(Math.min(team.members.length, SLOTS.length), { dwell: 8500 });

  return (
    <fieldset ref={ref} className={styles.team} {...hold}>
      <legend className={styles.srOnly}>{team.label}</legend>
      <div className={styles.field}>
        <div className={styles.ambient} aria-hidden="true">
          {AMBIENT.map((dot, index) => <span key={index} style={{ gridRow: dot.row, gridColumn: `${dot.column} / span 2`, opacity: dot.opacity }} />)}
        </div>
        {SLOTS.map((slot, slotIndex) => {
          const index = slot.memberIndex;
          const member = team.members[index];
          const placement: SlotStyle = {
            "--person-row": slot.row,
            "--person-column": slot.column,
            "--person-wide-column": slot.wideColumn,
          };
          if (!member) return <span key={`empty-${slotIndex}`} className={styles.empty} style={placement} aria-hidden="true"><span /></span>;
          const initials = member.name.split(/\s+/).filter(Boolean).map(part => part[0]).slice(0, 2).join("");
          return (
            <div key={member.id} className={styles.colleague} style={placement}>
              <input
                id={`${id}-${index}`}
                className={styles.choice}
                type="radio"
                name={id}
                checked={active === index}
                onChange={() => pick(index)}
                onFocus={() => pick(index)}
                aria-describedby={`${id}-bio-${index} ${id}-role-${index}`}
              />
              <label
                htmlFor={`${id}-${index}`}
                className={styles.person}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") pick(index); }}
              >
                <span className={styles.portrait}>
                  {member.image ? (
                    <span className={styles.photoWindow}>
                      <Image
                        src={member.image.src}
                        alt=""
                        fill
                        sizes="100px"
                        className={styles.photo}
                        style={{
                          objectPosition: member.position ?? "50% 40%",
                          ...(member.framing ? {
                            transformOrigin: "0 0",
                            transform: `translate(${50 - member.framing.x * member.framing.scale}%, ${50 - member.framing.y * member.framing.scale}%) scale(${member.framing.scale})`,
                          } : {}),
                        }}
                      />
                    </span>
                  ) : <span className={styles.initials} aria-hidden="true">{initials}</span>}
                </span>
                <span className={styles.srOnly}>{member.name}</span>
              </label>
              <div className={styles.profile}>
                <p id={`${id}-bio-${index}`} className={styles.bio}>{member.bio}</p>
                <div className={styles.byline}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p id={`${id}-role-${index}`} className={styles.role}>{member.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.fieldFooter}>
        <p>{team.hint}</p>
        <MotionToggle paused={paused} onToggle={toggle} controls={team.motionLabel} className={styles.motionToggle} />
      </div>
      <noscript><style>{`.${styles.motionToggle} { display: none; }`}</style></noscript>
    </fieldset>
  );
}
