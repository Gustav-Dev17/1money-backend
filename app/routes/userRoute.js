const { CreateUserController } = require("../controllers/CreateUserController");
const { UpdateUserController } = require("../controllers/UpdateUserController");

const route = require("express").Router();

route.post("/register", CreateUserController);
route.put("/:id", UpdateUserController);

module.exports = route;
