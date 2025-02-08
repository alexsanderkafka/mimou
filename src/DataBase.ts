import { DataSource } from 'typeorm';

import Images from "./model/Images";
import Person from "./model/Person";
import Plan from "./model/Plan";
import 'dotenv/config';
import Message from './model/Message';

export const MysqlDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "test",
    entities: [Images, Plan, Person, Message],
    logging: true
});