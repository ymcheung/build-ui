// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// 2. Define your collection(s)
const postCollection = defineCollection(
  {
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      dateModified: z.string(),
      datePublished: z.string(),
      type: z.string(),
      sticker: z.string(),
      draft: z.boolean()
    }),
  }
);
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'posts': postCollection,
};
