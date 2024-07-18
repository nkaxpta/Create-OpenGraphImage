import { z } from "zod";

const zArticle = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.string().datetime(),
  revisedAt: z.string().datetime(),
  categories: z.array(z.string()),
  thumbnail: z.object({
    url: z.string().url(),
  }),
});

export type Article = z.infer<typeof zArticle>;

export type ArticleProps = {
  article: Article;
};
