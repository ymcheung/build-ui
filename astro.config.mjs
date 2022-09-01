import { defineConfig } from 'astro/config';
import deno from '@astrojs/deno';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: deno(),
  integrations: [solid(), sitemap(), mdx()],
  markdown: {
    syntaxHighlight: 'prism'
  },
  site: 'https://build.intersection.tw',
  trailingSlash: 'never'
});
