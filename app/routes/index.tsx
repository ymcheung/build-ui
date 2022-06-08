import { useLoaderData, Link } from '@remix-run/react';

import * as postSplitbee from '../../content/analytics-tool-splitbee.mdx';
import * as postStitches from '../../content/css-in-js-stitches.mdx';
import * as postAstro from '../../content/moment-with-astro.mdx';
import * as postNaming from '../../content/naming-conventions.mdx';
import * as postI18next from '../../content/react-i18next.mdx';
import * as postRemix from '../../content/remix-with-mdx-bundler.mdx';

import type { MetaFunction, LoaderFunction, LinksFunction } from '@remix-run/node';
import { Timestamp, Heading, ArticleDescription } from '~/components/article';
import { styled } from '~/styles/stitches.config';
import * as CONSTANT from '~/utils/CONSTANTS';
import { ListItem } from '~/utils/layout';

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => ({
  title: CONSTANT.SITENAME,
  description: CONSTANT.SITEDESCRIPTION,
  'og:title': CONSTANT.SITENAME,
  'og:description': CONSTANT.SITEDESCRIPTION,
  'og:url': 'https://build.intersection.tw',
  'og:image': 'https://build.intersection.tw/og.jpg'
})

export const links: LinksFunction = () => [
  {
    rel: 'canonical',
    href: 'https://build.intersection.tw'
  }
];

type mdxData = {
  filename: string,
  attributes: {
    status: string,
    title: string,
    description: string,
    sticker: string,
    dateModified: string
  }
}

type postData = {
  title: string,
  slug: string,
  description: string,
  status: string,
  dateModified: string
}

function postFromModule({ filename, attributes }: mdxData) {
  return {
    title: attributes.title,
    slug: filename.replace(/\.mdx?$/, ""),
    description: attributes.description,
    status: attributes.status,
    dateModified: attributes.dateModified
  };
}

export const loader: LoaderFunction = () =>
  // Return metadata about each of the posts for display on the index page.
  // Referencing the posts here instead of in the Index component down below
  // lets us avoid bundling the actual posts themselves in the bundle for the
  // index page.
  [
  postFromModule(postI18next),
  postFromModule(postStitches),
  postFromModule(postAstro),
  postFromModule(postRemix),
  postFromModule(postSplitbee),
  postFromModule(postNaming)
];

const IndexList = styled('ul', {
  display: 'grid',
  rowGap: '48px',
  margin: 0,
  padding: 0
});

const IndexLink = styled(Link, {
  display: 'block',
  textDecoration: 'none'
});

const Sticker = styled('figure', {
  height: '40px',
  margin: '0 0 $8',
  padding: 0
});

const Action = styled('span', {
  display: 'block',
  width: '100px',
  marginRight: 0,
  marginLeft: 'auto',
  padding: '14px 0 $12',
  color: 'hsl($shade10)',
  fontSize: '1.6rem',
  lineHeight: 1,
  textAlign: 'center',
  backgroundColor: 'hsl($accent)',
  borderRadius: '6px'
});

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const posts = useLoaderData();

  return (
      <IndexList>
      {posts.map(({ title, slug, description, status, dateModified }: postData) => (
        (status === 'published') &&
          <ListItem nomark key={slug}>
            <IndexLink to={slug}>
              <Sticker>
                <img src={`/images/${slug}/sticker.svg`} loading="lazy" alt="" />
              </Sticker>
              <Heading purpose="index">
                {title}
              </Heading>
              <Timestamp responsive={{ '@initial': 'mobile', '@m768': 'tablet' }}>
                {dateModified}
              </Timestamp>
              <ArticleDescription>
                {description}
              </ArticleDescription>
              <Action>
                📃&nbsp;閱讀
              </Action>
            </IndexLink>
          </ListItem>
      ))}
    </IndexList>
  )
}
