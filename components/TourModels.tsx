"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Compass, Check, ArrowRight } from "lucide-react";
import { useState } from "react";

const signatureTours = [
  "Fixed 7-day itinerary",
  "Small groups (4-8 people)",
  "All transfers & accommodation",
  "English-speaking guide (basic Hindi support)",
  "Daily breakfast + 2 Indian meals",
  "Visa assistance included",
];

const customTours = [
  "Flexible duration & dates",
  "Private or family groups",
  "Choose your own cities",
  "Personalized budget planning",
  "Dietary preferences accommodated",
  "Dedicated relationship manager",
];

export default function TourModels() {
  const [activeTab, setActiveTab] = useState<"signature" | "custom">("signature");

  return (
    <section id="tours" className="relative pt-8 md:pt-12 pb-20 md:pb-28">
      <div className="max-w-[1728px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-2xl mx-auto rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-sm p-8 sm:p-10"
        >
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase">
            How We Travel
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mt-4">
            Choose Your Style
          </h2>
          <p className="text-white/70 text-base mt-4 max-w-xl mx-auto">
            Whether you want a ready-made signature tour or a fully custom
            itinerary, we&apos;ve got you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-[520px] rounded-2xl overflow-hidden border border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeTab === "signature" ? "/group-tour.webp" : "/custom-tour.webp"}
                  alt={activeTab === "signature" ? "Signature group tour" : "Custom itinerary"}
                  fill
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                activeTab === "signature"
                  ? "from-gold/20 via-crimson/10 to-charcoal/60"
                  : "from-amber/20 via-gold/10 to-charcoal/60"
              }`}
            />
          </div>

          <div>
            <div className="rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-sm p-6 sm:p-8">
              <div className="flex border border-white/10 rounded-full p-1 mb-8 max-w-xs">
                <button
                  onClick={() => setActiveTab("signature")}
                  className={`flex-1 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === "signature"
? "bg-white text-charcoal"
                    : "text-white/50 hover:text-white"
                  }`}
                >
                  <Users size={14} className="inline mr-1.5" />
                  Signature Tours
                </button>
                <button
                  onClick={() => setActiveTab("custom")}
                  className={`flex-1 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === "custom"
? "bg-white text-charcoal"
                    : "text-white/50 hover:text-white"
                  }`}
                >
                  <Compass size={14} className="inline mr-1.5" />
                  Custom Itinerary
                </button>
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-2">
                  {activeTab === "signature" ? "Signature Group Tours" : "Custom Itineraries"}
                </h3>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  {activeTab === "signature"
                    ? "Join a small group of fellow Indian travelers. Everything is arranged — just pack your bags and go."
                    : "Tell us your dream. We'll build it from scratch — your dates, your cities, your budget, your pace."}
                </p>

                <div className="space-y-2.5 mb-8">
                  {(activeTab === "signature" ? signatureTours : customTours).map(
                    (item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <Check size={14} className="text-gold flex-shrink-0" />
                        <span className="text-white/70 text-sm">{item}</span>
                      </div>
                    )
                  )}
                </div>

              <Link
                href="/moscow-express#booking"
                className="group relative inline-flex items-center gap-2.5 bg-gradient-to-b from-transparent to-gold/[0.03] border border-gold text-gold font-semibold px-6 py-3 rounded-full text-sm overflow-hidden transition-all duration-200 ease-in-out active:scale-95 hover:bg-black hover:text-white hover:-translate-y-[0.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_20px_rgba(212,175,55,0.3)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] hover:drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2.5">
                  {activeTab === "signature" ? "Check Available Dates" : "Build Your Custom Tour"}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-[60%] max-w-[400px] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
