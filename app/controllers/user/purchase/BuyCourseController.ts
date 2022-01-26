import { NextFunction, Request, Response } from "express";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
import Stripe from "stripe";
import { getRepository } from "typeorm";
import { Actions, ActionSituation } from "../../../entities/Action";
import { Item } from "../../../entities/Item";
import { Cards } from "../../../entities/Card";
import { Users } from "../../../entities/User";

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2020-08-27" });

export const BuyCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repoActions = getRepository(Actions);
    
    let saveCard = false;

    if (saveCard) {
      const { name, cpf, number,  exp_month, exp_year, user_id } = req.body;
      const cardRepo = getRepository(Cards);
      const userSearch = getRepository(Users);
      
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
      situation: ActionSituation.CA,
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
