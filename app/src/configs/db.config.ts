import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Account } from '../models/Account';

dotenv.config();

const env = process.env;

export const dbDataSource = new DataSource({
  type: "sqlite",
  database: `./data/datasource.sqlite`,
  entities: [ Account ],
  logging: true,
  // migrations: [__dirname + "/migration/*.ts"],
  synchronize: true,
});

/*
* MySQL
*
const dataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  port: env.DB_PORT || 3306,
  entities: [],
};

* PostgreSQL
*
export const dbDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: 5432,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [],
  synchronize: env.NODE_ENV === "development" ? true : false,
  logging: env.NODE_ENV === "development" ? true : false,
});

 * SQLite
 *
export const dbDataSource = new DataSource({
  type: "sqlite",
  database: `${root}/data/line.sqlite`,
  entities: [],
  logging: true
});
 */