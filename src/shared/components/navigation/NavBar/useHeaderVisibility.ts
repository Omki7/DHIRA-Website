import { useEffect, useState } from "react";

/* Hide on scroll down (30px), show on scroll up (15px) or near the top.
   State is only set when it flips, so a scroll frame costs no render. */
export function useHeaderVisibility() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let accumulatedDelta = 0;
    let isScrolled: boolean | null = null;
    let isVisible = true;

    const show = (next: boolean) => {
      if (next === isVisible) return;
      isVisible = next;
      setVisible(next);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const nextScrolled = currentY > 64;
      if (nextScrolled !== isScrolled) {
        isScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      const delta = currentY - lastY;

      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }

      accumulatedDelta += delta;

      if (currentY < 10) {
        show(true);
        accumulatedDelta = 0;
      } else if (accumulatedDelta > 30) {
        show(false);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -15) {
        show(true);
        accumulatedDelta = 0;
      }

      lastY = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { visible, scrolled };
}
