import express, {Request, Response} from 'express';
import {AuthController} from '../../controllers/auth'

export const authRoutes = express.Router();

authRoutes.post('/auth/login/', AuthController.login);