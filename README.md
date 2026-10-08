# 喜歡的 UI 就要親手做出來

https://build.intersection.tw

這個部落格以 [Astro](https://astro.build) 提供的 Markdocs 功能建立。

發布至 [Cloudflare Workers](https://workers.cloudflare.com)，使用自訂網域 `build.intersection.tw`。

使用 Node.js 22.12.0 以上版本及 pnpm。

```sh
pnpm install
pnpm dev
```

檢查、建置及預覽：

```sh
pnpm check
pnpm build
pnpm preview
```

部署前，請先登入具有 `intersection.tw` 網域管理權限的 Cloudflare 帳號：

```sh
pnpm exec wrangler login
pnpm deploy
```

`wrangler.jsonc` 已設定自訂網域。`intersection.tw` 必須是該帳號中已啟用的 Cloudflare zone；部署時 Wrangler 會設定網域與 TLS 憑證。若 `build.intersection.tw` 已有 CNAME 記錄，請先移除該記錄再部署。

Git 自動部署使用 Cloudflare Workers Builds。請在 Cloudflare 的 Workers & Pages 中選擇 `build-ui-astro`，前往 Settings > Builds，連接 GitHub 儲存庫 `ymcheung/build-ui`，並設定：

| 設定 | 值 |
| --- | --- |
| Production branch | `master` |
| Root directory | `/` |
| Build command | `pnpm check && pnpm build` |
| Deploy command | `pnpm exec wrangler deploy` |
| Preview command | `pnpm exec wrangler preview` |
| Enable Preview Builds | 啟用所有非正式分支 |

若既有專案顯示 Set up Worker Previews，請先完成該設定，使用新的 `wrangler preview` 部署方式。

推送至 `master` 會更新 `https://build.intersection.tw`；其他分支使用 `https://<preview-name>.build-preview.intersection.tw`。例如 `staging` 分支的預覽網址為 `https://staging.build-preview.intersection.tw`。Wrangler 會將分支名稱轉為可用於網址的預覽名稱；同一分支再次推送會更新相同網址。

`wrangler.jsonc` 將 `build-preview.intersection.tw` 設為僅供預覽使用的自訂網域。正式部署執行 `wrangler deploy` 後，Cloudflare 會套用此設定，建立預覽所需的萬用字元 DNS 與 SSL 憑證。首次建立預覽後，憑證簽發可能需要一些時間。

本機部署目前分支的預覽：

```sh
pnpm deploy:preview
```

預覽網址透過 `public/_headers` 加上 `X-Robots-Tag: noindex, nofollow`。正式網址與 canonical URL 維持 `https://build.intersection.tw`。

參考 [Workers GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/)、[Worker Preview custom domains](https://developers.cloudflare.com/workers/previews/custom-domains/)。

分析服務使用建置時的環境變數 `PUBLIC_CHUNGLI_ANALYTICS_SITE_KEY` 與 `PUBLIC_VITE_LOGSPOT_PUBLIC_KEY`。請在 Cloudflare Workers Builds 的建置環境中設定；本機可使用 `.env`。只有正式建置且已設定 `PUBLIC_CHUNGLI_ANALYTICS_SITE_KEY` 時才會載入分析程式。

On Vercel deployments, agents can request the same page URL with `Accept: text/markdown`:

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

The Cloudflare deployment does not run the Vercel routing middleware, so Markdown content negotiation is currently unavailable there.
