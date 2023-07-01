import { Category } from "@prisma/client";
import { db } from "../app/database";

async function get(): Promise<Category[]> {
  const data = await db.category.findMany({
    select: { name: true, id: true },
  });
  return data;
}

export default { get };
