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
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'dracula',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  site: 'https://build.intersection.tw',
  trailingSlash: 'never',
});
