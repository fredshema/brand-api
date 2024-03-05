import { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { Article } from "../models/article";
import { Comment } from "../models/comment";

export const getArticles: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Get all articles'
   */
  try {
    const results = await Article.find({}).lean();

    const articles = await Promise.all(
      results.map(async (article) => {
        const appURL = process.env.APP_URL || "";
        article.image = appURL + article?.image;
        const commentsCount = await Comment.countDocuments({
          article: article._id,
        });
        return { ...article, comments_count: commentsCount };
      })
    );

    return res.status(200).json({
      status: "success",
      data: { articles },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const getArticle: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Get an article by id'
   */
  try {
    const id = new ObjectId(req?.params?.id) || "";
    const article = await Article.findById(id).populate("author");

    if (!article) {
      return res.status(404).json({
        status: "error",
        message: `Article not found`,
      });
    }

    console.log(req?.query);

    if (req.query?.firstView === "1") {
      article.views++;
      await article.updateOne({ views: article.views });
    }

    const appURL = process.env.APP_URL || "";
    article.image = appURL + article?.image;
    article.author = (article?.author as any)?.name;

    return res.status(200).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const createArticle: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Create a new article'
   */
  const authorId = req.userId;
  const article = new Article({ ...req.body, author: authorId });
  try {
    if (req.file) {
      article.image = req.file.path;
    }

    await article.save();
    return res.status(201).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const updateArticle: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Update an article'
   */
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }

    const id = new ObjectId(req?.params?.id);

    const article = await Article.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: true,
    });

    if (!article) {
      return res.status(404).json({
        status: "error",
        message: `Article not found`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const deleteArticle: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Delete an article'
   */
  try {
    const id = new ObjectId(req?.params?.id);
    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({
        status: "error",
        message: `Article not found`,
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

export const likeArticle: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Like an article'
   */
  try {
    const id = new ObjectId(req?.params?.id);
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        status: "error",
        message: `Article not found`,
      });
    }

    article.likes++;
    await article.save();

    return res.status(200).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const unlikeArticle: RequestHandler = async (req, res) => {
  /**
   * #swagger.summary = 'Unlike an article'
   */
  try {
    const id = new ObjectId(req?.params?.id);
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        status: "error",
        message: `Article not found`,
      });
    }

    article.likes--;
    if (article.likes < 0) {
      article.likes = 0;
    }
    await article.save();

    return res.status(200).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};
