"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  {
    src: "/rooftop.jpg",
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
    alt: "Café atmosphere",
    tag: null,
  },
];

export default function TripGallery() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <h3 className="text-lg font-bold text-white mb-6">Trip Gallery</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {photos.map((p) => (
          <div key={p.src} className="relative group">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              {p.tag && (
                <span className="absolute bottom-2 left-2 bg-charcoal/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-md">
                  {p.tag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
