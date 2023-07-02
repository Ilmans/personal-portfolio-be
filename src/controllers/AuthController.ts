import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);
    const result = await AuthService.login(req.body);

    res.status(200).send({ data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default { login };
