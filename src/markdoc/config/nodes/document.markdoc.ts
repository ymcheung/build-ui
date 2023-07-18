import markdoc from '@markdoc/markdoc';
const { nodes } = markdoc;

export default {
  ...nodes.document,
  render: null
};
