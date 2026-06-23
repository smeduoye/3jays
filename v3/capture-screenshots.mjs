import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'assets', 'products');

const shots = [
  { url: 'http://localhost:8081/', file: 'family-cfo-dashboard.png', wait: 'Financial Dashboard' },
  { url: 'http://localhost:8081/budget', file: 'family-cfo-budget.png', wait: 'Budget' },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const shot of shots) {
  await page.goto(shot.url, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: new RegExp(shot.wait, 'i') }).waitFor({ timeout: 15000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, shot.file), fullPage: false });
  console.log('Saved', shot.file);
}

await browser.close();
