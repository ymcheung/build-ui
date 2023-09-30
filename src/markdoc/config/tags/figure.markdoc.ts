import { component } from '@astrojs/markdoc/config';

export default {
  render: component('./src/components/Figure.astro'),
  attributes: {
    description: {
      type: String
    }
  }
};
