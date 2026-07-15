"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Bell } from "lucide-react";

export default function VisaInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const f = e.currentTarget.elements;
    const payload = {
      _captcha: "false",
      name: (f.namedItem("name") as HTMLInputElement).value,
      email: (f.namedItem("email") as HTMLInputElement).value,
      page: "Visa-Free 2026 Interest",
    };

    try {
      await fetch("https://formsubmit.co/ajax/svetaindia07@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // silently fail
    }

    setSending(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="max-w-[1728px] mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border border-gold/15 bg-gradient-to-b from-gold/[0.03] to-white/[0.02] p-8 sm:p-10 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
              <Bell size={22} className="text-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">You&apos;re Registered!</h3>
            <p className="text-white/50 text-sm">
              We&apos;ll notify you as soon as India–Russia visa-free travel is confirmed.
            </p>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="max-w-[1728px] mx-auto px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl border border-gold/15 bg-gradient-to-b from-gold/[0.03] to-white/[0.02] p-6 sm:p-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <Mail size={20} className="text-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              India–Russia Visa-Free Travel Is Coming
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Register your interest and we&apos;ll notify you the moment
              visa-free travel between India and Russia is officially launched.
              Be among the first to know.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3.5 px-6 rounded-xl bg-gold text-charcoal font-bold text-sm hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Register Interest"}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}