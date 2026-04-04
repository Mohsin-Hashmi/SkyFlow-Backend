import express from 'express';
import { register, login, logout, getProfile } from '../../controllers/auth/auth.controller';
import { authenticate } from '../../middleware/auth.middleware';

export const authRouter = express.Router();


authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/profile', authenticate, getProfile)