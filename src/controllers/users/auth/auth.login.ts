import { Request, Response } from "express";

export default function login(req: Request, res: Response) {
  const { username, password } = req.body;

  return {
    status: 200,
    data: {
      username,
      password,
    },
  };
}
