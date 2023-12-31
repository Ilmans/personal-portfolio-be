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

const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProjectService.getProjects({
      page: req.query.page ?? 1,
      size: req.query.size ?? 12,
      search: req.query.search ?? "",
    });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ProjectService.deleteProject(req.body.id);
    res.status(200).send({ data: "OK" });
  } catch (error) {
    next(error);
  }
};

export default { createProject, getProjects,deleteProject };
