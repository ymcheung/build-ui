import { component } from '@astrojs/markdoc/config';

export default {
  render: component('./src/components/Blockquote.astro'),
  attributes: {
    name: {
      type: String
    },
    tagline: {
      type: String
    }
  }
}
