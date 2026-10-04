# 喜歡的 UI 就要親手做出來

https://build.intersection.tw

這個部落格以 [Astro](https://astro.build) 提供的 Markdocs 功能建立。

發布至 [Vercel](https://vercel.com)。

Agents can request the same page URL with `Accept: text/markdown`:

```sh
curl -H 'Accept: text/markdown' https://build.intersection.tw/using-astro
```

The response uses `Content-Type: text/markdown; charset=utf-8` and `Vary: Accept`.
Requests without an explicit, nonzero Markdown preference receive HTML.
Markdown retains headings, links, images, and fenced code while removing navigation,
styles, scripts, and discussion controls.

`pnpm build` generates `.astro/agent-markdown.json` from the rendered pages.
The root `middleware.ts` serves these representations through Vercel Routing
Middleware, so the site can keep its static Astro output. Astro's development and
preview servers serve HTML; use a Vercel deployment to verify HTTP negotiation.

Run `pnpm build && pnpm test` to verify the built content and routing middleware.
After deploying, run the [agent readiness scan](https://isitagentready.com/) against
the live site to check `checks.contentAccessibility.markdownNegotiation.status`.
