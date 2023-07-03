import { Article, User } from "@prisma/client";
import { ResponseError } from "../ResponseError";
import { db } from "../app/database";
import { validate } from "../validate";
import {
  createArticleValidation,
  deleteArticleValidation,
} from "../validations/ArticleValidation";
import { string_to_slug } from "../app/helper";

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
    orderBy: {
      id: "desc",
    },
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

const createArticle = async (user: User, request: any) => {
  const data = validate(createArticleValidation, request);
  const slug = string_to_slug(data.title);

  let publish = true;
  const isExists = await db.article.findFirst({ where: { slug: slug } });
  if (isExists)
    throw new ResponseError(401, "Article title already exists in database");
  if (request.publish && request.publish != 1) publish = false;
  return db.article.create({
    data: {
      title: data.title,
      slug: slug,
      categoryId: data.categoryId,
      body: data.body,
      published: publish,
      createdAt: new Date(),
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
    },
  });
};

const deleteArticle = async (user: User, request: any) => {
  const { articleId } = validate(deleteArticleValidation, request);
  

  const check = await db.article.findFirst({
    where: { AND: { authorId: user.id, id: articleId } },
  });
  if (!check) throw new ResponseError(404, "Article doesn't found");
  return db.article.delete({
    where: { id: articleId },
  });
};

export default {
  getArticles,
  showArticle,
  getPopularArticles,
  createArticle,
  deleteArticle,
};
