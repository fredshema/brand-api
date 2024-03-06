import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessage,
  getMessages,
  updateMessage,
} from "../controllers/messages";
import { verifyToken } from "../middleware/auth";
import { validateResource } from "../middleware/validateResource";
import { getMessageSchema, updateMessageSchema } from "../validation/message";

const messageRoutes = Router();

messageRoutes.post("/", createMessage);

messageRoutes.use(verifyToken);
messageRoutes.get("/", getMessages);
messageRoutes.get("/:id", validateResource(getMessageSchema), getMessage);
messageRoutes.put("/:id", validateResource(updateMessageSchema), updateMessage);
messageRoutes.delete("/:id", validateResource(getMessageSchema), deleteMessage);

export { messageRoutes };
