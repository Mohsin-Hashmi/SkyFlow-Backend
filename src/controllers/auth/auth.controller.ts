
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../../models/user";
import * as Validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if (!Validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }
        if (Validator.isEmpty(password) || !Validator.isLength(password, { min: 6 })) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
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
        if (!Validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
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
            email: isUserExist.email
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
    } catch (error) {

    }
}