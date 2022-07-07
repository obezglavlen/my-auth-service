import { Request, Response } from "express";
import { name, version } from "../../../package.json";

export default function get(req: Request, res: Response) {
  return {
    status: 200,
    data: { name, version, environment: process.env.NODE_ENV },
  };
}
