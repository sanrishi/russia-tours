
import { FileText, Globe, Clock, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import TipsArticleShell, { Section, Card } from "@/components/TipsArticleShell";

export default function VisaGuidePage() {
  return (
    <TipsArticleShell label="Visa Guide" title="Russian Visa for Indian Citizens" description="Indian passport holders can get an e-visa in 4 days. Here's exactly how the application works, what documents you need, and common pitfalls to avoid.">
      <Section>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { icon: Clock, label: "Processing Time", value: "Up to 4 days" },
            { icon: CreditCard, label: "Visa Fee", value: "$52 USD" },
            { icon: Globe, label: "Validity", value: "Up to 16 days" },
          ].map((s) => (
            <Card key={s.label} className="!p-4 sm:!p-5 !text-center !items-center">
              <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2"><s.icon size={16} className="text-gold" /></div>
              <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-gold text-lg font-bold">{s.value}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Card className="!p-6 sm:!p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0"><FileText size={18} className="text-gold" /></div>
            <h2 className="text-xl font-bold text-white">Step-by-Step Application</h2>
          </div>
          <div className="space-y-4 ml-[52px]">
            {[
              { step: "Step 1", label: "Go to evisa.kdmid.ru", desc: "This is the official Russian e-visa portal. Bookmark it — other sites charge extra fees." },
              { step: "Step 2", label: "Fill the online form", desc: "You'll need your passport details, travel dates, accommodation address, and a digital passport photo." },
              { step: "Step 3", label: "Upload documents", desc: "Passport scan (valid 6+ months), digital photo (35×45 mm, white background), and medical insurance policy." },
              { step: "Step 4", label: "Pay the fee", desc: "$52 USD paid online via card. Keep the receipt — you'll need it for reference." },
              { step: "Step 5", label: "Receive and print", desc: "The e-visa arrives as a PDF by email in up to 4 days. Print 2 copies — keep one with you at all times in Russia." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <span className="text-gold text-xs font-bold tabular-nums shrink-0 mt-0.5">{s.step}</span>
                <div>
                  <p className="text-white text-sm font-semibold mb-0.5">{s.label}</p>
                  <p className="text-white/50 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section>
        <Card className="!p-6 sm:!p-8 mt-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0"><CheckCircle size={18} className="text-green-400" /></div>
            <h2 className="text-xl font-bold text-white">Do's</h2>
          </div>
          <ul className="space-y-2 ml-[52px]">
            {["Apply at least 2 weeks before travel (even though processing is 4 days)", "Use a passport with at least 2 blank pages and 6 months of validity remaining", "Keep a printed copy of your e-visa with you at all times in Russia", "Register your visa with your hotel within 24 hours of arrival (they do this automatically)", "Carry your medical insurance policy document — you may be asked at immigration"].map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-white/60"><span className="text-green-400 mt-0.5">✓</span>{d}</li>
            ))}
          </ul>
        </Card>

        <Card className="!p-6 sm:!p-8 mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0"><AlertCircle size={18} className="text-red-400" /></div>
            <h2 className="text-xl font-bold text-white">Don'ts</h2>
          </div>
          <ul className="space-y-2 ml-[52px]">
            {["Don't use third-party visa agencies — the official portal is straightforward", "Don't apply with less than 7 days before travel — processing delays can happen", "Don't overstay the 16-day limit — fines and future visa bans apply", "Don't forget to check your e-visa details on arrival — name/DOB errors can cause problems", "Don't rely on your hotel for visa registration — confirm they've done it within 24 hours"].map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-white/60"><span className="text-red-400 mt-0.5">✗</span>{d}</li>
            ))}
          </ul>
        </Card>
      </Section>
    </TipsArticleShell>
  );
}
