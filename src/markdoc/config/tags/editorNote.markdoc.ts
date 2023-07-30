import { component } from '@astrojs/markdoc/config';

export default {
  render: component('./src/components/EditorNote.astro'),
  attributes: {
    type: {}
  }
}
