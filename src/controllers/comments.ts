import { RequestHandler } from "express";
import { Comment } from "../models/comment";

export const getComments: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Get all comments'
   */
  try {
    const articleId = req.params.articleId;
    const comments = await Comment.find({ article: articleId }).populate(
      "user"
    );

    return res.status(200).json({
      status: "success",
      data: { comments },
    });
  } catch (e) {
    const error = e as Error;
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getComment: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Get a comment by id'
   */
  try {
    const articleId = req.params.articleId;
    const commentId = req.params.id;
    const comment = await Comment.findOne({
      _id: commentId,
      article: articleId,
    }).populate("user");

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: `Comment not found`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: { comment },
    });
  } catch (e) {
    const error = e as Error;
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const createComment: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Create a new comment'
   */
  const articleId = req.params.articleId;
  const user = req.userId;
  const comment = new Comment({
    ...req.body,
    article: articleId,
    createdAt: new Date().getTime(),
    user: user,
  });

  try {
    await comment.save();
    await comment.populate("user");
    return res.status(201).json({
      status: "success",
      data: { comment },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const updateComment: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Update a comment'
   */
  try {
    const articleId = req.params.articleId;
    const commentId = req.params.id;
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, article: articleId },
      req.body,
      { new: true }
    ).populate("user");

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: `Comment not found`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: { comment },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const deleteComment: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Delete a comment'
   */
  try {
    const articleId = req.params.articleId;
    const commentId = req.params.id;
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      article: articleId,
    });

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: `Comment not found`,
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
