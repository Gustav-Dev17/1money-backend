"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFavoritesCoursesController = void 0;
const typeorm_1 = require("typeorm");
const Action_1 = require("../../../entities/Action");
const Item_1 = require("../../../entities/Item");
const ListFavoritesCoursesController = async (req, res) => {
    try {
        const repoActions = (0, typeorm_1.getRepository)(Action_1.Actions);
        const repoItem = (0, typeorm_1.getRepository)(Item_1.Item);
        const actions = await repoActions.findOne({
            user_id: req.id,
            situation: Action_1.ActionSituation.FA,
        });
        if (!actions)
            return res.json([]);
        const itemsFavorite = await repoItem.find({
            where: { action_id: actions.id },
            relations: ["course"],
        });
        return res.json({
            actions_id: actions.id,
            favorites: itemsFavorite,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Error" });
    }
};
exports.ListFavoritesCoursesController = ListFavoritesCoursesController;
