import mongoose from "mongoose";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    newPassword: {
        type: String,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'airlineOwner', 'customer'],
        default: 'airlineOwner',
    } 
}, {timestamps: true})

export const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema);

