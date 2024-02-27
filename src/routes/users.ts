import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users";
import { verifyToken } from "../middleware/auth";
import { validateResource } from "../middleware/validateResource";
import { createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema } from "../validation/user";

// #swagger.tags = ['Users']

const userRoutes = Router();

userRoutes.use(verifyToken);
userRoutes.get("/", getUsers);
userRoutes.get("/:id", validateResource(getUserSchema), getUser);
userRoutes.post("/", validateResource(createUserSchema), createUser);
userRoutes.put("/:id", validateResource(updateUserSchema), updateUser);
userRoutes.delete("/:id", validateResource(deleteUserSchema), deleteUser);

export { userRoutes };
