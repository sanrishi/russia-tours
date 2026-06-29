"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const particles = [
  { x: 10, y: 20, size: 3, duration: 8, delay: 0 },
  { x: 25, y: 80, size: 4, duration: 6, delay: 0.5 },
  { x: 40, y: 15, size: 2, duration: 10, delay: 1 },
  { x: 55, y: 65, size: 5, duration: 7, delay: 0.3 },
  { x: 70, y: 30, size: 3, duration: 9, delay: 1.5 },
  { x: 85, y: 75, size: 4, duration: 5, delay: 0.8 },
  { x: 15, y: 50, size: 2, duration: 8, delay: 2 },
  { x: 50, y: 90, size: 3, duration: 6, delay: 1.2 },
  { x: 75, y: 10, size: 5, duration: 7, delay: 0.6 },
  { x: 30, y: 45, size: 2, duration: 9, delay: 1.8 },
  { x: 90, y: 60, size: 4, duration: 8, delay: 0.2 },
  { x: 60, y: 40, size: 3, duration: 6, delay: 1 },
];

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/moscow-hero.jpg"
        alt="Moscow skyline at twilight"
        fill
        unoptimized
        className="object-cover"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/70 via-charcoal/50 to-crimson/20" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 50%, #d4af37 0.5px, transparent 0.5px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block text-gold text-sm font-medium tracking-[0.2em] uppercase mb-6 border border-gold/20 rounded-full px-5 py-1.5"
          >
            For Indian Travelers, by Indosvetka
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-4"
          >
            <span className="text-gold">Trips to</span>{" "}
            <span className="text-white">Russia</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl text-white/40 tracking-widest uppercase mb-8"
          >
            by Indosvetka
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Curated small-group tours to Moscow, St. Petersburg &amp; Kazan.
            Designed exclusively for Indian travelers — with visa assistance,
            Indian cuisine, and English-speaking guides.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/places"
              className="group inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded-full text-base transition-all hover:shadow-xl hover:shadow-gold/20"
            >
              View Upcoming Trips
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white px-8 py-4 rounded-full text-base transition-all"
            >
              About Me
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-white/30" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
