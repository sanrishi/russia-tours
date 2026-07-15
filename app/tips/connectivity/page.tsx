
import { Wifi, Smartphone, Globe, Map, MessageCircle } from "lucide-react";
import TipsArticleShell, { Section, Card } from "@/components/TipsArticleShell";

const sections = [
  { icon: Smartphone, title: "SIM Cards & Mobile Data", body: "Indian SIMs won't work for data roaming at affordable rates. Buy a local SIM at the airport.", items: ["Buy at any airport upon arrival — Beeline, MTS, or Megafon kiosks in arrivals hall.", "Price: ₹500–₹800 for 10 GB data + local calls. Valid for 30 days.", "You'll need your passport for registration — the kiosk handles it on the spot.", "eSIM options: Try Airalo or Holafly for a Russia eSIM before departure (slightly more expensive).", "Speed: 4G/LTE across all Moscow metro and most suburban areas."] },
  { icon: Globe, title: "VPN (Essential)", body: "Instagram, Facebook, X (Twitter), and many Western news sites are blocked in Russia.", items: ["Install a VPN on your phone and laptop BEFORE departure — not after you arrive.", "Recommended: NordVPN, ExpressVPN, or ProtonVPN (free tier works).", "Set up and test the VPN in India — you won't be able to download the app after landing.", "WhatsApp, Telegram, and YouTube work normally without a VPN.", "Yandex services (Maps, Go, Translate, Music) work without restrictions."] },
  { icon: Wifi, title: "Free Wi-Fi Hotspots", body: "Moscow has excellent free Wi-Fi coverage across the city.", items: ["Moscow Metro: Free Wi-Fi on all trains and at most stations. Connect to 'MT_FREE' network.", "Hotels: Almost all hotels offer free Wi-Fi — speeds are generally good (20–50 Mbps).", "Cafés & restaurants: Starbucks, Shokoladnitsa, and local chains offer free Wi-Fi.", "Public spaces: Gorky Park, Red Square area, Zaryadye Park, and Tverskaya Street have city Wi-Fi.", "Wi-Fi login is usually via SMS or social media — having a Russian SIM helps."] },
  { icon: Map, title: "Essential Apps", body: "Download these before departure — some app stores restrict access from within Russia.", items: ["Yandex Go — ride-hailing (like Uber). Required for taxis.", "Yandex Maps — navigation with public transport routes and live traffic.", "Yandex Translate — offline Russian translation with camera mode for menus/signs.", "RZD — Russian Railways app for train tickets (Sapsan, overnight trains).", "Ostrovok / Yandex Travel — hotel booking within Russia (Booking.com is limited)."] },
  { icon: MessageCircle, title: "Staying in Touch", body: "WhatsApp and Telegram are the primary messaging apps used in Russia.", items: ["Your Indian number works for WhatsApp — just enable roaming for SMS verification if needed.", "Telegram is extremely popular in Russia for local communication and channels.", "Video calls: WhatsApp, Telegram, and Zoom all work. FaceTime works on Wi-Fi.", "Local calls: About ₹5–₹10/min to India with a Russian SIM. Use WhatsApp instead."] },
];

export default function ConnectivityPage() {
  return (
    <TipsArticleShell label="Connectivity" title="SIM, VPN & Apps for Moscow" description="Stay connected in Russia — SIM cards, VPN setup, free Wi-Fi spots, and the essential apps every Indian traveller needs.">
      <Section>
        <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9]">
          <img src="https://lens.usercontent.google.com/banana?agsi=CmdnbG9iYWw6OjAwMDA1NWNmZWM3MDAyNmQ6MDAwMDAwZWI6MTpiMmQ0NTA1NzA5NmQyYmExOjAwMDA1NWNmZWM3MDAyNmQ6MDAwMDAyZGI5ODYwMzM2ODowMDA2NTY0MjJjNGM2NDlmEAIYAQ==" alt="SIM cards and connectivity" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/20 to-transparent" />
        </div>
        <div className="space-y-5">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title} className="!p-6 sm:!p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{s.title}</h2>
                </div>
                {s.body && <p className="text-white/60 text-sm leading-relaxed ml-[52px] mb-4">{s.body}</p>}
                <ul className="space-y-2 ml-[52px]">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/40 shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </Section>
    </TipsArticleShell>
  );
}
