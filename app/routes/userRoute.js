const { CreateUserController } = require("../controllers/CreateUserController");
const { LoginUserController } = require("../controllers/LoginUserController");
const { UpdateUserController } = require("../controllers/UpdateUserController");
const verifyToken = require("../middlewares/VerifyToken");

const route = require("express").Router();

route.post("/register", CreateUserController);
route.post("/login", LoginUserController);
route.put("/:id", verifyToken, UpdateUserController);

module.exports = route;
