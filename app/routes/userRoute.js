const { CreateUserController } = require("../controllers/CreateUserController");

const route = require("express").Router();

route.post("/register", CreateUserController)

module.exports = route;
