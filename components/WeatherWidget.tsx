"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CloudSun, Thermometer, MapPin } from "lucide-react";

interface Weather {
  temperature: number;
  weathercode: number;
}

const weatherEmoji: Record<number, string> = {
  0: "☀️", 1: "🌤", 2: "⛅", 3: "☁️", 45: "🌫", 48: "🌫",
  51: "🌦", 53: "🌦", 55: "🌦", 61: "🌧", 63: "🌧", 65: "🌧",
  71: "🌨", 73: "🌨", 75: "🌨", 80: "🌦", 81: "🌧", 82: "🌧",
  95: "⛈", 96: "⛈", 99: "⛈",
};

const cities = [
  { name: "Moscow", lat: 55.7558, lon: 37.6173 },
  { name: "St. Petersburg", lat: 59.9343, lon: 30.3351 },
];

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Record<string, Weather | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const results: Record<string, Weather | null> = {};
      for (const city of cities) {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&timezone=auto`
          );
          const data = await res.json();
          results[city.name] = data.current_weather;
        } catch {
          results[city.name] = null;
        }
      }
      setWeather(results);
      setLoading(false);
    };
    fetchWeather();
  }, []);

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center"
    >
      <CloudSun size={16} className="text-gold" />
      {cities.map((city) => {
        const w = weather[city.name];
        return (
          <div key={city.name} className="flex items-center gap-2 text-sm">
            <MapPin size={12} className="text-white/40" />
            <span className="text-white/60">{city.name}:</span>
            {w ? (
              <>
                <span>{weatherEmoji[w.weathercode] ?? "☀️"}</span>
                <span className="text-white font-medium">
                  {Math.round(w.temperature)}°C
                </span>
              </>
            ) : (
              <span className="text-white/30">—</span>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
