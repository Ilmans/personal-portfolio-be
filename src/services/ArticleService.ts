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

export default { getArticles };
