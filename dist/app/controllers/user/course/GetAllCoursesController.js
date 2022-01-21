"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCoursesController = void 0;
const typeorm_1 = require("typeorm");
const Course_1 = require("../../../entities/Course");
const GetAllCoursesController = async (req, res) => {
    try {
        const repo = (0, typeorm_1.getRepository)(Course_1.Courses);
        const courses = await repo.find({ order: { created_at: "ASC" } });
        return res.json(courses);
    }
    catch {
        return res.status(400).json({ message: "Error when listing courses" });
    }
};
exports.GetAllCoursesController = GetAllCoursesController;
