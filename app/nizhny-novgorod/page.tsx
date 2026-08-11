import RussiaHighlightsPage from "@/components/RussiaHighlightsPage"

export default function NizhnyNovgorodPage() {
  return (
    <RussiaHighlightsPage
      city="nizhny-novgorod"
      heroTitle="Nizhny Novgorod"
      gradientTitle="Gateway to the Volga"
      badge="5 Days · Small Group · Moscow + Nizhny Novgorod"
      heroSubtitle="Red Square to the Volga — Moscow's imperial landmarks, then a high-speed train to Nizhny Novgorod for its ancient Kremlin, the Chkalov Staircase, and the mighty confluence of the Volga and Oka rivers, curated for Indian travelers."
      heroBg="/nn-kremlin.webp"
      accentFrom="from-[#38BDF8]"
      accentVia="via-[#2DD4BF]"
      accentTo="to-[#7DD3FC]"
      accentText="text-[#38BDF8]"
      pageLabel="Your Journey"
      headline="Moscow + Nizhny Novgorod in 5 Days"
      description="Start with Moscow's Kremlin, Red Square and a panoramic evening city tour. Then board the high-speed Sapsan train to Nizhny Novgorod — the unofficial 'capital of the Volga' — where you'll walk the 500-year-old Kremlin, ride the iconic cable car, and watch the Volga meet the Oka at the Strelka. Small group, English-speaking guides, and private Mercedes Sprinter throughout."
      pricePerPerson={65000}
      enquiryTitle="Russia Highlights — Moscow + Nizhny Novgorod"
      jsonLdName="Russia Highlights — Moscow + Nizhny Novgorod, 5 Days"
      jsonLdDesc="5-day guided Moscow + Nizhny Novgorod tour with Moscow Kremlin, Red Square, Nizhny Novgorod Kremlin, Chkalov Staircase, Volga embankments and the Strelka river confluence."
      waText="Hi! I'm interested in the Moscow + Nizhny Novgorod 5-day tour (65,000 INR). Could you share more details?"
      trips={nnTrips}
      media={nnMedia}
      photos={nnPhotos}
    />
  )
}

const nnTrips = [
  {
    title: "Russia Highlights — Moscow + Nizhny Novgorod · 5 Days",
    tagline: "Moscow Kremlin · Volga River · Chkalov Staircase · High-Speed Train",
    image: "/nn-kremlin.webp",
    pricePerPerson: 65000,
    duration: "5 days / 4 nights",
    groupSize: "Small group (6–10 guests)",
    ageGroup: "All ages",
    seats: 10,
    description:
      "Moscow's imperial landmarks meet the historic city on the Volga. See the Moscow Kremlin and Red Square, glide across the capital by high-speed train to Nizhny Novgorod, climb its 500-year-old Kremlin walls, ride the cable car over the river, and watch the Volga meet the Oka at the Strelka. Private Mercedes Sprinter and 4★ hotels throughout.",
    included: [
      "Airport Meet & Greet in Moscow",
      "Airport departure transfer in Moscow",
      "Private Mercedes Sprinter throughout the program",
      "English-speaking professional guides",
      "4★ hotel accommodation (4 nights)",
      "3 nights in Moscow · 1 night in Nizhny Novgorod",
      "Daily breakfast (if provided by the hotel)",
      "High-speed train tickets Moscow–Nizhny Novgorod–Moscow (subject to availability)",
    ],
    excluded: [
      "International airfare",
      "Russian visa",
      "Travel insurance",
      "Entrance fees",
      "Lunches & dinners",
      "Personal expenses",
      "Tips & gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Moscow & Evening City Tour",
        meals: "—",
        transport: "Private Mercedes Sprinter",
        description:
          "Meet & Greet at Moscow airport (SVO / DME) with your English-speaking guide and private Mercedes Sprinter. Transfer to the hotel with early check-in and rest time, subject to hotel availability. Evening Moscow Panoramic City Tour — Moscow City, Sparrow Hills, Moscow State University, Cathedral of Christ the Saviour, Kremlin area, Red Square, St. Basil's Cathedral (outside), GUM Department Store, and Alexander Garden. Return to hotel and overnight in Moscow.",
      },
      {
        day: 2,
        title: "Moscow City & Heritage",
        meals: "Breakfast",
        transport: "Private Mercedes Sprinter",
        description:
          "Morning Moscow Kremlin & Red Square Tour — the Moscow Kremlin, Kremlin Cathedrals, Cathedral Square, Red Square, St. Basil's Cathedral (outside), GUM Department Store, and Alexander Garden. Optional lunch. Afternoon continues the Moscow City Tour — Arbat Street, Bolshoi Theatre (outside), Tverskaya Street, Patriarch's Ponds, and the Moscow Metro Tour. Return to hotel and overnight in Moscow.",
      },
      {
        day: 3,
        title: "Moscow → Nizhny Novgorod by High-Speed Train",
        meals: "Breakfast",
        transport: "High-speed train (approx. 4 hrs)",
        description:
          "Breakfast, check-out and transfer to the railway station. Board the high-speed train from Moscow to Nizhny Novgorod (approx. 4 hours). Meet & Greet by your local guide, transfer to the hotel for luggage drop-off. Afternoon Nizhny Novgorod Panoramic City Tour — Nizhny Novgorod Kremlin, Minin & Pozharsky Square, Bolshaya Pokrovskaya Street, the Chkalov Staircase, the Volga River Embankment, the Upper Volga Embankment, the Monument to Chkalov, and the historic city center. Hotel check-in and overnight in Nizhny Novgorod.",
      },
      {
        day: 4,
        title: "Nizhny Novgorod Heritage & Culture",
        meals: "Breakfast",
        transport: "Private Mercedes Sprinter",
        description:
          "Morning Nizhny Novgorod Kremlin & Historical Center Tour — the Kremlin walls and towers, Archangel Michael Cathedral, Minin & Pozharsky Square, and the Kremlin viewpoints over the rivers. Optional lunch. Afternoon continues the city experience — Rozhdestvenskaya Street, Stroganov Church (outside), the Fedorovsky Embankment, the Strelka, Alexander Nevsky Cathedral, and the Volga & Oka River Confluence. Optional evening: cable car experience, evening river view, or a traditional Russian dinner. Overnight in Nizhny Novgorod.",
      },
      {
        day: 5,
        title: "Nizhny Novgorod → Moscow · Departure",
        meals: "Breakfast",
        transport: "High-speed train + private transfer",
        description:
          "Breakfast and check-out. Transfer to the railway station and board the high-speed train back to Moscow (approx. 4 hours). Private transfer to Moscow Airport for your departure flight. End of services.",
      },
    ],
    visaInfo:
      "Indian passport holders need a Russian visa. For this tour we assist with the invitation letter (visa support). Indian citizens are eligible for Russia's unified e-visa — processed online in 4 calendar days.",
  },
]

const nnMedia = {
  slides: [
    "/nn-kremlin.webp",
    "/nn-river-city.webp",
    "/nn-clock-tower.webp",
    "/nn-blue-roof.webp",
    "/nn-brick-tower.webp",
  ],
  dayImages: {
    1: "/nn-river-city.webp",
    2: "/nn-clock-tower.webp",
    3: "/nn-castle.webp",
    4: "/nn-brick-tower.webp",
    5: "/nn-street-cars.webp",
  },
  dayPositions: {
    1: "object-center",
    2: "object-center",
    3: "object-center",
    4: "object-center",
    5: "object-center",
  },
  dayHighlights: {
    1: ["Airport meet & greet", "Early check-in (subject to availability)", "Moscow Panoramic Evening City Tour", "Red Square & St. Basil's (outside)", "GUM & Alexander Garden"],
    2: ["Moscow Kremlin & Cathedral Square", "Red Square & St. Basil's (outside)", "Arbat Street & Bolshoi Theatre (outside)", "Tverskaya & Patriarch's Ponds", "Moscow Metro Tour"],
    3: ["High-speed train Moscow → Nizhny Novgorod", "Nizhny Novgorod Kremlin & Minin Square", "Chkalov Staircase & Monument", "Volga River Embankments", "Bolshaya Pokrovskaya Street"],
    4: ["Kremlin walls, towers & viewpoints", "Archangel Michael Cathedral", "Rozhdestvenskaya & Stroganov Church (outside)", "Fedorovsky Embankment & Strelka", "Optional: cable car / Russian dinner"],
    5: ["High-speed train back to Moscow", "Private transfer to Moscow Airport", "End of services"],
  },
}

const nnPhotos = [
  { src: "/nn-kremlin.webp", alt: "Nizhny Novgorod Kremlin walls on a hill", tag: "Kremlin & Fortress", span: "tall" },
  { src: "/nn-river-city.webp", alt: "Nizhny Novgorod city along a large body of water", tag: "Volga Views", span: "wide" },
  { src: "/nn-clock-tower.webp", alt: "Large building with a clock tower in Nizhny Novgorod", tag: "Landmarks", span: "tall" },
  { src: "/nn-blue-roof.webp", alt: "White building with a blue roof", tag: "Architecture", span: "tall" },
  { src: "/nn-concrete-building.webp", alt: "Beige concrete building under a blue sky", tag: "Architecture", span: "tall" },
  { src: "/nn-street-cars.webp", alt: "Street with cars parked on both sides", tag: "City Streets", span: "wide" },
  { src: "/nn-town-water.webp", alt: "Town next to a body of water", tag: "Volga Views", span: "tall" },
  { src: "/nn-brick-tower.webp", alt: "Tall brick tower with a clock on top", tag: "Kremlin & Fortress", span: "tall" },
  { src: "/nn-castle.webp", alt: "Castle and nature near Nizhny Novgorod", tag: "Kremlin & Fortress", span: "wide" },
]
