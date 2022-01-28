"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyCourseController = void 0;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe_1 = __importDefault(require("stripe"));
const typeorm_1 = require("typeorm");
const Action_1 = require("../../../entities/Action");
const Item_1 = require("../../../entities/Item");
const Card_1 = require("../../../entities/Card");
const User_1 = require("../../../entities/User");
const stripe = new stripe_1.default(stripeSecretKey, { apiVersion: "2020-08-27" });
const BuyCourseController = async (req, res, next) => {
    try {
        const repoActions = (0, typeorm_1.getRepository)(Action_1.Actions);
        let saveCard = false;
        if (saveCard) {
            const { name, cpf, number, exp_month, exp_year, user_id } = req.body;
            const cardRepo = (0, typeorm_1.getRepository)(Card_1.Cards);
            const userSearch = (0, typeorm_1.getRepository)(User_1.Users);
            if (await cardRepo.findOne({ number })) {
                return res.status(409).json({ message: "This card is already saved!" });
            }
            if (!(await userSearch.findOne(user_id)))
                return res.status(404).json({ message: "User not found! Please, create an account" });
            const card = cardRepo.create({
                name,
                cpf,
                number,
                exp_month,
                exp_year,
                user_id,
            });
            await cardRepo.save(card);
            return res.json({ message: "Card saved!" });
        }
        const actions = await repoActions.findOne({
            id: req.body.action_id,
            situation: Action_1.ActionSituation.CA,
        });
        const cardToken = await stripe.tokens.create({
            card: {
                name: req.body.name,
                number: req.body.number,
                exp_month: req.body.month,
                exp_year: req.body.year,
                cvc: req.body.cvc,
            },
        });
        const charge = await stripe.charges.create({
            amount: actions.final_price * 100,
            currency: "brl",
            source: cardToken.id,
            receipt_email: req.body.email,
            description: req.body.description,
        });
        if (charge.status === "succeeded") {
            const actionsCO = await repoActions.findOne({
                user_id: req.id,
                situation: Action_1.ActionSituation.CO,
            });
            if (!actionsCO) {
                actions.situation = Action_1.ActionSituation.CO;
                await repoActions.save(actions);
                return res.json({ message: "Compra efetuada" });
            }
            //const repoItem = getRepository(Item);
            await (0, typeorm_1.getRepository)(Item_1.Item)
                .createQueryBuilder()
                .update()
                .set({ action_id: actionsCO.id })
                .execute();
            await repoActions.delete(req.body.action_id);
            return res.status(200).send({ Success: charge });
        }
        else {
            return res
                .status(400)
                .send({ Error: "Please try again later for One Time Payment" });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Error" });
    }
};
exports.BuyCourseController = BuyCourseController;
