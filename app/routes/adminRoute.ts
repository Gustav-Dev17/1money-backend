import { CreateCourseController } from "../controllers/admin/CreateCourseController";
import { GetAllCoursesController } from "../controllers/admin/GetAllCoursesController";
import { CreateLessonController } from "../controllers/admin/CreateLessonController";

import { Router } from "express";
import { GetAllLessonsInACoursesController } from "../controllers/admin/GetAllLessonsInACoursesController";
const router = Router();

router.get("/course", GetAllCoursesController);
router.post("/course", CreateCourseController);
router.post("/lesson", CreateLessonController);
router.get("/course/:id", GetAllLessonsInACoursesController);

export default router;
