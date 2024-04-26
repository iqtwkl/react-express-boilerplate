import express, {Express, Request, Response} from "express";
import path from 'path';
import { apiRoutes } from './src/routes/api';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from "./swagger_output.json";

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
        const options = {
            definition: {
              openapi: "3.1.0",
              info: {
                title: "API with Swagger",
                version: "0.1.0",
                description:
                  "This is a simple CRUD API application made with Express and documented with Swagger",
                license: {
                  name: "MIT",
                  url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                  name: "Iqbal Tawakal",
                  url: "https://www.linkedin.com/in/iqbaltaws/",
                  email: "iqtwkl@gmail.com",
                },
              },
              servers: [
                {
                  url: `http://localhost:${port}`,
                },
              ],
            },
            apis: ["./src/routes/api/*.ts"],
        };
          
        const specs = swaggerJsdoc(options);
        
        this.app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerOutput)
        );

        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
        console.log(this.app._router.stack);
    }

}