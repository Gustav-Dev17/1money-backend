import { Router } from "express";
import multer from "multer";
import { CreateCourseController } from "../controllers/admin/course/CreateCourseController";
import { GetAllCoursesController } from "../controllers/admin/course/GetAllCoursesController";
import { CreateLessonController } from "../controllers/admin/lesson/CreateLessonController";
import { GetAllLessonsInACoursesController } from "../controllers/admin/course/GetAllLessonsInACoursesController";
import { CreateAdminController } from "../controllers/admin/CreateAdminController";
import { LoginAdminController } from "../controllers/admin/LoginAdminController";
import { verifyTokenAdmin } from "../middlewares/VerifyTokenAdmin";
import GetAdminController from "../controllers/admin/GetAdminController";
import multerConfig from "../config/aws";
import { UpdateLessonController } from "../controllers/admin/lesson/UpdateLessonController";
import { DeleteLessonController } from "../controllers/admin/lesson/DeleteLessonController";

const router = Router();

//login & register routes
router.post("/register", CreateAdminController);
router.post("/login", LoginAdminController);
router.get("/", GetAdminController);

//courses routes
router.post("/course", verifyTokenAdmin, CreateCourseController);
router.get("/courses", GetAllCoursesController);

router.get("/course/:id", GetAllLessonsInACoursesController);

//lesson routes
router.post(
  "/lesson",
  verifyTokenAdmin,
  multer(multerConfig).single("file"),
  CreateLessonController
);
router.put(
  "/lesson/:id",
  verifyTokenAdmin,
  multer(multerConfig).single("file"),
  UpdateLessonController
);
router.delete(
  "/lesson/:id",
  verifyTokenAdmin,
  multer(multerConfig).single("file"),
  DeleteLessonController
);

export default router;
