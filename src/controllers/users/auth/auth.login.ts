import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import generateTokens from "./generateTokens";
import { getOneByUsername } from "../../../services/users";
import { nextTick } from "process";

export default async function login(
  req: Request,
  res: Response,
  next: Function
) {
  const { username, password } = req.body;
  const hashedPasswrod = bcrypt.hash(password, 0);

  const user = await getOneByUsername(username);
  if (!user) {
    const error = new Error("User not found");
    error.name = "INVALID_USERNAME";
    throw error;
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    const error = new Error("Invalid password");
    error.name = "INVALID_PASSWORD";
    throw error;
  }

  const { accessToken, refreshToken } = generateTokens(username);

  user.accessToken = accessToken;

  await user.save();

  return {
    status: 200,
    data: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  };
}
