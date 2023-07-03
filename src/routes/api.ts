import express from "express";
import ArticleController from "../controllers/ArticleController";
import { authMiddleware } from "../middleware/AuthMiddleware";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);
apiRouter.post("/articles/create", ArticleController.createArticle);
apiRouter.patch("/articles", ArticleController.updateArticle);
apiRouter.delete("/articles", ArticleController.deleteArticle);
