import { defineConfig, sharpImageService } from 'astro/config';
// import deno from '@astrojs/deno';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
// import svelte from "@astrojs/svelte";
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // adapter: deno(),
  integrations: [
    sitemap({
      filter: (page) =>
        page !== 'https://build.intersection.tw/naming-conventions'
    }),
    mdx(),
    markdoc()
  ],
  site: 'https://build.intersection.tw/',
  trailingSlash: 'never',
  image: {
    service: sharpImageService()
  },
  redirects: {
    '/moment-with-astro': '/using-astro'
  }
});
