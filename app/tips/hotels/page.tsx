import Link from "next/link";
import { ArrowLeft, Building, MapPin, Star, Wifi, Coffee } from "lucide-react";

const hotels = [
  {
    area: "Tverskaya / City Centre",
    vibe: "Best for first-timers — walking distance to Red Square, Kremlin, and major sights.",
    icon: Star,
    options: [
      { name: "Hotel Baltschug Kempinski", price: "Luxury (₹25,000+/night)", note: "Kremlin view rooms" },
      { name: "Moscow Marriott Grand", price: "Upper (₹12,000–₹18,000/night)", note: "Indian breakfast available" },
      { name: "Ibis Moscow Centre", price: "Mid (₹6,000–₹9,000/night)", note: "Clean, reliable, metro nearby" },
    ],
  },
  {
    area: "Arbat District",
    vibe: "Artsy, pedestrian-friendly streets with street musicians, galleries, and cafés.",
    icon: Building,
    options: [
      { name: "Arbat House Hotel", price: "Mid (₹5,000–₹8,000/night)", note: "Charming historic building" },
      { name: "AZIMUT Hotel Smolenskaya", price: "Upper (₹10,000–₹15,000/night)", note: "Near US Embassy, very safe area" },
    ],
  },
  {
    area: "Zamoskvorechye",
    vibe: "Quiet, historic district south of the river — great for a relaxed stay.",
    icon: MapPin,
    options: [
      { name: "Mercure Moscow Paveletskaya", price: "Mid (₹7,000–₹11,000/night)", note: "Modern, great breakfast" },
      { name: "Novotel Moscow City", price: "Upper (₹10,000–₹14,000/night)", note: "Near Moscow City business district" },
    ],
  },
];

export default function HotelsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <Link href="/tips" className="inline-flex items-center gap-1.5 text-gold text-sm hover:underline mb-8">
          <ArrowLeft size={14} /> Back to all tips
        </Link>

        <div className="max-w-3xl mb-10">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Hotels
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Where to Stay in Moscow
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            Recommended hotels by area, budget, and Indian-friendliness. Breakfast
            included is common — request Indian vegetarian options in advance.
          </p>
        </div>

        <div className="space-y-6">
          {hotels.map((h) => {
            const Icon = h.icon;
            return (
              <div key={h.area} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{h.area}</h2>
                    <p className="text-white/50 text-sm mt-1">{h.vibe}</p>
                  </div>
                </div>
                <div className="space-y-3 ml-[52px]">
                  {h.options.map((o) => (
                    <div key={o.name} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="text-white font-semibold text-sm">{o.name}</p>
                        <span className="text-[10px] uppercase tracking-wider text-gold font-medium whitespace-nowrap">{o.price}</span>
                      </div>
                      <p className="text-white/40 text-xs mt-1">{o.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <Wifi size={16} className="text-gold mb-2" />
            <p className="text-white text-sm font-semibold">Booking Tip</p>
            <p className="text-white/40 text-xs mt-1">Use Ostrovok.ru or Yandex Travel for bookings — many hotels don't appear on Booking.com or Agoda for Russian properties.</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <Coffee size={16} className="text-gold mb-2" />
            <p className="text-white text-sm font-semibold">Indian-Friendly</p>
            <p className="text-white/40 text-xs mt-1">Request rooms with kitchenette for Indian meal prep. Hotels near Indian Embassy area (Tverskoy) are most accustomed to Indian guests.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
