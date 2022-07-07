import express from "express";
import router from "./routes";
import { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(router);
app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(400).json(err);
});

app.listen(5000, "localhost", () => {
  console.log("Server lsitening on port ", 5000);
});
