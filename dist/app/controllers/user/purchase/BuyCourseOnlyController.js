"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyCourseOnlyController = void 0;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe_1 = __importDefault(require("stripe"));
const typeorm_1 = require("typeorm");
const Action_1 = require("../../../entities/Action");
const Course_1 = require("../../../entities/Course");
const Item_1 = require("../../../entities/Item");
const stripe = new stripe_1.default(stripeSecretKey, { apiVersion: "2020-08-27" });
const BuyCourseOnlyController = async (req, res, next) => {
    try {
        const repoActions = (0, typeorm_1.getRepository)(Action_1.Actions);
        const repoItems = (0, typeorm_1.getRepository)(Item_1.Item);
        const repoCourse = (0, typeorm_1.getRepository)(Course_1.Courses);
        const course = await repoCourse.findOne({ id: req.body.course_id });
        if (!course)
            return res.status(404).json({ message: "Course not found" });
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
            amount: (course.price - course.discount) * 100,
            currency: "brl",
            source: cardToken.id,
            receipt_email: req.body.email,
            description: req.body.description,
        });
        if (charge.status === "succeeded") {
            const actions = await repoActions.findOne({
                user_id: req.id,
                situation: Action_1.ActionSituation.CO,
            });
            if (!actions) {
                const action = repoActions.create({
                    user_id: req.id,
                    situation: Action_1.ActionSituation.CO,
                    payment: "Teste",
                    discount: course.discount,
                    total_price: course.price,
                    final_price: course.price - course.discount,
                });
                await repoActions.save(action);
            }
            const newActions = await repoActions.findOne({
                user_id: req.id,
                situation: Action_1.ActionSituation.CO,
            });
            console.log(newActions);
            const item = repoItems.create({
                course_id: course.id,
                action_id: newActions.id,
                discount: course.discount,
                total_price: course.price,
            });
            await repoItems.save(item);
            return res.status(200).send({ Success: "Ok" });
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
exports.BuyCourseOnlyController = BuyCourseOnlyController;
