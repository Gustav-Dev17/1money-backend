"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLessonController = void 0;
const typeorm_1 = require("typeorm");
const Lesson_1 = require("../../../entities/Lesson");
const Course_1 = require("../../../entities/Course");
const uploadVideos_1 = require("../../../../utils/uploadVideos");
const CreateLessonController = async (req, res) => {
    try {
        const { name, sequence, duration, resource, course_id } = req.body;
        const lessonSearch = (0, typeorm_1.getRepository)(Lesson_1.Lessons);
        const courseSearch = (0, typeorm_1.getRepository)(Course_1.Courses);
        const video = req.file;
        if (!video)
            return res.status(404).json({ message: "Video not found" });
        if (!(await courseSearch.findOne(course_id)))
            return res.status(404).json({ message: "Course not found!" });
        const { buffer } = video;
        const file = await (0, uploadVideos_1.uploadVideos)(buffer, video);
        const lesson = lessonSearch.create({
            name,
            sequence,
            duration,
            video: file.Location,
            key: file.Key,
            resource,
            course_id,
        });
        await lessonSearch.save(lesson);
        return res.json(lesson);
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Error when creating a lesson" });
    }
};
exports.CreateLessonController = CreateLessonController;
