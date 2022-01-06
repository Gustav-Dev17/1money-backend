import { CreateUserController } from "../controllers/user/CreateUserController";
import { Router } from "express";
import LoginUserController from "../controllers/user/LoginUserController";
import DeleteUserController from "../controllers/user/DeleteUserController";
import GetUserController from "../controllers/user/GetUserController";
import verifyToken from "../middlewares/VerifyToken";
import UpdateUserController from "../controllers/user/UpdateUserController";
import { UpdateProfileController } from "../controllers/user/UpdateProfileController";
import multer from "multer";
import multerPhoto from "../config/multerPhoto";
import { GetAllCoursesController } from "../controllers/user/course/GetAllCoursesController";
import GetCourseController from "../controllers/user/course/GetCourseController";

const router = Router();

//profile routes

router.post("/register", CreateUserController);
router.post("/login", LoginUserController);
router.put("/", verifyToken, UpdateUserController);
router.get("/", verifyToken, GetUserController);
router.delete("/", verifyToken, DeleteUserController);
router.put(
  "/profile",
  verifyToken,
  multer(multerPhoto).single("photo"),
  UpdateProfileController
);

//courses routes

router.get("/courses", GetAllCoursesController);
router.get("/course/:id", GetCourseController);

//lessons routes


export default router;
