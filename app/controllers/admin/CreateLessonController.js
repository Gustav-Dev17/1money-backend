const { Lesson } = require("../../models");

const CreateLessonController = async (req, res, next) => {
  try {
    const lessonName = await Lesson.findOne({ where: { name: req.body.name } });
    if (lessonName) {
      return res.status(409).json({ message: "Lesson already exists" });
    }
    const lesson = await Lesson.create(req.body);
    return res.json(lesson);
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "error" });
  }
};

module.exports = { CreateLessonController };
