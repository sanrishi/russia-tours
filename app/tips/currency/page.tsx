import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  AlertTriangle,
} from "lucide-react";

export default function CurrencyPage() {
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
            Currency Guide
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Currency &amp; Payments in Russia
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            VISA and Mastercard issued outside Russia don&apos;t work. Here&apos;s
            exactly how to handle money during your trip.
          </p>
        </div>

        <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="text-red-400 shrink-0 mt-0.5"
            />
            <div>
              <p className="text-white text-sm font-semibold mb-1">
                Important
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                VISA, Mastercard, RuPay, and Amex cards issued outside Russia
                are blocked. Apple Pay and Google Pay only work with Russian
                cards. Cash and the Yoomoney card are your main options.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Banknote size={18} className="text-gold" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Cash — Your Main Option
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                "Carry USD or EUR in cash — exchange at the airport or city banks",
                "City banks offer better exchange rates than airport kiosks",
                "ATMs dispense rubles — look for ones that accept UnionPay or Mir",
                "Keep small bills (100–500 RUB) for taxis, street food, and tips",
                "You can exchange up to $10,000 USD without declaring at customs",
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

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Smartphone size={18} className="text-gold" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Yoomoney Tourist Card
              </h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Get a Yoomoney card before your trip. It&apos;s a Russian digital
              wallet that lets you load money online and pay via QR code at
              millions of locations — restaurants, shops, metro, and museums.
            </p>
            <ul className="space-y-3">
              {[
                "Apply online before departure — takes 5 minutes",
                "Load money from your Indian card (USD/EUR/INR accepted)",
                "Pay by QR code at any store or restaurant — no card needed",
                "Works everywhere in Moscow and St. Petersburg",
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

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <CreditCard size={18} className="text-gold" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Quick Tips
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                "1 RUB ≈ ₹0.95 (check current rate before your trip)",
                "Tipping: 10% is appreciated at restaurants, not expected at cafes",
                "Most hotels accept cash only for incidentals — keep rubles handy",
                "Souvenir markets prefer cash — small denominations are best",
                "Don't rely on your Indian bank card — carry a backup plan",
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
      </div>
    </main>
  );
}
