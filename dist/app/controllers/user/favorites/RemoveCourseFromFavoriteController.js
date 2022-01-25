"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCourseFromFavoriteController = void 0;
const typeorm_1 = require("typeorm");
const Action_1 = require("../../../entities/Action");
const Item_1 = require("../../../entities/Item");
const RemoveCourseFromFavoriteController = async (req, res) => {
    try {
        const { id } = req.params;
        const repoActions = (0, typeorm_1.getRepository)(Action_1.Actions);
        const repoItem = (0, typeorm_1.getRepository)(Item_1.Item);
        const actions = await repoActions.findOne({
            user_id: req.id,
            situation: Action_1.ActionSituation.FA,
        });
        const itemFavorite = await repoItem.findOne({
            where: { action_id: actions.id, course_id: id },
        });
        if (!itemFavorite) {
            return res.status(404).json({ message: "Item Not Found" });
        }
        await repoItem.delete(itemFavorite.id);
        const itemsFavorites = await repoItem.find({
            where: { action_id: actions.id },
        });
        if (itemsFavorites.length <= 0) {
            await repoActions.delete(actions.id);
            return res.status(200).json({ message: "removed from cart" });
        }
        await repoActions.save(actions);
        return res.status(200).json({ message: "removed from cart" });
    }
    catch {
        return res
            .status(500)
            .json({ message: "Error when deleting item from cart" });
    }
};
exports.RemoveCourseFromFavoriteController = RemoveCourseFromFavoriteController;
