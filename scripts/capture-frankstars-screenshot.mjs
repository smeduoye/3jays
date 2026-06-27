import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'assets', 'products');
const deckUrl = 'http://127.0.0.1:8768/proposals/frankstars/deck.html';

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(deckUrl, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);

await page.screenshot({
  path: path.join(outDir, 'frankstars-deck-hero.png'),
  clip: { x: 0, y: 0, width: 1440, height: 820 },
});

console.log('Saved frankstars-deck-hero.png');
await browser.close();
