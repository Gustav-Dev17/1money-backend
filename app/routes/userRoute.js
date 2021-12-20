const { CreateUserController } = require("../controllers/CreateUserController");
const { LoginUserController } = require("../controllers/LoginUserController");
const { UpdateUserController } = require("../controllers/UpdateUserController");

const route = require("express").Router();

route.post("/register", CreateUserController);
route.post("/login", LoginUserController)
route.put("/:id", UpdateUserController);

module.exports = route;
