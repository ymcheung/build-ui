import { next } from '@vercel/functions';
import pages from './.astro/agent-markdown.json';
import { acceptsMarkdown, varyAccept } from './src/lib/markdown-negotiation';

const markdownPages = new Map(Object.entries(pages));

export default function middleware(request: Request): Response {
  const pathname = new URL(request.url).pathname.replace(/\/+$/, '') || '/';
  const markdown = markdownPages.get(pathname);
  const headers = new Headers();
  varyAccept(headers);

  if ((request.method === 'GET' || request.method === 'HEAD') &&
      acceptsMarkdown(request.headers.get('Accept')) && typeof markdown === 'string') {
    headers.set('Content-Type', 'text/markdown; charset=utf-8');
    return new Response(request.method === 'HEAD' ? null : markdown, { headers });
  }

  return next({ headers });
}

export const config = {
  matcher: '/((?!_astro/|.*\\.).*)'
};
