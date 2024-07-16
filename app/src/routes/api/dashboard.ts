import express from 'express';
import { DashboardController } from '../../controllers/dashboard';
import { AuthMiddleware } from '../../middlewares/authSession';

export const dashboardRoutes = express.Router();

dashboardRoutes.get('/dashboards', AuthMiddleware.isAuthenticated,  DashboardController.findAll);
dashboardRoutes.get('/dashboard/:id', AuthMiddleware.isAuthenticated, DashboardController.findById);
dashboardRoutes.get('/dashboard/title/:title', AuthMiddleware.isAuthenticated, DashboardController.findByTitle);
dashboardRoutes.post('/dashboard', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, DashboardController.create);
dashboardRoutes.put('/dashboard/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, DashboardController.update);
dashboardRoutes.delete('/dashboard/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, DashboardController.delete);
