import markdoc from '@markdoc/markdoc';

const { Tag } = markdoc;

export default {
  render: 'code',
  attributes: {
    content: { type: String, render: false, required: true },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    return new Tag('code', attributes, [node.attributes.content])
  }
}
