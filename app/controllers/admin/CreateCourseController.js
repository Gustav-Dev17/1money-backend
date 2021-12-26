const { Course } = require("../../models");
//const Course = require("../../models/course");

const CreateCourseController = async (req, res, next) => {
  try {
    const courseName = await Course.findOne({ where: { name: req.body.name } });
    if (courseName) {
      return res.status(409).json({ message: "Course already exists" });
    }
    const course = await Course.create(req.body);
    return res.json(course);
  } catch {
    return res.status(500).json({ message: "error" });
  }
};

module.exports = { CreateCourseController };
