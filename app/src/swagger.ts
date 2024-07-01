
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
            url: 'http://localhost:8080/api/',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        },
        schemas: {
            loginInputSchema: {
                $username: 'username',
                $password: 'somepassword',
            },
            loginOutputSchema: {
                status: true,
                token: 'token',
                refresh: 'refresh-token',
            },
            accountSchema: {
                id: 'uuid-hash',
                username: 'unique-username',
                email: 'mail@email.com',
                create_at: 'yyyy-mm-dd',
                update_at: 'yyyy-mm-dd',
            },
            accountInSchema: {
                username: 'unique-username',
                password: 'somepassword',
                email: 'mail@email.com',
            },
            listAccountSchema: [
                {
                    id: 'uuid-hash',
                    username: 'unique-username',
                    password: 'somepassword',
                    email: 'mail@email.com',
                    create_at: 'yyyy-mm-dd',
                    update_at: 'yyyy-mm-dd',
                }
            ],
            groupSchema: {
                id: 'uuid-hash',
                name: 'unique-name',
                create_at: 'yyyy-mm-dd',
                update_at: 'yyyy-mm-dd',
            },
            groupInSchema: {
                name: 'unique-name',
            },
            groupAccountsSchema: {
                id: 'uuid-hash',
                name: 'unique-name',
                create_at: 'yyyy-mm-dd',
                update_at: 'yyyy-mm-dd',
                accounts: [
                    {
                        id: 'uuid-hash',
                        username: 'unique-username',
                        email: 'mail@email.com',
                        create_at: 'yyyy-mm-dd',
                        update_at: 'yyyy-mm-dd',
                    }
                ],
            },
            groupAccountsInSchema: {
                accountId: 'uuid-hash',
            },
            groupDashboardsSchema: {
                id: 'uuid-hash',
                name: 'unique-name',
                create_at: 'yyyy-mm-dd',
                update_at: 'yyyy-mm-dd',
                dashboards: [
                    {
                        id: 'uuid-hash',
                        name: 'unique-name',
                        create_at: 'yyyy-mm-dd',
                        update_at: 'yyyy-mm-dd',
                        kibanaId: 'uuid-hash',
                    }
                ],
            },
            groupDashboardsInSchema: {
                dashboardId: 'uuid-hash',
            },
            listGroupSchema: [
                {
                    id: 'uuid-hash',
                    name: 'unique-name',
                    create_at: 'yyyy-mm-dd',
                    update_at: 'yyyy-mm-dd',
                }
            ],
            dashboardSchema: {
                id: 'uuid-hash',
                title: 'unique-name',
                url: 'dashboard-url',
                create_at: 'yyyy-mm-dd',
                update_at: 'yyyy-mm-dd',
            },
            dashboardInSchema: {
                dashboard: {
                    title: 'unique-name',
                    url: 'dashboard-url',
                },
                kibana_id: 'uuid-hash'
            },
            listDashboardSchema: [
                {
                    id: 'uuid-hash',
                    title: 'unique-name',
                    url: 'dashboard-url',
                    create_at: 'yyyy-mm-dd',
                    update_at: 'yyyy-mm-dd',
                }
            ],
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/api/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);