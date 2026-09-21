/* Headless screenshot harness (per memory/headless-visual-verification).
   Usage: node shoot.js <url-path> <out-prefix> [scrollY]
   Captures viewport shots at deviceScaleFactor 2 using system Chrome. */
const puppeteer = require("C:/DHIRA/2026/DHIRA Websites Efforts/DHIRA Website v3/node_modules/puppeteer-core");

const arg = process.argv[2] || "/";
const url = arg.startsWith("http") ? arg : `http://localhost:3000${arg}`;
const prefix = process.argv[3] || "shot";
const scrollYs = process.argv.slice(4).map(Number);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: "new",
    args: ["--force-device-scale-factor=2", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  if (scrollYs.length === 0) {
    await page.screenshot({ path: `${prefix}.png` });
  } else {
    for (const y of scrollYs) {
      await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
      await new Promise((r) => setTimeout(r, 1400));
      await page.screenshot({ path: `${prefix}-${y}.png` });
    }
    const dims = await page.evaluate(() => ({
      doc: document.documentElement.scrollHeight,
      vh: window.innerHeight,
    }));
    console.log("page-height:", dims.doc, "viewport:", dims.vh);
  }
  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
