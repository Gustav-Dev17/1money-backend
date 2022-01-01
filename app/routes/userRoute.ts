import { CreateUserController } from "../controllers/user/CreateUserController";
import { Router } from "express";
const router = Router();

import LoginUserController from "../controllers/user/LoginUserController";
import DeleteUserController from "../controllers/user/DeleteUserController";
import GetUserController from "../controllers/user/GetUserController";
import verifyToken from "../middlewares/VerifyToken";
import UpdateUserController from "../controllers/user/UpdateUserController";

router.post("/register", CreateUserController);
router.post("/login", LoginUserController);
router.put("/", verifyToken, UpdateUserController);
router.get("/", verifyToken, GetUserController);
router.delete("/", verifyToken, DeleteUserController);

export default router;
