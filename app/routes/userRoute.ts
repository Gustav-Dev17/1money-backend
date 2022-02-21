import multer from "multer";
import multerPhoto from "../config/multerPhoto";
import verifyToken from "../middlewares/VerifyToken";
import GetUserController from "../controllers/user/account/GetUserController";
import LoginUserController from "../controllers/user/account/LoginUserController";
import UpdateUserController from "../controllers/user/account/UpdateUserController";
import DeleteUserController from "../controllers/user/account/DeleteUserController";
import ResetUserPasswordController from "../controllers/user/account/ResetUserPasswordController";

import { Router } from "express";
import { BuyCourseController } from "../controllers/user/purchase/BuyCourseController";
import { CreateUserController } from "../controllers/user/account/CreateUserController";
import { CreateAnswerController } from "../controllers/user/answer/CreateAnswerController";
import { UpdateAnswerController } from "../controllers/user/answer/UpdateAnswerController";
import { DeleteAnswerController } from "../controllers/user/answer/DeleteAnswerController";
import { SearchCoursesController } from "../controllers/user/course/SearchCoursesController";
import { BuyCourseOnlyController } from "../controllers/user/purchase/BuyCourseOnlyController";
import { GetAllCoursesController } from "../controllers/user/course/GetAllCoursesController";
import { CreateCommentController } from "../controllers/user/comment/CreateCommentController";
import { UpdateCommentController } from "../controllers/user/comment/UpdateCommentController";
import { DeleteCommentController } from "../controllers/user/comment/DeleteCommentController";
import { AddCourseToCartController } from "../controllers/user/cart/AddCourseToCartController";
import { UpdateUserProfileController } from "../controllers/user/account/UpdateUserProfileController";
import { GetCoursesPurchaseController } from "../controllers/user/course/GetCoursesPurchaseController";
import { ListCoursesFromCartController } from "../controllers/user/cart/ListCoursesFromCartController";
import { RemoveCourseFromCartController } from "../controllers/user/cart/RemoveCourseFromCartController";
import { AddCourseToFavoritesController } from "../controllers/user/favorites/AddCourseToFavoritesController";
import { ListFavoritesCoursesController } from "../controllers/user/favorites/ListFavoritesCoursesController";
import { GetAllLessonsInACourseController } from "../controllers/admin/course/GetAllLessonsInACourseController";
import { RemoveCourseFromFavoriteController } from "../controllers/user/favorites/RemoveCourseFromFavoriteController";

const router = Router();

//profile routes
router.post("/register", CreateUserController);
router.post("/login", LoginUserController);
router.post("/reset_password", ResetUserPasswordController);
router.put("/", verifyToken, UpdateUserController);
router.get("/", verifyToken, GetUserController);
router.delete("/", verifyToken, DeleteUserController);
router.put("/profile", verifyToken, multer(multerPhoto).single("photo"), UpdateUserProfileController);

//courses routes
router.get("/courses", SearchCoursesController);
router.get("/courses", GetAllCoursesController);
router.get("/course/:id", GetAllLessonsInACourseController);

//cart routes
router.post("/cart", verifyToken, AddCourseToCartController);
router.get("/cart", verifyToken, ListCoursesFromCartController);
router.delete("/cart/:id", verifyToken, RemoveCourseFromCartController);

//purchase routes
router.post("/purchase", verifyToken, BuyCourseController);
router.post("/purchase/only", verifyToken, BuyCourseOnlyController);
router.get("/purchase", verifyToken, GetCoursesPurchaseController);

//favorite courses
router.post("/favorite", verifyToken, AddCourseToFavoritesController);
router.get("/favorite", verifyToken, ListFavoritesCoursesController);
router.delete("/favorite/:id", verifyToken, RemoveCourseFromFavoriteController);

//comments & answers routes
router.post("/comment", verifyToken, CreateCommentController);
router.put("/comment/:id", verifyToken, UpdateCommentController);
router.delete("/comment/:id", verifyToken, DeleteCommentController);

router.post("/answer", verifyToken, CreateAnswerController);
router.put("/answer/:id", verifyToken, UpdateAnswerController);
router.delete("/answer/:id", verifyToken, DeleteAnswerController);

export default router;
