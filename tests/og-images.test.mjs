import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { generateMissingCovers } from '../integrations/og-images.mjs';

test('Astro can optimize images after the OG generator loads Sharp', async () => {
  const requireFromAstro = createRequire(import.meta.resolve('astro'));
  const astroSharp = requireFromAstro('sharp');
  const image = await sharp({ create: {
    width: 8, height: 8, channels: 3, background: '#161719'
  } }).png().toBuffer();
  const resized = await astroSharp(image).resize(4, 4).png().toBuffer();
  assert.equal((await sharp(resized).metadata()).width, 4);
});

test('missing Chinese covers are generated and existing covers are preserved', async () => {
  const root = await mkdtemp(join(tmpdir(), 'og-images-'));
  try {
    const dir = pathToFileURL(`${root}/`);
    await mkdir(new URL('article/', dir));
    await writeFile(new URL('article/index.html', dir), '<meta property="og:image" content="https://build.intersection.tw/og/article.jpg"><meta property="og:title" content="繁體中文標題"><meta property="og:description" content="文章摘要">');
    const build = { dir, pages: [{ pathname: '/article/' }] };
    await generateMissingCovers(build);
    const image = await readFile(new URL('og/article.jpg', dir));
    const metadata = await sharp(image).metadata();
    assert.equal(metadata.width, 1200);
    assert.equal(metadata.height, 630);
    assert.equal(metadata.format, 'jpeg');
    const pixel = async (left, top) => [...await sharp(image)
      .extract({ left, top, width: 1, height: 1 }).raw().toBuffer()];
    assert.deepEqual(await pixel(0, 0), [22, 23, 25]);
    const yellow = await pixel(1050, 400);
    assert.ok(yellow[0] > 220 && yellow[1] > 220 && yellow[2] < 210,
      'the original yellow UI wordmark stays in the lower-right corner');
    await writeFile(new URL('og/article.jpg', dir), 'original cover');
    await generateMissingCovers(build);
    assert.equal(await readFile(new URL('og/article.jpg', dir), 'utf8'), 'original cover');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
