import Joi from "joi";


export const createProjectValidation = Joi.object({
  image: Joi.string().required(),
  stacks: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  url: Joi.string(),
});
