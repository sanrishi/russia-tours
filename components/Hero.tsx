"use client";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import AnimalSilhouettes from "./AnimalSilhouettes";

const slides = [
  {
    image: "/moscow-hero.webp",
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

const HeroSlideshow = lazy(() => import("./HeroSlideshow"));

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slidesStarted, setSlidesStarted] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    import("./HeroSlideshow");
    const delay = setTimeout(() => setSlidesStarted(true), 5000);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!slidesStarted) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setProgress(0);
    }, 8000);
    return () => clearInterval(interval);
  }, [slidesStarted]);

  useEffect(() => {
    if (!slidesStarted) return;
    const tick = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / 80, 100));
    }, 100);
    return () => clearInterval(tick);
  }, [current, slidesStarted]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setProgress(0);
  }, []);

  const imageY = isMobile ? 0 : Math.min(0, -scrollY * 0.3);
  const contentOpacity = Math.min(1, 1 - scrollY / 800);

  if (!slidesStarted) {
    const s = slides[0];
    return (
      <section className="relative h-dvh w-full overflow-hidden bg-charcoal">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${imageY}px)`, willChange: "transform" }}
        >
          <div
            className="absolute inset-0 scale-110"
            style={{ animation: "heroZoom 8s ease-out forwards" }}
          >
            <img
              src={s.image}
              alt=""
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover"
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
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center max-md:-mt-16"
          style={{ opacity: contentOpacity }}
        >
          <div className="animate-hero-card flex flex-col items-center gap-8">
            <div className="max-w-2xl w-full rounded-2xl border border-white/[0.06] bg-black/10 backdrop-blur-sm p-8 sm:p-10">
              <span className="animate-blur-in-2 inline-block text-gold text-sm font-medium tracking-[0.2em] uppercase mb-6 border border-gold/20 rounded-full px-5 py-1.5">
                {s.tagline}
              </span>
              <h1 className="animate-blur-in-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-4">
                {s.title}
              </h1>
              <p className="animate-blur-in-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                {s.subtitle}
              </p>
            </div>
            <div className="animate-blur-in-8">
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
            </div>
          </div>
        </div>

        {/* Progress indicators (non-interactive before slides start) */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
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
        <div className="animate-fade-in-15 absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="animate-bounce-subtle">
            <ChevronDown className="text-white/30" size={24} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <Suspense fallback={null}>
      <HeroSlideshow
        current={current}
        scrollY={scrollY}
        isMobile={isMobile}
        progress={progress}
        goTo={goTo}
        contentOpacity={contentOpacity}
        imageY={imageY}
      />
    </Suspense>
  );
}
