"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLessonController = void 0;
const typeorm_1 = require("typeorm");
const Lesson_1 = require("../../../entities/Lesson");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uploadVideos_1 = require("../../../../utils/uploadVideos");
const s3 = new aws_sdk_1.default.S3();
const DeleteLessonController = async (req, res) => {
    try {
        const repo = (0, typeorm_1.getRepository)(Lesson_1.Lessons);
        const lesson = await repo.findOne({ id: req.params.id });
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        await (0, uploadVideos_1.deleteVideo)(lesson.key);
        await repo.delete(lesson);
        return res.status(200).json({ message: "Lesson deleted from the course!" });
    }
    catch {
        return res.status(500).json({ message: "Error" });
    }
};
exports.DeleteLessonController = DeleteLessonController;
