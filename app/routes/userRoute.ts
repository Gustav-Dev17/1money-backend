import { CreateUserController } from "../controllers/user/account/CreateUserController";
import { Router } from "express";
import LoginUserController from "../controllers/user/account/LoginUserController";
import DeleteUserController from "../controllers/user/account/DeleteUserController";
import GetUserController from "../controllers/user/account/GetUserController";
import verifyToken from "../middlewares/VerifyToken";
import UpdateUserController from "../controllers/user/account/UpdateUserController";
import { UpdateUserProfileController } from "../controllers/user/account/UpdateUserProfileController";
import multer from "multer";
import multerPhoto from "../config/multerPhoto";
import { GetAllCoursesController } from "../controllers/user/course/GetAllCoursesController";
import { GetAllLessonsInACourseController } from "../controllers/admin/course/GetAllLessonsInACourseController";
import { AddCourseToCartController } from "../controllers/user/cart/AddCourseToCartController";
import { ListCoursesFromCartController } from "../controllers/user/cart/ListCoursesFromCartController";
import { BuyCourseController } from "../controllers/user/purchase/BuyCourseController";
import { RemoveCourseFromCartController } from "../controllers/user/cart/RemoveCourseFromCartController";

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
  UpdateUserProfileController
);

//courses routes

router.get("/courses", GetAllCoursesController);
router.get("/course/:id", GetAllLessonsInACourseController);

//cart routes

router.post("/cart", verifyToken, AddCourseToCartController);
router.get("/cart", verifyToken, ListCoursesFromCartController);
router.delete("/cart/:id", verifyToken, RemoveCourseFromCartController)

//purchase routes

router.post("/purchase", verifyToken, BuyCourseController);

export default router;
