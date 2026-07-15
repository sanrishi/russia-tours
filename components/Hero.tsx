"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import AnimalSilhouettes from "./AnimalSilhouettes";

const slides = [
  {
    image: "/moscow-hero.jpg",
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
    image: "/new_moscow.jpg",
    title: "India Meets Russia",
    subtitle: "Indian Cuisine • Hindi Support • Visa Assistance",
    tagline: "Travel With Confidence",
    cta: "About Us",
    href: "/about",
  },
];

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

  return (
    <section className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Background images */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${imageY}px)`, willChange: "transform" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 scale-110"
              style={{ animation: "heroZoom 8s ease-out forwards" }}
            >
              <img
                src={slides[current].image}
                alt=""
                className="w-full h-full object-cover"
                  style={{ objectPosition: "center 25%", filter: "brightness(1.05) contrast(1.1) saturate(1.15)" }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/70 via-charcoal/50 to-crimson/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />

      <style>{`@keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.1); } }`}</style>

      {/* Animal silhouettes */}
      <AnimalSilhouettes slideIndex={current} />

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center max-md:-mt-16"
        style={{ opacity: contentOpacity }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="inline-block text-gold text-sm font-medium tracking-[0.2em] uppercase mb-6 border border-gold/20 rounded-full px-5 py-1.5"
            >
              {slides[current].tagline}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-4"
            >
              {slides[current].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              {slides[current].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <Link
                href={slides[current].href}
                className="group inline-flex items-center gap-2 bg-transparent border border-gold text-gold hover:bg-gold hover:text-charcoal font-semibold px-8 py-4 rounded-full text-base transition-all"
              >
                {slides[current].cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative w-10 h-10 rounded-full bg-transparent border-none cursor-pointer group"
          >
            <span className={`absolute inset-1 rounded-full transition-all duration-300 ${
              i === current ? "bg-gold" : "bg-white/20 group-hover:bg-white/40"
            }`} />
            {i === current && (
              <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 40 40">
                <circle
                  cx="20" cy="20" r="18"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2"
                  strokeDasharray={`${(progress / 100) * 113.1} 113.1`}
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="text-white/30" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
