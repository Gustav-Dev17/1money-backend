import { Router } from "express";
const router = Router();
import multer from "multer";

import { CreateCourseController } from "../controllers/admin/course/CreateCourseController";
import { GetAllCoursesController } from "../controllers/admin/course/GetAllCoursesController";
import { CreateLessonController } from "../controllers/admin/lesson/CreateLessonController";
import { GetAllLessonsInACoursesController } from "../controllers/admin/course/GetAllLessonsInACoursesController";
import { CreateAdminController } from "../controllers/admin/CreateAdminController";
import { LoginAdminController } from "../controllers/admin/LoginAdminController";
import { verifyTokenAdmin } from "../middlewares/VerifyTokenAdmin";
import GetAdminController from "../controllers/admin/GetAdminController";
import multerConfig from "../config/multer";
import { UpdateLessonController } from "../controllers/admin/lesson/UpdateLessonController";
router.post("/register", CreateAdminController);
router.post("/login", LoginAdminController);
router.get("/", GetAdminController);
router.get("/course", GetAllCoursesController);
router.post("/course", verifyTokenAdmin, CreateCourseController);
router.post(
  "/lesson",
  verifyTokenAdmin,
  multer(multerConfig).single("file"),
  CreateLessonController
);
router.get("/course/:id", GetAllLessonsInACoursesController);
router.put(
  "/lesson/:id",
  verifyTokenAdmin,
  multer(multerConfig).single("file"),
  UpdateLessonController
);

export default router;
