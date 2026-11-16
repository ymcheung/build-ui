import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import { ImageResponse } from '@vercel/og';
import sharp from 'sharp';

const element = (type, style, children) => ({ type, props: { style, children } });

let resources;
export async function renderCover(title, slug) {
  if (!slug) return readFile(new URL('../public/og/home.jpg', import.meta.url));
  resources ??= Promise.all([
    readFile(new URL('./fonts/jf-openhuninn.ttf', import.meta.url)),
    readFile(new URL('./fonts/nunito-sans-latin-500-normal.woff', import.meta.url)),
    readFile(new URL('./assets/wordmark.png', import.meta.url))
  ]);
  const [chinese, latin, wordmark] = await resources;
  let sticker;
  if (slug && /^[a-z0-9-]+$/.test(slug)) {
    try {
      sticker = await readFile(new URL(`../src/assets/${slug}/sticker.svg`, import.meta.url));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  const response = new ImageResponse(
    element('div', {
      display: 'flex', width: '100%', height: '100%', position: 'relative',
      background: '#161719', color: '#f2f3f5', fontFamily: 'Nunito Sans, Open Huninn'
    }, [
      ...(sticker ? [{ type: 'img', props: {
        src: `data:image/svg+xml;base64,${sticker.toString('base64')}`,
        style: { position: 'absolute', left: 40, top: 52, height: 90, maxWidth: 300, objectFit: 'contain' }
      } }] : []),
      element('div', {
        display: 'flex', position: 'absolute', left: 40, top: 180, width: 1120,
        fontSize: 64, lineHeight: 1.2
      }, title),
      { type: 'img', props: {
        src: `data:image/png;base64,${wordmark.toString('base64')}`,
        width: 340, height: 210,
        style: { position: 'absolute', right: 40, bottom: 30 }
      } }
    ]),
    { width: 1200, height: 630, fonts: [
      { name: 'Nunito Sans', data: latin, weight: 500, style: 'normal' },
      { name: 'Open Huninn', data: chinese, weight: 400, style: 'normal' }
    ] }
  );
  return sharp(Buffer.from(await response.arrayBuffer())).jpeg({ quality: 90 }).toBuffer();
}

export async function generateMissingCovers({ dir, pages }) {
  for (const { pathname } of pages) {
    const path = pathname.replace(/^\/+|\/+$/g, '');
    const html = await readFile(new URL(path ? `${path}/index.html` : 'index.html', dir), 'utf8');
    const $ = load(html);
    const image = $('meta[property="og:image"]').attr('content');
    if (!image) continue;
    const imagePath = new URL(image).pathname;
    if (!/^\/og\/[a-zA-Z0-9/_-]+\.jpg$/.test(imagePath)) continue;
    const destination = new URL(`.${imagePath}`, dir);
    try {
      await access(destination);
      continue;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    const title = $('meta[property="og:title"]').attr('content') ?? $('title').text();
    const jpeg = await renderCover(title, path);
    await mkdir(dirname(fileURLToPath(destination)), { recursive: true });
    await writeFile(destination, jpeg);
  }
}

export default function ogImages() {
  return {
    name: 'og-images',
    hooks: { 'astro:build:done': generateMissingCovers }
  };
}
