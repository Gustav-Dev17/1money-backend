import { CreateUserController } from "../controllers/user/CreateUserController";
import { Router } from "express";
const router = Router();

import LoginUserController from "../controllers/user/LoginUserController";
import DeleteUserController from "../controllers/user/DeleteUserController";
import ShowUserController from "../controllers/user/ShowUserController";
import verifyToken from "../middlewares/VerifyToken";
import UpdateUserController from "../controllers/user/UpdateUserController";

router.post("/register", CreateUserController);
router.post("/login", LoginUserController);
router.put("/:id", verifyToken, UpdateUserController);
router.get("/:id", verifyToken, ShowUserController);
router.delete("/:id", verifyToken, DeleteUserController);

export default router;
