import RussiaHighlightsPage from "@/components/RussiaHighlightsPage"

export default function StPetersburgPage() {
  return (
    <RussiaHighlightsPage
      city="st-petersburg"
      heroTitle="St. Petersburg"
      gradientTitle="Imperial Highlights"
      badge="5 Days · Small Group · Moscow + St. Petersburg"
      heroSubtitle="Red Square to the Hermitage — the Sapsan high-speed train, Peterhof's golden fountains, and the Amber Room in five days, curated for Indian travelers."
      heroBg="/spb-night-lake.webp"
      accentFrom="from-[#D4AF37]"
      accentVia="via-[#F59E0B]"
      accentTo="to-[#FFE888]"
      accentText="text-[#F59E0B]"
      pageLabel="Your Journey"
      headline="Moscow + St. Petersburg in 5 Days"
      description="Begin in Moscow with a full panoramic city tour, then ride the high-speed Sapsan train to the imperial capital on the Neva. Explore the State Hermitage, stroll Nevsky Prospect, and spend a day among the fountains of Peterhof and the Amber Room at Tsarskoe Selo. Small group, English-speaking guides, and private Mercedes Sprinter throughout."
      pricePerPerson={65000}
      enquiryTitle="Russia Highlights — Moscow + St. Petersburg"
      jsonLdName="Russia Highlights — Moscow + St. Petersburg, 5 Days"
      jsonLdDesc="5-day guided Moscow + St. Petersburg tour with high-speed Sapsan train, Hermitage Museum, Peterhof and Tsarskoe Selo."
      waText="Hi! I'm interested in the Moscow + St. Petersburg 5-day tour (65,000 INR). Could you share more details?"
      trips={stPetersburgTrips}
      media={stPetersburgMedia}
      photos={stPetersburgPhotos}
    />
  )
}

const stPetersburgTrips = [
  {
    title: "Russia Highlights — Moscow + St. Petersburg · 5 Days",
    tagline: "Sapsan Train · Hermitage · Peterhof · Amber Room",
    image: "/spb-night-lake.webp",
    pricePerPerson: 65000,
    duration: "5 days / 4 nights",
    groupSize: "Small group (6–10 guests)",
    ageGroup: "All ages",
    seats: 10,
    description:
      "A perfect first-time Russia itinerary. Arrive in Moscow for a full panoramic city tour, glide to St. Petersburg on the high-speed Sapsan train, explore the State Hermitage, and spend a day at Peterhof and Tsarskoe Selo. Private Mercedes Sprinter, English-speaking guides, and 4★ hotels throughout.",
    included: [
      "Airport Meet & Greet in Moscow",
      "Airport departure transfer in St. Petersburg",
      "Private Mercedes Sprinter throughout the program",
      "English-speaking professional guides",
      "4★ hotel accommodation (4 nights)",
      "Daily breakfast (if provided by the hotel)",
    ],
    excluded: [
      "International airfare",
      "Russian visa",
      "Travel insurance",
      "Sapsan train tickets",
      "Entrance fees",
      "Lunches & dinners",
      "Personal expenses",
      "Tips & gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Moscow & Panoramic City Tour",
        meals: "Lunch (optional)",
        transport: "Private Mercedes Sprinter",
        description:
          "Meet & Greet at Moscow airport (SVO / DME) with your English-speaking guide and private Mercedes Sprinter. Afternoon Moscow Panoramic City Tour — Moscow City skyscrapers, Sparrow Hills, Moscow State University, Cathedral of Christ the Saviour, Kremlin area, Red Square, St. Basil's Cathedral (outside), GUM Department Store, and Alexander Garden. Lunch at a Russian or Indian restaurant (optional). Check-in and overnight in Moscow.",
      },
      {
        day: 2,
        title: "Sapsan Train to St. Petersburg",
        meals: "Breakfast · Lunch (optional)",
        transport: "High-speed Sapsan train",
        description:
          "Breakfast and transfer to Leningradsky Railway Station for the 08:00–12:00 high-speed Sapsan train from Moscow to St. Petersburg. Meet your local guide on arrival. Afternoon St. Petersburg City Tour — Palace Square, Winter Palace (outside), Nevsky Prospect, Kazan Cathedral, St. Isaac's Cathedral, the Bronze Horseman, the Spit of Vasilyevsky Island, and the Rostral Columns. Check-in and overnight in St. Petersburg.",
      },
      {
        day: 3,
        title: "Hermitage Museum & Historic St. Petersburg",
        meals: "Breakfast · Lunch (optional)",
        transport: "Private Mercedes Sprinter",
        description:
          "Morning at the State Hermitage Museum — one of the world's greatest art collections. Afternoon continues the city tour with the Church of the Savior on Spilled Blood, the Summer Garden, and the Neva River embankments. Optional evening: a Neva River cruise or a Russian folklore show. Overnight in St. Petersburg.",
      },
      {
        day: 4,
        title: "Peterhof & Tsarskoe Selo",
        meals: "Breakfast · Lunch (optional)",
        transport: "Private Mercedes Sprinter",
        description:
          "Full day of imperial palaces. Morning at Peterhof — the Lower Park, the Grand Cascade, and the Samson Fountain. Afternoon at Tsarskoe Selo — Catherine Palace, the legendary Amber Room, and Catherine Park. Evening free for a farewell dinner (optional). Overnight in St. Petersburg.",
      },
      {
        day: 5,
        title: "Departure from Pulkovo",
        meals: "Breakfast",
        transport: "Private transfer",
        description:
          "Breakfast, check-out, and a private transfer to Pulkovo Airport for your departure flight. End of services.",
      },
    ],
    visaInfo:
      "Indian passport holders need a Russian visa. For this tour we assist with the invitation letter (visa support). Indian citizens are eligible for Russia's unified e-visa — processed online in 4 calendar days.",
  },
]

const stPetersburgMedia = {
  slides: [
    "/spb-night-lake.webp",
    "/spb-hermitage-gate.webp",
    "/spb-savior-blood.webp",
    "/spb-st-isaac-1.webp",
    "/spb-peter-city.webp",
  ],
  dayImages: {
    1: "/spb-hermitage-2.webp",
    2: "/spb-winter-palace.webp",
    3: "/spb-hermitage-1.webp",
    4: "/spb-baroque.webp",
    5: "/spb-winter-canal.webp",
  },
  dayPositions: {
    1: "object-center",
    2: "object-center",
    3: "object-center",
    4: "object-center",
    5: "object-center",
  },
  dayHighlights: {
    1: ["Airport meet & greet", "Moscow Panoramic City Tour", "Red Square & St. Basil's (outside)", "Sparrow Hills & Moscow City", "GUM & Alexander Garden"],
    2: ["High-speed Sapsan train (08:00–12:00)", "Palace Square & Winter Palace (outside)", "Nevsky Prospect & Kazan Cathedral", "St. Isaac's Cathedral & Bronze Horseman", "Spit of Vasilyevsky Island & Rostral Columns"],
    3: ["State Hermitage Museum", "Church of the Savior on Spilled Blood", "Summer Garden", "Neva River embankments", "Optional: Neva River cruise / folklore show"],
    4: ["Peterhof Lower Park & Grand Cascade", "Samson Fountain", "Catherine Palace & the Amber Room", "Catherine Park at Tsarskoe Selo"],
    5: ["Breakfast at hotel", "Private transfer to Pulkovo Airport", "End of services"],
  },
}

const stPetersburgPhotos = [
  { src: "/spb-night-lake.webp", alt: "St. Petersburg at night by the lake", tag: "City Nights", span: "wide" },
  { src: "/spb-winter-palace.webp", alt: "Elegant view of the Winter Palace", tag: "Palaces", span: "tall" },
  { src: "/spb-hermitage-gate.webp", alt: "Steel gate entrances of the Hermitage", tag: "Hermitage", span: "sq" },
  { src: "/spb-hermitage-1.webp", alt: "The Hermitage in St. Petersburg", tag: "Hermitage", span: "sq" },
  { src: "/spb-hermitage-2.webp", alt: "St. Petersburg Hermitage facade", tag: "Hermitage", span: "sq" },
  { src: "/spb-savior-blood.webp", alt: "Church of the Savior on Spilled Blood", tag: "Churches", span: "tall" },
  { src: "/spb-st-isaac-1.webp", alt: "Saint Isaac's Cathedral", tag: "Churches", span: "sq" },
  { src: "/spb-st-isaac-2.webp", alt: "St. Isaac's Cathedral close-up", tag: "Churches", span: "sq" },
  { src: "/spb-st-isaac-3.webp", alt: "St. Isaac's Cathedral church", tag: "Churches", span: "wide" },
  { src: "/spb-church-orthodox.webp", alt: "Orthodox church exterior", tag: "Churches", span: "tall" },
  { src: "/spb-winter-canal.webp", alt: "Winter canal in St. Petersburg in the evening", tag: "Canals", span: "wide" },
  { src: "/spb-canal-buildings.webp", alt: "A canal surrounded by buildings", tag: "Canals", span: "sq" },
  { src: "/spb-boats-canal.webp", alt: "Boats on a canal in the city", tag: "Canals", span: "sq" },
  { src: "/spb-baroque.webp", alt: "Elegant baroque architecture", tag: "Architecture", span: "sq" },
  { src: "/spb-architecture-old.webp", alt: "Old architectural building", tag: "Architecture", span: "sq" },
  { src: "/spb-facade.webp", alt: "Building facade", tag: "Architecture", span: "wide" },
  { src: "/spb-peter-city.webp", alt: "St. Petersburg cityscape", tag: "City Views", span: "wide" },
]
