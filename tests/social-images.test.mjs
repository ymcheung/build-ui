import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { load } from 'cheerio';

test('social metadata uses the deployment origin while canonical stays on production', async () => {
  const origin = process.env.EXPECTED_SOCIAL_ORIGIN ?? 'https://build.intersection.tw';
  const $ = load(await readFile(new URL('../dist/client/how-to-favicon/index.html', import.meta.url), 'utf8'));
  for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
    const image = new URL($(selector).attr('content'));
    assert.equal(`${image.origin}${image.pathname}`, `${origin}/og/how-to-favicon.jpg`);
    assert.match(image.searchParams.get('v'), /^[a-f0-9]{12}$/);
  }
  assert.equal($('meta[property="og:url"]').attr('content'), `${origin}/how-to-favicon`);
  assert.equal($('link[rel="canonical"]').attr('href'), 'https://build.intersection.tw/how-to-favicon');
});
