import { Router } from "express";
import { authenticate, register } from "../controllers/auth";

const authRoutes = Router();

authRoutes.post("/login", authenticate);
authRoutes.post("/register", register);

export { authRoutes };
