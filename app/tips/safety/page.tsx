
import { ShieldCheck, Phone, FileText, AlertTriangle, CarTaxiFront } from "lucide-react";
import TipsArticleShell, { Section, Card } from "@/components/TipsArticleShell";

const sections = [
  { icon: ShieldCheck, title: "Is Moscow Safe?", items: ["Moscow is very safe for tourists — the city centre is well-lit, heavily policed, and patrolled by tourist police.", "Violent crime against tourists is extremely rare. Petty theft (pickpocketing in metro/buses) is the main concern.", "Police officers actively help tourists — don't hesitate to approach them if you need directions or assistance.", "Avoid walking alone late at night in unfamiliar residential areas, especially as a solo traveller."] },
  { icon: AlertTriangle, title: "Police & Document Checks", items: ["Police can ask for documents at any time — always carry a photocopy of your passport and visa.", "If stopped, stay calm and polite. Show your photocopy — they rarely need the original.", "Tourist police speak some English. Regular police may not — use Google Translate if needed.", "If you lose your passport, visit the Indian Embassy immediately (6/8 ul. Obukha, Moscow)."] },
  { icon: CarTaxiFront, title: "Scams to Avoid", items: ["Don't take unlicensed taxis — use Yandex Go only. Fixed price displayed before booking.", "Ignore 'friendly' strangers who offer to exchange money or take pictures — common near Red Square.", "Beware of the 'lost wallet' scam — someone drops a wallet near you, then demands money.", "Don't buy metro tickets from touts — use official ticket offices or the Troika card vending machines."] },
  { icon: Phone, title: "Emergency Contacts", items: ["112 — Universal emergency number (works in English)", "+7 499 157-29-31 — Tourist police hotline", "+7 495 783-15-15 — Indian Embassy in Moscow", "+7 495 232-29-19 — 24-hour consular helpline"] },
];

export default function SafetyPage() {
  return (
    <TipsArticleShell label="Safety Guide" title="Moscow Safety Guide for Indian Travellers" description="Moscow is one of the safest capital cities in the world for tourists. Here's what you need to know to stay safe and avoid common issues.">
      <Section>
        <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9]">
          <img src="/safety-hero.webp" alt="Moscow safety" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-[#0c0a0a]/20 to-transparent" />
        </div>
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
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/40 shrink-0 mt-2" />{item}
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
