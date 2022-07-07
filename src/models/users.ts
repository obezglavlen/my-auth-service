import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  _id: {type: String, unique: true},
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

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
