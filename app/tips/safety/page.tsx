import Link from "next/link";
import { ArrowLeft, Phone, Shield, ExternalLink, Heart } from "lucide-react";

export default function SafetyPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <Link
          href="/tips"
          className="inline-flex items-center gap-1.5 text-gold text-sm hover:underline mb-8"
        >
          <ArrowLeft size={14} /> Back to all tips
        </Link>

        <div className="max-w-3xl mb-10">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Safety Guide
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Safety for Indian Travelers in Russia
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            Your safety is our priority. Here are all the contacts and tips you
            need for a worry-free trip.
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Phone size={20} className="text-red-400" />
            <h2 className="text-xl font-bold text-white">
              24/7 Emergency Contacts
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-red-500/10 bg-red-500/[0.03]">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <Phone size={20} className="text-red-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  SVETA Emergency Helpline
                </p>
                <a
                  href="tel:+79652773414"
                  className="text-gold text-lg hover:underline font-bold"
                >
                  +7 965 277 3414
                </a>
                <p className="text-white/40 text-xs mt-1">
                  Available 24/7 for urgent assistance — call or WhatsApp
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <ExternalLink size={20} className="text-gold" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  Indian Embassy — Moscow
                </p>
                <p className="text-white/50 text-sm">
                  Consular Dept: +7 495 916-23-43
                </p>
                <a
                  href="mailto:cons.moscow@mea.gov.in"
                  className="text-gold text-sm hover:underline"
                >
                  cons.moscow@mea.gov.in
                </a>
                <p className="text-white/40 text-xs mt-1">
                  For non-urgent queries, lost passport, and documentation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* General Safety */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-gold" />
            <h2 className="text-xl font-bold text-white">
              General Safety Tips
            </h2>
          </div>
          <ul className="space-y-3">
            {[
              "Moscow and St. Petersburg are generally safe — standard city precautions apply",
              "Keep your passport and e-visa printed copy with you at all times",
              "Use only official taxis (Yandex Go) — avoid unmarked cars at the airport",
              "Store emergency contacts in your phone before departure",
              "Your guide is available throughout the trip — contact them first in any situation",
              "Register with the Indian Embassy's MADAD portal for travel alerts",
            ].map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-sm text-white/60"
              >
                <span className="text-gold mt-0.5 shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Health */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart size={20} className="text-gold" />
            <h2 className="text-xl font-bold text-white">Health & Medical</h2>
          </div>
          <ul className="space-y-3">
            {[
              "Travel insurance is strongly recommended — ensure it covers medical evacuation",
              "Tap water in Moscow is safe to drink (boiled/filtered recommended for sensitive stomachs)",
              "Pharmacies (Apteka) are everywhere — most have English-speaking staff",
              "Indian restaurants can adjust spice levels — just ask",
              "Carry basic medicines: paracetamol, antacids, ORS packets, and any prescription meds",
            ].map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-sm text-white/60"
              >
                <span className="text-gold mt-0.5 shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
