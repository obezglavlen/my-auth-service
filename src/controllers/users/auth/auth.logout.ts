import { Request, Response } from "express";

export default async function logout(
  req: Request,
  res: Response,
  next: Function
) {
  const { _user } = req.body;

  _user.accessToken = "";

  await _user.save();

  return {
    status: 200,
    data: {
      logout: _user.username,
    },
  };
}
