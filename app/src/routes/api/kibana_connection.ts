import express from 'express';
import { KibanaConnnectionConntroller } from '../../controllers/kibana_connection';
import { AuthMiddleware } from '../../middlewares/authSession';

export const kibanaConnectionRoutes = express.Router();

kibanaConnectionRoutes.get('/kibana_connections', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, KibanaConnnectionConntroller.findAll);
kibanaConnectionRoutes.get('/kibana_connection/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, KibanaConnnectionConntroller.findById);
kibanaConnectionRoutes.get('/kibana_connection/name/:connection_name', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, KibanaConnnectionConntroller.findByName);
kibanaConnectionRoutes.post('/kibana_connection', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, KibanaConnnectionConntroller.create);
kibanaConnectionRoutes.put('/kibana_connection/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, KibanaConnnectionConntroller.update);
kibanaConnectionRoutes.delete('/kibana_connection/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin, KibanaConnnectionConntroller.delete);
