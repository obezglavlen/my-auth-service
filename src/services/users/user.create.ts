import UserModel from "../../models/users";
import { v4 as uuid4 } from "uuid";

export default async function createUser(
  username: string,
  email: string,
  password: string,
  accessToken: string
) {
  const user = new UserModel({
    _id: uuid4(),
    username,
    email,
    password: "",
    isActivate: false,
    accessToken,
    role: "",
  });

  await user.setPassword(password);

  await user.save();

  return user;
}
