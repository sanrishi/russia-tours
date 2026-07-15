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
    image: "/new_moscow.jpg",
    highlights: ["Red Square & Kremlin", "Indian & halal dining", "Hindi-speaking guides", "Metro & Aeroexpress"],
    description: "Russia's vibrant capital. Iconic landmarks, world-class museums, and a thriving Indian food scene — Moscow offers everything for a comfortable stay.",
  },
  {
    name: "St. Petersburg",
    slug: null,
    tagline: "The Cultural Capital",
    image: "/stpetersburg-card.jpg",
    highlights: ["Hermitage Museum", "Peterhof Palace", "Indian restaurants", "Nevsky Prospect"],
    description: "Russia's cultural capital, known for its imperial architecture, canal views, and the world-famous Hermitage. Tour packages coming soon.",
  },
  {
    name: "Kazan",
    slug: null,
    tagline: "Where East Meets West",
    image: "/Kazan_card.avif",
    highlights: ["Kremlin & Mosque", "Tatar cuisine", "Halal-friendly", "Rich culture"],
    description: "The capital of Tatarstan, where East meets West. Famous for its Islamic heritage, halal food scene, and the stunning Kul Sharif Mosque.",
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
            src="/moscow-hero.jpg"
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
        <div className="relative w-full max-w-[1728px] mx-auto px-6 pt-28 pb-8 sm:pt-36 sm:pb-12">
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
              className="text-gold/70 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Moscow, St. Petersburg, Kazan — discover Russia&apos;s most iconic cities,
              curated for Indian travelers.
            </motion.p>
          </div>
        </div>
      </section>

      {/* City cards */}
      <div className="max-w-[1728px] mx-auto px-6 pb-20 pt-8 sm:pt-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {cities.map((city) => {
            const isMoscow = city.name === "Moscow";
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
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs px-3 py-1.5 rounded-full border font-medium backdrop-blur-sm ${
                    isMoscow
                      ? "border-red-500/30 bg-[#120606]/80 text-red-400"
                      : "border-[#7a4aaa]/30 bg-[#0c0a10]/80 text-[#9a6aca]"
                  }`}>
                    {city.tagline}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h2 className={`text-xl font-bold text-white mb-2 transition-colors duration-300 ${
                  isMoscow ? "group-hover:text-red-400" : "group-hover:text-[#9a6aca]"
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
                    isMoscow ? "text-red-400" : "text-gold"
                  }`}>
                    <span className="relative">
                      View Tours
                      <span className={`absolute -bottom-px left-0 right-0 h-px scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left ${
                        isMoscow ? "bg-red-400/40" : "bg-gold/40"
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
