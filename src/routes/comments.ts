import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "../controllers/comments";
import { verifyToken } from "../middleware/auth";
import { validateResource } from "../middleware/validateResource";
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  getCommentsSchema,
  updateCommentSchema,
} from "../validation/comment";

/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: Comments management
 */

const commentRoutes = Router({
  mergeParams: true,
});

commentRoutes.get("/", validateResource(getCommentsSchema), getComments);
commentRoutes.get("/:id", validateResource(getCommentSchema), getComment);

commentRoutes.use(verifyToken);
commentRoutes.post("/", validateResource(createCommentSchema), createComment);
commentRoutes.put("/:id", validateResource(updateCommentSchema), updateComment);
commentRoutes.delete(
  "/:id",
  validateResource(deleteCommentSchema),
  deleteComment
);

export { commentRoutes };
