const { CreateUserController } = require("../controllers/user/CreateUserController");
const { LoginUserController } = require("../controllers/user/LoginUserController");
const { UpdateUserController } = require("../controllers/user/UpdateUserController");
const verifyToken = require("../middlewares/VerifyToken");

const route = require("express").Router();

route.post("/register", CreateUserController);
route.post("/login", LoginUserController);
route.put("/:id", verifyToken, UpdateUserController);

module.exports = route;


