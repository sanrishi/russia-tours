"use client";

import { motion } from "framer-motion";
import { Send, Phone, IndianRupee, Calendar, Users, Globe } from "lucide-react";
import { useState } from "react";

export default function ConversionFooter() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const f = e.currentTarget.elements;

    const name = (f.namedItem("name") as HTMLInputElement).value;
    const phone = `+91${(f.namedItem("phone") as HTMLInputElement).value}`;
    const city = (f.namedItem("city") as HTMLSelectElement).value;
    const group_size = (f.namedItem("group_size") as HTMLSelectElement).value;
    const budget = (f.namedItem("budget") as HTMLSelectElement).value;
    const travel_period = (f.namedItem("travel_period") as HTMLInputElement).value;
    const requirements = (f.namedItem("requirements") as HTMLTextAreaElement).value;

    const msg = `*New Enquiry from tripstorussia.com*
*Name:* ${name}
*Phone:* ${phone}
*City:* ${city}
*Group Size:* ${group_size}
*Budget:* ${budget}
*Travel Period:* ${travel_period}
*Requirements:* ${requirements}`;

    fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _captcha: "false", name, phone, city, group_size, budget, travel_period, requirements }),
    }).catch((err) => console.error("enquiry fetch error:", err));

    window.open(`https://wa.me/917042987451?text=${encodeURIComponent(msg)}`, "_blank");

    setSending(false);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-transparent">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, #d4af37 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
            Ready for Your Russian Journey?
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Tell us about your dream trip. We&apos;ll curate a personalized
            itinerary in 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="          max-w-2xl mx-auto rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-sm p-8 md:p-10"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 px-8 rounded-2xl border border-gold/20 bg-gold/[0.02]"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Send size={24} className="text-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Thank You, Traveler!
              </h3>
              <p className="text-white/50">
                Our team will reach out on WhatsApp within 24 hours with a
                curated itinerary.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rahul Mehta"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                    WhatsApp Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-white/5 border border-r-0 border-white/10 rounded-l-xl text-white/40 text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="98765 43210"
                      className="w-full bg-white/5 border border-white/10 rounded-r-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                    <Globe size={12} className="inline mr-1" />
                    Preferred City
                  </label>
                  <select name="city" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all appearance-none">
                    <option value="" className="bg-charcoal">
                      Select city
                    </option>
                    <option value="moscow" className="bg-charcoal">
                      Moscow
                    </option>
                    <option value="spb" className="bg-charcoal">
                      St. Petersburg
                    </option>
                    <option value="kazan" className="bg-charcoal">
                      Kazan
                    </option>
                    <option value="multi" className="bg-charcoal">
                      Multi-City
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                    <Users size={12} className="inline mr-1" />
                    Group Size
                  </label>
                  <select name="group_size" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all appearance-none">
                    <option value="" className="bg-charcoal">
                      Select size
                    </option>
                    <option value="1" className="bg-charcoal">
                      1 (Solo)
                    </option>
                    <option value="2" className="bg-charcoal">
                      2 (Couple)
                    </option>
                    <option value="3-4" className="bg-charcoal">
                      3-4 (Family)
                    </option>
                    <option value="5-8" className="bg-charcoal">
                      5-8 (Group)
                    </option>
                    <option value="8+" className="bg-charcoal">
                      8+ (Large Group)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                    <IndianRupee size={12} className="inline mr-1" />
                    Budget Range
                  </label>
                  <select name="budget" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all appearance-none">
                    <option value="" className="bg-charcoal">
                      Select budget
                    </option>
                    <option value="50k-1l" className="bg-charcoal">
                      ₹50K — ₹1L
                    </option>
                    <option value="1l-2l" className="bg-charcoal">
                      ₹1L — ₹2L
                    </option>
                    <option value="2l+" className="bg-charcoal">
                      ₹2L+
                    </option>
                    <option value="unsure" className="bg-charcoal">
                      Not Sure Yet
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  <Calendar size={12} className="inline mr-1" />
                  Preferred Travel Period
                </label>
                <input
                  type="text"
                  name="travel_period"
                  placeholder="e.g. December 2026 or March 2027"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  Special Requirements
                </label>
                <textarea
                  name="requirements"
                  rows={3}
                  placeholder="Dietary preferences, accessibility needs, must-visit places, etc."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded-full text-base transition-all hover:shadow-xl hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  {sending ? "Sending..." : "Send via WhatsApp"}
                </button>
                <a
                  href="https://wa.me/917042987451"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-gold/30 hover:border-gold/60 text-gold hover:text-gold px-8 py-4 rounded-full text-base transition-all"
                >
                  <Phone size={16} />
                  Chat Now
                </a>
              </div>

              <p className="text-center text-white/20 text-xs mt-4">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
