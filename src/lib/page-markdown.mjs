import { load } from 'cheerio';
import TurndownService from 'turndown';

export function pageMarkdown(html) {
  const $ = load(html);
  const main = $('main').first();
  if (!main.length) return null;

  main.find('script, style, nav, .discussions, [aria-hidden="true"]').remove();
  const converter = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
  converter.addRule('codeBlocks', {
    filter: 'pre',
    replacement(_content, node) {
      const code = node.querySelector('code');
      const text = (code ?? node).textContent ?? '';
      const language = code?.className.match(/language-(\S+)/)?.[1] ?? '';
      const runs = text.match(/`+/g) ?? [];
      const fence = '`'.repeat(Math.max(3, ...runs.map((run) => run.length + 1)));
      return `\n\n${fence}${language}\n${text.trimEnd()}\n${fence}\n\n`;
    }
  });

  const title = main.find('h1').length ? '' : `# ${$('h1').first().text() || $('title').text()}\n\n`;
  return `${title}${converter.turndown(main.html() ?? '')}\n`;
}
