import SafetyCallout from "@/components/SafetyCallout";
import { MapPin, UtensilsCrossed, ExternalLink } from "lucide-react";

const restaurants = [
  {
    name: "Tkhali I Karri",
    address: "Tverskaya St., 17",
    distance: "10–15 min walk from Red Square",
    description:
      "Authentic Indian cuisine with chefs from India. Features a tropical interior with many plants.",
    website: null,
  },
  {
    name: "Jagannath",
    address: "Kuznetsky Most St., 11",
    distance: "~10 min walk from Red Square",
    description:
      "Popular vegetarian café with a wide variety of Indian dishes.",
    website: null,
  },
  {
    name: "Curry",
    address: "Arbat St., 32 (1st floor)",
    distance: "On Arbat Street",
    description:
      "Authentic Indian cuisine prepared with traditional spices and high-quality ingredients.",
    website: null,
  },
  {
    name: "Moscow Delhi",
    address: "Yermolayevsky Lane, 7",
    distance: "Patriarch Ponds area",
    description:
      "Authentic Indian restaurant known for traditional dishes and warm atmosphere.",
    website: null,
  },
  {
    name: "Dhaba",
    address: "Novolesnaya St., 2",
    distance: "A bit further from the centre",
    description:
      "Wide selection of halal, fish, and vegetarian dishes with authentic spices.",
    website: "https://dhaba.ru",
  },
];

export default function TipsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-3xl mb-14">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Useful Tips
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Travel Tips for Indian Visitors
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            Weather, packing, food, safety — everything you need to know before
            visiting Russia.
          </p>
        </div>

        {/* Indian Food Guide — verified with client */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <UtensilsCrossed size={20} className="text-gold" />
            <h2 className="text-xl font-bold text-white">
              Indian Food Near Red Square
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {restaurants.map((r) => (
              <div
                key={r.name}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-gold/10 transition-colors"
              >
                <h3 className="text-white font-semibold text-sm mb-1">
                  {r.name}
                </h3>
                <p className="flex items-start gap-1.5 text-xs text-white/50 mb-1">
                  <MapPin size={11} className="text-gold shrink-0 mt-0.5" />
                  {r.address}
                </p>
                <p className="text-xs text-white/40 mb-2">{r.distance}</p>
                <p className="text-xs text-white/50 leading-relaxed">
                  {r.description}
                </p>
                {r.website && (
                  <a
                    href={r.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gold text-xs hover:underline mt-2"
                  >
                    <ExternalLink size={10} />
                    View website
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <SafetyCallout />

        {/* PLACEHOLDER — packing & weather tips: add seasonal guidance */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mt-6">
          <h2 className="text-xl font-bold text-white mb-3">
            Weather &amp; Packing
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Seasonal packing tips and weather guidance for Moscow &amp; St.
            Petersburg will appear here once confirmed.
          </p>
        </div>
      </div>
    </main>
  );
}
