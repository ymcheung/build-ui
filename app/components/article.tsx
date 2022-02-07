import { styled } from '~/stitches.config';
import { ListItem } from '~/utils/layout';

export const Article = styled('article', {
  color: 'hsl($shade150)',
  fontFamily: '$default',

  '& img': {
    maxWidth: '100%',
    margin: '0 0 $8'
  },

  '& li img': {
    paddingTop: '$8'
  },

  '& pre': {
    margin: '0 0 $16',
    fontSize: '$16'
  }
});

export const Paragraph = styled('p', {
  margin: '0 0 $16',
  fontSize: '$16',
});

export const AnchorLink = styled('a', {
  color: 'hsl($accent)'
});

export const Heading = styled('h2', {
  variants: {
    purpose: {
      index: {
        margin: '0 0 $12',
        color: 'hsl($shade150)',
        fontSize: '2.4rem',
        lineHeight: '32px'
      },
      articleName: {
        margin: '0 0 $24',
        fontSize: '3.2rem',
        lineHeight: '40px',
      },
      lv2: {
        margin: '0 0 $8',
        paddingTop: '$16',
        fontSize: '2.4rem',
        lineHeight: '28px'
      },
      lv3: {
        margin: '0 0 $8',
        fontSize: '2rem',
        lineHeight: '24px'
      }
    }
  }
});

export const LayoutAsList = styled('ul', {
  display: 'grid',
  rowGap: '$8',
  margin: '0 0 $16',
  padding: '0 0 0 $16'
});

export const LayoutAsItem = styled(ListItem, {
  fontSize: '$16'
});

export const ArticleDescription = styled('p', {
  margin: '0 0 $16',
  color: 'hsl($shade130)',
  fontSize: '$16',
  lineHeight: '24px'
});

export const CodeInline = styled('code', {
  display: 'inline-block',
  padding: '0 $4',
  color: 'hsl($decor)',
  border: '1px solid hsl($shade20)',
  borderRadius: '4px'
});
