import bcrypt from "bcrypt";
import { Model, model, Schema } from "mongoose";

interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  isActivate: boolean;
  accessToken: string;
  role: string;
}

interface IUserMethods {
  setPassword(arg: string): Promise<void>;
  comparePassword(arg: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  _id: String,
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  isActivate: Boolean,
  accessToken: String,
  role: String,
});

UserSchema.methods.setPassword = async function (pass: string) {
  this.password = await bcrypt.hash(pass, 0);
};

UserSchema.methods.comparePassword = async function (pass: string) {
  return await bcrypt.compare(pass, this.password)
}

const UserModel = model("Users", UserSchema);

export default UserModel;
