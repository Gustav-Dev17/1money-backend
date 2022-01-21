"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseController = void 0;
const typeorm_1 = require("typeorm");
const Course_1 = require("../../../entities/Course");
const CreateCourseController = async (req, res) => {
    try {
        const { name, description, duration, price, discount, cover, prevideo } = req.body;
        const repo = (0, typeorm_1.getRepository)(Course_1.Courses);
        if (await repo.findOne({ name })) {
            return res.status(409).json({ message: "Course name already exists!" });
        }
        const course = repo.create({
            name,
            description,
            duration,
            price,
            discount,
            cover,
            prevideo,
        });
        await repo.save(course);
        return res.json(course);
    }
    catch {
        return res.status(400).json({ message: "Error when creating course" });
    }
};
exports.CreateCourseController = CreateCourseController;
