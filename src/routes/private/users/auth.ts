import { header } from "express-validator"
import authController from "../../../controllers/users/auth"

export default [
  {
    method: "post",
    route: "/logout",
    controller: authController,
    action: "logout",
    validate: [
      header("authorization").isString()
    ]
  }
]