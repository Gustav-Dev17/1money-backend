import { NextFunction, Request, Response } from "express";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
import Stripe from "stripe";
import { getRepository } from "typeorm";
import { Actions, ActionSituation } from "../../../entities/Action";
import { Courses } from "../../../entities/Course";
import { Item } from "../../../entities/Item";
const stripe = new Stripe(stripeSecretKey, { apiVersion: "2020-08-27" });

export const BuyCourseOnlyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repoActions = getRepository(Actions);
    const repoItems = getRepository(Item);
    const repoCourse = getRepository(Courses);
    const course = await repoCourse.findOne({ id: req.body.course_id });
    if (!course) return res.status(404).json({ message: "Course not found" });

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
        situation: ActionSituation.CO,
      });

      if (!actions) {
        const action = repoActions.create({
          user_id: req.id,
          situation: ActionSituation.CO,
          payment: "Teste",
          discount: course.discount,
          total_price: course.price,
          final_price: course.price - course.discount,
        });
        await repoActions.save(action);
      }

      const newActions = await repoActions.findOne({
        user_id: req.id,
        situation: ActionSituation.CO,
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
    } else {
      return res
        .status(400)
        .send({ Error: "Please try again later for One Time Payment" });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error" });
  }
};
