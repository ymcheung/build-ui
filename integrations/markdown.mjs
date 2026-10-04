import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { pageMarkdown } from '../src/lib/page-markdown.mjs';

export default function markdown() {
  let manifest;
  return {
    name: 'markdown-for-agents',
    hooks: {
      'astro:config:setup': async ({ config }) => {
        const generatedDir = new URL('.astro/', config.root);
        manifest = new URL('agent-markdown.json', generatedDir);
        await mkdir(generatedDir, { recursive: true });
        await access(manifest).catch(() => writeFile(manifest, '{}'));
      },
      'astro:build:done': async ({ dir, pages }) => {
        const entries = [];
        for (const { pathname } of pages) {
          const path = pathname.replace(/^\/+|\/+$/g, '');
          const html = await readFile(new URL(path ? `${path}/index.html` : 'index.html', dir), 'utf8');
          const content = pageMarkdown(html);
          if (content !== null) entries.push([path ? `/${path}` : '/', content]);
        }
        await writeFile(manifest, JSON.stringify(Object.fromEntries(entries)));
      }
    }
  };
}
