import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export const authMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
): void => {
  const token = req.get("Authorization");
  if (!token) {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    verifyToken(token, "secret-key")
      .then((user) => {
        req.user = user;
      })
      .catch(() => {
        res
          .status(401)
          .json({
            errors: "Unauthorized",
          })
          .end();
      });
  }
};

const verifyToken = (
  token: string,
  secret: string
): Promise<JwtPayload | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: any | null, decoded: any | undefined) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(decoded);
      }
    });
  });
};
