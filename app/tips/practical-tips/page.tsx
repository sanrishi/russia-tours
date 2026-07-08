import Link from "next/link";
import { ArrowLeft, CreditCard, Wifi, Train, Languages } from "lucide-react";

const tips = [
  {
    icon: CreditCard,
    title: "Payments & Cash",
    body: "VISA and Mastercard issued outside Russia don't work. Carry USD or EUR in cash and exchange at airport or bank. Get a Yoomoney Tourist Card before your trip for QR-code payments — widely accepted at restaurants, shops, and metro kiosks.",
    details: [
      "Exchange rates are better at city banks than at airport kiosks",
      "ATMs give rubles at good rates — look for ones that accept UnionPay or Mir",
      "Keep small denominations (100–500 RUB) for taxis and street food",
      "Apple Pay and Google Pay work only with Russian-issued cards",
    ],
  },
  {
    icon: Wifi,
    title: "Internet & Apps",
    body: "Instagram and Facebook are blocked in Russia. Download a reliable VPN before departure and set it up before you land. Yandex Maps and Yandex Translate work well for navigation and menus.",
    details: [
      "Buy a local SIM at the airport — Beeline, MTS, or Megafon (₹500–₹800 for 10 GB)",
      "Yandex Go is the local Uber — download it before you arrive",
      "WhatsApp and Telegram work normally without a VPN",
      "Most hotels and cafes offer free Wi-Fi",
    ],
  },
  {
    icon: Train,
    title: "Metro Tips",
    body: "The Moscow Metro is an attraction itself — palaces with chandeliers and mosaics. Trains run 5:30 AM–1 AM, every minute at peak. One ride costs around ₹65–75.",
    details: [
      "Buy a Troika card (₹65 deposit) — tap on/off at any station",
      "The circle line (brown) connects all major rail stations",
      "Station announcements are in Russian only — follow the signs or use Yandex Maps",
      "Avoid rush hour (8–10 AM, 5–7 PM) with luggage",
    ],
  },
  {
    icon: Languages,
    title: "Language",
    body: "English is limited outside hotels and tourist zones. Learn a few words: Здравствуйте (hello), Спасибо (thank you), Сколько? (how much). Yandex Translate handles menus and signs via your camera.",
    details: [
      "Most restaurants have QR-code menus with Google Translate built in",
      "Young people in Moscow often speak basic English",
      "Download Yandex Translate offline pack for Russian before you go",
      "Your guide speaks English and basic Hindi — use them for translations",
    ],
  },
];

export default function PracticalTipsPage() {
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
            Practical Tips
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Practical Tips for Indian Travellers
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            Payments, internet, metro, and language — everything you need to
            navigate Russia with confidence.
          </p>
        </div>

        <div className="space-y-5">
          {tips.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{t.title}</h2>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {t.body}
                </p>
                <ul className="space-y-2">
                  {t.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-xs text-white/50"
                    >
                      <span className="text-gold mt-0.5 shrink-0">•</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
