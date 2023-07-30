import { component } from '@astrojs/markdoc/config';

export default {
  render: component('./src/components/Image.astro'),
  attributes: {
    description: {
      type: String
    }
  }
}
