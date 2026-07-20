import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

const images = [
  "cattu-moscow-964445.jpg",
  "visa-step-docs.png",
  "unsplash-sidewalk.jpg",
  "IMG_6226.jpeg",
  "rooftop.jpeg",
  "newspaper.png",
  "download_v2.png",
  "unsplash-stbasil.jpg",
  "Kul.png",
  "New_kremlin_v2.png",
  "unsplash-traffic.jpg",
  "group-tour.jpg",
  "group-tour.png",
  "day2-red-square.jpg",
  "moscow-hero.jpg",
  "unsplash-moscow-river.jpg",
  "day4-arbat.jpg",
  "day5-viewpoint.jpg",
  "unsplash-kremlin.jpg",
  "day1-river.jpg",
  "day6-vdnkh.jpg",
  "cafe-two-women.jpg",
  "unsplash-city.jpg",
  "day7-departure.jpg",
  "firsttime-index.jpg",
  "day3-rooftop.jpg",
  "transport-index.jpg",
  "connectivity-index.jpg",
  "phrasebook-index.jpg",
  "safety-hero.jpg",
  "tour-style.jpg",
  "visa-separator.jpg",
  "custom-tour.jpg",
];

let total = 0;

for (const img of images) {
  const src = path.join(publicDir, img);
  if (!fs.existsSync(src)) {
    console.log(`SKIP (not found): ${img}`);
    continue;
  }
  const name = path.parse(img).name;
  const dest = path.join(publicDir, `${name}.webp`);

  const stat = fs.statSync(src);
  const sizeBefore = stat.size;

  let pipeline = sharp(src).webp({ quality: 80, effort: 6 });

  const metadata = await sharp(src).metadata();
  if (metadata.width > 1920) {
    pipeline = pipeline.resize(1920);
  }

  await pipeline.toFile(dest);

  const statAfter = fs.statSync(dest);
  const saved = ((1 - statAfter.size / sizeBefore) * 100).toFixed(1);
  total += sizeBefore - statAfter.size;
  console.log(
    `${img}: ${(sizeBefore / 1024).toFixed(0)}KB → ${(statAfter.size / 1024).toFixed(0)}KB (${saved}% saved)`
  );
}

console.log(`\nTotal saved: ${(total / 1024 / 1024).toFixed(1)}MB`);
