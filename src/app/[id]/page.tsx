import { getArticlesList } from "~/lib/client";
import { Article as ArticleType } from "~/lib/type";
import { writeOgpImage } from "./createimage";

export const generateStaticParams = async () => {
  const { contents } = await getArticlesList();

  for (let post of contents) {
    await writeOgpImage(post.title, post.id);
  }

  return contents.map((article: ArticleType) => ({
    id: article.id,
  }));
};

// paramsはurlのid部分を出力する
const Page = async () => {};

export default Page;
