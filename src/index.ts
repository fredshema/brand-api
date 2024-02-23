import bodyParser from "body-parser";
import express from "express";

import { appRouter } from "./routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", appRouter);

export default app;
