const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const [, value] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (value.startsWith('#')) {
    if (value.length > 1 && !html.includes(`id="${value.slice(1)}"`)) throw new Error(`Missing anchor: ${value}`);
  } else if (!value.startsWith('http') && !fs.existsSync(path.join(root, value))) throw new Error(`Missing asset: ${value}`);
}
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', 'assets']) fs.cpSync(path.join(root, file), path.join(root, 'dist', file), { recursive: true });
console.log('Static build complete. All local assets and navigation anchors verified.');
