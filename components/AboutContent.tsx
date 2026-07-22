"use client";

import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";
import { Heart, Users, Globe, Star, MapPin, Mail, Phone, ArrowRight, Quote, Award, Handshake, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CountUp({ from = 0, to, decimals = 0, suffix = "" }: { from?: number; to: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setCount(parseFloat(v.toFixed(decimals))),
    });
    return controls.stop;
  }, [inView, from, to, decimals]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function AboutContent() {
  return (
    <main className="min-h-screen">
      {/* ─── HERO — Faded Image (E-VISA pattern) ─── */}
      <section className="relative overflow-hidden min-h-[480px] sm:min-h-[560px] flex items-start">
        <div className="absolute inset-0">
          <Image
            src="/unsplash-stbasil.webp"
            alt="St. Basil's Cathedral, Moscow"
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
        <div className="relative w-full max-w-[1728px] mx-auto px-6 pt-28 pb-8 sm:pt-36 sm:pb-12">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-[0.15em] uppercase mb-4"
            >
              <Heart size={14} /> About Me
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5"
            >
              Your Guide to{" "}
              <span className="bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">Russia</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gold/70 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Helping Indian travelers experience Russia with comfort, confidence, and a taste of home.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-[1728px] mx-auto px-6 pb-20 -mt-6 relative z-10">
        {/* ─── STATS ROW ─── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {[
            { icon: Users, value: "100+", target: 100, suffix: "+", label: "Travelers Guided" },
            { icon: Globe, value: "2", target: 2, label: "Countries Connected" },
            { icon: Star, value: "4.9", target: 4.9, decimals: 1, label: "Avg. Rating" },
            { icon: Heart, value: "Multiple", label: "India Visits" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative p-5 rounded-xl border border-white/10 bg-[#161412] hover:border-gold/20 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                  <s.icon size={18} className="text-gold" />
                </div>
                <p className="text-2xl font-bold text-white tabular-nums">
                  {s.target != null ? (
                    <CountUp to={s.target} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
                  ) : (
                    s.value
                  )}
                </p>
                <p className="text-sm text-white/50">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── MY JOURNEY ─── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-10 mb-6 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 md:order-2">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/5 group">
                <img
                  src="/profile_sveta.webp"
                  alt="Sveta — Indosvetka"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161412]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-bold">Sveta</p>
                  <p className="text-gold/70 text-xs">Founder & Tour Host</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 md:order-1 space-y-4 pt-12 md:pt-24">
              <motion.h2
                {...stagger}
                className="text-xl font-bold text-white flex items-center gap-2"
              >
                <span className="w-1 h-5 rounded-full bg-gold" />
                My Journey
              </motion.h2>
              <motion.p
                {...stagger}
                transition={{ delay: 0.05 }}
                className="text-white/70 text-base leading-relaxed"
              >
                Hi, I&apos;m Sveta. I have visited India many times and spent
                a lot of time interacting with local people. These experiences
                helped me understand Indian culture, traditions, and daily life
                from the inside, not just as a tourist. I truly admire India
                and feel a strong connection to its people.
              </motion.p>
              <motion.p
                {...stagger}
                transition={{ delay: 0.1 }}
                className="text-white/70 text-base leading-relaxed"
              >
                During my travels, I often heard from Indians that they feel a
                close cultural bond with Russia and are very interested in
                visiting the country. This inspired me to create guided tours
                in Russia specifically for Indian travelers.
              </motion.p>
              <motion.div
                {...stagger}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-2"
              >
                {["10+ India Visits", "Tour Guide since 2024", "English & Hindi"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold/80"
                    >
                      {tag}
                    </span>
                  )
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ─── WHY INDIAN TRAVELERS ─── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-10 mb-6 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="relative aspect-[16/12] rounded-xl overflow-hidden border border-white/5 group">
                <Image
                  src="/riverside_smiling.webp"
                  alt="Happy traveler in Russia"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-6">
              <motion.h2
                {...stagger}
                className="text-xl font-bold text-white flex items-center gap-2"
              >
                <span className="w-1 h-5 rounded-full bg-gold" />
                Why Indian Travelers?
              </motion.h2>
              <motion.p
                {...stagger}
                transition={{ delay: 0.05 }}
                className="text-white/70 text-base leading-relaxed"
              >
                My goal is to make travel in Russia comfortable, well-organized,
                and stress-free. I personally accompany groups during tours,
                stay available throughout the journey, and help with any
                questions or situations that may arise.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { icon: Handshake, text: "Hindi-speaking guides" },
                  { icon: Award, text: "Indian food arrangements" },
                  { icon: Languages, text: "English & basic Hindi" },
                  { icon: MapPin, text: "Visa & logistics support" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <item.icon size={14} className="text-gold" />
                    </div>
                    <span className="text-sm text-white/60">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ─── MY COMMITMENT ─── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-10 mb-6 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="max-w-3xl">
            <motion.h2
              {...stagger}
              className="text-xl font-bold text-white mb-4 flex items-center gap-2"
            >
              <span className="w-1 h-5 rounded-full bg-gold" />
              My Commitment
            </motion.h2>
            <motion.p
              {...stagger}
              transition={{ delay: 0.05 }}
              className="text-white/70 text-base leading-relaxed mb-4"
            >
              I accompany every group personally and remain available throughout
              the journey — so guests can fully enjoy their experience without
              worrying about logistics, language barriers, or cultural
              differences.
            </motion.p>
            <motion.p
              {...stagger}
              transition={{ delay: 0.1 }}
              className="text-white/70 text-base leading-relaxed"
            >
              I speak English and have basic knowledge of Hindi (at a very
              simple level). While I&apos;m not fluent, I&apos;m able to
              communicate on a practical level and understand key expressions,
              especially in travel and everyday situations.
            </motion.p>
          </div>
        </motion.div>

        {/* ─── CONTACT ─── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-8 mb-6 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <motion.h3
            {...stagger}
            className="text-white font-semibold text-sm mb-4 flex items-center gap-2"
          >
            <span className="w-1 h-4 rounded-full bg-gold" />
            Contact
          </motion.h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: Mail, label: "Email", value: "svetaindia07@gmail.com", href: "mailto:svetaindia07@gmail.com" },
              { icon: Phone, label: "Phone", value: "+91 70429 87451", href: "tel:+917042987451" },
              { icon: Phone, label: "Alternate", value: "+91 77172 51915", href: "tel:+917717251915" },
              { icon: MapPin, label: "Location", value: "Moscow / India" },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]"
              >
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <c.icon size={14} className="text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-sm text-white/60 hover:text-gold transition-colors truncate block">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm text-white/60 truncate">{c.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
