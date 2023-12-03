import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import saveAs from "./saveAs.js";
import removeDuplicate from "./removeDuplicate.js";
import cliProgress from "cli-progress";
import { simulateMouseClick } from "./byPassing.js";

puppeteer.use(StealthPlugin());

export default async function getJobByPage(startPage, endPage) {
  let rawData = [];

  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });
  const page = await browser.newPage();

  const bar1 = new cliProgress.SingleBar(
    {
      format:
        "Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
      clearOnComplete: true,
    },
    cliProgress.Presets.shades_classic
  );
  bar1.start(listJob().length, 0);

  for (const [index, job] of listJob().entries()) {
    await page.goto(job);

    // Wait for a more specific element or condition before proceeding
    await page.waitForSelector(".job-list-search-result");

    // Extract job links
    let hrefs = await page.evaluate(() => {
      const links = document.querySelectorAll(".job-list-search-result a");
      const filteredHrefs = Array.from(links)
        .filter((link) => link.href.includes("LinkDetail"))
        .map((link) => link.href);
      return filteredHrefs;
    });

    hrefs = removeDuplicate(hrefs);
    bar1.increment();
    saveAs(`./data/Page_${startPage++}.json`, hrefs);

    // Anti-captcha
    if (hrefs.length > 0) {
      await simulateMouseClick(page);
    }
  }

  bar1.stop();

  await browser.close();
}

const listJob = () => {
  let array = [];


  for (let page = startPage; page <= endPage; page++) {
    array.push(
      `https://www.topcv.vn/tim-viec-lam-it-phan-mem-c10026?sort=up_top&page=${page}`
    );
  }

  return array;
};
