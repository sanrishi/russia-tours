"use client";

import { motion } from "framer-motion";

const cities = [
  "Moscow",
  "St. Petersburg",
  "Kazan",
  "Murmansk",
  "Nizhny Novgorod",
];

function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="h-1 w-1 shrink-0 rotate-45 bg-gold/45 shadow-[0_0_6px_rgba(212,175,55,0.45)]"
    />
  );
}

/**
 * Static editorial strip — one clean set of destinations, no marquee
 * duplication. Cities in italic serif, glowing diamonds between, faint
 * gold wash, hairline seams. Hover-only motion.
 */
export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.05] bg-[#0d0b0b]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_72%)]" />

      <div className="relative mx-auto max-w-[1500px] px-6 py-5 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5 sm:gap-x-2"
        >
          {cities.map((city, i) => (
            <span key={city} className="flex items-center gap-x-1 sm:gap-x-2">
              <span className="px-2 font-heading text-base italic text-white/75 transition-colors duration-300 hover:text-gold sm:px-3 sm:text-lg md:text-xl">
                {city}
              </span>
              {i < cities.length - 1 && <Diamond />}
            </span>
          ))}
        </motion.div>
      </div>

      {/* hairline seams */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>
  );
}
