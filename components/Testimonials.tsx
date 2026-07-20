"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "New Delhi",
    text: "SVETA made our family trip to Moscow effortless. Hindi guide, Indian food arrangements, visa support — everything was handled. Felt like home away from home.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    location: "Mumbai",
    text: "The Kazan tour was an eye-opener. The halal food scene, the mosque visits, the Tatar culture — perfectly curated for Indian Muslims. Highly recommend.",
    rating: 5,
  },
  {
    name: "Ananya Gupta",
    location: "Bangalore",
    text: "I was nervous about traveling to Russia alone. Their team was with me every step of the way. St. Petersburg is breathtaking, and the Indian food arrangements were a lifesaver.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 md:py-44 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mt-4">
            Trusted by Indian Travelers
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative p-8 rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-sm hover:border-gold/20 transition-all duration-500 group"
            >
              <Quote
                size={24}
                className="text-gold/20 absolute top-6 right-6"
              />

              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="text-white/80 text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white/60 text-xs">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-12 py-5 px-8 rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-sm"
        >
          {/* PLACEHOLDER — trust badges: replace with real client verifications, do not deploy as-is */}
          <span className="text-white/60 text-xs tracking-widest uppercase">
            Trusted Partners
          </span>
          {/* PLACEHOLDER — real Google rating from client's actual listing */}
          <span className="text-white/80 text-sm font-medium">
            ★ 4.9 Google Rating
          </span>
          {/* PLACEHOLDER — real traveler count from client's records */}
          <span className="text-white/80 text-sm">
            1,000+ Happy Indian Travelers
          </span>
          {/* PLACEHOLDER — real license/certification number once obtained */}
          <span className="text-white/80 text-sm">
            Registered Tour Operator
          </span>
        </motion.div>
      </div>
    </section>
  );
}
