import { Router, Request, Response } from "express";
import publicRoutes from "./public";
import privateRoutes from "./private";
import jwtMiddleware from "../middlewares/jwt-middleware";
import errorMiddleware from "../middlewares/error-middleware";
import Joi from "joi";

const router = Router();

function routeFactory(route: any) {
  (router as any)[route.method](
    route.route,
    (req: Request, res: Response, next: Function) => {
      const schema = (route as any).validate as Joi.Schema;
      const validationResult = schema
        ? schema.validate(req, {
            allowUnknown: true,
          })
        : { error: null };

      if (validationResult.error) {
        return next(validationResult.error);
      }

      return next();
    },
    async (req: Request, res: Response, next: Function) => {
      try {
        const result = await (route.controller as any)[route.action](
          req,
          res,
          next
        );
        return res.status(result.status).json(result.data);
      } catch (err) {
        return next(err);
      }
    }
  );
}

function jwtMiddlewareFactory() {
  return [
    (req: Request, res: Response, next: Function) => {
      const schema = Joi.object<typeof req.headers>({
        authorization: Joi.string().required(),
      });

      console.log(req.headers);

      const validationResult = schema.validate(req.headers, {
        allowUnknown: true,
      });

      if (validationResult.error) {
        return next(validationResult.error);
      }

      return next();
    },
    jwtMiddleware,
  ];
}

// Add pulbic routes to router
publicRoutes.forEach(routeFactory);

// Middleware  for private routes, that check authorization token
router.use(jwtMiddlewareFactory());

// Add private routes to router
privateRoutes.forEach(routeFactory);

router.use(errorMiddleware);

export default router;
