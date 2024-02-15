import { Router } from "express";
import { createArticle, deleteArticle, getArticle, getArticles, updateArticle } from "../controllers/articles";
import { verifyToken } from "../middleware/auth";
import multer from "../middleware/multer";

const articleRoutes = Router();


articleRoutes.get("/", getArticles);
articleRoutes.get("/:id", getArticle);

articleRoutes.use(verifyToken);
articleRoutes.post("/", multer.single("image"), createArticle);
articleRoutes.put("/:id", multer.single("image"), updateArticle);
articleRoutes.delete("/:id", deleteArticle);

export { articleRoutes };



