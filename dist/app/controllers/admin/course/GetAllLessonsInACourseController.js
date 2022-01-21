"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllLessonsInACourseController = void 0;
const typeorm_1 = require("typeorm");
const Lesson_1 = require("../../../entities/Lesson");
const Course_1 = require("../../../entities/Course");
const GetAllLessonsInACourseController = async (req, res) => {
    try {
        const { id } = req.params;
        const repoLessons = (0, typeorm_1.getRepository)(Lesson_1.Lessons);
        const repoCourse = (0, typeorm_1.getRepository)(Course_1.Courses);
        const lessons = await repoLessons.find({ course_id: id });
        const course = await repoCourse.findOne({ id: id });
        return res.json({ course: course, lessons: lessons });
    }
    catch {
        return res.status(400).json({ message: "Error when listing lessons in the course" });
    }
};
exports.GetAllLessonsInACourseController = GetAllLessonsInACourseController;
