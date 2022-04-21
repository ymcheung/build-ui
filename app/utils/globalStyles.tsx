import { globalCss } from '~/styles/stitches.config';

const globalStyles = globalCss({
  html: {
    boxSizing: 'border-box',
    fontSize: '62.5%'
  },

  '*, *::before, *::after': {
    boxSizing: 'inherit'
  },

  body: {
    overflowY: 'scroll',
    margin: 0,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    backgroundColor: 'hsl($shade10)'
  }
});

export default globalStyles;
