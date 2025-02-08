
import 'reflect-metadata';
import express from 'express';
import { createExpressServer } from 'routing-controllers';
import FormCreatePageController from './controllers/FormCreatePageController';
import { initializeApp } from "firebase/app";

import { MysqlDataSource } from './DataBase';
import firebaseConfig from './firebase';
import CustomErrorHandler from './middlewares/CustomErrorHandler';
import 'dotenv/config';
import PayingController from './controllers/PayingController';
import InformantiosToGift from './controllers/InformationsToGift';

const app = createExpressServer({
    cors: true,
    controllers: [FormCreatePageController, InformantiosToGift, PayingController],
    middlewares: [CustomErrorHandler],
    routePrefix: "/api",
    //defaultErrorHandler: false
});

app.use(express.json());

const initializeDatabase = async () => {
    try {
        await MysqlDataSource.initialize();
        console.log("Data Source has been initialized!");
      } catch (err) {
        console.error("Error during Data Source initialization:", err);
        process.exit(1);
    }
}

initializeDatabase();
initializeApp(firebaseConfig);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});