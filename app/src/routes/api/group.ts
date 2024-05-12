import express from 'express';
import { GroupController } from '../../controllers/group';
import { AuthMiddleware } from '../../middlewares/authSession';

export const groupRoutes = express.Router();

groupRoutes.get('/groups', AuthMiddleware.isAuthenticated, GroupController.findAll);