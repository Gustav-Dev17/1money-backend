import { getRepository } from "typeorm";

import { Request, Response } from "express";
import { Actions, ActionSituation } from "../../entities/Action";
import { Item } from "../../entities/Item";

export const ListCoursesFromCart = async (req: Request, res: Response) => {
  try {
    const repoActions = getRepository(Actions);
    const repoItem = getRepository(Item);
    const actions = await repoActions.findOne({
      user_id: req.id,
      situation: ActionSituation.CA,
    });

    if (!actions) return res.json([]);

    const itemsCart = await repoItem.find({
      where: { action_id: actions.id },
      relations: ["course"],
    });
    return res.json(itemsCart);
  } catch (e) {
    return res.status(400).json({ message: "Error" });
  }
};
