import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../ResponseError";

const ErrorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({ errors: err.message }).end();
  } else {
    res.status(500).json({ errors: err.message }).end;
  }
};

export { ErrorMiddleware };
