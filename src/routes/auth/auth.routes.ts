import express from 'express';
import { register, login, logout } from '../../controllers/auth/auth.controller';
export const authRouter = express.Router();


authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/logout',logout)