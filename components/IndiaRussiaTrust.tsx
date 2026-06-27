"use client";

import { motion } from "framer-motion";
import { Plane, Users, IndianRupee, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "60K+",
    label: "Indian tourists visited Russia in 2024",
  },
  {
    icon: Plane,
    value: "Weekly",
    label: "Direct flights from Delhi & Mumbai to Moscow",
  },
  {
    icon: IndianRupee,
    value: "₹12K",
    label: "Starting round-trip airfare from India",
  },
  {
    icon: ShieldCheck,
    value: "E-Visa",
    label: "Indian e-visa processing in 4 days",
  },
];

export default function IndiaRussiaTrust() {
  return (
    <section className="relative py-20 md:py-28 bg-charcoal border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            India <span className="text-gold">&amp;</span> Russia
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Traveling to Russia is easier, safer, and more connected than ever
            for Indian visitors.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center flex flex-col items-center justify-center hover:border-gold/20 hover:bg-gold/[0.02] transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors shrink-0">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <p className="text-2xl font-bold text-gold mb-1 shrink-0">
                    {s.value}
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {s.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
