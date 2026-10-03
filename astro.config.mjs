import { defineConfig, sharpImageService } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
  compressHTML: true,
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
