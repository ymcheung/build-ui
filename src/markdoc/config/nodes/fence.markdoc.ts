import Code from '../../components/Code.astro';

export default {
  render: Code,
  attributes: {
    content: { type: String, render: 'code', required: true },
    language: { type: String, render: 'lang' },
  },
}
