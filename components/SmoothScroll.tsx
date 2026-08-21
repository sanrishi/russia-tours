"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __solLoaderActive?: boolean;
    __lenis?: unknown;
  }
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let lenis: any = null;
    let gsap: any = null;
    let ScrollTrigger: any = null;
    let hasGsap = false;
    let tickerCb: ((t: number) => void) | null = null;
    let rafId: number | null = null;
    let anchorHandler: ((e: Event) => void) | null = null;
    let solObserver: IntersectionObserver | null = null;
    let revealObserver: IntersectionObserver | null = null;
    let fontReadyCb: (() => void) | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expoOut = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

    async function init() {
      // dynamically import to avoid SSR issues
      const LenisMod = await import("lenis");
      const Lenis = LenisMod.default;

      try {
        const gsapMod = await import("gsap");
        const stMod = await import("gsap/ScrollTrigger");
        gsap = gsapMod.default || gsapMod.gsap || gsapMod;
        ScrollTrigger = stMod.ScrollTrigger || stMod.default;
        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
          hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
        }
      } catch {
        hasGsap = false;
      }

      const isMobile = window.innerWidth <= 1000;

      // FAST config — drops 1s drift: duration 0.8/1.2 + lerp 0.09/0.10 + expoOut + lagSmoothing(0)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lenis = new (Lenis as any)(
        isMobile
          ? {
              duration: 0.8, // was 1.5 → 0.8 = stops fast
              easing: expoOut, // was linear → expoOut = snappy
              lerp: 0.09, // was 0.05 → 0.09 = less drift
              touchMultiplier: 1.5,
              wheelMultiplier: 1,
            }
          : {
              duration: 1.2, // was 2.0 → 1.2
              easing: expoOut,
              lerp: 0.1, // was 0.06 → 0.10
              wheelMultiplier: 1,
            }
      );

      // expose for debugging / anchor handlers
      (window as unknown as Record<string, unknown>).__lenis = lenis;
      window.__lenis = lenis;

      if (hasGsap) {
        lenis.on("scroll", ScrollTrigger.update);
        tickerCb = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(tickerCb);
        gsap.ticker.lagSmoothing(0);
      } else {
        const loop = (t: number) => {
          lenis.raf(t);
          rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
      }

      // sticky header offset 76px — spec exact
      anchorHandler = (e: Event) => {
        const a = e.currentTarget as HTMLAnchorElement;
        if ((a as HTMLAnchorElement).hash === "#" || !document.querySelector((a as HTMLAnchorElement).hash || "")) return;
        // also handle href="#top"
        const href = a.getAttribute("href") || "";
        if (href === "#top") {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.2, offset: 0 });
          return;
        }
        const hash = (a as HTMLAnchorElement).hash;
        if (!hash) return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { duration: 1.2, offset: -76 });
      };
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", anchorHandler as EventListener);
      });

      // pause during preloader if active
      if (window.__solLoaderActive) lenis.stop();

      const onLoaderToggle = () => {
        if (!lenis) return;
        if (window.__solLoaderActive) lenis.stop();
        else lenis.start();
      };
      window.addEventListener("__solLoader", onLoaderToggle as EventListener);

      // ── Text — masked lines + Magic Text Reveal 19727 (word/char/line + fade-in-blur) ──
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const presetMap: Record<string, { from: any; to: any }> = {
        slide: { from: { y: 20, opacity: 0 }, to: { y: 0, opacity: 1 } },
        fade: { from: { opacity: 0 }, to: { opacity: 1 } },
        blur: { from: { filter: "blur(12px)", opacity: 0 }, to: { filter: "blur(0px)", opacity: 1 } },
        "fade-in-blur": { from: { y: 20, filter: "blur(12px)", opacity: 0 }, to: { y: 0, filter: "blur(0px)", opacity: 1 } },
        scale: { from: { scale: 0, opacity: 0 }, to: { scale: 1, opacity: 1 } },
      };

      function buildLines(el: HTMLElement): HTMLElement[] {
        const text = el.getAttribute("data-split");
        if (!text) return [];
        el.textContent = "";
        const spans: HTMLSpanElement[] = [];
        const words = text.split(/\s+/);
        words.forEach((w, i) => {
          const s = document.createElement("span");
          s.className = "sol-w";
          s.textContent = w;
          el.appendChild(s);
          if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
          spans.push(s);
        });
        const lines: HTMLSpanElement[][] = [];
        let curTop: number | null = null;
        let curLine: HTMLSpanElement[] = [];
        spans.forEach((s) => {
          const top = s.offsetTop;
          if (curTop === null || Math.abs(top - curTop) < 4) {
            if (curTop === null) curTop = top;
            curLine.push(s);
          } else {
            lines.push(curLine);
            curLine = [s];
            curTop = top;
          }
        });
        if (curLine.length) lines.push(curLine);
        el.textContent = "";
        const inners: HTMLElement[] = [];
        lines.forEach((lw, idx) => {
          const mask = document.createElement("span");
          mask.className = "sol-lmask";
          const inner = document.createElement("span");
          inner.className = "sol-lin";
          if (!hasGsap) inner.style.transitionDelay = (0.08 * idx).toFixed(2) + "s";
          lw.forEach((w, k) => {
            inner.appendChild(w);
            if (k < lw.length - 1) inner.appendChild(document.createTextNode(" "));
          });
          mask.appendChild(inner);
          el.appendChild(mask);
          inners.push(inner);
        });
        return inners;
      }

      function buildWords(el: HTMLElement): HTMLElement[] {
        const text = el.getAttribute("data-split");
        if (!text) return [];
        el.textContent = "";
        const inners: HTMLElement[] = [];
        const words = text.split(/\s+/);
        words.forEach((w, idx) => {
          const mask = document.createElement("span");
          mask.className = "sol-lmask";
          mask.style.display = "inline-block";
          mask.style.overflow = "hidden";
          const inner = document.createElement("span");
          inner.className = "sol-lin sol-w";
          inner.textContent = w;
          if (!hasGsap) inner.style.transitionDelay = (0.055 * idx).toFixed(2) + "s";
          mask.appendChild(inner);
          el.appendChild(mask);
          if (idx < words.length - 1) el.appendChild(document.createTextNode(" "));
          inners.push(inner);
        });
        return inners;
      }

      function buildChars(el: HTMLElement): HTMLElement[] {
        const text = el.getAttribute("data-split");
        if (!text) return [];
        el.textContent = "";
        const inners: HTMLElement[] = [];
        const chars = Array.from(text);
        chars.forEach((ch, idx) => {
          if (ch === " ") {
            el.appendChild(document.createTextNode(" "));
            return;
          }
          const mask = document.createElement("span");
          mask.className = "sol-lmask";
          mask.style.display = "inline-block";
          mask.style.overflow = "hidden";
          const inner = document.createElement("span");
          inner.className = "sol-lin";
          inner.textContent = ch;
          if (!hasGsap) inner.style.transitionDelay = (0.03 * idx).toFixed(2) + "s";
          mask.appendChild(inner);
          el.appendChild(mask);
          inners.push(inner);
        });
        return inners;
      }

      function initLines() {
        document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
          if ((el as HTMLElement & { dataset: DOMStringMap }).dataset.solArmed) return;
          (el.dataset as DOMStringMap & { solArmed?: string }).solArmed = "1";
          const per = el.getAttribute("data-per") || "line";
          const preset = el.getAttribute("data-preset") || "slide";
          const inners = per === "word" ? buildWords(el) : per === "char" ? buildChars(el) : buildLines(el);
          if (!inners.length) return;
          if (!hasGsap) {
            el.classList.add("sol-fallback");
            let fired = false;
            function cssReveal() {
              if (fired) return;
              fired = true;
              el.classList.add("is-in");
            }
            if ("IntersectionObserver" in window) {
              const io = new IntersectionObserver((es) => {
                es.forEach((en) => {
                  if (en.isIntersecting) {
                    cssReveal();
                    io.disconnect();
                  }
                });
              }, { threshold: 0.05 });
              io.observe(el);
            } else cssReveal();
            return;
          }
          el.classList.add("sol-gsap");
          (el as unknown as Record<string, unknown>)._solLines = inners;
          const pm = presetMap[preset] || presetMap.slide;
          const speed = parseFloat(el.getAttribute("data-speed") || "1");
          const staggerBase = ({ line: 0.1, word: 0.055, char: 0.03 } as Record<string, number>)[per] ?? 0.09;
          const stagger = staggerBase / speed;
          const delay = parseFloat(el.getAttribute("data-delay") || "0");
          if (per === "line") {
            const fromFilter = (pm.from as Record<string, unknown>).filter as string | undefined;
            gsap.set(inners, { y: "110%", filter: fromFilter || "none", opacity: (pm.from as Record<string, unknown>).opacity ?? 1 });
          } else {
            gsap.set(inners, pm.from);
          }
          let fired = false;
          function reveal() {
            if (fired) return;
            if (window.__solLoaderActive) return setTimeout(reveal, 250);
            fired = true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const to: any = {
              duration: per === "char" ? 0.45 : 0.95,
              stagger,
              ease: "power4.out",
              delay,
              onComplete: () => {
                el.dataset.solDone = "1";
                el.classList.add("is-in");
              },
            };
            Object.assign(to, pm.to);
            if (per === "line") to.y = "0%";
            gsap.to(inners, to);
          }
          if ("IntersectionObserver" in window) {
            const obs = new IntersectionObserver(
              (es) => {
                es.forEach((en) => {
                  if (en.isIntersecting) {
                    reveal();
                    obs.disconnect();
                  }
                });
              },
              { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
            );
            obs.observe(el);
            solObserver = obs;
          } else reveal();
        });
      }

      // fonts guard
      const fonts = (document as unknown as { fonts?: { ready: Promise<void> } }).fonts;
      if (fonts?.ready?.then) {
        fonts.ready.then(initLines);
        setTimeout(initLines, 2500);
      } else initLines();

      // also re-init on a short delay to catch React hydration
      setTimeout(initLines, 600);
      setTimeout(initLines, 1500);

      // ── Generic scroll reveal (for cards/images) ──
      const targets = document.querySelectorAll<HTMLElement>(".sol-reveal");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        targets.forEach((e) => e.classList.add("is-in"));
      } else {
        revealObserver = new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              if (e.isIntersecting) {
                (e.target as HTMLElement).classList.add("is-in");
                revealObserver?.unobserve(e.target);
              }
            });
          },
          { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
        );
        targets.forEach((e) => revealObserver!.observe(e));
      }

      // keep ScrollTrigger in sync on resize
      const onResize = () => ScrollTrigger?.refresh();
      window.addEventListener("resize", onResize);

      // cleanup helpers stored on window for later
      (window as unknown as Record<string, unknown>).__solCleanup = () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("__solLoader", onLoaderToggle as EventListener);
      };
    }

    init();

    return () => {
      try {
        const cleanup = (window as unknown as Record<string, unknown>).__solCleanup as (() => void) | undefined;
        if (cleanup) cleanup();
      } catch {}
      if (tickerCb && gsap) {
        try { gsap.ticker.remove(tickerCb); } catch {}
      }
      if (rafId) cancelAnimationFrame(rafId);
      if (anchorHandler) {
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
          try { a.removeEventListener("click", anchorHandler as EventListener); } catch {}
        });
      }
      try { solObserver?.disconnect(); } catch {}
      try { revealObserver?.disconnect(); } catch {}
      try { lenis?.destroy(); } catch {}
      try { window.__lenis = undefined; } catch {}
    };
  }, [pathname]);

  // re-trigger split/reveal on route change (Next client navigation)
  useEffect(() => {
    // small delay to let new DOM mount
    const t = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      // ScrollTrigger refresh if available
      // lenis will handle scroll reset
      try {
        const l = (window as unknown as Record<string, unknown>).__lenis as { scrollTo?: (t: number, o?: unknown) => void } | undefined;
        if (l?.scrollTo) l.scrollTo(0, { immediate: true });
      } catch {}
    }, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
