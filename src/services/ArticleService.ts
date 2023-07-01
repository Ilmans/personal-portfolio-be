import { ResponseError } from "../ResponseError";
import { db } from "../app/database";

const getArticles = async (request: any) => {
  const skip: number = (request.page - 1) * request.size;
  const articles = await db.article.findMany({
    skip: skip,
    take: request.size,

    include: {
      category: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          full_name: true,
        },
      },
    },
  });
  const articlesCount = await db.article.count();

  return {
    data: articles,
    paging: {
      page: request.page,
      total_item: articlesCount,
      total_page: Math.ceil(articlesCount / request.size),
    },
  };
};

const getPopularArticles = async () => {
  return db.article.findMany({
    take: 5,
    select: {
      title: true,
      slug: true,
    },
    orderBy: {
      views: "desc",
    },
  });
};

const showArticle = async (slug: string) => {
  const article = await db.article.findFirst({
    where: { slug: slug },
    include: {
      category: { select: { name: true } },
      author: { select: { full_name: true } },
    },
  });
  if (!article) throw new ResponseError(404, "Article is not found");
  await db.article.update({
    where: { slug: slug },
    data: { views: article?.views + 1 },
  });
  return article;
};

export default { getArticles, showArticle, getPopularArticles };
