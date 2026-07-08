import Link from "next/link";
import { ArrowLeft, MapPin, ExternalLink, Star } from "lucide-react";

const restaurants = [
  {
    name: "Tkhali I Karri",
    address: "Tverskaya St., 17",
    distance: "10–15 min walk from Red Square",
    description:
      "Authentic Indian cuisine with chefs from India. Features a tropical interior with many plants.",
    website: null,
    rating: 4.5,
  },
  {
    name: "Jagannath",
    address: "Kuznetsky Most St., 11",
    distance: "~10 min walk from Red Square",
    description:
      "Popular vegetarian café with a wide variety of Indian dishes.",
    website: null,
    rating: 4.3,
  },
  {
    name: "Curry",
    address: "Arbat St., 32 (1st floor)",
    distance: "On Arbat Street",
    description:
      "Authentic Indian cuisine prepared with traditional spices and high-quality ingredients.",
    website: null,
    rating: 4.4,
  },
  {
    name: "Moscow Delhi",
    address: "Yermolayevsky Lane, 7",
    distance: "Patriarch Ponds area",
    description:
      "Authentic Indian restaurant known for traditional dishes and warm atmosphere.",
    website: null,
    rating: 4.2,
  },
  {
    name: "Dhaba",
    address: "Novolesnaya St., 2",
    distance: "A bit further from the centre",
    description:
      "Wide selection of halal, fish, and vegetarian dishes with authentic spices.",
    website: "https://dhaba.ru",
    rating: 4.6,
  },
];

export default function IndianFoodPage() {
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
            Indian Food Guide
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Indian &amp; Halal Food in Moscow
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            Missing home food? Moscow has a surprising number of authentic
            Indian restaurants, many within walking distance of Red Square.
            Here&apos;s where to eat.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Restaurants Near Red Square
          </h2>
          <div className="space-y-4">
            {restaurants.map((r, i) => (
              <div
                key={r.name}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-gold/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gold text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-white font-semibold text-sm">
                        {r.name}
                      </h3>
                    </div>
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
                  <div className="flex items-center gap-1 shrink-0">
                    <Star size={11} className="text-gold fill-gold" />
                    <span className="text-white text-xs font-medium">
                      {r.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Practical Tips
          </h2>
          <ul className="space-y-3">
            {[
              "Most Indian restaurants in Moscow accept cash (rubles) — carry some.",
              "Halal-friendly options are available — Dhaba and Tkhali I Karri are good choices.",
              "Reservations recommended for dinner, especially on weekends.",
              "Portions are generally generous — one main course can serve two.",
              "Indian restaurants in the city centre are used to tourists — English menus available.",
            ].map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-sm text-white/60"
              >
                <span className="text-gold mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
