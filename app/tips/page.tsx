import Image from "next/image";
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
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
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

        {/* Weather & Packing */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mt-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Weather &amp; Packing — Moscow in August
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            Moscow in August is warm and pleasant by day, cooler at night — typically 23–24°C (73–75°F) during the day, dropping to 12–15°C (54–59°F) in the evening. Expect a mix of sunny stretches and occasional rain showers throughout the month.
          </p>
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <p className="text-white text-sm font-semibold mb-2">What to pack:</p>
            <ul className="space-y-1.5">
              {[
                "Light layers — t-shirts and breathable clothing for daytime",
                "A light jacket or sweater for cooler evenings and air-conditioned transport",
                "A compact umbrella or light rain jacket (August sees scattered rain)",
                "Comfortable walking shoes — you'll be on your feet for city tours, Red Square, and the limousine/rooftop evening",
                "Sunglasses and sunscreen for sunny days",
                "One smart-casual outfit for the rooftop and goodbye dinner",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-white/50">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
            <div className="relative aspect-[1/1] rounded-xl overflow-hidden border border-white/5 bg-charcoal/50 group">
              <Image src="/moscow-summer-1.webp" alt="Saint Basil's Cathedral on a sunny summer day" fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-125" sizes="(max-width: 768px) 50vw, 33vw" />
            </div>
            <div className="relative aspect-[1/1] rounded-xl overflow-hidden border border-white/5 bg-charcoal/50 group">
              <Image src="/moscow-summer-2.webp" alt="Kremlin tower and Red Square in summer" fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-125" sizes="(max-width: 768px) 50vw, 33vw" />
            </div>
          </div>
        </div>

        {/* Practical Tips for Indian Travelers */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 mt-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Practical Tips for Indian Travellers
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Payments & Cash",
                body: "VISA and Mastercard issued outside Russia don't work. Carry USD or EUR in cash and exchange at airport or bank. Get a Yoomoney Tourist Card before your trip for QR-code payments — widely accepted.",
              },
              {
                title: "Internet & Apps",
                body: "Instagram and Facebook are blocked in Russia. Download a reliable VPN before departure and set it up before you land. Yandex Maps and Yandex Translate work well for navigation and menus.",
              },
              {
                title: "Metro Tips",
                body: "The Moscow Metro is an attraction itself — palaces with chandeliers and mosaics. Trains run 5:30 AM–1 AM, every minute at peak. One ride costs around ₹65–75. Stations have English signs.",
              },
              {
                title: "Language",
                body: "English is limited outside hotels and tourist zones. Learn a few words: Здравствуйте (hello), Спасибо (thank you), Сколько? (how much). Yandex Translate handles menus and signs via your camera.",
              },
            ].map((tip) => (
              <div
                key={tip.title}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
              >
                <h3 className="text-white font-semibold text-sm mb-1.5">
                  {tip.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {tip.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
