import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { load } from 'cheerio';

test('social metadata uses the deployment origin while canonical stays on production', async () => {
  const origin = process.env.EXPECTED_SOCIAL_ORIGIN ?? 'https://build.intersection.tw';
  const $ = load(await readFile(new URL('../dist/client/how-to-favicon/index.html', import.meta.url), 'utf8'));
  for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
    assert.equal($(selector).attr('content'), `${origin}/og/how-to-favicon.jpg`);
  }
  assert.equal($('meta[property="og:url"]').attr('content'), `${origin}/how-to-favicon`);
  assert.equal($('link[rel="canonical"]').attr('href'), 'https://build.intersection.tw/how-to-favicon');
});
