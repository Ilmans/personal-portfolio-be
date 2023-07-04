import express from "express";
import ArticleController from "../controllers/ArticleController";
import CategoryController from "../controllers/CategoryController";
import AuthController from "../controllers/AuthController";
import ProjectController from "../controllers/ProjectController";

export const publicRouter = express.Router();

publicRouter.post("/login", AuthController.login);
publicRouter.get("/articles", ArticleController.getArticles);
publicRouter.get("/articles/popular", ArticleController.getPopularArticles);
publicRouter.get("/article/:slug", ArticleController.showArticle);

// category
publicRouter.get("/categories", CategoryController.get);

publicRouter.get("/projects", ProjectController.getProjects);
