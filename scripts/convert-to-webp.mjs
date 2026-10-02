import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, '..', 'src', 'assets');

const targets = [
  'Login.png',
  'Register.png',
  'Forgot.png',
  'Reset.png',
  'verifyotp.png',
];

/**
 * Remove a near-solid background by flood-filling from the image edges.
 * Any pixel connected to an edge whose color is within `tolerance` of the
 * detected background color becomes fully transparent.
 */
async function removeBackground(inputPath, outPath, { tolerance = 32 } = {}) {
  const image = sharp(inputPath).ensureAlpha();
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const px = width * height;

  // Sample the four corners to determine the background color.
  const sampleIdx = [
    0,
    (width - 1) * channels,
    (height - 1) * width * channels,
    (px - 1) * channels,
  ];
  let r = 0,
    g = 0,
    b = 0;
  for (const i of sampleIdx) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  r = Math.round(r / 4);
  g = Math.round(g / 4);
  b = Math.round(b / 4);

  const tol2 = tolerance * tolerance * 3;
  const isBg = (i) => {
    const dr = data[i] - r;
    const dg = data[i + 1] - g;
    const db = data[i + 2] - b;
    return dr * dr + dg * dg + db * db <= tol2;
  };

  // BFS flood fill from all edge pixels.
  const visited = new Uint8Array(px);
  const queue = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    const i = p * channels;
    if (!isBg(i)) return;
    visited[p] = 1;
    queue.push(p);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const p = queue[head++];
    const x = p % width;
    const y = (p - x) / width;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  for (let p = 0; p < px; p++) {
    if (visited[p]) {
      data[p * channels + 3] = 0;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(outPath);

  return { width, height, bg: `rgb(${r},${g},${b})` };
}

const files = await readdir(assetsDir);
for (const name of targets) {
  if (!files.includes(name)) continue;
  const inputPath = path.join(assetsDir, name);
  const outName = name.replace(/\.png$/i, '.webp');
  const outPath = path.join(assetsDir, outName);
  const meta = await removeBackground(inputPath, outPath);
  console.log(`✔ ${name} -> ${outName} (${meta.width}x${meta.height}, bg ${meta.bg})`);
}
console.log('Done.');
