import {
  Link
} from '@remix-run/react';

import { styled, css } from '~/styles/stitches.config';
import { Container, ListItem } from '~/utils/layout';

const Section = styled('section', {
  fontFamily: '$default',

  variants: {
    responsive: {
      tablet: {
        marginX: '$16'
      }
    },
    position: {
      roof: {
        alignSelf: 'start',
        position: 'sticky',
        top: '144px'
      }
    }
  }
});

const LinkList = styled('ul', {
  display: 'grid',
  grid: 'auto / repeat(auto-fill, minmax(120px, 1fr))',
  justifyContent: 'center',
  justifyItems: 'center',
  margin: '0 0 $24',
  padding: 0,

  variants: {
    responsive: {
      desktop: {
        grid: 'none',
        justifyContent: 'normal',
        justifyItems: 'normal',
        rowGap: '$16'
      }
    }
  }
});

const footerLink = css({
  display: 'inline-block',
  padding: '$8 0 $16',
  color: 'hsl($shade150)',
  fontSize: '$16',
  lineHeight: '16px',
  textDecoration: 'none'
});

const Intersection = styled('figure', {
  display: 'grid',
  grid: '24px / 24px max-content',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: '$8',
  margin: '0 0 $16',
  padding: 0
});

const IntersectionLogo = styled('img', {
  size: '$24',
  borderRadius: '4px'
});

const IntersectionName = styled('figcaption', {
  paddingTop: '$2',
  color: 'hsl($shade150)',
  fontSize: '$14',
  fontWeight: 700,
  fontStyle: 'italic',
  letterSpacing: '6px',
  lineHeight: '16px',
  textTransform: 'uppercase'
});

const Message = styled('p', {
  margin: '0 0 $4',
  color: 'hsl($shade130)',
  fontSize: '$14',
  lineHeight: '20px'
});

const ProfileLinksList = styled('ul', {
  display: 'grid',
  grid: 'auto / auto auto',
  justifyContent: 'center',
  columnGap: '$16',
  margin: 0,
  padding: 0
});

const ProfileLink = styled('a', {
  display: 'block',
  padding: '$12 $4'
});

const ProfileIcon = styled('svg', {
  size: '$24'
});

export default function Footer() {

  return(
    <Container as="footer" responsive={{ '@initial': 'mobile', '@m768': 'tablet' }} area="footer" footer={{ '@m992': 'desktop' }} floor="ground">
      <Section as="nav" responsive={{ '@m768': 'tablet' }} position={{ '@m768': 'roof' }}>
        <LinkList responsive={{ '@m992': 'desktop' }}>
          <ListItem nomark>
            <Link className={footerLink()} to="/translations" prefetch="intent">
              ?????? ??????????????????
            </Link>
          </ListItem>
          <ListItem nomark>
            <a className={footerLink()} href="https://intersection.tw" target="_blank" rel="noopener">
              ???? ??????????????????
            </a>
          </ListItem>
        </LinkList>
      </Section>
      <Section responsive={{ '@m768': 'tablet' }}>
        <Intersection>
          <IntersectionLogo src="/intersection.svg" alt="?????? (Logo)" />
          <IntersectionName>Intersection</IntersectionName>
        </Intersection>
        <Message>
          ?????????????????????????????????????????????????????????????????????????????????????????????
        </Message>
        <ProfileLinksList>
          <ListItem nomark>
            <ProfileLink href="https://ymcheung.tw" target="_blank" rel="noopener">
              <ProfileIcon>
                <title>ymcheung ???????????????</title>
                <use href="/images/profileIcons.svg#ymcheungTw" />
              </ProfileIcon>
            </ProfileLink>
          </ListItem>
          <ListItem nomark>
            <ProfileLink href="https://github.com/ymcheung" target="_blank" rel="noopener">
              <ProfileIcon>
                <title>ymcheung ??? Github ??????</title>
                <use href="/images/profileIcons.svg#github" />
              </ProfileIcon>
            </ProfileLink>
          </ListItem>
        </ProfileLinksList>
      </Section>
    </Container>
  )
}
