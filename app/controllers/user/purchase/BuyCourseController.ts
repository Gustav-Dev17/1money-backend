import { NextFunction, Request, Response } from "express";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
import Stripe from "stripe";
import { getRepository } from "typeorm";
import { Actions, ActionSituation } from "../../../entities/Action";
import { Item } from "../../../entities/Item";
const stripe = new Stripe(stripeSecretKey, { apiVersion: "2020-08-27" });

interface Iitems {
  Item?: {
    id: string;
  };
  id: string;
  action_id: string;
}

export const BuyCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
      amount: req.body.amount * 100,
      currency: "brl",
      source: cardToken.id,
      receipt_email: req.body.email,
      description: req.body.description,
    });

    if (charge.status === "succeeded") {
      const repoActions = getRepository(Actions);
      const actions = await repoActions.findOne({
        id: req.body.action_id,
        situation: ActionSituation.CA,
      });
      const actionsCO = await repoActions.findOne({
        user_id: req.id,
        situation: ActionSituation.CO,
      });
      if (!actionsCO) {
        actions.situation = ActionSituation.CO;
        await repoActions.save(actions);
        return res.json({ message: "Compra efetuada" });
      }

      //const repoItem = getRepository(Item);

      await getRepository(Item)
        .createQueryBuilder()
        .update()
        .set({ action_id: actionsCO.id })
        .execute();
      await repoActions.delete(req.body.action_id);
      return res.status(200).send({ Success: charge });
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
