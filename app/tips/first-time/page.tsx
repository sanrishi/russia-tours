
import { Globe, MapPin, Shield, Clock } from "lucide-react";
import TipsArticleShell, { Section, Card } from "@/components/TipsArticleShell";

const sections = [
  { icon: Globe, title: "Before You Go", items: ["Apply for your e-visa at least 2 weeks before travel at evisa.kdmid.ru — 4 days processing, $52 USD.", "Get a VPN before departure and install it — Instagram/Facebook are blocked in Russia.", "Download Yandex Go (taxis), Yandex Maps (navigation), and Yandex Translate (camera translator).", "Carry USD or EUR cash — VISA/Mastercard from outside Russia won't work here.", "Get a Yoomoney Tourist Card online before your trip for QR-code payments at stores and restaurants."] },
  { icon: MapPin, title: "Arriving in Moscow", items: ["Clear immigration with your e-visa PDF and passport. Keep a printed copy in your bag.", "Buy a local SIM at airport kiosks — Beeline, MTS, or Megafon (₹500–₹800 for 10 GB).", "Take the Aeroexpress train to the city centre (₹1,500, 35–45 min) or a fixed-price taxi (₹2,500–₹4,000).", "Exchange $100–$200 at the airport for immediate needs — better rates at city banks."] },
  { icon: Shield, title: "Staying Safe", items: ["Moscow is very safe for tourists — the city centre is well-lit and heavily policed.", "Keep your passport and e-visa printed copy with you at all times. Hotels keep the original for registration.", "Avoid unlicensed taxis — always use Yandex Go. A ride across the centre costs ₹300–₹800.", "Police can ask for documents — a photocopy of your passport and visa is sufficient for stops.", "Emergency number: 112 (works in English). Tourist police hotline: +7 499 157-29-31."] },
  { icon: Clock, title: "Daily Life Tips", items: ["Tipping: 10% is standard at restaurants if service charge isn't already included. No tipping for taxis.", "Water: Don't drink tap water. Buy bottled water from any supermarket (₹30–₹50).", "Toilets: Free at malls, restaurants, and museums. Street toilets cost ~₹50–₹100.", "Smoking: Banned in restaurants, bars, airports, and most indoor spaces.", "Opening hours: Most shops 10 AM–9 PM. Museums often closed on Mondays."] },
];

export default function FirstTimePage() {
  return (
    <TipsArticleShell label="First-Time Guide" title="A First-Time Visitor's Guide to Moscow" description="Everything you need to know before your first trip — from visa and cash to safety and daily life tips.">
      <Section>
        <div className="space-y-5">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title} className="!p-6 sm:!p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0"><Icon size={18} className="text-gold" /></div>
                  <h2 className="text-xl font-bold text-white">{s.title}</h2>
                </div>
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
