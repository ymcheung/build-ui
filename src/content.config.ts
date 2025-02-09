import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const postCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/data/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dateModified: z.date(),
    datePublished: z.date(),
    hasSticker: z.boolean(),
    stickerAlt: z.string().optional(),
    draft: z.boolean()
  })
  // schema: ({ image }) =>
  //   z.object({
  //     title: z.string(),
  //     description: z.string(),
  //     dateModified: z.date(),
  //     datePublished: z.date(),
  //     sticker: image().optional(),
  //     stickerAlt: z.string().optional(),
  //     draft: z.boolean()
  //   })
});
const pageCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/data/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dateModified: z.date(),
    datePublished: z.date(),
    draft: z.boolean()
  })
});

export const collections = {
  posts: postCollection,
  pages: pageCollection
};
