import Link from "next/link";
import { ArrowLeft, Languages, MessageCircle, ShoppingBag, Utensils, HelpCircle } from "lucide-react";

const categories = [
  {
    icon: MessageCircle,
    title: "Greetings & Basics",
    phrases: [
      { russian: "Здравствуйте", pronunciation: "ZDRAST-voo-i-tye", english: "Hello (formal)" },
      { russian: "Привет", pronunciation: "pree-VYET", english: "Hi (informal)" },
      { russian: "Спасибо", pronunciation: "spa-SEE-ba", english: "Thank you" },
      { russian: "Пожалуйста", pronunciation: "pa-ZHAL-sta", english: "Please / You're welcome" },
      { russian: "Да / Нет", pronunciation: "da / nyet", english: "Yes / No" },
      { russian: "Извините", pronunciation: "eez-vee-NEE-tye", english: "Excuse me / Sorry" },
      { russian: "До свидания", pronunciation: "da svee-DA-nee-ya", english: "Goodbye" },
    ],
  },
  {
    icon: Utensils,
    title: "Food & Dining",
    phrases: [
      { russian: "Меню, пожалуйста", pronunciation: "me-NYOO pa-ZHAL-sta", english: "Menu, please" },
      { russian: "Я вегетарианец", pronunciation: "ya vee-geh-ta-ree-A-nets", english: "I am vegetarian" },
      { russian: "Без мяса", pronunciation: "bez MYA-sa", english: "Without meat" },
      { russian: "Счёт, пожалуйста", pronunciation: "schyot pa-ZHAL-sta", english: "Bill, please" },
      { russian: "Вкусно", pronunciation: "VKOO-sna", english: "Delicious" },
      { russian: "Вода", pronunciation: "va-DA", english: "Water" },
    ],
  },
  {
    icon: ShoppingBag,
    title: "Shopping & Money",
    phrases: [
      { russian: "Сколько?", pronunciation: "SKOL-ka", english: "How much?" },
      { russian: "Дорого", pronunciation: "DO-ra-ga", english: "Expensive" },
      { russian: "Можно скидку?", pronunciation: "MOZH-na SKEE-dkoo", english: "Discount possible?" },
      { russian: "Я возьму", pronunciation: "ya vaz'-MOO", english: "I'll take it" },
      { russian: "Где банкомат?", pronunciation: "gdye ban-ko-MAT", english: "Where is an ATM?" },
    ],
  },
  {
    icon: HelpCircle,
    title: "Emergencies & Help",
    phrases: [
      { russian: "Помогите!", pronunciation: "pa-ma-GEE-tye", english: "Help!" },
      { russian: "Вы говорите по-английски?", pronunciation: "vy ga-va-REE-tye pa ang-LEES-kee", english: "Do you speak English?" },
      { russian: "Я не понимаю", pronunciation: "ya nee pa-nee-MA-yoo", english: "I don't understand" },
      { russian: "Вызовите полицию", pronunciation: "VY-za-vee-tye pa-LEE-tsi-yoo", english: "Call the police" },
      { russian: "Где посольство Индии?", pronunciation: "gdye pa-SOL-stva IN-dee-ee", english: "Where is the Indian embassy?" },
    ],
  },
];

export default function PhrasebookPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <Link href="/tips" className="inline-flex items-center gap-1.5 text-gold text-sm hover:underline mb-8">
          <ArrowLeft size={14} /> Back to all tips
        </Link>

        <div className="max-w-3xl mb-10">
          <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase mb-3 block">
            Phrasebook
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Basic Russian Phrases for Indian Travellers
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            English is limited outside hotels and tourist zones. Learning a few
            Russian words will make your trip smoother and friendlier.
          </p>
        </div>

        <div className="space-y-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{cat.title}</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-white/40 font-medium py-2 pr-3">Russian</th>
                        <th className="text-left text-white/40 font-medium py-2 pr-3">Pronunciation</th>
                        <th className="text-left text-white/40 font-medium py-2">English</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.phrases.map((p) => (
                        <tr key={p.russian} className="border-b border-white/5 last:border-0">
                          <td className="py-2.5 pr-3 text-white font-medium">{p.russian}</td>
                          <td className="py-2.5 pr-3 text-white/40 text-xs italic">{p.pronunciation}</td>
                          <td className="py-2.5 text-white/60">{p.english}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
