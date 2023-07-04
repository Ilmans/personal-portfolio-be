import express from "express";
import ArticleController from "../controllers/ArticleController";

import { authMiddleware } from "../middleware/AuthMiddleware";
import ProjectController from "../controllers/ProjectController";
export const apiRouter = express.Router();
apiRouter.use(authMiddleware);
apiRouter.post("/articles/create", ArticleController.createArticle);
apiRouter.patch("/articles", ArticleController.updateArticle);
apiRouter.delete("/articles", ArticleController.deleteArticle);



apiRouter.post("/projects", ProjectController.createProject);
apiRouter.delete("/projects", ProjectController.deleteProject);

