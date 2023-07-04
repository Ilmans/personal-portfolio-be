import { Request, Response, NextFunction } from "express";
import ProjectService from "../services/ProjectService";

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ProjectService.createProject(req.body);
    res.status(200).send({ data: result });
  } catch (error) {
    next(error);
  }
};

export default { createProject };
