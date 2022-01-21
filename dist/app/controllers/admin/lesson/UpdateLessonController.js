"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLessonController = void 0;
const typeorm_1 = require("typeorm");
const Lesson_1 = require("../../../entities/Lesson");
const uploadVideos_1 = require("../../../../utils/uploadVideos");
const UpdateLessonController = async (req, res) => {
    try {
        const repo = (0, typeorm_1.getRepository)(Lesson_1.Lessons);
        const { name, sequence, duration, resourse } = req.body;
        const lesson = await repo.findOne({ id: req.params.id });
        const video = req.file;
        if (video) {
            const { buffer } = video;
            const file = await (0, uploadVideos_1.uploadVideos)(buffer, video);
            lesson.name = name ? name : lesson.name;
            lesson.sequence = sequence ? sequence : lesson.sequence;
            lesson.duration = duration ? duration : lesson.duration;
            lesson.resource = resourse ? resourse : lesson.resource;
            await (0, uploadVideos_1.deleteVideo)(lesson.key);
            lesson.video = file.Location;
            lesson.key = file.Key;
        }
        else {
            lesson.name = name ? name : lesson.name;
            lesson.sequence = sequence ? sequence : lesson.sequence;
            lesson.duration = duration ? duration : lesson.duration;
            lesson.resource = resourse ? resourse : lesson.resource;
            lesson.video = lesson.video;
            lesson.key = lesson.key;
        }
        await repo.save(lesson);
        return res.json(lesson);
    }
    catch {
        return res.status(500).json({ message: "Error" });
    }
};
exports.UpdateLessonController = UpdateLessonController;
