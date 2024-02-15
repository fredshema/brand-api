import { RequestHandler } from "express";
import { Article } from "../models/article";

export const getArticles: RequestHandler = async (req, res) => {
    try {
        const articles = await Article.find({});
        return res.status(200).json({
            status: 'success',
            data: { articles }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: (error as Error).message
        });
    }
}

export const getArticle: RequestHandler = async (req, res) => {
    try {
        const article = await Article.findById(req?.params?.id);

        if (!article) {
            return res.status(404).json({
                status: 'error',
                message: `Article not found`
            });
        }

        return res.status(200).json({
            status: 'success',
            data: { article }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: (error as Error).message
        });
    }
}

export const createArticle: RequestHandler = async (req, res) => {
    const article = new Article(req.body);
    try {
        if (req.file) {
            article.image = req.file.path;
        }

        await article.save();
        return res.status(201).json({
            status: 'success',
            data: { article }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: (error as Error).message
        });
    }
}

export const updateArticle: RequestHandler = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }

        const article = await Article.findByIdAndUpdate(req?.params?.id, req.body, { new: true });

        if (!article) {
            return res.status(404).json({
                status: 'error',
                message: `Article not found`
            });
        }

        return res.status(200).json({
            status: 'success',
            data: { article }
        });

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: (error as Error).message
        });
    }
}

export const deleteArticle: RequestHandler = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req?.params?.id);

        if (!article) {
            return res.status(404).json({
                status: 'error',
                message: `Article not found`
            });
        }

        return res.status(200).json({
            status: 'success',
            message: `Article deleted`
        });

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: (error as Error).message
        });
    }
}