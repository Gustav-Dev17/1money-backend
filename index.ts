import "reflect-metadata";
require("dotenv").config();
import "./app/database";
import express from "express";
import userRoute from "./app/routes/userRoute";
import adminRoute from "./app/routes/adminRoute";
import cors from "cors";

const app = express();

const options = {
  origin: 'http://localhost:3000',
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // preflightContinue: false,
  // optionsSuccessStatus: 204,
  credentials: true
};

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors(options));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoute);
app.use("/admin", adminRoute);

app.listen(3000, () => console.log("Server is running"));