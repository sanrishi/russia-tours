const { webkit } = require('playwright');

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  const logs = [];
  page.on('console', msg => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', err => logs.push(`[pageerror] ${err.message}`));

  const url = process.argv[2] || 'https://russia-tours-m16w85hyy-sanchits-projects-2337ffb1.vercel.app/moscow-express';
  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(5000);

  // Scroll to bottom to trigger all IntersectionObservers
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // Viewport screenshot
  await page.screenshot({ path: 'webkit-viewport.png' });
  // Full page screenshot
  await page.screenshot({ path: 'webkit-moscow-express.png', fullPage: true });
  console.log('Screenshots saved');

  // Find all major sections
  const sections = await page.evaluate(() => {
    const result = {};
    const checks = {
      hero: 'h1',
      story: '#story',
      booking: '#booking',
      costPopup: '[class*="CostEstimator"]',
    };
    for (const [k, sel] of Object.entries(checks)) {
      const el = document.querySelector(sel);
      if (el) {
        const r = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        result[k] = {
          found: true,
          rect: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
        };
      } else {
        result[k] = { found: false };
      }
    }
    return result;
  });
  console.log('\nSections found:');
  for (const [k, v] of Object.entries(sections)) {
    console.log(`  ${k}: ${JSON.stringify(v)}`);
  }

  // Find all visible content blocks (cards, sections)
  const contentBlocks = await page.evaluate(() => {
    const blocks = [];
    const selectors = [
      'section', 'article', 'div.rounded-2xl', '[class*="border"][class*="rounded-2xl"]',
      '[class*="grid"] > div', 'button', 'a[href]',
    ];
    for (const sel of selectors) {
      const els = document.querySelectorAll(sel);
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && r.width < 2000) {
          const text = (el.textContent || '').trim().slice(0, 40).replace(/\s+/g, ' ');
          blocks.push({
            selector: `${sel}[${i}]`,
            tag: el.tagName,
            rect: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
            text,
          });
        }
      });
    }
    return blocks;
  });
  console.log(`\nContent blocks: ${contentBlocks.length}`);
  for (const b of contentBlocks.slice(0, 40)) {
    console.log(`  <${b.tag}> ${b.rect} "${b.text}"`);
  }

  // Check for specific components
  const components = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    const found = {};
    for (const el of all) {
      const text = el.textContent || '';
      const cls = el.className || '';
      if (text.includes('Moscow Discovery')) found.tripCard = true;
      if (text.includes('Trip Gallery') || cls.includes('gallery')) found.gallery = true;
      if (text.includes('Moscow Express') && text.includes('7 Days')) found.experience = true;
      if (text.includes('Check Availability')) found.bookingForm = true;
      if (text.includes('Know Before You Go')) found.knowBefore = true;
      if (text.includes('Price Breakdown')) found.priceBreakdown = true;
      if (text.includes('Trip Soundtrack')) found.soundtrack = true;
    }
    return found;
  });
  console.log('\nComponents detected:');
  for (const [k, v] of Object.entries(components)) {
    console.log(`  ${k}: ${v}`);
  }

  // Check all images for load status
  const imgStatus = await page.evaluate(() => {
    const imgs = document.querySelectorAll('img');
    return Array.from(imgs).map(img => ({
      src: img.src.split('/').pop(),
      loaded: img.complete,
      naturalW: img.naturalWidth,
      naturalH: img.naturalHeight,
      rect: (() => { const r = img.getBoundingClientRect(); return `${Math.round(r.w)}x${Math.round(r.h)}`; })(),
    }));
  });
  console.log(`\nImages (${imgStatus.length}):`);
  for (const img of imgStatus) {
    console.log(`  ${img.src}: loaded=${img.loaded} ${img.naturalW}x${img.naturalH} rendered=${img.rect}`);
  }

  // Check background-image on hero
  const heroBg = await page.evaluate(() => {
    const fixed = document.querySelector('[class*="fixed"][class*="bg-cover"]');
    if (fixed) {
      const bg = getComputedStyle(fixed).backgroundImage;
      return bg;
    }
    return 'no fixed bg element found';
  });
  console.log(`\nHero background: ${heroBg}`);

  // Check z-index stacking / golden dots
  const goldenDots = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg.includes('radial-gradient') && bg.includes('d4af37')) {
        const r = el.getBoundingClientRect();
        const zi = getComputedStyle(el).zIndex;
        const pe = getComputedStyle(el).pointerEvents;
        return {
          rect: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
          zIndex: zi,
          pointerEvents: pe,
          position: getComputedStyle(el).position,
        };
      }
    }
    return 'not found';
  });
  console.log(`\nGolden dots overlay: ${JSON.stringify(goldenDots)}`);

  // Check for backdrop-filter elements
  const backdropEls = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    let count = 0;
    for (const el of all) {
      const bf = getComputedStyle(el).backdropFilter;
      if (bf && bf !== 'none') count++;
    }
    return count;
  });
  console.log(`\nElements with backdrop-filter: ${backdropEls}`);

  // Log all console messages
  console.log(`\nConsole messages (${logs.length}):`);
  logs.forEach(l => console.log(`  ${l}`));

  await browser.close();
  console.log('\nDone.');
})();
