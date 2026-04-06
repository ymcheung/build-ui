/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_INTER_ANALYTICS_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
