import { defineConfig, sharpImageService } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import markdown from './integrations/markdown.mjs';
import ogImages from './integrations/og-images.mjs';

const branch = process.env.WORKERS_CI_BRANCH;
const previewName = branch?.toLowerCase().replace(/[^a-z0-9-]/g, '-');
const socialOrigin = process.env.PUBLIC_SOCIAL_ORIGIN ||
  (previewName && branch !== 'master'
    ? `https://${previewName}.build-preview.intersection.tw`
    : 'https://build.intersection.tw');

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
  session: false,
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) =>
        page !== 'https://build.intersection.tw/naming-conventions'
    }),
    mdx(),
    markdoc(),
    markdown(),
    ogImages()
  ],
  site: 'https://build.intersection.tw/',
  trailingSlash: 'never',
  vite: {
    define: {
      'import.meta.env.PUBLIC_SOCIAL_ORIGIN': JSON.stringify(socialOrigin)
    }
  },
  image: {
    service: sharpImageService()
  },
  redirects: {
    '/moment-with-astro': '/using-astro'
  }
});
