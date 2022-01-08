import { CreateUserController } from "../controllers/user/account/CreateUserController";
import { Router } from "express";
import LoginUserController from "../controllers/user/account/LoginUserController";
import DeleteUserController from "../controllers/user/account/DeleteUserController";
import GetUserController from "../controllers/user/account/GetUserController";
import verifyToken from "../middlewares/VerifyToken";
import UpdateUserController from "../controllers/user/account/UpdateUserController";
import { UpdateProfileController } from "../controllers/user/account/UpdateProfileController";
import multer from "multer";
import multerPhoto from "../config/multerPhoto";
import { GetAllCoursesController } from "../controllers/user/course/GetAllCoursesController";
import GetCourseController from "../controllers/user/course/GetCourseController";
import { AddCourseToCart } from "../controllers/user/course/ AddCourseToCart";
import { ListCoursesFromCart } from "../controllers/user/cart/ListCoursesFromCart";

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
router.post("/cart", verifyToken, AddCourseToCart);
router.get("/cart", verifyToken, ListCoursesFromCart);

//lessons routes

export default router;
