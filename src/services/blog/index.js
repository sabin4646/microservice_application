import dotenv from "dotenv";
import express from "express";
import connectDb from "./db/index.js";
import blogRouter from "./route/blog.route.js";


dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 5000;

connectDb().then((value) => {
    app.listen(PORT, () => {
        console.log(`Blog Service is running at Port ${PORT}`);
    })
}).catch((e) => {
    console.log(`An error occured $e`);
})