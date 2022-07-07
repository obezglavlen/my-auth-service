import { body } from "express-validator";
import { exists } from "fs";
import authController from "../../controllers/users/auth";

export default [
  {
    method: "post",
    route: "/login",
    controller: authController,
    action: "login",
    validate: [
      body("username").isString().withMessage("username must be a string"),
      body("password").isString().withMessage("password must be a string"),
    ],
  },
];
