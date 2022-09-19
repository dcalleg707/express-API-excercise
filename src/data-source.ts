import { DataSource } from 'typeorm';

require("dotenv").config();

export const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_ACCOUNT,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: !!process.env.PG_SYNCHRONIZE,
    logging: !!process.env.PG_LOGGING,
    entities: [process.env.PG_ENTITIES || ""],
});

export default AppDataSource;
