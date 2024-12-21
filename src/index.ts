import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router"

const app = express();

app.use(cors({
    credentials: true,
    origin: true // Added origin to fix the CORS issue
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/mydatabase"; // Update this with your MongoDB connection string

mongoose.connect(MONGO_URL);

mongoose.connection.on("error", (error: Error) => console.log(error));
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");

    const server = http.createServer(app);

    server.listen(8080, () => {
        console.log("Server running on http://localhost:8080/");
    });
});

app.use("/", router())
