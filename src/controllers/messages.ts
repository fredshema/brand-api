import { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { Message } from "../models/message";

export const getMessages: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Get all messages'
   */
  try {
    const messages = await Message.find({}).sort({ created_at: 'desc'});
    return res.status(200).json({
      status: "success",
      data: { messages },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const getMessage: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Get a message by id'
   */
  try {
    const id = new ObjectId(req?.params?.id);
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        status: "error",
        message: `Message not found`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: { message },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const createMessage: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Create a new message'
   */
  const message = new Message(req.body);
  try {
    await message.save();
    return res.status(201).json({
      status: "success",
      data: { message },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const updateMessage: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Update a message by id'
   */
  try {
    const id = new ObjectId(req?.params?.id);
    const message = await Message.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!message) {
      return res.status(404).json({
        status: "error",
        message: `Message not found`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: { message },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const deleteMessage: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Delete a message by id'
   */
  try {
    const id = new ObjectId(req?.params?.id);
    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        status: "error",
        message: `Message not found`,
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};
