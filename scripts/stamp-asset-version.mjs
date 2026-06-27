import { createHash } from 'node:crypto';
import { globSync, readFileSync, writeFileSync } from 'node:fs';

const assetFiles = [
  'assets/css/styles.css',
  'assets/js/scroll-animations.js',
];

const hash = createHash('sha256');
for (const file of assetFiles) {
  hash.update(readFileSync(file));
}
const version = hash.digest('hex').slice(0, 10);

const htmlFiles = globSync('{index.html,case-studies/*.html,proposals/**/index.html}', {
  exclude: (entry) => entry.name === 'deck.html',
});

const assetPattern = /((?:styles\.css|scroll-animations\.js))(?:\?v=[^"'#]+)?/g;

let updated = 0;

for (const file of htmlFiles) {
  const source = readFileSync(file, 'utf8');
  const next = source.replace(assetPattern, `$1?v=${version}`);

  if (next !== source) {
    writeFileSync(file, next);
    updated += 1;
    console.log(`Stamped ${file}`);
  }
}

console.log(`Asset version: ${version} (${updated} file(s) updated)`);
