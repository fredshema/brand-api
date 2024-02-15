import bcrypt from 'bcrypt';
import { RequestHandler } from "express";
import { User } from "../models/user";

/**
 * Get all users
 */
export const getUsers: RequestHandler = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            status: 'success',
            data: { users }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: (error as Error).message
        });
    }
};

/**
 * Get a user by id
 */
export const getUser: RequestHandler = async (req, res) => {
    try {
        const user = await User.findById(req?.params?.id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User not found`
            });
        }

        return res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: (error as Error).message
        });
    }
}

/**
 * Create a new user
 */
export const createUser: RequestHandler = async (req, res) => {
    const user = new User(req.body);
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(201).json({
            status: 'success',
            data: { user }
        });
    } catch (e) {
        const error = e as Error;
        if (error.message.includes('email') &&
            error.message.includes('duplicate key error')) {
            return res.status(400).json({
                status: 'error',
                message: `Email already exists`
            });
        }

        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Update a user by id
 */
export const updateUser: RequestHandler = async (req, res) => {
    try {
        const userData = req.body;
        if (userData.password) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
        }

        let user = await User.findByIdAndUpdate(req?.params?.id, userData, { new: true });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User not found`,
            });
        }

        return res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: (error as Error).message
        });
    }
}

/**
 * Delete a user by id
 */
export const deleteUser: RequestHandler = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req?.params?.id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User not found`
            });
        }

        return res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: (error as Error).message
        });
    }
}