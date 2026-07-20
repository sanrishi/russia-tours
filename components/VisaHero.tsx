"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Scan } from "lucide-react";

export default function VisaHero() {
  return (
    <section className="relative overflow-hidden min-h-[480px] sm:min-h-[560px] flex items-center">
      <div className="absolute inset-0">
        <Image
          src="/evisa-hero.webp"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a0a] via-[#0c0a0a]/85 to-[#0c0a0a]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-transparent to-[#0c0a0a]/30" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, #d4af37 0.5px, transparent 0.5px)`, backgroundSize: "40px 40px" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="relative w-full max-w-[1728px] mx-auto px-6 py-20 sm:py-28">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-[0.15em] uppercase mb-4"
          >
            <Scan size={14} /> Visa Information
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5"
          >
            Russia E-Visa for<br />
            <span className="bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">Indian Citizens</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gold/70 text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            India is eligible for Russia&apos;s unified e-visa — a single-entry electronic visa
            valid for 60 days with a maximum stay of 16 days, processed entirely online in just 4 calendar days.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
