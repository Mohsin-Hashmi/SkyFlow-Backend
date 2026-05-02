import express from 'express';
import { register, login, logout, getProfile, forgotPassword } from '../../services/auth/auth.service';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { createUserSchema, forgotPasswordSchema, loginUserSchema } from '../../schema/user.validation';

export const authRouter = express.Router();


authRouter.post('/register', validate(createUserSchema), register)
authRouter.post('/login', validate(loginUserSchema), login)
authRouter.post('/logout', logout)
authRouter.get('/profile', authenticate, getProfile)
authRouter.post('/forgot-password', authenticate, validate(forgotPasswordSchema), forgotPassword)