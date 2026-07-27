const { webkit } = require('playwright');
(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
  await page.goto('https://tripstorussia.com/moscow-express', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(3000);
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => window.scrollBy(0, 900));
    await page.waitForTimeout(500);
    const hidden = await page.evaluate(() => document.querySelectorAll('[class*="opacity-0"]').length);
    const text = await page.evaluate(() => document.body.innerText.substring(0, 80));
    console.log(`Scroll ${i+1}: hidden=${hidden}  text="${text}"`);
  }
  console.log('Errors:', errors);
  await browser.close();
})();
