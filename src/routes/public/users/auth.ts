import { body } from "express-validator";
import authController from "../../../controllers/users/auth";

export default [
  {
    method: "post",
    route: "/login",
    controller: authController,
    action: "login",
    validate: [body("username").isString(), body("password").isString()],
  },
  {
    method: "post",
    route: "/register",
    controller: authController,
    action: "register",
    validate: [
      body("username").isString(),
      body("password").isString(),
      body("email").isEmail(),
    ],
  },
  {
    method: "post",
    route: "/refreshtoken",
    controller: authController,
    action: "refreshToken",
    validate: [body("refreshToken").isString()],
  },
];
