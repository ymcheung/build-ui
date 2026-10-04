import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';
import { pageMarkdown } from '../src/lib/page-markdown.mjs';

const negotiationSource = await readFile(new URL('../src/lib/markdown-negotiation.ts', import.meta.url), 'utf8');
const negotiationUrl = `data:text/javascript;base64,${Buffer.from(ts.transpileModule(negotiationSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext }
}).outputText).toString('base64')}`;
const { acceptsMarkdown, varyAccept } = await import(negotiationUrl);
const pages = JSON.parse(await readFile(new URL('../.astro/agent-markdown.json', import.meta.url), 'utf8'));
const middlewareSource = (await readFile(new URL('../middleware.ts', import.meta.url), 'utf8'))
  .replace("import pages from './.astro/agent-markdown.json';", `const pages = ${JSON.stringify(pages)};`)
  .replace("'./src/lib/markdown-negotiation'", JSON.stringify(negotiationUrl));
const { default: middleware } = await import(`data:text/javascript;base64,${Buffer.from(ts.transpileModule(middlewareSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext }
}).outputText.replace("'@vercel/functions'", JSON.stringify(import.meta.resolve('@vercel/functions')))).toString('base64')}`);

test('only explicitly accepted Markdown selects the representation', () => {
  for (const header of [null, '*/*', 'text/html', 'text/markdown;q=0', 'text/markdown;q=invalid']) {
    assert.equal(acceptsMarkdown(header), false, String(header));
  }
  for (const header of ['text/markdown', 'text/html, text/markdown;q=0.8', 'TEXT/MARKDOWN; charset=utf-8']) {
    assert.equal(acceptsMarkdown(header), true, header);
  }
  const headers = new Headers({ Vary: 'Accept-Encoding' });
  varyAccept(headers);
  varyAccept(headers);
  assert.equal(headers.get('Vary'), 'Accept-Encoding, Accept');
});

test('conversion preserves content and removes page controls', () => {
  const result = pageMarkdown('<header><h1>Site</h1></header><main><h1>Article</h1><style>css</style><script>js</script><h2>Section</h2><p><a href="/other">Link</a><img src="/image.png" alt="Photo"></p><pre><code class="language-js">const x = `value`;\n\nconsole.log(x);</code></pre><div class="discussions">Discuss</div></main>');
  assert.match(result, /^# Article/);
  assert.match(result, /## Section/);
  assert.match(result, /\[Link\]\(\/other\)/);
  assert.match(result, /!\[Photo\]\(\/image.png\)/);
  assert.match(result, /```js\nconst x = `value`;\n\nconsole.log\(x\);\n```/);
  assert.doesNotMatch(result, /css|Discuss|<script>|<style>/);
});

test('built pages and production middleware negotiate GET and HEAD', async () => {
  for (const path of ['/', '/using-astro', '/translations']) {
    assert.equal(typeof pages[path], 'string', path);
  }
  for (const [path, content] of Object.entries(pages)) {
    assert.match(content, /^# /, path);
    const response = middleware(new Request(`https://example.com${path}`, { headers: { Accept: 'text/markdown' } }));
    assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
    assert.equal(response.headers.get('Vary'), 'Accept');
    assert.equal(await response.text(), content);
  }
  const head = middleware(new Request('https://example.com/using-astro/', { method: 'HEAD', headers: { Accept: 'text/markdown' } }));
  assert.equal(head.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(await head.text(), '');
  const post = middleware(new Request('https://example.com/using-astro', { method: 'POST', headers: { Accept: 'text/markdown' } }));
  assert.equal(post.headers.get('x-middleware-next'), '1');
  for (const [path, accept] of [['/using-astro', 'text/html'], ['/using-astro', '*/*'], ['/using-astro', 'text/markdown;q=0'], ['/missing', 'text/markdown'], ['/favicon.ico', 'text/markdown']]) {
    const response = middleware(new Request(`https://example.com${path}`, { headers: { Accept: accept } }));
    assert.equal(response.headers.get('x-middleware-next'), '1');
    assert.equal(response.headers.get('Vary'), 'Accept');
  }
});
