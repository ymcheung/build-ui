import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection(
  {
    type: 'content',
    schema: ({ image }) => z.object({
      title: z.string(),
      description: z.string(),
      dateModified: z.date(),
      datePublished: z.date(),
      sticker: image().optional(),
      stickerAlt: z.string().optional(),
      draft: z.boolean()
    }),
  }
);
const pageCollection = defineCollection(
  {
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      dateModified: z.date(),
      datePublished: z.date()
    }),
  }
);

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'posts': postCollection,
  'pages': pageCollection
};
