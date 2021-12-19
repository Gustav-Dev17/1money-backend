const express = require("express");
const { User } = require("./app/models");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//User.create({ name: 'Teste', email: 'teste@email.com.br', password: '123456' });

app.listen(3000, () => console.log("Server is running"));
