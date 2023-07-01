import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/CategoryService";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoryService.get();
    res.status(200).send({ data: result });
  } catch (error) {
    next(error);
  }
};

export default { get };
