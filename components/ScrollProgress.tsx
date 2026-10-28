"use client";

import { useEffect, useRef } from "react";

/**
 * Thin gold scroll-progress bar (awwwards-style affordance, on-brand).
 * rAF-throttled + direct DOM transform — zero React re-renders on scroll.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p =
        max > 0
          ? Math.min(1, Math.max(0, window.scrollY / max))
          : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold via-[#F59E0B] to-[#DC2626]"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
