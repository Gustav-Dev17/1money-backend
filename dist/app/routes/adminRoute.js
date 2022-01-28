"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multerPhoto_1 = __importDefault(require("../config/multerPhoto"));
const multerVideo_1 = __importDefault(require("../config/multerVideo"));
const GetAdminController_1 = __importDefault(require("../controllers/admin/account/GetAdminController"));
const UpdateAdminController_1 = __importDefault(require("../controllers/admin/account/UpdateAdminController"));
const ResetAdminPasswordController_1 = __importDefault(require("../controllers/admin/account/ResetAdminPasswordController"));
const express_1 = require("express");
const VerifyTokenAdmin_1 = require("../middlewares/VerifyTokenAdmin");
const LoginAdminController_1 = require("../controllers/admin/account/LoginAdminController");
const CreateAdminController_1 = require("../controllers/admin/account/CreateAdminController");
const CreateCourseController_1 = require("../controllers/admin/course/CreateCourseController");
const CreateLessonController_1 = require("../controllers/admin/lesson/CreateLessonController");
const UpdateLessonController_1 = require("../controllers/admin/lesson/UpdateLessonController");
const DeleteLessonController_1 = require("../controllers/admin/lesson/DeleteLessonController");
const GetAllCoursesController_1 = require("../controllers/admin/course/GetAllCoursesController");
const UpdateAdminProfileController_1 = require("../controllers/admin/account/UpdateAdminProfileController");
const GetAllLessonsInACourseController_1 = require("../controllers/admin/course/GetAllLessonsInACourseController");
const router = (0, express_1.Router)();
//login & register routes
router.post("/register", CreateAdminController_1.CreateAdminController);
router.post("/login", LoginAdminController_1.LoginAdminController);
router.post("/reset_password", ResetAdminPasswordController_1.default);
router.get("/", VerifyTokenAdmin_1.verifyTokenAdmin, GetAdminController_1.default);
router.put("/", VerifyTokenAdmin_1.verifyTokenAdmin, UpdateAdminController_1.default);
router.put("/profile", VerifyTokenAdmin_1.verifyTokenAdmin, (0, multer_1.default)(multerPhoto_1.default).single("photo"), UpdateAdminProfileController_1.UpdateAdminProfileController);
//courses routes
router.post("/course", VerifyTokenAdmin_1.verifyTokenAdmin, CreateCourseController_1.CreateCourseController);
router.get("/courses", VerifyTokenAdmin_1.verifyTokenAdmin, GetAllCoursesController_1.GetAllCoursesController);
router.get("/course/:id", VerifyTokenAdmin_1.verifyTokenAdmin, GetAllLessonsInACourseController_1.GetAllLessonsInACourseController);
//lesson routes
router.post("/lesson", VerifyTokenAdmin_1.verifyTokenAdmin, (0, multer_1.default)(multerVideo_1.default).single("video"), CreateLessonController_1.CreateLessonController);
router.put("/lesson/:id", VerifyTokenAdmin_1.verifyTokenAdmin, (0, multer_1.default)(multerVideo_1.default).single("video"), UpdateLessonController_1.UpdateLessonController);
router.delete("/lesson/:id", VerifyTokenAdmin_1.verifyTokenAdmin, DeleteLessonController_1.DeleteLessonController);
exports.default = router;
