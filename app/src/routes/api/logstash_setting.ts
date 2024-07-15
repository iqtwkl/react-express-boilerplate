import express from 'express';
import { LogstashSettingController } from '../../controllers/logstash_setting';
import { AuthMiddleware } from '../../middlewares/authSession';

export const logstashSettingRoutes = express.Router();

logstashSettingRoutes.get('/logstash_settings', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, LogstashSettingController.findAll);
logstashSettingRoutes.get('/logstash_setting/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, LogstashSettingController.findById);
logstashSettingRoutes.get('/logstash_setting/name/:connection_name', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, LogstashSettingController.findByName);
logstashSettingRoutes.post('/logstash_setting', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, LogstashSettingController.create);
logstashSettingRoutes.post('/retry/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, LogstashSettingController.retry);
logstashSettingRoutes.put('/logstash_setting/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, LogstashSettingController.update);
logstashSettingRoutes.delete('/logstash_setting/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, LogstashSettingController.delete);