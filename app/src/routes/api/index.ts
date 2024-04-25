import express, {Request, Response} from 'express';

export const apiRoutes = express.Router();

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
