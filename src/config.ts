import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER } = process.env;

mongoose
  .connect(
    `mongodb+srv://dbcluster.${MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
    {
      dbName: "Authorization",
      user: MONGO_USERNAME,
      pass: MONGO_PASSWORD,
    }
  )
  .then(() => {
    console.log(`Connected to cluster ${MONGO_CLUSTER}`);
  })
  .catch((err) => {
    console.error(err);
  });
