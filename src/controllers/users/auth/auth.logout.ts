import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getOneByUsername } from "../../../services/users";

export default async function logout(
  req: Request,
  res: Response,
  next: Function
) {
  const { _user } = req.body;

  _user.accessToken = "";

  await _user.save();

  // ! // TODO Remove tokens from database

  return {
    status: 200,
    data: {
      logout: _user.username,
    },
  };
}
