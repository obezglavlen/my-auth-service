import { Request, Response } from "express";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: Function
) {
  res.status(400).json({ error: err.name, message: err.message });
}
