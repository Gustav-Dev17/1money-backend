import "reflect-metadata";
require("dotenv").config();
import "./app/database";
import express from "express";
import userRoute from "./app/routes/userRoute";
import adminRoute from "./app/routes/adminRoute";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoute);
app.use("/admin", adminRoute);

app.listen(3000, () => console.log("Server is running"));
