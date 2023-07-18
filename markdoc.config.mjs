import { defineMarkdocConfig } from '@astrojs/markdoc/config';
import * as nodes from './src/markdoc/config/nodes';
import * as tags from './src/markdoc/config/tags';

const config = defineMarkdocConfig({
  nodes,
  tags
})
export default config;
