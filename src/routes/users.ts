import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const userRoutes = Router();

userRoutes.use(verifyToken);
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUser);
userRoutes.post("/", createUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export { userRoutes };
