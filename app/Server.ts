import express, {Express, Request, Response} from "express";
import path from 'path';
import { apiRoutes } from './src/routes/api';
import { dbDataSource } from './src/configs/db.config'

export class Server {

    private app: Express;

    constructor(app: Express) {
        this.app = app;
    
        this.app.use(express.static(path.resolve("./") + "/build/frontend"));
    
        this.app.use("/api", apiRoutes);
    
        this.app.get("*", (req: Request, res: Response): void => {
            res.sendFile(path.resolve("./") + "/build/frontend/index.html");
        });
    }

    public start(port: number): void {        
        dbDataSource.initialize()
            .then(() => {
                console.log("Database connected");
                this.app.listen(port, () => {
                console.log(`Server running on port ${port}`);
                });
            })
            .catch((err) => {
                console.log(err);
                process.exit(1);
            });
    }

}