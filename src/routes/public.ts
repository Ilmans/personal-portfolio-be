import express from "express";
import ArticleController from "../controllers/ArticleController";
import CategoryController from "../controllers/CategoryController";

export const publicRouter = express.Router();

publicRouter.get("/articles", ArticleController.getArticles);
publicRouter.get("/articles/popular", ArticleController.getPopularArticles);
publicRouter.get("/article/:slug", ArticleController.showArticle);

// category
publicRouter.get("/categories", CategoryController.get);
