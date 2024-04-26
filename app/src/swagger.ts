
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: '0.0.1',
        title: 'Swagger',
        description: 'This is a simple CRUD API application made with Express and documented with Swagger',
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
            url: 'http://localhost:8080',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/api/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);