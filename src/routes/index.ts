import { Router, Request, Response } from "express";
import publicRoutes from "./public";
import userRoutes from "./users";
import { validationResult } from "express-validator";

const router = Router();

const privateRoutes = [...userRoutes];

publicRoutes.forEach((route) => {
  (router as any)[route.method](
    route.route,
    async (req: Request, res: Response, next: Function) => {
      try {
        const result = await (route.controller as any)[route.action](
          req,
          res,
          next
        );
        res.status(result.status).json(result.data);
      } catch (err) {
        next(err);
      }
    }
  );
});

privateRoutes.forEach((route) => {
  (router as any)[route.method](
    route.route,
    ...route.validate,
    async (req: Request, res: Response, next: Function) => {
      try {
        const error = validationResult(req)
        if (error) {
          throw error;
        }
        const result = await (route.controller as any)[route.action](
          req,
          res,
          next
        );
        res.status(result.status).json(result.data);
      } catch (err) {
        next(err);
      }
    }
  );
});

export default router;
