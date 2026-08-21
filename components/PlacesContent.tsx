"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Clock, X } from "lucide-react";
import { useState } from "react";

const cities = [
  {
    name: "Moscow",
    slug: "moscow-express",
    tagline: "The Heart of Russia",
    image: "/enhanced_new_moscow.webp",
    highlights: ["Red Square & Kremlin", "Indian & halal dining", "Hindi-speaking guides", "Metro & Aeroexpress"],
    description: "Russia's vibrant capital. Iconic landmarks, world-class museums, and a thriving Indian food scene — Moscow offers everything for a comfortable stay.",
  },
  {
    name: "Murmansk",
    slug: "murmansk",
    tagline: "The Arctic Frontier",
    image: "/placesMurmansk.webp",
    highlights: ["Aurora hunting", "Ice floating in Kola Bay", "Husky & reindeer park", "Teriberka — Arctic Ocean"],
    description: "Beyond the Arctic Circle — chase the Northern Lights, meet huskies and reindeer, and float in the icy Kola Bay. 4 days, small group, fully guided.",
  },
  {
    name: "St. Petersburg",
    slug: "st-petersburg",
    tagline: "The Cultural Capital",
    image: "/stpetersburg-card.webp",
    highlights: ["Hermitage Museum", "Peterhof Palace", "Indian restaurants", "Nevsky Prospect"],
    description: "Russia's cultural capital, known for its imperial architecture, canal views, and the world-famous Hermitage.",
  },
  {
    name: "Kazan",
    slug: "kazan",
    tagline: "Where East Meets West",
    image: "/Kazan_card.avif",
    highlights: ["Kremlin & Mosque", "Tatar cuisine", "Halal-friendly", "Rich culture"],
    description: "The capital of Tatarstan, where East meets West. Famous for its Islamic heritage, halal food scene, and the stunning Kul Sharif Mosque.",
  },
  {
    name: "Nizhny Novgorod",
    slug: "nizhny-novgorod",
    tagline: "Gateway to the Volga",
    image: "/nn-kremlin.webp",
    highlights: ["Ancient Kremlin", "Volga River views", "Chkalov Staircase", "High-speed train"],
    description: "The unofficial 'capital of the Volga' — a 500-year-old Kremlin on a hilltop, the iconic Chkalov Staircase, and the mighty Volga–Oka confluence. Reached by high-speed train from Moscow.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function PlacesContent() {
  const router = useRouter();
  const [modalCity, setModalCity] = useState<string | null>(null);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[400px] sm:min-h-[480px] flex items-start">
        <div className="absolute inset-0">
          <Image
            src="/moscow-hero.webp"
            alt="Moscow cityscape"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a0a] via-[#0c0a0a]/85 to-[#0c0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-transparent to-[#0c0a0a]/30" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, #d4af37 0.5px, transparent 0.5px)`, backgroundSize: "40px 40px" }} />
        <div className="relative w-full max-w-[1728px] mx-auto px-6 pt-28 pb-4 sm:pt-36 sm:pb-4">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-[0.15em] uppercase mb-4"
            >
              <MapPin size={14} /> Destinations
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-white"
            >
              Places to{" "}
              <span className="bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">Visit</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              data-split="Moscow, St. Petersburg, Kazan, Nizhny Novgorod and Murmansk — discover Russia, curated for Indian travelers."
              className="text-gold/70 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Moscow, St. Petersburg, Kazan, Nizhny Novgorod and Murmansk — discover Russia, curated
              for Indian travelers.
            </motion.p>
          </div>
        </div>
      </section>

      {/* City cards */}
      <div className="max-w-[1728px] mx-auto px-6 pb-20 pt-0 sm:pt-0 -mt-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sol-reveal"
        >
          {cities.map((city) => {
            const isMoscow = city.name === "Moscow";
            const isMurmansk = city.name === "Murmansk";
            const isSPB = city.name === "St. Petersburg";
            const isKazan = city.name === "Kazan";
            const isNN = city.name === "Nizhny Novgorod";
            return (
            <motion.div
              key={city.name}
              variants={cardAnim}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => {
                if (city.slug) router.push(`/${city.slug}`);
                else setModalCity(city.name);
              }}
              className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1.5 cursor-pointer ${
                isMoscow
                  ? "border-[#3a1010] bg-[#120606] hover:border-red-500/25 hover:shadow-[0_16px_48px_-12px_rgba(220,50,50,0.15)]"
                  : isMurmansk
                  ? "border-[#0e3d4a] bg-[#071c24] hover:border-[#22d3ee]/40 hover:shadow-[0_16px_48px_-12px_rgba(34,211,238,0.2)]"
                  : isSPB
                  ? "border-[#3d240b] bg-[#1a0e05] hover:border-[#f97316]/40 hover:shadow-[0_16px_48px_-12px_rgba(249,115,22,0.2)]"
                  : isKazan
                  ? "border-[#0b3d2e] bg-[#052014] hover:border-[#34d399]/40 hover:shadow-[0_16px_48px_-12px_rgba(52,211,153,0.2)]"
                  : isNN
                  ? "border-[#3b1d5e] bg-[#140a1e] hover:border-[#a855f7]/40 hover:shadow-[0_16px_48px_-12px_rgba(168,85,247,0.2)]"
                  : "border-[#2a1a3a] bg-[#0c0a10] hover:border-[#6a3a9a] hover:shadow-[0_16px_48px_-12px_rgba(106,58,154,0.15)]"
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs px-3 py-1.5 rounded-full border font-medium backdrop-blur-sm ${
                    isMoscow
                      ? "border-red-500/30 bg-[#120606]/80 text-red-400"
                      : isMurmansk
                      ? "border-[#22d3ee]/30 bg-[#071c24]/80 text-[#67e8f9]"
                      : isSPB
                      ? "border-[#f97316]/30 bg-[#1a0e05]/80 text-[#fb923c]"
                      : isKazan
                      ? "border-[#34d399]/30 bg-[#052014]/80 text-[#34d399]"
                      : isNN
                      ? "border-[#a855f7]/30 bg-[#140a1e]/80 text-[#c084fc]"
                      : "border-[#7a4aaa]/30 bg-[#0c0a10]/80 text-[#9a6aca]"
                  }`}>
                    {city.tagline}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h2 className={`text-xl font-bold text-white mb-2 transition-colors duration-300 ${
                  isMoscow ? "group-hover:text-red-400" : isMurmansk ? "group-hover:text-[#67e8f9]" : isSPB ? "group-hover:text-[#fb923c]" : isKazan ? "group-hover:text-[#34d399]" : isNN ? "group-hover:text-[#c084fc]" : "group-hover:text-[#9a6aca]"
                }`}>
                  {city.name}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed mb-4">
                  {city.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {city.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/50"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {city.slug ? (
                  <span className={`inline-flex items-center gap-2 text-sm font-medium group/link ${
                    isMoscow ? "text-red-400" : isMurmansk ? "text-[#22d3ee]" : isSPB ? "text-[#fb923c]" : isKazan ? "text-[#34d399]" : isNN ? "text-[#a855f7]" : "text-gold"
                  }`}>
                    <span className="relative">
                      View Tours
                      <span className={`absolute -bottom-px left-0 right-0 h-px scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left ${
                        isMoscow ? "bg-red-400/40" : isMurmansk ? "bg-[#22d3ee]/40" : isSPB ? "bg-[#fb923c]/40" : isKazan ? "bg-[#34d399]/40" : isNN ? "bg-[#a855f7]/40" : "bg-gold/40"
                      }`} />
                    </span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-0.5" />
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-white/30 text-sm cursor-default">
                    <Clock size={14} /> Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {modalCity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            onClick={() => setModalCity(null)}
          >
            <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-2xl border border-white/10 bg-[#161412] p-8 sm:p-10 max-w-md w-full text-center shadow-2xl"
            >
              <button
                onClick={() => setModalCity(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={14} className="text-white/50" />
              </button>
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                <Clock size={28} className="text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{modalCity}</h3>
              <p className="text-gold/60 text-base mb-1">Coming Soon</p>
              <p className="text-white/40 text-sm">Stay tuned — we&apos;re working on something special for you.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
