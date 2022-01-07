import { getRepository } from "typeorm";

import { Request, Response } from "express";
import { Actions, ActionSituation } from "../../../entities/Action";
import { Item } from "../../../entities/Item";

export const AddCourseToCart = async (req: Request, res: Response) => {
  try {
    const { payment, discount, course_id, total_price } = req.body;
    const repoActions = getRepository(Actions);
    const repoItem = getRepository(Item);
    const actions = await repoActions.find({
      user_id: req.id,
      situation: ActionSituation.CA,
    });
    if (actions.length === 0) {
      const actionCart = repoActions.create({
        discount,
        payment,
        final_price: 434,
        total_price: 500.0,
        user_id: req.id,
        situation: ActionSituation.CA,
      });
      await repoActions.save(actionCart);
    }
    const newActions = await repoActions.findOne({
      user_id: req.id,
      situation: ActionSituation.CA,
    });

    const itemCart = repoItem.create({
      action_id: newActions.id,
      course_id: course_id,
      total_price,
    });
    await repoItem.save(itemCart);
    return res.json(itemCart);
  } catch (e) {
    return res.status(400).json({ message: "Error" });
  }
};
