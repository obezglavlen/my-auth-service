import express from "express";
import router from "./routes";
import { Request, Response } from "express";
import "./config";

const { PORT, HOST } = process.env;

const app = express();

app.use(express.json());
app.use(router);

app.listen(Number(PORT) || 5000, (HOST as string) || "localhost", () => {
  console.log("Server lsitening on port ", PORT);
});
