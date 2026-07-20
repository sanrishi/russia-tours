import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Check, ExternalLink, AlertTriangle, CreditCard, FileText, Globe, Clock, ArrowRight, Scan, Plane, Monitor, Camera, FileCheck, Send, Download, HelpCircle } from "lucide-react";
import Link from "next/link";
import VisaHero from "@/components/VisaHero";
import VisaInterestForm from "@/components/VisaInterestForm";

export const metadata: Metadata = {
  title: "Russia E-Visa Guide for Indian Travelers — 4-Day Processing | Indosvetka",
  description:
    "Complete guide to Russia's unified e-visa for Indian citizens. 4-day processing, $52 fee, no invitation letter needed. Step-by-step application instructions and FAQ.",
};

export default function VisaPage() {
  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a unified e-visa for Russia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The unified e-visa is a single-entry electronic visa for Russia processed entirely online at evisa.kdmid.ru. It allows a stay of up to 16 days within a 60-day validity period, takes 4 calendar days to process, and costs $52 USD. Indian citizens are eligible and no invitation letter is required.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to get a Russian e-visa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Russian e-visa is processed in 4 calendar days (including weekends). However, it is recommended to apply at least 2 weeks before your travel date to account for any potential delays or technical issues.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a Russian e-visa cost for Indian citizens?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Russian unified e-visa costs $52 USD (approximately ₹4,300 INR). The fee is paid online via credit or debit card through the official e-visa portal and is non-refundable even if the visa application is denied.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <VisaHero />

      <div className="max-w-[1728px] mx-auto px-6 pb-20 -mt-6 relative z-10">
        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Clock, label: "Processing Time", value: "4 Days", sub: "Calendar days" },
            { icon: CreditCard, label: "Cost", value: "~₹4,300", sub: "$52 USD" },
            { icon: Globe, label: "Max Stay", value: "16 Days", sub: "Single entry" },
            { icon: FileText, label: "Invitation", value: "Not Required", sub: "No visa support needed" },
          ].map((s, i) => (
            <div key={s.label} className="group relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-gold/20 hover:bg-white/[0.04] transition-all duration-500 animate-fade-in hover:shadow-[0_8px_30px_-8px_rgba(212,175,55,0.06)]" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gold/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-gold/15 transition-colors duration-300">
                  <s.icon size={18} className="text-gold" />
                </div>
                <p className="text-2xl font-bold text-white tabular-nums">{s.value}</p>
                <p className="text-sm text-white/50 mt-0.5">{s.label}</p>
                <p className="text-[11px] text-white/20 mt-0.5">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* E-Visa vs Traditional */}
        <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 mb-6 overflow-hidden animate-fade-in hover:shadow-[0_8px_30px_-8px_rgba(212,175,55,0.04)] transition-shadow duration-500" style={{ animationDelay: "100ms" }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/[0.02] rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plane size={18} className="text-gold" />
              E-Visa vs Traditional Tourist Visa
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1 p-5 rounded-xl border border-gold/15 bg-gold/[0.03] backdrop-blur-sm">
                <p className="text-gold text-xs font-bold uppercase tracking-wider mb-4">Feature</p>
                <div className="space-y-4">
                  {["Processing Time", "Cost", "Max Stay", "Invitation Letter", "Passport Submission", "Visit Purpose"].map((f) => (
                    <p key={f} className="text-white/80 text-sm font-medium">{f}</p>
                  ))}
                </div>
              </div>
              <div className="md:col-span-1 p-5 rounded-xl border border-gold/30 bg-gold/[0.05] backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <p className="text-gold text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Check size={12} /> Unified E-Visa
                </p>
                <div className="space-y-4">
                  {[
                    ["4 calendar days", "text-gold"],
                    ["~₹4,300 ($52 USD)", "text-gold"],
                    ["16 days", "text-gold"],
                    ["Not required", "text-emerald-400"],
                    ["Online only", "text-gold"],
                    ["Tourism / Business", "text-white/60"],
                  ].map(([val, color]) => (
                    <p key={val as string} className={`${color as string} text-sm flex items-center gap-1.5`}>
                      <Check size={11} className="shrink-0" />
                      {val as string}
                    </p>
                  ))}
                </div>
              </div>
              <div className="md:col-span-1 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
                <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-4">Traditional Visa</p>
                <div className="space-y-4">
                  {[
                    "7–10 business days",
                    "~₹6,000–₹8,400",
                    "Up to 90 days",
                    "Required",
                    "Physical submission",
                    "Tourism / Business",
                  ].map((v) => (
                    <p key={v} className="text-white/30 text-sm">{v}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step by Step */}
        <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 mb-6 overflow-hidden animate-fade-in hover:shadow-[0_8px_30px_-8px_rgba(212,175,55,0.04)] transition-shadow duration-500" style={{ animationDelay: "200ms" }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
                <span className="text-gold text-sm font-bold">1</span>
              </span>
              How to Apply — Step by Step
            </h2>
            <div className="space-y-0 pl-8 relative">
              <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-gold/15" />
              {[
                {
                  step: "01",
                  icon: Monitor,
                  title: "Visit the official portal",
                  body: "Go to evisa.kdmid.ru — the only official e-visa portal. Avoid third-party sites that charge extra.",
                },
                {
                  step: "02",
                  icon: FileText,
                  title: "Fill the online form",
                  body: "Enter your personal details exactly as they appear on your passport. Choose tourism as your purpose.",
                },
                {
                  step: "03",
                  icon: Camera,
                  title: "Upload documents",
                  body: "Upload a scanned copy of your passport bio-data page (JPEG) and a recent passport-style photo (white background, 35×45 mm).",
                },
                {
                  step: "04",
                  icon: CreditCard,
                  title: "Pay the fee",
                  body: "Pay $52 USD (~₹4,300) via credit or debit card. The fee is non-refundable even if the visa is denied.",
                },
                {
                  step: "05",
                  icon: Download,
                  title: "Wait 4 calendar days",
                  body: "You'll receive the e-visa PDF by email within 4 calendar days (weekends included). Print it and carry it with your passport.",
                },
              ].map((s, i) => (
                <div key={s.step} className="relative pb-8 last:pb-0 animate-fade-in" style={{ animationDelay: `${300 + i * 80}ms` }}>
                  <div className="absolute -left-[26px] top-1.5 w-[9px] h-[9px] rounded-full bg-gold border-2 border-[#0c0a0a] z-10" />
                  <div className="group p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-gold/15 hover:bg-white/[0.04] transition-all duration-500 hover:shadow-[0_4px_20px_-6px_rgba(212,175,55,0.06)]">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-colors">
                        <s.icon size={16} className="text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] text-gold/60 font-bold tracking-widest">{s.step}</span>
                        </div>
                        <p className="text-white text-sm font-semibold">{s.title}</p>
                        <p className="text-white/40 text-xs leading-relaxed mt-1">{s.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual separator */}
        <div className="relative h-[120px] sm:h-[180px] rounded-2xl overflow-hidden mb-6 animate-fade-in" style={{ animationDelay: "350ms" }}>
          <Image
            src="/visa-separator.webp"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a0a] via-transparent to-[#0c0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-transparent to-[#0c0a0a]/50" />
        </div>

        {/* Requirements + Notes grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
          {/* Requirements */}
          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 overflow-hidden hover:shadow-[0_8px_30px_-8px_rgba(212,175,55,0.04)] transition-shadow duration-500">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="relative">
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <FileText size={16} className="text-gold" />
                Documents Required
              </h2>
              <ul className="space-y-3">
                {[
                  "Valid Indian passport (minimum 6 months validity beyond travel dates)",
                  "Digital passport-size photo (white background, 35×45 mm, JPEG)",
                  "Valid email address for receiving the e-visa PDF",
                  "Credit or debit card for the $52 USD fee payment",
                  "Travel medical insurance valid in Russia (recommended)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-emerald-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="relative rounded-2xl border border-amber-500/15 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 overflow-hidden hover:shadow-[0_8px_30px_-8px_rgba(251,191,36,0.04)] transition-shadow duration-500">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="relative">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <AlertTriangle size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Important Notes</p>
                  <p className="text-white/30 text-xs">for Indian travellers</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Apply at least 2 weeks before travel — processing is 4 days but delays can happen",
                  "E-visa is single entry — leaving Russia voids it",
                  "Registration: hotels handle this automatically within 7 days of arrival",
                  "Carry a printed copy of your e-visa + passport at all times",
                  "VISA and Mastercard issued abroad won't work in Russia — carry USD/EUR cash",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Visa Support CTA */}
        <div className="relative rounded-2xl border border-gold/15 bg-gradient-to-b from-gold/[0.03] to-white/[0.02] backdrop-blur-sm p-6 sm:p-8 overflow-hidden animate-fade-in hover:shadow-[0_8px_30px_-8px_rgba(212,175,55,0.08)] transition-shadow duration-500" style={{ animationDelay: "500ms" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Shield size={22} className="text-gold" />
              </div>
              <div>
                <p className="text-white text-base font-bold">Visa Support Included</p>
                <p className="text-white/40 text-sm mt-1 max-w-xl">
                  For the Moscow Discovery trip, we assist with the e-visa process — including guidance
                  on documents, photo requirements, and the application form. The visa fee (~₹4,300)
                  is not included in the trip price and must be paid directly on the portal.
                </p>
              </div>
            </div>
            <Link
              href="/moscow-express"
              className="shrink-0 inline-flex items-center gap-2 py-2.5 px-5 rounded-xl border border-gold text-gold text-sm font-semibold hover:bg-gold/10 hover:shadow-[0_0_20px_-6px_rgba(212,175,55,0.3)] transition-all duration-300"
            >
              View Trip <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <VisaInterestForm />

      {/* FAQs */}
      <div className="max-w-[1728px] mx-auto px-6 pb-20">
        <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 overflow-hidden animate-fade-in hover:shadow-[0_8px_30px_-8px_rgba(212,175,55,0.04)] transition-shadow duration-500" style={{ animationDelay: "600ms" }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <HelpCircle size={18} className="text-gold" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "What is a tourist visa?",
                  a: "A tourist visa is a permit to enter a country for the purpose of temporary stay and tourism."
                },
                {
                  q: "What types of tourist visas are available for Russia?",
                  a: "There are two main types: Unified electronic visa (e-visa) — applied for online at evisa.kdmid.ru, and Paper (regular) tourist visa — applied for via the Russian consulate or embassy. Visa application form available at visa.kdmid.ru."
                },
                {
                  q: "What documents are required to obtain a tourist visa to Russia?",
                  a: "You will need: a valid passport (at least 6 months after the visa expires), completed visa application form, one or two passport-size photos, medical insurance covering your trip, and payment of consular fee."
                },
                {
                  q: "How long does it take to get a tourist visa to Russia?",
                  a: "Processing time ranges from 4 to 20 business days depending on the embassy and urgency."
                },
                {
                  q: "What is the validity period of a unified e-visa to Russia?",
                  a: "The Russian e-visa allows a single entry and a stay of up to 16 days. The visa itself is valid for 60 days. Processing takes up to 4 calendar days."
                },
                {
                  q: "What is the validity of a regular tourist visa to Russia?",
                  a: "A regular tourist visa can be single-entry or double-entry for up to 3 months, or multiple-entry for up to 6 months. The total stay cannot exceed 90 days in any 180-day period."
                },
                {
                  q: "How much does a tourist visa to Russia cost?",
                  a: "As of 2025, a unified e-visa costs about $52. The government fee for a regular visa is around $16 for exiting Russia, around $16 for exit and re-entry, and around $25 for multiple entries."
                },
                {
                  q: "Can I work on a tourist visa?",
                  a: "No, a tourist visa is for tourism purposes only and does not permit work."
                },
                {
                  q: "Can I extend a tourist visa?",
                  a: "Extension is only possible in exceptional cases, such as urgent medical treatment, force majeure, or natural disasters. Otherwise, extension is not permitted."
                },
                {
                  q: "Do I need a medical examination to get a tourist visa?",
                  a: "No examination is required, but travel medical insurance covering potential treatment in Russia is mandatory."
                }
              ].map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.10] transition-colors duration-300">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-white text-sm font-medium hover:bg-white/[0.02] transition-colors [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <svg className="w-4 h-4 text-gold shrink-0 group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
