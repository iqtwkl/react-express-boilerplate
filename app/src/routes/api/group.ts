import express from 'express';
import { GroupController } from '../../controllers/group';
import { AuthMiddleware } from '../../middlewares/authSession';

export const groupRoutes = express.Router();

groupRoutes.get('/groups', AuthMiddleware.isAuthenticated, GroupController.findAll);
groupRoutes.post('/group', AuthMiddleware.isAuthenticated, GroupController.create);
groupRoutes.put('/group/:id', AuthMiddleware.isAuthenticated, GroupController.update);
groupRoutes.get('/group/:id', AuthMiddleware.isAuthenticated, GroupController.findById);
groupRoutes.get('/group/name/:name', AuthMiddleware.isAuthenticated, GroupController.findByName);
groupRoutes.post('/group/account', AuthMiddleware.isAuthenticated, GroupController.addAccount);
groupRoutes.get('/group/:id/accounts', AuthMiddleware.isAuthenticated, GroupController.listAccount);
groupRoutes.post('/group/dashboard', AuthMiddleware.isAuthenticated, GroupController.addDashboard);
groupRoutes.get('/group/:id/dashboards', AuthMiddleware.isAuthenticated, GroupController.listDashboard);
groupRoutes.delete('/group/account', AuthMiddleware.isAuthenticated, GroupController.deleteAccount);
groupRoutes.delete('/group/dashboard', AuthMiddleware.isAuthenticated, GroupController.deleteDashboard);
groupRoutes.delete('/group/:id', AuthMiddleware.isAuthenticated, GroupController.delete);