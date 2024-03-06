import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { User } from "../models/user";

export const getUsers: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Get all users'
   */
  try {
    const users = await User.find({});
    return res.status(200).json({
      status: "success",
      data: { users },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Get a user by id'
   */
  try {
    const id = new ObjectId(req?.params?.id);
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User not found`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const createUser: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Create a new user'
   *
   */
  const user = new User(req.body);
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    await user.save();
    user.password = undefined as any;
    return res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (e) {
    const error = e as Error;
    if (
      error.message.includes("email") &&
      error.message.includes("duplicate key error")
    ) {
      return res.status(400).json({
        status: "error",
        message: `Email already exists`,
      });
    }

    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Update a user'
   */
  try {
    const userData = req.body;
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    const id = new ObjectId(req?.params?.id);
    let user = await User.findByIdAndUpdate(id, userData, { new: true });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User not found`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Delete a user'
   */
  try {
    const id = new ObjectId(req?.params?.id);
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User not found`,
      });
    }

    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};
