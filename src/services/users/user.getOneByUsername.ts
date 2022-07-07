import UserModel from "../../models/users";

export default async function getOneByUsername (username: string) {
  try {
    const user = await UserModel.findOne({
      username: username
    })

    return user
  } catch (err) {
    throw err
  }
}