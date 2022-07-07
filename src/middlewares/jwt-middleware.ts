import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getOneByUsername } from "../services/users";

export default async function jwtMiddleware(
  req: Request,
  res: Response,
  next: Function
) {
  const accessToken = (req.headers.authorization as string).split(" ")[1];

  try {
    const payload = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );

    if (!(payload as any).trust) {
      throw new Error("Token is not trusted");
    }

    const user = await getOneByUsername((payload as any).username);

    if (!user) {
      const error = new Error("User not found");
      error.name = "INVALID_USERNAME";
      throw error;
    }

    if (!(accessToken === user.accessToken)) {
      const error = new Error("Invalid token");
      error.name = "INVALID_TOKEN";
      throw error;
    }

    req.body._user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}
