"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need a visa to visit Russia?",
    a: "Yes, Indian passport holders need a tourist visa. We provide the visa invitation letter (visa support) as part of your package. Standard processing takes 7–10 business days.",
  },
  {
    q: "Is Indian food available during the trip?",
    a: "Yes! We ensure Indian-friendly meals including vegetarian, Jain, and halal options at most restaurants. Breakfasts are included daily.",
  },
  {
    q: "Is there Hindi support?",
    a: "Yes, our guides provide basic Hindi support alongside English. You'll never feel lost in communication.",
  },
  {
    q: "What is the group size?",
    a: "We keep groups small — maximum 8 people per trip — to ensure personalized attention and a premium experience.",
  },
  {
    q: "What is the age range?",
    a: "Our trips are designed for travelers aged 21–36, creating a vibrant and social group atmosphere.",
  },
  {
    q: "Are flights included?",
    a: "Flights to and from Moscow are not included. You book your own flights and we handle the rest — transfers, accommodation, meals, and activities.",
  },
  {
    q: "What should I pack?",
    a: "Check our weather & packing guide for detailed recommendations based on the season of your travel.",
  },
  {
    q: "How do I pay?",
    a: "We accept bank transfers and UPI payments. A 30% advance is required to confirm your booking, with the balance due 30 days before departure.",
  },
  {
    q: "Can I customize the itinerary?",
    a: "Our itineraries are carefully curated, but we're happy to discuss any special requests. Contact us and we'll do our best to accommodate.",
  },
  {
    q: "Is travel insurance mandatory?",
    a: "Travel insurance is strongly recommended but not mandatory. We advise all travelers to obtain comprehensive coverage.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-white/50 text-sm mb-10">
          Everything you need to know before booking your Moscow adventure.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-gold/20 bg-white/[0.06]" : "border-white/5 bg-white/[0.03]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-white/30 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-white/60 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
