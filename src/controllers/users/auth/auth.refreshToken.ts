import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getOneByUsername } from "../../../services/users";
import generateTokens from "./generateTokens";

export default async function refreshToken(req: Request, res: Response) {
  const { refreshToken: oldRefreshToken } = req.body;

  try {
    const payload = jwt.verify(
      oldRefreshToken,
      process.env.JWT_REFRESH_SECRET as string
    );

    if (!(payload as any).trust) {
      throw new Error("Token is not trusted");
    }

    const user = await getOneByUsername((payload as any).username);

    if (!user) {
      const error = new Error("No user found");
      error.name = "INVALID_USERNAME";
      throw error;
    }

    const { accessToken, refreshToken } = generateTokens(user.username);

    user.accessToken = accessToken;

    user.save();

    return {
      status: 200,
      data: {
        accessToken,
        refreshToken,
      },
    };
  } catch (err: any) {
    throw err;
  }
}
