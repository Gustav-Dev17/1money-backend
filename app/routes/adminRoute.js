const {
  CreateCourseController,
} = require("../controllers/admin/CreateCourseController");

const route = require("express").Router();

route.post("/course", CreateCourseController);

module.exports = route;
