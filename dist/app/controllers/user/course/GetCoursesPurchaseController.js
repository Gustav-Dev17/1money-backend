"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCoursesPurchaseController = void 0;
const typeorm_1 = require("typeorm");
const Action_1 = require("../../../entities/Action");
const Item_1 = require("../../../entities/Item");
const GetCoursesPurchaseController = async (req, res) => {
    try {
        const repoActions = (0, typeorm_1.getRepository)(Action_1.Actions);
        const repoItems = (0, typeorm_1.getRepository)(Item_1.Item);
        const actions = await repoActions.findOne({
            user_id: req.id,
            situation: Action_1.ActionSituation.CO,
        });
        const items = await repoItems.find({ action_id: actions.id });
        return res.json(items);
    }
    catch {
        return res.status(400).json({ message: "Error when listing courses" });
    }
};
exports.GetCoursesPurchaseController = GetCoursesPurchaseController;
