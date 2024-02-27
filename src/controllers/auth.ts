import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Role, User } from "../models/user";
import { createUser } from "./users";

export const authenticate: RequestHandler = async (req, res) => {
   /**
   * #swagger.summary = 'Authenticate a user'
   */
  try {
    const { email, password } = req.body;
    User.schema.path("password").select(true);
    const user = await User.findOne({ email });
    User.schema.path("password").select(false);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication failed: invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Authentication failed: invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      status: "success",
      data: { token },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: (error as Error).message,
    });
  }
};

export const register: RequestHandler = async (req, res, next) => {
  /**
   * #swagger.summary = 'Register a new user'
   */
  req.body.role = Role.GUEST;
  return createUser(req, res, next);
};
