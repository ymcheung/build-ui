import { defineConfig } from 'astro/config';
import deno from '@astrojs/deno';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: deno(),
  integrations: [solid()]
});
