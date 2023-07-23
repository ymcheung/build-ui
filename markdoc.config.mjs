import { defineMarkdocConfig } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';
import * as nodes from './src/markdoc/config/nodes';
// import * as tags from './src/markdoc/config/tags';

// const config = defineMarkdocConfig({
//   nodes,
//   tags
// })
// export default config;

export default defineMarkdocConfig({
  nodes,
  extends: [
    shiki({
      theme: 'dracula',
      wrap: true,
      // Pass custom languages
      // Note: Shiki has countless langs built-in, including `.astro`!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
    }),
  ],
});
