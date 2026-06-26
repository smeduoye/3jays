import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'assets', 'products');

async function sectionByHeading(page, headingText) {
  return page.locator('section').filter({
    has: page.getByRole('heading', { name: headingText, exact: false }),
  }).first();
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('https://www.thrivewithtianna.com/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);

const hero = page.locator('section').first();
await hero.screenshot({ path: path.join(outDir, 'thrive-marketing-hero.png') });
console.log('Saved thrive-marketing-hero.png');

const coaching = await sectionByHeading(page, 'Transform your health');
await coaching.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await coaching.screenshot({ path: path.join(outDir, 'thrive-coaching-services.png') });
console.log('Saved thrive-coaching-services.png');

const clientHub = await sectionByHeading(page, 'Your coaching dashboard');
await clientHub.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await clientHub.screenshot({ path: path.join(outDir, 'thrive-client-hub.png') });
console.log('Saved thrive-client-hub.png');

await browser.close();
