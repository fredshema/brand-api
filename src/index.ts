import bodyParser from "body-parser";
import express from "express";
import appRouter from "./routes";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(appRouter);

export default app;
