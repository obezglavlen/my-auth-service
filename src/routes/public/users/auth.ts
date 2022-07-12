import Joi from "joi";
import authController from "../../../controllers/users/auth";
import { Request } from "express";

export default [
  {
    method: "post",
    route: "/login",
    controller: authController,
    action: "login",
    validate: Joi.object<Request>({
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
  },
  {
    method: "post",
    route: "/register",
    controller: authController,
    action: "register",
    validate: Joi.object<Request>({
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string(),
      }),
    }),
  },
  {
    method: "post",
    route: "/refreshtoken",
    controller: authController,
    action: "refreshToken",
    validate: Joi.object<Request>({
      body: Joi.object({
        refreshToken: Joi.string().required(),
      }),
    }),
  },
];
