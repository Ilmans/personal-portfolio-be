import Joi from "joi";
import { ResponseError } from "./ResponseError";

export const validate = (schema: Joi.AnySchema, request: Object): any => {
  const validate = schema.validate(request, {
    allowUnknown: false,
    abortEarly: false,
  });

  if (validate.error) {
    throw new ResponseError(400, validate.error.message);
  }
  return validate.value;
};
