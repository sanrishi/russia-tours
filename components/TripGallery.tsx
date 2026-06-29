"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  {
    src: "/rooftop.jpeg",
    alt: "Rooftop view — Moscow skyline",
    tag: "Day 3 — Rooftop Visit",
    featured: true,
    objectPosition: "object-[center_40%]",
  },
  {
    src: "/restraunt_photo.jpeg",
    alt: "Indian restaurant dining",
    tag: "Dinner Inclusions",
    featured: false,
    objectPosition: "object-[center_25%]",
  },
  {
    src: "/cafe-two-women.jpg",
    alt: "Café atmosphere — group gathering",
    tag: "Group Atmosphere",
    featured: false,
    objectPosition: "object-[center_15%]",
  },
];

export default function TripGallery() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 pb-20 sm:pb-8"
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
            className={`relative group ${p.featured ? "row-span-2 h-full" : ""}`}
          >
            <div
              className={`relative rounded-xl overflow-hidden border border-white/5 ${
                p.featured
                  ? "h-full"
                  : "aspect-[3/4] sm:aspect-[4/5]"
              }`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                unoptimized
                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${p.objectPosition}`}
                sizes="(max-width: 768px) 50vw, 33vw"
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
