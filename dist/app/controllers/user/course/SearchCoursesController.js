"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchCoursesController = void 0;
const typeorm_1 = require("typeorm");
const Course_1 = require("../../../entities/Course");
const SearchCoursesController = async (req, res) => {
    try {
        const repoCourse = (0, typeorm_1.getRepository)(Course_1.Courses);
        const search = repoCourse.createQueryBuilder('courses');
        //receives a string as parameter to search
        if (req.query.s) {
            search.where("courses.name LIKE :s OR courses.description LIKE :s", { s: `%${req.query.s}%` });
            search.select([
                'courses.id',
                'courses.name',
                'courses.description',
                'courses.duration',
                'courses.price',
                'courses.cover',
                'courses.created_at',
                'courses.updated_at'
            ]);
        }
        const sort = req.query.sort;
        //receives asc or desc as parameters to sort 
        if (sort) {
            search.orderBy("courses.price", sort.toUpperCase());
        }
        return res.json(await search.getMany());
    }
    catch {
        return res.status(400).json({ message: "Error when searching for courses" });
    }
};
exports.SearchCoursesController = SearchCoursesController;
