const {
  CreateCourseController,
} = require("../controllers/admin/CreateCourseController");
const { CreateLessonController } = require("../controllers/admin/CreateLessonController");

const route = require("express").Router();

route.post("/course", CreateCourseController);
route.post("/lesson", CreateLessonController)

module.exports = route;
