const { CreateUserController } = require("../controllers/user/CreateUserController");
const { LoginUserController } = require("../controllers/user/LoginUserController");
const { UpdateUserController } = require("../controllers/user/UpdateUserController");
const { ShowUserController } = require("../controllers/user/ShowUserController");
const verifyToken = require("../middlewares/VerifyToken");

const route = require("express").Router();

route.post("/register", CreateUserController);
route.post("/login", LoginUserController);
route.put("/:id", verifyToken, UpdateUserController);
route.get("/show/:id", verifyToken, ShowUserController);

module.exports = route;