"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sun, UtensilsCrossed, Lightbulb, Shield, FileText, Banknote, Map, Building, Plane, Globe, Wifi, Languages, Sparkles } from "lucide-react";

const articles = [
  { href: "/tips/weather-packing", icon: Sun, label: "Weather & Packing", title: "Moscow in August — What to Pack", desc: "Daytime 23°C, cool evenings, and exactly what to bring for your trip.", img: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&auto=format" },
  { href: "/tips/indian-food", icon: UtensilsCrossed, label: "Indian Food Guide", title: "Indian & Halal Food Near Red Square", desc: "Authentic Indian restaurants within walking distance of the Kremlin.", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop&auto=format" },
  { href: "/tips/itineraries", icon: Map, label: "Itineraries", title: "Moscow in 1, 3 & 7 Days", desc: "Perfect plans for any trip length — from a quick layover to a full week.", img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&h=400&fit=crop&auto=format" },
  { href: "/tips/hotels", icon: Building, label: "Hotels", title: "Where to Stay in Moscow", desc: "Best areas and hotels for Indian travellers — with prices and tips.", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&auto=format" },
  { href: "/tips/transport", icon: Plane, label: "Transport", title: "Getting Around Moscow", desc: "Airports, Aeroexpress, metro, taxis, and trains between cities.", img: "/transport-index.webp" },
  { href: "/tips/first-time", icon: Globe, label: "First-Time Guide", title: "A First-Time Visitor's Guide to Moscow", desc: "Visa, cash, safety, and daily life tips for your first trip to Russia.", img: "/firsttime-index.webp" },
  { href: "/tips/connectivity", icon: Wifi, label: "Connectivity", title: "SIM, VPN & Apps for Moscow", desc: "Stay connected — local SIMs, essential VPN setup, and must-have apps.", img: "/connectivity-index.webp" },
  { href: "/tips/phrasebook", icon: Languages, label: "Phrasebook", title: "Basic Russian for Indian Travellers", desc: "Essential words and phrases for greetings, food, shopping, and emergencies.", img: "/phrasebook-index.webp" },
  { href: "/tips/practical-tips", icon: Lightbulb, label: "Practical Tips", title: "Payments, Internet, Metro & Language", desc: "Navigate Russia with confidence — cash, SIM cards, metro, and basic Russian phrases.", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop&auto=format" },
  { href: "/tips/safety", icon: Shield, label: "Safety Guide", title: "Safety for Indian Travelers", desc: "Emergency contacts, embassy info, health tips, and general safety advice.", img: "/safety-index.webp" },
  { href: "/tips/visa-guide", icon: FileText, label: "Visa Guide", title: "Russia E-Visa for Indian Citizens", desc: "Step-by-step process, documents required, and important notes for your application.", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&auto=format" },
  { href: "/tips/currency", icon: Banknote, label: "Currency Guide", title: "Currency & Payments in Russia", desc: "Cash, Yoomoney card, and how to pay when VISA/Mastercard don't work.", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop&auto=format" },
];

export default function TipsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero — Faded Image (E-VISA / About pattern) */}
      <section className="relative overflow-hidden min-h-[480px] sm:min-h-[560px] flex items-start">
        <div className="absolute inset-0">
          <Image
            src="/unsplash-moscow-river.webp"
            alt="Moscow riverfront"
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
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-[0.15em] uppercase mb-4">
              <Sparkles size={14} /> Useful Tips
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-white">
              Travel Tips for{" "}
              <span className="bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">Indian Visitors</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-gold/70 text-base sm:text-lg leading-relaxed max-w-2xl">
              Weather, packing, food, safety, visa, currency — everything you need to know before visiting Russia, curated for Indian travellers.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-[1728px] mx-auto px-6 pb-20 pt-8 sm:pt-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={a.href} className="animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                <Link
                  href={a.href}
                  className="group relative block rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] overflow-hidden hover:border-gold/25 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(212,175,55,0.12)] h-full flex flex-col"
                >
                  <div className="relative aspect-[3/2] overflow-hidden shrink-0">
                    <img
                      src={a.img}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon size={15} className="text-gold" />
                      </div>
                      <span className="text-gold text-[11px] font-medium tracking-[0.15em] uppercase drop-shadow-sm">
                        {a.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-gold transition-colors duration-300 leading-snug">
                      {a.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/40 mt-2 leading-relaxed line-clamp-2 flex-1">
                      {a.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-xs font-medium mt-3 transition-all duration-300 group-hover:gap-2.5">
                      Read More <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
