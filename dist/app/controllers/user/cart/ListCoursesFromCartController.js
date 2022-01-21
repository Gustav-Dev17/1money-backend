"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCoursesFromCartController = void 0;
const typeorm_1 = require("typeorm");
const Action_1 = require("../../../entities/Action");
const Item_1 = require("../../../entities/Item");
const ListCoursesFromCartController = async (req, res) => {
    try {
        const repoActions = (0, typeorm_1.getRepository)(Action_1.Actions);
        const repoItem = (0, typeorm_1.getRepository)(Item_1.Item);
        const actions = await repoActions.findOne({
            user_id: req.id,
            situation: Action_1.ActionSituation.CA,
        });
        if (!actions)
            return res.json([]);
        const itemsCart = await repoItem.find({
            where: { action_id: actions.id },
            relations: ["course"],
        });
        return res.json({
            actions_id: actions.id,
            final_price: actions.final_price,
            discount: actions.discount,
            total_price: actions.total_price,
            cart: itemsCart,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Error" });
    }
};
exports.ListCoursesFromCartController = ListCoursesFromCartController;
