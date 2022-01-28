"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCardsController = void 0;
const typeorm_1 = require("typeorm");
const Card_1 = require("../../../entities/Card");
const GetCardsController = async (req, res) => {
    try {
        const repoCards = (0, typeorm_1.getRepository)(Card_1.Cards);
        const cards = await repoCards.find({ order: { created_at: "ASC" } });
        return res.json(cards);
    }
    catch {
        return res.status(400).json({ message: "Error when listing cards" });
    }
};
exports.GetCardsController = GetCardsController;
