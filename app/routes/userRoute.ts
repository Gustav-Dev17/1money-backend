import multer from "multer";
import multerPhoto from "../config/multerPhoto";
import verifyToken from "../middlewares/VerifyToken";
import GetUserController from "../controllers/user/account/GetUserController";
import LoginUserController from "../controllers/user/account/LoginUserController";
import UpdateUserController from "../controllers/user/account/UpdateUserController";
import DeleteUserController from "../controllers/user/account/DeleteUserController";

import { Router } from "express";
import { BuyCourseController } from "../controllers/user/purchase/BuyCourseController";
import { CreateUserController } from "../controllers/user/account/CreateUserController";
import { GetAllCoursesController } from "../controllers/user/course/GetAllCoursesController";
import { AddCourseToCartController } from "../controllers/user/cart/AddCourseToCartController";
import { UpdateUserProfileController } from "../controllers/user/account/UpdateUserProfileController";
import { ListCoursesFromCartController } from "../controllers/user/cart/ListCoursesFromCartController";
import { RemoveCourseFromCartController } from "../controllers/user/cart/RemoveCourseFromCartController";
import { GetAllLessonsInACourseController } from "../controllers/admin/course/GetAllLessonsInACourseController";

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
