import Link from "next/link";
import { ArrowLeft, Plane, Train, Car, Map } from "lucide-react";

const sections = [
  {
    icon: Plane,
    title: "Airports & Getting to City",
    body: "Moscow has three main international airports. Budget 1–2 hours to reach the centre.",
    items: [
      "Sheremetyevo (SVO) — most common for international flights. Take Aeroexpress to Belorussky Station (35 min, ₹1,500).",
      "Domodedovo (DME) — Aeroexpress to Paveletsky Station (45 min, ₹1,500). Taxi ~₹2,500–₹3,500.",
      "Vnukovo (VKO) — Aeroexpress to Kievsky Station (35 min, ₹1,500). Closest to city centre.",
      "Yandex Go is the best taxi app — always use it, never take street cabs (they overcharge).",
      "Airport taxi counters inside arrivals are safe and fixed-price (~₹2,500–₹4,000).",
    ],
  },
  {
    icon: Train,
    title: "Trains Between Cities",
    body: "Russia's rail network is extensive. For Indian travellers, the key routes are:",
    items: [
      "Moscow → St. Petersburg — Sapsan high-speed train (4 hr, from ₹4,500). Book at rzd.ru.",
      "Moscow → Kazan — 12 hr overnight train (grand circuit) or 3.5 hr by high-speed Lastochka.",
      "Book tickets on rzd.ru or via the RZD app. E-tickets are accepted — no print needed.",
      "First-class sleeper (SV) has 2-berth compartments with linen, tea, and meals included.",
      "Platforms can be crowded — arrive 30 min early. Your guide will assist with boarding.",
    ],
  },
  {
    icon: Car,
    title: "Taxis & Ride-Hailing",
    body: "Yandex Go is the only app you need. Works like Uber — shows price upfront.",
    items: [
      "Download Yandex Go before arrival and set up payment (cash or card).",
      "Typical city ride: ₹300–₹800. Airport transfer: ₹2,500–₹4,000.",
      "Uber does not operate in Russia — Yandex Go is the local equivalent.",
      "Most drivers speak only Russian — use the app's built-in chat translator.",
      "Order a 'Comfort' class for English-speaking drivers (slightly more expensive).",
    ],
  },
  {
    icon: Map,
    title: "Metro & Public Transport",
    body: "The Moscow Metro is efficient, cheap, and beautiful. Stations are tourist attractions themselves.",
    items: [
      "Buy a Troika card (₹65 deposit) at any station kiosk — tap on/off everywhere.",
      "A single metro ride: ~₹75. Troika card also works on buses, trams, and the MCC ring.",
      "The Circle Line (brown) connects all 7 main rail stations and 6 central squares.",
      "Metro runs 5:30 AM to 1 AM. Trains every 1–2 minutes during peak hours.",
      "Free Wi-Fi is available on metro trains and at most stations.",
    ],
  },
];

export default function TransportPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <Link href="/tips" className="inline-flex items-center gap-1.5 text-gold text-sm hover:underline mb-8">
          <ArrowLeft size={14} /> Back to all tips
        </Link>

        <div className="max-w-3xl mb-10">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Transport
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Getting Around Moscow
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            Airports, trains, taxis, and metro — everything you need to move
            around Moscow and between Russian cities.
          </p>
        </div>

        <div className="space-y-5">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{s.title}</h2>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed ml-[52px] mb-4">{s.body}</p>
                <ul className="space-y-2 ml-[52px]">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/40 shrink-0 mt-2" />
                      {item}
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
