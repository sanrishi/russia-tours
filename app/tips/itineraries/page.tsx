import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Camera, Coffee, Music, Landmark } from "lucide-react";

const plans = [
  {
    days: "One Day in Moscow",
    icon: Clock,
    desc: "Perfect for a layover or quick stopover. Hit the absolute essentials.",
    items: [
      "09:00 – Red Square & St. Basil's Cathedral — the iconic heart of Moscow",
      "11:00 – Inside the Kremlin — visit the Armoury Chamber and cathedrals",
      "13:00 – Lunch at a Russian canteen near the Kremlin (try pelmeni & borscht)",
      "14:30 – Walk along Nikolskaya Street to Lubyanka Square",
      "16:00 – Climb Sparrow Hills for the panoramic city view",
      "18:00 – Evening Moscow River cruise (1 hour, stunning skyline views)",
      "20:00 – Dinner at a Georgian restaurant (Khinkali, khachapuri)",
    ],
  },
  {
    days: "Three Days in Moscow",
    icon: Camera,
    desc: "A solid weekend trip covering history, culture, and modern Moscow.",
    items: [
      "Day 1 — Red Square, Kremlin, GUM department store, Zaryadye Park floating bridge, evening at Tverskaya Street",
      "Day 2 — Novodevichy Convent, Sparrow Hills, Moscow Metro tour (Mayakovskaya, Komsomolskaya, Novoslobodskaya), Arbat Street for souvenirs",
      "Day 3 — VDNH exhibition park, Cosmonautics Museum, Moskino Cinema Park or Gorky Park, goodbye dinner at a rooftop restaurant",
    ],
  },
  {
    days: "Seven Days in Moscow",
    icon: Landmark,
    desc: "The full experience — including day trips and hidden gems beyond the centre.",
    items: [
      "Day 1 — Red Square, Kremlin, St. Basil's, GUM, Zaryadye Park",
      "Day 2 — Kolomenskoye Estate, Moscow River cable car, evening at Patriarch Ponds",
      "Day 3 — Tretyakov Gallery, Gorky Park, Muzeon Art Park, Krymsky Bridge",
      "Day 4 — Day trip to Sergiev Posad (Golden Ring town, 1.5 hr by train)",
      "Day 5 — VDNH, Cosmonautics Museum, Ostankino Tower observation deck",
      "Day 6 — Moscow Metro art tour, Izmailovo Kremlin (market & museums), evening at a traditional banya",
      "Day 7 — Last shopping at TSUM or GUM, brunch at a trendy café, departure",
    ],
  },
];

export default function ItinerariesPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <Link href="/tips" className="inline-flex items-center gap-1.5 text-gold text-sm hover:underline mb-8">
          <ArrowLeft size={14} /> Back to all tips
        </Link>

        <div className="max-w-3xl mb-10">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Itineraries
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Moscow Itineraries — 1, 3 & 7 Days
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            Whether you have a layover or a full week, here are hand-crafted plans
            covering Moscow's must-see sights, hidden gems, and local experiences.
          </p>
        </div>

        <div className="space-y-6">
          {plans.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.days} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{p.days}</h2>
                </div>
                <p className="text-white/50 text-sm mb-4 ml-[52px]">{p.desc}</p>
                <ul className="space-y-2 ml-[52px]">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-500/15 bg-[#161412] p-6">
          <p className="text-amber-400 text-sm font-bold mb-2">Pro Tip</p>
          <p className="text-white/50 text-sm leading-relaxed">
            Our Moscow Discovery tour covers all major highlights in 7 days with
            a dedicated Indian guide, Indian meals, and group transfers.{" "}
            <Link href="/moscow-express" className="text-gold hover:underline">
              Check the trip →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
