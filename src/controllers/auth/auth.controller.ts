
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../../models/user";
import { IUser } from "../../types/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { success } from "zod";

export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const HASHED_PASSWORD = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: HASHED_PASSWORD
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User with this email does not exist"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }
        const token = jwt.sign({
            userId: isUserExist._id,
            email: isUserExist.email,
            role: isUserExist.role
        }, process.env.JWT_SECRET as string, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        });

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: isUserExist,
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


export const logout = (req: Request, res: Response) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        return res.json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


export const getProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const { _id } = req.user as IUser;
        const isUserExist = await User.findById(_id);
        if (!isUserExist) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            user: isUserExist
        })
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            })
        }
        const isUserExist = await User.findById(userId);
        if (!isUserExist) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const { email } = isUserExist;

        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        const HASHED_NEW_PASSWORD = await bcrypt.hash(newPassword, 10);
        const updatedUserPassword = await User.findByIdAndUpdate(userId, {
            password: HASHED_NEW_PASSWORD
        });
        if (!updatedUserPassword) {
            return res.status(400).json({
                success: false,
                message: "Failed to update password"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Password updated successfully for user with email: " + email,
            user: updatedUserPassword
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

