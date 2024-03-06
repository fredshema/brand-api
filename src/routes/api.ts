import { Router } from "express";
import { articleRoutes } from "./articles";
import { authRoutes } from "./auth";
import { commentRoutes } from "./comments";
import { messageRoutes } from "./messages";
import { userRoutes } from "./users";

const APIRouter = Router();

APIRouter.use(
  "/auth",
  authRoutes
  /**
   * #swagger.tags = ['Auth']
   */
);

APIRouter.use(
  "/users",
  userRoutes
  /**
   * #swagger.tags = ['Users']
   */
);

APIRouter.use(
  "/articles/:articleId/comments",
  commentRoutes
  /**
   * #swagger.tags = ['Comments']
   */
);

APIRouter.use(
  "/articles",
  articleRoutes
  /**
   * #swagger.tags = ['Articles']
   */
);

APIRouter.use(
  "/messages",
  messageRoutes
  /**
   * #swagger.tags = ['Messages']
   */
);

export default APIRouter;
