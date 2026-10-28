"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import type { ComponentType } from "react";
import AnimalSilhouettes from "./AnimalSilhouettes";
import Magnetic from "./Magnetic";

const slides = [
  {
    image: "/enhanced_a0420511-bb27-4d23-90f1-750eafefa96d_new.webp",
    title: "Trips to Russia",
    subtitle: "Moscow • St. Petersburg • Kazan",
    tagline: "For Indian Travelers, by Indosvetka",
    cta: "View Upcoming Trips",
    href: "/places",
  },
  {
    image: "/moscow-city-2.webp",
    title: "Moscow Discovery",
    subtitle: "7 Days • Limited to 8 Seats • August 2026",
    tagline: "Curated for You",
    cta: "Check Availability",
    href: "/moscow-express#booking",
  },
  {
    image: "/enhanced_new_moscow.webp",
    title: "India Meets Russia",
    subtitle: "Indian Cuisine • Hindi Support • Visa Assistance",
    tagline: "Travel With Confidence",
    cta: "About Us",
    href: "/about",
  },
];

interface SlideshowProps {
  current: number;
  goTo: (i: number) => void;
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [slidesStarted, setSlidesStarted] = useState(false);
  const [HeroSlideshow, setHeroSlideshow] = useState<ComponentType<SlideshowProps> | null>(null);

  // Buttery-scroll fix: parallax writes straight to the DOM instead of
  // setState-per-frame (which re-rendered the whole hero tree on every
  // Lenis tick — the main desktop "stucky" source). Same math as before:
  // bg drifts up at 0.3x, content fades out over 800px.
  const scrollRaf = useRef(0);
  useEffect(() => {
    const apply = () => {
      scrollRaf.current = 0;
      const y = window.scrollY;
      const iy = window.innerWidth < 768 ? 0 : Math.min(0, -y * 0.3);
      const op = Math.min(1, 1 - y / 800);
      const bg = document.querySelector<HTMLElement>("[data-hero-bg]");
      if (bg) bg.style.transform = `translateY(${iy}px)`;
      const content = document.querySelector<HTMLElement>("[data-hero-content]");
      if (content) content.style.opacity = String(op);
    };
    const onScroll = () => {
      if (!scrollRaf.current) scrollRaf.current = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    };
  }, [slidesStarted]);

  useEffect(() => {
    import("./HeroSlideshow").then((mod) => {
      setHeroSlideshow(() => mod.default);
      setSlidesStarted(true);
    });
  }, []);

  useEffect(() => {
    if (!slidesStarted) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slidesStarted]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
  }, []);

  const s = slides[0];

  const heroStatic = (
    <section className="relative h-dvh w-full overflow-hidden bg-charcoal flex flex-col">
      {/* Background image */}
      <div
        className="absolute inset-0"
        data-hero-bg
        style={{ transform: "translateY(0px)", willChange: "transform" }}
      >
        <div
          className="absolute inset-0 scale-110"
          style={{ animation: "heroZoom 8s ease-out forwards" }}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}
            className="object-cover"
            style={{ objectPosition: "center 25%", filter: "brightness(1.25) contrast(1.1) saturate(1.15)" }}
          />
        </div>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/60 via-charcoal/40 to-crimson/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/50 to-transparent" />

      <style>{`@keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.1); } }`}</style>

      <AnimalSilhouettes slideIndex={current} />

      {/* Content — CSS animated entrance */}
      <div
        className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center px-6 text-center max-md:-mt-16"
        data-hero-content
        style={{ opacity: 1 }}
      >
        <div className="animate-hero-card flex flex-col items-center gap-8">
          <div className="max-w-2xl w-full rounded-2xl border border-white/[0.04] bg-black/20 p-8 sm:p-10">
            <span className="animate-fade-in-2 inline-block text-gold text-sm font-medium tracking-[0.2em] uppercase mb-6 border border-gold/20 rounded-full px-5 py-1.5">
              {s.tagline}
            </span>
            <h1 className="animate-fade-in-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-4">
              {s.title}
            </h1>
            <p className="animate-fade-in-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              {s.subtitle}
            </p>
          </div>
          <div className="animate-fade-in-8 flex flex-col sm:flex-row items-center gap-4">
            <Magnetic>
            <Link
              href={s.href}
              className="group relative inline-flex items-center gap-2.5 bg-gradient-to-b from-transparent to-gold/[0.03] border border-gold text-gold font-semibold px-8 py-4 rounded-full text-base overflow-hidden transition-all duration-200 ease-in-out active:scale-95 hover:bg-black hover:text-white hover:-translate-y-[0.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_20px_rgba(212,175,55,0.3)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] hover:drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2.5">
                {s.cta}
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            </Magnetic>
            <Link
              href="/places"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm transition-all duration-300"
            >
              Explore destinations
              <ArrowRight size={15} className="opacity-60" />
            </Link>
          </div>
          <div className="animate-fade-in-15 flex items-center gap-5 sm:gap-7 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-white/45">
            <span>Small groups</span>
            <span className="w-1 h-1 rounded-full bg-gold/60" />
            <span>Visa included</span>
            <span className="w-1 h-1 rounded-full bg-gold/60" />
            <span>Hindi support</span>
          </div>
        </div>
      </div>

      {/* Bottom controls — normal flow, below centered content */}
      <div className="relative z-10 flex flex-col items-center gap-4 pb-8">
        <div className="text-[11px] font-medium tracking-[0.35em] text-white/40 tabular-nums">
          01 <span className="text-white/20 mx-1">/</span> 03
        </div>
        {/* Progress indicators (non-interactive before slides start) */}
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              disabled
              className="relative w-10 h-10 rounded-full bg-transparent border-none cursor-default group"
            >
              <span className={`absolute inset-1 rounded-full transition-all duration-300 ${
                i === 0 ? "bg-gold" : "bg-white/20"
              }`} />
              {i === 0 && (
                <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 40 40">
                  <circle
                    cx="20" cy="20" r="18"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="2"
                    strokeDasharray="0 113.1"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-15">
          <div className="animate-bounce-subtle">
            <ChevronDown className="text-white/30" size={24} />
          </div>
        </div>
      </div>
    </section>
  );

  if (!slidesStarted || !HeroSlideshow) {
    return heroStatic;
  }

  return (
    <HeroSlideshow
      current={current}
      goTo={goTo}
    />
  );
}
