"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  {
    src: "/riverside_smiling.jpeg",
    alt: "Moscow River welcome",
    tag: "Welcome to Moscow",
  },
  {
    src: "/rooftop.jpeg",
    alt: "Rooftop view — Moscow skyline",
    tag: "Day 3 — Rooftop Visit",
  },
  {
    src: "/restraunt_photo.jpeg",
    alt: "Indian restaurant dining",
    tag: "Dinner Inclusions",
  },
  {
    src: "/cafe-two-women.jpg",
    alt: "Café atmosphere — group gathering",
    tag: "Group Atmosphere",
  },
];

export default function TripGallery() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-8 pb-20 sm:pb-8"
    >
      <h3 className="text-lg font-bold text-white mb-6">Trip Gallery</h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {photos.map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="relative group"
          >
            <div className="relative aspect-[9/16] sm:aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-charcoal/50">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-125"
                sizes="(max-width: 768px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              {p.tag && (
                <span className="absolute bottom-2 left-2 bg-charcoal/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-md">
                  {p.tag}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
