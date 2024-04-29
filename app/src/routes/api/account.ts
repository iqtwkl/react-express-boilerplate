import express from 'express';
import { AccountController } from '../../controllers/account';

export const accountRoutes = express.Router()

accountRoutes.get(`/accounts/`, AccountController.findAll);
accountRoutes.post(`/accounts/`, AccountController.create);
accountRoutes.get(`/accounts/:id`, AccountController.findById);
accountRoutes.put(`/accounts/:id`, AccountController.update);
accountRoutes.delete(`/accounts/:id`, AccountController.delete)