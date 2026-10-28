"use client";

import { useRef, useCallback } from "react";

interface Props {
  children: React.ReactNode;
  strength?: number;
}

/**
 * Magnetic hover pull for CTA buttons (awwwards staple).
 * Transform-only + rAF-free (mousemove writes directly, CSS transition
 * smooths it), disabled under prefers-reduced-motion. No layout change.
 */
export default function Magnetic({ children, strength = 0.22 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el || reduced()) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const reset = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-block transition-transform duration-150 ease-out will-change-transform"
    >
      {children}
    </span>
  );
}
