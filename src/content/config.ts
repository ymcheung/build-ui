import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection(
  {
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      dateModified: z.string(),
      datePublished: z.string(),
      sticker: z.string(),
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
      dateModified: z.string(),
      datePublished: z.string()
    }),
  }
);

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'posts': postCollection,
  'pages': pageCollection
};
