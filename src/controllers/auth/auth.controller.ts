
import { Request, Response } from "express";
import { User } from "../../models/user";
import * as Validator from 'validator';
import bcrypt from 'bcrypt';
export const register = async(req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if(!Validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }
        if(Validator.isEmpty(password) || !Validator.isLength(password, {min: 6})) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }
        const HASHED_PASSWORD = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({email});
        if(existingUser){
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


export const login = (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}


export const logout = (req: Request, res: Response) => {
    try {
    } catch (error) {

    }
}