"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import AnimalSilhouettes from "./AnimalSilhouettes";

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

interface Props {
  current: number;
  scrollY: number;
  isMobile: boolean;
  progress: number;
  goTo: (i: number) => void;
  contentOpacity: number;
  imageY: number;
}

export default function HeroSlideshow({
  current,
  scrollY,
  isMobile,
  progress,
  goTo,
  contentOpacity,
  imageY,
}: Props) {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-charcoal flex flex-col">
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
            <div
              className="absolute inset-0 scale-110"
              style={{ animation: "heroZoom 8s ease-out forwards" }}
            >
              <img
                src={slides[current].image}
                alt=""
                loading="eager"
                fetchPriority={current === 0 ? "high" : "auto"}
                className="w-full h-full object-cover"
                 style={{ objectPosition: "center 25%", filter: "brightness(1.25) contrast(1.1) saturate(1.15)" }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/60 via-charcoal/40 to-crimson/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/50 to-transparent" />

      <style>{`@keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.1); } }`}</style>

      <AnimalSilhouettes slideIndex={current} />

      {/* Content */}
      <div
        className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center px-6 text-center max-md:-mt-16"
        style={{ opacity: contentOpacity }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
          >
            {/* Glass card */}
            <div className="max-w-2xl w-full rounded-2xl border border-white/[0.04] bg-black/20 p-8 sm:p-10">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block text-gold text-sm font-medium tracking-[0.2em] uppercase mb-6 border border-gold/20 rounded-full px-5 py-1.5"
              >
                {slides[current].tagline}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0, duration: 0.5 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-4"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
              >
                {slides[current].subtitle}
              </motion.p>
            </div>

            {/* CTA Button below card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link
                href={slides[current].href}
                className="group relative inline-flex items-center gap-2.5 bg-gradient-to-b from-transparent to-gold/[0.03] border border-gold text-gold font-semibold px-8 py-4 rounded-full text-base overflow-hidden transition-all duration-200 ease-in-out active:scale-95 hover:bg-black hover:text-white hover:-translate-y-[0.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_20px_rgba(212,175,55,0.3)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] hover:drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2.5">
                  {slides[current].cta}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls — normal flow, below centered content */}
      <div className="relative z-10 flex flex-col items-center gap-6 pb-8">
        {/* Progress indicators */}
        <div className="flex items-center gap-3">
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
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="text-white/30" size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
