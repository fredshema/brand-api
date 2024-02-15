import bodyParser from 'body-parser';
import express from 'express';

import { articleRoutes } from './routes/articles';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/users';
import './services/database';

const port = 3000;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/articles", articleRoutes);
app.get("/uploads/:image", (req, res) => {
  res.sendFile(req.params.image, { root: "uploads" });
});

app.listen(port, () => {
  console.log(`started app on port ${port}`)
});