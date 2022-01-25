"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCourseToFavoritesController = void 0;
const typeorm_1 = require("typeorm");
const Action_1 = require("../../../entities/Action");
const Item_1 = require("../../../entities/Item");
const Course_1 = require("../../../entities/Course");
const AddCourseToFavoritesController = async (req, res) => {
    try {
        const { course_id } = req.body;
        const repoCourse = (0, typeorm_1.getRepository)(Course_1.Courses);
        const repoActions = (0, typeorm_1.getRepository)(Action_1.Actions);
        const repoItem = (0, typeorm_1.getRepository)(Item_1.Item);
        const actions = await repoActions.findOne({
            user_id: req.id,
            situation: Action_1.ActionSituation.FA,
        });
        const course = await repoCourse.findOne({ id: course_id });
        if (!course_id)
            return res.status(404).json({ message: "Course not found" });
        if (!actions) {
            const actionFavorite = repoActions.create({
                discount: 0,
                final_price: 0,
                total_price: 0,
                user_id: req.id,
                situation: Action_1.ActionSituation.FA,
                payment: "Teste"
            });
            const itemCart = repoItem.create({
                action_id: actionFavorite.id,
                course_id: course_id,
                total_price: course.price,
                discount: course.discount,
            });
            await repoActions.save(actionFavorite);
            await repoItem.save(itemCart);
            return res.status(201).json(itemCart);
        }
        const newActions = await repoActions.findOne({
            user_id: req.id,
            situation: Action_1.ActionSituation.FA,
        });
        const itemCartExists = await repoItem.findOne({
            action_id: newActions.id,
            course_id: course_id,
        });
        if (itemCartExists) {
            return res.status(409).json({ message: "Item exists in favorit" });
        }
        const itemFavorite = repoItem.create({
            action_id: newActions.id,
            course_id: course_id,
            total_price: course.price,
            discount: course.discount,
        });
        await repoItem.save(itemFavorite);
        await repoActions.save(newActions);
        return res.json(itemFavorite);
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Error" });
    }
};
exports.AddCourseToFavoritesController = AddCourseToFavoritesController;
