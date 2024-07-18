import { Article } from "./type";
import { createClient } from "microcms-js-sdk";

const envObj = {
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
};

export const client = createClient(envObj);

// ----------------------------------------------
// ブログ一覧を取得
// ----------------------------------------------
export const getArticlesList = async () => {
  const articlesList = await client.getList<Article>({
    endpoint: "blog",
  });

  return articlesList;
};
