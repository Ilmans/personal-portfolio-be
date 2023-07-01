import express from "express";
import ArticleController from "../controllers/ArticleController";

export const publicRouter = express.Router();

publicRouter.get("/articles", ArticleController.getArticles);
publicRouter.get("/articles/popular", ArticleController.getPopularArticles);
publicRouter.get("/article/:slug", ArticleController.showArticle);
