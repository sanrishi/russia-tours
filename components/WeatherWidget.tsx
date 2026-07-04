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
      className="flex items-center gap-1.5 text-sm"
    >
      {cities.map((city) => {
        const w = weather[city.name];
        return (
          <div key={city.name} className="flex items-center gap-1">
            {w ? (
              <>
                <span className="text-xs leading-none">{weatherEmoji[w.weathercode] ?? "☀️"}</span>
                <span className="text-white/50 text-[10px]">{city.name}:</span>
                <span className="text-white/70 font-medium text-xs">
                  {Math.round(w.temperature)}°C
                </span>
              </>
            ) : (
              <span className="text-white/30 text-xs">—</span>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
