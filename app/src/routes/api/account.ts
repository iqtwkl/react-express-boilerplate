import express from 'express';
import { AccountController } from '../../controllers/account';
import { AuthMiddleware } from "../../middlewares/authSession";

export const accountRoutes = express.Router()

accountRoutes.get(`/accounts/`, AuthMiddleware.isAuthenticated, AccountController.findAll);
accountRoutes.get(`/accounts/:id`, AuthMiddleware.isAuthenticated, AccountController.findById);
accountRoutes.post(`/accounts/`, AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AccountController.create);
accountRoutes.put(`/accounts/:id`, AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AccountController.update);
accountRoutes.delete(`/accounts/:id`, AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, AccountController.delete)