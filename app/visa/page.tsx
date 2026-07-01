import { Shield, Check, ExternalLink, AlertTriangle, CreditCard, FileText, Globe, Clock } from "lucide-react";

export default function VisaPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-3xl mb-14">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Visa Information
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Russia E-Visa for Indian Citizens
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            India is eligible for Russia&apos;s unified e-visa — a single-entry electronic visa
            valid for 30 days, processed entirely online in just 4 calendar days.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Clock, label: "Processing Time", value: "4 Days" },
            { icon: CreditCard, label: "Cost", value: "~₹4,300" },
            { icon: Globe, label: "Max Stay", value: "30 Days" },
            { icon: FileText, label: "Invitation", value: "Not Required" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
              <s.icon size={20} className="text-gold mx-auto mb-2" />
              <p className="text-white text-lg font-bold">{s.value}</p>
              <p className="text-white/40 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* E-Visa vs Traditional */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">E-Visa vs Traditional Tourist Visa</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 font-medium py-3 pr-4">Feature</th>
                  <th className="text-left text-gold font-medium py-3 px-4">Unified E-Visa</th>
                  <th className="text-left text-white/40 font-medium py-3 pl-4">Traditional Visa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["Processing Time", "4 calendar days", "7–10 business days"],
                  ["Cost", "~₹4,300 ($52 USD)", "~₹6,000–₹8,400"],
                  ["Max Stay", "30 days", "Up to 90 days"],
                  ["Invitation Letter", "Not required", "Required"],
                  ["Passport Submission", "Online only", "Physical submission"],
                  ["Visit Purpose", "Tourism / Business", "Tourism / Business"],
                ].map(([feature, evisa, traditional]) => (
                  <tr key={feature}>
                    <td className="text-white font-medium py-3 pr-4">{feature}</td>
                    <td className="text-white/60 py-3 px-4">
                      <span className="flex items-center gap-1.5">
                        <Check size={12} className="text-emerald-400 shrink-0" />
                        {evisa}
                      </span>
                    </td>
                    <td className="text-white/40 py-3 pl-4">{traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Step by Step */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">How to Apply — Step by Step</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Visit the official portal",
                body: "Go to evisa.kdmid.ru — the only official e-visa portal. Avoid third-party sites that charge extra.",
              },
              {
                step: "2",
                title: "Fill the online form",
                body: "Enter your personal details exactly as they appear on your passport. Choose tourism as your purpose.",
              },
              {
                step: "3",
                title: "Upload documents",
                body: "Upload a scanned copy of your passport bio-data page (JPEG) and a recent passport-style photo (white background, 35×45 mm).",
              },
              {
                step: "4",
                title: "Pay the fee",
                body: "Pay $52 USD (~₹4,300) via credit or debit card. The fee is non-refundable even if the visa is denied.",
              },
              {
                step: "5",
                title: "Wait 4 calendar days",
                body: "You'll receive the e-visa PDF by email within 4 calendar days (weekends included). Print it and carry it with your passport.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <span className="shrink-0 w-8 h-8 rounded-full bg-gold text-charcoal text-sm font-bold flex items-center justify-center">
                  {s.step}
                </span>
                <div>
                  <p className="text-white text-sm font-semibold">{s.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed mt-0.5">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Documents Required</h2>
          <ul className="space-y-2">
            {[
              "Valid Indian passport (minimum 6 months validity beyond travel dates)",
              "Digital passport-size photo (white background, 35×45 mm, JPEG)",
              "Valid email address for receiving the e-visa PDF",
              "Credit or debit card for the $52 USD fee payment",
              "Travel medical insurance valid in Russia (recommended, may be requested at border)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-white/50">
                <Check size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Important Notes */}
        <div className="rounded-2xl border border-amber-500/10 bg-amber-500/[0.02] p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-semibold mb-2">Important Notes for Indian Travellers</p>
              <ul className="space-y-1.5">
                {[
                  "Apply at least 2 weeks before travel — processing is 4 days but delays can happen",
                  "E-visa is single entry — leaving Russia voids it",
                  "Registration: hotels handle this automatically within 7 days of arrival",
                  "Carry a printed copy of your e-visa + passport at all times",
                  "VISA and Mastercard issued abroad won't work in Russia — carry USD/EUR cash or get a Yoomoney Tourist Card",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-white/50">
                    <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Visa Support */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-semibold mb-1">Visa Support Included</p>
              <p className="text-white/50 text-xs leading-relaxed">
                For the Moscow Discovery trip, we assist with the e-visa process —
                including guidance on documents, photo requirements, and the application form.
                The visa fee (~₹4,300) is not included in the trip price and must be paid directly on the portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
