import { ResponseError } from "../ResponseError";
import { db } from "../app/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "../validate";
import { loginValidation } from "../validations/AuthValidation";

const login = async (request: {
  username: string;
  password: string;
}): Promise<Object> => {
  const { username, password } = validate(loginValidation, request);
  console.log("a");
  const checkUser: any = await db.user.findFirst({
    where: { username },
    select: {
      id: true,
      username: true,
      email: true,
      full_name: true,
      password: true,
    },
  });
  if (!checkUser) throw new ResponseError(404, "Invalid credentials");
  const validatePassword: boolean = bcrypt.compareSync(
    password,
    checkUser.password
  );
  if (!validatePassword) throw new ResponseError(404, "Invalid credentials");
  delete checkUser.password;
  const token = jwt.sign(
    { ...checkUser, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    "secret-key"
  );

  return {
    ...checkUser,
    token,
  };
};

export default { login };
