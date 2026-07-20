"use client";

import { motion, useInView, animate } from "framer-motion";
import { Plane, Users, IndianRupee, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Stat {
  icon: typeof Users;
  value: string;
  numericTarget?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: "~120K",
    numericTarget: 120,
    prefix: "~",
    suffix: "K",
    label: "Indian tourists visited Russia in 2024 (up from ~60K in 2023)",
  },
  {
    icon: Plane,
    value: "Daily",
    label: "Direct flights from Delhi & Mumbai to Moscow",
  },
  {
    icon: IndianRupee,
    value: "₹40K",
    numericTarget: 40,
    prefix: "₹",
    suffix: "K",
    label: "Starting round-trip airfare from India",
  },
  {
    icon: ShieldCheck,
    value: "E-Visa",
    label: "Indian e-visa processing in 4 days",
  },
];

function CountUp({ from = 0, to, prefix = "", suffix = "" }: { from?: number; to: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return controls.stop;
  }, [inView, from, to]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function IndiaRussiaTrust() {
  return (
    <section className="relative py-32 md:py-44 bg-transparent border-t border-white/5">
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
          <p className="text-white/70 text-base max-w-xl mx-auto">
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
                <div className="h-full rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-sm p-6 text-center flex flex-col items-center justify-center hover:border-gold/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors shrink-0">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <p className="text-2xl font-bold text-gold mb-1 shrink-0">
                    {s.numericTarget != null ? (
                      <CountUp to={s.numericTarget} prefix={s.prefix} suffix={s.suffix} />
                    ) : (
                      s.value
                    )}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed">
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
