"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multerPhoto_1 = __importDefault(require("../config/multerPhoto"));
const VerifyToken_1 = __importDefault(require("../middlewares/VerifyToken"));
const GetUserController_1 = __importDefault(require("../controllers/user/account/GetUserController"));
const LoginUserController_1 = __importDefault(require("../controllers/user/account/LoginUserController"));
const UpdateUserController_1 = __importDefault(require("../controllers/user/account/UpdateUserController"));
const DeleteUserController_1 = __importDefault(require("../controllers/user/account/DeleteUserController"));
const ResetUserPasswordController_1 = __importDefault(require("../controllers/user/account/ResetUserPasswordController"));
const express_1 = require("express");
const BuyCourseController_1 = require("../controllers/user/purchase/BuyCourseController");
const CreateUserController_1 = require("../controllers/user/account/CreateUserController");
const SearchCoursesController_1 = require("../controllers/user/course/SearchCoursesController");
const BuyCourseOnlyController_1 = require("../controllers/user/purchase/BuyCourseOnlyController");
const GetAllCoursesController_1 = require("../controllers/user/course/GetAllCoursesController");
const AddCourseToCartController_1 = require("../controllers/user/cart/AddCourseToCartController");
const UpdateUserProfileController_1 = require("../controllers/user/account/UpdateUserProfileController");
const GetCoursesPurchaseController_1 = require("../controllers/user/course/GetCoursesPurchaseController");
const ListCoursesFromCartController_1 = require("../controllers/user/cart/ListCoursesFromCartController");
const RemoveCourseFromCartController_1 = require("../controllers/user/cart/RemoveCourseFromCartController");
const AddCourseToFavoritesController_1 = require("../controllers/user/favorites/AddCourseToFavoritesController");
const ListFavoritesCoursesController_1 = require("../controllers/user/favorites/ListFavoritesCoursesController");
const GetAllLessonsInACourseController_1 = require("../controllers/admin/course/GetAllLessonsInACourseController");
const RemoveCourseFromFavoriteController_1 = require("../controllers/user/favorites/RemoveCourseFromFavoriteController");
const router = (0, express_1.Router)();
//profile routes
router.post("/register", CreateUserController_1.CreateUserController);
router.post("/login", LoginUserController_1.default);
router.post("/reset_password", ResetUserPasswordController_1.default);
router.put("/", VerifyToken_1.default, UpdateUserController_1.default);
router.get("/", VerifyToken_1.default, GetUserController_1.default);
router.delete("/", VerifyToken_1.default, DeleteUserController_1.default);
router.put("/profile", VerifyToken_1.default, (0, multer_1.default)(multerPhoto_1.default).single("photo"), UpdateUserProfileController_1.UpdateUserProfileController);
//courses routes
router.get("/courses", SearchCoursesController_1.SearchCoursesController);
router.get("/courses", GetAllCoursesController_1.GetAllCoursesController);
router.get("/course/:id", GetAllLessonsInACourseController_1.GetAllLessonsInACourseController);
//cart routes
router.post("/cart", VerifyToken_1.default, AddCourseToCartController_1.AddCourseToCartController);
router.get("/cart", VerifyToken_1.default, ListCoursesFromCartController_1.ListCoursesFromCartController);
router.delete("/cart/:id", VerifyToken_1.default, RemoveCourseFromCartController_1.RemoveCourseFromCartController);
//purchase routes
router.post("/purchase", VerifyToken_1.default, BuyCourseController_1.BuyCourseController);
router.post("/purchase/only", VerifyToken_1.default, BuyCourseOnlyController_1.BuyCourseOnlyController);
router.get("/purchase", VerifyToken_1.default, GetCoursesPurchaseController_1.GetCoursesPurchaseController);
//favorite courses
router.post("/favorite", VerifyToken_1.default, AddCourseToFavoritesController_1.AddCourseToFavoritesController);
router.get("/favorite", VerifyToken_1.default, ListFavoritesCoursesController_1.ListFavoritesCoursesController);
router.delete("/favorite/:id", VerifyToken_1.default, RemoveCourseFromFavoriteController_1.RemoveCourseFromFavoriteController);
exports.default = router;
