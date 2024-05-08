import { defineConfig, sharpImageService } from 'astro/config';
// import deno from '@astrojs/deno';
import sitemap from '@astrojs/sitemap';
// import mdx from '@astrojs/mdx';
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
      // customPages: [
      //   'https://build.intersection.tw/zed-editor',
      //   'https://build.intersection.tw/chakra-ui-with-react-hook-form',
      //   'https://build.intersection.tw/mdx-typescript',
      //   'https://build.intersection.tw/analytics-tool-splitbee',
      //   'https://build.intersection.tw/css-in-js-stitches',
      //   'https://build.intersection.tw/using-astro',
      //   'https://build.intersection.tw/react-i18next',
      //   'https://build.intersection.tw/remix-with-mdx-bundler',
      //   'https://build.intersection.tw/how-to-favicon',
      //   'https://build.intersection.tw/translations',
      //   'https://build.intersection.tw/ui-translations'
      // ]
    }),
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
