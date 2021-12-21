const { CreateUserController } = require("../controllers/user/CreateUserController");
const { LoginUserController } = require("../controllers/user/LoginUserController");
const { UpdateUserController } = require("../controllers/user/UpdateUserController");
const { ShowUserController } = require("../controllers/user/ShowUserController");
const { DeleteUserController } = require("../controllers/user/DeleteUserController");

const verifyToken = require("../middlewares/VerifyToken");

const route = require("express").Router();

route.post("/register", CreateUserController);
route.post("/login", LoginUserController);
route.put("/:id", verifyToken, UpdateUserController);
route.get("/:id", verifyToken, ShowUserController);
route.delete("/:id", verifyToken, DeleteUserController);

module.exports = route;