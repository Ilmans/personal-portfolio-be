import { Request, Response, NextFunction } from "express";
import ArticleService from "../services/ArticleService";

const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {

    
 const result = await ArticleService.getArticles({
   page: req.query.page ?? 1,
   size: req.query.size ?? 10,
   search: req.query.search ?? "",
 });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const showArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ArticleService.showArticle(req.params.slug);
    res.status(200).send({ data: result });
  } catch (error) {
    next(error);
  }
};
const getPopularArticles = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ArticleService.getPopularArticles();
    res.status(200).send({ data: result });
  } catch (error) {
    next(error);
  }
};
const createArticle = async (req: any, res: Response, next: NextFunction) => {
  try {
    const result = await ArticleService.createArticle(req.user, req.body);
    res.status(200).send({ data: result });
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req: any, res: Response, next: NextFunction) => {
  try {
    await ArticleService.deleteArticle(req.user, req.body);
    res.status(200).send({ data: "OK" });
  } catch (error) {
    console.log("a")
    next(error);
  }
};

export default {
  getArticles,
  showArticle,
  getPopularArticles,
  createArticle,
  deleteArticle,
};
