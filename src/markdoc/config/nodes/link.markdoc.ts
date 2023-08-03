import { nodes, component } from '@astrojs/markdoc/config';

export default {
  ...nodes.link,
  render: component('./src/components/Link.astro')
};
