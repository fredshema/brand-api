import { Router } from "express";
import { articleRoutes } from "./articles";
import { authRoutes } from "./auth";
import { userRoutes } from "./users";

const appRouter = Router();

appRouter.use("/auth", authRoutes);
appRouter.use("/users", userRoutes);
appRouter.use("/articles", articleRoutes);

appRouter.get("/uploads/:image", (req, res) => {
  res.sendFile(req.params.image, { root: "uploads" });
});

export { appRouter };
