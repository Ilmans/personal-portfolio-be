import { ResponseError } from "../ResponseError";
import { db } from "../app/database";

const getArticles = async (request: any) => {
  const skip: number = (request.page - 1) * request.size;
  let filters: any = [];

  if (request.search) {
    const keyword: string = request.search;
    if (keyword.includes("#")) {
      filters = { category: { name: { equals: keyword.replace("#", "") } } };
    } else {
      filters.push({ title: { contains: request.search } });
    }
  }
  const articles = await db.article.findMany({
    where: { AND: filters },
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
  const articlesCount = await db.article.count({
    where: {
      AND: filters,
    },
    skip: skip,
    take: request.size,
  });

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
