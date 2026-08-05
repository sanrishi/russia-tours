import RussiaHighlightsPage from "@/components/RussiaHighlightsPage"

export default function KazanPage() {
  return (
    <RussiaHighlightsPage
      city="kazan"
      heroTitle="Kazan"
      gradientTitle="Crossroad of Worlds"
      badge="5 Days · Small Group · Moscow + Kazan"
      heroSubtitle="Red Square to the Kul Sharif Mosque — the Kazan Kremlin, Tatar heritage, and halal-friendly dining in the capital of Tatarstan, curated for Indian travelers."
      heroBg="/kzn-kul-sharif-1.webp"
      accentFrom="from-[#34D399]"
      accentVia="via-[#10B981]"
      accentTo="to-[#6EE7B7]"
      accentText="text-[#34D399]"
      pageLabel="Your Journey"
      headline="Moscow + Kazan in 5 Days"
      description="Start with a panoramic Moscow evening tour, then fly to Kazan — the historic capital of Tatarstan, where East meets West. Walk the UNESCO-listed Kazan Kremlin, step inside the Kul Sharif Mosque, and discover Tatar culture with halal-friendly dining at every stop. Small group, English-speaking guides, and private Mercedes Sprinter throughout."
      pricePerPerson={65000}
      enquiryTitle="Russia Highlights — Moscow + Kazan"
      jsonLdName="Russia Highlights — Moscow + Kazan, 5 Days"
      jsonLdDesc="5-day guided Moscow + Kazan tour with Kazan Kremlin (UNESCO), Kul Sharif Mosque, Tatar heritage and a full Moscow city tour."
      waText="Hi! I'm interested in the Moscow + Kazan 5-day tour (65,000 INR). Could you share more details?"
      trips={kazanTrips}
      media={kazanMedia}
      photos={kazanPhotos}
    />
  )
}

const kazanTrips = [
  {
    title: "Russia Highlights — Moscow + Kazan · 5 Days",
    tagline: "Kazan Kremlin · Kul Sharif · Tatar Heritage · Halal-Friendly",
    image: "/kzn-kul-sharif-1.webp",
    pricePerPerson: 65000,
    duration: "5 days / 4 nights",
    groupSize: "Small group (6–10 guests)",
    ageGroup: "All ages",
    seats: 10,
    description:
      "Moscow's imperial landmarks meet Kazan's Muslim heritage. See Red Square and the Moscow City skyline, fly to Kazan for the UNESCO-listed Kremlin, the Kul Sharif Mosque, and the Palace of Farmers, then finish with a final Moscow evening on Arbat Street and Zaryadye Park. Domestic flights, private Mercedes Sprinter, and 4★ hotels throughout.",
    included: [
      "Airport Meet & Greet in Moscow",
      "Airport transfers in Moscow and Kazan",
      "Private Mercedes Sprinter throughout the program",
      "English-speaking professional guides",
      "4★ hotel accommodation (4 nights)",
      "Daily breakfast (if provided by the hotel)",
      "Domestic flights Moscow–Kazan–Moscow (subject to availability)",
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
        title: "Flight to Kazan & City Tour",
        meals: "Breakfast",
        transport: "Domestic flight Moscow–Kazan",
        description:
          "Breakfast and transfer to the airport for the morning domestic flight to Kazan (approx. 1.5 hours). Meet & Greet by your local guide. Afternoon Kazan City Tour — the Kazan Kremlin (UNESCO World Heritage Site), Kul Sharif Mosque, Annunciation Cathedral, Soyembika Tower, the Palace of Farmers (Agricultural Palace), the Kremlin Embankment, Bauman Street, and the Volga River Viewpoint. Check-in and overnight in Kazan.",
      },
      {
        day: 3,
        title: "Kazan Culture & Heritage Experience",
        meals: "Breakfast",
        transport: "Private Mercedes Sprinter",
        description:
          "Morning Historical Kazan Tour — the Old Tatar Settlement, traditional Tatar architecture, the Lake Kaban area, Freedom Square, and local cultural streets. Afternoon continues with the Kazan Kremlin Museums, the Kul Sharif Mosque interior (subject to availability), and local shopping & souvenirs. Optional evening: a traditional Tatar dinner or a Tatar folk show. Overnight in Kazan.",
      },
      {
        day: 4,
        title: "Optional Excursion & Return to Moscow",
        meals: "Breakfast",
        transport: "Domestic flight Kazan–Moscow",
        description:
          "Optional morning excursion — Option 1: Sviyazhsk Island, a UNESCO-listed historical town with a walking tour; Option 2: Raifa Monastery and Raifa Lake for a nature and spiritual heritage experience. Transfer to Kazan Airport for the afternoon flight back to Moscow. Evening Moscow Experience — Arbat Street, Zaryadye Park, the Moscow River Viewpoint, Red Square in the evening, and the Bolshoi Theatre (outside). Transfer to hotel and overnight in Moscow.",
      },
      {
        day: 5,
        title: "Departure from Moscow",
        meals: "Breakfast",
        transport: "Private transfer",
        description:
          "Breakfast, check-out, and a private transfer to Moscow Airport for your departure flight. End of services.",
      },
    ],
    visaInfo:
      "Indian passport holders need a Russian visa. For this tour we assist with the invitation letter (visa support). Indian citizens are eligible for Russia's unified e-visa — processed online in 4 calendar days.",
  },
]

const kazanMedia = {
  slides: [
    "/kzn-kul-sharif-1.webp",
    "/kzn-cityscape.webp",
    "/kzn-farmers-palace.webp",
    "/kzn-church.webp",
    "/kzn-national-museum.webp",
  ],
  dayImages: {
    1: "/kzn-cityscape.webp",
    2: "/kzn-kul-sharif-2.webp",
    3: "/kzn-national-museum.webp",
    4: "/kzn-monument-stairs.webp",
    5: "/kzn-farmers-gate.webp",
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
    2: ["Morning domestic flight (~1.5 hours)", "Kazan Kremlin (UNESCO World Heritage)", "Kul Sharif Mosque & Annunciation Cathedral", "Soyembika Tower & Palace of Farmers", "Bauman Street & Volga River Viewpoint"],
    3: ["Old Tatar Settlement & Lake Kaban", "Freedom Square & cultural streets", "Kazan Kremlin Museums", "Kul Sharif Mosque interior (subject to availability)", "Optional: Tatar dinner / folk show"],
    4: ["Optional: Sviyazhsk Island (UNESCO)", "Optional: Raifa Monastery & Lake", "Afternoon flight back to Moscow", "Arbat Street & Zaryadye Park", "Red Square evening & Bolshoi Theatre (outside)"],
    5: ["Breakfast at hotel", "Private transfer to Moscow Airport", "End of services"],
  },
}

const kazanPhotos = [
  { src: "/kzn-kul-sharif-1.webp", alt: "Kul Sharif Mosque facade, Kazan Kremlin", tag: "Kremlin & Mosques", span: "tall" },
  { src: "/kzn-kul-sharif-2.webp", alt: "The Kul Sharif Mosque in Kazan Kremlin", tag: "Kremlin & Mosques", span: "wide" },
  { src: "/kzn-cityscape.webp", alt: "Kazan city architecture and skyline", tag: "City Views", span: "wide" },
  { src: "/kzn-church.webp", alt: "Church in Kazan", tag: "City Views", span: "tall" },
  { src: "/kzn-farmers-palace.webp", alt: "Kazan Palace of Farmers in Tatarstan", tag: "Landmarks", span: "sq" },
  { src: "/kzn-farmers-gate.webp", alt: "Palace of Farmers entrance gate", tag: "Landmarks", span: "sq" },
  { src: "/kzn-national-museum.webp", alt: "National Museum of the Republic of Tatarstan", tag: "Landmarks", span: "sq" },
  { src: "/kzn-family-center.webp", alt: "Kazan Family Center", tag: "Landmarks", span: "sq" },
  { src: "/kzn-monument-stairs.webp", alt: "Clear sky over stairs to a monument", tag: "City Views", span: "wide" },
]
