import { Request, Response } from "express";
import { create as createUser } from "../../../services/users";
import generateTokens from "./generateTokens";

export default async function login(req: Request, res: Response) {
  const { username, password, email } = req.body;

  const { accessToken, refreshToken } = generateTokens(username);

  await createUser(username, email, password, accessToken)

  return {
    status: 200,
    data: {
      accessToken,
      refreshToken,
    },
  };
}
