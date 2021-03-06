const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');

  await page.screenshot({path: 'example.png'});

  const html = await page.evaluate(
    () => new XMLSerializer().serializeToString(document)
  );

  console.log(html);

  await browser.close();
})();
