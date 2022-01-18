import { Router } from "express";
import multer from "multer";
import { CreateCourseController } from "../controllers/admin/course/CreateCourseController";
import { GetAllCoursesController } from "../controllers/admin/course/GetAllCoursesController";
import { CreateLessonController } from "../controllers/admin/lesson/CreateLessonController";
import { GetAllLessonsInACourseController } from "../controllers/admin/course/GetAllLessonsInACourseController";
import { CreateAdminController } from "../controllers/admin/account/CreateAdminController";
import { LoginAdminController } from "../controllers/admin/account/LoginAdminController";
import { verifyTokenAdmin } from "../middlewares/VerifyTokenAdmin";
import GetAdminController from "../controllers/admin/account/GetAdminController";
import multerVideo from "../config/multerVideo";
import { UpdateLessonController } from "../controllers/admin/lesson/UpdateLessonController";
import { DeleteLessonController } from "../controllers/admin/lesson/DeleteLessonController";
import UpdateAdminController from "../controllers/admin/account/UpdateAdminController";

const router = Router();

//login & register routes
router.post("/register", CreateAdminController);
router.post("/login", LoginAdminController);
router.put("/", verifyTokenAdmin, UpdateAdminController);
router.get("/", verifyTokenAdmin, GetAdminController);

//courses routes
router.post("/course", verifyTokenAdmin, CreateCourseController);
router.get("/courses", GetAllCoursesController);

router.get("/course/:id", verifyTokenAdmin, GetAllLessonsInACourseController);

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


export default router;
