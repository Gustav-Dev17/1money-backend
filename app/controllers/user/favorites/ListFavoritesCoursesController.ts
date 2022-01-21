import { getRepository } from "typeorm";

import { Request, Response } from "express";
import { Actions, ActionSituation } from "../../../entities/Action";
import { Item } from "../../../entities/Item";

export const ListFavoritesCoursesController = async (
  req: Request,
  res: Response
) => {
  try {
    const repoActions = getRepository(Actions);
    const repoItem = getRepository(Item);
    const actions = await repoActions.findOne({
      user_id: req.id,
      situation: ActionSituation.FA,
    });

    if (!actions) return res.json([]);

    const itemsFavorite = await repoItem.find({
      where: { action_id: actions.id },
      relations: ["course"],
    });

    return res.json({
      actions_id: actions.id,
      favorites: itemsFavorite,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error" });
  }
};
