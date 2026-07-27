const { webkit } = require('playwright');
(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
  await page.goto('https://tripstorussia.com/moscow-express', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(5000);
  const h = await page.evaluate(() => document.body.scrollHeight);
  console.log('Page height:', h);
  const hasStory = await page.evaluate(() => !!document.querySelector('#story'));
  const hasBooking = await page.evaluate(() => !!document.querySelector('#booking'));
  console.log('#story:', hasStory, '#booking:', hasBooking);
  console.log('Errors:', errors);
  
  // Try scrolling with JS
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(1000);
  const scrollY = await page.evaluate(() => window.scrollY);
  const text = await page.evaluate(() => document.body.innerText.substring(0, 200));
  console.log('scrollY:', scrollY);
  console.log('Text after scroll:', text.replace(/\n/g, ' | '));
  
  await browser.close();
})();
