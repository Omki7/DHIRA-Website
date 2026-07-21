interface Props {
  count: number;
  active: number;
  durationMs: number;
  resetKey: number;
  className?: string;
}

// Time-remaining rail for the auto-rotating screen carousels: the home Hero's
// product mockup and /akashic's module screens. It is the same progress
// underline the tab rail above the cards already carries, with the labels
// stripped (user direction 22 Jul 2026) — one segment per screen, only the live
// one filling, so a reader can see how long is left before the next screen
// without reading back up to the tabs.
//
// Decorative by design: the labelled tabs above are the keyboard-accessible
// control for the same action, so this stays out of the accessibility tree.
// Under reduced motion the global `*` animation-duration override lands the
// fill at full immediately, exactly as it does on the rail above.
export default function ScreenProgressRail({
  count,
  active,
  durationMs,
  resetKey,
  className = "",
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto flex w-full max-w-[320px] items-center gap-1.5 px-4 ${className}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-tertiary-text/20"
        >
          {i === active && (
            <span
              key={resetKey}
              className="absolute inset-y-0 left-0 block rounded-full bg-blue"
              style={{
                width: "100%",
                animation: `progressFill ${durationMs}ms linear forwards`,
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
