import { chromium } from "playwright";

const URL = "http://localhost:3000";

const viewports = [
  { label: "1366x768 (13-14in laptop)", width: 1366, height: 768 },
  { label: "1440x900", width: 1440, height: 900 },
  { label: "1536x864 (MacBook)", width: 1536, height: 864 },
  { label: "1920x1080 (monitor)", width: 1920, height: 1080 },
];

async function measure(browser, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(3000);

  const result = await page.evaluate(() => {
    const getRect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };

    const button = document.querySelector('a[href="/places"]');
    const dots = document.querySelectorAll('button[class*="w-10 h-10 rounded-full"]');
    const scrollInd = [...document.querySelectorAll("svg")].find((s) =>
      s.querySelector("polyline, path") && s.closest("div")?.className?.includes?.("animate-bounce")
    );

    const btnRect = getRect(button);
    let dotsRect = null;
    let dotsTop = Infinity;
    let dotsBottom = -Infinity;
    dots.forEach((d) => {
      const r = getRect(d);
      if (r) {
        dotsTop = Math.min(dotsTop, r.top);
        dotsBottom = Math.max(dotsBottom, r.bottom);
      }
    });
    if (dots.length) dotsRect = { top: dotsTop, bottom: dotsBottom, height: dotsBottom - dotsTop };

    return {
      btnRect,
      dotsRect,
      gap: btnRect && dotsRect ? Math.round(dotsRect.top - btnRect.bottom) : null,
      overlap: btnRect && dotsRect ? Math.round(btnRect.bottom - dotsRect.top) : null,
    };
  });

  console.log(`\n=== ${vp.label} (${vp.width}x${vp.height}) ===`);
  console.log(`Button bottom: ${result.btnRect?.bottom} | Dots top: ${result.dotsRect?.top}`);
  console.log(result.gap !== null && result.gap >= 0
    ? `GAP: ${result.gap}px (clean)`
    : `OVERLAP: ${result.overlap}px (collision!)`);

  await ctx.close();
  return result;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  let allClean = true;
  for (const vp of viewports) {
    const r = await measure(browser, vp);
    if (r.gap === null || r.gap < 0) allClean = false;
  }
  await browser.close();
  console.log(`\n${allClean ? "PASS: no overlap at any laptop resolution" : "FAIL: overlap detected"}`);
}

main().catch(console.error);
