import Joi, { string } from "joi";

export const createArticleValidation = Joi.object({
  title: Joi.string().min(10).max(100).required(),
  categoryId: Joi.number().required(),
  body: Joi.string().min(100).required(),
  published: Joi.number().optional(),
});

export const deleteArticleValidation = Joi.object({
  articleId: Joi.number().required(),
});
