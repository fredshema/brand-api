import bodyParser from "body-parser";
import express from "express";

import { appRouter } from "./routes";
import "./services/database";

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", appRouter);


app.listen(port, () => {
  console.log(`started app on port ${port}`);
});
