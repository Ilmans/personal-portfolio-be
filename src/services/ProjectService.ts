import { User } from "@prisma/client";
import { validate } from "../validate";
import { createProjectValidation } from "../validations/ProjectValidation";
import { saveImage, string_to_slug } from "../app/helper";
import { db } from "../app/database";
import { ResponseError } from "../ResponseError";

interface RequestData {
  name: string;
  stacks: string;
  image: string;
  description: string;
  url: string;
}
const createProject = async (request: RequestData) => {
  request = validate(createProjectValidation, request);
  const slug = string_to_slug(request.name);
  const check = await db.project.findFirst({ where: { slug: slug } });
  if (check)
    throw new ResponseError(401, "Project with the name same already exists");
  const upload = saveImage(request.image, "uploads");

  const stacksArray: String[] = request.stacks.split(",");

  return db.project.create({
    data: {
      name: request.name,
      slug: slug,
      stacks: JSON.stringify(stacksArray),
      url: request.url,
      image: upload,
      description: request.description,
    },
    select: {
      id: true,
      name: true,
      stacks: true,
      description: true,
      image: true,
    },
  });

  // upload image
};

const getProjects = async (request: any) => {
  const skip: number = (request.page - 1) * request.size;
  const projects = await db.project.findMany({
    skip: skip,
    take: request.size,
    orderBy: { id: "desc" },
  });
  const projectsCount = await db.project.count();
  return {
    data: projects,
    paging: {
      page: request.page,
      total_item: projectsCount,
      total_page: Math.ceil(projectsCount / request.size),
    },
  };
};

const deleteProject = async (id: any) => {
  return db.project.delete({
    where: { id: id },
  });
};

export default { createProject, getProjects, deleteProject };
