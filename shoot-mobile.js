/* Mobile screenshot: node shoot-mobile.js <url> <out> [scrollY] */
const puppeteer = require("C:/DHIRA/2026/DHIRA Websites Efforts/DHIRA Website v3/node_modules/puppeteer-core");
(async () => {
  const url = process.argv[2];
  const out = process.argv[3];
  const y = Number(process.argv[4] || 0);
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: "new",
    args: ["--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2200));
  if (y) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await new Promise((r) => setTimeout(r, 1200)); }
  await page.screenshot({ path: out });
  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
