import { Shield, Check, ExternalLink, AlertTriangle, CreditCard, FileText, Globe, Clock, ArrowRight, Scan, Plane } from "lucide-react";
import Link from "next/link";

export default function VisaPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a0a] via-[#0c0a0a] to-gold/5" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, #d4af37 0.5px, transparent 0.5px)`, backgroundSize: "40px 40px" }} />
        <div className="relative max-w-[1728px] mx-auto px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-[0.15em] uppercase mb-4">
              <Scan size={14} /> Visa Information
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5">
              Russia E-Visa for<br />Indian Citizens
            </h1>
            <p className="text-gold/70 text-base sm:text-lg leading-relaxed max-w-2xl">
              India is eligible for Russia&apos;s unified e-visa — a single-entry electronic visa
              valid for 60 days with a maximum stay of 16 days, processed entirely online in just 4 calendar days.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1728px] mx-auto px-6 pb-20 -mt-6 relative z-10">
        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Clock, label: "Processing Time", value: "4 Days", sub: "Calendar days" },
            { icon: CreditCard, label: "Cost", value: "~₹4,300", sub: "$52 USD" },
            { icon: Globe, label: "Max Stay", value: "16 Days", sub: "Single entry" },
            { icon: FileText, label: "Invitation", value: "Not Required", sub: "No visa support needed" },
          ].map((s) => (
            <div key={s.label} className="group relative p-5 rounded-xl border border-white/10 bg-[#161412] hover:border-gold/20 transition-all duration-300">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
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
        <div className="relative rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-8 mb-6 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plane size={18} className="text-gold" />
              E-Visa vs Traditional Tourist Visa
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1 p-5 rounded-xl border border-gold/20 bg-gold/[0.03]">
                <p className="text-gold text-xs font-bold uppercase tracking-wider mb-4">Feature</p>
                <div className="space-y-4">
                  {["Processing Time", "Cost", "Max Stay", "Invitation Letter", "Passport Submission", "Visit Purpose"].map((f) => (
                    <p key={f} className="text-white/80 text-sm font-medium">{f}</p>
                  ))}
                </div>
              </div>
              <div className="md:col-span-1 p-5 rounded-xl border border-gold/30 bg-gold/[0.05]">
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
              <div className="md:col-span-1 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
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
        <div className="relative rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-8 mb-6 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
                <span className="text-gold text-sm font-bold">1</span>
              </span>
              How to Apply — Step by Step
            </h2>
            <div className="space-y-0 pl-8 relative">
              <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-gold/20" />
              {[
                {
                  step: "01",
                  title: "Visit the official portal",
                  body: "Go to evisa.kdmid.ru — the only official e-visa portal. Avoid third-party sites that charge extra.",
                },
                {
                  step: "02",
                  title: "Fill the online form",
                  body: "Enter your personal details exactly as they appear on your passport. Choose tourism as your purpose.",
                },
                {
                  step: "03",
                  title: "Upload documents",
                  body: "Upload a scanned copy of your passport bio-data page (JPEG) and a recent passport-style photo (white background, 35×45 mm).",
                },
                {
                  step: "04",
                  title: "Pay the fee",
                  body: "Pay $52 USD (~₹4,300) via credit or debit card. The fee is non-refundable even if the visa is denied.",
                },
                {
                  step: "05",
                  title: "Wait 4 calendar days",
                  body: "You'll receive the e-visa PDF by email within 4 calendar days (weekends included). Print it and carry it with your passport.",
                },
              ].map((s, i) => (
                <div key={s.step} className="relative pb-8 last:pb-0">
                  <div className="absolute -left-[26px] top-1.5 w-[9px] h-[9px] rounded-full bg-gold border-2 border-[#161412] z-10" />
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-gold/10 transition-colors">
                    <span className="text-[10px] text-gold font-bold tracking-widest">{s.step}</span>
                    <p className="text-white text-sm font-semibold mt-1">{s.title}</p>
                    <p className="text-white/40 text-xs leading-relaxed mt-1">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requirements + Notes grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Requirements */}
          <div className="relative rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-8 overflow-hidden">
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
          <div className="relative rounded-2xl border border-amber-500/15 bg-[#161412] p-6 sm:p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="relative">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
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
        <div className="relative rounded-2xl border border-gold/15 bg-gradient-to-b from-gold/[0.03] to-[#161412] p-6 sm:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_60%)]" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
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
              className="shrink-0 inline-flex items-center gap-2 py-2.5 px-5 rounded-xl border border-gold text-gold text-sm font-semibold hover:bg-gold/10 transition-all"
            >
              View Trip <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-[1728px] mx-auto px-6 pb-20">
        <div className="relative rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
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
                <details key={faq.q} className="group rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-white text-sm font-medium hover:bg-white/[0.02] transition-colors [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <svg className="w-4 h-4 text-gold shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
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
