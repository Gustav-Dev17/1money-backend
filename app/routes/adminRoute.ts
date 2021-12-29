import { Router } from "express";
const router = Router();

import { CreateCourseController } from "../controllers/admin/course/CreateCourseController";
import { GetAllCoursesController } from "../controllers/admin/course/GetAllCoursesController";
import { CreateLessonController } from "../controllers/admin/lesson/CreateLessonController";
import { GetAllLessonsInACoursesController } from "../controllers/admin/course/GetAllLessonsInACoursesController";
import { CreateAdminController } from "../controllers/admin/CreateAdminController";
import { LoginAdminController } from "../controllers/admin/LoginAdminController";
import { verifyTokenAdmin } from "../middlewares/VerifyTokenAdmin";

router.post("/register", CreateAdminController);
router.post("/login", LoginAdminController);
router.get("/course", GetAllCoursesController);
router.post("/course", verifyTokenAdmin, CreateCourseController);
router.post("/lesson", verifyTokenAdmin, CreateLessonController);
router.get("/course/:id", GetAllLessonsInACoursesController);

export default router;
