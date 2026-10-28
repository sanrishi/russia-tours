"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Globe, Users } from "lucide-react";

const trustItems = [
  {
    icon: Globe,
    label: "Indian-Owned & Operated",
    desc: "By Indians who know Russia",
  },
  // PLACEHOLDER — years in business: confirm actual start date with client, do not deploy as-is
  {
    icon: Clock,
    label: "10+ Years Experience",
    desc: "Thousands of happy Indian travelers",
  },
  {
    icon: Shield,
    label: "Visa Assistance Included",
    desc: "Hassle-free travel documentation",
  },
  {
    icon: Users,
    label: "Family-Friendly Tours",
    desc: "Curated for all age groups",
  },
];

export default function TrustBar() {
  return (
    <section className="relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl border border-white/[0.08] bg-[#121010]/90 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] px-6 py-6 overflow-hidden"
        >
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="flex overflow-x-auto no-scrollbar gap-8 md:gap-0 md:grid md:grid-cols-4 md:divide-x md:divide-white/[0.06]">
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 min-w-[220px] md:min-w-0 md:justify-center md:px-6"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
