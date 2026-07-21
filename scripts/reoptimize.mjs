import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

const targets = [
  "unsplash-sidewalk.webp",
  "unsplash-stbasil.webp",
  "moscow-city-3.webp",
  "unsplash-traffic.webp",
  "moscow-city-1.webp",
  "moscow-city-2.webp",
  "moscow-summer-2.webp",
  "mobile-bg.webp",
  "day2-red-square.webp",
  "moscow-hero.webp",
  "moscow-summer-1.webp",
  "enhanced_New_kremlin_v2.webp",
  "enhanced_moscow-bg_final_2.webp",
  "enhanced_moscow-bg_final.webp",
  "enhanced_new_moscow.webp",
  "enhanced_last_section.webp",
  "Kul.webp",
  "download_v2.webp",
  "New_kremlin_v2.webp",
  "stpetersburg-card.webp",
  "kazan-card.webp",
  "soultrain-sunset-8064078.webp",
  "moscow-kremlin.webp",
];

let totalBefore = 0;
let totalAfter = 0;

for (const name of targets) {
  const src = path.join(publicDir, name);
  if (!fs.existsSync(src)) {
    console.log(`SKIP: ${name} (not found)`);
    continue;
  }
  const before = fs.statSync(src).size;

  const metadata = await sharp(src).metadata();
  let w = metadata.width || 1920;
  if (w > 1600) w = 1600;

  const tmp = path.join(publicDir, `_tmp_${name}`);
  await sharp(src)
    .resize(w)
    .webp({ quality: 60, effort: 6 })
    .toFile(tmp);

  console.log(`  wrote tmp, will replace via shell`);
  const after = fs.statSync(src).size;
  totalBefore += before;
  totalAfter += after;
  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${name}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (${pct}% saved)`
  );
}

const totalSaved = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (${totalSaved}% saved)`);
