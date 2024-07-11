import express from 'express';
import { ElasticConnnectionConntroller } from '../../controllers/elastic_connection';
import { AuthMiddleware } from '../../middlewares/authSession';

export const elasticConnectionRoutes = express.Router();

elasticConnectionRoutes.get('/elastic_connections', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, ElasticConnnectionConntroller.findAll);
elasticConnectionRoutes.get('/elastic_connection/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, ElasticConnnectionConntroller.findById);
elasticConnectionRoutes.get('/elastic_connection/name/:connection_name', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, ElasticConnnectionConntroller.findByName);
elasticConnectionRoutes.post('/elastic_connection', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, ElasticConnnectionConntroller.create);
elasticConnectionRoutes.put('/elastic_connection/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, ElasticConnnectionConntroller.update);
elasticConnectionRoutes.delete('/elastic_connection/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, ElasticConnnectionConntroller.delete);
