import express, {Request, Response} from 'express';

export const authRoutes = express.Router();

authRoutes.post('/auth/login', (req: Request, res: Response): void => {
    const { username, password } = req.body;
    const { app_id } = req.query;

    console.log(`User ${username} with Password ${password} and app_id ${app_id}, trying to login`);

    res.status(200);
    res.json({
        success: true,
        token: 'sometoken',
        refresh: 'sometoken'
    });
});