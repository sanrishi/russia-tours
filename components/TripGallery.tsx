"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const photos = [
  { src: "/riverside_smiling.jpeg", alt: "Group by Moscow River", tag: "Welcome to Moscow", span: "tall" },
  { src: "/unsplash-stbasil.jpg", alt: "St. Basil's Cathedral", tag: "Iconic Landmark", span: "wide" },
  { src: "/restraunt_photo.jpeg", alt: "Indian restaurant dining", tag: "Dinner Inclusions", span: "sq" },
  { src: "/rooftop.jpeg", alt: "Rooftop skyline view", tag: "Day 3 — Rooftop", span: "sq" },
  { src: "/cafe-two-women.jpg", alt: "Café atmosphere", tag: "Group Moments", span: "sq" },
  { src: "/unsplash-kremlin.jpg", alt: "Kremlin architecture", tag: "Kremlin Tour", span: "wide" },
  { src: "/moscow-city-1.webp", alt: "Moscow cityscape", tag: "City Views", span: "tall" },
  { src: "/unsplash-moscow-river.jpg", alt: "Moscow River at sunset", tag: "River Cruise", span: "sq" },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } },
      { threshold: 0, rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default function TripGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, inView } = useInView();
  const reduced = useReducedMotion();

  const open = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => i !== null ? (i - 1 + photos.length) % photos.length : null), []);
  const next = useCallback(() => setLightboxIndex((i) => i !== null ? (i + 1) % photos.length : null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [lightboxIndex, close, prev, next]);

  return (
    <>
      <style>{`@media (prefers-reduced-motion:reduce){.gallery-x *{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}`}</style>

      <div ref={ref} className={`gallery-x transition-all duration-700 ease-out will-change-transform will-change-opacity ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-white">Trip Gallery</h2>
            <p className="text-white/40 text-xs mt-0.5">{photos.length} moments captured</p>
          </div>
          <span className="flex items-center gap-1.5 text-gold/60 text-[10px] font-semibold uppercase tracking-wider">
            <Camera size={12} /> Click to explore
          </span>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {photos.map((p, i) => {
            const delay = reduced ? 0 : i * 60;
            let colSpan = "";
            let rowSpan = "";
            if (p.span === "tall") { colSpan = "sm:col-span-1"; rowSpan = "sm:row-span-2"; }
            else if (p.span === "wide") { colSpan = "sm:col-span-2"; rowSpan = "sm:row-span-1"; }
            else { colSpan = "sm:col-span-1"; rowSpan = "sm:row-span-1"; }

            return (
              <div
                key={p.src}
                onClick={() => open(i)}
                className={`group relative rounded-xl overflow-hidden border border-white/[0.06] bg-[#161412] cursor-pointer transition-all duration-500 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${colSpan} ${rowSpan}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="relative w-full h-full min-h-[140px] sm:min-h-[180px]">
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[0.8s] ease-out group-hover:scale-105 blur-md group-hover:blur-none"
                    loading="lazy"
                  />
                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Tag - always visible bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 group-hover:translate-y-[-4px]">
                    <span className="font-heading text-white text-xs sm:text-sm font-semibold block leading-tight">{p.tag}</span>
                    <span className="text-white/40 text-[10px] mt-0.5 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">{p.alt}</span>
                  </div>

                  {/* Corner glass indicator */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <span className="text-white/70 text-[9px] font-bold">{i + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Lightbox ─── */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={close}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button onClick={close} className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-300 cursor-pointer z-20">
              <X size={18} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/70 text-xs font-medium">
              {lightboxIndex + 1} / {photos.length}
            </div>

            {/* Prev */}
            <button onClick={prev} className="absolute left-2 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-300 cursor-pointer z-20">
              <ChevronLeft size={20} className="text-white" />
            </button>

            {/* Image */}
            <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
              <img
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Next */}
            <button onClick={next} className="absolute right-2 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-300 cursor-pointer z-20">
              <ChevronRight size={20} className="text-white" />
            </button>

            {/* Caption */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-center px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md">
              <p className="text-white font-heading font-semibold text-sm">{photos[lightboxIndex].tag}</p>
              <p className="text-white/50 text-xs mt-0.5">{photos[lightboxIndex].alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
