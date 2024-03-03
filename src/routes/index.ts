import { Router } from "express";
import APIRouter from "./api";
import DocsRouter from "./docs";

const appRouter = Router();

appRouter.use("/api", APIRouter);
appRouter.use(DocsRouter);

appRouter.get("/uploads/:image", (req, res) => {
  // #swagger.ignore = true
  res.sendFile(req.params.image, { root: "uploads" });
});

appRouter.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

export default appRouter;
