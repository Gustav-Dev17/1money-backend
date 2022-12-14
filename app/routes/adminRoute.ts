import multer from "multer";
import multerFiles from "../config/multerFiles";
import multerPhoto from "../config/multerPhoto";
import multerVideo from "../config/multerVideo";
import GetAdminController from "../controllers/admin/account/GetAdminController";
import UpdateAdminController from "../controllers/admin/account/UpdateAdminController";
import ResetAdminPasswordController from "../controllers/admin/account/ResetAdminPasswordController";

import { Router } from "express";
import { verifyTokenAdmin } from "../middlewares/VerifyTokenAdmin";
import { LoginAdminController } from "../controllers/admin/account/LoginAdminController";
import { CreateAdminController } from "../controllers/admin/account/CreateAdminController";
import { CreateCourseController } from "../controllers/admin/course/CreateCourseController";
import { CreateLessonController } from "../controllers/admin/lesson/CreateLessonController";
import { UpdateLessonController } from "../controllers/admin/lesson/UpdateLessonController";
import { DeleteLessonController } from "../controllers/admin/lesson/DeleteLessonController";
import { CreateAnswerController } from "../controllers/admin/answer/CreateAnswerController";
import { DeleteAnswerController } from "../controllers/admin/answer/DeleteAnswerController";
import { UpdateAnswerController } from "../controllers/admin/answer/UpdateAnswerController";
import { CreateCommentController } from "../controllers/admin/comment/CreateCommentController";
import { UpdateCommentController } from "../controllers/admin/comment/UpdateCommentController";
import { DeleteCommentController } from "../controllers/admin/comment/DeleteCommentController";
import { GetAllCoursesController } from "../controllers/admin/course/GetAllCoursesController";
import { UpdateAdminProfileController } from "../controllers/admin/account/UpdateAdminProfileController";
import { GetAllLessonsInACourseController } from "../controllers/admin/course/GetAllLessonsInACourseController";
import { UpdateCourseController } from "../controllers/admin/course/UpdateCourseController";

const router = Router();

//login & register routes
router.post("/register", CreateAdminController);
router.post("/login", LoginAdminController);
router.post("/reset_password", ResetAdminPasswordController);
router.get("/", verifyTokenAdmin, GetAdminController);
router.put("/", verifyTokenAdmin, UpdateAdminController);
router.put(
  "/profile",
  verifyTokenAdmin,
  multer(multerPhoto).single("photo"),
  UpdateAdminProfileController
);

//courses routes
router.post(
  "/course",
  verifyTokenAdmin,
  multer(multerFiles).fields([
    { name: "pre_video", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  CreateCourseController
);
router.get("/courses", verifyTokenAdmin, GetAllCoursesController);
router.get("/course/:id", verifyTokenAdmin, GetAllLessonsInACourseController);
router.put(
  "/course/:id",
  verifyTokenAdmin,
  multer(multerFiles).fields([
    { name: "pre_video", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  UpdateCourseController
);

//lesson routes
router.post(
  "/lesson",
  verifyTokenAdmin,
  multer(multerVideo).single("video"),
  CreateLessonController
);
router.put(
  "/lesson/:id",
  verifyTokenAdmin,
  multer(multerVideo).single("video"),
  UpdateLessonController
);
router.delete("/lesson/:id", verifyTokenAdmin, DeleteLessonController);

//comments & answers routes
router.post("/comment", verifyTokenAdmin, CreateCommentController);
router.put("/comment/:id", verifyTokenAdmin, UpdateCommentController);
router.delete("/comment/:id", verifyTokenAdmin, DeleteCommentController);

router.post("/answer", verifyTokenAdmin, CreateAnswerController);
router.put("/answer/:id", verifyTokenAdmin, UpdateAnswerController);
router.delete("/answer/:id", verifyTokenAdmin, DeleteAnswerController);

export default router;
