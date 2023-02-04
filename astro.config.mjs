import { defineConfig } from 'astro/config';
import deno from '@astrojs/deno';
// import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: deno(),
  integrations: [
    // solid(),
    sitemap({
      customPages: [
        'https://build.intersection.tw/chakra-ui-with-react-hook-form',
        'https://build.intersection.tw/mdx-typescript',
        'https://build.intersection.tw/analytics-tool-splitbee',
        'https://build.intersection.tw/css-in-js-stitches',
        'https://build.intersection.tw/moment-with-astro',
        'https://build.intersection.tw/react-i18next',
        'https://build.intersection.tw/remix-with-mdx-bundler',
        'https://build.intersection.tw/translations',
      ],
    }),
    mdx(),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'dracula',
      langs: [],
      wrap: true,
    },
  },
  site: 'https://build.intersection.tw/',
  trailingSlash: 'never',
});
