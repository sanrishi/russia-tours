
import { Building, MapPin, Star, Wifi, Coffee } from "lucide-react";
import TipsArticleShell, { Section, Card } from "@/components/TipsArticleShell";

const hotels = [
  { area: "Tverskaya / City Centre", vibe: "Best for first-timers — walking distance to Red Square, Kremlin, and major sights.", icon: Star, img: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Moscow%2C_Tverskaya_Street%2C_Night_Moscow%2C_Moscow_City_Day%2C_Russia.jpg", alt: "Tverskaya Street at night", options: [{ name: "Hotel Baltschug Kempinski", price: "Luxury (₹25,000+/night)", note: "Kremlin view rooms" }, { name: "Moscow Marriott Grand", price: "Upper (₹12,000–₹18,000/night)", note: "Indian breakfast available" }, { name: "Ibis Moscow Centre", price: "Mid (₹6,000–₹9,000/night)", note: "Clean, reliable, metro nearby" }] },
  { area: "Arbat District", vibe: "Artsy, pedestrian-friendly streets with street musicians, galleries, and cafés.", icon: Building, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/New_Arbat_Avenue1.jpg/1280px-New_Arbat_Avenue1.jpg", alt: "New Arbat Avenue", options: [{ name: "Arbat House Hotel", price: "Mid (₹5,000–₹8,000/night)", note: "Charming historic building" }, { name: "AZIMUT Hotel Smolenskaya", price: "Upper (₹10,000–₹15,000/night)", note: "Near US Embassy, very safe area" }] },
  { area: "Zamoskvorechye", vibe: "Quiet, historic district south of the river — great for a relaxed stay.", icon: MapPin, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Moscow%2C_Bolshoy_Ustyinsky_bridge%2C_view_of_Zamoskvorechye_%282%29.jpg/1280px-Moscow%2C_Bolshoy_Ustyinsky_bridge%2C_view_of_Zamoskvorechye_%282%29.jpg", alt: "View of Zamoskvorechye from Bolshoy Ustyinsky bridge", options: [{ name: "Mercure Moscow Paveletskaya", price: "Mid (₹7,000–₹11,000/night)", note: "Modern, great breakfast" }, { name: "Novotel Moscow City", price: "Upper (₹10,000–₹14,000/night)", note: "Near Moscow City business district" }] },
];

export default function HotelsPage() {
  return (
    <TipsArticleShell label="Hotels" title="Where to Stay in Moscow" description="Recommended hotels by area, budget, and Indian-friendliness. Breakfast included is common — request Indian vegetarian options in advance.">
      <Section>
        <div className="space-y-5 sm:space-y-6">
          {hotels.map((h) => {
            const Icon = h.icon;
            return (
              <Card key={h.area} className="!p-0 overflow-hidden">
                <div className="relative aspect-[21/9] sm:aspect-[3/1] overflow-hidden">
                  <img src={h.img} alt={h.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 sm:left-7 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/15 backdrop-blur-sm flex items-center justify-center"><Icon size={18} className="text-gold" /></div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{h.area}</h2>
                      <p className="text-white/60 text-xs sm:text-sm drop-shadow-sm">{h.vibe}</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-7 space-y-3">
                  {h.options.map((o) => (
                    <div key={o.name} className="p-4 sm:p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="text-white font-semibold text-sm sm:text-base">{o.name}</p>
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gold font-medium whitespace-nowrap">{o.price}</span>
                      </div>
                      <p className="text-white/40 text-xs sm:text-sm mt-1">{o.note}</p>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <Card>
            <Wifi size={16} className="text-gold mb-2" />
            <p className="text-white text-sm font-semibold">Booking Tip</p>
            <p className="text-white/40 text-xs mt-1">Use Ostrovok.ru or Yandex Travel for bookings — many hotels don't appear on Booking.com or Agoda for Russian properties.</p>
          </Card>
          <Card>
            <Coffee size={16} className="text-gold mb-2" />
            <p className="text-white text-sm font-semibold">Indian-Friendly</p>
            <p className="text-white/40 text-xs mt-1">Request rooms with kitchenette for Indian meal prep. Hotels near Indian Embassy area (Tverskoy) are most accustomed to Indian guests.</p>
          </Card>
        </div>
      </Section>
    </TipsArticleShell>
  );
}
