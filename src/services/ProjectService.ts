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
  const upload = saveImage(request.image, "projects");

  const stacksArray: String[] = request.stacks.split(",");
  const image = "/projects" + upload;
  return db.project.create({
    data: {
      name: request.name,
      slug: slug,
      stacks: JSON.stringify(stacksArray),
      url: request.url,
      image: image,
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

export default { createProject };
