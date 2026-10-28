"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  bgUrl: string;
  children: React.ReactNode;
}

/**
 * Same final visuals as the old eager CSS-background sections — same image,
 * same cover/center, same gradient overlays from the caller. The image loads
 * only near the viewport, settles with a subtle 1.08 → 1 zoom + fade, and
 * drifts at ~0.06x scroll speed (awwwards-style parallax). All DOM-direct
 * (no React re-renders), disabled under prefers-reduced-motion.
 */
export default function LazyBgSection({ bgUrl, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const parRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const section = ref.current;
      const bg = parRef.current;
      if (!section || !bg) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -600 || rect.top > vh + 600) return;
      const offset =
        (rect.top + rect.height / 2 - vh / 2) * -0.06;
      const clamped = Math.max(-60, Math.min(60, offset));
      bg.style.transform = `translate3d(0, ${clamped.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-charcoal min-h-screen overflow-hidden"
    >
      <div ref={parRef} className="absolute left-0 right-0 -top-[70px] -bottom-[70px] will-change-transform">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1200ms] ease-out"
          style={
            visible
              ? {
                  backgroundImage: `url(${bgUrl})`,
                  opacity: 1,
                  transform: "scale(1)",
                }
              : { opacity: 0, transform: "scale(1.08)" }
          }
        />
      </div>
      {children}
    </section>
  );
}
