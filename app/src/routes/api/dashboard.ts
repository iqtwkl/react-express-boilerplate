import express from 'express';
import { DashboardController } from '../../controllers/dashboard';
import { AuthMiddleware } from '../../middlewares/authSession';

export const dashboardRoutes = express.Router();

dashboardRoutes.get('/dashboards', DashboardController.findAll);
dashboardRoutes.get('/dashboard/:id', DashboardController.findById);
dashboardRoutes.get('/dashboard/title/:title', DashboardController.findByTitle);
dashboardRoutes.post('/dashboard', DashboardController.create);
dashboardRoutes.put('/dashboard/:id', DashboardController.update);
dashboardRoutes.delete('/dashboard/:id', DashboardController.delete);
