import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';

export const verifyToken: RequestHandler = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Access denied'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userId = (decoded as any).userId;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }
}