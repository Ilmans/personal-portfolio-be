import { Request, Response, NextFunction } from "express";
import ArticleService from "../services/ArticleService";

const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ArticleService.getArticles({
      page: req.params.page ?? 1,
      size: req.params.size ?? 10,
    });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export default { getArticles };
