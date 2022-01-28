import "reflect-metadata";
import "./app/database";
import express from "express";
import userRoute from "./app/routes/userRoute";
import adminRoute from "./app/routes/adminRoute";
import cors from 'cors';

require("dotenv").config();

const app = express();

const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoute);
app.use("/admin", adminRoute);

app.listen(3000, () => console.log("Server is running"));
