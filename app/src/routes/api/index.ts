import express, {Request, Response} from 'express';
import { authRoutes } from './auth';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from "../../swagger_output.json";
import * as bodyParser from 'body-parser'

export const apiRoutes = express.Router();

apiRoutes.use(bodyParser.json())

apiRoutes.get('/', (req: Request, res: Response): void => {
    res.send("OK");
});

/** 
 * untuk menambahkan routes lain di dalam folder api gunakan:
 * apiRoutes.use(); 
 * 
 * contoh:
 * import {userRoute} from './user'
 * apiRoutes.use(userRoute)
 * 
 * **/

apiRoutes.use(authRoutes);

apiRoutes.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput)
);