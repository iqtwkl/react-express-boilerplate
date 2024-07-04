import express from 'express';
import { GroupController } from '../../controllers/group';
import { AuthMiddleware } from '../../middlewares/authSession';

export const groupRoutes = express.Router();

groupRoutes.get('/groups', AuthMiddleware.isAuthenticated, GroupController.findAll);
groupRoutes.get('/group/:id', AuthMiddleware.isAuthenticated, GroupController.findById);
groupRoutes.get('/group/name/:name', AuthMiddleware.isAuthenticated, GroupController.findByName);
groupRoutes.get('/group/:id/accounts', AuthMiddleware.isAuthenticated, GroupController.listAccount);
groupRoutes.get('/group/:id/dashboards', AuthMiddleware.isAuthenticated, GroupController.listDashboard);
groupRoutes.post('/group', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, GroupController.create);
groupRoutes.put('/group/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, GroupController.update);
groupRoutes.post('/group/:id/account', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, GroupController.addAccount);
groupRoutes.post('/group/:id/dashboard', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, GroupController.addDashboard);
groupRoutes.delete('/group/:id/account', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, GroupController.deleteAccount);
groupRoutes.delete('/group/:id/dashboard', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, GroupController.deleteDashboard);
groupRoutes.delete('/group/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, GroupController.delete);