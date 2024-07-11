
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
            requestResetPasswordInSchema: {
                email: 'mail@email.com'
            },
            resetPasswordInSchema: {
                token: 'token',
                newPassword: 'somepassword'
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
                is_admin: 0,
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
            kibanaSchema: {
                id: "uuid-hash",
                username: "username",
                connection_name: "unique-name",
                password: "somepassword",
                create_at: 'yyyy-mm-dd',
                update_at: 'yyyy-mm-dd',
            },
            listKibanaSchema: [
                {
                    id: "uuid-hash",
                    username: "username",
                    connection_name: "unique-name",
                    password: "somepassword",
                    create_at: 'yyyy-mm-dd',
                    update_at: 'yyyy-mm-dd',
                }
            ],
            kibanaInSchema: {
                username: "username",
                connection_name: "unique-name",
                password: "somepassword",
            },
            elasticSchema: {
                id: "uuid-hash",
                username: "username",
                connection_name: "unique-name",
                password: "somepassword",
                index: "index-name",
                create_at: 'yyyy-mm-dd',
                update_at: 'yyyy-mm-dd',
            },
            listElasticSchema: [
                {
                    id: "uuid-hash",
                    username: "username",
                    connection_name: "unique-name",
                    password: "somepassword",
                    index: "index-name",
                    create_at: 'yyyy-mm-dd',
                    update_at: 'yyyy-mm-dd',
                }
            ],
            elasticInSchema: {
                username: "username",
                connection_name: "unique-name",
                password: "somepassword",
                index: "index-name",
            },
            logstashSchema: {
                id: 'uuid-hash',
                username: 'username',
                connection_name: 'host-ip',
                password: 'ssh-username',
                ip: 'ssh-password',
                directory: 'remote-path',
                input_path: 'input-path',
                grok_pattern: 'grok-pattern',
                elasticsearch_host: 'elasticsearch-host',
                index_name: 'index-name',
                create_at: 'yyyy-mm-dd',
                update_at: 'yyyy-mm-dd',
            },
            listLogstashSchema: [
                {
                    id: 'uuid-hash',
                    username: 'ssh-username',
                    connection_name: 'unique-name',
                    password: 'ssh-password',
                    ip: 'host-ip',
                    directory: 'remote-path',
                    input_path: 'input-path',
                    grok_pattern: 'grok-pattern',
                    elasticsearch_host: 'elasticsearch-host',
                    index_name: 'index-name',
                    create_at: 'yyyy-mm-dd',
                    update_at: 'yyyy-mm-dd',
                }
            ],
            logstashInSchema: {
                connection_name: 'unique-name',
                ip: 'host-ip',
                username: 'ssh-username',
                password: 'ssh-password',
                directory: 'remote-path',
                input_path: 'input-path',
                grok_pattern: 'grok-pattern',
                elasticsearch_host: 'elasticsearch-host',
                index_name: 'index-name'
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/api/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);