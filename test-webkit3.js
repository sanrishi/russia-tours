const { webkit } = require('playwright');
(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('https://tripstorussia.com/moscow-express', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(5000);
  
  // Scroll to see TripGallery
  await page.evaluate(() => window.scrollTo(0, 5000));
  await page.waitForTimeout(2000);
  
  const visible = await page.evaluate(() => {
    const els = [];
    document.querySelectorAll('h2, h3, [class*="text-gold"]').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < 900 && r.bottom > 0) {
        els.push(el.textContent.trim().slice(0, 60));
      }
    });
    return els;
  });
  console.log('Visible headings:');
  visible.forEach(v => console.log(' ', v));
  
  console.log('Errors:', errors);
  await browser.close();
})();
