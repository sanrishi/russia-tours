
import { MapPin, ExternalLink, Star } from "lucide-react";
import TipsArticleShell, { Section, Card } from "@/components/TipsArticleShell";

const restaurants = [
  { name: "Tkhali I Karri", address: "Tverskaya St., 17", distance: "10–15 min walk from Red Square", description: "Authentic Indian cuisine with chefs from India. Features a tropical interior with many plants.", maps: "https://maps.google.com/?q=Tkhali+I+Karri+Moscow", website: null, rating: 4.5, img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop&auto=format" },
  { name: "Jagannath", address: "Kuznetsky Most St., 11", distance: "~10 min walk from Red Square", description: "Popular vegetarian café with a wide variety of Indian dishes.", maps: "https://maps.google.com/?q=Jagannath+Moscow", website: null, rating: 4.3, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format" },
  { name: "Curry", address: "Arbat St., 32 (1st floor)", distance: "On Arbat Street", description: "Authentic Indian cuisine prepared with traditional spices and high-quality ingredients.", maps: "https://maps.google.com/?q=Curry+Arbat+Moscow", website: null, rating: 4.4, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop&auto=format" },
  { name: "Moscow Delhi", address: "Yermolayevsky Lane, 7", distance: "Patriarch Ponds area", description: "Authentic Indian restaurant known for traditional dishes and warm atmosphere.", maps: "https://maps.google.com/?q=Moscow+Delhi+restaurant", website: null, rating: 4.2, img: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&h=400&fit=crop&auto=format" },
  { name: "Dhaba", address: "Novolesnaya St., 2", distance: "A bit further from the centre", description: "Wide selection of halal, fish, and vegetarian dishes with authentic spices.", maps: null, website: "https://dhaba.ru", rating: 4.6, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&auto=format" },
];

export default function IndianFoodPage() {
  return (
    <TipsArticleShell label="Indian Food Guide" title="Indian & Halal Food in Moscow" description="Missing home food? Moscow has a surprising number of authentic Indian restaurants, many within walking distance of Red Square. Here's where to eat.">
      <Section>
        <Card className="!p-6 sm:!p-10 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Restaurants Near Red Square</h2>
          <div className="space-y-5 sm:space-y-6">
            {restaurants.map((r, i) => (
              <div key={r.name} className="p-5 sm:p-7 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-gold/20 transition-colors duration-300">
                <div className="flex items-start gap-5 sm:gap-6">
                  <div className="relative w-28 sm:w-36 md:w-44 aspect-[3/2] rounded-lg overflow-hidden shrink-0 hidden sm:block">
                    <img src={r.img} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-gold text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                          <h3 className="text-white font-semibold text-base sm:text-lg">{r.name}</h3>
                        </div>
                        <p className="flex items-start gap-1.5 text-sm sm:text-base text-white/50 mb-1">
                          <MapPin size={13} className="text-gold shrink-0 mt-0.5" />{r.address}
                        </p>
                        <p className="text-sm sm:text-base text-white/40 mb-2">{r.distance}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Star size={14} className="text-gold fill-gold" />
                        <span className="text-white text-sm sm:text-base font-medium">{r.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-white/50 leading-relaxed">{r.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      {r.maps && (
                        <a href={r.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gold/70 hover:text-gold text-sm sm:text-base transition-colors">
                          <MapPin size={13} />View on Maps
                        </a>
                      )}
                      {r.website && (
                        <a href={r.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gold text-sm sm:text-base hover:underline">
                          <ExternalLink size={13} />View website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section>
        <Card className="!p-6 sm:!p-8">
          <h2 className="text-xl font-bold text-white mb-4">Practical Tips</h2>
          <ul className="space-y-3">
            {["Most Indian restaurants in Moscow accept cash (rubles) — carry some.", "Halal-friendly options are available — Dhaba and Tkhali I Karri are good choices.", "Reservations recommended for dinner, especially on weekends.", "Portions are generally generous — one main course can serve two.", "Indian restaurants in the city centre are used to tourists — English menus available."].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-white/60"><span className="text-gold mt-0.5">•</span>{tip}</li>
            ))}
          </ul>
        </Card>
      </Section>
    </TipsArticleShell>
  );
}
