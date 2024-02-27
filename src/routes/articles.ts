import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  likeArticle,
  unlikeArticle,
  updateArticle,
} from "../controllers/articles";
import { verifyToken } from "../middleware/auth";
import multer from "../middleware/multer";
import { validateResource } from "../middleware/validateResource";
import {
  createArticleSchema,
  getArticleSchema,
  updateArticleSchema,
} from "../validation/article";

const articleRoutes = Router({
  mergeParams: true,
});

articleRoutes.get("/", getArticles);
articleRoutes.get("/:id", validateResource(getArticleSchema), getArticle);
articleRoutes.get("/:id/like", validateResource(getArticleSchema), likeArticle);
articleRoutes.get(
  "/:id/unlike",
  validateResource(getArticleSchema),
  unlikeArticle
);

articleRoutes.use(verifyToken);
articleRoutes.post(
  "/",
  multer.single("image"),
  validateResource(createArticleSchema),
  createArticle
);
articleRoutes.put(
  "/:id",
  multer.single("image"),
  validateResource(updateArticleSchema),
  updateArticle
);
articleRoutes.delete("/:id", validateResource(getArticleSchema), deleteArticle);

export { articleRoutes };
