import { component } from '@astrojs/markdoc/config';

export default {
  render: component('./src/components/Logo.astro'),
  attributes: {
    width: {
      type: Number
    },
    ratio: {
      type: Number
    }
  }
};
