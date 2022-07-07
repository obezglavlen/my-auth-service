import { Router, Request, Response } from "express";
import publicRoutes from "./public";
import privateRoutes from "./private";
import { validationResult, header } from "express-validator";
import jwtMiddleware from "../middlewares/jwt-middleware";
import errorMiddleware from "../middlewares/error-middleware";

const router = Router();

// Add pulbic routes to router
publicRoutes.forEach((route) => {
  (router as any)[route.method](
    route.route,
    ...(route as any).validate,
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);

      if (errors.array().length) {
        return next(errors);
      }

      try {
        const result = await (route.controller as any)[route.action](
          req,
          res,
          next
        );
        return res.status(result.status).json(result.data);
      } catch (err) {
        next(err);
      }
    }
  );
});


// Middleware  for private routes, that check authorization token
router.use(
  header("authorization").isString(),
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);

    if (errors.array().length) {
      return next(errors);
    }

    return next();
  },
  jwtMiddleware
);

// Add private routes to router
privateRoutes.forEach((route) => {
  (router as any)[route.method](
    route.route,
    ...(route as any).validate,
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);

      if (errors.array().length) {
        next(errors);
      }

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

router.use(errorMiddleware)

export default router;
