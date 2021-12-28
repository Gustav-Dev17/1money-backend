import "reflect-metadata";
import express from "express";
import "./app/database";
import userRoute from "./app/routes/userRoute";
import adminRoute from "./app/routes/adminRoute";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoute);
app.use("/admin", adminRoute);

app.listen(3000, () => console.log("Server is running"));
