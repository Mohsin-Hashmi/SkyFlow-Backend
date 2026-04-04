import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { IUser } from '../types/user';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token || (req.headers.authorization ? String(req.headers.authorization).split(' ')[1] : undefined);
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { userId?: string };
        if (!payload?.userId) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        const userDoc: IUser | null = await User.findById(payload.userId).lean();
        if (!userDoc) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        const user: IUser = {
            _id: String(userDoc._id),
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            password: userDoc.password,
            role: userDoc.role,
            createdAt: userDoc.createdAt ? userDoc.createdAt.toString() : undefined,
            updatedAt: userDoc.updatedAt ? userDoc.updatedAt.toString() : undefined,
        };

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
