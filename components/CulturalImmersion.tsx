"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  UtensilsCrossed,
  Languages,
  HeadphonesIcon,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

// PLACEHOLDER — section not in SOW homepage spec. Confirm with client if this stays or goes.
const highlights = [
  { icon: MapPin, text: "Private Red Square & Kremlin access" },
  { icon: UtensilsCrossed, text: "Halal-friendly & Indian dining options" },
  { icon: Languages, text: "English-speaking guides, basic Hindi support" },
  { icon: HeadphonesIcon, text: "24/7 WhatsApp support in India" },
];

export default function CulturalImmersion() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const rawImgY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -40]);
  const imgY = useSpring(rawImgY, { stiffness: 60, damping: 20, mass: 0.5 });

  return (
    <section id="stories" ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <motion.div className="absolute inset-0" style={{ y: imgY }}>
              <Image
                src="/tour-style.webp"
                alt="Tour style concept"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-crimson/15 to-charcoal/60" />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent p-8">
              <p className="text-sm text-gold font-medium tracking-widest">
                CURATED EXPERIENCE
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-sm p-8 md:p-10"
          >
            <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase">
              The Experience
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mt-4 mb-6">
              Beyond the Guidebook.
              <br />
              <span className="text-white/50">Closer to Home.</span>
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8">
              We don&apos;t just show you buildings — we unlock Russia through
              an Indian lens. From private access to the Red Square to
              halal-friendly dining in St. Petersburg, every detail is curated
              with your comfort in mind. Verified local guides with basic Hindi
              guides, and absolute peace of mind.
            </p>

            <div className="space-y-4">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-gold" />
                    </div>
                    <span className="text-white/80 text-sm">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
