import express from 'express';
import { AccountController } from '../../controllers/account';
import { AuthMiddleware } from "../../middlewares/authSession";

export const accountRoutes = express.Router()

accountRoutes.get(`/accounts/`, AuthMiddleware.isAuthenticated, AccountController.findAll);
accountRoutes.post(`/accounts/`, AuthMiddleware.isAuthenticated, AccountController.create);
accountRoutes.get(`/accounts/profile`, AuthMiddleware.isAuthenticated, AccountController.profile);
accountRoutes.get(`/accounts/:id`, AuthMiddleware.isAuthenticated, AccountController.findById);
accountRoutes.put(`/accounts/profile`, AuthMiddleware.isAuthenticated, AccountController.updateProfile);
accountRoutes.put(`/accounts/:id`, AuthMiddleware.isAuthenticated, AccountController.update);
accountRoutes.delete(`/accounts/:id`, AuthMiddleware.isAuthenticated, AccountController.delete);