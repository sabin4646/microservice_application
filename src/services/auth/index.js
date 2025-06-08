import dotenv from "dotenv";
import express from "express";
import connectDb from "./db/index.js";
import userRouter from "./routes/user.routes.js";
import { startEmailProducer } from "./producer/email/email.producer.js";
import { startNotificationProducer } from "./producer/notification/notification.producer.js";

dotenv.config({ path: "./.env" });

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/user", userRouter);



connectDb().then((value) => {
    app.listen(PORT, async () => {
        await startEmailProducer();
        await startNotificationProducer();
        console.log(`Auth service is running at Port Number ${PORT}`);
    });
}).catch((e) => {
    console.log(`An error occured ${e}`);
})