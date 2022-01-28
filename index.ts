import "reflect-metadata";
require("dotenv").config();
import "./app/database";
import express from "express";
import userRoute from "./app/routes/userRoute";
import adminRoute from "./app/routes/adminRoute";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const options = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(options));

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoute);
app.use("/admin", adminRoute);

app.listen(3000, () => console.log("Server is running"));
