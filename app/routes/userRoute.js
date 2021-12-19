const { CreateUserController } = require("../controllers/CreateUserController");

const route = require("express").Router();

route.post("/", CreateUserController)

module.exports = route;
