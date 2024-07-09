import express, {Request, Response} from 'express';
import {AuthController} from '../../controllers/auth'

export const authRoutes = express.Router();

authRoutes.post('/auth/login/', AuthController.login);
authRoutes.post('/auth/request_reset_password', AuthController.requestResetPassowrd);
authRoutes.put('/auth/reset_password', AuthController.resetPassword);